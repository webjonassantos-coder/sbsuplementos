import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Settings, LogOut, ExternalLink } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-navy text-white flex flex-col border-r-4 border-brand-red">
        <div className="p-6 border-b border-white/10 flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-white rounded-full p-2 shadow-xl">
             <img 
               src="https://i.postimg.cc/y8tch66x/Chat-GPT-Image-19-de-mai-de-2026-12-18-12.png" 
               alt="Logo" 
               className="w-full h-full object-contain"
             />
          </div>
          <h1 className="text-sm font-black text-white uppercase tracking-widest text-center">SB Suplementos Panel</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5'}`}
          >
            <ShoppingBag className="w-5 h-5" />
            Produtos
          </NavLink>
          <NavLink 
            to="/admin/settings" 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5'}`}
          >
            <Settings className="w-5 h-5" />
            Configurações
          </NavLink>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <a 
            href="/" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 transition-all text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Ver Loja
          </a>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all text-sm font-bold"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-slate-800 font-sans text-sm font-medium">Painel Administrativo</h2>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400">{auth.currentUser?.email}</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center p-1">
               <img 
                 src="https://i.postimg.cc/y8tch66x/Chat-GPT-Image-19-de-mai-de-2026-12-18-12.png" 
                 alt="Avatar" 
                 className="w-full h-full object-contain"
               />
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
