import React, { useEffect, useState } from 'react';
import { dbService } from '../services/db';
import { Product, SiteSettings } from '../types';
import { DEFAULT_SETTINGS, DEFAULT_PRODUCTS } from '../constants';
import { Hero } from '../components/Hero';
import { Ingredients } from '../components/Ingredients';
import { ProductVitrine } from '../components/ProductVitrine';
import { FloatingAI } from '../components/FloatingAI';
import { motion } from 'motion/react';
import { Shield, Truck, CreditCard, RotateCcw, MessageCircle } from 'lucide-react';

import { SalesNotifications } from '../components/SalesNotifications';
import { HighConversionPopup } from '../components/HighConversionPopup';
import { IntroSplash } from '../components/IntroSplash';
import { WhatsAppReviews } from '../components/WhatsAppReviews';
import { GoogleTrustBadge } from '../components/GoogleTrustBadge';

export function HomePage() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ min: 14, sec: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.sec === 0) {
          if (prev.min === 0) return { min: 0, sec: 0 };
          return { min: prev.min - 1, sec: 59 };
        }
        return { ...prev, sec: prev.sec - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Initial fetch to clear loading state quickly with cached/latest data
    const loadInitial = async () => {
      try {
        const [p, s] = await Promise.all([dbService.getProducts(), dbService.getSettings()]);
        if (p.length > 0) setProducts(p);
        if (s) setSettings(s);
      } catch (e) {
        console.error("Initial load failed", e);
      } finally {
        setLoading(false);
      }
    };
    loadInitial();

    // Set up real-time subscriptions
    const unsubProducts = dbService.subscribeProducts((newProducts) => {
      if (newProducts.length > 0) setProducts(newProducts);
    });

    const unsubSettings = dbService.subscribeSettings((newSettings) => {
      if (newSettings) setSettings(newSettings);
    });

    return () => {
      unsubProducts();
      unsubSettings();
    };
  }, []);

  return (
    <div className="bg-clinical-bg min-h-screen">
      <IntroSplash />
      {/* Extreme Urgency Bar */}
      <div className="bg-brand-red py-2 sticky top-0 z-[60] flex justify-center items-center gap-3 shadow-xl">
        <p className="text-white text-[10px] font-black uppercase tracking-widest animate-pulse">
          🔥 OFERTA EXCLUSIVA DO SITE TERMINA EM:
        </p>
        <div className="bg-white text-brand-red px-2 py-0.5 rounded font-black text-xs min-w-[60px] text-center">
          {String(timeLeft.min).padStart(2, '0')}:{String(timeLeft.sec).padStart(2, '0')}
        </div>
      </div>

      {/* Header Info Bar */}
      <div className="bg-brand-navy py-3 border-b border-white/10">

        <div className="container mx-auto px-6 flex justify-between items-center text-white/80 text-[10px] font-bold uppercase tracking-widest">
           <div className="flex gap-6">
             <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Frete Grátis acima de R$ 300</span>
             <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Site 100% Seguro</span>
           </div>
           <div className="hidden sm:block">
             Acompanhe seu pedido: {settings.sacEmail}
           </div>
        </div>
      </div>

      <nav className="h-20 bg-brand-navy sticky top-0 z-40 border-b-4 border-brand-red flex items-center text-white">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2 shadow-inner">
                <img 
                  src="https://i.postimg.cc/y8tch66x/Chat-GPT-Image-19-de-mai-de-2026-12-18-12.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
             </div>
             <div>
               <span className="text-xl font-black tracking-tight block leading-none">{settings.storeName.toUpperCase()}</span>
               <span className="text-[8px] uppercase tracking-widest text-white/50">Advanced Health Solutions</span>
             </div>
          </div>
          <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-brand-red transition-colors">Início</a>
            <a href="#vitrine" className="hover:text-brand-red transition-colors">Produtos</a>
            <a href="#ingredientes" className="hover:text-brand-red transition-colors">Ciência</a>
            <a href="#" className="hover:text-brand-red transition-colors">Resultados</a>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden xl:block">
                <GoogleTrustBadge />
             </div>
             <a 
               href={`https://wa.me/${settings.whatsapp}`} 
               target="_blank" 
               rel="noreferrer"
               className="bg-brand-green text-white px-6 py-3 rounded-full font-black text-xs uppercase hover:brightness-110 pulse-urgent transition-all flex items-center gap-2 shadow-xl"
             >
               <MessageCircle className="w-5 h-5" />
               Atendimento VIP
             </a>
          </div>
        </div>
      </nav>

      <Hero settings={settings} />

      {/* Trust bar */}
      <section className="bg-slate-50 border-y border-slate-100 py-12">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { icon: Shield, text: "Garantia de 30 dias", sub: "Satisfação total" },
             { icon: RotateCcw, text: "Devolução Grátis", sub: "Sem burocracia" },
             { icon: CreditCard, text: "Parcelamento", sub: "Até 12x sem juros" },
             { icon: Truck, text: "Envio Expresso", sub: "Para todo Brasil" },
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-red shadow-sm border border-slate-100">
                   <item.icon className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-sm font-black text-brand-navy uppercase tracking-tighter">{item.text}</p>
                   <p className="text-[10px] text-slate-400 uppercase tracking-widest">{item.sub}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <div id="ingredientes">
        <Ingredients />
      </div>

      <ProductVitrine products={products} settings={settings} />

      <WhatsAppReviews />

      {/* Final CTA */}
      <section className="py-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 text-center relative z-10">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
           >
             <h2 className="text-4xl lg:text-5xl text-white mb-6">Pronto para viver sem limitações?</h2>
             <p className="text-white/60 mb-10 max-w-xl mx-auto italic text-lg leading-relaxed">
               Junte-se a milhares de pessoas que recuperaram a liberdade de movimento com SB Suplementos.
             </p>
             <button 
                onClick={() => window.open(`https://wa.me/${settings.whatsapp}`, '_blank')}
                className="inline-flex items-center gap-3 px-10 py-5 bg-brand-red text-white rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-brand-red/20 uppercase tracking-tight"
             >
                Falar com Especialista agora
                <Shield className="w-6 h-6 border-l pl-2 border-white/20" />
             </button>
           </motion.div>
        </div>
      </section>

      <footer className="bg-brand-navy py-16 text-white/40 border-t-8 border-brand-red">
        <div className="container mx-auto px-6 text-center text-[8px] uppercase tracking-widest mt-10">
          *Aviso: Este produto não substitui orientações médicas. Os resultados podem variar de pessoa para pessoa.
        </div>
        <div className="container mx-auto px-6 mt-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
               <h4 className="text-white font-black text-2xl mb-6 uppercase tracking-tight">{settings.storeName}</h4>
               <p className="text-sm max-w-xs leading-relaxed">
                 Sua saúde articular é nossa prioridade. Desenvolvemos soluções baseadas em ativos naturais de alta performance para garantir seu bem-estar diário.
               </p>
            </div>
            <div>
               <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Links Úteis</h5>
               <ul className="space-y-4 text-xs">
                 <li><a href="#" className="hover:text-white transition-colors">Sobre nós</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Políticas de Privacidade</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Dúvidas Frequentes</a></li>
               </ul>
            </div>
            <div>
               <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Suporte</h5>
               <ul className="space-y-4 text-xs font-mono">
                 <li>{settings.sacEmail}</li>
                 <li>{settings.sacPhone}</li>
                 <li>CNPJ: 00.000.000/0000-00</li>
               </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px]">
             <p>© 2026 {settings.storeName} - Todos os direitos reservados. Indústria Brasileira.</p>
             <div className="flex gap-6">
                <a href="#" className="hover:text-white">Instagram</a>
                <a href="#" className="hover:text-white">Facebook</a>
                <a href="#" className="hover:text-white">TikTok</a>
                <a href="/login" className="text-white/20 hover:text-white transition-colors border-l border-white/10 pl-6 ml-6">Área do Administrador</a>
             </div>
          </div>
        </div>
      </footer>

      <FloatingAI settings={settings} />
      <SalesNotifications />
      <HighConversionPopup settings={settings} />
    </div>
  );
}
