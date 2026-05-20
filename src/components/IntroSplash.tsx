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
          className="fixed inset-0 z-[1000] bg-[#030712] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Scientific Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Background Highlight/Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-[1000px] h-[1000px] bg-blue-500 rounded-full blur-[150px]" 
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-56 h-56 flex items-center justify-center p-4 relative"
            >
              {/* Spinning DNA/Orbital ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-2 border-r-2 border-brand-red/20 rounded-full blur-[1px]"
              />
              <img 
                src="https://i.postimg.cc/7LDKCC00/701597326-1383356700288999-7114571315254824173-n-(1).jpg" 
                alt="SB Suplementos" 
                className="w-full h-full object-contain relative z-10"
              />
            </motion.div>

            <div className="text-center">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl font-black text-white uppercase tracking-tighter mb-4"
                >
                  SB Suplementos
                </motion.h1>
              </div>
              
              <div className="relative w-64 h-1 bg-white/10 mx-auto rounded-full overflow-hidden mb-6">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 bg-brand-red"
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="flex items-center justify-center gap-4 text-white/40 text-[10px] uppercase tracking-[0.2em] font-black"
              >
                <span>Performance</span>
                <div className="w-1 h-1 rounded-full bg-brand-red/50" />
                <span>Ciência</span>
                <div className="w-1 h-1 rounded-full bg-brand-red/50" />
                <span>Liberdade</span>
              </motion.div>
            </div>
          </div>

          {/* Molecular Detail */}
          <div className="absolute bottom-12 flex flex-col items-center gap-4">
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-brand-red font-mono text-[8px] tracking-[0.3em] font-bold uppercase"
             >
                Initializing Advanced Clinical Protocol
             </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
