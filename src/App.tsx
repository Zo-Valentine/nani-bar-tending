import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Pairings from "@/components/Pairings";
import Heatmap from "@/components/Heatmap";
import Footer from "@/components/Footer";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-white selection:bg-gold selection:text-obsidian">
      <Header isScrolled={isScrolled} />
      
      <main>
        <Hero />
        
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <SocialProof />
        </section>

        <section className="py-24 bg-gradient-to-b from-obsidian to-[#141414]">
          <Pairings />
        </section>

        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <Heatmap />
        </section>
      </main>

      <Footer />
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#141414',
          color: '#FFFFFF',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }
      }} />
    </div>
  );
}
