import { useState } from "react";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ChevronRight, ChevronLeft, Sparkles, Check } from "lucide-react";

const steps = [
  { id: 1, title: "The Occasion" },
  { id: 2, title: "The Pleasures" },
  { id: 3, title: "The Scale" },
  { id: 4, title: "The Reveal" },
];

export default function Configurator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    occasion: "",
    services: [] as string[],
    guests: 50,
    email: "",
    phone: "",
  });

  const progress = (step / steps.length) * 100;

  const nextStep = () => {
    if (step === 1 && !formData.occasion) {
      toast.error("Please select an occasion");
      return;
    }
    if (step === 2 && formData.services.length === 0) {
      toast.error("Please select at least one pleasure");
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service) 
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inquiry sent! Nani will be in touch soon.", {
      description: "Check your email for the full menu and custom quote.",
    });
  };

  return (
    <Card className="bg-obsidian/40 backdrop-blur-xl border-gold/20 shadow-2xl overflow-hidden">
      <div className="p-6 pb-0">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">
            Celebration Configurator
          </span>
          <span className="text-[10px] text-muted-foreground">
            {step === 4 ? "Final Step" : `${Math.round(progress)}% Complete`}
          </span>
        </div>
        <Progress value={progress} className="h-1 bg-white/5" />
      </div>

      <CardContent className="p-8 min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold">What's the Occasion?</h3>
                <p className="text-sm text-muted-foreground font-light">Every great story starts with a reason to celebrate.</p>
                <Select 
                  onValueChange={(v) => setFormData({ ...formData, occasion: v })}
                  value={formData.occasion}
                >
                  <SelectTrigger className="w-full bg-white/5 border-gold/20 h-14 rounded-none focus:ring-gold">
                    <SelectValue placeholder="Select Occasion" />
                  </SelectTrigger>
                  <SelectContent className="bg-obsidian border-gold/20 text-white">
                    <SelectItem value="wedding">Wedding Gala</SelectItem>
                    <SelectItem value="birthday">Private Soirée</SelectItem>
                    <SelectItem value="corporate">Corporate Launch</SelectItem>
                    <SelectItem value="anniversary">Anniversary Dinner</SelectItem>
                    <SelectItem value="other">Bespoke Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold">Pick your Pleasures</h3>
                <p className="text-sm text-muted-foreground font-light">Choose the elements that will define your night.</p>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { id: "bar", label: "Mobile Craft Bar", desc: "Artisan cocktails & mixology" },
                    { id: "dessert", label: "Gourmet Dessert Bar", desc: "Handcrafted sweets & treats" },
                    { id: "both", label: "The Full Experience", desc: "Both bar and dessert services" }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`p-4 text-left border transition-all duration-300 group ${
                        formData.services.includes(s.id) 
                          ? "border-gold bg-gold/10" 
                          : "border-white/10 hover:border-gold/50 bg-white/5"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${formData.services.includes(s.id) ? "text-gold" : "text-white"}`}>
                          {s.label}
                        </span>
                        {formData.services.includes(s.id) && <Check className="w-4 h-4 text-gold" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <h3 className="text-2xl font-serif font-bold">Guest Count</h3>
                <p className="text-sm text-muted-foreground font-light">Scale the experience to your audience.</p>
                <div className="space-y-12 pt-8">
                  <div className="text-center">
                    <span className="text-6xl font-serif font-bold gold-text-gradient">{formData.guests}</span>
                    <span className="text-muted-foreground ml-2 uppercase tracking-widest text-xs">Guests</span>
                  </div>
                  <Slider
                    value={[formData.guests]}
                    onValueChange={(v: number[]) => setFormData({ ...formData, guests: v[0] })}
                    max={500}
                    min={10}
                    step={10}
                    className="py-4"
                  />
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span>Intimate (10)</span>
                    <span>Grand (500+)</span>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-gold animate-pulse" />
                  <h3 className="text-2xl font-serif font-bold">Unlock Your Quote</h3>
                </div>
                <p className="text-sm text-muted-foreground font-light">
                  90% Complete - Unlock your custom estimate and the <span className="text-gold italic">Guilty Pleasures Full Menu</span>.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    className="w-full bg-white/5 border border-gold/20 h-14 px-4 rounded-none focus:outline-none focus:border-gold transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    required
                    className="w-full bg-white/5 border border-gold/20 h-14 px-4 rounded-none focus:outline-none focus:border-gold transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Button 
                    type="submit"
                    className="w-full h-14 gold-gradient text-obsidian font-bold uppercase tracking-[0.2em] rounded-none hover:opacity-90 transition-opacity"
                  >
                    See Custom Estimate
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 4 && (
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button 
                variant="ghost" 
                onClick={prevStep}
                className="flex-1 h-12 text-muted-foreground hover:text-white hover:bg-white/5 rounded-none uppercase tracking-widest text-[10px]"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            )}
            <Button 
              onClick={nextStep}
              className="flex-[2] h-12 bg-white/10 hover:bg-gold hover:text-obsidian text-white rounded-none uppercase tracking-widest text-[10px] font-bold transition-all duration-300"
            >
              Continue <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
