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
  const receitaMensal = clientesAdvanced * 49.90;
  const totalPedidosMes = clientes.reduce((acc, c) => acc + c.pedidosMes, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
        <p className="text-muted-foreground mt-1">
          Controle total do SaaS e gestão de clientes
        </p>
      </div>

      {/* Métricas Globais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClientes}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+3</span> este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal (MRR)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {receitaMensal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {clientesAdvanced} clientes Advanced
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pedidos (Mês)</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPedidosMes}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Média de {Math.round(totalPedidosMes / totalClientes)} por cliente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((clientesAdvanced / totalClientes) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Gratuito → Advanced
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gestão de Clientes */}
      <Tabs defaultValue="clientes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="clientes">
            <Users className="w-4 h-4 mr-2" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="metricas">
            <BarChart3 className="w-4 h-4 mr-2" />
            Métricas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clientes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Clientes</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os clientes da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filtros */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, negócio ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={filterPlano} onValueChange={setFilterPlano}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Planos</SelectItem>
                    <SelectItem value="Gratuito">Gratuito</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="suspenso">Suspenso</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tabela de Clientes */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Negócio</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plano</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pedidos/Mês</TableHead>
                      <TableHead>Cadastro</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClientes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          Nenhum cliente encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredClientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${cliente.nome}`} />
                                <AvatarFallback>
                                  {cliente.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{cliente.nome}</span>
                            </div>
                          </TableCell>
                          <TableCell>{cliente.negocio}</TableCell>
                          <TableCell className="text-muted-foreground">{cliente.email}</TableCell>
                          <TableCell>
                            <Badge variant={cliente.plano === "Advanced" ? "default" : "secondary"}>
                              {cliente.plano}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={cliente.status === "ativo" ? "default" : "destructive"}>
                              {cliente.status === "ativo" ? "Ativo" : "Suspenso"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{cliente.pedidosMes}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(cliente.dataCadastro).toLocaleDateString("pt-BR")}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <LogIn className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Ban className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive">
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

        <TabsContent value="metricas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Planos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Plano Gratuito</span>
                    <span className="text-2xl font-bold">{clientesGratuitos}</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-muted-foreground h-full"
                      style={{ width: `${(clientesGratuitos / totalClientes) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium">Plano Advanced</span>
                    <span className="text-2xl font-bold">{clientesAdvanced}</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full"
                      style={{ width: `${(clientesAdvanced / totalClientes) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Gerais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Novos cadastros (mês)</span>
                    <span className="text-lg font-semibold">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Taxa de churn</span>
                    <span className="text-lg font-semibold text-green-600">0%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Ticket médio</span>
                    <span className="text-lg font-semibold">R$ 49,90</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total de pedidos</span>
                    <span className="text-lg font-semibold">{totalPedidosMes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
