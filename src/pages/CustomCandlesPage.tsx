import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomCandleSpec, ShippingOption } from '../types';
import { calculateShippingOptions, fetchAddressByCep } from '../services/shippingService';
import { ALVERA_SCENT_CATALOG } from '../data/initialData';
import { AnvisaBanner } from '../components/AnvisaBanner';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Flame,
  CheckCircle2,
  Truck,
  MessageCircle,
  Heart,
  Package,
  Layers,
  Palette,
  Tag,
  Gift,
  ArrowRight,
  ShieldCheck,
  Check,
  Search,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomCandlesPageProps {
  onNavigateToTab?: (tab: string) => void;
}

export const CustomCandlesPage: React.FC<CustomCandlesPageProps> = () => {
  const { settings, createOrder, showToast } = useStore();

  // Step 1: Occasion & Quantity
  const [occasion, setOccasion] = useState('Casamento & Noivado');
  const [customOccasion, setCustomOccasion] = useState('');
  const [quantity, setQuantity] = useState<number>(30);

  // Step 2: Jar & Size
  const [jarType, setJarType] = useState('Vidro Âmbar Imperial (Tampa Madeira)');
  const [candleSize, setCandleSize] = useState('Vela Clássica 140g (~30h de queima)');

  // Step 3: Scent & Wick
  const [scentFamily, setScentFamily] = useState('Luar de Bergamota & Âmbar Dourado');
  const [wickType, setWickType] = useState('Pavio 100% Algodão Puro (Queima Limpa)');
  const [showAllScents, setShowAllScents] = useState(false);
  const [scentSearch, setScentSearch] = useState('');

  // Step 4: Decor & Wax
  const [waxColorAndDecor, setWaxColorAndDecor] = useState('Folhas de Ouro 24k no Topo');

  // Step 5: Label & Packaging
  const [labelCustomText, setLabelCustomText] = useState('');
  const [labelDate, setLabelDate] = useState('');
  const [labelStyle, setLabelStyle] = useState('Hot Stamping Dourado Metalizado');
  const [packaging, setPackaging] = useState('Caixa Rígida Individual de Luxo com Fita');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Step 6: Customer Info & Shipping
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [stateUf, setStateUf] = useState('');
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);

  // Flow State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<any | null>(null);

  const cleanShopPhone = (settings.whatsapp || '34992495905').replace(/\D/g, '');

  const occasionsList = [
    { id: 'casamento', label: 'Casamento & Noivado', desc: 'Lembranças memoráveis e aromas marcantes' },
    { id: 'maternidade', label: 'Maternidade & Batizado', desc: 'Delicadeza para a chegada do bebê' },
    { id: 'corporativo', label: 'Brinde Corporativo VIP', desc: 'Identidade olfativa e sofisticação para sua marca' },
    { id: 'aniversario', label: 'Aniversário & Bodas', desc: 'Celebrações especiais com estilo' },
    { id: 'exclusiva', label: 'Vela Exclusiva Pessoal', desc: 'Para decorar ou presentear alguém especial' },
    { id: 'outro', label: 'Outro Evento', desc: 'Projetos sob medida' },
  ];

  const jarsList = [
    {
      id: 'ambar',
      name: 'Vidro Âmbar Imperial (Tampa Madeira)',
      img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=400&q=80',
      badge: 'Mais Escolhido',
    },
    {
      id: 'transparente',
      name: 'Vidro Cristal Transparente (Tampa Ouro)',
      img: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=400&q=80',
      badge: 'Minimalista',
    },
    {
      id: 'ceramica',
      name: 'Cerâmica Artesanal Off-White',
      img: 'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=400&q=80',
      badge: 'Super Luxo',
    },
    {
      id: 'lata_ouro',
      name: 'Lata Metalizada Ouro Nobre',
      img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
      badge: 'Prático & Elegante',
    },
  ];

  const sizesList = [
    { name: 'Mini Vela 40g (Ideal Lembrancinha)', burn: '~12 horas de queima' },
    { name: 'Vela Clássica 140g (~30h de queima)', burn: 'Tamanho padrão de presentes' },
    { name: 'Vela Premium 210g (~42h de queima)', burn: 'Experiência sensorial completa' },
    { name: 'Vela Luxury 350g (2 Pavios)', burn: 'Peça imponente para grandes espaços' },
  ];

  const scentsList = [
    { name: 'Luar de Bergamota & Âmbar Dourado', mood: 'Cítrico solar, acolhedor e energizante' },
    { name: 'Flor de Cerejeira & Baunilha Bourbon', mood: 'Doçura aveludada, romantismo e encanto' },
    { name: 'Lavanda Francesa & Alecrim do Campo', mood: 'Relaxamento profundo, paz mental e serenidade' },
    { name: 'Cedro Nobre & Cardamomo Negro', mood: 'Amadeirado imponente, sofisticação e foco' },
    { name: 'Brisa de Alecrim & Chá Branco', mood: 'Frescor botânico, pureza e leveza floral' },
    { name: 'Aroma Sob Medida (Criar com Perfumista)', mood: 'Desenvolvemos uma essência inédita para o seu evento' },
  ];

  const decorOptions = [
    { name: 'Folhas de Ouro 24k no Topo', desc: 'Toque cintilante de realeza sobre a cera derramada' },
    { name: 'Cristais Naturais (Quartzo Rosa / Ametista)', desc: 'Energização e beleza mineral orgânica' },
    { name: 'Botões de Flores Secas & Lavanda', desc: 'Romantismo botânico e rusticidade nobre' },
    { name: 'Cera Pura Lisa Minimalista', desc: 'Acabamento acetinado impecável e clássico' },
  ];

  const labelStyles = [
    { name: 'Hot Stamping Dourado Metalizado', desc: 'Brilho espelhado dourado de alto padrão' },
    { name: 'Vinil Fosco Minimalista Touch', desc: 'Elegância contemporânea e toque sedoso' },
    { name: 'Papel Kraft Botânico Rústico', desc: 'Estilo acolhedor, artesanal e sustentável' },
    { name: 'Gravação a Laser na Tampa de Madeira', desc: 'Gravação indelével de monogramas e nomes' },
  ];

  const packagingList = [
    { name: 'Caixa Rígida Individual de Luxo com Fita', desc: 'Apresentação mais sofisticada do mercado' },
    { name: 'Saquinho de Linho / Algodão Cru Botânico', desc: 'Embalagem delicada e sustentável reutilizável' },
    { name: 'Embalagem Transparente com Laço de Gorgurão', desc: 'Realça a beleza visual do frasco com tag' },
    { name: 'Sem Embalagem Individual (Apenas a vela finalizada)', desc: 'Ideal para compor caixas que você já possui' },
  ];

  // CEP Lookup
  const handleCepChange = async (val: string) => {
    setCep(val);
    const clean = val.replace(/\D/g, '');
    if (clean.length === 8) {
      setIsLoadingCep(true);
      const addr = await fetchAddressByCep(clean);
      if (addr) {
        setStreet(addr.logradouro || '');
        setNeighborhood(addr.bairro || '');
        setCity(addr.localidade || '');
        setStateUf(addr.uf || '');

        // Estimate freight for custom candle batch
        const options = calculateShippingOptions(clean, addr.uf, 250);
        setShippingOptions(options);
        if (options.length > 0) {
          setSelectedShipping(options[0]);
        }
      }
      setIsLoadingCep(false);
    }
  };

  // Build WhatsApp formatted message
  const buildWhatsAppMessage = (quoteId: string) => {
    const finalOccasion = occasion === 'Outro Evento' && customOccasion ? customOccasion : occasion;
    const shippingDesc = selectedShipping
      ? `${selectedShipping.carrier} ${selectedShipping.service} (${selectedShipping.days} dias úteis) - R$ ${selectedShipping.price.toFixed(2)}`
      : 'A calcular';

    const fullAddr = street
      ? `${street}, nº ${number || 'S/N'}${complement ? ` (${complement})` : ''} - ${neighborhood}, ${city} - ${stateUf}, CEP: ${cep}`
      : 'Endereço a combinar';

    return `*ALVÉRA VELAS • PEDIDO DE PERSONALIZAÇÃO #${quoteId}*
━━━━━━━━━━━━━━━━━━━━
Olá, equipe Alvéra! Acabei de configurar minhas *Velas Personalizadas* no site e gostaria de fechar a personalização e o orçamento final com vocês.

🕯️ *DETALHES DA PERSONALIZAÇÃO:*
• *Ocasião/Evento:* ${finalOccasion}
• *Quantidade:* ${quantity} unidades
• *Frasco/Recipiente:* ${jarType}
• *Tamanho/Gramatura:* ${candleSize}
• *Aroma/Família Olfativa:* ${scentFamily}
• *Tipo de Pavio:* ${wickType}
• *Decoração da Cera:* ${waxColorAndDecor}

🏷️ *RÓTULO & IDENTIDADE:*
• *Texto/Nomes/Logo:* ${labelCustomText || 'A definir com a designer'}
• *Data Comemorativa:* ${labelDate || 'Não informada'}
• *Acabamento do Rótulo:* ${labelStyle}
• *Embalagem:* ${packaging}
${additionalNotes ? `• *Observações:* ${additionalNotes}` : ''}

🚚 *ENTREGA & FRETE ESTIMADO:*
• *Destino:* ${fullAddr}
• *Transportadora Escolhida:* ${shippingDesc}

👤 *DADOS DO CLIENTE:*
• *Nome:* ${customerName}
• *WhatsApp:* ${customerPhone}
• *E-mail:* ${customerEmail || 'Não informado'}
━━━━━━━━━━━━━━━━━━━━
Gostaria de confirmar a amostra digital da arte, o prazo de produção e finalizar os valores! ✨`;
  };

  // Submit Quote & Redirect
  const handleSubmitCustomQuote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      showToast('Por favor, informe seu nome completo.', 'error');
      return;
    }
    if (!customerPhone.trim()) {
      showToast('Por favor, informe seu telefone / WhatsApp para retorno.', 'error');
      return;
    }
    if (!cep.trim()) {
      showToast('Por favor, informe seu CEP para cálculo do frete.', 'error');
      return;
    }

    setIsSubmitting(true);

    const spec: CustomCandleSpec = {
      occasion: occasion === 'Outro Evento' && customOccasion ? customOccasion : occasion,
      quantity,
      jarType,
      candleSize,
      scentFamily,
      waxColorAndDecor,
      wickType,
      labelCustomText: labelCustomText || 'A combinar',
      labelDate,
      labelStyle,
      packaging,
      additionalNotes,
    };

    const fullAddr = `${street || 'Rua a informar'}, nº ${number || 'S/N'}${complement ? ` (${complement})` : ''} - ${neighborhood || ''}, ${city || ''} - ${stateUf || ''}, CEP: ${cep}`;
    const shippingPrice = selectedShipping ? selectedShipping.price : 0;
    const shippingName = selectedShipping ? `${selectedShipping.carrier} ${selectedShipping.service}` : 'Frete sob consulta';

    try {
      const order = await createOrder({
        customerName,
        customerPhone,
        customerEmail: customerEmail || 'orcamento@alvera.com.br',
        customerAddress: fullAddr,
        cep,
        shippingMethod: shippingName,
        shippingPrice,
        items: [
          {
            productId: 'custom-batch',
            name: `Lote de ${quantity}x Velas Personalizadas (${spec.occasion})`,
            price: 0, // Quote to be finalized via WhatsApp
            quantity,
            image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
            customizationDetails: JSON.stringify(spec),
          },
        ],
        subtotal: 0,
        total: shippingPrice,
        paymentMethod: 'whatsapp_custom',
        paymentStatus: 'orcamento',
        orderStatus: 'orcamento_whatsapp',
        isPDV: false,
        isCustomQuote: true,
        customization: spec,
        notes: `Personalização para ${spec.occasion} (${quantity} un.). Rótulo: "${spec.labelCustomText}". Envio direto para WhatsApp da loja.`,
      });

      setSubmittedQuote(order);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      showToast('Especificação gravada com sucesso! Abrindo o WhatsApp oficial...', 'success');

      // Dispatch WhatsApp message to store number
      const waMsg = buildWhatsAppMessage(order.id);
      const waUrl = `https://wa.me/55${cleanShopPhone}?text=${encodeURIComponent(waMsg)}`;

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 700);
    } catch {
      showToast('Erro ao gravar cotação. Você pode enviar diretamente pelo WhatsApp.', 'info');
      const waMsg = buildWhatsAppMessage(`orc_${Date.now()}`);
      window.open(`https://wa.me/55${cleanShopPhone}?text=${encodeURIComponent(waMsg)}`, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Ateliê de Criação Sob Medida
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] dark:text-[#FAF8F5]">
          Velas Personalizadas & Lembranças VIP
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto">
          Crie uma experiência olfativa única para casamentos, maternidade, aniversários ou brindes corporativos.
          Cadastre suas preferências, calcule o frete em tempo real e <strong>feche todos os detalhes da personalização e valores diretamente no WhatsApp da loja</strong>.
        </p>
      </div>

      {/* Success Modal / Card when Quote is Created */}
      {submittedQuote && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-white dark:bg-[#1E1916] border-2 border-[#C5A059] shadow-2xl text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            Personalização Enviada para a Alvéra!
          </h2>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Seu pedido de personalização <strong>#{submittedQuote.id}</strong> foi registrado em nosso ateliê com sucesso.
            Se a janela do WhatsApp não abriu automaticamente, clique no botão abaixo para conversar com nossa perfumista e alinhar a arte, o prazo e a forma de pagamento:
          </p>

          <div className="pt-2">
            <a
              href={`https://wa.me/55${cleanShopPhone}?text=${encodeURIComponent(
                buildWhatsAppMessage(submittedQuote.id)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#1fa952] text-white font-bold text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Abrir WhatsApp da Loja Agora ({settings.whatsapp || '(34) 99249-5905'})</span>
            </a>
          </div>
        </motion.div>
      )}

      {/* Customizer Builder Form */}
      <form onSubmit={handleSubmitCustomQuote} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form Steps (Cols 8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* STEP 1: Ocasião & Quantidade */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b dark:border-stone-800">
              <span className="w-7 h-7 rounded-full bg-[#C5A059] text-white text-xs font-bold flex items-center justify-center font-serif">
                1
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  Ocasião & Quantidade de Velas
                </h3>
                <span className="text-[11px] text-stone-400">Qual momento especial você irá celebrar?</span>
              </div>
            </div>

            {/* Occasions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {occasionsList.map((occ) => (
                <button
                  type="button"
                  key={occ.id}
                  onClick={() => setOccasion(occ.label)}
                  className={`p-3.5 rounded-2xl border text-left transition-all text-xs cursor-pointer ${
                    occasion === occ.label
                      ? 'border-[#C5A059] bg-[#C5A059]/10 shadow-sm'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                  }`}
                >
                  <span className="font-bold text-stone-900 dark:text-stone-100 block">{occ.label}</span>
                  <span className="text-[10px] text-stone-500 block mt-1 leading-snug">{occ.desc}</span>
                </button>
              ))}
            </div>

            {occasion === 'Outro Evento' && (
              <input
                type="text"
                placeholder="Descreva o seu evento especial..."
                value={customOccasion}
                onChange={(e) => setCustomOccasion(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs focus:outline-none focus:border-[#C5A059]"
              />
            )}

            {/* Quantity Selector */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                Quantidade Desejada: <span className="text-[#C5A059] text-sm font-serif">{quantity} unidades</span>
              </label>

              <div className="flex flex-wrap gap-2 mb-3">
                {[1, 10, 20, 30, 50, 100, 150, 200].map((qty) => (
                  <button
                    type="button"
                    key={qty}
                    onClick={() => setQuantity(qty)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      quantity === qty
                        ? 'bg-[#1C1917] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] border-transparent'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                    }`}
                  >
                    {qty} un.
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="1"
                max="300"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-[#C5A059]"
              />
            </div>
          </div>

          {/* STEP 2: Frasco & Tamanho */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b dark:border-stone-800">
              <span className="w-7 h-7 rounded-full bg-[#C5A059] text-white text-xs font-bold flex items-center justify-center font-serif">
                2
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  Modelo do Recipiente & Tamanho
                </h3>
                <span className="text-[11px] text-stone-400">Escolha a estética física que harmoniza com seu evento</span>
              </div>
            </div>

            {/* Jars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {jarsList.map((jar) => (
                <div
                  key={jar.id}
                  onClick={() => setJarType(jar.name)}
                  className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                    jarType === jar.name
                      ? 'border-[#C5A059] bg-[#C5A059]/10 shadow-sm'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                  }`}
                >
                  <img src={jar.img} alt={jar.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#C5A059] uppercase block">{jar.badge}</span>
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block truncate">
                      {jar.name}
                    </span>
                  </div>
                  {jarType === jar.name && <Check className="w-4 h-4 text-[#C5A059] flex-shrink-0" />}
                </div>
              ))}
            </div>

            {/* Size Options */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                Gramatura / Duração:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {sizesList.map((sz, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setCandleSize(sz.name)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      candleSize === sz.name
                        ? 'border-[#C5A059] bg-[#C5A059]/10 font-bold'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-stone-900 dark:text-stone-100 block">{sz.name}</span>
                    <span className="text-[10px] text-stone-400 font-normal">{sz.burn}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 3: Aroma & Pavio */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b dark:border-stone-800">
              <span className="w-7 h-7 rounded-full bg-[#C5A059] text-white text-xs font-bold flex items-center justify-center font-serif">
                3
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  Fragrância Nobre & Tipo de Pavio
                </h3>
                <span className="text-[11px] text-stone-400">A identidade olfativa que os convidados vão guardar na memória</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {scentsList.map((scent, i) => (
                <div
                  key={i}
                  onClick={() => setScentFamily(scent.name)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    scentFamily === scent.name
                      ? 'border-[#C5A059] bg-[#C5A059]/10 font-semibold'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                  }`}
                >
                  <span className="text-stone-900 dark:text-stone-100 block">{scent.name}</span>
                  <span className="text-[10px] text-stone-500 font-normal leading-tight block mt-0.5">
                    {scent.mood}
                  </span>
                </div>
              ))}

              {/* Special option from Foto 1 */}
              <div
                onClick={() => setScentFamily('Escolha das Essências no Chat (Via WhatsApp)')}
                className={`p-3 rounded-xl border cursor-pointer transition-all sm:col-span-2 ${
                  scentFamily.includes('Chat')
                    ? 'border-[#25D366] bg-[#25D366]/10 font-semibold text-[#1e8f46] dark:text-[#25D366]'
                    : 'border-[#C5A059]/50 bg-amber-50/50 dark:bg-amber-950/20 hover:border-[#C5A059]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    ESCOLHA DAS ESSÊNCIAS NO CHAT (Definir com a Perfumista no WhatsApp)
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 block mt-1">
                  Selecione esta opção para enviar seu pedido e definir o blend exclusivo diretamente pelo WhatsApp da loja.
                </span>
              </div>
            </div>

            {/* Toggle Full Catalog of ~75 Fragrances (Foto 1) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAllScents(!showAllScents)}
                className="w-full py-2.5 px-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 hover:border-[#C5A059] text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Ver Catálogo Completo (~75 Essências para Velas Aromáticas)</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showAllScents ? 'rotate-180' : ''}`} />
              </button>

              {showAllScents && (
                <div className="mt-3 p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Pesquisar entre as 75 essências..."
                      value={scentSearch}
                      onChange={(e) => setScentSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                    {ALVERA_SCENT_CATALOG.filter((s) =>
                      s.name.toLowerCase().includes(scentSearch.toLowerCase()) ||
                      s.categoryLabel.toLowerCase().includes(scentSearch.toLowerCase())
                    ).map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => {
                          setScentFamily(s.name);
                          setShowAllScents(false);
                        }}
                        className={`p-2 rounded-lg border text-left text-[11px] transition-all cursor-pointer ${
                          scentFamily === s.name
                            ? 'border-[#C5A059] bg-[#C5A059]/20 font-bold'
                            : 'border-stone-200 dark:border-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <span className="text-[9px] uppercase text-[#C5A059] block font-bold truncate">
                          {s.categoryLabel}
                        </span>
                        <span className="text-stone-900 dark:text-stone-100 block truncate font-medium">
                          {s.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Wick Selection */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                Tipo de Pavio:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { name: 'Pavio 100% Algodão Puro (Queima Limpa)', desc: 'Chama clássica, serena e silenciosa' },
                  { name: 'Pavio de Madeira com Estalo', desc: 'Som suave crepitante de lareira aconchegante' },
                ].map((w, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setWickType(w.name)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      wickType === w.name
                        ? 'border-[#C5A059] bg-[#C5A059]/10 font-bold'
                        : 'border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <span className="text-stone-900 dark:text-stone-100 block">{w.name}</span>
                    <span className="text-[10px] text-stone-400 font-normal">{w.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 4: Decoração & Toque Especial */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b dark:border-stone-800">
              <span className="w-7 h-7 rounded-full bg-[#C5A059] text-white text-xs font-bold flex items-center justify-center font-serif">
                4
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  Decoração e Acabamento da Cera
                </h3>
                <span className="text-[11px] text-stone-400">Detalhes artesanais que encantam no primeiro olhar</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {decorOptions.map((dec, i) => (
                <div
                  key={i}
                  onClick={() => setWaxColorAndDecor(dec.name)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    waxColorAndDecor === dec.name
                      ? 'border-[#C5A059] bg-[#C5A059]/10 font-bold'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                  }`}
                >
                  <span className="text-stone-900 dark:text-stone-100 block">{dec.name}</span>
                  <span className="text-[10px] text-stone-500 font-normal leading-tight block mt-0.5">
                    {dec.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 5: Rótulo & Embalagem */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b dark:border-stone-800">
              <span className="w-7 h-7 rounded-full bg-[#C5A059] text-white text-xs font-bold flex items-center justify-center font-serif">
                5
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  Rótulo Personalizado & Embalagem
                </h3>
                <span className="text-[11px] text-stone-400">Nossa designer monta a arte e envia no WhatsApp para aprovação</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1 font-semibold">
                  Nomes, Monograma ou Logo:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Beatriz & Lucas / Theo / Sua Marca"
                  value={labelCustomText}
                  onChange={(e) => setLabelCustomText(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1 font-semibold">
                  Data Comemorativa ou Frase:
                </label>
                <input
                  type="text"
                  placeholder="Ex: 14.11.2026 / O aroma do nosso amor"
                  value={labelDate}
                  onChange={(e) => setLabelDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* Label Style */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                Acabamento do Rótulo:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {labelStyles.map((st, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setLabelStyle(st.name)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      labelStyle === st.name
                        ? 'border-[#C5A059] bg-[#C5A059]/10 font-bold'
                        : 'border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <span className="text-stone-900 dark:text-stone-100 block">{st.name}</span>
                    <span className="text-[10px] text-stone-500 font-normal">{st.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Packaging */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                Embalagem Final:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {packagingList.map((pkg, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setPackaging(pkg.name)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      packaging === pkg.name
                        ? 'border-[#C5A059] bg-[#C5A059]/10 font-bold'
                        : 'border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <span className="text-stone-900 dark:text-stone-100 block">{pkg.name}</span>
                    <span className="text-[10px] text-stone-500 font-normal">{pkg.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-stone-700 dark:text-stone-300 mb-1 font-semibold text-xs">
                Observações Especiais (Cores, Fita, Referências):
              </label>
              <textarea
                rows={2}
                placeholder="Ex: Gostaria de fita verde oliva no laço e rótulo com fonte cursiva fina..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          {/* STEP 6: Dados do Cliente & Frete */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b dark:border-stone-800">
              <span className="w-7 h-7 rounded-full bg-[#C5A059] text-white text-xs font-bold flex items-center justify-center font-serif">
                6
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  Dados de Contato & Cálculo de Frete
                </h3>
                <span className="text-[11px] text-stone-400">
                  Cálculo automático via Correios e Jadlog para envio do lote
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1 font-semibold">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Gabriela Duarte"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1 font-semibold">
                  WhatsApp com DDD * (Para envio da arte)
                </label>
                <input
                  type="text"
                  required
                  placeholder="(34) 99999-9999"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-700 dark:text-stone-300 mb-1 font-semibold">
                  E-mail para Envio da Proposta
                </label>
                <input
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* Address & CEP */}
            <div className="pt-2 border-t dark:border-stone-800 space-y-3">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                Endereço de Entrega & Cotação de Frete:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-500 mb-1">CEP de Entrega *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="00000-000"
                      value={cep}
                      onChange={(e) => handleCepChange(e.target.value)}
                      maxLength={9}
                      className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-[#C5A059]"
                    />
                    {isLoadingCep && (
                      <span className="absolute right-3 top-3 text-[10px] text-[#C5A059] animate-pulse">
                        Buscando...
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-500 mb-1">Rua / Logradouro</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Nome da Rua"
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-500 mb-1">Número</label>
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="123"
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-500 mb-1">Bairro</label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Bairro"
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-500 mb-1">Cidade / UF</label>
                  <input
                    type="text"
                    value={city ? `${city} - ${stateUf}` : ''}
                    readOnly
                    placeholder="Cidade - UF"
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Shipping Options Calculated in Real-time */}
              {shippingOptions.length > 0 && (
                <div className="mt-4 pt-3 border-t dark:border-stone-800 space-y-2">
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#C5A059]" /> Opções de Frete Calculadas:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {shippingOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          selectedShipping?.id === opt.id
                            ? 'border-[#C5A059] bg-[#C5A059]/10 shadow-sm'
                            : 'border-stone-200 dark:border-stone-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="custom_shipping"
                            checked={selectedShipping?.id === opt.id}
                            onChange={() => setSelectedShipping(opt)}
                            className="accent-[#C5A059]"
                          />
                          <div>
                            <span className="font-bold block">{opt.service}</span>
                            <span className="text-[10px] text-stone-500">Prazo: ~{opt.days} dias úteis</span>
                          </div>
                        </div>
                        <span className="font-serif font-bold text-stone-900 dark:text-stone-100">
                          R$ {opt.price.toFixed(2).replace('.', ',')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live Summary & Direct WhatsApp Dispatch (Cols 4) */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E1916] border border-[#EDE5DA] dark:border-[#2C241F] shadow-xl space-y-4 text-xs">
            <div className="flex items-center gap-2 pb-3 border-b dark:border-stone-800">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
                Resumo da Personalização
              </h3>
            </div>

            <div className="space-y-2.5 text-stone-600 dark:text-stone-300">
              <div className="flex justify-between border-b pb-1.5 dark:border-stone-800">
                <span className="text-stone-400">Ocasião:</span>
                <span className="font-bold text-stone-900 dark:text-stone-100 text-right">{occasion}</span>
              </div>

              <div className="flex justify-between border-b pb-1.5 dark:border-stone-800">
                <span className="text-stone-400">Lote:</span>
                <span className="font-bold text-[#C5A059] text-right font-serif text-sm">{quantity} unidades</span>
              </div>

              <div className="flex justify-between border-b pb-1.5 dark:border-stone-800">
                <span className="text-stone-400">Frasco:</span>
                <span className="font-medium text-stone-900 dark:text-stone-100 text-right truncate max-w-[170px]">
                  {jarType}
                </span>
              </div>

              <div className="flex justify-between border-b pb-1.5 dark:border-stone-800">
                <span className="text-stone-400">Gramatura:</span>
                <span className="font-medium text-stone-900 dark:text-stone-100 text-right truncate max-w-[170px]">
                  {candleSize}
                </span>
              </div>

              <div className="flex justify-between border-b pb-1.5 dark:border-stone-800">
                <span className="text-stone-400">Aroma:</span>
                <span className="font-medium text-stone-900 dark:text-stone-100 text-right truncate max-w-[170px]">
                  {scentFamily}
                </span>
              </div>

              <div className="flex justify-between border-b pb-1.5 dark:border-stone-800">
                <span className="text-stone-400">Cera / Topo:</span>
                <span className="font-medium text-stone-900 dark:text-stone-100 text-right truncate max-w-[170px]">
                  {waxColorAndDecor}
                </span>
              </div>

              <div className="flex justify-between border-b pb-1.5 dark:border-stone-800">
                <span className="text-stone-400">Rótulo:</span>
                <span className="font-medium text-stone-900 dark:text-stone-100 text-right truncate max-w-[170px]">
                  {labelCustomText || 'A combinar'}
                </span>
              </div>

              {selectedShipping && (
                <div className="flex justify-between border-b pb-1.5 dark:border-stone-800">
                  <span className="text-stone-400">Frete ({selectedShipping.carrier}):</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100 text-right">
                    R$ {selectedShipping.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              )}
            </div>

            {/* Note on WhatsApp closure */}
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-200 leading-snug">
              ✦ <strong>Valores e Arte via WhatsApp:</strong> O orçamento oficial do lote com descontos progressivos por quantidade e o mockup digital da arte são validados e fechados diretamente no WhatsApp do ateliê.
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1fa952] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-50"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              <span>
                {isSubmitting
                  ? 'Registrando e Abrindo WhatsApp...'
                  : 'Enviar Resumo Completo pro WhatsApp da Loja'}
              </span>
            </button>

            <div className="text-[10px] text-center text-stone-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Atendimento Direto com a Perfumista • (34) 99249-5905</span>
            </div>
          </div>
        </div>
      </form>

      {/* Conformidade e Regulamentação ANVISA (Foto 4) */}
      <AnvisaBanner />
    </div>
  );
};
