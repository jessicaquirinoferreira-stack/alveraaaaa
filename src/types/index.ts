export interface OlfactoryPyramid {
  top: string;    // Notas de Saída
  heart: string;  // Notas de Corpo
  base: string;   // Notas de Fundo
}

export interface Product {
  id: string;
  name: string;
  category: 'velas' | 'difusores' | 'home-sprays' | 'acessorios' | 'kits' | 'personalizadas';
  categoryLabel: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  stock: number;
  scents: string;
  olfactoryPyramid?: OlfactoryPyramid;
  burnTime?: string;
  weight?: string;
  images: string[];
  featured: boolean;
  active: boolean;
  intensity?: 1 | 2 | 3 | 4 | 5;
  mood?: string;
  isCustomizable?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizationDetails?: string;
}

export interface ShippingOption {
  id: string;
  carrier: 'Correios' | 'Jadlog';
  service: string;
  price: number;
  days: number;
  logoBadge?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizationDetails?: string;
}

export interface CustomCandleSpec {
  occasion: string; // Casamento, Maternidade/Batizado, Brinde Corporativo, Aniversário, Lembrancinha, Outro
  quantity: number;
  jarType: string; // Vidro Âmbar Nobre, Vidro Transparente, Cerâmica Artesanal, Lata Alumínio Ouro/Preto, Frasco Fosco
  candleSize: string; // Mini 40g Lembrança, Clássica 140g, Premium 210g, Luxury 350g (2 pavios)
  scentFamily: string; // Lavanda Francesa, Bergamota & Âmbar, Cerejeira & Baunilha, Cedro Real, Aroma Exclusivo
  waxColorAndDecor: string; // Cera Vegetal Pura, Folhas de Ouro 24k, Cristais de Quartzo, Flores Secas/Lavanda
  wickType: string; // Pavio 100% Algodão sem chumbo, Pavio de Madeira (estalo lareira)
  labelCustomText: string; // Nomes, Monograma ou Frase
  labelDate?: string; // Data do evento
  labelStyle: string; // Vinil Fosco Minimalista, Hot Stamping Dourado, Papel Kraft Botânico, Gravação a Laser
  packaging: string; // Caixa Rígida de Luxo, Saquinho Algodão Cru/Linho, Fita Gorgurão com Tag
  estimatedUnitBudget?: number;
  additionalNotes?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  cep: string;
  shippingMethod: string;
  shippingPrice: number;
  items: OrderItem[];
  subtotal: number;
  total: number;
  paymentMethod:
    | 'pix_infinitepay'
    | 'credit_infinitepay'
    | 'link_infinitepay'
    | 'pdv_dinheiro'
    | 'pdv_cartao'
    | 'pdv_pix'
    | 'whatsapp_custom';
  paymentStatus: 'pago' | 'pendente' | 'cancelado' | 'orcamento';
  orderStatus: 'novo' | 'em_preparo' | 'enviado' | 'concluido' | 'cancelado' | 'orcamento_whatsapp';
  isPDV?: boolean;
  isCustomQuote?: boolean;
  customization?: CustomCandleSpec;
  createdAt: string;
  notes?: string;
}

export interface ScentItem {
  id: string;
  name: string;
  category: 'citricos' | 'florais' | 'frutais' | 'gourmand' | 'amadeirados' | 'herbais';
  categoryLabel: string;
  description: string;
  intensity?: number;
}

export interface CandleAdvantage {
  id: number;
  title: string;
  description: string;
}

export interface CandleCareRule {
  id: number;
  rule: string;
  detail: string;
}

export interface SiteSettings {
  siteName: string;
  slogan: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  announcement: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  instagramActive: boolean;
  facebookActive: boolean;
  tiktokActive: boolean;
  openingHours: string;
  updatedAt?: string;
}
