import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, CheckCircle } from 'lucide-react';

const CITIES = ['São Paulo', 'Curitiba', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 'Salvador', 'Fortaleza', 'Brasília', 'Goiânia', 'Joinville'];
const NAMES = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Beatriz', 'Ricardo', 'Julia', 'Marcos', 'Fernanda'];

export function SalesNotifications() {
  const [notification, setNotification] = useState<{name: string, city: string} | null>(null);

  useEffect(() => {
    const showNotification = () => {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      setNotification({ name, city });
      
      setTimeout(() => setNotification(null), 5000);
    };

    const timer = setInterval(showNotification, 15000); // Every 15 seconds
    setTimeout(showNotification, 5000); // Initial delay

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-24 left-6 z-50 pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-brand-navy/10 flex items-center gap-4 max-w-sm pointer-events-auto ring-1 ring-brand-navy/5"
          >
            <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-navy">
                {notification.name} de {notification.city}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">
                Acabou de adquirir 3 Potes!
              </p>
              <p className="text-[9px] text-brand-green font-bold mt-1 tracking-tighter">
                Compra verificada • Há 2 minutos
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
