import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Sparkles,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const cleanPhone = (settings.whatsapp || '34992495905').replace(/\D/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      showToast('Por favor, preencha os campos obrigatórios', 'error');
      return;
    }

    // Direct WhatsApp link dispatch
    const waUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(
      `Olá Alvéra! Meu nome é ${name} (${phone || email}). Mensagem: ${message}`
    )}`;
    window.open(waUrl, '_blank');
    showToast('Redirecionando sua mensagem diretamente para o WhatsApp Alvéra!', 'success');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const faqs = [
    {
      q: 'Vocês fazem encomendas personalizadas para casamentos e brindes corporativos?',
      a: 'Sim! Desenvolvemos rótulos, fragrâncias exclusivas e embalagens personalizadas para casamentos, maternidade e eventos empresariais de luxo. Entre em contato direto pelo nosso WhatsApp para um orçamento sob medida.',
    },
    {
      q: 'Quanto tempo dura a queima das velas Alvéra?',
      a: 'Nossas velas de 200g a 240g duram entre 38 a 45 horas de queima contínua, quando seguidos os rituais recomendados de aparar o pavio em 5mm e manter a queima mínima de 2 horas por sessão.',
    },
    {
      q: 'Quais transportadoras realizam a entrega?',
      a: 'Enviamos para todo o Brasil via Correios (PAC e SEDEX) e Jadlog (.Package e .Com), com cálculo de frete transparente em tempo real.',
    },
    {
      q: 'Posso retirar pessoalmente no ateliê em Uberaba?',
      a: 'Com certeza! Nosso ateliê fica na Rua Santa Juliana, 625 – Bairro Boa Vista em Uberaba - MG. Será um prazer recebê-lo(a) para sentir todas as notas olfativas de perto.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">
          Fale com a Alvéra
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] dark:text-[#FAF8F5]">
          Ateliê & Atendimento VIP
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-lg mx-auto">
          Estamos prontos para atender você com todo o carinho e tirar qualquer dúvida sobre nossos aromas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Information & Map (Cols 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              Informações Oficiais
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#C5A059]/15 text-[#C5A059]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-stone-900 dark:text-stone-100 text-sm font-serif">
                    Endereço do Ateliê
                  </strong>
                  <span className="text-stone-500 leading-relaxed block mt-0.5">
                    {settings.address || 'Rua Santa Juliana, 625 – Bairro Boa Vista, Uberaba - MG'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-stone-900 dark:text-stone-100 text-sm font-serif">
                    WhatsApp & Telefone
                  </strong>
                  <a
                    href={`https://wa.me/55${cleanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-500 hover:text-[#C5A059] block mt-0.5"
                  >
                    {settings.whatsapp || '(34) 99249-5905'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-stone-900 dark:text-stone-100 text-sm font-serif">
                    E-mail
                  </strong>
                  <a
                    href={`mailto:${settings.email || 'contato@alvera.com.br'}`}
                    className="text-stone-500 hover:text-[#C5A059] block mt-0.5"
                  >
                    {settings.email || 'contato@alvera.com.br'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-stone-900 dark:text-stone-100 text-sm font-serif">
                    Horário de Atendimento
                  </strong>
                  <span className="text-stone-500 block mt-0.5">
                    {settings.openingHours || 'Segunda a Sábado das 09h às 19h'}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-2">
              <a
                href={`https://wa.me/55${cleanPhone}?text=Ol%C3%A1%20Alv%C3%A9ra!%20Gostaria%20de%20um%20atendimento%20personalizado.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1fa952] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Iniciar Conversa no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form (Cols 7) */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                Envie uma Mensagem
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Preencha o formulário abaixo para atendimento rápido com nossas especialistas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ana Clara"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">WhatsApp / Telefone</label>
                  <input
                    type="text"
                    placeholder="(34) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Seu E-mail</label>
                <input
                  type="email"
                  placeholder="anaclara@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1 font-medium">Mensagem ou Dúvida *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Olá! Gostaria de saber mais sobre as velas personalizadas ou recomendar um aroma..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#1C1917] hover:bg-[#C5A059] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto space-y-6 pt-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> Dúvidas Frequentes
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            Perguntas & Respostas
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#1E1916] border border-stone-200 dark:border-stone-800 transition-all cursor-pointer"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="flex justify-between items-center text-xs font-semibold text-stone-900 dark:text-stone-100">
                <span className="font-serif text-sm">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-[#C5A059]' : ''
                  }`}
                />
              </div>
              {openFaq === idx && (
                <p className="mt-3 text-xs text-stone-600 dark:text-stone-400 leading-relaxed border-t dark:border-stone-800 pt-3">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
