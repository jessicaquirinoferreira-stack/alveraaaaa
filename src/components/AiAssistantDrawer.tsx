import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { askAlveraAssistant } from '../services/aiAssistantService';
import { X, Send, Sparkles, MessageCircle, Instagram, Flame, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({ isOpen, onClose }) => {
  const { settings } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Olá! Sou a Concierge Alvéra, sua consultora de aromas e bem-estar. Como posso iluminar seu dia hoje? Posso sugerir o aroma ideal para o seu momento, ensinar segredos de queima ou te ajudar a escolher um presente memorável.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Qual vela ajuda no sono e ansiedade?',
    'Aroma acolhedor para receber amigos na sala',
    'Como cuidar da vela para durar mais?',
    'Sugestão de presente inesquecível',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isTyping) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
        text: m.text,
      }));

      const reply = await askAlveraAssistant(query, history);

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: 'Nossas velas artesanais são feitas à mão com ceras vegetais e essências nobres. Ficou com alguma dúvida específica? Fale agora mesmo com nossa equipe pelo WhatsApp (34) 99249-5905!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const cleanPhone = (settings.whatsapp || '34992495905').replace(/\D/g, '');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Drawer Panel on Left side */}
        <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#FAF8F5] dark:bg-[#1A1614] shadow-2xl border-r border-[#EDE5DA] dark:border-[#2C241F] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#EAE3D9] dark:border-[#2A2421] bg-white/70 dark:bg-[#201A16]/70 backdrop-blur flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://i.postimg.cc/HsPGcFDK/Destaque-Instagram-Virginia-Oliveira-4.png"
                    alt="Concierge Alvéra"
                    className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white"></span>
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    Concierge Alvéra IA
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  </h3>
                  <span className="text-[11px] text-[#A8A29E] tracking-tight">
                    Sommelier de Velas & Aromaterapia
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-stone-500 hover:text-black dark:hover:text-white"
                aria-label="Fechar concierge"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                      m.sender === 'user'
                        ? 'bg-[#1C1917] text-white rounded-br-none'
                        : 'bg-white dark:bg-[#221C18] text-stone-800 dark:text-stone-200 border border-[#EDE5DA] dark:border-[#2D2520] rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">{m.text}</div>
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 px-1">{m.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-[#221C18] border border-stone-200 dark:border-stone-800 w-24">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce [animation-delay:0.4s]"></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 bg-[#F5EFEB] dark:bg-[#201A16] border-t border-[#EAE3D9] dark:border-[#2A2421] overflow-x-auto flex gap-2 scrollbar-none">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white dark:bg-[#28221D] border border-stone-200 dark:border-stone-700 text-[11px] text-stone-700 dark:text-stone-300 hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Direct Channel Callouts */}
            <div className="px-4 py-2.5 bg-[#FAF8F5] dark:bg-[#1A1614] border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">Canais Oficiais:</span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/55${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#25D366] font-semibold hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
                <a
                  href={settings.instagram || 'https://instagram.com/alvera.aromas'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#E1306C] font-semibold hover:underline"
                >
                  <Instagram className="w-3.5 h-3.5" /> Instagram
                </a>
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-[#EAE3D9] dark:border-[#2A2421] bg-white dark:bg-[#201A16]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Pergunte sobre aromas, queima ou presentes..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 text-xs px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-[#C5A059]"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="p-3 rounded-xl bg-[#1C1917] hover:bg-[#C5A059] text-white disabled:opacity-40 transition-colors shadow-sm"
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
