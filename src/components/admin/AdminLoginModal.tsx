import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Lock, Mail, ShieldAlert, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { loginAdmin } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const success = await loginAdmin(email, password);
    setIsSubmitting(false);

    if (success) {
      onSuccess();
      onClose();
    } else {
      setErrorMsg('E-mail ou senha incorretos. Utilize as credenciais fornecidas.');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@x.com');
    setPassword('admin4321');
    setErrorMsg('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-[#FAF8F5] dark:bg-[#1A1614] rounded-3xl shadow-2xl border border-[#EDE5DA] dark:border-[#2C241F] overflow-hidden p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#1C1917] dark:bg-[#FAF8F5] text-[#D4AF37] dark:text-[#1C1917] flex items-center justify-center mb-3 shadow">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Área Administrativa
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Acesso exclusivo para gestão de produtos, PDV e pedidos Alvéra.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">
                E-mail do Administrador
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="admin@x.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">
                Senha de Acesso
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* Quick autofill helper for the exact credentials from prompt */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleFillDemo}
                className="w-full py-2 px-3 rounded-xl bg-[#F3EFEA] dark:bg-[#251E19] text-stone-700 dark:text-stone-300 hover:text-[#C5A059] border border-dashed border-[#C5A059]/50 flex items-center justify-center gap-1.5 transition-colors text-[11px]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Preencher credenciais padrão (admin@x.com / admin4321)</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[#1C1917] hover:bg-[#C5A059] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] dark:hover:bg-[#D4AF37] font-bold uppercase tracking-wider text-xs transition-all shadow-md mt-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Autenticando no Firebase...' : 'Entrar no Painel Admin'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
