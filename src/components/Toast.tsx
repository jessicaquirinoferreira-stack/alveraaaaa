import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast || !toast.visible) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-amber-600" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-fade-in pointer-events-none">
      <div className="bg-[#1C1917]/95 text-[#FAF8F5] dark:bg-[#FAF8F5]/95 dark:text-[#1C1917] px-4 py-3.5 rounded-xl shadow-2xl border border-[#D4AF37]/30 backdrop-blur-md flex items-center space-x-3 pointer-events-auto">
        <div className="flex-shrink-0">{icons[toast.type]}</div>
        <p className="text-sm font-medium leading-snug">{toast.message}</p>
      </div>
    </div>
  );
};
