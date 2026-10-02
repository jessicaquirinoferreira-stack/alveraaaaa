import React, { useState } from 'react';
import { Product, ShippingOption } from '../types';
import { useStore } from '../context/StoreContext';
import { calculateShippingOptions, fetchAddressByCep } from '../services/shippingService';
import { ALVERA_CANDLE_CARE } from '../data/initialData';
import { AnvisaRegulationModal } from './AnvisaRegulationModal';
import { X, ShoppingBag, Flame, Sparkles, Truck, Check, MessageCircle, Heart, Share2, ShieldCheck, ChevronDown, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onNavigateToCustom?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onNavigateToCustom,
}) => {
  const { addToCart, openCart, settings, showToast } = useStore();
  const [selectedImage, setSelectedImage] = useState<string>(product?.images[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [cepInput, setCepInput] = useState('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [cityUf, setCityUf] = useState('');
  const [showCareGuide, setShowCareGuide] = useState(false);
  const [isAnvisaOpen, setIsAnvisaOpen] = useState(false);

  if (!product) return null;

  const currentImg = selectedImage || product.images[0];

  const handleCalculateShipping = async () => {
    const clean = cepInput.replace(/\D/g, '');
    if (clean.length !== 8) {
      showToast('Digite um CEP válido com 8 dígitos', 'info');
      return;
    }

    setIsCalculatingShipping(true);
    const addr = await fetchAddressByCep(clean);
    const options = calculateShippingOptions(clean, addr?.uf, product.price * quantity);
    setShippingOptions(options);
    if (addr) {
      setCityUf(`${addr.localidade} - ${addr.uf}`);
    }
    setShippingCalculated(true);
    setIsCalculatingShipping(false);
  };

  const handleDirectBuy = () => {
    addToCart(product, quantity);
    onClose();
    openCart();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Alvéra - ${product.name}`,
        text: `Descubra a vela ${product.name} na Alvéra Velas & Aromas`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link do produto copiado com sucesso!', 'success');
    }
  };

  const whatsappPhone = (settings.whatsapp || '34992495905').replace(/\D/g, '');
  const productWhatsappUrl = `https://wa.me/55${whatsappPhone}?text=${encodeURIComponent(
    `Olá! Tenho interesse na vela "${product.name}" da Alvéra e gostaria de tirar dúvidas.`
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#FAF8F5] dark:bg-[#1A1614] rounded-3xl shadow-2xl border border-[#E7DFD5] dark:border-[#2C241F] overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 dark:bg-stone-800/80 backdrop-blur text-stone-600 dark:text-stone-300 hover:text-black dark:hover:text-white hover:scale-105 transition-all shadow"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Gallery */}
          <div className="md:w-1/2 p-4 sm:p-6 bg-[#F5EFEB] dark:bg-[#221C18] flex flex-col justify-between">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-inner bg-[#EFE8DE] dark:bg-[#2A231E]">
              <img
                src={currentImg}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {product.featured && (
                <div className="absolute top-3 left-3 bg-[#1C1917]/90 text-[#D4AF37] text-xs font-semibold px-3 py-1 rounded-full border border-[#D4AF37]/30 shadow flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Destaque Alvéra
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      currentImg === img
                        ? 'border-[#C5A059] shadow-md scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} foto ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Purchase */}
          <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[85vh] flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Tags */}
              <div className="flex items-center justify-between text-xs tracking-widest uppercase text-[#A8A29E] font-medium">
                <span>{product.categoryLabel || product.category}</span>
                <div className="flex items-center gap-2">
                  <button onClick={handleShare} className="p-1.5 hover:text-[#C5A059] transition-colors" title="Compartilhar">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] dark:text-[#FAF8F5] mt-2 leading-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold font-serif text-[#1C1917] dark:text-[#FAF8F5]">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-stone-400 line-through">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <span className="text-xs text-[#C5A059] font-medium tracking-wide">
                  Parcele em até 12x
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-[#57534E] dark:text-[#D6D3D1] leading-relaxed">
                {product.description || product.shortDescription}
              </p>

              {/* Olfactory Pyramid */}
              {product.olfactoryPyramid && (
                <div className="mt-5 p-4 rounded-2xl bg-[#F4EFEA] dark:bg-[#251E19] border border-[#E7DFD5] dark:border-[#332A23] space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Pirâmide Olfativa
                  </div>
                  <div className="text-xs text-[#57534E] dark:text-[#D6D3D1] space-y-1">
                    <div>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">Saída: </span>
                      {product.olfactoryPyramid.top}
                    </div>
                    <div>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">Corpo: </span>
                      {product.olfactoryPyramid.heart}
                    </div>
                    <div>
                      <span className="font-semibold text-stone-800 dark:text-stone-200">Fundo: </span>
                      {product.olfactoryPyramid.base}
                    </div>
                  </div>
                </div>
              )}

              {/* Specs Pills */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                {product.burnTime && (
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#221C18] border border-stone-200 dark:border-stone-800 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#C5A059]" />
                    <span className="text-stone-700 dark:text-stone-300 font-medium">Queima: {product.burnTime}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#221C18] border border-stone-200 dark:border-stone-800 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span className="text-stone-700 dark:text-stone-300 font-medium">Peso: {product.weight}</span>
                  </div>
                )}
              </div>

              {/* Shipping Estimator (Correios & Jadlog) */}
              <div className="mt-5 p-4 rounded-2xl bg-white dark:bg-[#201A16] border border-stone-200 dark:border-stone-800">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-[#C5A059]" /> Calcular Frete & Prazo (Correios / Jadlog)
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Digite seu CEP (Ex: 01310-100)"
                    value={cepInput}
                    onChange={(e) => setCepInput(e.target.value)}
                    maxLength={9}
                    className="flex-1 text-xs px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-[#C5A059]"
                  />
                  <button
                    onClick={handleCalculateShipping}
                    disabled={isCalculatingShipping}
                    className="px-4 py-2 bg-stone-800 hover:bg-[#C5A059] text-white text-xs font-semibold rounded-xl transition-colors disabled:opacity-50"
                  >
                    {isCalculatingShipping ? 'Calculando...' : 'Calcular'}
                  </button>
                </div>

                {shippingCalculated && (
                  <div className="mt-3 space-y-1.5 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                    {cityUf && <div className="text-[11px] text-stone-500 font-medium mb-1">Destino: {cityUf}</div>}
                    {shippingOptions.map((opt) => (
                      <div key={opt.id} className="flex justify-between items-center py-1 border-b border-stone-100 dark:border-stone-800/50">
                        <span className="text-stone-700 dark:text-stone-300">{opt.service} ({opt.days} dias úteis)</span>
                        <span className="font-bold text-stone-900 dark:text-stone-100">
                          R$ {opt.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ANVISA Regulation Badge & Care Guide (Fotos 4 e 5) */}
              <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 space-y-2">
                {/* ANVISA Compliance Banner Trigger */}
                <button
                  type="button"
                  onClick={() => setIsAnvisaOpen(true)}
                  className="w-full p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 text-left flex items-center justify-between text-xs hover:border-emerald-400 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-emerald-950 dark:text-emerald-200 block text-[11px]">
                        ANVISA • APROVADO EM 30.09.2026
                      </span>
                      <span className="text-[10px] text-emerald-800 dark:text-emerald-300">
                        100% Cera Vegetal, Pavio sem chumbo e Essências Certificadas
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 underline">
                    Ver regras
                  </span>
                </button>

                {/* Candle Care Accordion (O que sua vela quer que você leia 🕯️) */}
                <div className="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowCareGuide(!showCareGuide)}
                    className="w-full p-2.5 bg-stone-50 dark:bg-[#201A16] flex items-center justify-between text-left text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#28211C] transition-colors"
                  >
                    <span className="flex items-center gap-1.5 font-serif text-[11px]">
                      <span>🕯️</span>
                      <span>O que sua vela quer que você leia</span>
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${showCareGuide ? 'rotate-180' : ''}`} />
                  </button>

                  {showCareGuide && (
                    <div className="p-3 bg-white dark:bg-[#1A1614] border-t border-stone-200 dark:border-stone-800 space-y-2 text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                      <p className="italic text-stone-500">
                        "{ALVERA_CANDLE_CARE.intro}"
                      </p>
                      <ul className="space-y-1.5 list-disc list-inside">
                        {ALVERA_CANDLE_CARE.rules.map((r) => (
                          <li key={r.id}>
                            <strong className="text-stone-800 dark:text-stone-200">{r.rule}:</strong> {r.detail}
                          </li>
                        ))}
                      </ul>
                      <p className="pt-1 text-[10px] font-serif text-[#C5A059] border-t dark:border-stone-800">
                        {ALVERA_CANDLE_CARE.footer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

              {/* Actions: Quantity + Add to Cart + Direct Buy or Custom WhatsApp */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
                {product.isCustomizable || product.category === 'personalizadas' ? (
                  <div className="space-y-3">
                    <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 leading-snug">
                      ✦ <strong>Vela Personalizada:</strong> Você pode escolher o aroma, rótulo com monograma/nomes e calcular o frete aqui. A arte e o valor final com descontos por lote são fechados diretamente no WhatsApp da loja.
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-900 overflow-hidden">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-3 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                        >
                          -
                        </button>
                        <span className="px-3 text-sm font-semibold text-stone-900 dark:text-stone-100 min-w-[28px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="px-3 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                        >
                          +
                        </button>
                      </div>

                      <a
                        href={`https://wa.me/55${whatsappPhone}?text=${encodeURIComponent(
                          `Olá Alvéra! Quero personalizar "${product.name}" (Qtd estimada: ${quantity} un.). Meu CEP é ${cepInput || 'a informar'}. Gostaria de ver as opções de rótulo e fechar o valor pelo WhatsApp!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1fa952] text-white text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Fechar via WhatsApp</span>
                      </a>
                    </div>

                    {onNavigateToCustom && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onNavigateToCustom();
                        }}
                        className="w-full py-3 px-4 rounded-xl border border-[#C5A059] bg-[#C5A059]/10 hover:bg-[#C5A059]/20 text-[#8C6D23] dark:text-[#E6CA65] text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#C5A059]" />
                        <span>Abrir Ateliê Completo de Personalização Sob Medida</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl bg-white dark:bg-stone-900 overflow-hidden">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-3.5 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                        >
                          -
                        </button>
                        <span className="px-3 text-sm font-semibold text-stone-900 dark:text-stone-100 min-w-[28px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                          className="px-3.5 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => addToCart(product, quantity)}
                        className="flex-1 py-3 px-4 rounded-xl bg-[#FAF8F5] dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 hover:border-[#C5A059] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                        Adicionar à Sacola
                      </button>
                    </div>

                    <button
                      onClick={handleDirectBuy}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#1C1917] hover:bg-[#C5A059] text-[#FAF8F5] dark:bg-[#FAF8F5] dark:text-[#1C1917] dark:hover:bg-[#D4AF37] text-xs uppercase tracking-widest font-bold transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      Comprar Agora • R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                    </button>

                    <a
                      href={productWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 text-xs text-center text-[#25D366] hover:underline flex items-center justify-center gap-1.5 font-medium"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Dúvidas? Fale com a perfumista no WhatsApp
                    </a>
                  </>
                )}
              </div>
          </div>
        </motion.div>
      </div>

      <AnvisaRegulationModal
        isOpen={isAnvisaOpen}
        onClose={() => setIsAnvisaOpen(false)}
      />
    </AnimatePresence>
  );
};
