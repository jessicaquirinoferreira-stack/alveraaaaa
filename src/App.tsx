/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingButtons } from './components/FloatingButtons';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Toast } from './components/Toast';
import { LuxuryIntro } from './components/LuxuryIntro';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CustomCandlesPage } from './pages/CustomCandlesPage';
import { ScentsGuidePage } from './pages/ScentsGuidePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { Product, ShippingOption } from './types';

const MainAppContent: React.FC = () => {
  const { isAdminAuthenticated } = useStore();

  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals & Drawers
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutShipping, setCheckoutShipping] = useState<ShippingOption | null>(null);
  const [checkoutCep, setCheckoutCep] = useState('');
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  const handleOpenCheckout = (shipping: ShippingOption | null, cep: string) => {
    setCheckoutShipping(shipping);
    setCheckoutCep(cep);
    setIsCheckoutOpen(true);
  };

  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setCurrentTab('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  // If Admin tab is active and authenticated, show full-screen admin dashboard
  if (currentTab === 'admin' && isAdminAuthenticated) {
    return (
      <>
        <AdminDashboard onBackToStore={() => setCurrentTab('home')} />
        <Toast />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#1A1614] text-[#292524] dark:text-[#E7E5E4] transition-colors selection:bg-[#D4AF37]/30">
      {/* 6-Second Luxury Brand Entrance with Candle Flame, Floating Logo & Pure Transparency */}
      {showIntro && <LuxuryIntro onComplete={() => setShowIntro(false)} />}

      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onSearch={(query) => setSearchQuery(query)}
        searchQuery={searchQuery}
      />

      {/* Main Pages */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigateToTab={(t) => {
              setCurrentTab(t);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAi={() => setIsAiOpen(true)}
          />
        )}

        {currentTab === 'products' && (
          <ProductsPage
            onSelectProduct={(p) => setSelectedProduct(p)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onNavigateToTab={(t) => {
              setCurrentTab(t);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'custom' && (
          <CustomCandlesPage
            onNavigateToTab={(t) => {
              setCurrentTab(t);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'scents' && (
          <ScentsGuidePage
            onOpenAi={() => setIsAiOpen(true)}
            onNavigateToTab={(t) => {
              setCurrentTab(t);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onNavigateToTab={(t) => {
              setCurrentTab(t);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'contact' && <ContactPage />}
      </main>

      {/* Footer with Discrete Admin Link */}
      <Footer
        onOpenAdmin={handleOpenAdmin}
        onNavigateToTab={(t) => {
          setCurrentTab(t);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Modals & Drawers */}
      <CartDrawer onOpenCheckout={handleOpenCheckout} />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialShipping={checkoutShipping}
        initialCep={checkoutCep}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onNavigateToCustom={() => {
          setSelectedProduct(null);
          setCurrentTab('custom');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <AiAssistantDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setCurrentTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Buttons: WhatsApp on Right, Sommelier IA on Left */}
      <FloatingButtons onOpenAi={() => setIsAiOpen(true)} />

      {/* Real-time Toast Notifications */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
