import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, GripVertical, Folder } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
import CategoryFormModal from "@/components/dashboard/CategoryFormModal";

interface Category {
  id: string;
  name: string;
  emoji: string;
  position: number;
  productCount: number;
}

interface SortableItemProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const SortableItem = ({ category, onEdit, onDelete }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={`hover-lift ${isDragging ? "shadow-lg" : ""}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {/* Drag Handle */}
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing touch-none"
            >
              <GripVertical className="w-5 h-5 text-muted-foreground" />
            </div>

            {/* Emoji */}
            <div className="text-3xl">{category.emoji}</div>

            {/* Category Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  Posição {category.position}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {category.productCount} {category.productCount === 1 ? "produto" : "produtos"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(category)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => onDelete(category.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Categorias = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Hambúrgueres", emoji: "🍔", position: 1, productCount: 8 },
    { id: "2", name: "Pizzas", emoji: "🍕", position: 2, productCount: 12 },
    { id: "3", name: "Acompanhamentos", emoji: "🍟", position: 3, productCount: 6 },
    { id: "4", name: "Bebidas", emoji: "🥤", position: 4, productCount: 15 },
    { id: "5", name: "Sobremesas", emoji: "🍰", position: 5, productCount: 5 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Update positions
        const updatedItems = newItems.map((item, index) => ({
          ...item,
          position: index + 1,
        }));

        toast.success("Ordem das categorias atualizada!");
        return updatedItems;
      });
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSaveCategory = (data: { name: string; emoji: string }) => {
    if (editingCategory) {
      // Edit existing category
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: data.name, emoji: data.emoji }
            : cat
        )
      );
      toast.success("Categoria atualizada com sucesso!");
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        name: data.name,
        emoji: data.emoji,
        position: categories.length + 1,
        productCount: 0,
      };
      setCategories((prev) => [...prev, newCategory]);
      toast.success("Categoria criada com sucesso!");
    }
    setIsModalOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setCategories((prev) => {
        const filtered = prev.filter((cat) => cat.id !== deletingId);
        // Update positions after deletion
        return filtered.map((cat, index) => ({
          ...cat,
          position: index + 1,
        }));
      });
      toast.success("Categoria deletada com sucesso!");
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Categorias</h1>
          <p className="text-muted-foreground">
            Organize os produtos do seu cardápio em categorias
          </p>
        </div>
        <Button onClick={handleAddCategory} className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Categoria
        </Button>
      </div>

      {/* Categories List */}
      {categories.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Folder className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma categoria cadastrada</h3>
            <p className="text-muted-foreground text-center mb-4">
              Crie sua primeira categoria para organizar seus produtos
            </p>
            <Button onClick={handleAddCategory} className="gap-2">
              <Plus className="w-4 h-4" />
              Criar Categoria
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            <GripVertical className="w-4 h-4" />
            <span>Arraste e solte para reordenar as categorias</span>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={categories.map((cat) => cat.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {categories.map((category) => (
                  <SortableItem
                    key={category.id}
                    category={category}
                    onEdit={handleEditCategory}
                    onDelete={handleDeleteCategory}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {/* Category Form Modal */}
      <CategoryFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={editingCategory}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Categoria</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar esta categoria? Os produtos não serão deletados,
              mas ficarão sem categoria até que você atribua uma nova.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Categorias;
