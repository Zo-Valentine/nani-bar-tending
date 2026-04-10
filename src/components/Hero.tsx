import { motion } from "motion/react";
import Configurator from "./Configurator";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Split Screen Background */}
      <div className="absolute inset-0 flex flex-col lg:flex-row z-0">
        <div className="flex-1 relative group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200" 
            alt="Craft Cocktails"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 lg:opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-transparent" />
        </div>
        <div className="flex-1 relative group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=1200" 
            alt="Gourmet Cupcakes"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 lg:opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-obsidian via-transparent to-transparent" />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-32 pb-12 lg:pt-0">
        <div className="max-w-2xl text-center lg:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6"
          >
            Indulge in <br />
            <span className="gold-text-gradient italic">Midnight Elegance</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 font-light tracking-wide max-w-lg"
          >
            Bespoke mobile bartending and artisan dessert catering for those who crave the extraordinary.
          </motion.p>
        </div>
      </div>

      {/* Configurator Side */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pb-24 lg:pb-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-md"
        >
          <Configurator />
        </motion.div>
      </div>
    </section>
  );
}
