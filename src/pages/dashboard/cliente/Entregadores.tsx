import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Entregador {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  veiculo: string;
  placa: string;
  foto?: string;
  status: "disponivel" | "em_entrega" | "offline";
  pedidosHoje: number;
}

const Entregadores = () => {
  const { toast } = useToast();
  const [entregadores, setEntregadores] = useState<Entregador[]>([
    {
      id: "1",
      nome: "João Silva",
      cpf: "123.456.789-00",
      telefone: "(11) 98765-4321",
      veiculo: "Moto",
      placa: "ABC-1234",
      status: "disponivel",
      pedidosHoje: 5,
    },
    {
      id: "2",
      nome: "Maria Santos",
      cpf: "987.654.321-00",
      telefone: "(11) 91234-5678",
      veiculo: "Bicicleta",
      placa: "-",
      status: "em_entrega",
      pedidosHoje: 8,
    },
    {
      id: "3",
      nome: "Pedro Costa",
      cpf: "456.789.123-00",
      telefone: "(11) 99999-8888",
      veiculo: "Carro",
      placa: "XYZ-9876",
      status: "offline",
      pedidosHoje: 0,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    veiculo: "Moto",
    placa: "",
    email: "",
    senha: "",
  });

  const getStatusBadge = (status: Entregador["status"]) => {
    const variants = {
      disponivel: { variant: "default" as const, label: "Disponível" },
      em_entrega: { variant: "secondary" as const, label: "Em Entrega" },
      offline: { variant: "outline" as const, label: "Offline" },
    };
    const { variant, label } = variants[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setEntregadores(prev =>
        prev.map(ent =>
          ent.id === editingId ? { ...ent, ...formData } : ent
        )
      );
      toast({
        title: "Entregador atualizado",
        description: "As informações foram atualizadas com sucesso.",
      });
    } else {
      const newEntregador: Entregador = {
        id: Date.now().toString(),
        ...formData,
        status: "disponivel",
        pedidosHoje: 0,
      };
      setEntregadores(prev => [...prev, newEntregador]);
      toast({
        title: "Entregador cadastrado",
        description: "O entregador foi adicionado com sucesso.",
      });
    }

    setIsDialogOpen(false);
    setEditingId(null);
    setFormData({ nome: "", cpf: "", telefone: "", veiculo: "Moto", placa: "", email: "", senha: "" });
  };

  const handleEdit = (entregador: Entregador) => {
    setEditingId(entregador.id);
    setFormData({
      nome: entregador.nome,
      cpf: entregador.cpf,
      telefone: entregador.telefone,
      veiculo: entregador.veiculo,
      placa: entregador.placa,
      email: "",
      senha: "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEntregadores(prev => prev.filter(ent => ent.id !== id));
    toast({
      title: "Entregador removido",
      description: "O entregador foi removido com sucesso.",
      variant: "destructive",
    });
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData({ nome: "", cpf: "", telefone: "", veiculo: "Moto", placa: "", email: "", senha: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Entregadores</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie sua equipe de entregadores
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={handleDialogClose}>
              <Plus className="w-4 h-4" />
              Cadastrar Entregador
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Editar Entregador" : "Novo Entregador"}
                </DialogTitle>
                <DialogDescription>
                  Preencha os dados do entregador abaixo
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="nome"
                      placeholder="Digite o nome completo"
                      className="pl-9"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="telefone"
                      placeholder="(00) 00000-0000"
                      className="pl-9"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="veiculo">Veículo *</Label>
                  <Select
                    value={formData.veiculo}
                    onValueChange={(value) => setFormData({ ...formData, veiculo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Moto">Moto</SelectItem>
                      <SelectItem value="Bicicleta">Bicicleta</SelectItem>
                      <SelectItem value="Carro">Carro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="placa">Placa do Veículo</Label>
                  <Input
                    id="placa"
                    placeholder="ABC-1234"
                    value={formData.placa}
                    onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email * (Para Login)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="entregador@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required={!editingId}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senha">
                    Senha * {editingId && "(deixe em branco para manter)"}
                  </Label>
                  <Input
                    id="senha"
                    type="password"
                    placeholder="••••••••"
                    value={formData.senha}
                    onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                    required={!editingId}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingId ? "Salvar Alterações" : "Cadastrar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {entregadores.map((entregador) => (
          <Card key={entregador.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={entregador.foto} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {entregador.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{entregador.nome}</CardTitle>
                    <CardDescription className="text-sm">{entregador.telefone}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status:</span>
                {getStatusBadge(entregador.status)}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Veículo:</span>
                <span className="font-medium">{entregador.veiculo}</span>
              </div>
              {entregador.placa !== "-" && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Placa:</span>
                  <span className="font-medium">{entregador.placa}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pedidos hoje:</span>
                <Badge variant="secondary">{entregador.pedidosHoje}</Badge>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => handleEdit(entregador)}
                >
                  <Pencil className="w-3 h-3" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => handleDelete(entregador.id)}
                >
                  <Trash2 className="w-3 h-3" />
                  Remover
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {entregadores.length === 0 && (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="rounded-full bg-muted p-6">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Nenhum entregador cadastrado</h3>
              <p className="text-muted-foreground max-w-md">
                Comece adicionando seu primeiro entregador para gerenciar suas entregas
              </p>
            </div>
            <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Cadastrar Primeiro Entregador
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Entregadores;
