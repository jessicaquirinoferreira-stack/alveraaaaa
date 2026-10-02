import React, { useState } from 'react';
import { ANVISA_REGULATION_INFO } from '../data/initialData';
import { AnvisaRegulationModal } from './AnvisaRegulationModal';
import { ShieldCheck, FileText, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export const AnvisaBanner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-[#FAF6F0] via-[#F4EDE2] to-[#FAF6F0] dark:from-[#231C18] dark:via-[#2D231E] dark:to-[#231C18] border border-[#E4D7C5] dark:border-[#3D3028] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors">
          <div className="space-y-2 max-w-2xl">
            {/* Stamp Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{ANVISA_REGULATION_INFO.stamp}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
              {ANVISA_REGULATION_INFO.title}
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-serif italic">
              {ANVISA_REGULATION_INFO.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-stone-500 dark:text-stone-400 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Ceras 100% Vegetais
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Essências Certificadas IFRA
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pavios sem Chumbo
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Rastreabilidade & Rotulagem Segura
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-[#1C1917] hover:bg-[#C5A059] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] dark:hover:bg-[#D4AF37] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
            >
              <FileText className="w-4 h-4 text-[#D4AF37] group-hover:text-white dark:text-[#8C6D23]" />
              <span>Ver Detalhes da Regulamentação</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <AnvisaRegulationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
