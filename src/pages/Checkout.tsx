import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, CreditCard, Smartphone, DollarSign, MapPin, ShoppingBag, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [needsChange, setNeedsChange] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleFinish = () => {
    navigate("/pedido-confirmado");
  };

  // Mock data
  const cartItems = [
    { name: "X-Burger Especial", quantity: 2, price: 51.80 },
    { name: "Batata Frita", quantity: 1, price: 15.90 },
  ];
  const subtotal = 67.70;
  const deliveryFee = 5.00;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-background py-6">
      <div className="container px-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Finalizar Pedido</h1>
            <div className="flex items-center gap-2 mt-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full flex-1 transition-all ${
                    i === step
                      ? "bg-primary"
                      : i < step
                      ? "bg-success"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
          <Badge variant="outline">
            Etapa {step}/3
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Personal Data */}
            {step === 1 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Seus Dados</CardTitle>
                  <CardDescription>
                    Precisamos de algumas informações para finalizar seu pedido
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input id="name" placeholder="João Silva" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone/Celular *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <Button
                    onClick={handleNext}
                    className="w-full bg-gradient-primary hover:opacity-90 btn-active"
                  >
                    Continuar
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Address */}
            {step === 2 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Endereço de Entrega</CardTitle>
                  <CardDescription>
                    Como você quer receber seu pedido?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs value={deliveryType} onValueChange={(v) => setDeliveryType(v as any)}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="delivery">
                        <MapPin className="w-4 h-4 mr-2" />
                        Delivery
                      </TabsTrigger>
                      <TabsTrigger value="pickup">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Retirar no Local
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="delivery" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="cep">CEP *</Label>
                        <Input id="cep" placeholder="00000-000" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="street">Rua/Avenida *</Label>
                        <Input id="street" placeholder="Rua Exemplo" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="number">Número *</Label>
                          <Input id="number" placeholder="123" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="complement">Complemento</Label>
                          <Input id="complement" placeholder="Apto 101" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input id="neighborhood" placeholder="Centro" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reference">Ponto de Referência</Label>
                        <Input
                          id="reference"
                          placeholder="Ex: Próximo ao mercado X"
                        />
                      </div>
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">Taxa de Entrega</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              R$ {deliveryFee.toFixed(2).replace('.', ',')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="pickup" className="space-y-4 mt-6">
                      <div className="bg-card border rounded-lg p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold">Burger House Premium</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Rua Exemplo, 123 - Centro
                              <br />
                              São Paulo - SP
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Ver no Google Maps
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickupTime">Horário de Retirada *</Label>
                        <RadioGroup defaultValue="30">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="15" id="15" />
                            <Label htmlFor="15" className="cursor-pointer">Em 15 minutos</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="30" id="30" />
                            <Label htmlFor="30" className="cursor-pointer">Em 30 minutos</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="45" id="45" />
                            <Label htmlFor="45" className="cursor-pointer">Em 45 minutos</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="60" id="60" />
                            <Label htmlFor="60" className="cursor-pointer">Em 1 hora</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-success" />
                          <p className="font-semibold text-sm">Sem taxa de entrega! 🎉</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleBack} className="flex-1">
                      Voltar
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="flex-1 bg-gradient-primary hover:opacity-90 btn-active"
                    >
                      Continuar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Forma de Pagamento</CardTitle>
                  <CardDescription>
                    Escolha como deseja pagar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <Card
                        className={`cursor-pointer transition-all ${
                          paymentMethod === "credit"
                            ? "border-primary bg-primary/5"
                            : ""
                        }`}
                        onClick={() => setPaymentMethod("credit")}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <RadioGroupItem value="credit" id="credit" />
                          <div className="flex items-center gap-3 flex-1">
                            <CreditCard className="w-5 h-5" />
                            <Label htmlFor="credit" className="cursor-pointer flex-1">
                              Cartão de Crédito (na entrega/retirada)
                            </Label>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer transition-all ${
                          paymentMethod === "debit"
                            ? "border-primary bg-primary/5"
                            : ""
                        }`}
                        onClick={() => setPaymentMethod("debit")}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <RadioGroupItem value="debit" id="debit" />
                          <div className="flex items-center gap-3 flex-1">
                            <CreditCard className="w-5 h-5" />
                            <Label htmlFor="debit" className="cursor-pointer flex-1">
                              Cartão de Débito (na entrega/retirada)
                            </Label>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer transition-all ${
                          paymentMethod === "pix" ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setPaymentMethod("pix")}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <RadioGroupItem value="pix" id="pix" />
                          <div className="flex items-center gap-3 flex-1">
                            <Smartphone className="w-5 h-5" />
                            <Label htmlFor="pix" className="cursor-pointer flex-1">
                              PIX (na entrega/retirada)
                            </Label>
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer transition-all ${
                          paymentMethod === "cash"
                            ? "border-primary bg-primary/5"
                            : ""
                        }`}
                        onClick={() => setPaymentMethod("cash")}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <RadioGroupItem value="cash" id="cash" />
                            <div className="flex items-center gap-3 flex-1">
                              <DollarSign className="w-5 h-5" />
                              <Label htmlFor="cash" className="cursor-pointer flex-1">
                                Dinheiro (na entrega/retirada)
                              </Label>
                            </div>
                          </div>
                          {paymentMethod === "cash" && (
                            <div className="ml-11 space-y-3 animate-fade-in">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="needsChange"
                                  checked={needsChange}
                                  onCheckedChange={(checked) =>
                                    setNeedsChange(checked as boolean)
                                  }
                                />
                                <label
                                  htmlFor="needsChange"
                                  className="text-sm cursor-pointer"
                                >
                                  Precisa de troco?
                                </label>
                              </div>
                              {needsChange && (
                                <Input
                                  placeholder="Troco para quanto? Ex: R$ 100,00"
                                  className="animate-fade-in"
                                />
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </RadioGroup>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900 flex items-start gap-2">
                      <span className="text-lg">ℹ️</span>
                      <span>
                        O pagamento será realizado no momento da entrega ou retirada do pedido
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleBack} className="flex-1">
                      Voltar
                    </Button>
                    <Button
                      onClick={handleFinish}
                      disabled={!paymentMethod}
                      className="flex-1 bg-gradient-primary hover:opacity-90 btn-active"
                    >
                      Confirmar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-2">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de entrega</span>
                    <span className={deliveryType === "pickup" ? "text-success" : ""}>
                      {deliveryType === "pickup"
                        ? "Grátis"
                        : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg text-primary">
                      R${" "}
                      {(deliveryType === "pickup" ? subtotal : total)
                        .toFixed(2)
                        .replace('.', ',')}
                    </span>
                  </div>
                </div>

                {step === 2 && deliveryType === "delivery" && (
                  <div className="text-xs text-muted-foreground">
                    Endereço será confirmado na próxima etapa
                  </div>
                )}
                {step === 3 && paymentMethod && (
                  <div className="text-xs text-success flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Pagamento selecionado
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
