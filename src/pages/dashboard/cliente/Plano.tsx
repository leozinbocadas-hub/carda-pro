import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, CreditCard, Download, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";

const Plano = () => {
  const planoAtual = {
    nome: "Gratuito",
    status: "ativo",
    recursos: [
      "Até 50 pedidos/mês",
      "20 produtos no cardápio",
      "1 usuário",
      "Suporte por email",
    ],
  };

  const pagamentos = [
    {
      id: "1",
      data: "15/01/2025",
      descricao: "Plano Advanced - Mensalidade",
      valor: "R$ 49,90",
      status: "pago",
    },
    {
      id: "2",
      data: "15/12/2024",
      descricao: "Plano Advanced - Mensalidade",
      valor: "R$ 49,90",
      status: "pago",
    },
    {
      id: "3",
      data: "15/11/2024",
      descricao: "Plano Advanced - Mensalidade",
      valor: "R$ 49,90",
      status: "pago",
    },
  ];

  const planos = {
    gratuito: {
      nome: "Starter",
      preco: "R$ 0",
      periodo: "/mês",
      recursos: [
        { texto: "Até 50 pedidos/mês", incluido: true },
        { texto: "20 produtos no cardápio", incluido: true },
        { texto: "1 usuário", incluido: true },
        { texto: "Suporte por email", incluido: true },
        { texto: "Pedidos ilimitados", incluido: false },
        { texto: "Produtos ilimitados", incluido: false },
        { texto: "Múltiplos entregadores", incluido: false },
        { texto: "Relatórios avançados", incluido: false },
        { texto: "Suporte prioritário", incluido: false },
      ],
    },
    advanced: {
      nome: "Advanced",
      preco: "R$ 49,90",
      periodo: "/mês",
      destaque: true,
      recursos: [
        { texto: "Até 50 pedidos/mês", incluido: true },
        { texto: "20 produtos no cardápio", incluido: true },
        { texto: "1 usuário", incluido: true },
        { texto: "Suporte por email", incluido: true },
        { texto: "Pedidos ilimitados", incluido: true },
        { texto: "Produtos ilimitados", incluido: true },
        { texto: "Múltiplos entregadores", incluido: true },
        { texto: "Relatórios avançados", incluido: true },
        { texto: "Suporte prioritário", incluido: true },
      ],
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Plano & Assinatura</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie seu plano e forma de pagamento
        </p>
      </div>

      {/* Plano Atual */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl">{planoAtual.nome}</CardTitle>
                <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                  {planoAtual.status === "ativo" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              <CardDescription className="mt-2">
                Você está no plano gratuito
              </CardDescription>
            </div>
            <Link to="/cadastro">
              <Button className="gap-2">
                <Sparkles className="w-4 h-4" />
                Fazer Upgrade
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground">Recursos incluídos:</h4>
            <ul className="space-y-2">
              {planoAtual.recursos.map((recurso, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span>{recurso}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Comparação de Planos */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Compare os Planos</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Plano Gratuito */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-xl">{planos.gratuito.nome}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{planos.gratuito.preco}</span>
                <span className="text-muted-foreground">{planos.gratuito.periodo}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {planos.gratuito.recursos.map((recurso, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    {recurso.incluido ? (
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    )}
                    <span className={recurso.incluido ? "" : "text-muted-foreground"}>
                      {recurso.texto}
                    </span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" disabled>
                Plano Atual
              </Button>
            </CardContent>
          </Card>

          {/* Plano Advanced */}
          <Card className="relative border-primary shadow-lg shadow-primary/5">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-primary">Mais Popular</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{planos.advanced.nome}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{planos.advanced.preco}</span>
                <span className="text-muted-foreground">{planos.advanced.periodo}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {planos.advanced.recursos.map((recurso, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    {recurso.incluido ? (
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    )}
                    <span className={recurso.incluido ? "" : "text-muted-foreground"}>
                      {recurso.texto}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/cadastro">
                <Button className="w-full gap-2 bg-gradient-primary hover:opacity-90">
                  <Sparkles className="w-4 h-4" />
                  Escolher Advanced
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Histórico de Pagamentos */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Histórico de Pagamentos</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagamentos.length > 0 ? (
                  pagamentos.map((pagamento) => (
                    <TableRow key={pagamento.id}>
                      <TableCell>{pagamento.data}</TableCell>
                      <TableCell>{pagamento.descricao}</TableCell>
                      <TableCell className="font-medium">{pagamento.valor}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
                          {pagamento.status === "pago" ? "Pago" : "Pendente"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Download className="w-3 h-3" />
                          Baixar Fatura
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                      Nenhum pagamento registrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Métodos de Pagamento */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Métodos de Pagamento</h2>
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-muted p-6">
                <CreditCard className="w-12 h-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Nenhum método de pagamento cadastrado</h3>
                <p className="text-muted-foreground max-w-md">
                  Adicione um cartão de crédito para fazer upgrade do seu plano
                </p>
              </div>
              <Link to="/cadastro">
                <Button variant="outline" className="gap-2">
                  <CreditCard className="w-4 h-4" />
                  Adicionar Método de Pagamento
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Plano;
