import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShippingOption } from '../types';
import { calculateShippingOptions, fetchAddressByCep } from '../services/shippingService';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Sparkles, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  onOpenCheckout: (selectedShipping: ShippingOption | null, cep: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartCount,
    showToast,
  } = useStore();

  const [cep, setCep] = useState('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [shippingCalculated, setShippingCalculated] = useState(false);

  const handleCalculateShipping = async () => {
    const clean = cep.replace(/\D/g, '');
    if (clean.length !== 8) {
      showToast('Digite um CEP válido com 8 dígitos', 'info');
      return;
    }

    setIsCalculating(true);
    const addr = await fetchAddressByCep(clean);
    const options = calculateShippingOptions(clean, addr?.uf, cartSubtotal);
    setShippingOptions(options);
    if (options.length > 0) {
      setSelectedShipping(options[0]);
    }
    setShippingCalculated(true);
    setIsCalculating(false);
  };

  const shippingPrice = selectedShipping ? selectedShipping.price : 0;
  const finalTotal = cartSubtotal + shippingPrice;

  const handleProceedCheckout = () => {
    closeCart();
    onOpenCheckout(selectedShipping, cep);
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        />

        {/* Drawer panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#FAF8F5] dark:bg-[#1A1614] shadow-2xl border-l border-[#EDE5DA] dark:border-[#2C241F] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#EAE3D9] dark:border-[#2A2421] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
                <h2 className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#FAF8F5]">
                  Sacola de Bem-Estar
                </h2>
                <span className="text-xs text-[#A8A29E] font-medium">({cartCount})</span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full text-stone-500 hover:text-black dark:hover:text-white transition-colors"
                aria-label="Fechar carrinho"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="p-4 rounded-full bg-[#F4EFEA] dark:bg-[#251E19] text-[#C5A059] mb-3">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg text-stone-800 dark:text-stone-200 font-semibold">
                    Sua sacola está vazia
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-[240px]">
                    Descubra nossas velas artesanais e fragrâncias que transformam momentos.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-5 px-5 py-2.5 rounded-xl bg-[#1C1917] text-white hover:bg-[#C5A059] dark:bg-[#FAF8F5] dark:text-[#1C1917] dark:hover:bg-[#D4AF37] text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    Explorar Coleção
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3.5 p-3 rounded-2xl bg-white dark:bg-[#201A16] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-18 h-18 rounded-xl object-cover bg-stone-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-xs font-semibold text-[#1C1917] dark:text-[#FAF8F5] truncate pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 truncate">
                        {item.product.categoryLabel || item.product.category}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-stone-50 dark:bg-stone-800">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-stone-800 dark:text-stone-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-stone-900 dark:text-stone-100 font-serif">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with CEP Shipping & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#EAE3D9] dark:border-[#2A2421] bg-white/70 dark:bg-[#1E1916]/70 backdrop-blur space-y-3">
                {/* Shipping Estimator Drawer */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="CEP para entrega"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      maxLength={9}
                      className="flex-1 text-xs px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-[#C5A059]"
                    />
                    <button
                      onClick={handleCalculateShipping}
                      disabled={isCalculating}
                      className="px-3 py-1.5 bg-stone-800 text-white hover:bg-[#C5A059] rounded-xl text-xs font-medium transition-colors disabled:opacity-50"
                    >
                      {isCalculating ? '...' : 'Calcular Frete'}
                    </button>
                  </div>

                  {shippingCalculated && shippingOptions.length > 0 && (
                    <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                      {shippingOptions.map((opt) => (
                        <label
                          key={opt.id}
                          className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                            selectedShipping?.id === opt.id
                              ? 'border-[#C5A059] bg-[#C5A059]/10'
                              : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="drawer_shipping"
                              checked={selectedShipping?.id === opt.id}
                              onChange={() => setSelectedShipping(opt)}
                              className="accent-[#C5A059]"
                            />
                            <span className="font-medium text-stone-800 dark:text-stone-200">
                              {opt.service} ({opt.days}d)
                            </span>
                          </div>
                          <span className="font-bold">
                            R$ {opt.price.toFixed(2).replace('.', ',')}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subtotals */}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-1 text-xs">
                  <div className="flex justify-between text-stone-600 dark:text-stone-400">
                    <span>Subtotal:</span>
                    <span>R$ {cartSubtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {selectedShipping && (
                    <div className="flex justify-between text-stone-600 dark:text-stone-400">
                      <span>Frete ({selectedShipping.carrier}):</span>
                      <span>
                        R$ {selectedShipping.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-[#1C1917] dark:text-[#FAF8F5] pt-1">
                    <span>Total:</span>
                    <span className="font-serif text-base text-[#C5A059]">
                      R$ {finalTotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#1C1917] hover:bg-[#C5A059] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] dark:hover:bg-[#D4AF37] text-xs uppercase tracking-widest font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Avançar para Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
