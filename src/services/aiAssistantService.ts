import { GoogleGenAI } from '@google/genai';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../data/initialData';

const SYSTEM_INSTRUCTION = `
Você é a Concierge Alvéra, assistente de inteligência artificial da marca "Alvéra – Velas, Aromas e Bem-Estar".
Seu papel é ser acolhedora, sofisticada, gentil, poética e muito prestativa.

Informações da Marca Alvéra:
- Slogan: Velas • Aromas • Bem-Estar
- Endereço físico: Rua Santa Juliana, 625 – Bairro Boa Vista, Uberaba - MG
- Telefone / WhatsApp: (34) 99249-5905
- Produtos: Velas aromáticas 100% vegetais (blend de cera de coco, palma e soja), difusores de varetas com base de cereais, home sprays purificantes, acessórios dourados de queima e kits presenteáveis de luxo.
- Diferenciais: Feitas à mão, pavio 100% algodão sem chumbo, essências nobres de perfumaria fina, queima limpa e sustentável, frascos sofisticados.

CONFORMIDADE ANVISA (Regulamentação Aprovada em 30.09.2026):
- A Alvéra opera em 100% de conformidade com a regulamentação aprovada pela ANVISA para velas artesanais.
- Nossas velas utilizam exclusivamente ceras 100% vegetais (banimento total de parafinas petrolíferas tóxicas), pavios de algodão puro sem chumbo, essências certificadas pela IFRA/ANVISA livres de parabenos e ftalatos, recipientes resistentes ao choque térmico e rotulagem transparente de segurança contra incêndios e rastreabilidade de lotes.

CATÁLOGO COMPLETO DE ESSÊNCIAS (Mais de 70 opções disponíveis para escolha no chat):
Açaí, Anís, Algodão, Alecrim Doce, Alecrim L B, Alfazema, Algas Marinhas, Aloe Vera, Arruda, Balinha de Café, Baunilha, Banana, Brisa do Campo, Brisa do Mar, Buriti, Camomila, Canela, Capim Limão, Chicletes Tuti Frutti, Chá Verde, Chá Branco, Chantily, Chocolate, Cereja c/ Avelã, Cedro, Coco, Cravo, Dama da Noite, Erva Doce, Flor de Cerejeira, Flor de Laranjeira, Flor de Pitanga, Floral, Floral Frutal, Floral Rose, Flores do Campo, Fresh, Frutal, Frutas Vermelhas, Hortelã Baby (Suave), Jasmim, Lavanda, Lavanda Herbal, Lavanda Gldys, Lavanda Inglesa, Lavanda Musk, Leite de Cabra, Laranja, Limão c/ Baunilha, Limão Casca, Limão Siciliano, Lírio do Campo, Macadâmia, Maçã e Canela, Maçã, Maçã Verde, Maracujá Doce, Marine, Mel, Melancia, Morango, Morango c/ Avelã, Morango Champagne, Morango com Chantily, Morango Silvestre, Pêssego, Pimenta Rosa, Pitanga, Primavera, Talias, Talco Floral, Talco Baby, Tangerina, Tutti Frutti, Vanilla, Violeta, Violeta com Amora, Ylang Ylang.

5 VANTAGENS DA SUA VELA AROMÁTICA:
1. Trazem conforto ao lar.
2. Deixam o ambiente perfumado com aromas únicos.
3. Podem beneficiar sua saúde pela aromaterapia.
4. Transformam momentos em memórias inconfundíveis.
5. Deixam tudo mais romântico.

O QUE SUA VELA QUER QUE VOCÊ LEIA 🕯️ (Guia Oficial de Cuidados):
- Na primeira queima, deixe a vela acesa até a cera derreter por toda a superfície para evitar o "túnel" e desperdício de cera.
- Antes de reacender, apare o pavio, mantendo aproximadamente 5 mm.
- Não deixe a vela acesa por mais de 4 horas seguidas.
- Mantenha longe de correntes de ar, crianças, pets e materiais inflamáveis.
- Nunca deixe uma vela acesa sem supervisão.

Diretrizes obrigatórias:
1. Responda em português com elegância, acolhimento e clareza.
2. Indique os aromas ideais com base na necessidade do cliente (relaxar, dormir melhor, ter mais foco, aconchego a dois, etc.).
3. SEMPRE convide cordialmente o cliente a finalizar ou tirar dúvidas no WhatsApp oficial (34) 99249-5905 e a acompanhar as novidades no Instagram @alvera.aromas.
`;

