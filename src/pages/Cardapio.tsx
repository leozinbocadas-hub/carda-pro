import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Search, Share2, Info, MapPin, Clock, DollarSign, Star, ShoppingCart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/cardapio/ProductCard";
import ProductModal from "@/components/cardapio/ProductModal";
import CartDrawer from "@/components/cardapio/CartDrawer";
import BusinessInfoModal from "@/components/cardapio/BusinessInfoModal";
import { toast } from "sonner";

// Mock Data
const mockBusiness = {
  name: "Burger House Premium",
  category: "🍔 Hamburgueria",
  logo: "",
  banner: "",
  rating: 4.8,
  status: "Aberto",
  deliveryTime: "30-40 min",
  minimumOrder: 15.00,
  deliveryFee: 5.00,
  description: "Os melhores hambúrgueres artesanais da cidade"
};

const mockCategories = [
  { id: "burgers", name: "🍔 Hambúrgueres", emoji: "🍔" },
  { id: "sides", name: "🍟 Acompanhamentos", emoji: "🍟" },
  { id: "drinks", name: "🥤 Bebidas", emoji: "🥤" },
  { id: "desserts", name: "🍰 Sobremesas", emoji: "🍰" },
];

const mockProducts = [
  {
    id: "1",
    name: "X-Burger Especial",
    description: "Hambúrguer 180g, queijo cheddar, alface, tomate, cebola caramelizada",
    price: 25.90,
    categoryId: "burgers",
    image: "",
    addonGroups: [
      {
        id: "meat",
        name: "Ponto da Carne",
        required: true,
        type: "single" as const,
        options: [
          { id: "rare", name: "Mal passada", price: 0 },
          { id: "medium", name: "Ao ponto", price: 0 },
          { id: "well", name: "Bem passada", price: 0 },
        ]
      },
      {
        id: "extras",
        name: "Extras",
        required: false,
        type: "multiple" as const,
        max: 3,
        options: [
          { id: "bacon", name: "Bacon", price: 3.00 },
          { id: "cheese", name: "Cheddar extra", price: 2.50 },
          { id: "egg", name: "Ovo", price: 2.00 },
          { id: "onion", name: "Cebola caramelizada", price: 2.00 },
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Burger Duplo",
    description: "Dois hambúrgueres 180g, queijo, alface, tomate, molho especial",
    price: 32.90,
    categoryId: "burgers",
    image: "",
  },
  {
    id: "3",
    name: "Chicken Burger",
    description: "Frango empanado, queijo, alface, tomate, maionese especial",
    price: 22.90,
    categoryId: "burgers",
    image: ""
  },
  {
    id: "4",
    name: "Batata Frita Grande",
    description: "Porção grande de batatas fritas crocantes",
    price: 15.90,
    categoryId: "sides",
    image: ""
  },
  {
    id: "5",
    name: "Onion Rings",
    description: "Anéis de cebola empanados e fritos",
    price: 12.90,
    categoryId: "sides",
    image: ""
  },
  {
    id: "6",
    name: "Coca-Cola Lata",
    description: "Coca-Cola 350ml gelada",
    price: 5.00,
    categoryId: "drinks",
    image: ""
  },
];

const Cardapio = () => {
  const [activeCategory, setActiveCategory] = useState(mockCategories[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleProductClick = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    setSelectedProduct(product || null);
  };

  const handleAddToCart = (item: any) => {
    setCartItems((prev) => [...prev, item]);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) => {
      const newItems = [...prev];
      newItems[index] = {
        ...newItems[index],
        quantity,
        total: (newItems[index].total / newItems[index].quantity) * quantity
      };
      return newItems;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    categoryRefs.current[categoryId]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredProducts = mockProducts.filter((product) =>
    searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="relative w-full h-40 md:h-48 bg-gradient-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
      </div>

      <div className="container px-4 -mt-20 relative z-10 mb-6">
        <Card className="p-4 md:p-6 shadow-xl">
          <div className="flex gap-4 items-start">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-background border-4 border-white shadow-lg flex-shrink-0 -mt-10">
              <div className="w-full h-full rounded-lg bg-gradient-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold mb-1">{mockBusiness.name}</h1>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-muted-foreground">{mockBusiness.category}</span>
                <Badge variant={mockBusiness.status === "Aberto" ? "default" : "destructive"} className="text-xs">
                  {mockBusiness.status}
                </Badge>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-semibold">{mockBusiness.rating}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{mockBusiness.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>Mín. R$ {mockBusiness.minimumOrder.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>R$ {mockBusiness.deliveryFee.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsInfoModalOpen(true)}>
              <Info className="w-4 h-4 mr-2" />
              Informações
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link copiado!");
            }}>
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </Card>
      </div>

      <div className="container px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar no cardápio" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-11" />
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-y py-3 mb-6">
        <div className="container px-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {mockCategories.map((category) => (
              <Button key={category.id} variant={activeCategory === category.id ? "default" : "outline"} className="flex-shrink-0" onClick={() => scrollToCategory(category.id)}>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container px-4 space-y-8">
        {mockCategories.map((category) => {
          const categoryProducts = filteredProducts.filter((p) => p.categoryId === category.id);
          if (categoryProducts.length === 0 && searchQuery) return null;
          return (
            <div key={category.id} ref={(el) => (categoryRefs.current[category.id] = el)} className="scroll-mt-32">
              <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
              <div className="grid gap-4">
                {categoryProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    onAddToCart={handleProductClick}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <Link to="/meus-pedidos">
          <Button size="lg" variant="outline" className="rounded-full shadow-lg bg-background hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Meus Pedidos
          </Button>
        </Link>
        <Button size="lg" className="rounded-full shadow-2xl hover:scale-105 transition-transform" onClick={() => setIsCartOpen(true)}>
          <ShoppingCart className="w-5 h-5 mr-2" />
          {cartItems.length > 0 ? `Ver Carrinho (${cartItems.length})` : "Carrinho Vazio"}
        </Button>
      </div>

      <ProductModal 
        product={selectedProduct} 
        open={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={handleAddToCart} 
      />
      <CartDrawer 
        open={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={handleUpdateQuantity} 
        onRemoveItem={handleRemoveItem} 
      />
      <BusinessInfoModal 
        open={isInfoModalOpen} 
        onOpenChange={setIsInfoModalOpen} 
        business={{ 
          ...mockBusiness, 
          address: "Rua das Flores, 123 - Centro - São Paulo/SP", 
          phone: "11999999999", 
          instagram: "burgerhousepremium" 
        }} 
      />
    </div>
  );
};

export default Cardapio;