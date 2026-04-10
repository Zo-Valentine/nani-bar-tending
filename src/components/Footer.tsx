import { motion } from "motion/react";
import { Instagram, Mail, Phone, MapPin, GlassWater } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-[#080808] pt-24 pb-12 px-6 md:px-12 border-t border-gold/10">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                <GlassWater className="text-obsidian w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-tight gold-text-gradient uppercase">Guilty Pleasures</span>
                <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground -mt-1">By Nani</span>
              </div>
            </div>
            <p className="text-muted-foreground font-light max-w-md leading-relaxed">
              Redefining the luxury event experience through bespoke mixology and artisan desserts. Based in Los Angeles, serving the extraordinary.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full border-gold/20 hover:bg-gold hover:text-obsidian transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-gold/20 hover:bg-gold hover:text-obsidian transition-all duration-300">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Links Column */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Experience</h4>
            <nav className="flex flex-col gap-4">
              {["The Configurator", "Perfect Pairings", "Event Heatmap", "Client Reviews"].map((item) => (
                <a key={item} href="#" className="text-sm text-muted-foreground hover:text-white transition-colors font-light">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Connect</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-light">
                <Phone className="w-4 h-4 text-gold/50" />
                <span>+1 (310) GP-NANI-0</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-light">
                <Mail className="w-4 h-4 text-gold/50" />
                <span>hello@guiltypleasures.la</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-light">
                <MapPin className="w-4 h-4 text-gold/50" />
                <span>Los Angeles, CA</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gold/10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">© 2026 Guilty Pleasures by Nani</span>
            <div className="flex gap-6">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-gold cursor-pointer transition-colors">Privacy Policy</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-gold cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Follow Nani</span>
             <div className="flex gap-3">
                <span className="text-[10px] font-bold text-gold hover:underline cursor-pointer">@guiltypleasuresbynani</span>
                <span className="text-white/20">|</span>
                <span className="text-[10px] font-bold text-gold hover:underline cursor-pointer">@nianniyanay</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
