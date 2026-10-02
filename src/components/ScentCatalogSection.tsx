import React, { useState } from 'react';
import { ALVERA_SCENT_CATALOG } from '../data/initialData';
import { useStore } from '../context/StoreContext';
import { Search, Sparkles, MessageCircle, ShieldCheck, Award, ThumbsUp, Flame, Check } from 'lucide-react';

interface ScentCatalogSectionProps {
  onSelectScent?: (scentName: string) => void;
  selectedScentName?: string;
  isCompact?: boolean;
}

export const ScentCatalogSection: React.FC<ScentCatalogSectionProps> = ({
  onSelectScent,
  selectedScentName,
  isCompact = false,
}) => {
  const { settings } = useStore();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const cleanShopPhone = (settings.whatsapp || '34992495905').replace(/\D/g, '');

  const categories = [
    { id: 'todos', label: 'Todas as Essências' },
    { id: 'citricos', label: 'Cítricos & Frescos' },
    { id: 'florais', label: 'Florais Nobres' },
    { id: 'frutais', label: 'Frutais & Tropicais' },
    { id: 'gourmand', label: 'Gourmand & Doces' },
    { id: 'amadeirados', label: 'Amadeirados & Especiarias' },
    { id: 'herbais', label: 'Herbais & Terapêuticos' },
  ];

  const filteredScents = ALVERA_SCENT_CATALOG.filter((s) => {
    const matchCat = activeCategory === 'todos' || s.category === activeCategory;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.categoryLabel.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className={`rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm ${isCompact ? 'p-5 sm:p-6' : 'p-8 sm:p-12'} space-y-8`}>
      {/* Header matching Foto 1 */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#C5A059]" /> Catálogo Oficial de Aromas
        </span>

        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100 uppercase">
          Essência para Velas Aromáticas
        </h2>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#8C6D23] dark:text-[#E6CA65] text-xs font-bold tracking-widest uppercase border border-[#D4AF37]/30">
          <span>ESCOLHA DAS ESSÊNCIAS NO CHAT</span>
        </div>

        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
          São mais de 70 fragrâncias de perfumaria fina botânica com alta fixação. Selecione sua favorita ou combine notas exclusivas diretamente com nossa equipe.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Buscar por essência (ex: Baunilha, Alecrim, Cerejeira, Bergamota)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-[#1C1917] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Scents */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 max-h-[460px] overflow-y-auto p-1 border rounded-2xl border-stone-100 dark:border-stone-800/80">
        {filteredScents.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-stone-400">
            Nenhuma essência encontrada com o nome "{search}".
          </div>
        ) : (
          filteredScents.map((scent) => {
            const isSelected = selectedScentName === scent.name;
            return (
              <div
                key={scent.id}
                onClick={() => onSelectScent && onSelectScent(scent.name)}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  onSelectScent ? 'cursor-pointer hover:border-[#C5A059]' : ''
                } ${
                  isSelected
                    ? 'border-[#C5A059] bg-[#C5A059]/10 shadow-sm'
                    : 'border-stone-200/70 dark:border-stone-800 bg-white/60 dark:bg-[#251E19]/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#C5A059] truncate">
                      {scent.categoryLabel}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />}
                  </div>
                  <h4 className="font-serif text-xs font-bold text-stone-900 dark:text-stone-100">
                    {scent.name}
                  </h4>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-tight">
                    {scent.description}
                  </p>
                </div>

                <div className="mt-2 pt-1 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center text-[9px] text-stone-400">
                  <span>Alvéra Essências</span>
                  <Flame className="w-2.5 h-2.5 text-[#C5A059]" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Badges footer matching Foto 1 exactly */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-[#EDE5DA] dark:border-[#2C241F]">
        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#251E19] border border-stone-200/60 dark:border-stone-800 text-center space-y-1">
          <Award className="w-5 h-5 mx-auto text-[#C5A059]" />
          <span className="font-bold text-[11px] block uppercase text-stone-800 dark:text-stone-200">
            Máxima Fixação & Durabilidade
          </span>
          <span className="text-[10px] text-stone-500 block leading-tight">
            Exalação intensa e duradoura no ambiente
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#251E19] border border-stone-200/60 dark:border-stone-800 text-center space-y-1">
          <ShieldCheck className="w-5 h-5 mx-auto text-emerald-600" />
          <span className="font-bold text-[11px] block uppercase text-stone-800 dark:text-stone-200">
            Seguras para sua Produção
          </span>
          <span className="text-[10px] text-stone-500 block leading-tight">
            Sem ftalatos, parabenos e 100% vegetais
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#251E19] border border-stone-200/60 dark:border-stone-800 text-center space-y-1">
          <Sparkles className="w-5 h-5 mx-auto text-[#C5A059]" />
          <span className="font-bold text-[11px] block uppercase text-stone-800 dark:text-stone-200">
            Qualidade que seu Produto Merece
          </span>
          <span className="text-[10px] text-stone-500 block leading-tight">
            Perfumaria fina de padrão internacional
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#251E19] border border-stone-200/60 dark:border-stone-800 text-center space-y-1">
          <ThumbsUp className="w-5 h-5 mx-auto text-amber-500" />
          <span className="font-bold text-[11px] block uppercase text-stone-800 dark:text-stone-200">
            Satisfação Garantida
          </span>
          <span className="text-[10px] text-stone-500 block leading-tight">
            Atendimento acolhedor e suporte dedicado
          </span>
        </div>
      </div>

      {/* Direct WhatsApp Action matching "ESCOLHA DAS ESSÊNCIAS NO CHAT" */}
      <div className="text-center pt-2">
        <a
          href={`https://wa.me/55${cleanShopPhone}?text=${encodeURIComponent(
            'Olá Alvéra! Estou no site vendo o catálogo de essências para velas aromáticas e gostaria de tirar dúvidas e escolher minhas essências pelo chat do WhatsApp!'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#1fa952] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Fazer Escolha das Essências pelo Chat do WhatsApp ({settings.whatsapp || '(34) 99249-5905'})</span>
        </a>
      </div>
    </section>
  );
};
