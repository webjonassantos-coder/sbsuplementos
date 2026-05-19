import React from 'react';
import { motion } from 'motion/react';
import { Beaker, Droplets, Leaf, Activity, ShieldPlus, Sparkles } from 'lucide-react';

const INGREDIENTS = [
  {
    name: "Metilsulfonilmetano (MSM)",
    desc: "Fonte natural de enxofre, essencial para a formação de colágeno e queratina.",
    benefit: "Previne dores, inflamações e perda de flexibilidade.",
    icon: Beaker
  },
  {
    name: "Saponinas",
    desc: "Possuem ação anti-inflamatória e antioxidante, ajudando na regeneração dos tecidos.",
    benefit: "Alívio da dor e proteção oxidativa.",
    icon: Leaf
  },
  {
    name: "Condroitina",
    desc: "Ajuda a manter a água na cartilagem, garantindo elasticidade e resistência.",
    benefit: "Estimula a regeneração dos tecidos.",
    icon: Droplets
  },
  {
    name: "Curcumina",
    desc: "Poderoso anti-inflamatório natural que ajuda no alívio da dor e proteção articular.",
    benefit: "Protege contra o desgaste e inflamações.",
    icon: Sparkles
  },
  {
    name: "Ácido Hialurônico",
    desc: "Lubrifica as articulações e melhora a absorção de impacto em cada movimento.",
    benefit: "Mais mobilidade e conforto ao andar.",
    icon: Activity
  },
  {
    name: "Colágeno Tipo II",
    desc: "Proteína essencial que mantém a estrutura e resistência da cartilagem articular.",
    benefit: "Previne desgaste, rigidez e artrose.",
    icon: ShieldPlus
  }
];

export function Ingredients() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl mb-4 uppercase tracking-tighter">A Ciência por trás do Alívio</h2>
          <p className="text-slate-500 italic">Uma combinação inteligente de 6 ativos selecionados que atuam em sinergia.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INGREDIENTS.map((ing, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-2xl border-2 border-slate-100 hover:border-brand-navy hover:bg-slate-50 transition-all brand-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-navy flex items-center justify-center text-white mb-6 group-hover:bg-brand-red transition-colors shadow-lg shadow-brand-navy/10">
                <ing.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black mb-3 uppercase tracking-tight">{ing.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 italic">{ing.desc}</p>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-[10px] font-black text-brand-red uppercase tracking-widest">{ing.benefit}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
