import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, ChefHat, Truck, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PedidoConfirmado = () => {
  const navigate = useNavigate();

  // Mock data
  const orderId = "#0001";
  const estimatedTime = "30-40 min";
  const orderItems = [
    { name: "X-Burger Especial", quantity: 2, extras: "Bacon, Cheddar extra" },
    { name: "Batata Frita Grande", quantity: 1 },
  ];
  const deliveryAddress = "Rua Exemplo, 123 - Apto 101\nCentro, São Paulo - SP";
  const total = 72.70;

  const statusSteps = [
    { icon: CheckCircle2, label: "Pedido Recebido", status: "completed", time: "14:32" },
    { icon: Clock, label: "Aguardando Confirmação", status: "current" },
    { icon: ChefHat, label: "Em Preparo", status: "pending" },
    { icon: Truck, label: "Saiu para Entrega", status: "pending" },
    { icon: Package, label: "Entregue", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container px-4 max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-success/10 mx-auto mb-4 flex items-center justify-center animate-scale-in">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Pedido Realizado com Sucesso! 🎉
          </h1>
          <p className="text-lg text-muted-foreground">
            Seu pedido foi enviado ao restaurante
          </p>
        </div>

        {/* Order ID and Time */}
        <Card className="mb-6 animate-fade-in animation-delay-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Número do Pedido</p>
                <p className="text-2xl font-bold">{orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Tempo Estimado</p>
                <Badge className="text-base px-4 py-2 bg-primary">
                  <Clock className="w-4 h-4 mr-2" />
                  {estimatedTime}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Timeline */}
        <Card className="mb-6 animate-fade-in animation-delay-400">
          <CardHeader>
            <CardTitle>Status do Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.status === "completed"
                          ? "bg-success text-white"
                          : step.status === "current"
                          ? "bg-primary text-white animate-pulse"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p
                        className={`font-semibold ${
                          step.status === "pending" ? "text-muted-foreground" : ""
                        }`}
                      >
                        {step.label}
                      </p>
                      {step.time && (
                        <p className="text-sm text-muted-foreground">{step.time}</p>
                      )}
                    </div>
                    {step.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="mb-6 animate-fade-in animation-delay-600">
          <CardHeader>
            <CardTitle>Detalhes do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Items */}
            <div>
              <h3 className="font-semibold mb-3">Itens</h3>
              <div className="space-y-2">
                {orderItems.map((item, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium">
                      {item.quantity}x {item.name}
                    </p>
                    {item.extras && (
                      <p className="text-muted-foreground ml-4">+ {item.extras}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Endereço de Entrega</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {deliveryAddress}
              </p>
            </div>

            {/* Payment */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Pagamento</h3>
              <p className="text-sm text-muted-foreground">
                Dinheiro (na entrega) • Troco para R$ 100,00
              </p>
            </div>

            {/* Total */}
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold text-primary">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-600">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/cardapio")}
          >
            Voltar ao Cardápio
          </Button>
          <Button
            className="flex-1 bg-gradient-primary hover:opacity-90 btn-active"
            onClick={() => navigate("/meus-pedidos")}
          >
            Ver Meus Pedidos
          </Button>
        </div>

        {/* Help */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Precisa de ajuda?{" "}
            <a href="#" className="text-primary hover:underline">
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PedidoConfirmado;
