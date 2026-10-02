import React from 'react';
import { ALVERA_MINIMALIST_QUOTE } from '../data/initialData';
import { motion } from 'motion/react';

export const MinimalistQuoteSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <span className="text-xs sm:text-sm tracking-[0.35em] text-[#C5A059] uppercase font-serif font-light block">
          {ALVERA_MINIMALIST_QUOTE.tag}
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-[0.06em] text-stone-900 dark:text-stone-100 max-w-4xl mx-auto leading-[1.25] uppercase">
          {ALVERA_MINIMALIST_QUOTE.quote}
        </h2>

        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
        </div>
      </motion.div>
    </section>
  );
};
