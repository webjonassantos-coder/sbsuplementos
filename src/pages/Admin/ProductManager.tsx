import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { Product } from '../../types';
import { Plus, Edit2, Trash2, Save, X, Link, Package } from 'lucide-react';
import { DEFAULT_PRODUCTS } from '../../constants';

export function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await dbService.getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id || null);
    setFormData(product);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      await dbService.deleteProduct(id);
      loadProducts();
    }
  };

  const handleSave = async () => {
    await dbService.saveProduct(formData);
    setEditingId(null);
    setIsAdding(false);
    setFormData({});
    loadProducts();
  };

  const handleImportDefaults = async () => {
    if (window.confirm('Deseja importar os 3 kits padrão do Artro Balance?')) {
      for (const p of DEFAULT_PRODUCTS) {
        await dbService.saveProduct(p);
      }
      loadProducts();
    }
  };

  if (loading) return <div className="animate-pulse flex space-y-4 flex-col">Carregando produtos...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif m-0">Gerenciar Vitrine</h1>
          <p className="text-slate-400 text-sm">Adicione, edite ou remova produtos da sua loja.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleImportDefaults}
            className="flex items-center gap-2 px-4 py-2 border border-brand-navy/20 text-brand-navy rounded-xl text-sm font-medium hover:bg-slate-50 transition-all"
          >
            <Package className="w-4 h-4" />
            Importar Padrão
          </button>
          <button 
            onClick={() => { setIsAdding(true); setFormData({}); setEditingId(null); }}
            className="flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-all"
          >
            <Plus className="w-4 h-4" />
            Novo Produto
          </button>
        </div>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white p-8 rounded-3xl clinical-shadow border border-slate-100 space-y-6">
          <h3 className="text-lg font-serif m-0">{editingId ? 'Editar Produto' : 'Novo Produto'}</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4 col-span-2">
               <label className="block text-xs font-bold text-slate-400 uppercase">Nome do Produto</label>
               <input 
                type="text" 
                value={formData.name || ''} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm"
                placeholder="Ex: Kit 03 Potes"
               />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase">Preço Atual (R$)</label>
               <input 
                type="number" 
                value={formData.price || ''} 
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm"
               />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase">Preço Original (R$)</label>
               <input 
                type="number" 
                value={formData.originalPrice || ''} 
                onChange={e => setFormData({...formData, originalPrice: Number(e.target.value)})}
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm"
               />
            </div>
            <div className="col-span-2">
               <label className="block text-xs font-bold text-slate-400 uppercase">URL da Imagem (Externa)</label>
               <div className="flex gap-2">
                 <div className="bg-slate-50 p-4 rounded-xl text-slate-400"><Link className="w-4 h-4" /></div>
                 <input 
                  type="text" 
                  value={formData.imageUrl || ''} 
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm"
                  placeholder="https://..."
                 />
               </div>
            </div>
            <div className="col-span-2">
               <label className="block text-xs font-bold text-slate-400 uppercase">Descrição Curta</label>
               <input 
                type="text" 
                value={formData.description || ''} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm"
                placeholder="Ex: Tratamento para 1 mês"
               />
            </div>
            <div className="col-span-2">
               <label className="block text-xs font-bold text-slate-400 uppercase">Mensagem do WhatsApp (URL Encoded)</label>
               <textarea 
                rows={2}
                value={formData.whatsappText || ''} 
                onChange={e => setFormData({...formData, whatsappText: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm"
                placeholder="Olá! Quero este produto..."
               />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-6 py-2 text-slate-400 font-medium">Cancelar</button>
            <button onClick={handleSave} className="px-8 py-2 bg-brand-navy text-white rounded-xl font-bold flex items-center gap-2">
              <Save className="w-4 h-4" />
              Salvar Alterações
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl clinical-shadow border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="p-6">Produto</th>
              <th className="p-6">Preço</th>
              <th className="p-6">Tipo</th>
              <th className="p-6">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <img src={product.imageUrl} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                    <div>
                      <div className="font-bold text-brand-navy">{product.name}</div>
                      <div className="text-xs text-slate-400">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="font-bold text-brand-navy">R$ {product.price.toFixed(2)}</div>
                  {product.originalPrice && <div className="text-xs text-slate-300 line-through">R$ {product.originalPrice.toFixed(2)}</div>}
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.isKit ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {product.isKit ? 'KIT' : 'INDIVIDUAL'}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(product)} className="p-2 text-slate-400 hover:text-brand-navy hover:bg-slate-100 rounded-lg transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(product.id!)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="p-20 text-center text-slate-400 italic">
            Nenhum produto cadastrado. Importe os padrões ou crie um novo.
          </div>
        )}
      </div>
    </div>
  );
}
