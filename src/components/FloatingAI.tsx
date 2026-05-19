import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, MessageCircle } from 'lucide-react';
import { SiteSettings } from '../types';

interface FloatingAIProps {
  settings: SiteSettings;
}

const MESSAGES = [
  "Últimos cupons de Frete Grátis liberados no WhatsApp!",
  "Dúvidas? Fale com um especialista agora mesmo!",
  "Ganhe 60% de DESCONTO exclusivo via WhatsApp!",
  "94% dos clientes aprovam. Veja depoimentos reais!",
];

export function FloatingAI({ settings }: FloatingAIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const bubbleTimer = setTimeout(() => setShowBubble(true), 3000);
    const interval = setInterval(() => {
      setCurrentMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 5000);

    return () => {
      clearTimeout(bubbleTimer);
      clearInterval(interval);
    };
  }, []);

  const handleWhatsapp = () => {
    const text = encodeURIComponent("Olá! Estou no site e quero garantir meu desconto especial de 60% e Frete Grátis agora!");
    window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-brand-red p-4 rounded-2xl shadow-2xl border-2 border-white mb-4 max-w-[250px] relative pointer-events-auto cursor-pointer pulse-urgent"
            onClick={() => setIsOpen(true)}
          >
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-brand-red border-r border-b border-white rotate-45" />
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-brand-red" />
              </div>
              <p className="text-xs text-white leading-tight font-black uppercase tracking-tight">
                🔥 {MESSAGES[currentMsgIndex]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-green rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 border-4 border-white pulse-urgent"
      >
        {isOpen ? <X className="text-white" /> : <MessageCircle className="text-white w-8 h-8" />}
      </button>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] bg-white rounded-2xl shadow-2xl border border-brand-red overflow-hidden"
          >
            <div className="bg-brand-navy p-4 flex items-center justify-between border-b-4 border-brand-red">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-black text-xs uppercase m-0 tracking-widest">Assistente Artro Balance</h3>
                  <p className="text-white/60 text-[10px] uppercase font-bold">Responde em segundos</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[300px] overflow-y-auto bg-slate-50">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <p className="text-xs font-black text-brand-navy uppercase mb-2">⭐ Classificação 4.9/5.0</p>
                <p className="text-xs font-medium text-slate-600 leading-relaxed italic">
                  "Olá! Sou a assistente oficial. Junte-se a mais de 10.000 clientes satisfeitos. Garanta seu desconto de 60% AGORA chamando no WhatsApp!"
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleWhatsapp}
                  className="w-full py-4 bg-brand-green text-white rounded-lg text-sm font-black uppercase flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20 hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Garantir Cupom no WhatsApp
                </button>
                <button 
                  onClick={() => window.open(`https://instagram.com/${settings.instagram}`, '_blank')}
                  className="w-full py-3 border-2 border-brand-navy text-brand-navy rounded-lg text-xs font-black uppercase hover:bg-brand-navy hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Ver Mais de 100 Depoimentos
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white flex gap-2">
              <input 
                type="text" 
                placeholder="Digite sua dúvida..." 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-[10px] font-bold focus:ring-2 focus:ring-brand-navy outline-none transition-all"
              />
              <button className="p-2 bg-brand-navy text-white rounded-lg hover:bg-brand-red transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
