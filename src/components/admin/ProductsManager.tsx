import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { uploadToVercelBlob } from '../../services/blobService';
import {
  Plus,
  Edit2,
  Trash2,
  UploadCloud,
  Check,
  X,
  Sparkles,
  Flame,
  Search,
  Image as ImageIcon,
} from 'lucide-react';

export const ProductsManager: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, showToast } = useStore();

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Product['category']>('velas');
  const [categoryLabel, setCategoryLabel] = useState('Vela Aromática');
  const [price, setPrice] = useState<number>(89.9);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number>(20);
  const [scents, setScents] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [burnTime, setBurnTime] = useState('~40 horas');
  const [weight, setWeight] = useState('210g');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const resetForm = () => {
    setEditingProduct(null);
    setName('');
    setCategory('velas');
    setCategoryLabel('Vela Aromática');
    setPrice(89.9);
    setOriginalPrice(undefined);
    setStock(20);
    setScents('');
    setShortDescription('');
    setDescription('');
    setBurnTime('~40 horas');
    setWeight('210g');
    setImageUrl('');
    setImages([]);
    setFeatured(false);
    setActive(true);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setCategoryLabel(p.categoryLabel || 'Vela Aromática');
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    setStock(p.stock);
    setScents(p.scents);
    setShortDescription(p.shortDescription || '');
    setDescription(p.description || '');
    setBurnTime(p.burnTime || '');
    setWeight(p.weight || '');
    setImages(p.images || []);
    setFeatured(p.featured);
    setActive(p.active);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToVercelBlob(file);
      setImages((prev) => [...prev, url]);
      showToast('Imagem enviada com sucesso para Vercel Blob!', 'success');
    } catch {
      showToast('Erro ao processar imagem', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!imageUrl.trim()) return;
    setImages((prev) => [...prev, imageUrl.trim()]);
    setImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Nome do produto é obrigatório', 'error');
      return;
    }

    const defaultImg =
      images.length > 0
        ? images
        : ['https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80'];

    const payload = {
      name,
      category,
      categoryLabel: categoryLabel || (category === 'velas' ? 'Vela Aromática' : category),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      stock: Number(stock),
      scents,
      shortDescription,
      description,
      burnTime,
      weight,
      images: defaultImg,
      featured,
      active,
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, payload);
    } else {
      await addProduct(payload);
    }

    setIsModalOpen(false);
    resetForm();
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.scents.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Flame className="w-6 h-6 text-[#C5A059]" />
            Catálogo de Produtos & Estoque
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Gerenciamento em tempo real sincronizado com o Firebase Firestore e Vercel Blob.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#C5A059] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Produto</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Buscar no catálogo por nome, aroma ou categoria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-[#1E1916] rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 dark:bg-[#251E19] text-stone-500 uppercase tracking-wider text-[10px] border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="p-3.5">Produto</th>
                <th className="p-3.5">Categoria</th>
                <th className="p-3.5">Preço</th>
                <th className="p-3.5">Estoque</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40 transition-colors">
                  <td className="p-3.5 flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover bg-stone-100 flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-stone-900 dark:text-stone-100 font-serif">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-stone-400 truncate max-w-xs">{p.scents}</div>
                    </div>
                  </td>
                  <td className="p-3.5 uppercase tracking-wider text-[11px] text-stone-600 dark:text-stone-400">
                    {p.categoryLabel || p.category}
                  </td>
                  <td className="p-3.5 font-bold font-serif text-stone-900 dark:text-stone-100">
                    R$ {p.price.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.stock > 10
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : p.stock > 0
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}
                    >
                      {p.stock} un.
                    </span>
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => updateProduct(p.id, { active: !p.active })}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide transition-colors ${
                        p.active
                          ? 'bg-stone-900 text-white dark:bg-white dark:text-black'
                          : 'bg-stone-200 text-stone-500 dark:bg-stone-800 dark:text-stone-400'
                      }`}
                    >
                      {p.active ? 'Ativo na Loja' : 'Inativo (Pausado)'}
                    </button>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-[#C5A059]"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remover "${p.name}" da vitrine?`)) {
                          deleteProduct(p.id);
                        }
                      }}
                      className="p-1.5 text-stone-400 hover:text-red-500"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] dark:bg-[#1A1614] rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b dark:border-stone-800">
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                {editingProduct ? 'Editar Produto' : 'Cadastrar Novo Produto'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-stone-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Nome do Produto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Vela Luar de Bergamota & Âmbar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => {
                      const val = e.target.value as Product['category'];
                      setCategory(val);
                      if (val === 'velas') setCategoryLabel('Vela Aromática');
                      if (val === 'difusores') setCategoryLabel('Difusor de Varetas');
                      if (val === 'home-sprays') setCategoryLabel('Home Spray');
                      if (val === 'acessorios') setCategoryLabel('Acessório');
                      if (val === 'kits') setCategoryLabel('Kit de Presente');
                    }}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none"
                  >
                    <option value="velas">Velas Aromáticas</option>
                    <option value="difusores">Difusores de Varetas</option>
                    <option value="home-sprays">Home Sprays</option>
                    <option value="acessorios">Acessórios</option>
                    <option value="kits">Kits Presente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Etiqueta da Categoria</label>
                  <input
                    type="text"
                    placeholder="Ex: Vela Aromática Edição Ouro"
                    value={categoryLabel}
                    onChange={(e) => setCategoryLabel(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Preço de Venda (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Preço Original / De (Opcional)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 119.90"
                    value={originalPrice || ''}
                    onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Estoque Disponível (un.) *</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Tempo de Queima / Duração</label>
                  <input
                    type="text"
                    placeholder="Ex: ~40 horas"
                    value={burnTime}
                    onChange={(e) => setBurnTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Peso Líquido</label>
                  <input
                    type="text"
                    placeholder="Ex: 210g"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Notas Olfativas Principais</label>
                  <input
                    type="text"
                    placeholder="Ex: Bergamota, Neroli, Chá Branco e Âmbar"
                    value={scents}
                    onChange={(e) => setScents(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Descrição Curta</label>
                  <input
                    type="text"
                    placeholder="Breve resumo sensorial para a vitrine"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Descrição Completa</label>
                  <textarea
                    rows={3}
                    placeholder="Detalhes sobre a matéria prima, essências e rituais de bem-estar..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Image Upload via Vercel Blob & URL */}
              <div className="pt-2 border-t dark:border-stone-800 space-y-2">
                <label className="block text-stone-600 dark:text-stone-400 font-medium">
                  Imagens do Produto (Vercel Blob & URLs)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <label className="cursor-pointer px-4 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-[#C5A059] hover:text-white rounded-xl border border-dashed border-stone-300 dark:border-stone-600 flex items-center justify-center gap-2 transition-colors">
                    <UploadCloud className="w-4 h-4" />
                    <span>{isUploading ? 'Enviando ao Vercel Blob...' : 'Upload Imagem (Vercel Blob)'}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>

                  <div className="flex-1 flex gap-2">
                    <input
                      type="url"
                      placeholder="Ou cole uma URL de imagem..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="flex-1 p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3 py-2 bg-stone-800 text-white rounded-xl"
                    >
                      Inserir
                    </button>
                  </div>
                </div>

                {/* Previews */}
                {images.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pt-2">
                    {images.map((img, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border">
                        <img src={img} alt="preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t dark:border-stone-800 flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span>Destacar na Página Inicial</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span>Visível na Vitrine</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border text-stone-600 hover:bg-stone-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#C5A059] text-white font-semibold"
                >
                  Salvar Produto no Firestore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
