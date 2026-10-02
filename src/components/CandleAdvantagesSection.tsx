import React from 'react';
import { ALVERA_5_ADVANTAGES } from '../data/initialData';
import { Sparkles, Heart, Smile, Flame, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const CandleAdvantagesSection: React.FC = () => {
  const icons = [
    <Sparkles className="w-5 h-5 text-[#C5A059]" />,
    <Flame className="w-5 h-5 text-[#C5A059]" />,
    <Smile className="w-5 h-5 text-[#C5A059]" />,
    <Clock className="w-5 h-5 text-[#C5A059]" />,
    <Heart className="w-5 h-5 text-[#C5A059]" />,
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-gradient-to-b from-[#F5EFEB] to-[#FAF8F5] dark:from-[#211A16] dark:to-[#171311] border border-[#E7DFD5] dark:border-[#2E2824] p-8 sm:p-12 lg:p-14 shadow-sm relative overflow-hidden">
        {/* Glow ambient circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 text-[#8C6D23] dark:text-[#E6CA65] text-xs font-semibold uppercase tracking-widest border border-[#C5A059]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Benefícios Exclusivos</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100">
            5 Vantagens da sua Vela Aromática
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
            Muito além de iluminar, uma vela aromática Alvéra atua em suas emoções, memória e bem-estar sensorial.
          </p>
        </div>

        {/* Advantages Layout with Center Candle Feature */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#251E19]/90 backdrop-blur-sm border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center">
                {icons[0]}
              </span>
              <span className="font-serif text-xs font-bold text-[#C5A059]">01</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              {ALVERA_5_ADVANTAGES[0].title}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {ALVERA_5_ADVANTAGES[0].description}
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#251E19]/90 backdrop-blur-sm border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center">
                {icons[1]}
              </span>
              <span className="font-serif text-xs font-bold text-[#C5A059]">02</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              {ALVERA_5_ADVANTAGES[1].title}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {ALVERA_5_ADVANTAGES[1].description}
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#251E19]/90 backdrop-blur-sm border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center">
                {icons[2]}
              </span>
              <span className="font-serif text-xs font-bold text-[#C5A059]">03</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              {ALVERA_5_ADVANTAGES[2].title}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {ALVERA_5_ADVANTAGES[2].description}
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#251E19]/90 backdrop-blur-sm border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center">
                {icons[3]}
              </span>
              <span className="font-serif text-xs font-bold text-[#C5A059]">04</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              {ALVERA_5_ADVANTAGES[3].title}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {ALVERA_5_ADVANTAGES[3].description}
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-[#251E19]/90 backdrop-blur-sm border border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center">
                {icons[4]}
              </span>
              <span className="font-serif text-xs font-bold text-[#C5A059]">05</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              {ALVERA_5_ADVANTAGES[4].title}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {ALVERA_5_ADVANTAGES[4].description}
            </p>
          </div>

          {/* Interactive Highlight Pillar */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1C1917] to-[#2E241E] text-white shadow-lg space-y-3 flex flex-col justify-between border border-[#D4AF37]/30">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Padrão Alvéra de Qualidade</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-white">
                Sua Saúde em Primeiro Lugar
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Todas as velas são produzidas com cera 100% vegetal e essências sem parabenos, certificadas e em conformidade sanitária.
              </p>
            </div>
            <div className="pt-2 text-[11px] text-[#E6CA65] font-semibold flex items-center gap-1">
              <span>Feitas com alma & afeto</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
