import React from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { OfficialHighlights } from '../components/OfficialHighlights';
import { ProductCard } from '../components/ProductCard';
import { MinimalistQuoteSection } from '../components/MinimalistQuoteSection';
import { CandleAdvantagesSection } from '../components/CandleAdvantagesSection';
import { AnvisaBanner } from '../components/AnvisaBanner';
import { CandleCareSection } from '../components/CandleCareSection';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Leaf,
  ShieldCheck,
  Star,
  Send,
  Heart,
  Moon,
  Zap,
  Coffee,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToTab: (tab: string) => void;
  onOpenAi: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onNavigateToTab,
  onOpenAi,
}) => {
  const { settings, products, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = React.useState('');

  const featuredProducts = products.filter((p) => p.featured && p.active).slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showToast('Por favor, informe um e-mail válido', 'error');
      return;
    }
    showToast('Cupom BEMVINDO10 ativado com sucesso! Aproveite 10% OFF.', 'success');
    setNewsletterEmail('');
  };

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#171412] text-[#FAF8F5]">
        {/* Background Image with Warm Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=2000&q=85"
            alt="Alvéra Vela Aromática Luxo"
            className="w-full h-full object-cover object-center filter brightness-[0.45] scale-105 animate-pulse duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171412] via-transparent to-[#171412]/80" />
          <div className="absolute inset-0 bg-radial from-transparent to-[#171412]/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Subtle Logo Brandmark */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="h-[1px] w-12 bg-[#D4AF37]/60"></span>
            <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#D4AF37] font-medium">
              Velas • Aromas • Bem-Estar
            </span>
            <span className="h-[1px] w-12 bg-[#D4AF37]/60"></span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAF8F5] leading-[1.15]"
          >
            {settings.heroTitle || 'A Arte da Calma em Chamas e Essências Nobres'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-sm sm:text-base md:text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {settings.heroSubtitle ||
              'Velas artesanais derramadas à mão em ceras vegetais puras, com perfumaria fina botânica que transforma o seu lar em um santuário de bem-estar.'}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => onNavigateToTab('products')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#171412] hover:brightness-110 font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explorar Coleção Completa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenAi}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F5] border border-white/25 backdrop-blur-md font-semibold text-xs uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Consultar Sommelier IA</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. MINIMALIST EDITORIAL QUOTE (Foto 3) */}
      <MinimalistQuoteSection />

      {/* 3. OFFICIAL HIGHLIGHTS (Circular story highlights with required assets) */}
      <OfficialHighlights
        onOpenAi={onOpenAi}
        onNavigateToTab={onNavigateToTab}
      />

      {/* 4. FEATURED PRODUCTS (Destaques da Coleção) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Coleção Exclusiva
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#FAF8F5]">
              Destaques Selecionados
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-lg">
              Nossas criações mais amadas, com blends exclusivos de perfumaria fina e ceras puras.
            </p>
          </div>

          <button
            onClick={() => onNavigateToTab('products')}
            className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-wider text-[#C5A059] hover:underline flex items-center gap-1 group cursor-pointer"
          >
            <span>Ver Toda a Vitrine</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
          ))}
        </div>
      </section>

      {/* 5. 5 VANTAGENS DA SUA VELA AROMÁTICA (Foto 2) */}
      <CandleAdvantagesSection />

      {/* CUSTOM CANDLES SHOWCASE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171412] via-[#241E1A] to-[#171412] text-white p-8 sm:p-12 lg:p-14 border border-[#D4AF37]/35 shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=80"
              alt="Velas personalizadas"
              className="w-full h-full object-cover filter brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#171412]" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E6CA65] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Personalização Sob Medida</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#FAF8F5] leading-tight">
              Velas Personalizadas para Eventos & Lembranças
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Escolha o recipiente, a gramatura, a essência nobre, o acabamento do rótulo e as embalagens exclusivas.
              Calcule o frete em tempo real e <strong>feche o orçamento e a amostra digital da arte diretamente pelo WhatsApp da loja</strong>.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onNavigateToTab('custom')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#171412] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Configurar Minhas Velas Personalizadas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigateToTab('contact')}
                className="px-6 py-4 rounded-full border border-white/20 hover:bg-white/10 text-stone-200 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer"
              >
                Tirar Dúvidas com a Perfumista
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE CRAFT / BRAND PILLARS (O Ritual Alvéra) */}
      <section className="bg-[#F4EFEA] dark:bg-[#1C1714] py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold block mb-2">
              Compromisso com o Bem-Estar
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#FAF8F5]">
              O Padrão de Pureza Alvéra
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2">
              Cada vela é um manifesto de cuidado com a sua saúde, com os animais e com o meio ambiente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#251E19] border border-[#EDE5DA] dark:border-[#332A23] shadow-sm text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
                100% Cera Vegetal
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Blend puro de coco, palma e soja. Livre de parafina de petróleo, garantindo queima limpa e sem toxinas.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#251E19] border border-[#EDE5DA] dark:border-[#332A23] shadow-sm text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
                Pavio 100% Algodão
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Fios de algodão puro sem adição de chumbo ou cobre. Chama estável, constante e sem fumaça escura.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#251E19] border border-[#EDE5DA] dark:border-[#332A23] shadow-sm text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
                Perfumaria Fina Nobre
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Essências botânicas com alta concentração olfativa, desenhadas para perfumar o ambiente com elegância e sem dor de cabeça.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#251E19] border border-[#EDE5DA] dark:border-[#332A23] shadow-sm text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
                Feito à Mão em Uberaba
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Produção artesanal lenta, pote a pote, honrando o tempo da cura das ceras e a excelência sensorial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REGULAMENTAÇÃO ANVISA (Foto 4) */}
      <AnvisaBanner />

      {/* 5. SENSORY MOOD SELECTOR (Aromaterapia & Bem-Estar) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold block mb-1">
            Harmonia & Equilíbrio
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#FAF8F5]">
            O que seu momento pede hoje?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Escolha o estado de espírito que você deseja cultivar em seu lar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => onNavigateToTab('scents')}
            className="p-6 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] hover:border-[#C5A059] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Moon className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              Desacelerar & Sono
            </h3>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Notas tranquilizadoras de lavanda francesa, alecrim e camomila para noites revigorantes.
            </p>
            <span className="inline-block mt-4 text-xs font-semibold text-[#C5A059] group-hover:underline">
              Ver aromas relaxantes →
            </span>
          </div>

          <div
            onClick={() => onNavigateToTab('scents')}
            className="p-6 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] hover:border-[#C5A059] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              Foco & Concentração
            </h3>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Cedro nobre, cardamomo negro e especiarias para estimular a criatividade e a clareza mental.
            </p>
            <span className="inline-block mt-4 text-xs font-semibold text-[#C5A059] group-hover:underline">
              Ver aromas de foco →
            </span>
          </div>

          <div
            onClick={() => onNavigateToTab('scents')}
            className="p-6 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] hover:border-[#C5A059] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              Romance & Doçura
            </h3>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Flor de cerejeira imperial harmonizada com baunilha nobre de Bourbon e sândalo aveludado.
            </p>
            <span className="inline-block mt-4 text-xs font-semibold text-[#C5A059] group-hover:underline">
              Ver florais delicados →
            </span>
          </div>

          <div
            onClick={() => onNavigateToTab('scents')}
            className="p-6 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] hover:border-[#C5A059] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
              Aconchego & Recepção
            </h3>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Bergamota solar e âmbar dourado para criar uma atmosfera abraçadora para sua sala de estar.
            </p>
            <span className="inline-block mt-4 text-xs font-semibold text-[#C5A059] group-hover:underline">
              Ver aromas da casa →
            </span>
          </div>
        </div>
      </section>

      {/* RITUAL DE CUIDADOS: O QUE SUA VELA QUER QUE VOCÊ LEIA (Foto 5) */}
      <CandleCareSection />

      {/* 6. TESTIMONIALS (Depoimentos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold block mb-1">
            Experiências Reais
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#FAF8F5]">
            Quem acende a Alvéra se apaixona
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E1916] border border-stone-200 dark:border-stone-800 space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 italic leading-relaxed">
              "A vela Luar de Bergamota transformou meu final de tarde. O aroma perfuma a casa toda sem ser enjoativo, e a queima é impecável, derretendo uniforme até a borda!"
            </p>
            <div className="pt-2 border-t dark:border-stone-800">
              <span className="font-serif font-bold text-xs block text-stone-900 dark:text-stone-100">
                Camila Mendonça
              </span>
              <span className="text-[11px] text-stone-400">Uberaba - MG</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E1916] border border-stone-200 dark:border-stone-800 space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 italic leading-relaxed">
              "Comprei a Gift Box para presentear minha mãe no aniversário. A embalagem é de um bom gosto absurdo, com fita e cartão. Ela chorou de emoção quando abriu!"
            </p>
            <div className="pt-2 border-t dark:border-stone-800">
              <span className="font-serif font-bold text-xs block text-stone-900 dark:text-stone-100">
                Rodrigo Vasconcelos
              </span>
              <span className="text-[11px] text-stone-400">São Paulo - SP</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E1916] border border-stone-200 dark:border-stone-800 space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 italic leading-relaxed">
              "Uso a vela de Lavanda & Alecrim religiosamente 1h antes de deitar. Meu sono mudou completamente. Parabéns pelo carinho e pela qualidade sublime."
            </p>
            <div className="pt-2 border-t dark:border-stone-800">
              <span className="font-serif font-bold text-xs block text-stone-900 dark:text-stone-100">
                Mariana Alencar
              </span>
              <span className="text-[11px] text-stone-400">Belo Horizonte - MG</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER / CLUB DE AROMAS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-[#1C1917] to-[#2E2824] text-white text-center space-y-4 border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
          <div className="w-10 h-10 mx-auto rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Receba 10% OFF na Primeira Compra
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
            Cadastre seu e-mail para receber lançamentos de edições limitadas e nosso guia exclusivo de aromaterapia no lar.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2 pt-2">
            <input
              type="email"
              placeholder="Digite seu melhor e-mail..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 text-xs px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#171412] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-1.5 shadow"
            >
              <span>Quero 10%</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <span className="text-[10px] text-stone-400 block pt-1">
            Cupom instantâneo: <strong>BEMVINDO10</strong>
          </span>
        </div>
      </section>
    </div>
  );
};
