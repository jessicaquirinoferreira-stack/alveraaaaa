import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ShippingOption } from '../types';
import { calculateShippingOptions, fetchAddressByCep } from '../services/shippingService';
import {
  createInfinitePayPix,
  processInfinitePayCard,
  InfinitePayPixResponse,
} from '../services/infinitePayService';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle2,
  Copy,
  Clock,
  Printer,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialShipping: ShippingOption | null;
  initialCep: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialShipping,
  initialCep,
}) => {
  const { cart, cartSubtotal, createOrder, clearCart, settings, showToast } = useStore();

  // Customer Form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');

  // Address
  const [cep, setCep] = useState(initialCep || '');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [stateUf, setStateUf] = useState('');
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  // Shipping
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(initialShipping);

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState(1);

  // Flow State
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixData, setPixData] = useState<InfinitePayPixResponse | null>(null);
  const [orderCompleted, setOrderCompleted] = useState<any | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  // Load address if initial CEP provided
  useEffect(() => {
    if (initialCep && initialCep.replace(/\D/g, '').length === 8) {
      handleCepLookup(initialCep);
    }
  }, [initialCep]);

  const handleCepLookup = async (inputCep: string) => {
    const clean = inputCep.replace(/\D/g, '');
    if (clean.length !== 8) return;

    setIsLoadingCep(true);
    const addr = await fetchAddressByCep(clean);
    if (addr) {
      setStreet(addr.logradouro || '');
      setNeighborhood(addr.bairro || '');
      setCity(addr.localidade || '');
      setStateUf(addr.uf || '');

      const options = calculateShippingOptions(clean, addr.uf, cartSubtotal);
      setShippingOptions(options);
      if (!selectedShipping && options.length > 0) {
        setSelectedShipping(options[0]);
      }
    }
    setIsLoadingCep(false);
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCep(val);
    if (val.replace(/\D/g, '').length === 8) {
      handleCepLookup(val);
    }
  };

  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const grandTotal = cartSubtotal + shippingCost;

  const validateForm = () => {
    if (!name.trim()) {
      showToast('Por favor, informe seu nome completo', 'error');
      return false;
    }
    if (!phone.trim()) {
      showToast('Por favor, informe seu telefone / WhatsApp', 'error');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      showToast('Por favor, informe um e-mail válido', 'error');
      return false;
    }
    if (!cep.trim() || !street.trim() || !number.trim() || !city.trim()) {
      showToast('Por favor, preencha o endereço de entrega completo', 'error');
      return false;
    }
    if (!selectedShipping) {
      showToast('Por favor, selecione uma modalidade de frete (Correios ou Jadlog)', 'error');
      return false;
    }
    return true;
  };

  const handleStartInfinitePayPix = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    const tempOrderId = `ped_${Date.now()}`;
    const pix = await createInfinitePayPix({
      amount: grandTotal,
      orderId: tempOrderId,
      customer: { name, email, phone, cpf },
      items: cart.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
    });

    setPixData(pix);
    setIsProcessing(false);
  };

  const handleConfirmPixPayment = async () => {
    setIsProcessing(true);
    const fullAddress = `${street}, nº ${number}${complement ? ` (${complement})` : ''} - ${neighborhood}, ${city} - ${stateUf}, CEP: ${cep}`;

    const order = await createOrder({
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      customerAddress: fullAddress,
      cep,
      shippingMethod: `${selectedShipping?.carrier} ${selectedShipping?.service}`,
      shippingPrice: shippingCost,
      items: cart.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.images[0],
      })),
      subtotal: cartSubtotal,
      total: grandTotal,
      paymentMethod: 'pix_infinitepay',
      paymentStatus: 'pago',
      orderStatus: 'novo',
      isPDV: false,
      notes: `Pagamento Pix InfinitePay Aprovado (ID: ${pixData?.paymentId})`,
    });

    setOrderCompleted(order);
    clearCart();
    setIsProcessing(false);
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    showToast('Pagamento confirmado e pedido realizado com sucesso!', 'success');
  };

  const handleProcessCardPayment = async () => {
    if (!validateForm()) return;

    if (!cardNumber || !cardHolder || !cardExpiry || !cardCvv) {
      showToast('Preencha os dados do cartão de crédito', 'error');
      return;
    }

    setIsProcessing(true);
    try {
      const [expM, expY] = cardExpiry.split('/');
      await processInfinitePayCard(
        {
          amount: grandTotal,
          orderId: `ped_${Date.now()}`,
          customer: { name, email, phone, cpf },
          items: cart.map((i) => ({
            name: i.product.name,
            quantity: i.quantity,
            price: i.product.price,
          })),
        },
        {
          cardNumber,
          holderName: cardHolder,
          expiryMonth: expM || '12',
          expiryYear: expY || '28',
          cvv: cardCvv,
          installments,
        }
      );

      const fullAddress = `${street}, nº ${number}${complement ? ` (${complement})` : ''} - ${neighborhood}, ${city} - ${stateUf}, CEP: ${cep}`;
      const order = await createOrder({
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        customerAddress: fullAddress,
        cep,
        shippingMethod: `${selectedShipping?.carrier} ${selectedShipping?.service}`,
        shippingPrice: shippingCost,
        items: cart.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.images[0],
        })),
        subtotal: cartSubtotal,
        total: grandTotal,
        paymentMethod: 'credit_infinitepay',
        paymentStatus: 'pago',
        orderStatus: 'novo',
        isPDV: false,
        notes: `Cartão InfinitePay (${installments}x)`,
      });

      setOrderCompleted(order);
      clearCart();
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      showToast('Pagamento InfinitePay aprovado!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Falha ao processar cartão', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyPix = () => {
    if (!pixData) return;
    navigator.clipboard.writeText(pixData.pixCopyPaste);
    setCopiedPix(true);
    showToast('Código Pix copiado para a área de transferência!', 'success');
    setTimeout(() => setCopiedPix(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#FAF8F5] dark:bg-[#1A1614] rounded-3xl shadow-2xl border border-[#EDE5DA] dark:border-[#2C241F] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EAE3D9] dark:border-[#2A2421] flex items-center justify-between bg-white dark:bg-[#201A16]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
                  Checkout Seguro InfinitePay
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#FAF8F5]">
                {orderCompleted ? 'Pedido Confirmado' : 'Finalizar Pedido Alvéra'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-8 overflow-y-auto max-h-[80vh]">
            {/* SUCCESS SCREEN */}
            {orderCompleted ? (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    Obrigado por escolher a Alvéra!
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-md mx-auto">
                    Seu pedido <strong className="text-[#C5A059]">#{orderCompleted.id}</strong> foi recebido com sucesso e nossas artesãs já estão preparando cada detalhe aromático.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="max-w-md mx-auto p-5 rounded-2xl bg-white dark:bg-[#201A16] border border-stone-200 dark:border-stone-800 text-left text-xs space-y-2.5">
                  <div className="flex justify-between border-b pb-2 dark:border-stone-800">
                    <span className="text-stone-500">Destinatário:</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">{orderCompleted.customerName}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 dark:border-stone-800">
                    <span className="text-stone-500">Entrega:</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">{orderCompleted.shippingMethod}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 dark:border-stone-800">
                    <span className="text-stone-500">Endereço:</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 text-right max-w-[240px] truncate">
                      {orderCompleted.customerAddress}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2 dark:border-stone-800">
                    <span className="text-stone-500">Forma de Pagamento:</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 uppercase">
                      {orderCompleted.paymentMethod.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 text-sm font-bold">
                    <span>Total Pago:</span>
                    <span className="text-[#C5A059] font-serif">
                      R$ {orderCompleted.total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Post Order Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    <Printer className="w-4 h-4" /> Imprimir Comprovante
                  </button>

                  <a
                    href={`https://wa.me/55${(settings.whatsapp || '34992495905').replace(/\D/g, '')}?text=${encodeURIComponent(
                      `Olá Alvéra! Acabei de fazer o pedido #${orderCompleted.id} no valor de R$ ${orderCompleted.total.toFixed(2)}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-90 shadow"
                  >
                    <MessageCircle className="w-4 h-4" /> Acompanhar no WhatsApp
                  </a>
                </div>
              </div>
            ) : pixData ? (
              /* PIX SCREEN */
              <div className="text-center py-4 space-y-6">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-200 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                  <span>Aguardando pagamento via InfinitePay Pix. O código expira em 15 minutos.</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="p-4 bg-white rounded-2xl shadow-md border border-stone-200">
                    <img src={pixData.qrCodeUrl} alt="QR Code Pix InfinitePay" className="w-56 h-56 object-contain" />
                  </div>
                  <span className="text-xl font-bold font-serif mt-3 text-stone-900 dark:text-stone-100">
                    R$ {grandTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="max-w-md mx-auto">
                  <label className="text-xs text-stone-500 block mb-1.5 font-medium">
                    Código Pix Copia e Cola:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={pixData.pixCopyPaste}
                      className="flex-1 text-xs px-3 py-2 bg-stone-100 dark:bg-stone-900 border rounded-xl text-stone-600 truncate focus:outline-none"
                    />
                    <button
                      onClick={handleCopyPix}
                      className="px-4 py-2 bg-[#1C1917] hover:bg-[#C5A059] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>

                {/* Instant Verification Simulator */}
                <div className="pt-4 border-t dark:border-stone-800">
                  <button
                    onClick={handleConfirmPixPayment}
                    disabled={isProcessing}
                    className="w-full max-w-md py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isProcessing ? 'Confirmando no Gateway...' : 'Já realizei o pagamento (Simular Confirmação Instantânea)'}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* CHECKOUT FORM */
              <div className="space-y-6">
                {/* 1. Customer Information */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#C5A059] text-white text-[11px] flex items-center justify-center font-bold">1</span>
                    Dados Pessoais
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Nome Completo *</label>
                      <input
                        type="text"
                        placeholder="Ex: Maria Oliveira"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">WhatsApp / Telefone *</label>
                      <input
                        type="text"
                        placeholder="(34) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">E-mail *</label>
                      <input
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">CPF (Opcional)</label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Address & Carrier Quote */}
                <div className="pt-4 border-t dark:border-stone-800">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#C5A059] text-white text-[11px] flex items-center justify-center font-bold">2</span>
                    Endereço de Entrega & Frete
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-4">
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">CEP * (Busca Automática)</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="00000-000"
                          value={cep}
                          onChange={handleCepChange}
                          maxLength={9}
                          className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
                        />
                        {isLoadingCep && (
                          <span className="absolute right-3 top-3 text-[10px] text-[#C5A059] animate-pulse">
                            Buscando...
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Rua / Logradouro *</label>
                      <input
                        type="text"
                        placeholder="Nome da Rua / Avenida"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Número *</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Complemento</label>
                      <input
                        type="text"
                        placeholder="Apto 402, Bloco B"
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Bairro *</label>
                      <input
                        type="text"
                        placeholder="Bairro"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Cidade *</label>
                      <input
                        type="text"
                        placeholder="Cidade"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Estado (UF) *</label>
                      <input
                        type="text"
                        placeholder="MG"
                        value={stateUf}
                        onChange={(e) => setStateUf(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>

                  {/* Carrier Options (Correios & Jadlog) */}
                  {shippingOptions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#C5A059]" /> Escolha a Transportadora Oficial:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {shippingOptions.map((opt) => (
                          <label
                            key={opt.id}
                            className={`p-3 rounded-2xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                              selectedShipping?.id === opt.id
                                ? 'border-[#C5A059] bg-[#C5A059]/10 shadow-sm'
                                : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="radio"
                                name="checkout_shipping"
                                checked={selectedShipping?.id === opt.id}
                                onChange={() => setSelectedShipping(opt)}
                                className="accent-[#C5A059]"
                              />
                              <div>
                                <span className="font-bold text-stone-900 dark:text-stone-100 block">
                                  {opt.service}
                                </span>
                                <span className="text-[11px] text-stone-500">
                                  Prazo estimado: {opt.days} dias úteis
                                </span>
                              </div>
                            </div>
                            <span className="font-bold text-stone-900 dark:text-stone-100 font-serif">
                              R$ {opt.price.toFixed(2).replace('.', ',')}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. InfinitePay Payment Selection */}
                <div className="pt-4 border-t dark:border-stone-800">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#C5A059] text-white text-[11px] flex items-center justify-center font-bold">3</span>
                    Forma de Pagamento (InfinitePay Gateway)
                  </h3>

                  {/* Tabs: Pix vs Cartão */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                        paymentMethod === 'pix'
                          ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#1C1917] dark:text-[#FAF8F5]'
                          : 'border-stone-200 dark:border-stone-800 text-stone-500'
                      }`}
                    >
                      <QrCode className="w-4 h-4 text-[#C5A059]" />
                      <span>InfinitePay Pix (Instantâneo)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#1C1917] dark:text-[#FAF8F5]'
                          : 'border-stone-200 dark:border-stone-800 text-stone-500'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-[#C5A059]" />
                      <span>Cartão de Crédito (até 12x)</span>
                    </button>
                  </div>

                  {/* Card Form */}
                  {paymentMethod === 'card' && (
                    <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3 text-xs">
                      <div>
                        <label className="block text-stone-600 dark:text-stone-400 mb-1">Número do Cartão</label>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          maxLength={19}
                          className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 dark:text-stone-400 mb-1">Nome Impresso no Cartão</label>
                        <input
                          type="text"
                          placeholder="MARIA OLIVEIRA"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                          className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-stone-600 dark:text-stone-400 mb-1">Validade (MM/AA)</label>
                          <input
                            type="text"
                            placeholder="12/28"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            maxLength={5}
                            className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:border-[#C5A059]"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-600 dark:text-stone-400 mb-1">CVV</label>
                          <input
                            type="password"
                            placeholder="123"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            maxLength={4}
                            className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:border-[#C5A059]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-stone-600 dark:text-stone-400 mb-1">Parcelamento InfinitePay</label>
                        <select
                          value={installments}
                          onChange={(e) => setInstallments(Number(e.target.value))}
                          className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:border-[#C5A059]"
                        >
                          <option value={1}>1x de R$ {grandTotal.toFixed(2).replace('.', ',')} (sem juros)</option>
                          <option value={2}>2x de R$ {(grandTotal / 2).toFixed(2).replace('.', ',')} (sem juros)</option>
                          <option value={3}>3x de R$ {(grandTotal / 3).toFixed(2).replace('.', ',')} (sem juros)</option>
                          <option value={6}>6x de R$ {(grandTotal / 6).toFixed(2).replace('.', ',')} (sem juros)</option>
                          <option value={12}>12x de R$ {(grandTotal / 12).toFixed(2).replace('.', ',')} (sem juros)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Total Summary & Submit */}
                <div className="pt-4 border-t dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-xs text-stone-500 block">Total a pagar com frete:</span>
                    <span className="text-2xl font-bold font-serif text-[#C5A059]">
                      R$ {grandTotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {paymentMethod === 'pix' ? (
                    <button
                      type="button"
                      onClick={handleStartInfinitePayPix}
                      disabled={isProcessing}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#1C1917] hover:bg-[#C5A059] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] dark:hover:bg-[#D4AF37] text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <QrCode className="w-4 h-4 text-[#D4AF37]" />
                      <span>{isProcessing ? 'Gerando QR Code...' : 'Gerar QR Code Pix InfinitePay'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleProcessCardPayment}
                      disabled={isProcessing}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#1C1917] hover:bg-[#C5A059] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] dark:hover:bg-[#D4AF37] text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                      <span>{isProcessing ? 'Processando InfinitePay...' : 'Confirmar Pagamento no Cartão'}</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
