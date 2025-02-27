
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { RecentPrices } from '@/components/RecentPrices';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  
  React.useEffect(() => {
    // Show a welcome toast
    toast({
      title: "Welcome to SmartShop Saver!",
      description: "Compare supermarket prices and save money on your groceries."
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <FeaturedProducts />
        
        <section className="py-16 container">
          <h2 className="text-2xl font-display font-bold mb-8">Recent Community Updates</h2>
          <RecentPrices />
        </section>

        <section className="py-16 bg-muted/20">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-4">
                <h2 className="text-3xl font-display font-bold">Join our community</h2>
                <p className="text-muted-foreground">
                  Help other shoppers save money by sharing prices you find in stores. Together, we can build the most up-to-date price comparison platform.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Submit prices you see while shopping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Set alerts for price drops on your favorite products</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Get personalized savings recommendations</span>
                  </li>
                </ul>
              </div>
              
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl transform rotate-3 scale-105" />
                  <div className="glass-card p-8 rounded-xl relative">
                    <h3 className="text-lg font-semibold mb-4">How it works</h3>
                    <ol className="space-y-4">
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">1</div>
                        <div>
                          <p>Search for a product by name or scan barcode</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">2</div>
                        <div>
                          <p>Compare prices across different supermarkets</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">3</div>
                        <div>
                          <p>Submit new prices when you're at the store</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">4</div>
                        <div>
                          <p>Save money by shopping at the right store</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
