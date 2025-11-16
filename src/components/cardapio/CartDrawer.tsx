import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  addons?: { [key: string]: string[] };
  observations?: string;
  total: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
}

const CartDrawer = ({ open, onClose, items, onUpdateQuantity, onRemoveItem }: CartDrawerProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const navigate = useNavigate();

  const deliveryFee = 5.00; // Pode ser 0 para retirada ou grátis
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const total = subtotal + deliveryFee - discount;

  const handleApplyCoupon = () => {
    // Mock coupon validation
    if (couponCode.toUpperCase() === "DESCONTO10") {
      setAppliedCoupon({ code: couponCode, discount: 10 });
      setCouponCode("");
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const minimumOrder = 15.00;
  const canCheckout = subtotal >= minimumOrder;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            Seu Pedido
            {items.length > 0 && (
              <Badge variant="secondary">{items.length} {items.length === 1 ? 'item' : 'itens'}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-lg font-semibold mb-2">Seu carrinho está vazio</p>
              <p className="text-sm text-muted-foreground">
                Adicione produtos para começar seu pedido
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item, index) => (
                <div key={index} className="bg-card border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold line-clamp-1">{item.name}</h4>
                      {item.observations && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          "{item.observations}"
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onRemoveItem(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        disabled={item.quantity >= 99}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        R$ {item.price.toFixed(2).replace('.', ',')} × {item.quantity}
                      </p>
                      <p className="font-semibold text-primary">
                        R$ {item.total.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary and Checkout */}
            <div className="border-t p-6 space-y-4">
              {/* Coupon */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Tem um cupom?"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="pl-10"
                      disabled={!!appliedCoupon}
                    />
                  </div>
                  {appliedCoupon ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setAppliedCoupon(null);
                        setCouponCode("");
                      }}
                    >
                      Remover
                    </Button>
                  ) : (
                    <Button onClick={handleApplyCoupon} disabled={!couponCode}>
                      Aplicar
                    </Button>
                  )}
                </div>
                {appliedCoupon && (
                  <p className="text-xs text-success flex items-center gap-1">
                    ✓ Cupom "{appliedCoupon.code}" aplicado!
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxa de entrega</span>
                  <span className={deliveryFee > 0 ? "" : "text-success"}>
                    {deliveryFee > 0 ? `R$ ${deliveryFee.toFixed(2).replace('.', ',')}` : "Grátis"}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Desconto</span>
                    <span>-R$ {discount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              {!canCheckout && (
                <p className="text-sm text-destructive text-center">
                  Pedido mínimo de R$ {minimumOrder.toFixed(2).replace('.', ',')}
                </p>
              )}
              <Button
                className="w-full h-12 text-lg bg-gradient-primary hover:opacity-90 btn-active"
                onClick={handleCheckout}
                disabled={!canCheckout}
              >
                Finalizar Pedido
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

// Missing import
import { ShoppingBag } from "lucide-react";

export default CartDrawer;
