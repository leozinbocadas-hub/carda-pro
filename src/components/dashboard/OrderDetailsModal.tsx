import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Clock,
  Phone,
  Mail,
  MapPin,
  Package,
  CreditCard,
  Printer,
  UserPlus,
  X,
  ExternalLink,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { toast } from "sonner";

interface OrderDetailsModalProps {
  order: any;
  open: boolean;
  onClose: () => void;
}

const OrderDetailsModal = ({ order, open, onClose }: OrderDetailsModalProps) => {
  const [currentStatus, setCurrentStatus] = useState(order?.status || "");
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  if (!order) return null;

  const statusOptions = [
    { value: "recebido", label: "Pedido Recebido" },
    { value: "aceito", label: "Pedido Aceito" },
    { value: "em-preparo", label: "Em Preparo" },
    { value: "pronto", label: "Pronto para Retirada/Entrega" },
    { value: "em-entrega", label: "Saiu para Entrega" },
    { value: "finalizado", label: "Entregue/Finalizado" },
    { value: "cancelado", label: "Cancelado" },
  ];

  const paymentMethodConfig = {
    dinheiro: { label: "Dinheiro", icon: "💵" },
    credito: { label: "Cartão de Crédito", icon: "💳" },
    debito: { label: "Cartão de Débito", icon: "💳" },
    pix: { label: "PIX", icon: "📱" },
  };

  const handleUpdateStatus = () => {
    toast.success("Status do pedido atualizado com sucesso!");
    // Aqui você implementaria a lógica de atualização no backend
  };

  const handlePrint = () => {
    window.print();
    toast.success("Preparando impressão do pedido...");
  };

  const handleAssignDelivery = () => {
    toast.success("Modal de atribuir entregador aberto");
    // Aqui você abriria um modal para selecionar o entregador
  };

  const handleCancelOrder = () => {
    toast.success("Pedido cancelado com sucesso!");
    setShowCancelDialog(false);
    onClose();
  };

  const handleOpenMaps = () => {
    if (order.address) {
      const address = `${order.address.street}, ${order.address.number}, ${order.address.neighborhood}, ${order.address.city} - ${order.address.state}`;
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, "_blank");
    }
  };

  const subtotal = order.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const deliveryFee = order.deliveryFee || 0;
  const discount = order.discount || 0;
  const total = subtotal + deliveryFee - discount;

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">Pedido #{order.id}</span>
                <Badge className={
                  order.status === "recebido" ? "bg-blue-500" :
                  order.status === "em-preparo" ? "bg-yellow-500" :
                  order.status === "pronto" ? "bg-green-500" :
                  order.status === "em-entrega" ? "bg-purple-500" :
                  order.status === "finalizado" ? "bg-gray-500" :
                  "bg-red-500"
                }>
                  {order.status.replace("-", " ").toUpperCase()}
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Status Update */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Atualizar Status</label>
              <div className="flex gap-2">
                <Select value={currentStatus} onValueChange={setCurrentStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleUpdateStatus}>Atualizar</Button>
              </div>
            </div>

            <Separator />

            {/* Customer Info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Informações do Cliente</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{order.customer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`tel:${order.customer.phone}`}
                    className="text-primary hover:underline"
                  >
                    {order.customer.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{order.customer.email}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Delivery Address */}
            {order.type === "delivery" && order.address && (
              <>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Endereço de Entrega</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                      <div>
                        <p>{order.address.street}, {order.address.number}</p>
                        {order.address.complement && <p className="text-sm text-muted-foreground">{order.address.complement}</p>}
                        <p>{order.address.neighborhood}</p>
                        <p>{order.address.city} - {order.address.state}</p>
                        {order.address.reference && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Referência: {order.address.reference}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={handleOpenMaps}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Abrir no Google Maps
                    </Button>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Order Items */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Itens do Pedido</h3>
              <div className="space-y-3">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <p className="font-medium">
                          {item.quantity}x {item.name}
                        </p>
                        {item.addons && item.addons.length > 0 && (
                          <p className="text-sm text-muted-foreground pl-4">
                            + {item.addons.join(", ")}
                          </p>
                        )}
                        {item.observation && (
                          <p className="text-sm text-muted-foreground pl-4 italic">
                            Obs: {item.observation}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ {item.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Taxa de entrega</span>
                    <span>R$ {deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Desconto</span>
                    <span>-R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Pagamento</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {paymentMethodConfig[order.paymentMethod].icon}{" "}
                    {paymentMethodConfig[order.paymentMethod].label}
                  </span>
                </div>
                {order.paymentMethod === "dinheiro" && order.changeFor && (
                  <p className="text-sm text-muted-foreground pl-6">
                    Troco para: R$ {order.changeFor.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* Timeline */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Histórico</h3>
              <div className="space-y-3">
                {order.timeline.map((event: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    {index === order.timeline.length - 1 ? (
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-muted-foreground">{event.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={handlePrint} variant="outline" className="gap-2">
                <Printer className="w-4 h-4" />
                Imprimir Pedido
              </Button>
              {order.type === "delivery" && (
                <Button onClick={handleAssignDelivery} variant="outline" className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Atribuir Entregador
                </Button>
              )}
              <Button
                onClick={() => setShowCancelDialog(true)}
                variant="outline"
                className="gap-2 text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4" />
                Cancelar Pedido
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Pedido</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar o pedido #{order.id}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Não, manter pedido</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelOrder} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Sim, cancelar pedido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrderDetailsModal;
