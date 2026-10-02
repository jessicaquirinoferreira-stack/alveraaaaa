import React from 'react';
import { useStore } from '../context/StoreContext';
import { motion } from 'motion/react';

interface OfficialHighlightsProps {
  onOpenAi: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const OfficialHighlights: React.FC<OfficialHighlightsProps> = ({
  onOpenAi,
  onNavigateToTab,
}) => {
  const { settings } = useStore();

  const highlights = [
    {
      id: 'loc',
      title: 'Ateliê & Localização',
      subtitle: 'Uberaba - MG',
      iconUrl: 'https://i.postimg.cc/L60dYGKV/Destaque-Instagram-Virginia-Oliveira-1.png',
      action: () => onNavigateToTab('contact'),
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Oficial',
      subtitle: settings.whatsapp || '(34) 99249-5905',
      iconUrl: 'https://i.postimg.cc/3JbM4z5c/Destaque-Instagram-Virginia-Oliveira-3.png',
      action: () => {
        const cleanPhone = (settings.whatsapp || '34992495905').replace(/\D/g, '');
        window.open(`https://wa.me/55${cleanPhone}?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20as%20velas%20e%20aromas%20da%20Alv%C3%A9ra.`, '_blank');
      },
    },
    {
      id: 'ai',
      title: 'Sommelier IA',
      subtitle: 'Consultoria Olfativa',
      iconUrl: 'https://i.postimg.cc/HsPGcFDK/Destaque-Instagram-Virginia-Oliveira-4.png',
      action: onOpenAi,
      badge: 'Exclusivo',
    },
    {
      id: 'email',
      title: 'Atendimento & E-mail',
      subtitle: settings.email || 'contato@alvera.com.br',
      iconUrl: 'https://i.postimg.cc/DyYVJRkY/Destaque-Instagram-Virginia-Oliveira-2.png',
      action: () => {
        window.location.href = `mailto:${settings.email || 'contato@alvera.com.br'}?subject=Atendimento%20Alvéra`;
      },
    },
  ];

  return (
    <section className="py-8 bg-[#FAF8F5] dark:bg-[#1A1614] border-b border-[#EAE3D9] dark:border-[#2A2421] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-6 sm:gap-12 md:gap-16 overflow-x-auto pb-2 scrollbar-none">
          {highlights.map((item, idx) => (
            <motion.button
              key={item.id}
              onClick={item.action}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center group focus:outline-none min-w-[90px]"
            >
              {/* Highlight Circle Frame */}
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] shadow-md group-hover:shadow-xl transition-shadow duration-300">
                <div className="p-0.5 bg-[#FAF8F5] dark:bg-[#1A1614] rounded-full">
                  <img
                    src={item.iconUrl}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-[#1C1917] text-[#D4AF37] dark:bg-[#D4AF37] dark:text-[#1C1917] text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full border border-[#D4AF37] shadow">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <span className="mt-2.5 text-xs sm:text-sm font-medium text-[#292524] dark:text-[#E7E5E4] group-hover:text-[#C5A059] dark:group-hover:text-[#E6CA65] transition-colors text-center font-serif">
                {item.title}
              </span>
              <span className="text-[10px] sm:text-xs text-[#78716C] dark:text-[#A8A29E] tracking-tight text-center">
                {item.subtitle}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
