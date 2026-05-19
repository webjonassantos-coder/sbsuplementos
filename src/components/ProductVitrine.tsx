import React from 'react';
import { motion } from 'motion/react';
import { Product, SiteSettings } from '../types';
import { Check, MessageCircle, Star } from 'lucide-react';

interface VitrineProps {
  products: Product[];
  settings: SiteSettings;
}

export function ProductVitrine({ products, settings }: VitrineProps) {
  const handleBuy = (product: Product) => {
    const text = encodeURIComponent(product.whatsappText || `Olá! Gostaria de comprar o ${product.name}.`);
    window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="vitrine" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-brand-navy z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-brand-navy mb-4 uppercase tracking-tighter">Escolha o seu Tratamento</h2>
          <p className="text-slate-500 italic">Preços exclusivos para compras via site oficial.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id || `prod-${i}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white p-8 rounded-3xl brand-shadow border-2 transition-all hover:-translate-y-2 ${product.isKit && product.kitUnits === 3 ? 'border-brand-navy scale-105 z-20 bg-brand-slate' : 'border-slate-200'}`}
            >
              {product.isKit && product.kitUnits === 3 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-red text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Mais Vendido
                </div>
              )}

              <div className="flex justify-center mb-8">
                <div className="relative">
                   <img src={product.imageUrl} alt={product.name} className="w-48 h-48 object-contain rounded-2xl" />
                   {product.isKit && (
                     <div className="absolute top-0 right-0 bg-brand-navy text-white w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white">
                        {product.kitUnits}x
                     </div>
                   )}
                </div>
              </div>

              <div className="space-y-4 text-center">
                <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
                   {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <h3 className="text-2xl font-black text-brand-navy m-0 uppercase tracking-tight">{product.name}</h3>
                <p className="text-slate-500 text-sm italic">{product.description}</p>
                
                <div className="py-6 space-y-1">
                  {product.originalPrice && (
                    <p className="text-sm text-slate-400 line-through">De R$ {product.originalPrice.toFixed(2)}</p>
                  )}
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Por apenas</p>
                  <p className="text-5xl font-black text-brand-red tracking-tighter">
                    R$ {product.price.toFixed(2)}
                  </p>
                  <div className="flex flex-col items-center gap-1 mt-3">
                    <p className="text-[10px] text-brand-navy font-black uppercase tracking-widest bg-white inline-block px-3 py-1 rounded border border-slate-100 italic">FRETE GRÁTIS BRASIL</p>
                    <p className="text-[10px] font-black text-brand-red uppercase animate-pulse mt-1">⚠️ Restam apenas {Math.floor(Math.random() * 5) + 3} unidades em estoque</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-3 text-xs font-black uppercase tracking-tight text-slate-600">
                     <div className="w-2 h-2 rounded-full bg-brand-green shrink-0 shadow-[0_0_8px_rgba(37,211,102,0.8)]" />
                     Resultados em até 15 dias
                   </div>
                   <div className="flex items-center gap-3 text-xs font-black uppercase tracking-tight text-slate-600">
                     <div className="w-2 h-2 rounded-full bg-brand-green shrink-0 shadow-[0_0_8px_rgba(37,211,102,0.8)]" />
                     Compra 100% Protegida
                   </div>
                </div>

                <button 
                  onClick={() => handleBuy(product)}
                  className={`w-full py-5 rounded-xl font-black text-sm uppercase flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl hover:scale-105 ${product.isKit && product.kitUnits === 3 ? 'bg-brand-red text-white shadow-brand-red/20 pulse-urgent' : 'bg-brand-navy text-white shadow-brand-navy/20'}`}
                >
                  <MessageCircle className="w-5 h-5" />
                  {product.isKit && product.kitUnits === 3 ? 'Garanta Oferta Especial' : 'Aproveitar Desconto'}
                </button>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
