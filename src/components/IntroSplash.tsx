import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Activity, BrainCircuit } from 'lucide-react';

export function IntroSplash() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[1000] bg-brand-navy flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Particles/Cells */}
          <div className="absolute inset-0 opacity-10">
             {[...Array(10)].map((_, i) => (
               <motion.div
                 key={i}
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                 transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}
                 className="absolute rounded-full bg-white blur-xl"
                 style={{
                   width: Math.random() * 100 + 50,
                   height: Math.random() * 100 + 50,
                   top: `${Math.random() * 100}%`,
                   left: `${Math.random() * 100}%`,
                 }}
               />
             ))}
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl relative"
            >
              <div className="absolute inset-0 rounded-full border-4 border-brand-red animate-ping opacity-20" />
              <img 
                src="https://i.postimg.cc/y8tch66x/Chat-GPT-Image-19-de-mai-de-2026-12-18-12.png" 
                alt="SB Suplementos" 
                className="w-32 h-32 object-contain"
              />
            </motion.div>

            <div className="text-center">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl font-black text-white uppercase tracking-tighter mb-2"
              >
                SB Suplementos
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 1 }}
                className="h-1 bg-brand-red mx-auto"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="text-white text-xs uppercase tracking-widest mt-4 font-bold"
              >
                Ciência • Performance • Liberdade
              </motion.p>
            </div>
          </div>

          {/* Icon sequence */}
          <div className="absolute bottom-20 flex gap-12 text-white/30">
             <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}><ShieldCheck className="w-8 h-8" /></motion.div>
             <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}><Activity className="w-8 h-8" /></motion.div>
             <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}><BrainCircuit className="w-8 h-8" /></motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
