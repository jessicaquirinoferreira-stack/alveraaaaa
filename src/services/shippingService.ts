import { ShippingOption } from '../types';

export interface CepAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export async function fetchAddressByCep(cep: string): Promise<CepAddress | null> {
  const clean = cep.replace(/\D/g, '');
  if (clean.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
    if (!response.ok) return null;
    const data = await response.json();
    if (data.erro) return null;
    return data as CepAddress;
  } catch (err) {
    console.warn('Error fetching ViaCEP:', err);
    return null;
  }
}

export function calculateShippingOptions(cep: string, stateUf?: string, subtotal: number = 0): ShippingOption[] {
  const clean = cep.replace(/\D/g, '');
  if (clean.length < 8) return [];

  // Regional pricing logic based on Brazilian states (Origin: Uberaba - MG, CEP 38025-000)
  const uf = stateUf?.toUpperCase() || '';
  const isSoutheast = ['MG', 'SP', 'RJ', 'ES'].includes(uf);
  const isSouthOrCenter = ['PR', 'SC', 'RS', 'GO', 'DF', 'MS', 'MT'].includes(uf);
  const isLocal = uf === 'MG';

  let pacPrice = 21.90;
  let sedexPrice = 32.50;
  let jadlogPkgPrice = 19.80;
  let jadlogComPrice = 29.90;

  let pacDays = 6;
  let sedexDays = 2;
  let jadlogPkgDays = 4;
  let jadlogComDays = 3;

  if (isLocal) {
    pacPrice = 14.50;
    sedexPrice = 21.00;
    jadlogPkgPrice = 16.20;
    jadlogComPrice = 22.50;
    pacDays = 3;
    sedexDays = 1;
    jadlogPkgDays = 2;
    jadlogComDays = 1;
  } else if (isSoutheast) {
    pacPrice = 18.90;
    sedexPrice = 27.50;
    jadlogPkgPrice = 17.90;
    jadlogComPrice = 25.80;
    pacDays = 5;
    sedexDays = 2;
    jadlogPkgDays = 4;
    jadlogComDays = 2;
  } else if (isSouthOrCenter) {
    pacPrice = 24.90;
    sedexPrice = 36.90;
    jadlogPkgPrice = 22.50;
    jadlogComDays = 31.90;
    pacDays = 7;
    sedexDays = 3;
    jadlogPkgDays = 5;
    jadlogComDays = 3;
  } else {
    // North and Northeast
    pacPrice = 34.90;
    sedexPrice = 52.00;
    jadlogPkgPrice = 31.90;
    jadlogComPrice = 46.50;
    pacDays = 9;
    sedexDays = 4;
    jadlogPkgDays = 7;
    jadlogComDays = 4;
  }

  return [
    {
      id: 'correios-pac',
      carrier: 'Correios',
      service: 'PAC Econômico',
      price: pacPrice,
      days: pacDays,
      logoBadge: 'Correios PAC'
    },
    {
      id: 'correios-sedex',
      carrier: 'Correios',
      service: 'SEDEX Expresso Prioritário',
      price: sedexPrice,
      days: sedexDays,
      logoBadge: 'Correios SEDEX'
    },
    {
      id: 'jadlog-package',
      carrier: 'Jadlog',
      service: 'Jadlog .Package Rápido',
      price: jadlogPkgPrice,
      days: jadlogPkgDays,
      logoBadge: 'Jadlog .Package'
    },
    {
      id: 'jadlog-com',
      carrier: 'Jadlog',
      service: 'Jadlog .Com Especial',
      price: jadlogComPrice,
      days: jadlogComDays,
      logoBadge: 'Jadlog .Com'
    }
  ];
}
