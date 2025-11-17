import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  ShoppingBag,
  Search,
  Filter,
  Eye,
  Ban,
  Trash2,
  LogIn,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Crown,
  UserCheck,
  Activity,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
  TrendingDown,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface Cliente {
  id: string;
  nome: string;
  negocio: string;
  email: string;
  plano: "Gratuito" | "Advanced";
  status: "ativo" | "suspenso";
  dataCadastro: string;
  pedidosMes: number;
}

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlano, setFilterPlano] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [clientes] = useState<Cliente[]>([
    {
      id: "1",
      nome: "João Silva",
      negocio: "Hamburgueria do João",
      email: "joao@email.com",
      plano: "Advanced",
      status: "ativo",
      dataCadastro: "2024-01-15",
      pedidosMes: 245,
    },
    {
      id: "2",
      nome: "Maria Santos",
      negocio: "Pizzaria Bella",
      email: "maria@email.com",
      plano: "Gratuito",
      status: "ativo",
      dataCadastro: "2024-02-20",
      pedidosMes: 48,
    },
    {
      id: "3",
      nome: "Pedro Costa",
      negocio: "Açaí Premium",
      email: "pedro@email.com",
      plano: "Advanced",
      status: "suspenso",
      dataCadastro: "2024-03-10",
      pedidosMes: 0,
    },
  ]);

  const filteredClientes = clientes.filter((cliente) => {
    const matchesSearch = 
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.negocio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlano = filterPlano === "all" || cliente.plano === filterPlano;
    const matchesStatus = filterStatus === "all" || cliente.status === filterStatus;

    return matchesSearch && matchesPlano && matchesStatus;
  });

  const totalClientes = clientes.length;
  const clientesAdvanced = clientes.filter(c => c.plano === "Advanced").length;
  const clientesGratuitos = clientes.filter(c => c.plano === "Gratuito").length;
  const clientesAtivos = clientes.filter(c => c.status === "ativo").length;
  const receitaMensal = clientesAdvanced * 49.90;
  const receitaMesAnterior = (clientesAdvanced - 1) * 49.90;
  const crescimentoReceita = receitaMesAnterior > 0 
    ? ((receitaMensal - receitaMesAnterior) / receitaMesAnterior) * 100 
    : 100;
  const totalPedidosMes = clientes.reduce((acc, c) => acc + c.pedidosMes, 0);
  const pedidosMesAnterior = totalPedidosMes - 45;
  const crescimentoPedidos = ((totalPedidosMes - pedidosMesAnterior) / pedidosMesAnterior) * 100;
  const taxaConversao = (clientesAdvanced / totalClientes) * 100;
  const ticketMedio = totalPedidosMes > 0 ? receitaMensal / totalPedidosMes : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="space-y-8 p-4 md:p-8">
        {/* Header com gradiente */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-primary/70 p-8 text-primary-foreground shadow-2xl">
          <div className="absolute -right-8 -top-8 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Crown className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Dashboard Admin</h1>
                <p className="text-primary-foreground/80 mt-1">
                  Visão completa da plataforma e métricas em tempo real
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alertas e Status */}
        <div className="grid gap-4 md:grid-cols-2">
          <Alert className="border-green-500/50 bg-green-500/10 animate-fade-in">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Sistema Operacional</AlertTitle>
            <AlertDescription className="text-green-600/80">
              Todos os serviços funcionando normalmente • Uptime: 99.9%
            </AlertDescription>
          </Alert>
          <Alert className="border-blue-500/50 bg-blue-500/10 animate-fade-in">
            <Activity className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-600">Atividade Recente</AlertTitle>
            <AlertDescription className="text-blue-600/80">
              3 novos cadastros hoje • {clientesAtivos} clientes ativos
            </AlertDescription>
          </Alert>
        </div>

        {/* Métricas Principais com Animação */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50 animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalClientes}</div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">+3</span>
                <span className="text-xs text-muted-foreground">este mês</span>
              </div>
              <Progress value={75} className="mt-3 h-1" />
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50 animate-fade-in [animation-delay:100ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal (MRR)</CardTitle>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">R$ {receitaMensal.toFixed(2)}</div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  +{crescimentoReceita.toFixed(1)}%
                </span>
                <span className="text-xs text-muted-foreground">vs mês anterior</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">ARR</span>
                <span className="text-sm font-semibold">R$ {(receitaMensal * 12).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50 animate-fade-in [animation-delay:200ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pedidos Processados</CardTitle>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <ShoppingBag className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPedidosMes}</div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  +{crescimentoPedidos.toFixed(1)}%
                </span>
                <span className="text-xs text-muted-foreground">crescimento</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">Média/Cliente</span>
                <span className="text-sm font-semibold">{Math.round(totalPedidosMes / totalClientes)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50 animate-fade-in [animation-delay:300ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{taxaConversao.toFixed(1)}%</div>
              <div className="flex items-center gap-1 mt-2">
                <Zap className="h-4 w-4 text-orange-600" />
                <span className="text-xs text-muted-foreground">Gratuito → Advanced</span>
              </div>
              <Progress value={taxaConversao} className="mt-3 h-1" />
            </CardContent>
          </Card>
        </div>

        {/* Métricas Secundárias */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <UserCheck className="h-4 w-4 text-primary" />
                Clientes Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{clientesAtivos}</span>
                  <Badge variant="default">{((clientesAtivos / totalClientes) * 100).toFixed(0)}%</Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Suspensos</span>
                    <span className="font-medium">{totalClientes - clientesAtivos}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-4 w-4 text-primary" />
                Ticket Médio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">R$ {ticketMedio.toFixed(2)}</span>
                  <Badge variant="secondary">Por pedido</Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">LTV Estimado</span>
                    <span className="font-medium">R$ {(ticketMedio * 50).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4 text-primary" />
                Retenção
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">94.2%</span>
                  <Badge variant="default" className="bg-green-600">Excelente</Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de Churn</span>
                    <span className="font-medium text-red-600">5.8%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gestão de Clientes */}
        <Tabs defaultValue="clientes" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 bg-muted/50">
            <TabsTrigger value="clientes" className="gap-2">
              <Users className="w-4 h-4" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="metricas" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Análises
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clientes" className="space-y-6 animate-fade-in">
            <Card className="border-none shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Gestão de Clientes</CardTitle>
                    <CardDescription className="mt-1">
                      Visualize e gerencie todos os clientes da plataforma
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    {filteredClientes.length} clientes
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Filtros Melhorados */}
                <div className="flex flex-col md:flex-row gap-4 bg-muted/30 p-4 rounded-xl">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nome, negócio ou email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-11 bg-background"
                    />
                  </div>
                  <Select value={filterPlano} onValueChange={setFilterPlano}>
                    <SelectTrigger className="w-full md:w-[200px] h-11 bg-background">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filtrar Plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Planos</SelectItem>
                      <SelectItem value="Gratuito">Gratuito</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-[200px] h-11 bg-background">
                      <SelectValue placeholder="Filtrar Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="suspenso">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tabela de Clientes Melhorada */}
                <div className="border rounded-xl overflow-hidden bg-card shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="font-semibold">Cliente</TableHead>
                        <TableHead className="font-semibold">Negócio</TableHead>
                        <TableHead className="font-semibold">Email</TableHead>
                        <TableHead className="font-semibold">Plano</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Pedidos/Mês</TableHead>
                        <TableHead className="font-semibold">Receita</TableHead>
                        <TableHead className="font-semibold">Cadastro</TableHead>
                        <TableHead className="text-right font-semibold">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClientes.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-12">
                            <div className="flex flex-col items-center gap-3">
                              <div className="p-4 bg-muted rounded-full">
                                <Users className="w-8 h-8 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-medium">Nenhum cliente encontrado</p>
                                <p className="text-sm text-muted-foreground">Tente ajustar os filtros</p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredClientes.map((cliente, index) => (
                          <TableRow 
                            key={cliente.id}
                            className="hover:bg-muted/50 transition-colors animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border-2 border-primary/20">
                                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${cliente.nome}`} />
                                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                    {cliente.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{cliente.nome}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">{cliente.negocio}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground">{cliente.email}</span>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={cliente.plano === "Advanced" ? "default" : "secondary"}
                                className="gap-1"
                              >
                                {cliente.plano === "Advanced" && <Crown className="w-3 h-3" />}
                                {cliente.plano}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={cliente.status === "ativo" ? "default" : "destructive"}
                                className="gap-1"
                              >
                                {cliente.status === "ativo" ? (
                                  <CheckCircle2 className="w-3 h-3" />
                                ) : (
                                  <AlertCircle className="w-3 h-3" />
                                )}
                                {cliente.status === "ativo" ? "Ativo" : "Suspenso"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="font-semibold">
                                  {cliente.pedidosMes}
                                </Badge>
                                {cliente.pedidosMes > 100 && (
                                  <Zap className="w-4 h-4 text-orange-500" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="font-semibold text-green-600">
                                R$ {(cliente.plano === "Advanced" ? 49.90 : 0).toFixed(2)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {new Date(cliente.dataCadastro).toLocaleDateString("pt-BR")}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-1 justify-end">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="hover:bg-blue-500/10 hover:text-blue-600"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="hover:bg-green-500/10 hover:text-green-600"
                                >
                                  <LogIn className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="hover:bg-orange-500/10 hover:text-orange-600"
                                >
                                  <Ban className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="hover:bg-red-500/10 hover:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metricas" className="space-y-6 animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-lg col-span-full lg:col-span-2">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Distribuição de Planos
                  </CardTitle>
                  <CardDescription>Análise detalhada dos planos ativos</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                          <span className="font-medium">Plano Gratuito</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {((clientesGratuitos / totalClientes) * 100).toFixed(1)}%
                          </span>
                          <span className="text-2xl font-bold">{clientesGratuitos}</span>
                        </div>
                      </div>
                      <Progress 
                        value={(clientesGratuitos / totalClientes) * 100} 
                        className="h-3"
                      />
                      <p className="text-sm text-muted-foreground">
                        Limite de 50 pedidos/mês • 20 produtos • 1 usuário
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-primary" />
                          <span className="font-medium">Plano Advanced</span>
                          <Badge variant="default" className="ml-2">Mais Popular</Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {((clientesAdvanced / totalClientes) * 100).toFixed(1)}%
                          </span>
                          <span className="text-2xl font-bold text-primary">{clientesAdvanced}</span>
                        </div>
                      </div>
                      <Progress 
                        value={(clientesAdvanced / totalClientes) * 100} 
                        className="h-3"
                      />
                      <p className="text-sm text-muted-foreground">
                        Pedidos ilimitados • Produtos ilimitados • Suporte prioritário
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Receita Total</p>
                          <p className="text-2xl font-bold text-green-600">
                            R$ {receitaMensal.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Conversão</p>
                          <p className="text-2xl font-bold text-primary">
                            {taxaConversao.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Novos cadastros</span>
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-xs text-muted-foreground mt-1">Este mês</p>
                    </div>

                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Taxa de churn</span>
                        <TrendingDown className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-blue-600">5.8%</p>
                      <p className="text-xs text-muted-foreground mt-1">Média mensal</p>
                    </div>

                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Ticket médio</span>
                        <DollarSign className="w-4 h-4 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold">R$ 49,90</p>
                      <p className="text-xs text-muted-foreground mt-1">Por cliente/mês</p>
                    </div>

                    <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Total de pedidos</span>
                        <ShoppingBag className="w-4 h-4 text-orange-600" />
                      </div>
                      <p className="text-2xl font-bold">{totalPedidosMes}</p>
                      <p className="text-xs text-muted-foreground mt-1">Processados este mês</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de Crescimento */}
            <Card className="border-none shadow-lg">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Crescimento da Plataforma
                </CardTitle>
                <CardDescription>Visão geral do crescimento nos últimos meses</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">MRR (Mensal)</p>
                    <p className="text-3xl font-bold">R$ {receitaMensal.toFixed(2)}</p>
                    <div className="flex items-center gap-1 text-sm">
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-medium">+{crescimentoReceita.toFixed(1)}%</span>
                      <span className="text-muted-foreground">vs mês anterior</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">ARR (Anual)</p>
                    <p className="text-3xl font-bold">R$ {(receitaMensal * 12).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      Receita recorrente anual projetada
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">LTV Médio</p>
                    <p className="text-3xl font-bold">R$ {(ticketMedio * 50).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      Lifetime value estimado por cliente
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
