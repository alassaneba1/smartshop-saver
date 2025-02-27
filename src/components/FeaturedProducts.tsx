
import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const mockProducts = [
  {
    id: '1',
    name: 'Organic Bananas',
    brand: 'Nature\'s Best',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    price: 1.99,
    store: 'Carrefour',
    nutriScore: 'A' as const,
    isOnSale: false
  },
  {
    id: '2',
    name: 'Greek Yogurt',
    brand: 'Danone',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    price: 2.49,
    store: 'Leclerc',
    nutriScore: 'B' as const,
    isOnSale: true
  },
  {
    id: '3',
    name: 'Artisan Bread',
    brand: 'Parisian Bakery',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    price: 3.29,
    store: 'Auchan',
    nutriScore: 'B' as const,
    isOnSale: false
  },
  {
    id: '4',
    name: 'Medium Eggs (12)',
    brand: 'Country Fresh',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    price: 3.69,
    store: 'Monoprix',
    nutriScore: 'A' as const,
    isOnSale: false
  },
  {
    id: '5',
    name: 'Extra Virgin Olive Oil',
    brand: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    price: 7.99,
    store: 'Casino',
    nutriScore: 'C' as const,
    isOnSale: true
  },
  {
    id: '6',
    name: 'Dark Chocolate (70%)',
    brand: 'Lindt',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    price: 2.49,
    store: 'Carrefour',
    nutriScore: 'C' as const,
    isOnSale: false
  }
];

export function FeaturedProducts() {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading for animation purposes
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const spacing = 16; // gap between cards
        
        // Determine visible cards based on container width
        let newVisibleCards = 4;
        if (containerWidth < 768) {
          newVisibleCards = 1;
        } else if (containerWidth < 1024) {
          newVisibleCards = 2;
        } else if (containerWidth < 1280) {
          newVisibleCards = 3;
        }
        
        setVisibleCards(newVisibleCards);
        
        // Calculate card width based on container and visible cards
        const newCardWidth = (containerWidth - (spacing * (newVisibleCards - 1))) / newVisibleCards;
        setCardWidth(newCardWidth);
        
        // Update transform based on current slide
        setTranslateX(-currentSlide * (newCardWidth + spacing));
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, [currentSlide]);

  const totalSlides = Math.max(0, mockProducts.length - visibleCards);

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="py-16 bg-muted/20">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={`text-2xl font-display font-bold mb-2 transition-all ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: '100ms', transitionDuration: '700ms' }}>
              Featured Products
            </h2>
            <p className={`text-muted-foreground transition-all ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
               style={{ transitionDelay: '200ms', transitionDuration: '700ms' }}>
              Discover great deals across popular products
            </p>
          </div>
          
          <div className={`flex gap-2 transition-all ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
               style={{ transitionDelay: '300ms', transitionDuration: '700ms' }}>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextSlide}
              disabled={currentSlide >= totalSlides}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
        
        {/* Carousel container */}
        <div className="relative overflow-hidden" ref={containerRef}>
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {mockProducts.map((product, index) => (
              <div 
                key={product.id}
                className={`transition-all ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ 
                  transitionDelay: `${400 + (index * 100)}ms`, 
                  transitionDuration: '700ms',
                  width: `${cardWidth}px`,
                  minWidth: `${cardWidth}px`,
                  marginRight: index < mockProducts.length - 1 ? '16px' : '0'
                }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
