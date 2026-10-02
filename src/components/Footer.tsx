import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AnvisaRegulationModal } from './AnvisaRegulationModal';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Lock,
  Heart,
  ShieldCheck,
  CreditCard,
  Truck,
  Sparkles,
  FileCheck,
} from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onNavigateToTab }) => {
  const { settings } = useStore();
  const [isAnvisaOpen, setIsAnvisaOpen] = useState(false);

  const cleanPhone = (settings.whatsapp || '34992495905').replace(/\D/g, '');

  return (
    <footer className="bg-[#171412] text-[#E7E5E4] pt-16 pb-12 border-t border-[#2C241F] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2C241F]">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.postimg.cc/Nf2pLJ1Z/Chat-GPT-Image-30-de-set-de-2026-07-54-12.png"
                alt="Alvéra Logo"
                className="h-14 w-auto object-contain filter drop-shadow brightness-110"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-widest text-[#FAF8F5] block">
                  ALVÉRA
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                  Velas • Aromas • Bem-Estar
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Velas aromáticas e fragrâncias botânicas derramadas artesanalmente à mão com ceras 100% vegetais e essências nobres de perfumaria fina.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {settings.instagramActive && settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#241F1C] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#171412] transition-colors"
                  aria-label="Instagram da Alvéra"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.facebookActive && settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#241F1C] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#171412] transition-colors"
                  aria-label="Facebook da Alvéra"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              <a
                href={`https://wa.me/55${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#241F1C] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                aria-label="WhatsApp da Alvéra"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#D4AF37]">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateToTab('home')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('products')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Todas as Coleções & Velas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('scents')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Guia Olfativo & Sensações
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('about')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Nossa História & Ateliê
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('contact')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Ateliê & Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Contact & Address */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#D4AF37]">
              Ateliê & Contato
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a
                  href={`https://wa.me/55${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp: {settings.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="text-[11px] text-stone-500 pt-1">
                Atendimento: {settings.openingHours}
              </div>
            </div>
          </div>

          {/* Col 4: Safe Checkout & Freight */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#D4AF37]">
              Segurança & Logística
            </h4>
            <p className="text-xs text-stone-400">
              Pagamentos seguros processados via InfinitePay (Pix Instantâneo e Cartão em até 12x).
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Checkout 100% Protegido</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>Envios Rápidos: Correios & Jadlog</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAnvisaOpen(true)}
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-left pt-1 cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-[11px] underline">
                  ANVISA: Velas Artesanais Regulamentadas (30.09.2026)
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Discrete Admin Link in Center (Prompt Requirement 6) */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 border-b border-[#2C241F] gap-4">
          <div className="text-center sm:text-left text-[11px]">
            © {new Date().getFullYear()} Alvéra – Velas • Aromas • Bem-Estar. Todos os direitos reservados.
          </div>

          {/* Prompt requirement: No rodapé, no centro, colocar um link discreto “Área Admin” */}
          <div className="flex items-center justify-center">
            <button
              onClick={onOpenAdmin}
              className="text-stone-500 hover:text-[#D4AF37] text-[11px] font-medium flex items-center gap-1.5 transition-colors group cursor-pointer py-1 px-3 rounded-full hover:bg-white/5"
            >
              <Lock className="w-3 h-3 text-stone-500 group-hover:text-[#D4AF37] transition-colors" />
              <span>Área Admin</span>
            </button>
          </div>

          <div className="text-center sm:text-right text-[11px] text-stone-500 flex items-center justify-center gap-1">
            <span>Feito com</span>
            <Heart className="w-3 h-3 text-amber-600 fill-amber-600 inline" />
            <span>em Uberaba - MG</span>
          </div>
        </div>
      </div>

      <AnvisaRegulationModal
        isOpen={isAnvisaOpen}
        onClose={() => setIsAnvisaOpen(false)}
      />
    </footer>
  );
};
