import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
  User,
  TrendingUp,
  Star,
  Zap,
  AlertCircle,
  Timer,
  Target,
  Award,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

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
  const mediaEntregaDia = totalArrecadadoHoje / (totalEntregasHoje || 1);
  const metaDiaria = 10;
  const progressoMeta = (totalEntregasHoje / metaDiaria) * 100;
  const tempoMedioEntrega = 25; // minutos
  const avaliacaoMedia = 4.8;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header Mobile-First Melhorado */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b shadow-lg">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg">
                  <Bike className="w-7 h-7 text-primary-foreground" />
                </div>
                {disponivel && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card animate-pulse" />
                )}
              </div>
              <div>
                <h1 className="font-bold text-lg">João Entregador</h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  {avaliacaoMedia} • {totalEntregasHoje} entregas hoje
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>

          {/* Status Toggle Melhorado */}
          <div className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
            disponivel 
              ? "bg-green-500/10 border-green-500/30" 
              : "bg-red-500/10 border-red-500/30"
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                disponivel ? "bg-green-500/20" : "bg-red-500/20"
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  disponivel ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`} />
              </div>
              <div>
                <Label htmlFor="status" className="font-semibold text-base cursor-pointer">
                  {disponivel ? "Disponível para Entregas" : "Indisponível"}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {disponivel ? "Recebendo novos pedidos" : "Não recebendo pedidos"}
                </p>
              </div>
            </div>
            <Switch
              id="status"
              checked={disponivel}
              onCheckedChange={setDisponivel}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Meta do Dia */}
        {disponivel && (
          <Alert className="border-primary/50 bg-primary/5 animate-fade-in">
            <Target className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">Meta do Dia</AlertTitle>
            <AlertDescription>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{totalEntregasHoje} de {metaDiaria} entregas</span>
                  <span className="font-semibold">{progressoMeta.toFixed(0)}%</span>
                </div>
                <Progress value={progressoMeta} className="h-2" />
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Estatísticas Melhoradas */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-blue-500/5 animate-fade-in">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  {progressoMeta >= 100 && (
                    <Badge variant="default" className="gap-1 bg-green-600">
                      <Award className="w-3 h-3" />
                      Meta!
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entregas Hoje</p>
                  <p className="text-3xl font-bold mt-1">{totalEntregasHoje}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  <span>+2 vs ontem</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-green-500/5 animate-fade-in [animation-delay:100ms]">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="p-3 bg-green-500/10 rounded-xl w-fit">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Arrecadado</p>
                  <p className="text-3xl font-bold mt-1 text-green-600">
                    R$ {totalArrecadadoHoje.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <DollarSign className="w-3 h-3" />
                  <span>R$ {mediaEntregaDia.toFixed(2)} média</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-purple-500/5 animate-fade-in [animation-delay:200ms]">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="p-3 bg-purple-500/10 rounded-xl w-fit">
                  <Timer className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tempo Médio</p>
                  <p className="text-3xl font-bold mt-1">{tempoMedioEntrega}</p>
                  <p className="text-xs text-muted-foreground">minutos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-yellow-500/5 animate-fade-in [animation-delay:300ms]">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="p-3 bg-yellow-500/10 rounded-xl w-fit">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avaliação</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-3xl font-bold">{avaliacaoMedia}</p>
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= Math.floor(avaliacaoMedia) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Entrega Atual com Design Melhorado */}
        {pedidoAtual && (
          <Card className="border-2 border-primary shadow-2xl bg-gradient-to-br from-card to-primary/5 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="p-2 bg-primary rounded-lg">
                    <Navigation className="w-5 h-5 text-primary-foreground animate-pulse" />
                  </div>
                  Entrega em Andamento
                </CardTitle>
                <Badge className="bg-primary text-lg px-3 py-1">{pedidoAtual.numero}</Badge>
              </div>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4" />
                Iniciado às {pedidoAtual.horario}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                {/* Informações do Cliente - Card Destacado */}
                <div className="p-4 bg-muted/50 rounded-xl border">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {pedidoAtual.cliente.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{pedidoAtual.cliente.nome}</p>
                      <a
                        href={`tel:${pedidoAtual.cliente.telefone}`}
                        className="flex items-center gap-2 text-primary hover:underline mt-1 font-medium"
                      >
                        <Phone className="w-4 h-4" />
                        {pedidoAtual.cliente.telefone}
                      </a>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Endereço - Mais Destacado */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <p className="font-semibold text-base">Endereço de Entrega</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl space-y-2">
                    <p className="font-medium text-base">
                      {pedidoAtual.endereco.rua}, {pedidoAtual.endereco.numero}
                    </p>
                    {pedidoAtual.endereco.complemento && (
                      <p className="text-sm text-muted-foreground">
                        {pedidoAtual.endereco.complemento}
                      </p>
                    )}
                    <p className="text-sm">
                      {pedidoAtual.endereco.bairro} - {pedidoAtual.endereco.cidade}
                    </p>
                    {pedidoAtual.endereco.referencia && (
                      <div className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20 mt-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-yellow-600">Ponto de Referência</p>
                          <p className="text-sm text-yellow-600/80">{pedidoAtual.endereco.referencia}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => abrirGoogleMaps(pedidoAtual.endereco)}
                    className="w-full gap-2 h-12 text-base font-semibold"
                    size="lg"
                  >
                    <Navigation className="w-5 h-5" />
                    Abrir no Google Maps
                  </Button>
                </div>

                <Separator />

                {/* Itens e Valores */}
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" />
                      Itens do Pedido
                    </p>
                    <div className="space-y-2">
                      {pedidoAtual.itens.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="rounded-full w-6 h-6 flex items-center justify-center p-0">
                              {item.quantidade}
                            </Badge>
                            <span className="font-medium">{item.nome}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-base">Valor Total:</span>
                      <span className="text-2xl font-bold text-green-600">
                        R$ {pedidoAtual.valor.toFixed(2)}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div>
                      <p className="text-sm font-medium mb-1">Forma de Pagamento:</p>
                      <p className="text-sm text-muted-foreground font-medium">
                        {pedidoAtual.pagamento}
                      </p>
                    </div>
                  </div>

                  {pedidoAtual.observacoes && (
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                      <p className="text-sm font-semibold mb-1 text-blue-600">Observações do Cliente:</p>
                      <p className="text-sm text-blue-600/80">{pedidoAtual.observacoes}</p>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleMarcarEntregue}
                className="w-full gap-2 h-14 text-lg font-bold"
                size="lg"
              >
                <CheckCircle2 className="w-6 h-6" />
                Marcar como Entregue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Tabs Melhorados */}
        <Tabs defaultValue="pendentes" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-muted/50">
            <TabsTrigger value="pendentes" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Clock className="w-4 h-4" />
              Pendentes ({pedidosPendentes.length})
            </TabsTrigger>
            <TabsTrigger value="historico" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CheckCircle2 className="w-4 h-4" />
              Histórico ({totalEntregasHoje})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pendentes" className="space-y-4 animate-fade-in">
            {!pedidoAtual && pedidosPendentes.length === 0 && (
              <Card className="border-none shadow-lg">
                <CardContent className="py-16 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-6 bg-muted rounded-full">
                      <Clock className="w-16 h-16 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Nenhuma entrega pendente</h3>
                      <p className="text-muted-foreground mt-1">
                        Aguardando novos pedidos...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!pedidoAtual && pedidosPendentes.map((pedido, index) => (
              <Card 
                key={pedido.id} 
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="default" className="text-base px-3 py-1 font-semibold">
                      {pedido.numero}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="w-3 h-3" />
                      {pedido.horario}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    {pedido.cliente.nome}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3" />
                    {pedido.cliente.telefone}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5" />
                      <div className="text-sm space-y-1 flex-1">
                        <p className="font-semibold">
                          {pedido.endereco.rua}, {pedido.endereco.numero}
                        </p>
                        <p className="text-muted-foreground">
                          {pedido.endereco.bairro} - {pedido.endereco.cidade}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {pedido.itens.length} {pedido.itens.length === 1 ? 'item' : 'itens'}
                      </span>
                    </div>
                    <span className="text-xl font-bold text-green-600">
                      R$ {pedido.valor.toFixed(2)}
                    </span>
                  </div>

                  <Button 
                    onClick={() => handleIniciarEntrega(pedido)} 
                    className="w-full gap-2 h-11"
                    size="lg"
                  >
                    <Zap className="w-4 h-4" />
                    Iniciar Entrega
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="historico" className="space-y-4 animate-fade-in">
            <Card className="border-none shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Entregas Realizadas Hoje
                </CardTitle>
                <CardDescription>
                  Total: R$ {totalArrecadadoHoje.toFixed(2)} em {totalEntregasHoje} entregas
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {entregasHoje.map((entrega, index) => (
                    <div
                      key={entrega.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{entrega.numero}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {entrega.horario}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-lg">
                          R$ {entrega.valor.toFixed(2)}
                        </p>
                        <Badge variant="default" className="mt-1 bg-green-600 gap-1">
                          <CheckCircle2 className="w-3 h-3" />
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
