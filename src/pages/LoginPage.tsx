import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Lock, Mail, ArrowRight, Settings } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('sbsuplementos@x.com');
  const [password, setPassword] = useState('sbsuplementos');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInit, setShowInit] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      setError('Falha no login. Verifique se o usuário existe e o provedor Email/Senha está ativado.');
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setShowInit(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInitialize = async () => {
    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      // Add to admins collection for security rules
      await setDoc(doc(db, 'admins', credential.user.uid), {
        email: email,
        createdAt: new Date().toISOString()
      });
      alert('Administrador criado com sucesso! Agora você pode gerenciar a loja.');
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      setError('Erro ao inicializar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-clinical-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden brand-shadow border border-slate-100">
        <div className="bg-brand-navy p-10 text-center border-b-4 border-brand-red">
          <h1 className="text-3xl font-black text-white m-0 uppercase tracking-tighter">SB Admin</h1>
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-2">Advanced Health Panel</p>
        </div>
        
        <div className="p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Acesso Restrito</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-4 pl-12 pr-4 focus:ring-0 focus:border-brand-navy transition-all text-sm"
                  placeholder="admin@exemplo.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-4 pl-12 pr-4 focus:ring-0 focus:border-brand-navy transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-brand-red text-[10px] font-bold p-4 rounded-xl border border-red-100 italic uppercase">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-navy text-white rounded-xl py-4 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-brand-red transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-brand-navy/20"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar no Painel
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {showInit && (
              <button
                type="button"
                onClick={handleInitialize}
                className="w-full bg-white text-brand-navy border-2 border-brand-navy rounded-xl py-4 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all mt-4"
              >
                <Settings className="w-5 h-5" />
                Setup Inicial
              </button>
            )}
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-center text-xs text-slate-400 italic">
              Se este é seu primeiro acesso, certifique-se de configurar o Firebase corretamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
