import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, X } from 'lucide-react';

interface FloatingButtonsProps {
  onOpenAi: () => void;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onOpenAi }) => {
  const { settings } = useStore();
  const [showWaTooltip, setShowWaTooltip] = useState(false);
  const [showAiTooltip, setShowAiTooltip] = useState(false);

  const cleanPhone = (settings.whatsapp || '34992495905').replace(/\D/g, '');
  const waUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(
    'Olá Alvéra! Estou no site e gostaria de tirar dúvidas sobre as velas e essências.'
  )}`;

  return (
    <>
      {/* LEFT SIDE: AI ASSISTANT SOMMELIER */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center">
        <div className="relative">
          {/* Tooltip */}
          <AnimatePresence>
            {showAiTooltip && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute left-18 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#1C1917]/95 dark:bg-[#FAF8F5]/95 text-white dark:text-[#1C1917] text-xs px-3.5 py-2 rounded-xl shadow-xl border border-[#D4AF37]/30 backdrop-blur pointer-events-none hidden sm:block"
              >
                <div className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Sommelier IA Alvéra • Qual aroma combina com você?</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={onOpenAi}
            onMouseEnter={() => setShowAiTooltip(true)}
            onMouseLeave={() => setShowAiTooltip(false)}
            aria-label="Abrir Assistente de Aromas IA"
            className="relative p-1 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] shadow-2xl focus:outline-none group"
          >
            <div className="p-0.5 bg-[#FAF8F5] dark:bg-[#1A1614] rounded-full overflow-hidden">
              <img
                src="https://i.postimg.cc/HsPGcFDK/Destaque-Instagram-Virginia-Oliveira-4.png"
                alt="Assistente IA Alvéra"
                className="w-13 h-13 sm:w-15 sm:h-15 rounded-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            {/* Sparkle badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#C5A059] border-2 border-white dark:border-stone-900"></span>
            </span>
          </motion.button>
        </div>
      </div>

      {/* RIGHT SIDE: WHATSAPP BUTTON */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center">
        <div className="relative">
          {/* Tooltip */}
          <AnimatePresence>
            {showWaTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-18 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#1C1917]/95 dark:bg-[#FAF8F5]/95 text-white dark:text-[#1C1917] text-xs px-3.5 py-2 rounded-xl shadow-xl border border-[#D4AF37]/30 backdrop-blur pointer-events-none hidden sm:block"
              >
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                  <span>Atendimento WhatsApp: {settings.whatsapp || '(34) 99249-5905'}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trigger Button */}
          <motion.a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onMouseEnter={() => setShowWaTooltip(true)}
            onMouseLeave={() => setShowWaTooltip(false)}
            aria-label="Falar no WhatsApp oficial da Alvéra"
            className="relative p-1 rounded-full bg-gradient-to-tr from-[#25D366] via-[#A8E6CF] to-[#128C7E] shadow-2xl focus:outline-none group block"
          >
            <div className="p-0.5 bg-[#FAF8F5] dark:bg-[#1A1614] rounded-full overflow-hidden">
              <img
                src="https://i.postimg.cc/3JbM4z5c/Destaque-Instagram-Virginia-Oliveira-3.png"
                alt="WhatsApp Alvéra"
                className="w-13 h-13 sm:w-15 sm:h-15 rounded-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            {/* Online badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366] border-2 border-white dark:border-stone-900"></span>
            </span>
          </motion.a>
        </div>
      </div>
    </>
  );
};
