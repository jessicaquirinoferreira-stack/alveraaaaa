import React from 'react';
import { ALVERA_CANDLE_CARE } from '../data/initialData';
import { Flame, Clock, Scissors, ShieldAlert, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const CandleCareSection: React.FC = () => {
  const ruleIcons = [
    <Flame className="w-5 h-5 text-[#C5A059]" />,
    <Scissors className="w-5 h-5 text-[#C5A059]" />,
    <Clock className="w-5 h-5 text-[#C5A059]" />,
    <ShieldAlert className="w-5 h-5 text-[#C5A059]" />,
    <Heart className="w-5 h-5 text-[#C5A059]" />,
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-[#171412] text-white p-8 sm:p-12 lg:p-14 border border-[#C5A059]/30 shadow-2xl relative overflow-hidden">
        {/* Subtle candlelight backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E6CA65] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Ritual de Cuidado</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF8F5]">
            {ALVERA_CANDLE_CARE.title}
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
            {ALVERA_CANDLE_CARE.intro}
          </p>
        </div>

        {/* 5 Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
          {ALVERA_CANDLE_CARE.rules.map((rule, idx) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-sm transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {ruleIcons[idx]}
                </span>
                <span className="font-serif text-xs font-bold text-[#D4AF37]">
                  Passo 0{rule.id}
                </span>
              </div>

              <h3 className="font-serif text-base font-bold text-white group-hover:text-[#E6CA65] transition-colors">
                {rule.rule}
              </h3>

              <p className="text-xs text-stone-300 leading-relaxed">
                {rule.detail}
              </p>
            </motion.div>
          ))}

          {/* Emotional closing card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2A221C] to-[#1E1916] border border-[#D4AF37]/40 flex flex-col justify-center text-center space-y-3">
            <span className="text-2xl">🕯️</span>
            <p className="font-serif text-sm italic text-[#FAF8F5] leading-relaxed">
              "{ALVERA_CANDLE_CARE.footer}"
            </p>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
              Ateliê Alvéra • Bem-Estar
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
