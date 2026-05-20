import React from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle2 } from 'lucide-react';

const CATALOG_PRODUCTS = [
  {
    name: "Artrodon",
    description: "Fórmula sinérgica com Magnésio, Cálcio, Zinco, Vitamina D3 e B12 para fortalecimento articular.",
    imageUrl: "https://i.postimg.cc/GpKghsxp/700234031-1300234662212935-8158354503283021538-n.jpg",
    benefits: ["Minerais Quelatados", "Saúde Óssea"]
  },
  {
    name: "Nano Ozon",
    description: "Óleo ozonizado 100% natural com tecnologia nano para máxima absorção e poder regenerativo.",
    imageUrl: "https://i.postimg.cc/d06NtTjt/700669009-1981251349443914-5348770129776444411-n.jpg",
    benefits: ["Poder Reativo", "Tecnologia Nano"]
  },
  {
    name: "Slim Active",
    description: "Composto bioativo com Cromo, Colina e Vitamina C para ativação metabólica e controle lipídico.",
    imageUrl: "https://i.postimg.cc/QtM4Bxf8/701342011-1477113516722415-1561327461622502043-n.jpg",
    benefits: ["Controle Glicêmico", "Foco Metabólico"]
  },
  {
    name: "Vita Complex",
    description: "Suplemento vitamínico e mineral de A a Z para suporte imunológico e vitalidade diária.",
    imageUrl: "https://i.postimg.cc/HLzvs798/701470018-1017683630610575-6356673231195015788-n.jpg",
    benefits: ["Imunidade Avançada", "Equilíbrio Nutricional"]
  },
  {
    name: "Curcuma Premium",
    description: "Altíssima concentração de 95% Curcuminóides para ação anti-inflamatória e antioxidante.",
    imageUrl: "https://i.postimg.cc/rpjZFtN0/701635138-3584372708367118-8842597439573769435-n.jpg",
    benefits: ["95% Curcuminóides", "Desintoxicação Natural"]
  },
  {
    name: "Artro Balance Plus",
    description: "Fórmula Premium para restauração da mobilidade e proteção contra o desgaste das cartilagens.",
    imageUrl: "https://i.postimg.cc/FKpCsJVJ/701680785-919352694490034-2901042899817003963-n.jpg",
    benefits: ["Mobilidade Máxima", "Alívio Articular"]
  }
];

export function ProductCatalog() {
  return (
    <section id="catalog" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="px-4 py-1.5 bg-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
              Catálogo de Produtos
            </span>
            <h2 className="text-4xl lg:text-5xl text-brand-navy font-black uppercase tracking-tighter">
              Escolha seu Tratamento
            </h2>
            <div className="w-24 h-1 bg-brand-red rounded-full" />
            <p className="text-slate-500 max-w-2xl mx-auto mt-4">
              Produtos desenvolvidos com biotecnologia de ponta para resultados clínicos reais. 
              Sua saúde em primeiro lugar.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATALOG_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center"
            >
              <div className="relative mb-8 aspect-square w-full flex items-center justify-center p-4 bg-white rounded-[2rem] shadow-inner group-hover:scale-105 transition-transform duration-500">
                 <img 
                   src={product.imageUrl} 
                   alt={product.name} 
                   className="w-full h-full object-contain drop-shadow-2xl"
                 />
                 <div className="absolute top-4 right-4 text-brand-red opacity-20 group-hover:opacity-100 transition-opacity">
                    <Shield className="w-6 h-6" />
                 </div>
              </div>

              <div className="flex flex-col flex-1 gap-4">
                <h3 className="text-2xl font-black text-brand-navy uppercase tracking-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed italic">
                  {product.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap justify-center gap-2">
                  {product.benefits.map((benefit) => (
                    <span key={benefit} className="flex items-center gap-1.5 text-[9px] font-black text-brand-navy uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-slate-100">
                      <CheckCircle2 className="w-3 h-3 text-brand-green" />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
