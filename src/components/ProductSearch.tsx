
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Barcode, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from '@/components/ui/command';
import { toast } from '@/components/ui/use-toast';

export function ProductSearch() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSearch = async (value: string) => {
    setSearchQuery(value);
    
    if (value.length < 2) {
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // Simulating API call with mock data
    setTimeout(() => {
      const mockResults = [
        { id: '1', name: 'Organic Bananas', brand: 'Nature\'s Best', category: 'Fruits' },
        { id: '2', name: 'Whole Milk', brand: 'French Farms', category: 'Dairy' },
        { id: '3', name: 'Artisan Bread', brand: 'Parisian Bakery', category: 'Bakery' },
        { id: '4', name: 'Medium Eggs (12)', brand: 'Country Fresh', category: 'Eggs' },
        { id: '5', name: 'Extra Virgin Olive Oil', brand: 'Mediterranean', category: 'Oils' },
      ].filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase()) || 
        item.brand.toLowerCase().includes(value.toLowerCase())
      );
      
      setResults(mockResults);
      setIsSearching(false);
    }, 500);
  };
  
  const handleProductSelect = (id: string) => {
    setIsOpen(false);
    navigate(`/products/${id}`);
  };
  
  const handleBarcodeSearch = () => {
    toast({
      title: "Barcode Scanner",
      description: "The barcode scanner feature is coming soon!",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-card rounded-xl p-1 flex items-center">
        <Input
          type="text"
          placeholder="Search for products, brands, or categories..."
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base p-4"
          onClick={() => setIsOpen(true)}
          readOnly
        />
        <div className="flex items-center gap-1 pr-1">
          <Button variant="ghost" size="icon" onClick={handleBarcodeSearch}>
            <Barcode className="h-5 w-5" />
            <span className="sr-only">Scan Barcode</span>
          </Button>
          <Button variant="default" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-center text-muted-foreground mt-2">
        Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd> to search products
      </p>
      
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput
            placeholder="Search products..."
            value={searchQuery}
            onValueChange={handleSearch}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              className="h-6 w-6 p-0 rounded-md"
              onClick={() => {
                setSearchQuery('');
                setResults([]);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CommandList>
          {isSearching ? (
            <div className="py-6 text-center text-sm">
              <div className="h-8 w-8 mx-auto animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="mt-2 text-muted-foreground">Searching products...</p>
            </div>
          ) : results.length === 0 && searchQuery.length > 1 ? (
            <CommandEmpty>No products found.</CommandEmpty>
          ) : (
            <>
              <CommandGroup heading="Products">
                {results.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleProductSelect(item.id)}
                    className="cursor-pointer"
                  >
                    <div className="text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground ml-auto">{item.brand}</div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
