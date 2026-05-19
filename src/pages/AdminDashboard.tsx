import React, { useEffect, useState } from 'react';
import { dbService } from '../services/db';
import { Product } from '../types';
import { ShoppingBag, Users, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbService.getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const stats = [
    { title: 'Produtos Ativos', value: products.length, icon: ShoppingBag, color: 'bg-blue-500' },
    { title: 'Cliques Hoje', value: '24', icon: TrendingUp, color: 'bg-emerald-500' },
    { title: 'Conversões zap', value: '8', icon: Users, color: 'bg-purple-500' },
    { title: 'Última Edição', value: 'Agora', icon: Clock, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif m-0">Bem-vindo, Administrador</h1>
        <p className="text-slate-400 text-sm italic">"Sua saúde é o seu maior patrimônio."</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 clinical-shadow">
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-current/10`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.title}</p>
            <h3 className="text-2xl font-sans font-bold text-brand-navy m-0">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="col-span-2 bg-white p-8 rounded-3xl border border-slate-100 clinical-shadow space-y-6">
          <h3 className="text-lg font-serif m-0">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/products" className="p-6 border border-slate-100 rounded-2xl hover:border-brand-navy/30 hover:bg-slate-50 transition-all flex flex-col items-center gap-2 group">
              <ShoppingBag className="w-8 h-8 text-brand-navy group-hover:scale-110 transition-transform" />
              <span className="font-bold text-brand-navy">Adicionar Produto</span>
            </Link>
            <Link to="/admin/settings" className="p-6 border border-slate-100 rounded-2xl hover:border-brand-navy/30 hover:bg-slate-50 transition-all flex flex-col items-center gap-2 group">
              <TrendingUp className="w-8 h-8 text-brand-red group-hover:scale-110 transition-transform" />
              <span className="font-bold text-brand-red">Ver Métricas</span>
            </Link>
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="bg-brand-navy p-8 rounded-3xl text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
          <div className="relative z-10">
            <h4 className="font-serif italic text-xl mb-4">Veja como sua loja está agora</h4>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              As alterações feitas no painel são refletidas instantaneamente para seus clientes.
            </p>
          </div>
          <a href="/" target="_blank" className="relative z-10 py-3 bg-white text-brand-navy rounded-xl font-bold flex items-center justify-center gap-2">
            Ver Site em Nova Guia
          </a>
        </div>
      </div>
    </div>
  );
}
