import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, ShieldCheck, Gift } from 'lucide-react';
import { SiteSettings } from '../types';

export function HighConversionPopup({ settings }: { settings: SiteSettings }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = sessionStorage.getItem('popupSeen');
      if (!hasSeen) {
        setIsOpen(true);
        sessionStorage.setItem('popupSeen', 'true');
      }
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleLead = () => {
    const text = encodeURIComponent("Olá! Quero garantir meu desconto de 60% e frete grátis antes que acabe a oferta!");
    window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-navy/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-brand-navy z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="bg-brand-red p-8 flex flex-col items-center text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter m-0">OFERTA DE ÚLTIMA HORA</h2>
              <p className="text-white/80 font-bold uppercase text-[10px] tracking-widest mt-2 bg-white/10 px-4 py-1 rounded-full">
                Válido para os próximos 15 minutos
              </p>
            </div>

            <div className="p-10 text-center space-y-6">
              <div>
                <p className="text-lg text-slate-600 font-medium italic">
                  "Você foi selecionado para receber o Cupom Especial de Frete Grátis e 60% de Desconto Real."
                </p>
              </div>

              <div className="space-y-3">
                 <div className="flex items-center gap-3 text-sm font-bold text-brand-navy justify-center">
                   <ShieldCheck className="w-5 h-5 text-brand-green" />
                   Garantia de Satisfação 30 Dias
                 </div>
                 <p className="text-xs text-slate-400 italic">Restam apenas 4 cupons disponíveis para sua região.</p>
              </div>

              <button 
                onClick={handleLead}
                className="w-full py-5 bg-brand-green text-white rounded-2xl font-black text-xl uppercase tracking-tight flex items-center justify-center gap-3 shadow-xl shadow-brand-green/30 hover:brightness-110 pulse-urgent transition-all"
              >
                <MessageCircle className="w-7 h-7" />
                Resgatar Meu Desconto
              </button>

              <button 
                onClick={() => setIsOpen(false)}
                className="text-xs text-slate-300 font-bold uppercase tracking-widest hover:text-slate-500"
              >
                Não quero economizar hoje
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
