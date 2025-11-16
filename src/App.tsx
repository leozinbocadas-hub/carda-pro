import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Cardapio from "./pages/Cardapio";
import Checkout from "./pages/Checkout";
import PedidoConfirmado from "./pages/PedidoConfirmado";
import MeusPedidos from "./pages/MeusPedidos";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./pages/dashboard/cliente/DashboardLayout";
import DashboardHome from "./pages/dashboard/cliente/DashboardHome";
import Produtos from "./pages/dashboard/cliente/Produtos";
import Pedidos from "./pages/dashboard/cliente/Pedidos";
import Categorias from "./pages/dashboard/cliente/Categorias";
import Configuracoes from "./pages/dashboard/cliente/Configuracoes";
import Entregadores from "./pages/dashboard/cliente/Entregadores";
import Plano from "./pages/dashboard/cliente/Plano";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/meus-pedidos" element={<MeusPedidos />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="produtos" element={<Produtos />} />
            <Route path="pedidos" element={<Pedidos />} />
            <Route path="categorias" element={<Categorias />} />
            <Route path="entregadores" element={<Entregadores />} />
            <Route path="plano" element={<Plano />} />
            <Route path="configuracoes" element={<Configuracoes />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
