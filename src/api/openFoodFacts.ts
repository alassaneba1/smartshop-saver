
// This file will contain the OpenFoodFacts API integration

export interface Product {
  id: string;
  code: string;
  name: string;
  brand: string;
  image: string;
  nutriScore?: 'A' | 'B' | 'C' | 'D' | 'E';
  ingredients?: string;
  allergens?: string[];
  nutrition?: {
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
  };
}

export interface PriceData {
  id: string;
  productId: string;
  store: string;
  price: number;
  date: string;
  verified: boolean;
  onSale: boolean;
  trend: 'up' | 'down' | 'stable';
  percentChange?: number;
}

// Mock data to simulate API calls
const mockProducts: Record<string, Product> = {
  '1': {
    id: '1',
    code: '3017620425035',
    name: 'Organic Bananas',
    brand: 'Nature\'s Best',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    nutriScore: 'A',
    ingredients: 'Organic bananas',
    allergens: [],
    nutrition: {
      calories: 89,
      fat: 0.3,
      carbs: 22.8,
      protein: 1.1
    }
  },
  '2': {
    id: '2',
    code: '3033490004521',
    name: 'Greek Yogurt',
    brand: 'Danone',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    nutriScore: 'B',
    ingredients: 'Milk, cream, live yogurt cultures',
    allergens: ['Milk'],
    nutrition: {
      calories: 120,
      fat: 5,
      carbs: 3.5,
      protein: 15
    }
  },
  '3': {
    id: '3',
    code: '3242272620018',
    name: 'Artisan Bread',
    brand: 'Parisian Bakery',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    nutriScore: 'B',
    ingredients: 'Flour, water, salt, yeast',
    allergens: ['Gluten'],
    nutrition: {
      calories: 265,
      fat: 0.8,
      carbs: 51.5,
      protein: 9.2
    }
  },
  // Add more mock products as needed
};

// Mock price data
const mockPriceData: Record<string, PriceData[]> = {
  '1': [
    {
      id: '1',
      productId: '1',
      store: 'Carrefour',
      price: 1.99,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      verified: true,
      onSale: false,
      trend: 'down',
      percentChange: 13
    },
    {
      id: '2',
      productId: '1',
      store: 'Leclerc',
      price: 2.15,
      date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      verified: true,
      onSale: false,
      trend: 'stable',
    },
    {
      id: '3',
      productId: '1',
      store: 'Auchan',
      price: 2.29,
      date: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
      verified: false,
      onSale: false,
      trend: 'up',
      percentChange: 5
    },
    {
      id: '4',
      productId: '1',
      store: 'Monoprix',
      price: 2.49,
      date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      verified: true,
      onSale: false,
      trend: 'up',
      percentChange: 8
    },
    {
      id: '5',
      productId: '1',
      store: 'Casino',
      price: 2.39,
      date: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
      verified: false,
      onSale: true,
      trend: 'down',
      percentChange: 12
    }
  ],
  // Similar data for other products
};

// Functions to simulate API calls
export async function searchProducts(query: string): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simple search logic
  if (!query) return [];
  
  query = query.toLowerCase();
  return Object.values(mockProducts).filter(
    product => product.name.toLowerCase().includes(query) || 
               product.brand.toLowerCase().includes(query)
  );
}

export async function getProductByCode(code: string): Promise<Product | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const product = Object.values(mockProducts).find(p => p.code === code);
  return product || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return mockProducts[id] || null;
}

export async function getProductPrices(productId: string): Promise<PriceData[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return mockPriceData[productId] || [];
}

export async function submitPrice(
  productId: string, 
  store: string, 
  price: number
): Promise<PriceData> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Create a new price entry
  const newPriceData: PriceData = {
    id: `new-${Date.now()}`,
    productId,
    store,
    price,
    date: new Date().toISOString(),
    verified: false,
    onSale: false,
    trend: 'stable',
  };
  
  // In a real app, this would be sent to a backend
  return newPriceData;
}

// In a real implementation, this would connect to the OpenFoodFacts API
// For example:
// export async function searchProductsFromAPI(query: string): Promise<Product[]> {
//   const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`);
//   if (!response.ok) throw new Error('Failed to fetch products');
//   const data = await response.json();
//   return data.products.map(mapApiProductToModel);
// }
// 
// function mapApiProductToModel(apiProduct: any): Product {
//   return {
//     id: apiProduct._id,
//     code: apiProduct.code,
//     name: apiProduct.product_name,
//     brand: apiProduct.brands,
//     image: apiProduct.image_url,
//     nutriScore: apiProduct.nutrition_grades?.toUpperCase() || undefined,
//     ingredients: apiProduct.ingredients_text,
//     allergens: apiProduct.allergens_tags || [],
//     nutrition: {
//       calories: apiProduct.nutriments?.energy_value || 0,
//       fat: apiProduct.nutriments?.fat_value || 0,
//       carbs: apiProduct.nutriments?.carbohydrates_value || 0,
//       protein: apiProduct.nutriments?.proteins_value || 0
//     }
//   };
// }
