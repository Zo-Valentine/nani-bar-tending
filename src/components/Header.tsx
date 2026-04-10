import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { GlassWater } from "lucide-react";

interface HeaderProps {
  isScrolled: boolean;
}

export default function Header({ isScrolled }: HeaderProps) {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-obsidian/80 backdrop-blur-md py-4 border-b border-gold/10" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
            <GlassWater className="text-obsidian w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold tracking-tight gold-text-gradient">GUILTY PLEASURES</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground -mt-1">By Nani</span>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          {["Services", "Pairings", "Reviews", "Heatmap"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button 
            variant="outline" 
            className="border-gold/50 text-gold hover:bg-gold hover:text-obsidian rounded-none px-6 uppercase tracking-widest text-[10px] font-bold transition-all duration-300"
          >
            Check Availability
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
