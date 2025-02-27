
import React, { useState, useEffect } from 'react';
import { ProductSearch } from '@/components/ProductSearch';
import { Button } from '@/components/ui/button';
import { ShoppingCart, TrendingDown, Sparkles, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading for animation purposes
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Products to be animated in
  const popularProducts = [
    "Coffee", "Milk", "Pasta", "Bread", "Cheese", "Yogurt", "Eggs"
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 min-h-[600px] flex items-center">
      {/* Background elements (decorative) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Feature badge */}
          <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-opacity mb-6 ${loaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '100ms', transitionDuration: '700ms' }}>
            <Badge variant="outline" className="rounded-full pl-1 pr-2 py-1 border-primary/20 bg-primary/5 text-primary">
              <span className="flex items-center text-xs">
                <Sparkles className="h-3 w-3 mr-1 text-primary" />
                Smart Price Comparison
              </span>
            </Badge>
          </div>

          {/* Hero title */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-tight mb-4 transition-all ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '200ms', transitionDuration: '700ms' }}
          >
            Save money on your <span className="text-primary">grocery shopping</span>
          </h1>

          {/* Hero subtitle */}
          <p 
            className={`text-xl text-muted-foreground mb-8 max-w-2xl mx-auto transition-all ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '300ms', transitionDuration: '700ms' }}
          >
            Compare prices across supermarkets in France, find the best deals, and get smart recommendations for savings.
          </p>

          {/* Search box */}
          <div 
            className={`mb-8 transition-all ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '400ms', transitionDuration: '700ms' }}
          >
            <ProductSearch />
          </div>

          {/* Popular search terms */}
          <div 
            className={`flex flex-wrap justify-center gap-2 mb-12 transition-all ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '500ms', transitionDuration: '700ms' }}
          >
            <span className="text-sm text-muted-foreground">Popular:</span>
            {popularProducts.map((product, index) => (
              <Button 
                key={product} 
                variant="link" 
                className="h-auto p-0 text-sm"
                style={{ 
                  transitionDelay: `${600 + (index * 50)}ms`, 
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 700ms, transform 700ms' 
                }}
              >
                {product}
              </Button>
            ))}
          </div>

          {/* Feature highlights */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto transition-all ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '600ms', transitionDuration: '700ms' }}
          >
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Price Comparison</h3>
              <p className="text-sm text-muted-foreground">Compare prices across all major supermarkets in France</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingDown className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Price Alerts</h3>
              <p className="text-sm text-muted-foreground">Get notified when prices drop for your favorite products</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Price History</h3>
              <p className="text-sm text-muted-foreground">View price trends and make smart buying decisions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
