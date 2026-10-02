import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Sun, Moon, Search, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onSearch,
  searchQuery,
}) => {
  const { settings, cartCount, openCart, theme, toggleTheme } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Início' },
    { id: 'products', label: 'Coleções' },
    { id: 'custom', label: 'Personalizadas', badge: 'Sob Medida' },
    { id: 'scents', label: 'Guia Olfativo' },
    { id: 'about', label: 'Nossa Alma' },
    { id: 'contact', label: 'Ateliê & Contato' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-300">
      {/* Announcement Bar */}
      {settings.announcement && (
        <div className="bg-[#1C1917] text-[#D4AF37] dark:bg-[#12100E] dark:text-[#E6CA65] text-xs py-2 px-4 text-center font-medium tracking-wider flex items-center justify-center gap-2 border-b border-[#D4AF37]/20">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />
          <span>{settings.announcement}</span>
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />
        </div>
      )}

      {/* Main Bar with Glassmorphism */}
      <nav className="bg-[#FAF8F5]/90 dark:bg-[#1A1614]/90 backdrop-blur-md border-b border-[#E7DFD5] dark:border-[#2E2824] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#57534E] dark:text-[#D6D3D1] hover:text-[#C5A059] focus:outline-none"
                aria-label="Abrir menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
              <img
                src="https://i.postimg.cc/Nf2pLJ1Z/Chat-GPT-Image-30-de-set-de-2026-07-54-12.png"
                alt="Alvéra Logo"
                className="h-14 w-auto object-contain filter drop-shadow-sm hover:scale-105 transition-transform duration-300"
              />
              <div className="ml-3 hidden sm:block">
                <span className="font-serif text-2xl tracking-widest text-[#1C1917] dark:text-[#FAF8F5] font-semibold block leading-tight">
                  ALVÉRA
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A059] dark:text-[#D4AF37] font-medium block">
                  Velas • Aromas • Bem-Estar
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-7">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm tracking-widest uppercase transition-all duration-200 py-1 relative flex items-center gap-1.5 ${
                    currentTab === link.id
                      ? 'text-[#C5A059] dark:text-[#E6CA65] font-semibold'
                      : 'text-[#44403C] dark:text-[#A8A29E] hover:text-[#C5A059] dark:hover:text-[#E6CA65]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#C5A059]/20 text-[#C5A059] dark:bg-[#D4AF37]/25 dark:text-[#E6CA65] font-bold tracking-tight">
                      {link.badge}
                    </span>
                  )}
                  {currentTab === link.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C5A059] dark:bg-[#E6CA65] rounded-full animate-fade-in" />
                  )}
                </button>
              ))}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Toggle / Input */}
              <div className="relative">
                {isSearchOpen ? (
                  <div className="flex items-center bg-[#F3EFEA] dark:bg-[#28221E] rounded-full px-3 py-1.5 border border-[#D4AF37]/40 w-44 sm:w-60 transition-all">
                    <Search className="w-4 h-4 text-[#C5A059] mr-2" />
                    <input
                      type="text"
                      placeholder="Buscar aromas, velas..."
                      value={searchQuery}
                      onChange={(e) => {
                        onSearch(e.target.value);
                        if (currentTab !== 'products') setCurrentTab('products');
                      }}
                      autoFocus
                      className="bg-transparent text-xs text-[#1C1917] dark:text-[#FAF8F5] focus:outline-none w-full"
                    />
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        onSearch('');
                      }}
                      className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-[#57534E] dark:text-[#D6D3D1] hover:text-[#C5A059] dark:hover:text-[#E6CA65] transition-colors"
                    aria-label="Pesquisar produtos"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Dark/Light Mode Switcher */}
              <button
                onClick={toggleTheme}
                className="p-2 text-[#57534E] dark:text-[#D6D3D1] hover:text-[#C5A059] dark:hover:text-[#E6CA65] transition-colors rounded-full"
                aria-label="Alternar tema"
                title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-[#E6CA65]" />
                ) : (
                  <Moon className="w-5 h-5 text-[#57534E]" />
                )}
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={openCart}
                className="relative p-2.5 rounded-full bg-[#1C1917] text-[#FAF8F5] dark:bg-[#FAF8F5] dark:text-[#1C1917] hover:scale-105 transition-all shadow-md group"
                aria-label="Ver sacola"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF8F5] dark:bg-[#1A1614] border-b border-[#E7DFD5] dark:border-[#2E2824] px-4 pt-2 pb-6 space-y-3 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center justify-between w-full text-left py-2.5 px-3 rounded-lg text-sm tracking-wider uppercase ${
                  currentTab === link.id
                    ? 'bg-[#C5A059]/15 text-[#C5A059] font-semibold'
                    : 'text-[#44403C] dark:text-[#A8A29E]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C5A059]/20 text-[#C5A059] dark:text-[#E6CA65] font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
