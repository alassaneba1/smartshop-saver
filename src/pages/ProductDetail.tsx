
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PriceComparisonTable } from '@/components/PriceComparisonTable';
import { getProductById, getProductPrices, Product, PriceData } from '@/api/openFoodFacts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Bell, ChevronRight, Plus, ShoppingCart, Star, Bookmark, BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState('');
  const [price, setPrice] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (id) {
          const productData = await getProductById(id);
          setProduct(productData);
          
          const priceData = await getProductPrices(id);
          setPrices(priceData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: 'Error',
          description: 'Failed to load product information.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const handleAddPrice = () => {
    // Validate form
    if (!store || !price || isNaN(Number(price))) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter a valid store and price.',
        variant: 'destructive',
      });
      return;
    }
    
    // In a real app, this would call an API to submit the price
    const newPrice: PriceData = {
      id: `new-${Date.now()}`,
      productId: id || '',
      store,
      price: Number(price),
      date: new Date().toISOString(),
      verified: false,
      onSale: false,
      trend: 'stable',
    };
    
    // Add to prices
    setPrices([newPrice, ...prices]);
    
    // Close dialog and show success toast
    setIsDialogOpen(false);
    setStore('');
    setPrice('');
    
    toast({
      title: 'Price Submitted',
      description: 'Thank you for contributing to the community!',
    });
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? 'Removed from Favorites' : 'Added to Favorites',
      description: isBookmarked ? 'Product removed from your favorites.' : 'Product added to your favorites. You can set price alerts later.',
    });
  };

  const setAlert = () => {
    toast({
      title: 'Price Alert Set',
      description: 'We\'ll notify you when this product drops in price.',
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-12">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="mt-4 text-muted-foreground">Loading product information...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-12">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
            <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild variant="outline">
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const lowestPrice = prices.length > 0 
    ? Math.min(...prices.map(p => p.price)) 
    : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/20 py-3">
          <div className="container">
            <div className="flex items-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </div>
        
        {/* Product details */}
        <section className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative">
              {/* Product image with skeleton loader */}
              <div className="aspect-square rounded-lg overflow-hidden bg-muted/30 relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {product.nutriScore && (
                  <div className="absolute top-4 left-4">
                    <Badge 
                      className={`
                        font-medium text-white ${
                          product.nutriScore === 'A' ? 'bg-green-500 hover:bg-green-600' :
                          product.nutriScore === 'B' ? 'bg-green-400 hover:bg-green-500' :
                          product.nutriScore === 'C' ? 'bg-yellow-500 hover:bg-yellow-600' :
                          product.nutriScore === 'D' ? 'bg-orange-500 hover:bg-orange-600' :
                          'bg-red-500 hover:bg-red-600'
                        }
                      `}
                    >
                      Nutri-Score {product.nutriScore}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-4">{product.brand}</p>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`h-5 w-5 ${star <= 4 ? 'fill-yellow-400 stroke-yellow-500' : 'stroke-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(24 reviews)</span>
              </div>
              
              {lowestPrice && (
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">Best price from</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">€{lowestPrice.toFixed(2)}</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Best price
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    From {prices.length} {prices.length === 1 ? 'store' : 'stores'}
                  </p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3 mb-8">
                <Button onClick={toggleBookmark} variant="outline">
                  {isBookmarked ? (
                    <>
                      <BookmarkCheck className="mr-2 h-4 w-4 text-primary" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save
                    </>
                  )}
                </Button>
                
                <Button onClick={setAlert} variant="outline">
                  <Bell className="mr-2 h-4 w-4" />
                  Set Alert
                </Button>
              </div>
              
              {/* Ingredients */}
              {product.ingredients && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Ingredients</h3>
                  <p className="text-muted-foreground text-sm">{product.ingredients}</p>
                </div>
              )}
              
              {/* Allergens */}
              {product.allergens && product.allergens.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Allergens</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.allergens.map((allergen, index) => (
                      <Badge key={index} variant="outline">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Nutrition */}
              {product.nutrition && (
                <div>
                  <h3 className="font-medium mb-2">Nutrition (per 100g)</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-muted/30 p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">Calories</p>
                      <p className="font-medium">{product.nutrition.calories} kcal</p>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">Fat</p>
                      <p className="font-medium">{product.nutrition.fat}g</p>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">Carbs</p>
                      <p className="font-medium">{product.nutrition.carbs}g</p>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">Protein</p>
                      <p className="font-medium">{product.nutrition.protein}g</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Price Comparison */}
        <section className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">Price Comparison</h2>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Price
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Price</DialogTitle>
                  <DialogDescription>
                    Share a price you've found for {product.name} to help other shoppers save money.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="store" className="text-sm font-medium">
                      Store
                    </label>
                    <Select value={store} onValueChange={setStore}>
                      <SelectTrigger id="store">
                        <SelectValue placeholder="Select store" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Carrefour">Carrefour</SelectItem>
                        <SelectItem value="Leclerc">E.Leclerc</SelectItem>
                        <SelectItem value="Auchan">Auchan</SelectItem>
                        <SelectItem value="Casino">Casino</SelectItem>
                        <SelectItem value="Monoprix">Monoprix</SelectItem>
                        <SelectItem value="Intermarché">Intermarché</SelectItem>
                        <SelectItem value="Franprix">Franprix</SelectItem>
                        <SelectItem value="Lidl">Lidl</SelectItem>
                        <SelectItem value="Aldi">Aldi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="price" className="text-sm font-medium">
                      Price (€)
                    </label>
                    <Input
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPrice}>Submit Price</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {prices.length > 0 ? (
            <PriceComparisonTable prices={prices} />
          ) : (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No prices available yet</h3>
              <p className="text-muted-foreground mb-4">Be the first to submit a price for this product.</p>
              <Button onClick={() => setIsDialogOpen(true)} variant="secondary">
                <Plus className="mr-2 h-4 w-4" />
                Add Price
              </Button>
            </div>
          )}
        </section>
        
        {/* Related Products - would be implemented in a real app */}
        <section className="container py-12">
          <h2 className="text-2xl font-display font-bold mb-6">Similar Products</h2>
          <div className="text-center py-12 bg-muted/20 rounded-lg">