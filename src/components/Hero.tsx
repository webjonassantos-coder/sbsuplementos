import React from 'react';
import { motion } from 'motion/react';
import { SiteSettings } from '../types';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { GoogleTrustBadge } from './GoogleTrustBadge';

export function Hero({ settings }: { settings: SiteSettings }) {
  const handleCta = () => {
    document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
      {/* Abstract Background elements */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-slate-50 skew-x-[-12deg] translate-x-20 z-0 opacity-50" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-navy/5 rounded-full blur-[100px] z-0" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-brand-navy border border-blue-100 rounded-sm text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck className="w-4 h-4" />
            Recomendado por Especialistas
          </div>
          <h1 className="text-5xl lg:text-7xl font-sans font-extrabold text-brand-navy leading-[1.05] mb-6">
            {settings.heroTitle}
          </h1>
          <p className="text-lg text-slate-600 mb-6 max-w-lg leading-relaxed italic">
            {settings.heroSubtitle}
          </p>

          <div className="mb-8 flex justify-start">
             <GoogleTrustBadge />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button 
              onClick={handleCta}
              className="px-8 py-5 bg-brand-navy text-white rounded-xl font-black text-sm uppercase flex items-center justify-center gap-3 hover:bg-brand-red transition-all shadow-xl shadow-brand-navy/20 active:scale-95"
            >
              Ver Ofertas Exclusivas
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-xs uppercase font-bold tracking-tight text-brand-navy">+10.000 clientes satisfeitos</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                 <ShieldCheck className="w-3 h-3 text-brand-green" />
                 Transação 100% Criptografada
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-brand-red" />
              <span className="text-xs font-black uppercase tracking-tight">Colágeno Tipo II</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-brand-red" />
              <span className="text-xs font-black uppercase tracking-tight">Cúrcuma Premium</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Main Product Image (Placeholder) */}
          <div className="relative z-10 bg-white p-8 rounded-[40px] shadow-2xl border-2 border-slate-100">
             <div className="bg-slate-50 p-10 rounded-3xl flex justify-center">
                <img 
                  src="https://i.postimg.cc/FKpCsJVJ/701680785-919352694490034-2901042899817003963-n.jpg" 
                  alt="Artro Balance Plus" 
                  className="w-48 h-auto rounded-3xl object-contain mix-blend-multiply drop-shadow-2xl"
                />
             </div>
             {/* Floating Badge */}
             <div className="absolute -bottom-4 right-4 bg-brand-red text-white px-6 py-3 rounded-xl font-black shadow-2xl shadow-brand-red/30 uppercase tracking-widest text-sm">
                Frete Grátis
             </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-navy/5 rounded-full blur-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
