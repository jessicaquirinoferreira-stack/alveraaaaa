import React from 'react';
import { ANVISA_REGULATION_INFO } from '../data/initialData';
import { X, ShieldCheck, CheckCircle2, Sparkles, AlertCircle, FileText, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnvisaRegulationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnvisaRegulationModal: React.FC<AnvisaRegulationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl rounded-3xl bg-[#FAF8F5] dark:bg-[#1C1714] border border-[#E7DFD5] dark:border-[#2E2824] shadow-2xl p-6 sm:p-8 space-y-6 text-[#1C1917] dark:text-[#FAF8F5]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Stamp */}
          <div className="space-y-2 text-center sm:text-left pr-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{ANVISA_REGULATION_INFO.stamp}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {ANVISA_REGULATION_INFO.title}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-serif italic">
              {ANVISA_REGULATION_INFO.subtitle}
            </p>
          </div>

          {/* Core Summary Callout */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-950 dark:text-amber-200 leading-relaxed space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-[#C5A059]">
              <Sparkles className="w-4 h-4" />
              <span>O que é o Marco Sanitário para Velas Artesanais?</span>
            </div>
            <p>
              {ANVISA_REGULATION_INFO.summary}
            </p>
          </div>

          {/* Pillars of Regulation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Critérios Obrigatórios e Padrões de Conformidade:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {ANVISA_REGULATION_INFO.pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-white dark:bg-[#251F1B] border border-stone-200 dark:border-stone-800 space-y-1"
                >
                  <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center text-[10px] font-serif">
                      {i + 1}
                    </span>
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed pl-6">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Statement */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
            <strong className="block font-serif text-sm">Garantia Alvéra aos Nossos Clientes:</strong>
            <p className="text-[11px] leading-relaxed">
              {ANVISA_REGULATION_INFO.impact}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t dark:border-stone-800 text-xs">
            <span className="text-stone-400 text-[11px] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
              Ateliê Alvéra • Boa Vista, Uberaba - MG
            </span>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#C5A059] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] dark:hover:bg-[#D4AF37] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Compreendi
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
