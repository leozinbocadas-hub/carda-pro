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
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Nome é obrigatório" })
    .max(50, { message: "Nome deve ter no máximo 50 caracteres" }),
  emoji: z
    .string()
    .min(1, { message: "Selecione um emoji" }),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CategoryFormData) => void;
  category?: {
    name: string;
    emoji: string;
  } | null;
}

const CategoryFormModal = ({
  open,
  onClose,
  onSave,
  category,
}: CategoryFormModalProps) => {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      emoji: "📁",
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        emoji: category.emoji,
      });
    } else {
      form.reset({
        name: "",
        emoji: "📁",
      });
    }
  }, [category, form, open]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    form.setValue("emoji", emojiData.emoji, { shouldValidate: true });
    setEmojiPickerOpen(false);
  };

  const onSubmit = (data: CategoryFormData) => {
    onSave(data);
    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category ? "Editar Categoria" : "Nova Categoria"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Emoji Picker */}
            <FormField
              control={form.control}
              name="emoji"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emoji *</FormLabel>
                  <FormControl>
                    <Popover open={emojiPickerOpen} onOpenChange={setEmojiPickerOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-20 text-4xl justify-center"
                          type="button"
                        >
                          {field.value || <Smile className="w-8 h-8 text-muted-foreground" />}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 border-0" align="start">
                        <EmojiPicker
                          onEmojiClick={handleEmojiClick}
                          width="100%"
                          height={400}
                          searchPlaceHolder="Buscar emoji..."
                          previewConfig={{ showPreview: false }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Categoria *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Hambúrgueres"
                      {...field}
                      maxLength={50}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    {field.value.length}/50 caracteres
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit">
                {category ? "Salvar Alterações" : "Criar Categoria"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormModal;
