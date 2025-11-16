import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, CreditCard, Phone, Package } from "lucide-react";
import OrderDetailsModal from "@/components/dashboard/OrderDetailsModal";

interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  datetime: string;
  items: Array<{
    name: string;
    quantity: number;
    addons?: string[];
    observation?: string;
    price: number;
  }>;
  total: number;
  status: "recebido" | "em-preparo" | "pronto" | "em-entrega" | "finalizado" | "cancelado";
  paymentMethod: "dinheiro" | "credito" | "debito" | "pix";
  type: "delivery" | "retirada";
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    reference?: string;
  };
  deliveryFee?: number;
  discount?: number;
  changeFor?: number;
  timeline: Array<{
    status: string;
    timestamp: string;
  }>;
}

const mockOrders: Order[] = [
  {
    id: "0025",
    customer: {
      name: "João Silva",
      phone: "(11) 98765-4321",
      email: "joao@email.com",
    },
    datetime: "2024-01-20 14:32",
    items: [
      {
        name: "X-Burger Especial",
        quantity: 2,
        addons: ["Bacon", "Cheddar"],
        observation: "Sem cebola",
        price: 30.0,
      },
      {
        name: "Batata Frita Grande",
        quantity: 1,
        price: 15.0,
      },
    ],
    total: 85.0,
    status: "recebido",
    paymentMethod: "pix",
    type: "delivery",
    address: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      reference: "Próximo ao mercado",
    },
    deliveryFee: 5.0,
    timeline: [
      { status: "Pedido recebido", timestamp: "14:32" },
    ],
  },
  {
    id: "0024",
    customer: {
      name: "Maria Santos",
      phone: "(11) 91234-5678",
      email: "maria@email.com",
    },
    datetime: "2024-01-20 14:28",
    items: [
      {
        name: "Pizza Margherita",
        quantity: 1,
        price: 45.0,
      },
    ],
    total: 50.0,
    status: "em-preparo",
    paymentMethod: "credito",
    type: "delivery",
    deliveryFee: 5.0,
    timeline: [
      { status: "Pedido recebido", timestamp: "14:28" },
      { status: "Pedido aceito", timestamp: "14:29" },
      { status: "Em preparo", timestamp: "14:30" },
    ],
  },
  {
    id: "0023",
    customer: {
      name: "Pedro Costa",
      phone: "(11) 99876-5432",
      email: "pedro@email.com",
    },
    datetime: "2024-01-20 14:15",
    items: [
      {
        name: "Combo Família",
        quantity: 1,
        price: 75.0,
      },
    ],
    total: 75.0,
    status: "pronto",
    paymentMethod: "dinheiro",
    type: "retirada",
    changeFor: 100.0,
    timeline: [
      { status: "Pedido recebido", timestamp: "14:15" },
      { status: "Pedido aceito", timestamp: "14:16" },
      { status: "Em preparo", timestamp: "14:17" },
      { status: "Pronto para retirada", timestamp: "14:35" },
    ],
  },
];

const Pedidos = () => {
  const [selectedTab, setSelectedTab] = useState("todos");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statusConfig = {
    recebido: { label: "Recebido", color: "bg-blue-500" },
    "em-preparo": { label: "Em Preparo", color: "bg-yellow-500" },
    pronto: { label: "Pronto", color: "bg-green-500" },
    "em-entrega": { label: "Em Entrega", color: "bg-purple-500" },
    finalizado: { label: "Finalizado", color: "bg-gray-500" },
    cancelado: { label: "Cancelado", color: "bg-red-500" },
  };

  const paymentMethodConfig = {
    dinheiro: { label: "Dinheiro", icon: "💵" },
    credito: { label: "Crédito", icon: "💳" },
    debito: { label: "Débito", icon: "💳" },
    pix: { label: "PIX", icon: "📱" },
  };

  const getFilteredOrders = (status: string) => {
    if (status === "todos") return mockOrders;
    return mockOrders.filter((order) => order.status === status);
  };

  const getOrderCount = (status: string) => {
    return getFilteredOrders(status).length;
  };

  const getItemsSummary = (items: Order["items"]) => {
    return items.map((item) => `${item.quantity}x ${item.name}`).join(", ");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Pedidos</h1>
        <p className="text-muted-foreground">
          Gerencie todos os pedidos do seu negócio
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
          <TabsTrigger value="todos" className="relative">
            Todos
            {getOrderCount("todos") > 0 && (
              <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {getOrderCount("todos")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="recebido" className="relative">
            Recebidos
            {getOrderCount("recebido") > 0 && (
              <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-500">
                {getOrderCount("recebido")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="em-preparo" className="relative">
            Em Preparo
            {getOrderCount("em-preparo") > 0 && (
              <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-yellow-500">
                {getOrderCount("em-preparo")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="pronto" className="relative">
            Prontos
            {getOrderCount("pronto") > 0 && (
              <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-500">
                {getOrderCount("pronto")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="em-entrega" className="relative">
            Em Entrega
            {getOrderCount("em-entrega") > 0 && (
              <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-purple-500">
                {getOrderCount("em-entrega")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="finalizado" className="relative">
            Finalizados
            {getOrderCount("finalizado") > 0 && (
              <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {getOrderCount("finalizado")}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="cancelado" className="relative">
            Cancelados
            {getOrderCount("cancelado") > 0 && (
              <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                {getOrderCount("cancelado")}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {["todos", "recebido", "em-preparo", "pronto", "em-entrega", "finalizado", "cancelado"].map(
          (tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {getFilteredOrders(tab).length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Package className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum pedido encontrado</h3>
                    <p className="text-muted-foreground text-center">
                      Não há pedidos nesta categoria no momento
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {getFilteredOrders(tab).map((order) => (
                    <Card key={order.id} className="hover-lift cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          {/* Order Info */}
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-lg font-bold">#{order.id}</span>
                              <Badge className={statusConfig[order.status].color}>
                                {statusConfig[order.status].label}
                              </Badge>
                              <Badge variant="outline">
                                {order.type === "delivery" ? "🚚 Delivery" : "📍 Retirada"}
                              </Badge>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>{order.datetime}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{order.customer.name}</span>
                                <span className="text-muted-foreground">•</span>
                                <a
                                  href={`tel:${order.customer.phone}`}
                                  className="text-primary hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {order.customer.phone}
                                </a>
                              </div>
                              <div className="flex items-start gap-2 text-muted-foreground">
                                <Package className="w-4 h-4 mt-0.5" />
                                <span className="line-clamp-1">{getItemsSummary(order.items)}</span>
                              </div>
                              {order.type === "delivery" && order.address && (
                                <div className="flex items-start gap-2 text-muted-foreground">
                                  <MapPin className="w-4 h-4 mt-0.5" />
                                  <span className="line-clamp-1">
                                    {order.address.street}, {order.address.number} - {order.address.neighborhood}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <CreditCard className="w-4 h-4" />
                                <span>
                                  {paymentMethodConfig[order.paymentMethod].icon}{" "}
                                  {paymentMethodConfig[order.paymentMethod].label}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Total and Action */}
                          <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4">
                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary">
                                R$ {order.total.toFixed(2)}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {order.items.length} {order.items.length === 1 ? "item" : "itens"}
                              </p>
                            </div>
                            <Button
                              onClick={() => setSelectedOrder(order)}
                              variant="outline"
                              className="whitespace-nowrap"
                            >
                              Ver Detalhes
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          )
        )}
      </Tabs>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default Pedidos;
