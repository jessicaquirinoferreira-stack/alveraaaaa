import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, Flame, Sparkles } from 'lucide-react';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onSelectProduct,
  searchQuery,
  setSearchQuery,
  onNavigateToTab,
}) => {
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<string>('destaque');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const categories = [
    { id: 'todos', label: 'Todos os Produtos' },
    { id: 'personalizadas', label: '✦ Velas Personalizadas' },
    { id: 'velas', label: 'Velas Aromáticas' },
    { id: 'difusores', label: 'Difusores de Varetas' },
    { id: 'home-sprays', label: 'Home Sprays' },
    { id: 'acessorios', label: 'Acessórios de Queima' },
    { id: 'kits', label: 'Kits & Presentes' },
  ];

  // Filtering
  const filtered = products.filter((p) => {
    if (!p.active) return false;
    const matchCat = selectedCategory === 'todos' || p.category === selectedCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scents.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchStock = !onlyInStock || p.stock > 0;
    return matchCat && matchSearch && matchStock;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'menor-preco') return a.price - b.price;
    if (sortBy === 'maior-preco') return b.price - a.price;
    if (sortBy === 'nome') return a.name.localeCompare(b.name);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title & Description */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
          Catálogo Alvéra
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] dark:text-[#FAF8F5]">
          A Coleção Sensorial
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
          Ceras puras vegetais, pavios de algodão e essências nobres de perfumaria fina para transformar o seu espaço.
        </p>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#1C1917] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] shadow-md'
                : 'bg-white dark:bg-[#1E1916] text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:border-[#C5A059]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Special Banner for Custom Candles when category is 'personalizadas' or 'todos' */}
      {selectedCategory === 'personalizadas' && onNavigateToTab && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1C1917] via-[#2A221C] to-[#1C1917] border border-[#C5A059]/40 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <span className="text-[10px] uppercase font-bold text-[#E6CA65] tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> Ateliê Sob Medida para Eventos
            </span>
            <h3 className="font-serif text-lg font-bold text-[#FAF8F5]">
              Configure seu lote de Velas Personalizadas passo a passo
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Escolha recipiente, aroma exclusivo, tampa, rótulo com monograma/nomes, calcule o frete em tempo real e feche os detalhes e o valor com desconto direto no WhatsApp!
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('custom')}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span>Abrir Personalizador Completo</span>
            <Sparkles className="w-4 h-4 text-stone-950" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#1E1916] border border-stone-200 dark:border-stone-800 shadow-sm text-xs">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Buscar por aroma, vela ou nota..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-stone-600 dark:text-stone-400 select-none">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="accent-[#C5A059]"
            />
            <span>Apenas com estoque</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-stone-400 hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none font-medium"
            >
              <option value="destaque">Destaques</option>
              <option value="menor-preco">Menor Preço</option>
              <option value="maior-preco">Maior Preço</option>
              <option value="nome">Nome A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {sorted.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#1E1916] rounded-3xl border border-dashed border-stone-200 dark:border-stone-800">
          <Flame className="w-12 h-12 mx-auto text-[#C5A059] opacity-60 mb-3" />
          <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200">
            Nenhum produto encontrado
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Tente buscar por outro termo ou selecione outra categoria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('todos');
              setSearchQuery('');
              setOnlyInStock(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#1C1917] text-white text-xs font-semibold"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
          ))}
        </div>
      )}
    </div>
  );
};
