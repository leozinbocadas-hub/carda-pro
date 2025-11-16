import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  onAddToCart: (productId: string) => void;
}

const ProductCard = ({ id, name, description, price, image, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="flex gap-4 p-4 hover-lift cursor-pointer group" onClick={() => onAddToCart(id)}>
      {/* Product Image */}
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gradient-primary flex-shrink-0" />
      )}

      {/* Product Info */}
      <div className="flex-1 min-w-0 flex flex-col">
        <h3 className="font-semibold text-base md:text-lg line-clamp-1 mb-1">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2 flex-1">
          {description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-primary">
            R$ {price.toFixed(2).replace('.', ',')}
          </span>
          <Button
            size="sm"
            className="rounded-full w-8 h-8 p-0 bg-primary hover:bg-primary-dark btn-active group-hover:scale-110 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(id);
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
