import { Product, SiteSettings, ScentItem, CandleAdvantage, CandleCareRule } from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'Alvéra',
  slogan: 'Velas • Aromas • Bem-Estar',
  phone: '(34) 99249-5905',
  whatsapp: '(34) 99249-5905',
  email: 'contato@alvera.com.br',
  address: 'Rua Santa Juliana, 625 – Bairro Boa Vista, Uberaba - MG',
  heroTitle: 'A Arte da Calma em Chamas e Essências Nobres',
  heroSubtitle: 'Velas artesanais derramadas à mão em ceras vegetais puras, com perfumaria fina botânica que transforma o seu lar em um santuário de bem-estar.',
  announcement: '✦ Entregas para todo o Brasil • 100% Cera Vegetal & Essências Nobres • Parcele em até 12x ✦',
  instagram: 'https://instagram.com/alvera.aromas',
  facebook: 'https://facebook.com/alvera.aromas',
  tiktok: 'https://tiktok.com/@alvera.aromas',
  instagramActive: true,
  facebookActive: true,
  tiktokActive: true,
  openingHours: 'Segunda a Sábado das 09h às 19h',
  updatedAt: new Date().toISOString(),
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Luar de Bergamota & Âmbar Dourado',
    category: 'velas',
    categoryLabel: 'Vela Aromática',
    shortDescription: 'Cítrico solar e aconchegante com toque aveludado de âmbar e folhas de chá branco.',
    description: 'A Vela Luar de Bergamota evoca a brisa suave do entardecer mediterrâneo. Feita artesanalmente com um blend exclusivo de ceras de coco, palma e soja, proporciona uma queima limpa e duradoura. Seus acordes cítricos revigorantes se entrelaçam com a cremosidade do âmbar para dissipar tensões e renovar as energias da sua casa.',
    price: 89.90,
    originalPrice: 109.90,
    stock: 24,
    scents: 'Bergamota da Calábria, Chá Branco, Flor de Neroli e Âmbar',
    olfactoryPyramid: {
      top: 'Bergamota fresca e Limão Siciliano',
      heart: 'Chá Branco, Néroli e Jasmim d’Água',
      base: 'Âmbar Dourado, Almíscar Branco e Cedro Suave'
    },
    burnTime: '~40 horas',
    weight: '210g',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    active: true,
    intensity: 4,
    mood: 'Energia & Serenidade',
    createdAt: '2026-09-01T10:00:00.000Z'
  },
  {
    id: 'prod-2',
    name: 'Flor de Cerejeira & Baunilha Bourbon',
    category: 'velas',
    categoryLabel: 'Vela Aromática',
    shortDescription: 'Doçura sofisticada e floral delicado com a nobre fava de baunilha de Bourbon.',
    description: 'Inspirada nos jardins floridos da primavera imperial, esta vela traz a suavidade poética da flor de cerejeira harmonizada com a riqueza aveludada da legítima baunilha de Bourbon. Um aroma envolvente que abraça a alma e traz conforto imediato aos ambientes íntimos.',
    price: 94.90,
    originalPrice: 119.90,
    stock: 18,
    scents: 'Pétalas de Cerejeira, Flor de Laranjeira, Fava de Baunilha e Fava Tonka',
    olfactoryPyramid: {
      top: 'Pétalas de Cerejeira e Pera Nashi',
      heart: 'Magnólia e Flor de Laranjeira',
      base: 'Baunilha Bourbon, Fava Tonka e Sândalo Cremoso'
    },
    burnTime: '~42 horas',
    weight: '220g',
    images: [
      'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    active: true,
    intensity: 5,
    mood: 'Romance & Aconchego',
    createdAt: '2026-09-02T10:00:00.000Z'
  },
  {
    id: 'prod-3',
    name: 'Lavanda Francesa & Alecrim do Campo',
    category: 'velas',
    categoryLabel: 'Vela Aromática',
    shortDescription: 'O clássico aromaterapêutico para noites de descanso reparador e paz mental.',
    description: 'Formulada com óleo essencial puro de Lavandula Angustifolia e folhas frescas de alecrim silvestre. O aroma medicinal e relaxante acalma a mente hiperativa, alivia a ansiedade e prepara o quarto para um sono profundo e revitalizante.',
    price: 84.90,
    originalPrice: 99.90,
    stock: 35,
    scents: 'Lavanda Francesa, Alecrim Fresco, Eucalipto Glóbulo e Musgo de Carvalho',
    olfactoryPyramid: {
      top: 'Alecrim Selvagem e Folhas de Eucalipto',
      heart: 'Lavanda Provençal e Lírio do Vale',
      base: 'Musgo de Carvalho e Almíscar Branco'
    },
    burnTime: '~38 horas',
    weight: '200g',
    images: [
      'https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    active: true,
    intensity: 3,
    mood: 'Sono Reparador & Relax',
    createdAt: '2026-09-03T10:00:00.000Z'
  },
  {
    id: 'prod-4',
    name: 'Cedro Nobre & Cardamomo Negro',
    category: 'velas',
    categoryLabel: 'Vela Aromática',
    shortDescription: 'Madeiras raras, especiarias quentes e toque defumado de elegância ímpar.',
    description: 'Uma fragrância arquitetônica e imponente. A nobreza da madeira de cedro atlas combinada com a intensidade enigmática do cardamomo preto e o toque suave de vetiver. Ideal para escritórios elegantes, salas de leitura e momentos de introspecção.',
    price: 98.90,
    originalPrice: 125.00,
    stock: 12,
    scents: 'Cedro do Atlas, Cardamomo Negro, Sândalo e Pimenta Rosa',
    olfactoryPyramid: {
      top: 'Pimenta Rosa e Bergamota Defumada',
      heart: 'Cardamomo Negro e Madeira de Guaiaco',
      base: 'Cedro Atlas, Vetiver Terroso e Couro Suave'
    },
    burnTime: '~45 horas',
    weight: '240g',
    images: [
      'https://images.unsplash.com/photo-1570823635306-250abb06d4b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    active: true,
    intensity: 5,
    mood: 'Foco & Sofisticação',
    createdAt: '2026-09-04T10:00:00.000Z'
  },
  {
    id: 'prod-5',
    name: 'Difusor de Varetas Âmbar & Fava Tonka 250ml',
    category: 'difusores',
    categoryLabel: 'Difusor de Varetas',
    shortDescription: 'Perfumação contínua e requintada com varetas de fibra de algodão de alta difusão.',
    description: 'O Difusor de Ambiente Alvéra foi desenvolvido com base alcoólica nobre de cereais, liberando notas quentes de fava tonka e âmbar de forma constante e harmoniosa por até 90 dias. Acompanha 6 varetas de fibra negra premium e frasco em vidro âmbar sofisticado.',
    price: 119.00,
    originalPrice: 139.00,
    stock: 20,
    scents: 'Fava Tonka, Âmbar Imperial, Canela em Pau e Baunilha',
    burnTime: 'Duração contínua de ~90 dias',
    weight: '250ml',
    images: [
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    active: true,
    intensity: 4,
    mood: 'Elegância Contínua',
    createdAt: '2026-09-05T10:00:00.000Z'
  },
  {
    id: 'prod-6',
    name: 'Home Spray Brisa de Alecrim & Chá Branco 200ml',
    category: 'home-sprays',
    categoryLabel: 'Home Spray',
    shortDescription: 'Frescor botânico instantâneo para cortinas, lençóis, almofadas e salas.',
    description: 'Um toque imediato de renovação para tecidos e ambientes. Borrife a 30cm de distância para sentir o aroma fresco, límpido e purificante que transforma instantaneamente o clima de qualquer cômodo.',
    price: 68.00,
    originalPrice: 79.00,
    stock: 40,
    scents: 'Alecrim Selvagem, Chá Branco, Bambu e Almíscar Transparente',
    burnTime: '~800 borrifadas',
    weight: '200ml',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    active: true,
    intensity: 3,
    mood: 'Pureza & Leveza',
    createdAt: '2026-09-06T10:00:00.000Z'
  },
  {
    id: 'prod-7',
    name: 'Kit Ritual do Fogo: Cortador & Abafador Gold',
    category: 'acessorios',
    categoryLabel: 'Acessório de Luxo',
    shortDescription: 'Ferramentas essenciais em aço escovado dourado para a queima perfeita da sua vela.',
    description: 'Manter o pavio aparado a 5mm garante uma queima sem fumaça preta e prolonga a vida útil da sua vela. O abafador em formato sino apaga a chama sem espalhar fuligem. Acabamento dourado nobre com gravação discreta da marca.',
    price: 65.00,
    originalPrice: 85.00,
    stock: 15,
    scents: 'Metal Nobre Dourado',
    burnTime: 'Uso vitalício',
    weight: '180g',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    active: true,
    intensity: 1,
    mood: 'Cuidado & Sofisticação',
    createdAt: '2026-09-07T10:00:00.000Z'
  },
  {
    id: 'prod-8',
    name: 'Gift Box Alvéra Santuário Particular',
    category: 'kits',
    categoryLabel: 'Caixa de Presente',
    shortDescription: 'Caixa rígida preta e dourada contendo 2 velas aromáticas e 1 home spray à escolha.',
    description: 'A expressão máxima do luxo para presentear quem você ama ou celebrar marcos especiais. Inclui embalagem rígida revestida com fita de gorgurão, cartão presenteável personalizado e papel vegetal protetor.',
    price: 219.00,
    originalPrice: 259.00,
    stock: 10,
    scents: 'Bergamota & Âmbar + Cerejeira & Baunilha + Home Spray Alecrim',
    burnTime: 'Kit completo',
    weight: '850g',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    active: true,
    intensity: 5,
    mood: 'Presente Memorável',
    createdAt: '2026-09-08T10:00:00.000Z'
  },
  {
    id: 'prod-custom-1',
    name: 'Velas Personalizadas para Casamento & Eventos',
    category: 'personalizadas',
    categoryLabel: 'Vela Personalizada (Sob Medida)',
    shortDescription: 'Frascos em vidro âmbar, cerâmica ou cristal com rótulo em hot stamping e fechamento no WhatsApp.',
    description: 'Desenvolvemos a identidade olfativa e visual completa para o seu casamento, aniversário ou evento corporativo. Escolha frascos, essências exclusivas, cera com folhas de ouro e embalagens sofisticadas. Fechamento direto via WhatsApp com a perfumista.',
    price: 32.00,
    originalPrice: 42.00,
    stock: 500,
    scents: 'Aromas à sua escolha ou criação exclusiva',
    burnTime: '~30 horas',
    weight: '140g a 210g',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    active: true,
    isCustomizable: true,
    intensity: 4,
    mood: 'Celebração Inesquecível',
    createdAt: '2026-09-09T10:00:00.000Z'
  },
  {
    id: 'prod-custom-2',
    name: 'Mini Velas para Maternidade & Batizado',
    category: 'personalizadas',
    categoryLabel: 'Lembrancinha Sob Medida',
    shortDescription: 'Potes delicados com nomes, data de nascimento e aroma suave de lavanda francesa ou baunilha.',
    description: 'A lembrança perfeita para a chegada do seu bebê. Feitas à mão em ceras 100% vegetais com queima limpa e segura. Arte personalizada do rótulo inclusa e suporte dedicado pelo WhatsApp.',
    price: 18.50,
    originalPrice: 24.00,
    stock: 500,
    scents: 'Lavanda Francesa, Camomila Serena ou Baunilha Bourbon',
    burnTime: '~12 horas',
    weight: '40g',
    images: [
      'https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    active: true,
    isCustomizable: true,
    intensity: 3,
    mood: 'Boas-Vindas & Pureza',
    createdAt: '2026-09-10T10:00:00.000Z'
  }
];

// FOTO 1: Catálogo Completo Oficial de Essências Alvéra (~75 Fragrâncias)
// "ESSÊNCIA PARA VELAS AROMÁTICAS - ESCOLHA DAS ESSÊNCIAS NO CHAT"
export const ALVERA_SCENT_CATALOG: ScentItem[] = [
  { id: 'acai', name: 'Açaí', category: 'frutais', categoryLabel: 'Frutal', description: 'Tropical, vibrante e energizante com a riqueza amazônica.' },
  { id: 'anis', name: 'Anís', category: 'herbais', categoryLabel: 'Herbal & Especiaria', description: 'Aromático, fresco e levemente adocicado licoroso.' },
  { id: 'algodao', name: 'Algodão', category: 'herbais', categoryLabel: 'Floral Conforto', description: 'Suavidade acolhedora, sensação de roupa limpa e paz.' },
  { id: 'alecrim-doce', name: 'Alecrim Doce', category: 'herbais', categoryLabel: 'Herbal', description: 'Frescor revigorante com um toque sutilmente adocicado.' },
  { id: 'alecrim-lb', name: 'Alecrim L B', category: 'herbais', categoryLabel: 'Herbal & Foco', description: 'Alecrim nobre de alta fixação para clareza mental.' },
  { id: 'alfazema', name: 'Alfazema', category: 'herbais', categoryLabel: 'Herbal Clássico', description: 'Floral campestre purificante e relaxante.' },
  { id: 'algas-marinhas', name: 'Algas Marinhas', category: 'citricos', categoryLabel: 'Marinho / Fresco', description: 'Brisa oceânica revigorante, frescor e leveza.' },
  { id: 'aloe-vera', name: 'Aloe Vera', category: 'herbais', categoryLabel: 'Botânico / Verde', description: 'Frescor aquático, purificação e renovação celular.' },
  { id: 'arruda', name: 'Arruda', category: 'herbais', categoryLabel: 'Herbal Protetor', description: 'Aroma herbal intenso para limpeza energética do lar.' },
  { id: 'balinha-de-cafe', name: 'Balinha de Café', category: 'gourmand', categoryLabel: 'Gourmand', description: 'Café torrado adocicado, caloroso e nostálgico.' },
  { id: 'baunilha', name: 'Baunilha', category: 'gourmand', categoryLabel: 'Gourmand Nobre', description: 'Cremosa, aconchegante e envolvente.' },
  { id: 'banana', name: 'Banana', category: 'frutais', categoryLabel: 'Frutal Doce', description: 'Doçura tropical acolhedora e alegre.' },
  { id: 'brisa-do-campo', name: 'Brisa do Campo', category: 'herbais', categoryLabel: 'Fresco / Verde', description: 'Vento suave entre campos verdes e flores silvestres.' },
  { id: 'brisa-do-mar', name: 'Brisa do Mar', category: 'citricos', categoryLabel: 'Ozônico / Marinho', description: 'Toque salino fresco, solar e revigorante.' },
  { id: 'buriti', name: 'Buriti', category: 'frutais', categoryLabel: 'Frutal Exótico', description: 'Aroma dourado do cerrado brasileiro, quente e solar.' },
  { id: 'camomila', name: 'Camomila', category: 'herbais', categoryLabel: 'Herbal Relaxante', description: 'Chá floral calmante, serenidade para a mente.' },
  { id: 'canela', name: 'Canela', category: 'amadeirados', categoryLabel: 'Especiaria Quente', description: 'Afrodisíaca, marcante e acolhedora para o lar.' },
  { id: 'capim-limao', name: 'Capim Limão', category: 'citricos', categoryLabel: 'Cítrico Herbal', description: 'Capim-santo puro, revigorante e repelente natural.' },
  { id: 'chicletes-tuti-frutti', name: 'Chicletes Tuti Frutti', category: 'gourmand', categoryLabel: 'Gourmand Lúdico', description: 'Explosão doce, divertida e nostálgica de frutas.' },
  { id: 'cha-verde', name: 'Chá Verde', category: 'citricos', categoryLabel: 'Herbal Fresco', description: 'Antioxidante, límpido e harmonioso para o dia a dia.' },
  { id: 'cha-branco', name: 'Chá Branco', category: 'florais', categoryLabel: 'Floral Suave', description: 'Sofisticação minimalista, leve e aveludada.' },
  { id: 'chantily', name: 'Chantily', category: 'gourmand', categoryLabel: 'Gourmand Cremoso', description: 'Cremoso, doce e aveludado como sobremesa fina.' },
  { id: 'chocolate', name: 'Chocolate', category: 'gourmand', categoryLabel: 'Gourmand Quente', description: 'Cacau encorpado, sensação de aconchego irresistível.' },
  { id: 'cereja-c-avela', name: 'Cereja c/ Avelã', category: 'gourmand', categoryLabel: 'Gourmand Floral', description: 'Combinação clássica aveludada e sofisticada.' },
  { id: 'cedro', name: 'Cedro', category: 'amadeirados', categoryLabel: 'Amadeirado Nobre', description: 'Madeira imponente, estabilidade e elegância.' },
  { id: 'coco', name: 'Coco', category: 'gourmand', categoryLabel: 'Tropical Doce', description: 'Cremoso, praiano e relaxante como um refúgio solar.' },
  { id: 'cravo', name: 'Cravo', category: 'amadeirados', categoryLabel: 'Especiaria', description: 'Especiaria aromática intensa, estimulante e acolhedora.' },
  { id: 'dama-da-noite', name: 'Dama da Noite', category: 'florais', categoryLabel: 'Floral Noturno', description: 'Floral intenso, sedutor e inesquecível no ar.' },
  { id: 'erva-doce', name: 'Erva Doce', category: 'herbais', categoryLabel: 'Herbal Suave', description: 'Tranquilizante tradicional, doçura campestre delicada.' },
  { id: 'flor-de-cerejeira', name: 'Flor de Cerejeira', category: 'florais', categoryLabel: 'Floral Oriental', description: 'Romantismo oriental, delicadeza de pétalas ao vento.' },
  { id: 'flor-de-laranjeira', name: 'Flor de Laranjeira', category: 'florais', categoryLabel: 'Floral Cítrico', description: 'Flor de azahar nobre, alivia a ansiedade e eleva o humor.' },
  { id: 'flor-de-pitanga', name: 'Flor de Pitanga', category: 'florais', categoryLabel: 'Floral Frutal', description: 'Tropicalidade brasileira refinada e radiante.' },
  { id: 'floral', name: 'Floral', category: 'florais', categoryLabel: 'Bouquet Floral', description: 'Equilíbrio harmonioso de flores nobres selecionadas.' },
  { id: 'floral-frutal', name: 'Floral Frutal', category: 'florais', categoryLabel: 'Floral Frutal', description: 'Harmonia perfeita entre flores frescas e frutas maduras.' },
  { id: 'floral-rose', name: 'Floral Rose', category: 'florais', categoryLabel: 'Floral Romântico', description: 'Rosas inglesas aveludadas, românticas e refinadas.' },
  { id: 'flores-do-campo', name: 'Flores do Campo', category: 'florais', categoryLabel: 'Floral Silvestre', description: 'Paz campestre com variedade floral multicolorida.' },
  { id: 'fresh', name: 'Fresh', category: 'citricos', categoryLabel: 'Ozônico Fresco', description: 'Sensação refrescante, ar puro e luminosidade.' },
  { id: 'frutal', name: 'Frutal', category: 'frutais', categoryLabel: 'Frutas Suculentas', description: 'Mix vibrante de frutas frescas banhadas pelo sol.' },
  { id: 'frutas-vermelhas', name: 'Frutas Vermelhas', category: 'frutais', categoryLabel: 'Frutal Marcante', description: 'Amora, framboesa e morango com toque sensual e doce.' },
  { id: 'hortela-baby', name: 'Hortelã Baby (Suave)', category: 'herbais', categoryLabel: 'Herbal Delicado', description: 'Menta adocicada e suave para relaxamento e alívio respiratório.' },
  { id: 'jasmim', name: 'Jasmim', category: 'florais', categoryLabel: 'Floral Branco', description: 'Floral nobre, sensual e marcante de perfumaria fina.' },
  { id: 'lavanda', name: 'Lavanda', category: 'herbais', categoryLabel: 'Aromaterapia Pura', description: 'A rainha do relaxamento e da paz mental.' },
  { id: 'lavanda-herbal', name: 'Lavanda Herbal', category: 'herbais', categoryLabel: 'Herbal Fresco', description: 'Lavanda com notas verdes rústicas e revigorantes.' },
  { id: 'lavanda-gldys', name: 'Lavanda Gldys', category: 'herbais', categoryLabel: 'Lavanda Premium', description: 'Blend especial com assinatura floral exclusiva.' },
  { id: 'lavanda-inglesa', name: 'Lavanda Inglesa', category: 'herbais', categoryLabel: 'Floral Herbal', description: 'Elegância britânica clássica, suave e aristocrática.' },
  { id: 'lavanda-musk', name: 'Lavanda Musk', category: 'florais', categoryLabel: 'Herbal Conforto', description: 'Lavanda com base de almíscar aveludado e fixação longa.' },
  { id: 'leite-de-cabra', name: 'Leite de Cabra', category: 'gourmand', categoryLabel: 'Aconchego Lácteo', description: 'Toque cremoso, aveludado, suave e reconfortante.' },
  { id: 'laranja', name: 'Laranja', category: 'citricos', categoryLabel: 'Cítrico Solar', description: 'Energia cintilante e alegria cítrica contagiante.' },
  { id: 'limao-c-baunilha', name: 'Limão c/ Baunilha', category: 'citricos', categoryLabel: 'Cítrico Gourmand', description: 'Torta de limão gourmet, frescor equilibrado com doçura.' },
  { id: 'limao-casca', name: 'Limão Casca', category: 'citricos', categoryLabel: 'Cítrico Rústico', description: 'Zest de limão prensado a frio, vigor e purificação.' },
  { id: 'limao-siciliano', name: 'Limão Siciliano', category: 'citricos', categoryLabel: 'Cítrico Nobre', description: 'Solar mediterrâneo, sofisticado e estimulante.' },
  { id: 'lirio-do-campo', name: 'Lírio do Campo', category: 'florais', categoryLabel: 'Floral Branco', description: 'Pureza límpida, elegância serena e perfume delicado.' },
  { id: 'macadamia', name: 'Macadâmia', category: 'amadeirados', categoryLabel: 'Amadeirado Doce', description: 'Nutty nobre, cremosidade sofisticada e aconchegante.' },
  { id: 'maca-e-canela', name: 'Maçã e Canela', category: 'amadeirados', categoryLabel: 'Especiaria Frutal', description: 'O clássico de outono e inverno que aquece qualquer espaço.' },
  { id: 'maca', name: 'Maçã', category: 'frutais', categoryLabel: 'Frutal Doce', description: 'Maçã vermelha suculenta, doce e reconfortante.' },
  { id: 'maca-verde', name: 'Maçã Verde', category: 'citricos', categoryLabel: 'Frutal Cítrico', description: 'Crocante, azedinho equilibrado e super refrescante.' },
  { id: 'maracuja-doce', name: 'Maracujá Doce', category: 'frutais', categoryLabel: 'Frutal Calmante', description: 'Maracujá tropical com polpa doce e calmante.' },
  { id: 'marine', name: 'Marine', category: 'citricos', categoryLabel: 'Marinho Puro', description: 'Frescor de brisa azul, limpeza e amplidão de ambiente.' },
  { id: 'mel', name: 'Mel', category: 'gourmand', categoryLabel: 'Gourmand Dourado', description: 'Néctar doce e dourado com notas quentes de favo.' },
  { id: 'melancia', name: 'Melancia', category: 'frutais', categoryLabel: 'Frutal Aquoso', description: 'Hidratação olfativa fresca, doce e alegre de verão.' },
  { id: 'morango', name: 'Morango', category: 'frutais', categoryLabel: 'Frutal Vermelho', description: 'Morango maduro apetitoso, doce e vibrante.' },
  { id: 'morango-c-avela', name: 'Morango c/ Avelã', category: 'gourmand', categoryLabel: 'Gourmand Sensual', description: 'Morango doce fundido com avelã torrada cremosa.' },
  { id: 'morango-champagne', name: 'Morango Champagne', category: 'frutais', categoryLabel: 'Frutal Espumante', description: 'Luxo efervescente de morangos em taça de espumante.' },
  { id: 'morango-com-chantily', name: 'Morango com Chantily', category: 'gourmand', categoryLabel: 'Gourmand Irresistível', description: 'Doçura aveludada digna de uma confeitaria francesa.' },
  { id: 'morango-silvestre', name: 'Morango Silvestre', category: 'frutais', categoryLabel: 'Frutal Campestre', description: 'Frutinhas silvestres colhidas na floresta europeia.' },
  { id: 'pessego', name: 'Pêssego', category: 'frutais', categoryLabel: 'Frutal Aveludado', description: 'Casca aveludada e polpa doce suculenta de verão.' },
  { id: 'pimenta-rosa', name: 'Pimenta Rosa', category: 'amadeirados', categoryLabel: 'Especiaria Frutal', description: 'Toque picante suave, sofisticado, moderno e sedutor.' },
  { id: 'pitanga', name: 'Pitanga', category: 'frutais', categoryLabel: 'Tropical Brasileiro', description: 'Fruta nativa brasileira cheia de personalidade e frescor.' },
  { id: 'primavera', name: 'Primavera', category: 'florais', categoryLabel: 'Floral Estacional', description: 'Flores desabrochando ao sol, renovação e esperança.' },
  { id: 'talias', name: 'Talias', category: 'florais', categoryLabel: 'Floral Exótico', description: 'Bouquet floral misterioso com acordes aveludados.' },
  { id: 'talco-floral', name: 'Talco Floral', category: 'florais', categoryLabel: 'Floral Polvoroso', description: 'Conforto nostálgico, toque limpo e acolhedor.' },
  { id: 'talco-baby', name: 'Talco Baby', category: 'herbais', categoryLabel: 'Conforto Infantil', description: 'Paz serena de bebê, maciez, ternura e cuidado.' },
  { id: 'tangerina', name: 'Tangerina', category: 'citricos', categoryLabel: 'Cítrico Suculento', description: 'Explosão de gomos de bergamota/tangerina fresca.' },
  { id: 'tutti-frutti', name: 'Tutti Frutti', category: 'gourmand', categoryLabel: 'Gourmand Doce', description: 'Doçura alegre e colorida que resgata doces memórias.' },
  { id: 'vanilla', name: 'Vanilla', category: 'gourmand', categoryLabel: 'Gourmand Clássico', description: 'Baunilha pura aveludada para um lar aconchegante.' },
  { id: 'violeta', name: 'Violeta', category: 'florais', categoryLabel: 'Floral Delicado', description: 'Pétalas roxas com perfume nostálgico e elegante.' },
  { id: 'violeta-com-amora', name: 'Violeta com Amora', category: 'florais', categoryLabel: 'Floral Frutal Nobre', description: 'Equilíbrio fascinante entre flor de violeta e fruta escura.' },
  { id: 'ylang-ylang', name: 'Ylang Ylang', category: 'florais', categoryLabel: 'Floral Exótico Nobre', description: 'A flor das flores, afrodisíaca, marcante e luxuosa.' }
];

// FOTO 2: 5 Vantagens da sua vela aromática
export const ALVERA_5_ADVANTAGES: CandleAdvantage[] = [
  {
    id: 1,
    title: 'Trazem conforto ao lar',
    description: 'Aconchego imediato, calor visual e sensação de paz profunda ao acender a chama no fim de um dia exaustivo.'
  },
  {
    id: 2,
    title: 'Deixam o ambiente perfumado com aromas únicos',
    description: 'Essências nobres de perfumaria fina com alta fixação botânica que criam a identidade olfativa inesquecível da sua casa.'
  },
  {
    id: 3,
    title: 'Podem beneficiar sua saúde pela aromaterapia',
    description: 'Compostos botânicos puros que atuam no sistema límbico auxiliando no alívio da ansiedade, estresse e no sono reparador.'
  },
  {
    id: 4,
    title: 'Transformam momentos em memórias inconfundíveis',
    description: 'A memória olfativa é a mais potente do ser humano: cada queima eterniza jantares, leituras e celebrações familiares.'
  },
  {
    id: 5,
    title: 'Deixam tudo mais romântico',
    description: 'A luz suave e dourada da cera derramada cria uma atmosfera íntima e envolvente, perfeita para momentos a dois.'
  }
];

// FOTO 3: Frase Marcante Editorial
export const ALVERA_MINIMALIST_QUOTE = {
  tag: 'Velas aromáticas',
  quote: 'SEU MOMENTO FAVORITO, AROMATIZADO COM NOSSAS VELAS.'
};

// FOTO 4: Regulamentação da ANVISA
export const ANVISA_REGULATION_INFO = {
  stamp: 'ANVISA • APROVADO EM 30.09.2026',
  title: 'Regulamentação das velas artesanais foi aprovada.',
  subtitle: 'O que isso significa e como impacta quem produz e vende velas no próprio ateliê.',
  badge: '100% Conforme ANVISA & Boas Práticas',
  summary: 'O marco regulatório sanitário aprovado pela ANVISA estabelece padrões técnicos de qualidade, atoxicidade e segurança contra incêndios para ateliês artesanais.',
  pillars: [
    {
      title: 'Ceras 100% Vegetais Atóxicas',
      description: 'Banimento do uso de parafinas petrolíferas em velas de ambiente e saúde respiratória. Uso exclusivo de blends vegetais puros de coco, palma e soja.'
    },
    {
      title: 'Essências Certificadas IFRA & ANVISA',
      description: 'Livre de ftalatos, parabenos e agentes cancerígenos na combustão. Concentrações rigorosamente calibradas para máxima exalação sem toxicidade.'
    },
    {
      title: 'Pavios Seguros sem Chumbo',
      description: 'Exigência de pavios 100% algodão natural ou madeira tratada sustentável, sem núcleos metálicos pesados que poluem o ar respirado.'
    },
    {
      title: 'Rotulagem & Rastreabilidade de Lotes',
      description: 'Instruções de segurança obrigatórias, dados do fabricante, lote de produção, pesagem correta e precauções contra incêndio visíveis ao consumidor.'
    },
    {
      title: 'Recipientes Resistentes ao Choque Térmico',
      description: 'Vidros de espessura controlada e cerâmicas artesanais seladas que não trincam nem vazam com a temperatura da piscina de cera.'
    }
  ],
  impact: 'Para quem compra na Alvéra, isso é a maior garantia de tranquilidade: velas com qualidade farmacêutica-sanitária, produção responsável e cuidado absoluto com a sua família e seus animais de estimação.'
};

// FOTO 5: "O que sua vela quer que você leia 🕯️" (Guia Oficial de Cuidados)
export const ALVERA_CANDLE_CARE: {
  title: string;
  intro: string;
  rules: CandleCareRule[];
  footer: string;
} = {
  title: 'O que sua vela quer que você leia 🕯️',
  intro: 'Uma vela bem cuidada queima melhor, dura mais e entrega todo o potencial do aroma. Por isso, alguns cuidados fazem toda a diferença:',
  rules: [
    {
      id: 1,
      rule: 'A Primeira Queima (Evite o Túnel)',
      detail: 'Na primeira queima, deixe a vela acesa até a cera derreter por toda a superfície. Isso evita o famoso "túnel" e o desperdício de cera.'
    },
    {
      id: 2,
      rule: 'Apare o Pavio a 5mm',
      detail: 'Antes de reacender, apare o pavio, mantendo aproximadamente 5 mm. Isso evita fumaça preta e mantém a chama serena.'
    },
    {
      id: 3,
      rule: 'Tempo Máximo de Queima',
      detail: 'Não deixe a vela acesa por mais de 4 horas seguidas para preservar a integridade do frasco e do aroma.'
    },
    {
      id: 4,
      rule: 'Local Seguro',
      detail: 'Mantenha longe de correntes de ar, crianças, pets e materiais inflamáveis.'
    },
    {
      id: 5,
      rule: 'Supervisão Constante',
      detail: 'Nunca deixe uma vela acesa sem supervisão.'
    }
  ],
  footer: 'A Alvéra foi feita para perfumar muitos momentos. Cuide bem dela e aproveite cada chama. 🤍'
};
