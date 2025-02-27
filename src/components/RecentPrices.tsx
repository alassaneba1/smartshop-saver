
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

const mockRecentPrices = [
  { 
    id: '1', 
    productName: 'Organic Bananas',
    store: 'Carrefour',
    price: 1.99,
    previousPrice: 2.29,
    date: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    user: 'anonymous',
    verified: true 
  },
  { 
    id: '2', 
    productName: 'Greek Yogurt',
    store: 'Monoprix',
    price: 2.49,
    previousPrice: 2.49,
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    user: 'thomas89',
    verified: false 
  },
  { 
    id: '3', 
    productName: 'Chicken Breast',
    store: 'Leclerc',
    price: 7.95,
    previousPrice: 8.45,
    date: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    user: 'marie_p',
    verified: true 
  },
  { 
    id: '4', 
    productName: 'Artisan Bread',
    store: 'Auchan',
    price: 3.29,
    previousPrice: 3.29,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    user: 'jean_s',
    verified: false 
  },
  { 
    id: '5', 
    productName: 'Extra Virgin Olive Oil',
    store: 'Casino',
    price: 7.99,
    previousPrice: 8.99,
    date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    user: 'philippe75',
    verified: true 
  }
];

export function RecentPrices() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading for animation purposes
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className={`transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <CardHeader>
        <CardTitle>Recently Updated Prices</CardTitle>
        <CardDescription>
          Latest prices submitted by our community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Store</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRecentPrices.map((item, index) => {
              const priceDifference = item.price - item.previousPrice;
              const formattedTime = formatDistanceToNow(new Date(item.date), { addSuffix: true });
              
              return (
                <TableRow key={item.id} style={{ 
                  opacity: loaded ? 1 : 0, 
                  transform: loaded ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 500ms, transform 500ms',
                  transitionDelay: `${index * 100}ms`
                }}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {item.productName}
                      {item.verified && (
                        <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 text-xs h-5">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{item.store}</TableCell>
                  <TableCell className="text-right">€{item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    {priceDifference < 0 ? (
                      <span className="text-green-600">
                        {priceDifference.toFixed(2)}
                      </span>
                    ) : priceDifference > 0 ? (
                      <span className="text-red-600">
                        +{priceDifference.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">
                    {formattedTime}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
