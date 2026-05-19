import React from 'react';
import { motion } from 'motion/react';
import { CheckCheck, MessageCircle } from 'lucide-react';

const REVIEWS = [
  {
    name: "Dona Maria - PR",
    message: "Gente, esse Artro Balance é milagroso! Minha dor no joelho sumiu em 1 semana. Deus abençoe vcs! 🙏",
    time: "10:15",
    status: "read"
  },
  {
    name: "Sr. José Carlos",
    message: "Chegou certinho aqui no interior de Minas. O frete foi bem rápido mesmo. Já tomei a primeira dose hj.",
    time: "14:22",
    status: "read"
  },
  {
    name: "Ana Luiza",
    message: "Melhor investimento que fiz. Voltei a fazer minhas caminhadas sem sentir aquele estralo no quadril. Obg!",
    time: "09:05",
    status: "read"
  }
];

export function WhatsAppReviews() {
  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-brand-navy uppercase tracking-tighter italic">Relatos de quem usa e aprova</h2>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-4">Prints reais de nossos clientes no WhatsApp</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative aspect-[9/16] max-w-[300px] mx-auto w-full bg-[#E5DDD5] rounded-[2.5rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden"
            >
              {/* WhatsApp Header Mockup */}
              <div className="bg-[#075E54] p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-300 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white text-xs font-bold leading-tight">{review.name}</p>
                  <p className="text-white/60 text-[8px]">Online agora</p>
                </div>
              </div>

              {/* Chat Area */}
              <div className="p-4 space-y-4 h-full bg-[url('https://i.pinimg.com/originals/85/ec/da/85ecda1afc8230219c6237887373ecce.jpg')] bg-repeat bg-center">
                 <div className="max-w-[85%] bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-xs relative">
                    {review.message}
                    <div className="flex items-center justify-end gap-1 mt-1">
                       <span className="text-[8px] text-slate-400">{review.time}</span>
                       <CheckCheck className="w-3 h-3 text-sky-400" />
                    </div>
                </div>

                <div className="mt-10 max-w-[85%] ml-auto bg-[#DCF8C6] p-3 rounded-2xl rounded-tr-none shadow-sm text-xs relative">
                    Ficamos muito felizes com seu resultado! Conte sempre com a SB Suplementos. 💚
                    <div className="flex items-center justify-end gap-1 mt-1">
                       <span className="text-[8px] text-slate-400">10:18</span>
                       <CheckCheck className="w-3 h-3 text-sky-400" />
                    </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="absolute bottom-0 w-full p-2 bg-[#F0F0F0] flex items-center gap-2">
                 <div className="flex-1 bg-white h-8 rounded-full px-4 text-[10px] flex items-center text-slate-400">Digite uma mensagem...</div>
                 <div className="w-8 h-8 bg-[#128C7E] rounded-full flex items-center justify-center text-white">
                    <MessageCircle className="w-4 h-4" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
