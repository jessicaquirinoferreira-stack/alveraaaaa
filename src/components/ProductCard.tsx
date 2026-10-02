import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Eye, Flame, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart } = useStore();

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-[#FFFFFF] dark:bg-[#1E1916] rounded-2xl overflow-hidden border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm hover:shadow-xl transition-all flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#F5EFEB] dark:bg-[#26201C] cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {(product.isCustomizable || product.category === 'personalizadas') && (
            <span className="bg-[#1C1917]/95 text-[#E6CA65] dark:bg-[#FAF8F5]/95 dark:text-[#1C1917] backdrop-blur-md text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#D4AF37] shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Sob Medida
            </span>
          )}
          {product.featured && !product.isCustomizable && (
            <span className="bg-[#1C1917]/90 text-[#D4AF37] dark:bg-[#FAF8F5]/90 dark:text-[#1C1917] backdrop-blur-md text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#D4AF37]/40 shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Destaque
            </span>
          )}
          {isLowStock && (
            <span className="bg-amber-700/90 text-white backdrop-blur-md text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm">
              Últimas {product.stock} un.
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-red-800/90 text-white backdrop-blur-md text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm">
              Esgotado
            </span>
          )}
        </div>

        {/* Burn Time Badge */}
        {product.burnTime && (
          <div className="absolute bottom-3 left-3 bg-[#1C1917]/75 text-white/90 backdrop-blur-md text-[10px] font-normal px-2.5 py-1 rounded-full flex items-center gap-1">
            <Flame className="w-3 h-3 text-[#E6CA65]" />
            <span>{product.burnTime}</span>
          </div>
        )}

        {/* Hover Quick Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="p-3 rounded-full bg-white/95 text-[#1C1917] hover:bg-[#D4AF37] hover:text-white shadow-lg transition-transform hover:scale-110"
            title="Ver detalhes do aroma"
          >
            <Eye className="w-4 h-4" />
          </button>
          {!isOutOfStock && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="p-3 rounded-full bg-[#1C1917] text-white hover:bg-[#D4AF37] shadow-lg transition-transform hover:scale-110"
              title="Adicionar à Sacola"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#A8A29E] mb-1.5 font-medium">
            <span>{product.categoryLabel || product.category}</span>
            {product.weight && <span>{product.weight}</span>}
          </div>

          <h3
            onClick={() => onSelect(product)}
            className="font-serif text-base sm:text-lg font-semibold text-[#1C1917] dark:text-[#FAF8F5] group-hover:text-[#C5A059] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription || product.scents}
          </p>

          {/* Scent notes tag */}
          <div className="mt-3 py-1 px-2 rounded-md bg-[#FAF6F0] dark:bg-[#28221D] border border-[#EFE8DF] dark:border-[#382F28] text-[11px] text-[#8C7A6B] dark:text-[#C4B5A5] truncate">
            <span className="font-semibold text-[#C5A059]">Notas:</span> {product.scents}
          </div>
        </div>

        {/* Price & Buy Button */}
        <div className="mt-4 pt-3 border-t border-[#F2ECE3] dark:border-[#2C241F] flex items-center justify-between">
          <div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#A8A29E] line-through block">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-lg font-bold text-[#1C1917] dark:text-[#FAF8F5] font-serif">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {product.isCustomizable || product.category === 'personalizadas' ? (
            <button
              onClick={() => onSelect(product)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 bg-[#C5A059] text-white hover:brightness-110 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalizar</span>
            </button>
          ) : (
            <button
              disabled={isOutOfStock}
              onClick={() => addToCart(product)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 ${
                isOutOfStock
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed dark:bg-stone-800'
                  : 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#C5A059] dark:bg-[#FAF8F5] dark:text-[#1C1917] dark:hover:bg-[#D4AF37] dark:hover:text-[#1C1917] shadow-sm'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Adicionar</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
