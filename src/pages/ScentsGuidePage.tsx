import React from 'react';
import { ScentCatalogSection } from '../components/ScentCatalogSection';
import { CandleCareSection } from '../components/CandleCareSection';
import { AnvisaBanner } from '../components/AnvisaBanner';
import { Sparkles, Flame, Moon, Compass, Wind, Scissors, ShieldAlert, Bot } from 'lucide-react';

interface ScentsGuidePageProps {
  onOpenAi: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const ScentsGuidePage: React.FC<ScentsGuidePageProps> = ({ onOpenAi, onNavigateToTab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
          Alquimia Botânica
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] dark:text-[#FAF8F5]">
          Guia Olfativo & Ritual do Bem-Estar
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
          Compreenda como as notas olfativas dialogam com seu sistema límbico para despertar sensações profundas de serenidade, aconchego e foco.
        </p>
      </div>

      {/* Olfactory Families Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1. Cítricos e Solares */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                Cítricos & Solares
              </h3>
              <span className="text-xs text-[#C5A059] font-medium">Energia, Alegria & Vitalidade</span>
            </div>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            As notas de bergamota da Calábria, limão siciliano e néroli dissipam a névoa mental e renovam a energia da casa. Ideais para as manhãs ensolaradas e para receber amigos na sala de estar.
          </p>
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#251E19] text-xs">
            <strong className="text-stone-800 dark:text-stone-200">Exemplo Alvéra: </strong>
            <span className="text-stone-600 dark:text-stone-400">Luar de Bergamota & Âmbar Dourado</span>
          </div>
        </div>

        {/* 2. Florais & Aconchegantes */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                Florais Nobres & Baunilhas
              </h3>
              <span className="text-xs text-[#C5A059] font-medium">Doçura, Amor-Próprio & Conforto</span>
            </div>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Pétalas de flor de cerejeira, jasmim e a nobreza aveludada da baunilha bourbon criam um abraço olfativo. Perfeito para momentos de autocuidado, leitura e intimidade.
          </p>
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#251E19] text-xs">
            <strong className="text-stone-800 dark:text-stone-200">Exemplo Alvéra: </strong>
            <span className="text-stone-600 dark:text-stone-400">Flor de Cerejeira & Baunilha Bourbon</span>
          </div>
        </div>

        {/* 3. Herbais & Aromaterapêuticos */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                Herbais & Terapêuticos
              </h3>
              <span className="text-xs text-[#C5A059] font-medium">Alívio do Estresse & Sono Reparador</span>
            </div>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            A lavanda verdadeira de Grasse e o alecrim fresco atuam na redução dos batimentos cardíacos e na indução de ondas alfa cerebrais. Ideal para o quarto e o banho relaxante.
          </p>
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#251E19] text-xs">
            <strong className="text-stone-800 dark:text-stone-200">Exemplo Alvéra: </strong>
            <span className="text-stone-600 dark:text-stone-400">Lavanda Francesa & Alecrim do Campo</span>
          </div>
        </div>

        {/* 4. Amadeirados & Especiarias */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                Amadeirados Nobres
              </h3>
              <span className="text-xs text-[#C5A059] font-medium">Poder, Sofisticação & Foco</span>
            </div>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Cedro do Atlas, sândalo cremoso e cardamomo negro conferem uma aura imponente e meditativa. Uma assinatura olfativa marcante para escritórios e halls refinados.
          </p>
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#251E19] text-xs">
            <strong className="text-stone-800 dark:text-stone-200">Exemplo Alvéra: </strong>
            <span className="text-stone-600 dark:text-stone-400">Cedro Nobre & Cardamomo Negro</span>
          </div>
        </div>
      </div>

      {/* CATÁLOGO COMPLETO DE ESSÊNCIAS (Foto 1: ESCOLHA DAS ESSÊNCIAS NO CHAT) */}
      <ScentCatalogSection />

      {/* REGULAMENTAÇÃO ANVISA (Foto 4) */}
      <AnvisaBanner />

      {/* RITUAL DE CUIDADOS: O QUE SUA VELA QUER QUE VOCÊ LEIA (Foto 5) */}
      <CandleCareSection />

      {/* AI Sommelier Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1C1917] to-[#332A24] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#D4AF37]/30">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5 justify-center sm:justify-start">
            <Bot className="w-4 h-4" /> Consultoria Personalizada
          </span>
          <h3 className="font-serif text-2xl font-bold">
            Ainda em dúvida sobre qual aroma escolher?
          </h3>
          <p className="text-xs text-stone-300 max-w-md">
            Nossa Concierge de IA está pronta para analisar seu ambiente, momento ou ocasião de presente.
          </p>
        </div>

        <button
          onClick={onOpenAi}
          className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#171412] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Conversar com a Sommelier IA</span>
        </button>
      </div>
    </div>
  );
};
