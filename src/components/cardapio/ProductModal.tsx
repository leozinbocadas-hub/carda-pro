import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Addon {
  id: string;
  name: string;
  price: number;
}

interface AddonGroup {
  id: string;
  name: string;
  required: boolean;
  type: "single" | "multiple";
  min?: number;
  max?: number;
  options: Addon[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  addonGroups?: AddonGroup[];
}

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (item: any) => void;
}

const ProductModal = ({ product, open, onClose, onAddToCart }: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<{ [key: string]: string[] }>({});
  const [observations, setObservations] = useState("");

  if (!product) return null;

  const handleAddonChange = (groupId: string, addonId: string, type: "single" | "multiple") => {
    setSelectedAddons((prev) => {
      if (type === "single") {
        return { ...prev, [groupId]: [addonId] };
      } else {
        const current = prev[groupId] || [];
        const newSelection = current.includes(addonId)
          ? current.filter((id) => id !== addonId)
          : [...current, addonId];
        return { ...prev, [groupId]: newSelection };
      }
    });
  };

  const calculateTotal = () => {
    let total = product.price;
    
    if (product.addonGroups) {
      product.addonGroups.forEach((group) => {
        const selected = selectedAddons[group.id] || [];
        selected.forEach((addonId) => {
          const addon = group.options.find((opt) => opt.id === addonId);
          if (addon) total += addon.price;
        });
      });
    }
    
    return total * quantity;
  };

  const handleAddToCart = () => {
    const item = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      addons: selectedAddons,
      observations,
      total: calculateTotal(),
    };
    onAddToCart(item);
    onClose();
    // Reset state
    setQuantity(1);
    setSelectedAddons({});
    setObservations("");
  };

  const canAddToCart = () => {
    if (!product.addonGroups) return true;
    
    return product.addonGroups.every((group) => {
      if (!group.required) return true;
      const selected = selectedAddons[group.id] || [];
      if (group.min && selected.length < group.min) return false;
      return selected.length > 0;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header Image */}
        <div className="relative w-full h-48 md:h-64">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-primary" />
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-background/80 backdrop-blur hover:bg-background/90"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Info */}
          <div>
            <DialogHeader>
              <DialogTitle className="text-2xl">{product.name}</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground mt-2">{product.description}</p>
            <p className="text-2xl font-bold text-primary mt-4">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
          </div>

          {/* Addon Groups */}
          {product.addonGroups && product.addonGroups.length > 0 && (
            <div className="space-y-6">
              {product.addonGroups.map((group) => (
                <div key={group.id} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-base font-semibold">
                      {group.name}
                    </Label>
                    {group.required && (
                      <Badge variant="destructive" className="text-xs">
                        Obrigatório
                      </Badge>
                    )}
                    {group.max && (
                      <Badge variant="secondary" className="text-xs">
                        Escolha até {group.max}
                      </Badge>
                    )}
                  </div>

                  {group.type === "single" ? (
                    <RadioGroup
                      value={selectedAddons[group.id]?.[0]}
                      onValueChange={(value) => handleAddonChange(group.id, value, "single")}
                    >
                      {group.options.map((addon) => (
                        <div key={addon.id} className="flex items-center justify-between py-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={addon.id} id={addon.id} />
                            <label
                              htmlFor={addon.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {addon.name}
                            </label>
                          </div>
                          {addon.price > 0 && (
                            <span className="text-sm text-muted-foreground">
                              +R$ {addon.price.toFixed(2).replace('.', ',')}
                            </span>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className="space-y-2">
                      {group.options.map((addon) => {
                        const selected = selectedAddons[group.id] || [];
                        const isDisabled = group.max && selected.length >= group.max && !selected.includes(addon.id);
                        
                        return (
                          <div key={addon.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={addon.id}
                                checked={selected.includes(addon.id)}
                                onCheckedChange={() => handleAddonChange(group.id, addon.id, "multiple")}
                                disabled={isDisabled}
                              />
                              <label
                                htmlFor={addon.id}
                                className={`text-sm font-medium leading-none cursor-pointer ${
                                  isDisabled ? "opacity-50" : ""
                                }`}
                              >
                                {addon.name}
                              </label>
                            </div>
                            {addon.price > 0 && (
                              <span className="text-sm text-muted-foreground">
                                +R$ {addon.price.toFixed(2).replace('.', ',')}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Observations */}
          <div className="space-y-2">
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              placeholder="Alguma observação? Ex: sem cebola, bem passado..."
              value={observations}
              onChange={(e) => setObservations(e.target.value.slice(0, 200))}
              maxLength={200}
              className="resize-none"
              rows={3}
            />
            <p className="text-xs text-muted-foreground text-right">
              {observations.length}/200
            </p>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label>Quantidade</Label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="h-10 w-10"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(99, quantity + 1))}
                disabled={quantity >= 99}
                className="h-10 w-10"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer - Add to Cart */}
        <div className="sticky bottom-0 p-6 bg-background border-t">
          <Button
            className="w-full h-12 text-lg bg-gradient-primary hover:opacity-90 btn-active"
            onClick={handleAddToCart}
            disabled={!canAddToCart()}
          >
            Adicionar ao Carrinho • R$ {calculateTotal().toFixed(2).replace('.', ',')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
