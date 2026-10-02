export interface InfinitePayPaymentRequest {
  amount: number;
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    cpf?: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export interface InfinitePayPixResponse {
  paymentId: string;
  qrCodeUrl: string;
  pixCopyPaste: string;
  expiresAt: string;
}

export interface InfinitePayCardRequest {
  cardNumber: string;
  holderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  installments: number;
}

// Generate valid-looking EMV PIX string
export function generatePixCopyPaste(amount: number, orderId: string): string {
  const formattedAmount = amount.toFixed(2);
  const cleanId = orderId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 15);
  return `00020126580014br.gov.bcb.pix0136infinitepay-alvera-${cleanId}@alvera.com.br520400005303986540${formattedAmount.length}${formattedAmount}5802BR5915ALVERA VELAS6007UBERABA62070503***6304`;
}

export async function createInfinitePayPix(req: InfinitePayPaymentRequest): Promise<InfinitePayPixResponse> {
  const paymentId = `inf_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const pixCopyPaste = generatePixCopyPaste(req.amount, req.orderId);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(pixCopyPaste)}`;
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  return {
    paymentId,
    qrCodeUrl,
    pixCopyPaste,
    expiresAt,
  };
}

export async function processInfinitePayCard(
  req: InfinitePayPaymentRequest,
  card: InfinitePayCardRequest
): Promise<{ success: boolean; transactionId: string; message: string }> {
  // Simulate payment gateway delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const cleanNum = card.cardNumber.replace(/\s/g, '');
  if (cleanNum.length < 13) {
    throw new Error('Número de cartão de crédito inválido');
  }

  return {
    success: true,
    transactionId: `inf_tx_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    message: 'Pagamento aprovado com sucesso via InfinitePay Gateway!',
  };
}
