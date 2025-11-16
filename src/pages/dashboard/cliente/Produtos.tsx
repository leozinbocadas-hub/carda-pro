import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import ProductFormModal from "@/components/dashboard/ProductFormModal";

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const [products, setProducts] = useState([
    {
      id: "1",
      name: "X-Burger Especial",
      description: "Hambúrguer artesanal com queijo, bacon, alface, tomate e molho especial",
      price: 30.0,
      categoryId: "1",
      category: "🍔 Hambúrgueres",
      position: 1,
      active: true,
      image: "",
      addonGroups: [
        {
          id: "meat",
          name: "Ponto da Carne",
          type: "single" as const,
          required: true,
          options: [
            { id: "rare", name: "Mal passada", price: 0 },
            { id: "medium", name: "Ao ponto", price: 0 },
            { id: "well", name: "Bem passada", price: 0 },
          ],
        },
        {
          id: "extras",
          name: "Extras",
          type: "multiple" as const,
          required: false,
          max: 3,
          options: [
            { id: "bacon", name: "Bacon", price: 3.0 },
            { id: "cheese", name: "Cheddar extra", price: 2.5 },
            { id: "egg", name: "Ovo", price: 2.0 },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Pizza Margherita",
      description: "Molho de tomate, mussarela, manjericão fresco e azeite",
      price: 45.0,
      categoryId: "2",
      category: "🍕 Pizzas",
      position: 2,
      active: true,
      image: "",
    },
    {
      id: "3",
      name: "Batata Frita Grande",
      description: "Porção generosa de batatas fritas crocantes",
      price: 15.0,
      categoryId: "3",
      category: "🍟 Acompanhamentos",
      position: 3,
      active: true,
      image: "",
    },
  ]);

  const categories = [
    { id: "1", name: "🍔 Hambúrgueres" },
    { id: "2", name: "🍕 Pizzas" },
    { id: "3", name: "🍟 Acompanhamentos" },
    { id: "4", name: "🥤 Bebidas" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSaveProduct = (data: any) => {
    if (selectedProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...data,
                id: p.id,
                category: categories.find((c) => c.id === data.categoryId)?.name || "",
              }
            : p
        )
      );
    } else {
      const newProduct = {
        ...data,
        id: `${Date.now()}`,
        category: categories.find((c) => c.id === data.categoryId)?.name || "",
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setProductToDelete(null);
    toast.success("Produto removido!");
  };

  const handleToggleActive = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie o cardápio do seu negócio
          </p>
        </div>
        <Button
          className="gap-2"
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4" />
          Novo Produto
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover-lift">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {product.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">{product.category}</Badge>
                          <span className="text-lg font-bold text-primary">
                            R$ {product.price.toFixed(2)}
                          </span>
                          {product.addonGroups && product.addonGroups.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {product.addonGroups.length} grupo(s) de adicionais
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Status Toggle */}
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={product.active}
                          onCheckedChange={() => handleToggleActive(product.id)}
                        />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {product.active ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => setProductToDelete(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || categoryFilter !== "all"
              ? "Tente ajustar os filtros"
              : "Comece criando seu primeiro produto"}
          </p>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      )}

      {/* Product Form Modal */}
      <ProductFormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveProduct}
        product={selectedProduct}
        categories={categories}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => productToDelete && handleDeleteProduct(productToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Produtos;
