// Descrição e pirâmide olfativa de cada aroma (fonte: fornecedor Peter Paiva / Vollmens).
// Para completar um aroma, preencha: desc (frase), saida, corpo, fundo. Campos vazios não aparecem no site.
const AROMAS_INFO = {
  "Bamboo Trouss": { desc: "União do Bamboo, herbal e florado com fundo levemente cítrico, com o Trouss Gold, amadeirado e cítrico. Um aroma firme, vivo e envolvente.",
    saida: "Limão, Menta, Bergamota, Lima, Alecrim, Lavandim, Manjericão", corpo: "Jasmim, Gerânio, Lírio do Vale, Cedro, Patchouli", fundo: "Musk, Âmbar, Musgo de Carvalho" },
  "Nerolia Vetiver": { desc: "Floral amadeirado e luminoso, com a flor de laranjeira em destaque, um toque de figo e o frescor do manjericão.",
    saida: "Manjericão, Bergamota, Petitgrain", corpo: "Flor de Laranjeira, Figo, Rosa", fundo: "Vetiver, Musk Branco" },
  "Alecrim": { desc: "Herbal e revigorante: estimula a concentração e a memória, reduz o cansaço e renova o ambiente.",
    saida: "Limão, Alecrim, Lavanda, Eucalipto", corpo: "Jasmim, Sândalo, Lírio do Vale", fundo: "Âmbar Gris, Madeiras de Pinho" },
  "Alecrim Blanc": { desc: "Herbal com leveza e elegância. Estimula a memória e ajuda a aliviar o cansaço mental." },
  "Mademoiselle": { desc: "Ousada e fresca, fala da mulher livre e confiante. Cítrico leve que evolui para um coração floral e uma base quente.",
    saida: "Notas Cítricas", corpo: "Rosa, Ylang-Ylang", fundo: "Baunilha, Fava Tonka, Madeiras Esfumaçadas" },
  "Madamme Magnólia": { desc: "Floral elegante e acolhedor, encontro da Magnólia com a Mademoiselle: clássico e contemporâneo ao mesmo tempo.",
    saida: "Gálbano, Pêssego, Gardênia", corpo: "Cravo, Jasmim, Magnólia, Lírio do Vale", fundo: "Musk, Cedro" },
  "Imaginato": { desc: "Cítrico e especiado, uma sofisticação leve, contemporânea e cheia de vitalidade.",
    saida: "Bergamota, Pomelo, Mandarina", corpo: "Flor de Laranjeira, Gengibre, Cardamomo, Noz-moscada", fundo: "Chá Preto, Âmbar, Guaiaco, Olíbano, Musk" },
  "Rosas Brancas": { desc: "Suave e marcante, traz paz e ternura. Floral branco levemente verde, com frescor e fundo almiscarado amadeirado.",
    saida: "Frésia, Pêssego, Damasco, Notas Verdes", corpo: "Rosa, Peônia, Jasmim, Ylang-Ylang, Lírio do Vale", fundo: "Cedro, Sândalo, Baunilha, Almíscar" },
  "Chá Branco": { desc: "Leve e sofisticado: cítrico, floral e aromático, traz bem-estar e serenidade.",
    saida: "Lima, Lavanda, Bergamota, Limão Siciliano", corpo: "Violeta, Jasmim, Manjericão, Lírio do Vale", fundo: "Musk, Vetiver" },
  "Flor de Cerejeira": { desc: "Floral suave e delicado, com toque frutado e levemente amadeirado. Traz energia positiva, harmonia e paz.",
    saida: "Pera, Maçã, Notas Verdes", corpo: "Íris, Jasmim, Tuberosa, Lírio do Vale", fundo: "Musk, Cedro, Sândalo" },
  "Canela": { desc: "Intenso, picante e acolhedor: o melhor da canela especiada com fundo adocicado.",
    saida: "Maçã, Canela, Pêssego", corpo: "Cravo", fundo: "Baunilha, Cumarina" },
  "Folhas & Bamboo": { desc: "Marcante, seco e cítrico, com sensação de natureza, limpeza e frescor, junto ao herbal florado do Bamboo." },
  "Bamboo Dreams": { desc: "O aclamado Bamboo, exclusivo da linha Peter Paiva, na versão Dreams." }
};

function infoAroma(nome) { return (typeof AROMAS_INFO !== "undefined" && AROMAS_INFO[nome]) || null; }

function htmlInfoAroma(nome) {
  const i = infoAroma(nome);
  if (!i) return "";
  const linha = (rot, v) => v ? '<div><b>' + rot + ':</b> ' + v + '</div>' : '';
  return '<div class="aroma-info">' + (i.desc ? '<p>' + i.desc + '</p>' : '') +
    linha("Saída", i.saida) + linha("Corpo", i.corpo) + linha("Fundo", i.fundo) + '</div>';
}
