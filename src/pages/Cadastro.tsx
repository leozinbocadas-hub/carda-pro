import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingBag, Eye, EyeOff, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const Cadastro = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Redirect to dashboard or payment
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Image/Illustration */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-primary p-12">
        <div className="max-w-md text-white space-y-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-10 h-10" />
            <span className="text-3xl font-bold">DeliveryPro</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight">
            Comece grátis hoje!
          </h1>
          <p className="text-lg opacity-90">
            Configure sua conta em minutos e comece a receber pedidos online imediatamente.
          </p>
          <div className="space-y-4 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <p>Sem cartão de crédito necessário</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <p>Configuração em 5 minutos</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <p>Suporte completo em português</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-background overflow-y-auto">
        <div className="w-full max-w-md space-y-6 animate-fade-in animation-delay-200 my-auto">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-gradient">DeliveryPro</span>
            </Link>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step
                    ? "w-12 bg-primary"
                    : i < step
                    ? "w-8 bg-success"
                    : "w-8 bg-muted"
                }`}
              />
            ))}
          </div>

          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-2 pb-6">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Etapa {step} de 3
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold">
                {step === 1 && "Dados Pessoais"}
                {step === 2 && "Endereço"}
                {step === 3 && "Dados do Negócio"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Vamos começar com suas informações básicas"}
                {step === 2 && "Onde está localizado seu negócio?"}
                {step === 3 && "Por último, conte-nos sobre seu negócio"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Step 1: Personal Data */}
                {step === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome Completo *</Label>
                      <Input
                        id="fullName"
                        placeholder="João Silva"
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                      <Input
                        id="cpfCnpj"
                        placeholder="000.000.000-00"
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Celular *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Senha *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mínimo 8 caracteres"
                          required
                          minLength={8}
                          className="h-11 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Digite a senha novamente"
                          required
                          className="h-11 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Address */}
                {step === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP *</Label>
                      <Input
                        id="cep"
                        placeholder="00000-000"
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="street">Rua/Avenida *</Label>
                      <Input
                        id="street"
                        placeholder="Rua Exemplo"
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="number">Número *</Label>
                        <Input
                          id="number"
                          placeholder="123"
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          placeholder="Sala 1"
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        placeholder="Centro"
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          placeholder="São Paulo"
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado *</Label>
                        <Input
                          id="state"
                          placeholder="SP"
                          required
                          maxLength={2}
                          className="h-11"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Business Data */}
                {step === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Nome do Negócio *</Label>
                      <Input
                        id="businessName"
                        placeholder="Meu Delivery"
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria *</Label>
                      <Select required>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hamburgueria">🍔 Hamburgueria</SelectItem>
                          <SelectItem value="pizzaria">🍕 Pizzaria</SelectItem>
                          <SelectItem value="acaiteria">🍨 Açaiteria</SelectItem>
                          <SelectItem value="sorveteria">🍦 Sorveteria</SelectItem>
                          <SelectItem value="restaurante">🍽️ Restaurante</SelectItem>
                          <SelectItem value="lanchonete">🥪 Lanchonete</SelectItem>
                          <SelectItem value="padaria">🥖 Padaria</SelectItem>
                          <SelectItem value="confeitaria">🍰 Confeitaria</SelectItem>
                          <SelectItem value="cafeteria">☕ Cafeteria</SelectItem>
                          <SelectItem value="outro">📦 Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessPhone">Telefone do Negócio *</Label>
                      <Input
                        id="businessPhone"
                        type="tel"
                        placeholder="(00) 0000-0000"
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="flex items-start space-x-2 pt-4">
                      <Checkbox id="terms" required />
                      <label
                        htmlFor="terms"
                        className="text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Eu aceito os{" "}
                        <a href="#" className="text-primary hover:underline">
                          Termos de Uso
                        </a>{" "}
                        e a{" "}
                        <a href="#" className="text-primary hover:underline">
                          Política de Privacidade
                        </a>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-4">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1 h-11"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className={`h-11 bg-gradient-primary hover:opacity-90 btn-active ${
                      step === 1 ? "w-full" : "flex-1"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Criando conta...
                      </span>
                    ) : step === 3 ? (
                      "Criar Conta"
                    ) : (
                      <>
                        Continuar
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>

                {step === 1 && (
                  <div className="text-center text-sm pt-4">
                    <span className="text-muted-foreground">Já tem uma conta? </span>
                    <Link to="/login" className="font-medium text-primary hover:underline">
                      Faça login
                    </Link>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
