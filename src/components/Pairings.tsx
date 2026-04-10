import { useState } from "react";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles, Info } from "lucide-react";

const pairings = [
  {
    id: 1,
    title: "The Midnight Bloom",
    cocktail: "Smoked Hibiscus Mezcal",
    dessert: "Dark Chocolate Ganache Tart",
    notes: "The earthy smoke of the mezcal cuts through the richness of 70% cacao, while hibiscus notes dance with the tart's berry undertones.",
    cocktailImg: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600",
    dessertImg: "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    title: "Golden Hour",
    cocktail: "Saffron Spiced Gin Fizz",
    dessert: "Honey Lavender Macarons",
    notes: "Floral gin meets the delicate sweetness of honey. Saffron adds a sophisticated warmth that bridges the botanical and the sweet.",
    cocktailImg: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600",
    dessertImg: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    title: "Velvet Night",
    cocktail: "Espresso Martini Noir",
    dessert: "Salted Caramel Cheesecake",
    notes: "Double-shot espresso and premium vodka provide a bold, bitter counterpoint to the creamy, salt-kissed caramel.",
    cocktailImg: "https://images.unsplash.com/photo-1545438102-799c3991ffb2?auto=format&fit=crop&q=80&w=600",
    dessertImg: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600",
  }
];

export default function Pairings() {
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const handleAddToInquiry = (title: string) => {
    toast.success(`${title} added to inquiry!`, {
      description: "We'll include this pairing in your custom quote.",
    });
  };

  return (
    <div id="pairings" className="space-y-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">The Art of the Pairing</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold">Pleasure <span className="italic gold-text-gradient">Pairings</span></h2>
          <p className="text-muted-foreground font-light max-w-xl">
            Curated duos designed to elevate your palate. Each pairing is a conversation between liquid and solid art.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-gold" />
          </div>
        </div>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {pairings.map((pairing) => (
            <CarouselItem key={pairing.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div 
                className="relative h-[500px] perspective-1000 group cursor-pointer"
                onMouseEnter={() => setFlippedId(pairing.id)}
                onMouseLeave={() => setFlippedId(null)}
              >
                <motion.div
                  className="w-full h-full transition-all duration-700 preserve-3d"
                  animate={{ rotateY: flippedId === pairing.id ? 180 : 0 }}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 backface-hidden">
                    <Card className="w-full h-full bg-white/5 border-gold/10 overflow-hidden rounded-none">
                      <div className="relative h-full">
                        <div className="absolute inset-0 flex">
                          <div className="w-1/2 relative overflow-hidden">
                            <img 
                              src={pairing.cocktailImg} 
                              alt={pairing.cocktail}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-obsidian/20" />
                          </div>
                          <div className="w-1/2 relative overflow-hidden">
                            <img 
                              src={pairing.dessertImg} 
                              alt={pairing.dessert}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-obsidian/20" />
                          </div>
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2">
                          <h3 className="text-2xl font-serif font-bold text-white">{pairing.title}</h3>
                          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold font-bold">
                            <span>{pairing.cocktail}</span>
                            <span className="text-white/20">×</span>
                            <span>{pairing.dessert}</span>
                          </div>
                          <div className="pt-4 flex items-center gap-2 text-muted-foreground text-[10px] uppercase tracking-widest">
                            <Info className="w-3 h-3" />
                            <span>Hover for Tasting Notes</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <Card className="w-full h-full bg-gold/5 border-gold/40 flex flex-col justify-center p-12 text-center rounded-none backdrop-blur-xl">
                      <Sparkles className="w-8 h-8 text-gold mx-auto mb-6" />
                      <h3 className="text-2xl font-serif font-bold mb-4 gold-text-gradient">Flavor Notes</h3>
                      <p className="text-sm font-light leading-relaxed text-muted-foreground mb-8 italic">
                        "{pairing.notes}"
                      </p>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToInquiry(pairing.title);
                        }}
                        className="gold-gradient text-obsidian font-bold uppercase tracking-widest text-[10px] rounded-none h-12"
                      >
                        Request this Duo
                      </Button>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="bg-obsidian border-gold/20 text-gold hover:bg-gold hover:text-obsidian -left-12" />
          <CarouselNext className="bg-obsidian border-gold/20 text-gold hover:bg-gold hover:text-obsidian -right-12" />
        </div>
      </Carousel>
    </div>
  );
}
