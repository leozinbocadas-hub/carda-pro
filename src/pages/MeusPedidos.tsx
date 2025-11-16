import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Clock, MapPin, Phone, ChevronRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data - em produção viria do backend
const mockOrders = [
  {
    id: "0001",
    date: "2024-11-16T20:30:00",
    status: "Em Entrega",
    items: [
      { name: "X-Burger Especial", quantity: 2, price: 25.90 },
      { name: "Batata Frita Grande", quantity: 1, price: 15.90 },
      { name: "Coca-Cola Lata", quantity: 2, price: 5.00 }
    ],
    total: 77.70,
    deliveryFee: 5.00,
    paymentMethod: "Cartão de Crédito",
    address: "Rua das Flores, 123 - Apto 45",
    phone: "(11) 99999-9999",
    statusHistory: [
      { status: "Pedido Recebido", time: "20:30" },
      { status: "Pedido Aceito", time: "20:31" },
      { status: "Em Preparo", time: "20:35" },
      { status: "Pronto para Entrega", time: "20:55" },
      { status: "Saiu para Entrega", time: "21:00" }
    ]
  },
  {
    id: "0002",
    date: "2024-11-15T19:15:00",
    status: "Entregue",
    items: [
      { name: "Burger Duplo", quantity: 1, price: 32.90 },
      { name: "Suco Natural", quantity: 1, price: 8.90 }
    ],
    total: 46.80,
    deliveryFee: 0,
    paymentMethod: "PIX",
    address: "Rua das Flores, 123 - Apto 45",
    phone: "(11) 99999-9999",
    statusHistory: [
      { status: "Pedido Recebido", time: "19:15" },
      { status: "Pedido Aceito", time: "19:16" },
      { status: "Em Preparo", time: "19:20" },
      { status: "Pronto para Entrega", time: "19:40" },
      { status: "Saiu para Entrega", time: "19:45" },
      { status: "Entregue", time: "20:10" }
    ]
  },
  {
    id: "0003",
    date: "2024-11-14T21:00:00",
    status: "Entregue",
    items: [
      { name: "Chicken Burger", quantity: 2, price: 22.90 },
      { name: "Onion Rings", quantity: 1, price: 12.90 }
    ],
    total: 63.70,
    deliveryFee: 5.00,
    paymentMethod: "Dinheiro",
    address: "Rua das Flores, 123 - Apto 45",
    phone: "(11) 99999-9999",
    statusHistory: [
      { status: "Pedido Recebido", time: "21:00" },
      { status: "Pedido Aceito", time: "21:01" },
      { status: "Em Preparo", time: "21:05" },
      { status: "Pronto para Entrega", time: "21:25" },
      { status: "Saiu para Entrega", time: "21:30" },
      { status: "Entregue", time: "21:55" }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pedido Recebido":
    case "Pedido Aceito":
      return "bg-blue-500";
    case "Em Preparo":
      return "bg-yellow-500";
    case "Pronto para Entrega":
    case "Saiu para Entrega":
    case "Em Entrega":
      return "bg-orange-500";
    case "Entregue":
      return "bg-green-500";
    case "Cancelado":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
  switch (status) {
    case "Entregue":
      return "default";
    case "Cancelado":
      return "destructive";
    default:
      return "secondary";
  }
};

const MeusPedidos = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-6 mb-6">
        <div className="container px-4">
          <Link to="/cardapio">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Cardápio
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Meus Pedidos</h1>
              <p className="text-sm opacity-90">Acompanhe o status dos seus pedidos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4">
        {mockOrders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Nenhum pedido ainda</h2>
              <p className="text-muted-foreground mb-6">
                Faça seu primeiro pedido e acompanhe aqui!
              </p>
              <Link to="/cardapio">
                <Button>Ver Cardápio</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <Card
                key={order.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-1">
                        Pedido #{order.id}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.date)}
                      </p>
                    </div>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-lg font-bold text-primary">
                      R$ {order.total.toFixed(2)}
                    </span>
                  </div>
                  <Button variant="ghost" className="w-full mt-3" size="sm">
                    Ver Detalhes
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Pedido #{selectedOrder.id}
                </DialogTitle>
                <Badge variant={getStatusVariant(selectedOrder.status)} className="w-fit">
                  {selectedOrder.status}
                </Badge>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Timeline */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Status do Pedido
                  </h3>
                  <div className="space-y-4">
                    {selectedOrder.statusHistory.map((item: any, index: number) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`} />
                          {index < selectedOrder.statusHistory.length - 1 && (
                            <div className="w-0.5 h-8 bg-border" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="font-medium text-sm">{item.status}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Items */}
                <div>
                  <h3 className="font-semibold mb-3">Itens do Pedido</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <Separator className="my-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        R$ {(selectedOrder.total - selectedOrder.deliveryFee).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taxa de entrega</span>
                      <span className="font-medium">
                        {selectedOrder.deliveryFee === 0 
                          ? "Grátis" 
                          : `R$ ${selectedOrder.deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-lg font-bold text-primary">
                        R$ {selectedOrder.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Delivery Info */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Endereço de Entrega
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedOrder.address}</p>
                </div>

                <Separator />

                {/* Contact */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Contato
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedOrder.phone}</p>
                </div>

                <Separator />

                {/* Payment */}
                <div>
                  <h3 className="font-semibold mb-3">Pagamento</h3>
                  <p className="text-sm text-muted-foreground">{selectedOrder.paymentMethod}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link to="/cardapio" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Fazer Novo Pedido
                    </Button>
                  </Link>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      // Add all items to cart logic would go here
                      setSelectedOrder(null);
                    }}
                  >
                    Repetir Pedido
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeusPedidos;