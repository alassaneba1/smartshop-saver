
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, Info, TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PriceData {
  store: string;
  price: number;
  date: string; // ISO date string
  verified: boolean;
  onSale: boolean;
  trend: 'up' | 'down' | 'stable';
  percentChange?: number;
}

interface PriceComparisonTableProps {
  prices: PriceData[];
}

export function PriceComparisonTable({ prices }: PriceComparisonTableProps) {
  // Sort by price (lowest first)
  const sortedPrices = [...prices].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedPrices[0]?.price || 0;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    }).format(date);
  };

  return (
    <div className="overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Store</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="hidden md:table-cell">Last Updated</TableHead>
            <TableHead className="hidden md:table-cell">Trend</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPrices.map((item, index) => (
            <TableRow 
              key={`${item.store}-${index}`}
              className={index === 0 ? "bg-primary/5" : ""}
            >
              <TableCell className="font-medium">{item.store}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className={index === 0 ? "text-base font-semibold" : ""}>
                    €{item.price.toFixed(2)}
                  </span>
                  
                  {index === 0 && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 ml-1">
                      Best Price
                    </Badge>
                  )}
                  
                  {index > 0 && (
                    <span className="text-xs text-muted-foreground">
                      +€{(item.price - lowestPrice).toFixed(2)}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                {formatDate(item.date)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center">
                  {item.trend === "down" ? (
                    <div className="flex items-center text-green-500">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      <span>{item.percentChange ? `${item.percentChange}%` : ""}</span>
                    </div>
                  ) : item.trend === "up" ? (
                    <div className="flex items-center text-destructive">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>{item.percentChange ? `${item.percentChange}%` : ""}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Stable</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {item.verified && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Verified
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Price verified by multiple users</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  
                  {item.onSale && (
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                      Sale
                    </Badge>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
