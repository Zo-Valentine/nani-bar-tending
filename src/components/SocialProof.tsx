import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Alexandra M.",
    source: "Yelp",
    rating: 5,
    text: "Nani's mobile bar was the highlight of our wedding! The smoked old fashioneds were a masterpiece.",
    date: "March 2026"
  },
  {
    name: "Jordan T.",
    source: "Google",
    rating: 5,
    text: "The dessert bar was almost too beautiful to eat. The rose quartz cupcakes are a must-try!",
    date: "February 2026"
  },
  {
    name: "Sarah L.",
    source: "Google",
    rating: 5,
    text: "Professional, elegant, and absolutely delicious. Guilty Pleasures redefined catering for us.",
    date: "January 2026"
  },
  {
    name: "Michael R.",
    source: "Yelp",
    rating: 5,
    text: "Exceeded all expectations. The attention to detail in the pairings is world-class.",
    date: "December 2025"
  }
];

export default function SocialProof() {
  return (
    <div id="reviews" className="space-y-16">
      <div className="text-center space-y-4">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold"
        >
          Social Proof
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif font-bold"
        >
          The Buzz Around <br /> <span className="italic gold-text-gradient">Guilty Pleasures</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-white/5 border-gold/10 hover:border-gold/30 transition-all duration-500 h-full group">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-full border border-white/10">
                    <span className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold">{review.source}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${review.source === 'Yelp' ? 'bg-red-500' : 'bg-blue-500'}`} />
                  </div>
                </div>
                
                <Quote className="w-8 h-8 text-gold/20 mb-4 group-hover:text-gold/40 transition-colors" />
                
                <p className="text-sm font-light leading-relaxed text-muted-foreground mb-6 flex-1 italic">
                  "{review.text}"
                </p>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs font-medium text-white">{review.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">{review.date}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <div className="flex items-center gap-8 py-4 px-12 border-y border-gold/10 overflow-hidden relative">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
             {[...Array(10)].map((_, i) => (
               <span key={i} className="text-[10px] uppercase tracking-[0.5em] text-gold/30 font-bold">
                 5-Star Rated on Yelp & Google • 100+ Events in 2025 •
               </span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
