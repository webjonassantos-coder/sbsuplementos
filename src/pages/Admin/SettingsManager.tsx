import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { SiteSettings } from '../../types';
import { Save, Globe, Phone, Mail, Share2 } from 'lucide-react';
import { DEFAULT_SETTINGS } from '../../constants';

export function SettingsManager() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const data = await dbService.getSettings();
    if (data) setSettings(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await dbService.saveSettings(settings);
    setSaving(false);
    alert('Configurações salvas com sucesso!');
  };

  if (loading) return <div>Carregando configurações...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl m-0 uppercase tracking-tight">Configurações da Loja</h1>
        <p className="text-slate-400 text-sm italic">Ajuste as informações de contato, redes sociais e textos da loja.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Identidade */}
        <div className="bg-white p-8 rounded-2xl brand-shadow border border-slate-100 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <Globe className="w-5 h-5 text-brand-red" />
            <h3 className="m-0 uppercase tracking-tight">Identidade Visual & Textos</h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Nome da Loja</label>
              <input 
                type="text" 
                value={settings.storeName} 
                onChange={e => setSettings({...settings, storeName: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold text-brand-navy"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Título Principal (Hero)</label>
              <input 
                type="text" 
                value={settings.heroTitle} 
                onChange={e => setSettings({...settings, heroTitle: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Subtítulo (Hero)</label>
              <textarea 
                rows={3}
                value={settings.heroSubtitle} 
                onChange={e => setSettings({...settings, heroSubtitle: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Contato & Redes Sociais */}
        <div className="bg-white p-8 rounded-2xl brand-shadow border border-slate-100 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <Share2 className="w-5 h-5 text-brand-red" />
            <h3 className="m-0 uppercase tracking-tight">Contato e Redes Sociais</h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                <Phone className="w-3 h-3" /> WhatsApp (Somente Números)
              </label>
              <input 
                type="text" 
                value={settings.whatsapp} 
                onChange={e => setSettings({...settings, whatsapp: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm"
                placeholder="5511999999999"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                Instagram (Sua arroba)
              </label>
              <input 
                type="text" 
                value={settings.instagram} 
                onChange={e => setSettings({...settings, instagram: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm"
                placeholder="sbsuplementos"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                <Mail className="w-3 h-3" /> E-mail de Suporte
              </label>
              <input 
                type="email" 
                value={settings.sacEmail} 
                onChange={e => setSettings({...settings, sacEmail: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm"
              />
            </div>
             <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Telefone SAC</label>
              <input 
                type="text" 
                value={settings.sacPhone} 
                onChange={e => setSettings({...settings, sacPhone: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button 
            type="submit" 
            disabled={saving}
            className="px-12 py-4 bg-brand-navy text-white rounded-xl font-black uppercase text-sm tracking-widest flex items-center gap-3 hover:bg-brand-red transition-all active:scale-95 disabled:opacity-50 shadow-xl"
          >
            {saving ? 'Salvando...' : (
              <>
                <Save className="w-5 h-5" />
                Salvar Todas as Configurações
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
