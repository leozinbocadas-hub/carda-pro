import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ShoppingBag, TrendingUp, Users, Bell, Smartphone, BarChart3, Star, ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Cardápio Digital",
      description: "Cardápio online responsivo e atraente que converte visitantes em clientes"
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Gestão de Pedidos",
      description: "Controle completo de pedidos em tempo real, do recebimento à entrega"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Controle de Entregadores",
      description: "Gerencie sua equipe de entregadores com eficiência e praticidade"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Relatórios em Tempo Real",
      description: "Acompanhe vendas, ticket médio e performance do seu negócio"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Personalização Total",
      description: "Adapte cores, logo e identidade visual ao seu negócio"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Notificações Automáticas",
      description: "Mantenha clientes informados sobre o status dos pedidos"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      business: "Burger House",
      rating: 5,
      text: "Desde que comecei a usar, minhas vendas aumentaram 40%. O cardápio digital é incrível!"
    },
    {
      name: "Mariana Costa",
      business: "Açaí da Mari",
      rating: 5,
      text: "Muito fácil de usar! Consigo gerenciar tudo pelo celular enquanto atendo os clientes."
    },
    {
      name: "Roberto Alves",
      business: "Pizza Nostra",
      rating: 5,
      text: "O melhor investimento que fiz. Sistema completo e suporte excelente!"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">DeliveryPro</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Funcionalidades
            </a>
            <a href="#plans" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Planos
            </a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Depoimentos
            </a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              FAQ
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" className="hover:bg-accent transition-colors">Entrar</Button>
            </Link>
            <Link to="/cadastro">
              <Button className="bg-gradient-primary hover:opacity-90 shadow-primary transition-all hover:scale-105">
                Começar Grátis
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t animate-fade-in">
            <div className="container py-4 flex flex-col gap-4">
              <a href="#features" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Funcionalidades
              </a>
              <a href="#plans" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Planos
              </a>
              <a href="#testimonials" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Depoimentos
              </a>
              <a href="#faq" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Link to="/login">
                  <Button variant="outline" className="w-full">Entrar</Button>
                </Link>
                <Link to="/cadastro">
                  <Button className="w-full bg-gradient-primary">Começar Grátis</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle">
        <div className="container px-4 py-16 md:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col gap-6 animate-fade-in">
              <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20">
                Sem cartão de crédito necessário
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transforme seu Delivery com{" "}
                <span className="text-gradient">Gestão Inteligente</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Sistema completo para gerenciar pedidos, entregadores e aumentar suas vendas. 
                Cardápio digital profissional incluso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/cadastro">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 btn-active shadow-primary">
                    Começar Gratuitamente <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto btn-active">
                  Ver Demonstração
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-success" />
                <span>Configuração em 5 minutos</span>
              </div>
            </div>
            <div className="relative animate-fade-in animation-delay-200">
              <div className="relative rounded-2xl bg-card border shadow-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary" />
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-32 mb-2" />
                      <div className="h-3 bg-muted rounded w-24" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-2xl font-bold text-primary">+40%</p>
                        <p className="text-sm text-muted-foreground">Vendas</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-2xl font-bold text-success">-30%</p>
                        <p className="text-sm text-muted-foreground">Erros</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                    <div className="h-3 bg-muted rounded w-4/6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sistema completo para gerenciar todos os aspectos do seu delivery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Menu Highlight */}
      <section className="py-16 md:py-24 bg-gradient-subtle">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-primary/10 text-primary">Destaque</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Cardápio Digital que <span className="text-gradient">Converte</span>
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  "Design profissional e responsivo",
                  "100% otimizado para mobile",
                  "Atualização em tempo real",
                  "Sistema de adicionais e personalizações",
                  "Carrinho de compras inteligente",
                  "Link personalizado para compartilhar"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link to="/cadastro">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 btn-active">
                  Criar Meu Cardápio Agora
                </Button>
              </Link>
            </div>
            <div className="relative animate-fade-in animation-delay-200">
              <div className="relative aspect-[9/16] max-w-[300px] mx-auto">
                <div className="absolute inset-0 bg-gradient-primary rounded-[3rem] blur-3xl opacity-20" />
                <Card className="relative h-full border-8 border-foreground/10 rounded-[3rem] overflow-hidden">
                  <div className="h-full bg-background p-6 flex flex-col">
                    <div className="text-center mb-6">
                      <h3 className="font-bold text-lg mb-1">Seu Negócio</h3>
                      <p className="text-sm text-muted-foreground">🍔 Hamburgueria</p>
                    </div>
                    <div className="flex-1 space-y-3 overflow-hidden">
                      {[1, 2, 3].map((i) => (
                        <Card key={i} className="p-3">
                          <div className="flex gap-3">
                            <div className="w-16 h-16 rounded-lg bg-gradient-primary flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="h-3 bg-muted rounded w-3/4 mb-2" />
                              <div className="h-2 bg-muted rounded w-full mb-2" />
                              <div className="h-3 bg-primary rounded w-16" />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Planos para todos os tamanhos
            </h2>
            <p className="text-lg text-muted-foreground">
              Comece grátis e evolua quando precisar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2 hover-lift">
              <CardHeader>
                <CardTitle className="text-2xl">Gratuito</CardTitle>
                <CardDescription>Perfeito para começar</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R$ 0</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Até 50 pedidos/mês</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>20 produtos no cardápio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>1 usuário</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Suporte por email</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/cadastro" className="w-full">
                  <Button variant="outline" size="lg" className="w-full btn-active">
                    Começar Grátis
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Advanced Plan */}
            <Card className="border-2 border-primary shadow-primary relative hover-lift">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-primary text-white px-4 py-1">
                  Mais Popular
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Advanced</CardTitle>
                <CardDescription>Para crescer sem limites</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gradient">R$ 49,90</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span className="font-medium">Pedidos ilimitados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span className="font-medium">Produtos ilimitados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span className="font-medium">Usuários ilimitados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Múltiplos entregadores</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Relatórios avançados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Suporte prioritário</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Integrações futuras</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/cadastro?plan=advanced" className="w-full">
                  <Button size="lg" className="w-full bg-gradient-primary hover:opacity-90 btn-active">
                    Escolher Advanced
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24 bg-gradient-subtle">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quem usa, aprova
            </h2>
            <p className="text-lg text-muted-foreground">
              Veja o que nossos clientes dizem sobre nós
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardDescription className="text-base">"{testimonial.text}"</CardDescription>
                </CardHeader>
                <CardFooter className="flex-col items-start">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tire suas dúvidas sobre nossa plataforma
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Como funciona o plano gratuito?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  O plano gratuito permite até 50 pedidos por mês, 20 produtos no cardápio e 1 usuário. 
                  É perfeito para testar a plataforma e começar seu delivery sem custos iniciais.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Posso mudar de plano a qualquer momento?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sim! Você pode fazer upgrade para o plano Advanced a qualquer momento. 
                  O valor será cobrado proporcionalmente e você terá acesso imediato a todos os recursos premium.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Preciso de conhecimentos técnicos para usar?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Não! Nossa plataforma foi desenvolvida para ser intuitiva e fácil de usar. 
                  Qualquer pessoa consegue cadastrar produtos, gerenciar pedidos e configurar o delivery sem necessidade de conhecimentos técnicos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Como funciona o cardápio digital?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Após cadastrar seus produtos, você recebe um link personalizado do seu cardápio digital. 
                  Seus clientes acessam esse link, escolhem os produtos, fazem o pedido e você recebe tudo em tempo real no seu painel.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Vocês cobram taxa por pedido?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Não! Cobramos apenas a mensalidade do plano escolhido. 
                  Não há taxas por pedido, permitindo que você tenha previsibilidade de custos e maior margem de lucro.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Como funciona o pagamento dos pedidos?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  O cliente escolhe a forma de pagamento no checkout (dinheiro, cartão, PIX). 
                  O pagamento é realizado diretamente na entrega ou retirada. Futuramente teremos integração com pagamento online.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Posso cancelar minha assinatura?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sim, você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas de cancelamento. 
                  Após o cancelamento, você ainda terá acesso até o final do período pago.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Há suporte técnico disponível?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sim! O plano gratuito tem suporte por email. 
                  No plano Advanced, você tem suporte prioritário com resposta mais rápida para resolver qualquer dúvida ou problema.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <Card className="relative overflow-hidden border-0 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-primary opacity-95" />
            <CardContent className="relative py-16 px-4 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para transformar seu delivery?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Junte-se a centenas de negócios que já aumentaram suas vendas com a nossa plataforma
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cadastro">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto btn-active">
                    Começar Gratuitamente
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10 btn-active">
                  Falar com Vendas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold text-gradient">DeliveryPro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sistema completo de gestão para delivery com cardápio digital profissional.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Funcionalidades</a></li>
                <li><a href="#plans" className="hover:text-foreground transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrações</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 DeliveryPro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
