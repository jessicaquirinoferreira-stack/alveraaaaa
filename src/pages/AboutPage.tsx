import React from 'react';
import { MinimalistQuoteSection } from '../components/MinimalistQuoteSection';
import { AnvisaBanner } from '../components/AnvisaBanner';
import { Flame, Sparkles, Heart, Leaf, MapPin, Award } from 'lucide-react';

interface AboutPageProps {
  onNavigateToTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToTab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero / Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
          Nossa Alma & Origem
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] dark:text-[#FAF8F5]">
          A História da Alvéra
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
          Nascida em Uberaba - Minas Gerais, a Alvéra nasceu do anseio de transformar casas em santuários de luz e bem-estar.
        </p>
      </div>

      {/* Main Story & Image Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800">
          <img
            src="https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=1200&q=80"
            alt="Produção artesanal Alvéra"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-[#1C1917]/85 text-white backdrop-blur-md px-4 py-2 rounded-2xl text-xs flex items-center gap-2 border border-white/20">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>Ateliê Alvéra • Uberaba - MG</span>
          </div>
        </div>

        <div className="space-y-6 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            Mais do que velas, rituais diários de desaceleração.
          </h2>

          <p>
            Em um mundo acelerado e hiperconectado, acreditamos no poder sagrado de acender uma chama, respirar fundo e retornar ao momento presente. A Alvéra nasceu com essa vocação: criar pontes entre a perfumaria fina botânica e o bem-estar genuíno.
          </p>

          <p>
            Cada vela é derramada à mão, em pequenos lotes numerados, utilizando um blend artesanal de ceras 100% vegetais (coco, palma e soja). Rejeitamos veementemente o uso de parafinas derivadas do petróleo, corantes sintéticos ou pavios com metais pesados.
          </p>

          <p>
            Nossas fragrâncias são desenhadas em harmonia com perfumistas de prestígio, buscando notas complexas que evoluem no ambiente com sutileza, elegância e longevidade.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigateToTab('products')}
              className="px-6 py-3 rounded-full bg-[#1C1917] hover:bg-[#C5A059] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] font-semibold text-xs uppercase tracking-wider transition-all shadow cursor-pointer"
            >
              Conhecer os Aromas
            </button>
            <button
              onClick={() => onNavigateToTab('contact')}
              className="px-6 py-3 rounded-full border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-[#C5A059] font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Visitar o Ateliê
            </button>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E1916] border border-stone-200 dark:border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
            <Leaf className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
            Sustentabilidade Nobre
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Ingredientes de origem renovável, embalagens em vidro reutilizável e descarte responsável.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E1916] border border-stone-200 dark:border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
            Perfumaria Exclusiva
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Acordes olfativos originais com alta performance de dispersão sem agressão aos sentidos.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1E1916] border border-stone-200 dark:border-stone-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
            Feito com Alma
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Cada etiqueta, cada fita e cada frasco carregam o calor e a dedicação das mãos que os criaram.
          </p>
        </div>
      </div>

      {/* Frase Marcante Editorial (Foto 3) */}
      <MinimalistQuoteSection />

      {/* Regulamentação e Conformidade ANVISA (Foto 4) */}
      <AnvisaBanner />
    </div>
  );
};
