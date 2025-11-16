import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Plus, Trash2, X } from "lucide-react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "sonner";

const addonOptionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome obrigatório"),
  price: z.coerce.number().min(0, "Preço deve ser positivo"),
});

const addonGroupSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome do grupo obrigatório"),
  type: z.enum(["single", "multiple"]),
  required: z.boolean(),
  max: z.coerce.number().optional(),
  options: z.array(addonOptionSchema).min(1, "Adicione pelo menos uma opção"),
});

const productSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100),
  description: z.string().max(500, "Descrição deve ter no máximo 500 caracteres").optional(),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  price: z.coerce.number().min(0.01, "Preço deve ser maior que zero"),
  position: z.coerce.number().min(0).default(0),
  active: z.boolean().default(true),
  image: z.string().optional(),
  addonGroups: z.array(addonGroupSchema).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
  product?: any;
  categories: Array<{ id: string; name: string }>;
}

const ProductFormModal = ({
  open,
  onClose,
  onSave,
  product,
  categories,
}: ProductFormModalProps) => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      price: 0,
      position: 0,
      active: true,
      image: "",
      addonGroups: [],
    },
  });

  const { fields: addonGroups, append: appendGroup, remove: removeGroup } = useFieldArray({
    control: form.control,
    name: "addonGroups",
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description || "",
        categoryId: product.categoryId,
        price: product.price,
        position: product.position || 0,
        active: product.active ?? true,
        image: product.image || "",
        addonGroups: product.addonGroups || [],
      });
      setImagePreview(product.image || "");
    } else {
      form.reset({
        name: "",
        description: "",
        categoryId: "",
        price: 0,
        position: 0,
        active: true,
        image: "",
        addonGroups: [],
      });
      setImagePreview("");
    }
  }, [product, form, open]);

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Imagem muito grande. Máximo 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        form.setValue("image", result);
        toast.info("Em produção, a imagem será enviada para o ImgBB API");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const addAddonGroup = () => {
    appendGroup({
      id: `group-${Date.now()}`,
      name: "",
      type: "single",
      required: false,
      options: [
        { id: `opt-${Date.now()}`, name: "", price: 0 }
      ],
    });
  };

  const onSubmit = (data: ProductFormData) => {
    onSave(data);
    form.reset();
    setImagePreview("");
    onClose();
    toast.success(product ? "Produto atualizado!" : "Produto criado!");
  };

  const handleClose = () => {
    form.reset();
    setImagePreview("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Editar Produto" : "Novo Produto"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Imagem do Produto</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? "border-primary bg-primary/5" : "border-border"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImagePreview("");
                        form.setValue("image", "");
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Arraste uma imagem ou clique para selecionar
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG ou JPEG (máx. 5MB)
                      </p>
                    </div>
                    <Input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      className="hidden"
                      id="image-upload"
                      onChange={handleFileInput}
                    />
                    <Button type="button" variant="outline" asChild>
                      <label htmlFor="image-upload" className="cursor-pointer">
                        Selecionar Arquivo
                      </label>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Nome do Produto *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: X-Burger Especial" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva seu produto..."
                        className="resize-none"
                        rows={3}
                        maxLength={500}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length || 0}/500 caracteres
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Posição (Ordem)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormDescription>Ordem de exibição no cardápio</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                    <div>
                      <FormLabel>Status</FormLabel>
                      <FormDescription>Produto ativo no cardápio</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Addon Groups */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Grupos de Adicionais</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure opções como "Ponto da Carne", "Extras", etc.
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addAddonGroup}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Grupo
                </Button>
              </div>

              {addonGroups.length > 0 && (
                <Accordion type="multiple" className="space-y-4">
                  {addonGroups.map((group, groupIndex) => (
                    <AccordionItem
                      key={group.id}
                      value={`group-${groupIndex}`}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {form.watch(`addonGroups.${groupIndex}.name`) || `Grupo ${groupIndex + 1}`}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-4">
                            <FormField
                              control={form.control}
                              name={`addonGroups.${groupIndex}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nome do Grupo *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ex: Ponto da Carne" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`addonGroups.${groupIndex}.type`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Tipo de Seleção</FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      value={field.value}
                                      className="flex gap-4"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="single" id={`single-${groupIndex}`} />
                                        <Label htmlFor={`single-${groupIndex}`}>Única</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="multiple" id={`multiple-${groupIndex}`} />
                                        <Label htmlFor={`multiple-${groupIndex}`}>Múltipla</Label>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="flex gap-4">
                              <FormField
                                control={form.control}
                                name={`addonGroups.${groupIndex}.required`}
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      Obrigatório
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />

                              {form.watch(`addonGroups.${groupIndex}.type`) === "multiple" && (
                                <FormField
                                  control={form.control}
                                  name={`addonGroups.${groupIndex}.max`}
                                  render={({ field }) => (
                                    <FormItem className="flex items-center gap-2 space-y-0">
                                      <FormLabel className="whitespace-nowrap">Máx:</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          min="1"
                                          className="w-20"
                                          {...field}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              )}
                            </div>

                            {/* Addon Options */}
                            <AddonOptionsField
                              control={form.control}
                              groupIndex={groupIndex}
                            />
                          </div>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => removeGroup(groupIndex)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                {product ? "Salvar Alterações" : "Criar Produto"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

// Helper component for addon options
const AddonOptionsField = ({ control, groupIndex }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `addonGroups.${groupIndex}.options`,
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm">Opções *</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => append({ id: `opt-${Date.now()}`, name: "", price: 0 })}
        >
          <Plus className="w-3 h-3 mr-1" />
          Adicionar
        </Button>
      </div>

      {fields.map((field, optIndex) => (
        <div key={field.id} className="flex gap-2">
          <FormField
            control={control}
            name={`addonGroups.${groupIndex}.options.${optIndex}.name`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Nome da opção" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`addonGroups.${groupIndex}.options.${optIndex}.price`}
            render={({ field }) => (
              <FormItem className="w-28">
                <FormControl>
                  <Input type="number" step="0.01" placeholder="R$ 0,00" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            onClick={() => remove(optIndex)}
            disabled={fields.length === 1}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ProductFormModal;
