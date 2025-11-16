import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, TrendingUp, Package, Copy, ExternalLink, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const DashboardHome = () => {
  const cardapioUrl = "https://seunegocio.delivery.com";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(cardapioUrl);
    toast.success("Link copiado para a área de transferência!");
  };

  const handleOpenCardapio = () => {
    window.open("/cardapio", "_blank");
  };

  const metrics = [
    {
      title: "Total de Vendas Hoje",
      value: "R$ 1.248,50",
      icon: DollarSign,
      change: "+12%",
      positive: true,
    },
    {
      title: "Pedidos Hoje",
      value: "23",
      icon: ShoppingBag,
      change: "+8%",
      positive: true,
    },
    {
      title: "Ticket Médio",
      value: "R$ 54,28",
      icon: TrendingUp,
      change: "-3%",
      positive: false,
    },
    {
      title: "Produtos Ativos",
      value: "42",
      icon: Package,
      change: "+2",
      positive: true,
    },
  ];

  const topProducts = [
    { position: 1, name: "X-Burger Especial", sales: 45, revenue: 1350 },
    { position: 2, name: "Pizza Margherita", sales: 38, revenue: 1520 },
    { position: 3, name: "Batata Frita Grande", sales: 32, revenue: 480 },
    { position: 4, name: "Refrigerante 2L", sales: 28, revenue: 280 },
    { position: 5, name: "Combo Família", sales: 25, revenue: 1875 },
  ];

  const recentOrders = [
    { id: "0023", customer: "João Silva", value: 45.5, status: "Em Preparo", time: "14:32" },
    { id: "0022", customer: "Maria Santos", value: 67.8, status: "Pronto", time: "14:28" },
    { id: "0021", customer: "Pedro Costa", value: 32.0, status: "Em Entrega", time: "14:15" },
    { id: "0020", customer: "Ana Lima", value: 89.9, status: "Finalizado", time: "13:58" },
    { id: "0019", customer: "Carlos Souza", value: 54.2, status: "Finalizado", time: "13:45" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Preparo":
        return "bg-yellow-500";
      case "Pronto":
        return "bg-blue-500";
      case "Em Entrega":
        return "bg-purple-500";
      case "Finalizado":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMedalEmoji = (position: number) => {
    switch (position) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${position}`;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do seu negócio
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs mt-1 ${metric.positive ? "text-green-600" : "text-red-600"}`}>
                {metric.change} em relação a ontem
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cardápio Link Card */}
      <Card>
        <CardHeader>
          <CardTitle>Seu Cardápio Digital</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <code className="flex-1 text-sm">{cardapioUrl}</code>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCopyLink} variant="outline" className="gap-2">
              <Copy className="w-4 h-4" />
              Copiar Link
            </Button>
            <Button onClick={handleOpenCardapio} variant="outline" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Abrir em Nova Aba
            </Button>
            <Button variant="outline" className="gap-2">
              <QrCode className="w-4 h-4" />
              QR Code
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Top 5 Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Vendas</TableHead>
                  <TableHead className="text-right">Receita</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.position}>
                    <TableCell className="font-medium text-lg">
                      {getMedalEmoji(product.position)}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-right">{product.sales}</TableCell>
                    <TableCell className="text-right">
                      R$ {product.revenue.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">#{order.id}</span>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {order.customer}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      R$ {order.value.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver todos os pedidos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
