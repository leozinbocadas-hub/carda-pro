import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, DollarSign, CreditCard, Phone, Instagram, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface BusinessInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  business: {
    name: string;
    category: string;
    description: string;
    deliveryTime: string;
    minimumOrder: number;
    deliveryFee: number;
    address?: string;
    phone?: string;
    instagram?: string;
    schedule?: {
      day: string;
      hours: string;
    }[];
  };
}

const BusinessInfoModal = ({ open, onOpenChange, business }: BusinessInfoModalProps) => {
  const defaultSchedule = [
    { day: "Segunda a Sexta", hours: "18:00 - 23:00" },
    { day: "Sábado", hours: "18:00 - 00:00" },
    { day: "Domingo", hours: "Fechado" },
  ];

  const schedule = business.schedule || defaultSchedule;

  const paymentMethods = [
    "💳 Cartão de Crédito",
    "💳 Cartão de Débito",
    "📱 PIX",
    "💵 Dinheiro"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{business.name}</DialogTitle>
          <Badge variant="secondary" className="w-fit">{business.category}</Badge>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Description */}
          {business.description && (
            <div>
              <p className="text-muted-foreground">{business.description}</p>
            </div>
          )}

          <Separator />

          {/* Schedule */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Horário de Funcionamento
            </h3>
            <div className="space-y-2">
              {schedule.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.day}</span>
                  <span className="font-medium">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Address */}
          {business.address && (
            <>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Endereço
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{business.address}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address || '')}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver no Google Maps
                </Button>
              </div>
              <Separator />
            </>
          )}

          {/* Delivery Info */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Condições de Entrega
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tempo de entrega:</span>
                <span className="font-medium">{business.deliveryTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pedido mínimo:</span>
                <span className="font-medium">R$ {business.minimumOrder.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxa de entrega:</span>
                <span className="font-medium">
                  {business.deliveryFee === 0 ? "Grátis" : `R$ ${business.deliveryFee.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Service Types */}
          <div>
            <h3 className="font-semibold mb-3">Tipos de Serviço</h3>
            <div className="flex gap-2">
              <Badge variant="secondary">🚚 Delivery</Badge>
              <Badge variant="secondary">📍 Retirada no Local</Badge>
            </div>
          </div>

          <Separator />

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Formas de Pagamento
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((method, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  {method}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ℹ️ Pagamento será realizado na hora da entrega/retirada
            </p>
          </div>

          {/* Contact */}
          {(business.phone || business.instagram) && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-3">Redes Sociais</h3>
                <div className="space-y-2">
                  {business.phone && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => window.open(`https://wa.me/55${business.phone?.replace(/\D/g, '')}?text=Olá! Gostaria de fazer um pedido`, '_blank')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      WhatsApp: {business.phone}
                    </Button>
                  )}
                  {business.instagram && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => window.open(`https://instagram.com/${business.instagram}`, '_blank')}
                    >
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram: @{business.instagram}
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessInfoModal;