import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import {
  Search,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CheckCircle,
  Printer,
  DollarSign,
  CreditCard,
  QrCode,
  Sparkles,
  Receipt,
  User,
} from 'lucide-react';

export const PdvView: React.FC = () => {
  const { products, createOrder, showToast } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [ticketItems, setTicketItems] = useState<Array<{ product: Product; quantity: number }>>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [discount, setDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'pdv_dinheiro' | 'pdv_cartao' | 'pdv_pix'>('pdv_pix');
  const [isFinishing, setIsFinishing] = useState(false);
  const [lastSaleReceipt, setLastSaleReceipt] = useState<any | null>(null);

  const filteredProducts = products.filter((p) => {
    if (!p.active) return false;
    const matchQuery =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.scents.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'todos' || p.category === selectedCategory;
    return matchQuery && matchCat;
  });

  const addToTicket = (product: Product) => {
    if (product.stock <= 0) {
      showToast('Produto sem estoque disponível no momento.', 'error');
      return;
    }

    setTicketItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        if (exists.quantity >= product.stock) {
          showToast(`Limite de estoque atingido (${product.stock} un.)`, 'info');
          return prev;
        }
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setTicketItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    const prod = products.find((p) => p.id === productId);
    if (prod && quantity > prod.stock) {
      showToast(`Estoque máximo atingido (${prod.stock} un.)`, 'info');
      return;
    }
    setTicketItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromTicket = (productId: string) => {
    setTicketItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = ticketItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discount);

  const handleFinishSale = async () => {
    if (ticketItems.length === 0) {
      showToast('Adicione pelo menos um produto ao cupom do PDV', 'error');
      return;
    }

    setIsFinishing(true);
    try {
      const order = await createOrder({
        customerName: customerName.trim() || 'Cliente Balcão PDV',
        customerPhone: customerPhone.trim() || '(34) 99249-5905',
        customerEmail: 'balcao@alvera.com.br',
        customerAddress: 'Venda Presencial - Balcão Loja Física Alvéra',
        cep: '38025-000',
        shippingMethod: 'Retirada no Balcão PDV',
        shippingPrice: 0,
        items: ticketItems.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images[0],
        })),
        subtotal,
        total,
        paymentMethod,
        paymentStatus: 'pago',
        orderStatus: 'concluido',
        isPDV: true,
        notes: discount > 0 ? `Desconto aplicado: R$ ${discount.toFixed(2)}` : undefined,
      });

      setLastSaleReceipt(order);
      setTicketItems([]);
      setCustomerName('');
      setCustomerPhone('');
      setDiscount(0);
      showToast('Venda PDV finalizada e sincronizada com sucesso!', 'success');
    } catch {
      showToast('Erro ao processar venda no PDV', 'error');
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Receipt className="w-6 h-6 text-[#C5A059]" />
            Ponto de Venda (PDV)
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Frente de caixa para vendas físicas no ateliê com baixa de estoque automática no Firestore.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Product Catalog (Cols 7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar produto ou aroma para adicionar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none"
            >
              <option value="todos">Todas Categorias</option>
              <option value="velas">Velas Aromáticas</option>
              <option value="difusores">Difusores</option>
              <option value="home-sprays">Home Sprays</option>
              <option value="acessorios">Acessórios</option>
              <option value="kits">Kits Presente</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[550px] overflow-y-auto pr-1">
            {filteredProducts.map((p) => {
              const inTicket = ticketItems.find((i) => i.product.id === p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => addToTicket(p)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    p.stock <= 0
                      ? 'opacity-50 border-stone-200 dark:border-stone-800'
                      : 'bg-white dark:bg-[#201A16] border-stone-200 dark:border-stone-800 hover:border-[#C5A059] shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-stone-100">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    {inTicket && (
                      <span className="absolute top-2 right-2 bg-[#C5A059] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
                        {inTicket.quantity} no caixa
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif text-xs font-semibold text-stone-900 dark:text-stone-100 line-clamp-1">
                      {p.name}
                    </h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs font-bold text-[#C5A059] font-serif">
                        R$ {p.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-[10px] text-stone-400">Estoque: {p.stock}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Current Ticket & Cashier Controls (Cols 5) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#1E1916] rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center pb-3 border-b dark:border-stone-800">
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-[#C5A059]" />
                Cupom da Venda
              </h3>
              {ticketItems.length > 0 && (
                <button
                  onClick={() => setTicketItems([])}
                  className="text-[11px] text-red-500 hover:underline"
                >
                  Limpar Cupom
                </button>
              )}
            </div>

            {/* Customer Inputs (Optional) */}
            <div className="grid grid-cols-2 gap-2 my-3 text-xs">
              <input
                type="text"
                placeholder="Nome do Cliente (opcional)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none"
              />
              <input
                type="text"
                placeholder="WhatsApp (opcional)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none"
              />
            </div>

            {/* Ticket Items */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {ticketItems.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs">
                  Clique nos produtos ao lado para incluir no caixa.
                </div>
              ) : (
                ticketItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-stone-50 dark:bg-[#251E19] text-xs border border-stone-200 dark:border-stone-800"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="font-semibold text-stone-800 dark:text-stone-200 truncate">
                        {item.product.name}
                      </div>
                      <div className="text-stone-500 text-[10px]">
                        R$ {item.product.price.toFixed(2)} cada
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded bg-stone-200 dark:bg-stone-700 hover:opacity-80"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="w-5 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded bg-stone-200 dark:bg-stone-700 hover:opacity-80"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <div className="w-16 text-right font-bold text-stone-900 dark:text-stone-100 font-serif ml-2">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                    </div>

                    <button
                      onClick={() => removeFromTicket(item.product.id)}
                      className="ml-2 text-stone-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Payment & Totals */}
          <div className="pt-3 border-t dark:border-stone-800 space-y-3">
            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('pdv_pix')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-semibold transition-all ${
                  paymentMethod === 'pdv_pix'
                    ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059]'
                    : 'border-stone-200 dark:border-stone-700 text-stone-500'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>Pix InfinitePay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('pdv_cartao')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-semibold transition-all ${
                  paymentMethod === 'pdv_cartao'
                    ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059]'
                    : 'border-stone-200 dark:border-stone-700 text-stone-500'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Cartão Máquina</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('pdv_dinheiro')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-semibold transition-all ${
                  paymentMethod === 'pdv_dinheiro'
                    ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059]'
                    : 'border-stone-200 dark:border-stone-700 text-stone-500'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Dinheiro Espécie</span>
              </button>
            </div>

            {/* Discount input */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Desconto manual (R$):</span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={discount || ''}
                onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                placeholder="0,00"
                className="w-24 p-1.5 text-right rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs focus:outline-none"
              />
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline pt-2 border-t dark:border-stone-800">
              <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Total a Cobrar:</span>
              <span className="font-serif text-2xl font-bold text-[#C5A059]">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <button
              onClick={handleFinishSale}
              disabled={isFinishing || ticketItems.length === 0}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1C1917] hover:bg-[#C5A059] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] dark:hover:bg-[#D4AF37] font-bold uppercase tracking-widest text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isFinishing ? 'Emitindo Venda...' : 'Finalizar Venda PDV'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sale Receipt Modal */}
      {lastSaleReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E1916] rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 dark:border-stone-800 space-y-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Venda Registrada com Sucesso!
              </h3>
              <p className="text-xs text-stone-500">Comprovante de Venda Balcão #{lastSaleReceipt.id}</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border text-left text-xs space-y-1.5 font-mono">
              <div className="text-center font-bold uppercase tracking-wider pb-1 border-b">
                ALVÉRA VELAS & AROMAS
              </div>
              <div className="text-[10px] text-stone-500 text-center pb-2">
                Rua Santa Juliana, 625 – Uberaba MG
              </div>
              {lastSaleReceipt.items.map((i: any, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span className="truncate pr-1">
                    {i.quantity}x {i.name}
                  </span>
                  <span>R$ {(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-2 border-t flex justify-between font-bold text-sm">
                <span>TOTAL:</span>
                <span>R$ {lastSaleReceipt.total.toFixed(2)}</span>
              </div>
              <div className="text-[10px] text-stone-400 pt-1">
                Pagamento: {lastSaleReceipt.paymentMethod.replace('pdv_', '').toUpperCase()}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-stone-100"
              >
                <Printer className="w-4 h-4" /> Imprimir
              </button>
              <button
                onClick={() => setLastSaleReceipt(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#C5A059]"
              >
                Nova Venda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
