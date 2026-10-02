import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Settings,
  Share2,
  Instagram,
  Facebook,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Save,
} from 'lucide-react';

export const SiteSettingsManager: React.FC = () => {
  const { settings, updateSettings, showToast } = useStore();

  const [form, setForm] = useState({ ...settings });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings(form);
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#C5A059]" />
            Configurações Gerais & Redes Sociais
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Personalize textos, anúncios, contatos e canais sociais da Alvéra em tempo real no Firestore.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-[#1C1917] hover:bg-[#C5A059] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] dark:hover:bg-[#D4AF37] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Salvando...' : 'Salvar Alterações'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        {/* Section 1: Brand & Home Texts */}
        <div className="bg-white dark:bg-[#1E1916] p-5 sm:p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b dark:border-stone-800">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
              Textos da Home & Banners
            </h3>
          </div>

          <div>
            <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">
              Barra Superior de Aviso / Anúncio
            </label>
            <input
              type="text"
              value={form.announcement}
              onChange={(e) => handleChange('announcement', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">
              Título Principal do Banner Hero
            </label>
            <input
              type="text"
              value={form.heroTitle}
              onChange={(e) => handleChange('heroTitle', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">
              Subtítulo do Banner Hero
            </label>
            <textarea
              rows={3}
              value={form.heroSubtitle}
              onChange={(e) => handleChange('heroSubtitle', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">
              Horários de Atendimento no Ateliê
            </label>
            <input
              type="text"
              value={form.openingHours}
              onChange={(e) => handleChange('openingHours', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Section 2: Contact info & Address */}
        <div className="bg-white dark:bg-[#1E1916] p-5 sm:p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b dark:border-stone-800">
            <Phone className="w-4 h-4 text-[#C5A059]" />
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
              Contatos Oficiais & Ateliê
            </h3>
          </div>

          <div>
            <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">
              WhatsApp Oficial de Vendas
            </label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">
              Telefone de Contato
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">
              E-mail de Atendimento
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">
              Endereço Físico do Ateliê
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Section 3: Social Media Links & Activation Toggles */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1E1916] p-5 sm:p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b dark:border-stone-800">
            <Share2 className="w-4 h-4 text-[#C5A059]" />
            <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
              Controle de Redes Sociais (Links & Ativação)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Instagram */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-stone-800 dark:text-stone-200">
                  <Instagram className="w-4 h-4 text-[#E1306C]" /> Instagram
                </span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.instagramActive}
                    onChange={(e) => handleChange('instagramActive', e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span className="text-[11px] font-semibold">{form.instagramActive ? 'Ativo' : 'Oculto'}</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="https://instagram.com/..."
                value={form.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                className="w-full p-2 rounded-lg border text-xs bg-white dark:bg-stone-800 focus:outline-none"
              />
            </div>

            {/* Facebook */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-stone-800 dark:text-stone-200">
                  <Facebook className="w-4 h-4 text-[#1877F2]" /> Facebook
                </span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.facebookActive}
                    onChange={(e) => handleChange('facebookActive', e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span className="text-[11px] font-semibold">{form.facebookActive ? 'Ativo' : 'Oculto'}</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="https://facebook.com/..."
                value={form.facebook}
                onChange={(e) => handleChange('facebook', e.target.value)}
                className="w-full p-2 rounded-lg border text-xs bg-white dark:bg-stone-800 focus:outline-none"
              />
            </div>

            {/* TikTok */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-stone-800 dark:text-stone-200">
                  TikTok
                </span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.tiktokActive}
                    onChange={(e) => handleChange('tiktokActive', e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <span className="text-[11px] font-semibold">{form.tiktokActive ? 'Ativo' : 'Oculto'}</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="https://tiktok.com/@..."
                value={form.tiktok}
                onChange={(e) => handleChange('tiktok', e.target.value)}
                className="w-full p-2 rounded-lg border text-xs bg-white dark:bg-stone-800 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
