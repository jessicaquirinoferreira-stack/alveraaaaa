import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  TrendingUp,
  DollarSign,
  Package,
  ShoppingBag,
  CreditCard,
  QrCode,
  Flame,
} from 'lucide-react';

export const SalesReports: React.FC = () => {
  const { orders, products } = useStore();

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'pago')
    .reduce((acc, o) => acc + o.total, 0);

  const completedOrders = orders.filter((o) => o.paymentStatus === 'pago').length;
  const averageTicket = completedOrders > 0 ? totalRevenue / completedOrders : 0;

  // Breakdown by payment method
  const pixRevenue = orders
    .filter((o) => o.paymentStatus === 'pago' && o.paymentMethod.includes('pix'))
    .reduce((acc, o) => acc + o.total, 0);

  const cardRevenue = orders
    .filter((o) => o.paymentStatus === 'pago' && o.paymentMethod.includes('cartao') || o.paymentMethod.includes('credit'))
    .reduce((acc, o) => acc + o.total, 0);

  const pdvRevenue = orders
    .filter((o) => o.isPDV && o.paymentStatus === 'pago')
    .reduce((acc, o) => acc + o.total, 0);

  // Top products count
  const productCountMap: { [name: string]: number } = {};
  orders.forEach((o) => {
    if (o.paymentStatus === 'pago') {
      o.items.forEach((item) => {
        productCountMap[item.name] = (productCountMap[item.name] || 0) + item.quantity;
      });
    }
  });

  const topProducts = Object.entries(productCountMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#C5A059]" />
          Relatórios & Performance de Vendas
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Métricas consolidadas de faturamento, pedidos online e PDV presencial.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1E1916] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Faturamento Total</span>
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            R$ {totalRevenue.toFixed(2).replace('.', ',')}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">
            Sincronizado com Firestore
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#1E1916] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Pedidos Confirmados</span>
            <div className="p-2 rounded-xl bg-[#C5A059]/20 text-[#C5A059]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            {completedOrders}
          </div>
          <div className="text-[11px] text-stone-400">
            Online e Loja Física
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#1E1916] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span>Ticket Médio</span>
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            R$ {averageTicket.toFixed(2).replace('.', ',')}
          </div>
          <div className="text-[11px] text-stone-400">
            Por compra realizada
          </div>
        </div>
      </div>

      {/* Breakdown Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        {/* Payment Channels */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#1E1916] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
            Canais de Pagamento (InfinitePay & PDV)
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                  <QrCode className="w-4 h-4 text-[#C5A059]" /> InfinitePay Pix
                </span>
                <span>R$ {pixRevenue.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#C5A059] h-full"
                  style={{ width: `${totalRevenue > 0 ? (pixRevenue / totalRevenue) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                  <CreditCard className="w-4 h-4 text-blue-600" /> Cartão de Crédito
                </span>
                <span>R$ {cardRevenue.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full"
                  style={{ width: `${totalRevenue > 0 ? (cardRevenue / totalRevenue) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                  <ShoppingBag className="w-4 h-4 text-emerald-600" /> Vendas PDV Balcão
                </span>
                <span>R$ {pdvRevenue.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full"
                  style={{ width: `${totalRevenue > 0 ? (pdvRevenue / totalRevenue) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Selling Scents */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#1E1916] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#C5A059]" />
            Aromas & Velas Mais Vendidos
          </h3>

          <div className="space-y-2.5">
            {topProducts.length === 0 ? (
              <p className="text-stone-400 py-6 text-center">Nenhuma venda registrada ainda.</p>
            ) : (
              topProducts.map(([name, qty], idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#C5A059] text-white text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-stone-800 dark:text-stone-200">{name}</span>
                  </div>
                  <span className="font-bold text-[#C5A059]">{qty} unidades</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
