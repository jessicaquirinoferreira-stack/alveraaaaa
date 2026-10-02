import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PdvView } from './PdvView';
import { ProductsManager } from './ProductsManager';
import { OrdersManager } from './OrdersManager';
import { SiteSettingsManager } from './SiteSettingsManager';
import { SalesReports } from './SalesReports';
import {
  Receipt,
  Flame,
  Package,
  Settings,
  TrendingUp,
  LogOut,
  ExternalLink,
  Store,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToStore: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToStore }) => {
  const { adminEmail, logoutAdmin, orders, products } = useStore();
  const [activeTab, setActiveTab] = useState<'pdv' | 'products' | 'orders' | 'reports' | 'settings'>('pdv');

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'novo').length;

  const tabs = [
    { id: 'pdv' as const, label: 'PDV (Caixa Balcão)', icon: <Receipt className="w-4 h-4" /> },
    { id: 'products' as const, label: `Produtos (${products.length})`, icon: <Flame className="w-4 h-4" /> },
    {
      id: 'orders' as const,
      label: 'Pedidos',
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : undefined,
      icon: <Package className="w-4 h-4" />,
    },
    { id: 'reports' as const, label: 'Relatórios de Vendas', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'settings' as const, label: 'Configurações & Redes', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EF] dark:bg-[#14110F] text-[#292524] dark:text-[#E7E5E4] transition-colors">
      {/* Top Admin Header */}
      <header className="bg-white dark:bg-[#1C1815] border-b border-stone-200 dark:border-stone-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <div className="flex items-center gap-3">
              <img
                src="https://i.postimg.cc/Nf2pLJ1Z/Chat-GPT-Image-30-de-set-de-2026-07-54-12.png"
                alt="Alvéra"
                className="h-10 w-auto object-contain cursor-pointer"
                onClick={onBackToStore}
              />
              <div>
                <span className="font-serif font-bold text-base tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  ALVÉRA <span className="text-[#C5A059] text-xs font-sans font-semibold">PAINEL ADMIN</span>
                </span>
                <span className="text-[10px] text-stone-400 block">
                  Autenticado como: {adminEmail || 'admin@x.com'} • Firestore Conectado
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onBackToStore}
                className="px-3.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-[#C5A059] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Store className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="hidden sm:inline">Ver Loja Virtual</span>
              </button>

              <button
                onClick={async () => {
                  await logoutAdmin();
                  onBackToStore();
                }}
                className="p-2 rounded-xl text-stone-500 hover:text-red-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Sair do Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-100 dark:border-stone-800/80">
          <div className="flex space-x-2 sm:space-x-6 overflow-x-auto py-2 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1C1917] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="bg-[#C5A059] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'pdv' && <PdvView />}
        {activeTab === 'products' && <ProductsManager />}
        {activeTab === 'orders' && <OrdersManager />}
        {activeTab === 'reports' && <SalesReports />}
        {activeTab === 'settings' && <SiteSettingsManager />}
      </main>
    </div>
  );
};
