import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bike,
  LogOut,
  MapPin,
  Phone,
  CheckCircle2,
  Clock,
  DollarSign,
  Package,
  Navigation,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Pedido {
  id: string;
  numero: string;
  cliente: {
    nome: string;
    telefone: string;
  };
  endereco: {
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    referencia?: string;
    lat?: number;
    lng?: number;
  };
  itens: Array<{
    nome: string;
    quantidade: number;
  }>;
  valor: number;
  pagamento: string;
  observacoes?: string;
  status: string;
  horario: string;
}

const EntregadorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [disponivel, setDisponivel] = useState(true);
  const [pedidoAtual, setPedidoAtual] = useState<Pedido | null>(null);

  const [pedidosPendentes] = useState<Pedido[]>([
    {
      id: "1",
      numero: "#0145",
      cliente: {
        nome: "João Silva",
        telefone: "(11) 98765-4321",
      },
      endereco: {
        rua: "Rua das Flores",
        numero: "123",
        complemento: "Apto 45",
        bairro: "Centro",
        cidade: "São Paulo",
        referencia: "Próximo ao mercado",
        lat: -23.550520,
        lng: -46.633308,
      },
      itens: [
        { nome: "X-Burger", quantidade: 2 },
        { nome: "Batata Frita", quantidade: 1 },
      ],
      valor: 45.90,
      pagamento: "Cartão de Crédito",
      status: "pronto",
      horario: "14:30",
    },
    {
      id: "2",
      numero: "#0146",
      cliente: {
        nome: "Maria Santos",
        telefone: "(11) 91234-5678",
      },
      endereco: {
        rua: "Av. Paulista",
        numero: "1000",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        lat: -23.561414,
        lng: -46.656139,
      },
      itens: [
        { nome: "Pizza Grande", quantidade: 1 },
      ],
      valor: 62.00,
      pagamento: "Dinheiro - Troco R$ 80,00",
      status: "pronto",
      horario: "14:45",
    },
  ]);

  const [entregasHoje] = useState([
    { id: "1", numero: "#0140", horario: "12:30", valor: 35.00 },
    { id: "2", numero: "#0141", horario: "13:00", valor: 48.50 },
    { id: "3", numero: "#0142", horario: "13:30", valor: 55.90 },
  ]);

  useEffect(() => {
    const isLogado = localStorage.getItem("entregador_logado");
    if (!isLogado) {
      navigate("/entregador/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("entregador_logado");
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    navigate("/entregador/login");
  };

  const handleIniciarEntrega = (pedido: Pedido) => {
    setPedidoAtual(pedido);
    toast({
      title: "Entrega iniciada!",
      description: `Pedido ${pedido.numero} em andamento`,
    });
  };

  const handleMarcarEntregue = () => {
    if (!pedidoAtual) return;

    toast({
      title: "Entrega concluída!",
      description: `Pedido ${pedidoAtual.numero} foi entregue com sucesso`,
    });
    setPedidoAtual(null);
  };

  const abrirGoogleMaps = (endereco: Pedido["endereco"]) => {
    if (endereco.lat && endereco.lng) {
      window.open(
        `https://www.google.com/maps?q=${endereco.lat},${endereco.lng}`,
        "_blank"
      );
    } else {
      const enderecoFormatado = `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}`;
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoFormatado)}`,
        "_blank"
      );
    }
  };

  const totalEntregasHoje = entregasHoje.length;
  const totalArrecadadoHoje = entregasHoje.reduce((acc, e) => acc + e.valor, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Mobile-First */}
      <header className="sticky top-0 z-50 bg-card border-b">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Bike className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Portal Entregador</h1>
                <p className="text-xs text-muted-foreground">João Entregador</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>

          {/* Status Toggle */}
          <div className="mt-4 flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${disponivel ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
              <Label htmlFor="status" className="font-medium">
                {disponivel ? "Disponível para Entregas" : "Indisponível"}
              </Label>
            </div>
            <Switch
              id="status"
              checked={disponivel}
              onCheckedChange={setDisponivel}
            />
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Estatísticas do Dia */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entregas Hoje</p>
                  <p className="text-2xl font-bold">{totalEntregasHoje}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/10 rounded-full">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Arrecadado</p>
                  <p className="text-2xl font-bold">R$ {totalArrecadadoHoje.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Entrega Atual */}
        {pedidoAtual && (
          <Card className="border-primary shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-primary" />
                  Entrega em Andamento
                </CardTitle>
                <Badge className="bg-primary">{pedidoAtual.numero}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Cliente</p>
                  <p className="text-lg">{pedidoAtual.cliente.nome}</p>
                  <a
                    href={`tel:${pedidoAtual.cliente.telefone}`}
                    className="flex items-center gap-2 text-primary hover:underline mt-1"
                  >
                    <Phone className="w-4 h-4" />
                    {pedidoAtual.cliente.telefone}
                  </a>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium mb-2">Endereço de Entrega</p>
                  <div className="space-y-1 text-sm">
                    <p>{pedidoAtual.endereco.rua}, {pedidoAtual.endereco.numero}</p>
                    {pedidoAtual.endereco.complemento && (
                      <p className="text-muted-foreground">{pedidoAtual.endereco.complemento}</p>
                    )}
                    <p>{pedidoAtual.endereco.bairro} - {pedidoAtual.endereco.cidade}</p>
                    {pedidoAtual.endereco.referencia && (
                      <p className="text-muted-foreground">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {pedidoAtual.endereco.referencia}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => abrirGoogleMaps(pedidoAtual.endereco)}
                    className="w-full mt-3 gap-2"
                    size="lg"
                  >
                    <Navigation className="w-5 h-5" />
                    Abrir no Google Maps
                  </Button>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium mb-2">Itens do Pedido</p>
                  <ul className="space-y-1">
                    {pedidoAtual.itens.map((item, idx) => (
                      <li key={idx} className="text-sm">
                        {item.quantidade}x {item.nome}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-medium">Valor Total:</span>
                  <span className="text-xl font-bold">R$ {pedidoAtual.valor.toFixed(2)}</span>
                </div>

                <div>
                  <p className="text-sm font-medium">Forma de Pagamento:</p>
                  <p className="text-sm text-muted-foreground">{pedidoAtual.pagamento}</p>
                </div>

                {pedidoAtual.observacoes && (
                  <div>
                    <p className="text-sm font-medium">Observações:</p>
                    <p className="text-sm text-muted-foreground">{pedidoAtual.observacoes}</p>
                  </div>
                )}
              </div>

              <Button
                onClick={handleMarcarEntregue}
                className="w-full gap-2"
                size="lg"
              >
                <CheckCircle2 className="w-5 h-5" />
                Marcar como Entregue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="pendentes" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pendentes">
              Pendentes ({pedidosPendentes.length})
            </TabsTrigger>
            <TabsTrigger value="historico">
              Histórico ({totalEntregasHoje})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pendentes" className="space-y-4">
            {!pedidoAtual && pedidosPendentes.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhuma entrega pendente no momento</p>
                </CardContent>
              </Card>
            )}

            {!pedidoAtual && pedidosPendentes.map((pedido) => (
              <Card key={pedido.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{pedido.numero}</CardTitle>
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      {pedido.horario}
                    </Badge>
                  </div>
                  <CardDescription>{pedido.cliente.nome}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-1">
                    <p className="font-medium">
                      {pedido.endereco.rua}, {pedido.endereco.numero}
                    </p>
                    <p className="text-muted-foreground">
                      {pedido.endereco.bairro} - {pedido.endereco.cidade}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-semibold">R$ {pedido.valor.toFixed(2)}</span>
                    <Button onClick={() => handleIniciarEntrega(pedido)} size="sm">
                      Iniciar Entrega
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="historico" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Entregas Realizadas Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {entregasHoje.map((entrega) => (
                    <div
                      key={entrega.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{entrega.numero}</p>
                        <p className="text-sm text-muted-foreground">{entrega.horario}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R$ {entrega.valor.toFixed(2)}</p>
                        <Badge variant="default" className="mt-1">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Entregue
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default EntregadorDashboard;
