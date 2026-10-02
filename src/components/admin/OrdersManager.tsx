import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Eye,
  Filter,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

export const OrdersManager: React.FC = () => {
  const { orders, updateOrderStatus, showToast } = useStore();
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'todos') return true;
    return o.orderStatus === filterStatus;
  });

  const getStatusBadge = (status: Order['orderStatus']) => {
    const config = {
      novo: { bg: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300', label: 'Novo Pedido' },
      em_preparo: { bg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300', label: 'Em Preparo' },
      enviado: { bg: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300', label: 'Enviado' },
      concluido: { bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300', label: 'Concluído' },
      cancelado: { bg: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300', label: 'Cancelado' },
      orcamento_whatsapp: { bg: 'bg-[#D4AF37]/20 text-[#C5A059] border border-[#D4AF37]/40', label: 'Cotação WhatsApp' },
    };
    const c = (config as any)[status] || config.novo;
    return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${c.bg}`}>{c.label}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Package className="w-6 h-6 text-[#C5A059]" />
            Pedidos em Tempo Real
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Acompanhe pedidos da loja online e vendas de balcão do PDV instantaneamente.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-stone-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none"
          >
            <option value="todos">Todos os Pedidos ({orders.length})</option>
            <option value="novo">Novos Pedidos</option>
            <option value="orcamento_whatsapp">✦ Cotações Velas Personalizadas</option>
            <option value="em_preparo">Em Preparo</option>
            <option value="enviado">Enviados</option>
            <option value="concluido">Concluídos</option>
            <option value="cancelado">Cancelados</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white dark:bg-[#1E1916] rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-stone-400 text-xs">
            Nenhum pedido encontrado para o filtro selecionado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-[#251E19] text-stone-500 uppercase tracking-wider text-[10px] border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="p-3.5">ID / Data</th>
                  <th className="p-3.5">Cliente</th>
                  <th className="p-3.5">Itens</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Tipo</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Detalhes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-mono font-bold text-stone-900 dark:text-stone-100">
                        #{o.id.slice(-6)}
                      </div>
                      <div className="text-[10px] text-stone-400">
                        {new Date(o.createdAt).toLocaleDateString()} {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-stone-900 dark:text-stone-100">
                        {o.customerName}
                      </div>
                      <div className="text-[10px] text-stone-400">{o.customerPhone}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold">{o.items.reduce((s, i) => s + i.quantity, 0)} un.</span>
                      <span className="text-[10px] text-stone-400 block truncate max-w-[140px]">
                        {o.items.map((i) => i.name).join(', ')}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold font-serif text-stone-900 dark:text-stone-100">
                      R$ {o.total.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="p-3.5">
                      {o.isCustomQuote || o.paymentMethod === 'whatsapp_custom' ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#D4AF37]/20 text-[#C5A059] border border-[#D4AF37]/40">
                          Personalizada
                        </span>
                      ) : o.isPDV ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800">
                          PDV Balcão
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-100 text-blue-800">
                          Online
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">{getStatusBadge(o.orderStatus)}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#C5A059] hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] dark:bg-[#1A1614] rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-stone-200 dark:border-stone-800 shadow-2xl space-y-5">
            <div className="flex justify-between items-start border-b dark:border-stone-800 pb-3">
              <div>
                <span className="text-xs text-[#C5A059] font-bold uppercase tracking-wider">
                  Detalhes do Pedido #{selectedOrder.id}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                  {selectedOrder.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-stone-400 hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Customer & Shipping info */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
              <div className="space-y-1">
                <span className="text-stone-400 text-[10px] uppercase font-bold block">Contato</span>
                <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{selectedOrder.customerPhone}</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
                  <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{selectedOrder.customerEmail}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-stone-400 text-[10px] uppercase font-bold block">Entrega</span>
                <div className="text-stone-700 dark:text-stone-300 font-medium">
                  {selectedOrder.shippingMethod}
                </div>
                <div className="text-[11px] text-stone-500">
                  Frete: R$ {selectedOrder.shippingPrice.toFixed(2)}
                </div>
              </div>

              <div className="col-span-2 pt-2 border-t dark:border-stone-800">
                <span className="text-stone-400 text-[10px] uppercase font-bold block">Endereço</span>
                <div className="flex items-start gap-1.5 text-stone-700 dark:text-stone-300 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>{selectedOrder.customerAddress}</span>
                </div>
              </div>
            </div>

            {/* Custom Candle Specifications (If this order is a custom candle quote) */}
            {selectedOrder.customization && (
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-amber-200/60 dark:border-amber-900/40">
                  <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> Especificação da Vela Sob Medida
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#C5A059] text-white text-[10px] font-bold">
                    {selectedOrder.customization.quantity} un.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-700 dark:text-stone-300">
                  <div><strong>Ocasião:</strong> {selectedOrder.customization.occasion}</div>
                  <div><strong>Frasco:</strong> {selectedOrder.customization.jarType}</div>
                  <div><strong>Gramatura:</strong> {selectedOrder.customization.candleSize}</div>
                  <div><strong>Aroma:</strong> {selectedOrder.customization.scentFamily}</div>
                  <div><strong>Pavio:</strong> {selectedOrder.customization.wickType}</div>
                  <div><strong>Decoração:</strong> {selectedOrder.customization.waxColorAndDecor}</div>
                  <div className="col-span-2"><strong>Rótulo / Texto:</strong> {selectedOrder.customization.labelCustomText} ({selectedOrder.customization.labelStyle})</div>
                  {selectedOrder.customization.labelDate && <div><strong>Data do Evento:</strong> {selectedOrder.customization.labelDate}</div>}
                  <div><strong>Embalagem:</strong> {selectedOrder.customization.packaging}</div>
                  {selectedOrder.customization.additionalNotes && (
                    <div className="col-span-2 text-stone-500 italic">
                      <strong>Obs:</strong> {selectedOrder.customization.additionalNotes}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40">
                  <a
                    href={`https://wa.me/55${selectedOrder.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                      `Olá ${selectedOrder.customerName}! Aqui é da Alvéra Velas. Recebemos sua solicitação de velas personalizadas #${selectedOrder.id} para ${selectedOrder.customization.occasion} (${selectedOrder.customization.quantity} un.). Vamos acertar os detalhes da arte e os valores?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1fa952] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Conversar com o Cliente no WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {/* Items */}
            <div className="space-y-2 text-xs">
              <span className="text-stone-400 text-[10px] uppercase font-bold block">Itens do Pedido</span>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {selectedOrder.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded-xl bg-white dark:bg-stone-900 border">
                    <div className="flex items-center gap-2">
                      <img src={i.image} alt={i.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <div className="font-semibold">{i.name}</div>
                        <div className="text-[10px] text-stone-400">{i.quantity}x de R$ {i.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <span className="font-bold font-serif">R$ {(i.price * i.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Change Status Action */}
            <div className="pt-3 border-t dark:border-stone-800 flex items-center justify-between gap-3 text-xs">
              <div>
                <label className="block text-[10px] text-stone-400 font-bold uppercase mb-1">
                  Atualizar Status
                </label>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => {
                    const newSt = e.target.value as Order['orderStatus'];
                    updateOrderStatus(selectedOrder.id, newSt);
                    setSelectedOrder({ ...selectedOrder, orderStatus: newSt });
                  }}
                  className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 font-semibold text-stone-800 dark:text-stone-200"
                >
                  <option value="novo">Novo Pedido</option>
                  <option value="em_preparo">Em Preparo</option>
                  <option value="enviado">Enviado (Em trânsito)</option>
                  <option value="concluido">Concluído / Entregue</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-stone-400 block font-bold uppercase">Total do Pedido</span>
                <span className="text-xl font-bold font-serif text-[#C5A059]">
                  R$ {selectedOrder.total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
