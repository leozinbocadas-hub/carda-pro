import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Auth from "./pages/Auth";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
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
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import EntregadorDashboard from "./pages/dashboard/entregador/EntregadorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/cardapio" element={<Index />} />
            <Route path="/meus-pedidos" element={<MeusPedidos />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />
            
            {/* Dashboard Cliente */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="produtos" element={<Produtos />} />
              <Route path="pedidos" element={<Pedidos />} />
              <Route path="categorias" element={<Categorias />} />
              <Route path="entregadores" element={<Entregadores />} />
              <Route path="plano" element={<Plano />} />
              <Route path="configuracoes" element={<Configuracoes />} />
            </Route>
            
            {/* Dashboard Admin */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            
            {/* Dashboard Entregador */}
            <Route path="/entregador/dashboard" element={<EntregadorDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
