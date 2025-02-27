
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, EuroIcon } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  store: string;
  nutriScore?: 'A' | 'B' | 'C' | 'D' | 'E';
  isOnSale?: boolean;
}

export function ProductCard({
  id,
  name,
  brand,
  image,
  price,
  store,
  nutriScore,
  isOnSale = false
}: ProductCardProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-medium translate-y-[-4px]' : 'shadow-soft'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
        
        <img
          src={image}
          alt={name}
          className={`h-full w-full object-cover transition-all duration-700 ${
            isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          } ${isHovered ? 'scale-105' : 'scale-100'}`}
          onLoad={handleImageLoad}
        />
        
        {nutriScore && (
          <div className="absolute top-2 left-2">
            <Badge 
              className={`
                font-medium ${
                  nutriScore === 'A' ? 'bg-green-500 hover:bg-green-600' :
                  nutriScore === 'B' ? 'bg-green-400 hover:bg-green-500' :
                  nutriScore === 'C' ? 'bg-yellow-500 hover:bg-yellow-600' :
                  nutriScore === 'D' ? 'bg-orange-500 hover:bg-orange-600' :
                  'bg-red-500 hover:bg-red-600'
                }
              `}
            >
              Nutri-Score {nutriScore}
            </Badge>
          </div>
        )}
        
        {isOnSale && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive">On Sale</Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="py-4">
        <CardTitle className="line-clamp-1 text-base">{name}</CardTitle>
        <CardDescription className="line-clamp-1">{brand}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-baseline">
            <span className="text-xl font-medium tracking-tight mr-1">€{price.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground">at {store}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Star className="h-3.5 w-3.5 fill-yellow-400 stroke-yellow-500 mr-1" />
            <span>4.5</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pb-4">
        <Button 
          className="w-full"
          variant="outline"
          onClick={() => navigate(`/products/${id}`)}
        >
          Compare Prices
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
