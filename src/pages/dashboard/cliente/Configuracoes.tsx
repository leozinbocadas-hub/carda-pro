import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, X, User, Store, Palette, Clock, Truck, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Configuracoes = () => {
  const [activeTab, setActiveTab] = useState("perfil");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do seu perfil e negócio
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="perfil">
            <User className="w-4 h-4 mr-2" />
            Meu Perfil
          </TabsTrigger>
          <TabsTrigger value="negocio">
            <Store className="w-4 h-4 mr-2" />
            Negócio
          </TabsTrigger>
          <TabsTrigger value="integracoes" disabled>
            Integrações
          </TabsTrigger>
        </TabsList>

        {/* Meu Perfil */}
        <TabsContent value="perfil" className="space-y-6">
          <MeuPerfilTab />
        </TabsContent>

        {/* Configurações do Negócio */}
        <TabsContent value="negocio" className="space-y-6">
          <ConfiguracoesNegocioTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Tab: Meu Perfil
const MeuPerfilTab = () => {
  const [avatar, setAvatar] = useState("");
  const [nome, setNome] = useState("João Silva");
  const [email, setEmail] = useState("joao@email.com");
  const [telefone, setTelefone] = useState("(11) 98765-4321");

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Imagem muito grande. Máximo 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        toast.success("Foto de perfil atualizada!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePerfil = () => {
    toast.success("Perfil atualizado com sucesso!");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Foto de Perfil</CardTitle>
          <CardDescription>Atualize sua foto de perfil</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatar} />
              <AvatarFallback className="text-2xl">
                {nome.split(" ").map(n => n[0]).join("").substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                id="avatar-upload"
                onChange={handleAvatarUpload}
              />
              <Button variant="outline" asChild>
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Alterar Foto
                </label>
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG ou JPEG (máx. 5MB)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nome Completo *</Label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>E-mail *</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Telefone</Label>
            <Input value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </div>
          <Button onClick={handleSavePerfil}>Salvar Alterações</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Senha Atual *</Label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <Label>Nova Senha *</Label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <Label>Confirmar Nova Senha *</Label>
            <Input type="password" />
          </div>
          <Button onClick={() => toast.success("Senha atualizada!")}>Atualizar Senha</Button>
        </CardContent>
      </Card>
    </>
  );
};

// Tab: Configurações do Negócio
const ConfiguracoesNegocioTab = () => {
  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");
  const [nomeNegocio, setNomeNegocio] = useState("Burger House Premium");
  const [descricao, setDescricao] = useState("Os melhores hambúrgueres artesanais da cidade");
  const [corPrimaria, setCorPrimaria] = useState("#ea384c");
  const [telefoneNegocio, setTelefoneNegocio] = useState("(11) 98765-4321");
  const [whatsapp, setWhatsapp] = useState("11987654321");
  const [instagram, setInstagram] = useState("@burgerhouse");
  const [statusAberto, setStatusAberto] = useState(true);
  const [tempoEntrega, setTempoEntrega] = useState("30-40");
  const [pedidoMinimo, setPedidoMinimo] = useState("15.00");
  const [tipoTaxa, setTipoTaxa] = useState("gratis");
  const [taxaEntrega, setTaxaEntrega] = useState("5.00");
  const [aceitaDelivery, setAceitaDelivery] = useState(true);
  const [aceitaRetirada, setAceitaRetirada] = useState(true);

  const [horarios, setHorarios] = useState([
    { dia: "Segunda", ativo: true, abertura: "18:00", fechamento: "23:00" },
    { dia: "Terça", ativo: true, abertura: "18:00", fechamento: "23:00" },
    { dia: "Quarta", ativo: true, abertura: "18:00", fechamento: "23:00" },
    { dia: "Quinta", ativo: true, abertura: "18:00", fechamento: "23:00" },
    { dia: "Sexta", ativo: true, abertura: "18:00", fechamento: "00:00" },
    { dia: "Sábado", ativo: true, abertura: "18:00", fechamento: "00:00" },
    { dia: "Domingo", ativo: false, abertura: "", fechamento: "" },
  ]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipo: "logo" | "banner"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Imagem muito grande. Máximo 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (tipo === "logo") {
          setLogo(reader.result as string);
        } else {
          setBanner(reader.result as string);
        }
        toast.success(`${tipo === "logo" ? "Logo" : "Banner"} atualizado!`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveConfig = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <>
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nome do Negócio *</Label>
            <Input
              value={nomeNegocio}
              onChange={(e) => setNomeNegocio(e.target.value)}
              placeholder="Ex: Burger House"
            />
          </div>
          <div className="space-y-2">
            <Label>Descrição/Biografia</Label>
            <Textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva seu negócio..."
              maxLength={200}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">{descricao.length}/200 caracteres</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Telefone do Negócio *</Label>
              <Input
                value={telefoneNegocio}
                onChange={(e) => setTelefoneNegocio(e.target.value)}
                placeholder="(11) 98765-4321"
              />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp (opcional)</Label>
              <Input
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="11987654321"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Instagram (opcional)</Label>
            <Input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@seunegocio"
            />
          </div>
        </CardContent>
      </Card>

      {/* Identidade Visual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Identidade Visual
          </CardTitle>
          <CardDescription>
            Personalize a aparência do seu cardápio digital
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo */}
          <div className="space-y-3">
            <Label>Logo do Negócio</Label>
            <p className="text-sm text-muted-foreground">
              Recomendação: 200x200px, fundo transparente
            </p>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-border overflow-hidden bg-muted flex items-center justify-center">
                {logo ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="logo-upload"
                  onChange={(e) => handleImageUpload(e, "logo")}
                />
                <Button variant="outline" asChild>
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    {logo ? "Alterar Logo" : "Selecionar Logo"}
                  </label>
                </Button>
                {logo && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLogo("")}
                    className="text-destructive"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remover
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Banner */}
          <div className="space-y-3">
            <Label>Banner do Cardápio</Label>
            <p className="text-sm text-muted-foreground">
              Recomendação: 1200x400px
            </p>
            <div className="space-y-3">
              <div className="w-full h-40 rounded-lg border-2 border-dashed border-border overflow-hidden bg-muted flex items-center justify-center">
                {banner ? (
                  <img src={banner} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Banner do cardápio</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="banner-upload"
                  onChange={(e) => handleImageUpload(e, "banner")}
                />
                <Button variant="outline" asChild>
                  <label htmlFor="banner-upload" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    {banner ? "Alterar Banner" : "Selecionar Banner"}
                  </label>
                </Button>
                {banner && (
                  <Button
                    variant="ghost"
                    onClick={() => setBanner("")}
                    className="text-destructive"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remover
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Cor Principal */}
          <div className="space-y-3">
            <Label>Cor Principal do Tema</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Esta cor será aplicada em botões, links, badges e ícones do cardápio
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-lg border-2 border-border overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: corPrimaria }}
                  onClick={() => document.getElementById("color-picker")?.click()}
                />
                <Input
                  type="color"
                  id="color-picker"
                  value={corPrimaria}
                  onChange={(e) => setCorPrimaria(e.target.value)}
                  className="hidden"
                />
                <div>
                  <Input
                    value={corPrimaria}
                    onChange={(e) => setCorPrimaria(e.target.value)}
                    className="w-32 font-mono"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="p-4 rounded-lg border bg-card">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <div className="flex gap-2">
                    <Button style={{ backgroundColor: corPrimaria }} size="sm">
                      Botão
                    </Button>
                    <Badge style={{ backgroundColor: corPrimaria }}>Badge</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Operação e Horários
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div>
              <Label className="text-base">Status do Negócio</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {statusAberto ? "Aberto para pedidos" : "Fechado"}
              </p>
            </div>
            <Switch checked={statusAberto} onCheckedChange={setStatusAberto} />
          </div>

          {/* Horários de Funcionamento */}
          <div className="space-y-3">
            <Label className="text-base">Horário de Funcionamento</Label>
            <div className="space-y-2">
              {horarios.map((horario, index) => (
                <div
                  key={horario.dia}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                >
                  <Switch
                    checked={horario.ativo}
                    onCheckedChange={(checked) => {
                      const novosHorarios = [...horarios];
                      novosHorarios[index].ativo = checked;
                      setHorarios(novosHorarios);
                    }}
                  />
                  <span className="w-24 font-medium">{horario.dia}</span>
                  {horario.ativo ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="time"
                        value={horario.abertura}
                        onChange={(e) => {
                          const novosHorarios = [...horarios];
                          novosHorarios[index].abertura = e.target.value;
                          setHorarios(novosHorarios);
                        }}
                        className="w-32"
                      />
                      <span className="text-muted-foreground">até</span>
                      <Input
                        type="time"
                        value={horario.fechamento}
                        onChange={(e) => {
                          const novosHorarios = [...horarios];
                          novosHorarios[index].fechamento = e.target.value;
                          setHorarios(novosHorarios);
                        }}
                        className="w-32"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Fechado</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entregas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Configurações de Entrega
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tipos de Serviço */}
          <div className="space-y-3">
            <Label className="text-base">Tipos de Serviço</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>Delivery</span>
                </div>
                <Switch checked={aceitaDelivery} onCheckedChange={setAceitaDelivery} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  <span>Retirada no Local</span>
                </div>
                <Switch checked={aceitaRetirada} onCheckedChange={setAceitaRetirada} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Tempo e Valor Mínimo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tempo Médio de Entrega</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={tempoEntrega}
                  onChange={(e) => setTempoEntrega(e.target.value)}
                  placeholder="30-40"
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">min</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Pedido Mínimo (R$)</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">R$</span>
                <Input
                  type="number"
                  step="0.01"
                  value={pedidoMinimo}
                  onChange={(e) => setPedidoMinimo(e.target.value)}
                  placeholder="15.00"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Taxa de Entrega */}
          <div className="space-y-3">
            <Label className="text-base">Taxa de Entrega</Label>
            <RadioGroup value={tipoTaxa} onValueChange={setTipoTaxa}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gratis" id="gratis" />
                <Label htmlFor="gratis" className="cursor-pointer font-normal">
                  Entrega Grátis
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixa" id="fixa" />
                <Label htmlFor="fixa" className="cursor-pointer font-normal">
                  Valor Fixo
                </Label>
              </div>
            </RadioGroup>

            {tipoTaxa === "fixa" && (
              <div className="pl-6 space-y-2">
                <Label>Valor da Taxa (R$)</Label>
                <div className="flex items-center gap-2 max-w-xs">
                  <span className="text-muted-foreground">R$</span>
                  <Input
                    type="number"
                    step="0.01"
                    value={taxaEntrega}
                    onChange={(e) => setTaxaEntrega(e.target.value)}
                    placeholder="5.00"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Salvar Configurações */}
      <div className="flex justify-end">
        <Button size="lg" onClick={handleSaveConfig} className="gap-2">
          Salvar Todas as Configurações
        </Button>
      </div>
    </>
  );
};

export default Configuracoes;
