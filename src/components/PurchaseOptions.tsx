import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ShoppingCart, Zap, Star, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '../types';

interface PurchaseProps {
  settings: SiteSettings;
}

const OFFERS = [
  {
    units: 1,
    label: "Tratamento Inicial",
    unitPrice: 127.0,
    price: 127.0,
    duration: "Uso para 60 dias",
    save: "Conforto Articular",
    isPopular: false,
    imageUrl: "https://i.postimg.cc/FKpCsJVJ/701680785-919352694490034-2901042899817003963-n.jpg"
  },
  {
    units: 2,
    label: "Economia Progressiva",
    unitPrice: 114.0,
    price: 228.0,
    duration: "Uso para 120 dias",
    save: "Tratamento Intermediário",
    isPopular: false,
    imageUrl: "https://i.postimg.cc/FKpCsJVJ/701680785-919352694490034-2901042899817003963-n.jpg"
  },
  {
    units: 3,
    label: "Tratamento Completo",
    unitPrice: 99.0,
    price: 297.0,
    duration: "Uso para 180 dias",
    save: "Sua Saúde pelo Melhor Preço",
    isPopular: true,
    imageUrl: "https://i.postimg.cc/FKpCsJVJ/701680785-919352694490034-2901042899817003963-n.jpg"
  }
];

export function PurchaseOptions({ settings }: PurchaseProps) {
  const handleBuy = (offer: typeof OFFERS[0]) => {
    const text = encodeURIComponent(`Olá! Gostaria de aproveitar a oferta de ${offer.units} potes do Artro Balance PLUS por R$ ${offer.price.toFixed(2)}.`);
    window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="comprar" className="py-24 bg-brand-navy relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-4xl lg:text-6xl text-white font-black uppercase tracking-tighter italic">
              Artro Balance <span className="text-brand-red">PLUS</span>
            </h2>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center gap-2 text-brand-red font-black uppercase tracking-[0.3em] text-xs">
                <Star className="w-4 h-4 fill-current" />
                Sua Saúde pelo Melhor Preço
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Estoque Limitado • Pote com 60 cápsulas</p>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 max-w-6xl mx-auto gap-8">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.units}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-[2.5rem] p-10 flex flex-col border-4 transition-all duration-300 hover:-translate-y-2 ${offer.isPopular ? 'border-brand-red scale-105 z-20 shadow-2xl shadow-brand-red/20' : 'border-white/10'}`}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-navy text-white py-1.5 px-5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-xl">
                 60 cápsulas por pote
              </div>

              {offer.isPopular && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-red text-white py-2 px-6 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl ring-4 ring-white animate-bounce-subtle">
                  Melhor Escolha
                </div>
              )}

              <div className="flex justify-center mb-10">
                <div className="relative">
                  <img src={offer.imageUrl} alt={offer.label} className="w-48 h-48 object-contain drop-shadow-2xl" />
                  <div className="absolute -bottom-2 -right-2 bg-brand-red text-white w-14 h-14 rounded-2xl flex flex-col items-center justify-center ring-4 ring-white shadow-xl rotate-12">
                    <span className="text-xl font-black text-center leading-tight">{offer.units}x<br/><span className="text-[8px] uppercase">Potes</span></span>
                  </div>
                </div>
              </div>

              <div className="text-center flex-1 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-brand-navy uppercase tracking-tighter mb-1">
                    {offer.units} {offer.units === 1 ? 'Pote' : 'Potes'}
                  </h3>
                  <p className="text-[10px] font-black text-brand-red uppercase tracking-widest">{offer.label}</p>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-4 mb-8 border border-slate-100 italic">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Duração do tratamento</p>
                  <p className="text-sm font-black text-brand-navy uppercase tracking-tight">{offer.duration}</p>
                </div>

                <div className="mt-auto">
                   <div className="mb-4">
                      <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Valor por unidade</p>
                      <p className="text-slate-400 line-through text-xs font-bold">R$ 197,00</p>
                      <p className="text-xl font-black text-brand-green">R$ {offer.unitPrice.toFixed(2)}</p>
                   </div>

                  <div className="py-6 border-t border-slate-100">
                    <p className="text-[10px] text-brand-navy/40 uppercase tracking-[0.2em] font-black mb-1">Valor Final</p>
                    <div className="flex items-center justify-center gap-1 mb-2">
                       <span className="text-2xl font-black text-brand-navy leading-none">R$</span>
                       <span className="text-5xl font-black text-brand-navy tracking-tighter leading-none">
                         {offer.price.toFixed(0)}
                       </span>
                       <span className="text-2xl font-black text-brand-navy leading-none">,00</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{offer.save}</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleBuy(offer)}
                  className={`w-full py-5 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl ${offer.isPopular ? 'bg-brand-red text-white shadow-brand-red/30' : 'bg-brand-navy text-white shadow-brand-navy/30'}`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Comprar Agora
                </button>

                <div className="mt-8 flex items-center justify-center gap-6 text-slate-300">
                   <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[7px] font-black uppercase tracking-widest">Garantia</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                      <Zap className="w-4 h-4 fill-brand-red text-brand-red" />
                      <span className="text-[7px] font-black uppercase tracking-widest">Envio Rápido</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Payment Methods Footer */}
        <div className="mt-16 pt-12 border-t border-white/5 flex flex-col items-center gap-8">
           <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
              <img src="https://logodownload.org/wp-content/uploads/2016/10/visa-logo-1.png" className="h-4" />
              <img src="https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo-7.png" className="h-4" />
              <img src="https://logodownload.org/wp-content/uploads/2015/03/elo-logo-1.png" className="h-4" />
              <img src="https://logodownload.org/wp-content/uploads/2020/02/pix-logo-1.png" className="h-4" />
              <img src="https://logodownload.org/wp-content/uploads/2019/06/boleto-logo.png" className="h-4" />
           </div>
           <p className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-bold">
             Ambiente Seguro Habilitado • SB Suplementos 2026
           </p>
        </div>
      </div>
    </section>
  );
}