export async function askAlveraAssistant(userMessage: string, chatHistory: Array<{ role: 'user' | 'assistant'; text: string }> = []): Promise<string> {
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
                 (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY);

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const contents = [
        { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] },
        { role: 'model', parts: [{ text: 'Entendido. Estou pronta para atender com todo o requinte e carinho da Alvéra.' }] },
        ...chatHistory.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call failed, using graceful sommelier fallback:', err);
    }
  }

  // Graceful rule-based intelligent fallback
  const lower = userMessage.toLowerCase();

  if (lower.includes('dormir') || lower.includes('sono') || lower.includes('ansiedade') || lower.includes('calma') || lower.includes('relaxar')) {
    return `Para desacelerar e preparar seu corpo para um sono reparador, recomendo nossa vela **Lavanda Francesa & Alecrim do Campo**. O óleo essencial de lavanda atua diretamente nos receptores de serenidade, enquanto o alecrim traz clareza. Acenda-a cerca de 1 hora antes de dormir no quarto. ✨\n\nAdoraria te ajudar a escolher o kit completo! Me chame no WhatsApp **(34) 99249-5905** ou siga nosso Instagram **@alvera.aromas**.`;
  }

  if (lower.includes('presente') || lower.includes('aniversario') || lower.includes('casamento') || lower.includes('kit') || lower.includes('box')) {
    return `Nossa **Gift Box Santuário Particular** é a escolha mais memorável! Ela vem em uma caixa rígida refinada preta e dourada, com fita de gorgurão, duas velas à sua escolha e um home spray. Um presente sofisticado e inesquecível.\n\nQuer personalizar uma mensagem no cartão? Fale conosco direto no WhatsApp **(34) 99249-5905**!`;
  }

  if (lower.includes('foco') || lower.includes('trabalho') || lower.includes('estudar') || lower.includes('produtividade')) {
    return `Para momentos de alta concentração e elegância no escritório, nossa vela **Cedro Nobre & Cardamomo Negro** é impecável. As notas amadeiradas do cedro atlas e as especiarias finas criam uma atmosfera nobre e focada.\n\nQuer encomendar para o seu espaço de trabalho? Estamos no WhatsApp **(34) 99249-5905**!`;
  }

  if (lower.includes('receber') || lower.includes('visita') || lower.includes('sala') || lower.includes('dia a dia') || lower.includes('fresco')) {
    return `Para a sala de estar e recepção de amigos, a **Luar de Bergamota & Âmbar Dourado** é a nossa campeã de elogios! O frescor solar da bergamota italiana unido ao calor aveludado do âmbar cria um ambiente acolhedor e muito refinado.\n\nExperimente também nosso **Home Spray Brisa de Alecrim** para borrifar nas almofadas antes das visitas chegarem. Fale conosco no WhatsApp **(34) 99249-5905**!`;
  }

  if (lower.includes('anvisa') || lower.includes('regulament') || lower.includes('regra') || lower.includes('sanitari') || lower.includes('norma')) {
    return `✨ **Regulamentação ANVISA de Velas Artesanais (Aprovada em 30.09.2026):**\nA Alvéra tem orgulho de operar em 100% de conformidade com as novas regras da ANVISA! Isso significa:\n• Uso exclusivo de ceras 100% vegetais (livres de parafinas petrolíferas tóxicas).\n• Pavios 100% algodão ou madeira sem chumbo.\n• Essências certificadas pela IFRA/ANVISA sem parabenos ou ftalatos.\n• Rastreabilidade total de lotes e rotulagem preventiva de segurança contra incêndios.\n\nSua saúde e a da sua família estão sempre em primeiro lugar. Qualquer dúvida, estamos no WhatsApp **(34) 99249-5905**!`;
  }

  if (lower.includes('essencia') || lower.includes('aroma') || lower.includes('catalogo') || lower.includes('cheiro') || lower.includes('lista')) {
    return `Temos um catálogo riquíssimo com **mais de 70 essências nobres para velas aromáticas**! Entre as favoritas estão:\n• **Cítricos:** Bergamota, Limão Siciliano, Capim Limão, Laranja.\n• **Florais:** Flor de Cerejeira, Lavanda Francesa, Jasmim, Dama da Noite, Lírio do Campo.\n• **Gourmand:** Baunilha, Cereja c/ Avelã, Chocolate, Morango Champagne.\n• **Amadeirados:** Cedro, Canela, Pimenta Rosa, Macadâmia.\n\nVocê pode **escolher suas essências diretamente pelo chat do WhatsApp (34) 99249-5905** para montar sua vela personalizada ou receber amostras!`;
  }

  if (lower.includes('vantagem') || lower.includes('beneficio') || lower.includes('por que')) {
    return `Descubra as **5 Vantagens da sua Vela Aromática Alvéra**:\n1. **Trazem conforto ao lar** (calor visual e relaxamento imediato).\n2. **Deixam o ambiente perfumado** com fragrâncias únicas de perfumaria fina.\n3. **Beneficiam sua saúde pela aromaterapia** com óleos que aliviam o estresse.\n4. **Transformam momentos em memórias inconfundíveis** pela memória olfativa.\n5. **Deixam tudo mais romântico** com iluminação suave a dois.\n\nQuer escolher a sua? Fale conosco no WhatsApp **(34) 99249-5905**!`;
  }

  if (lower.includes('cuidar') || lower.includes('pavio') || lower.includes('queima') || lower.includes('dura') || lower.includes('dica') || lower.includes('leia')) {
    return `🕯️ **O que sua vela quer que você leia:**\nUma vela bem cuidada queima melhor, dura mais e entrega todo o potencial do aroma:\n1. Na primeira queima, deixe a vela acesa até a cera derreter por toda a superfície para evitar o "túnel" e desperdício de cera.\n2. Antes de reacender, apare o pavio mantendo cerca de 5 mm.\n3. Não deixe a vela acesa por mais de 4 horas seguidas.\n4. Mantenha longe de correntes de ar, crianças, pets e materiais inflamáveis.\n5. Nunca deixe uma vela acesa sem supervisão.\n\nA Alvéra foi feita para perfumar muitos momentos. Cuide bem dela e aproveite cada chama! 🤍 Dúvidas? Me chame no WhatsApp **(34) 99249-5905**.`;
  }

  if (lower.includes('onde') || lower.includes('loja') || lower.includes('endereço') || lower.includes('visitar') || lower.includes('uberaba')) {
    return `Nosso ateliê fica na **Rua Santa Juliana, 625 – Bairro Boa Vista, Uberaba - MG**. Você é sempre muito bem-vindo(a) para vivenciar a experiência sensorial de perto! Atendemos também pelo WhatsApp **(34) 99249-5905** com entrega para todo o Brasil.`;
  }

  return `Que alegria ter você conosco na Alvéra! Cada uma de nossas criações é derramada à mão com ceras 100% vegetais e essências nobres, pensadas para transformar sua casa em um refúgio de paz.\n\nVocê procura um aroma para algum ambiente específico ou gostaria de uma recomendação para presentear? Me conte o que você busca, ou se preferir, nosso atendimento personalizado no WhatsApp **(34) 99249-5905** está à sua inteira disposição!`;
}
