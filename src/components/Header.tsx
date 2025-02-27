
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

export function Header() {
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-effect border-b border-border/40 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <span className="font-display text-lg font-semibold tracking-tight">
                SmartShop Saver
              </span>
            </Link>

            {!isMobile && !isSearchOpen && (
              <nav className="hidden md:flex gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/products">Products</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/compare">Compare</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/trends">Price Trends</Link>
                </Button>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isMobile ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="relative"
                >
                  <Search className="h-5 w-5" />
                </Button>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <div className="flex flex-col mt-8 gap-4">
                      <Link 
                        to="/" 
                        className="flex items-center h-10 px-4 rounded-md hover:bg-accent transition-colors"
                      >
                        Home
                      </Link>
                      <Link 
                        to="/products" 
                        className="flex items-center h-10 px-4 rounded-md hover:bg-accent transition-colors"
                      >
                        Products
                      </Link>
                      <Link 
                        to="/compare" 
                        className="flex items-center h-10 px-4 rounded-md hover:bg-accent transition-colors"
                      >
                        Compare
                      </Link>
                      <Link 
                        to="/trends" 
                        className="flex items-center h-10 px-4 rounded-md hover:bg-accent transition-colors"
                      >
                        Price Trends
                      </Link>
                      <Link 
                        to="/login" 
                        className="flex items-center h-10 px-4 rounded-md hover:bg-accent transition-colors"
                      >
                        Login
                      </Link>
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            ) : (
              <>
                {isSearchOpen ? (
                  <div className="relative w-[240px] animate-fade-in">
                    <Input 
                      type="search" 
                      placeholder="Search products..." 
                      className="pr-8"
                      autoFocus
                      onBlur={() => setIsSearchOpen(false)}
                    />
                    <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsSearchOpen(true)}
                    className="animate-fade-in"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
                
                <Button variant="outline" asChild>
                  <Link to="/login">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search overlay */}
      {isMobile && isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background p-4 border-b border-border shadow-sm animate-slide-in">
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="pr-8 w-full"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </header>
  );
}
