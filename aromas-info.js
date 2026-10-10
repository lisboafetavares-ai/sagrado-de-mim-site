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

// Descrição, modo de uso e ingredientes de cada produto (aparecem nas abas da janela do produto).
// Ingredientes vazios aparecem como "em breve".
const PRODUTOS_INFO = {
  "difusor-250": { desc: "Perfuma o ambiente de forma contínua e delicada, sem precisar de chama ou tomada. Feito à mão, em vidro, com varetas que espalham o aroma pela casa.",
    modo: "Retire a tampa, coloque as varetas no frasco e espere algumas horas para que absorvam o líquido. Vire as varetas a cada 2 ou 3 dias para renovar a intensidade. Mantenha longe do sol e de fontes de calor.",
    ingredientes: "Óleo Mineral, Fragrância, Álcool, Corante." },
  "refil-500": { desc: "Refil para o seu difusor de varetas, pra continuar com o mesmo aroma na sua casa.",
    modo: "Complete o frasco do difusor quando o líquido estiver no fim. Se quiser, troque as varetas para renovar a difusão.",
    ingredientes: "Óleo Mineral, Fragrância, Álcool, Corante." },
  "refil-1l": { desc: "Refil grande para o seu difusor de varetas, pra continuar com o mesmo aroma por muito mais tempo.",
    modo: "Complete o frasco do difusor quando o líquido estiver no fim. Se quiser, troque as varetas para renovar a difusão.",
    ingredientes: "Óleo Mineral, Fragrância, Álcool, Corante." },
  "home-spray-250": { desc: "Um toque de perfume imediato nos ambientes, tecidos e cortinas.",
    modo: "Agite antes de usar. Borrife no ar, a cerca de 1 metro de distância, em direção ao ambiente, cortinas ou almofadas. Evite borrifar em tecidos delicados ou superfícies envernizadas.",
    ingredientes: "Água, Álcool, Fragrância, Glicerina." },
  "home-spray-500": { desc: "Um toque de perfume imediato nos ambientes, tecidos e cortinas, no tamanho econômico.",
    modo: "Agite antes de usar. Borrife no ar, a cerca de 1 metro de distância, em direção ao ambiente, cortinas ou almofadas. Evite borrifar em tecidos delicados ou superfícies envernizadas.",
    ingredientes: "Água, Álcool, Fragrância, Glicerina." },
  "agua-lencol": { desc: "Perfuma lençóis, fronhas e roupas de cama pra um sono mais aconchegante.",
    modo: "Borrife sobre a roupa de cama a cerca de 30 cm de distância, antes de deitar ou ao passar. Faça um teste antes em tecidos delicados." },
  "neutralizador-70": { desc: "Neutraliza odores do banheiro e deixa um perfume agradável no lugar.",
    modo: "Antes de usar o vaso sanitário, borrife de 3 a 5 vezes direto na água. Dê a descarga normalmente depois." },
  "passa-facil": { desc: "Facilita na hora de passar a roupa e deixa as peças perfumadas.",
    modo: "Borrife sobre a roupa antes de passar, a cerca de 20 cm de distância, e passe normalmente. Faça um teste antes em tecidos delicados." },
  "vela-p": { desc: "Vela aromática artesanal na latinha, pra deixar a casa perfumada e aconchegante.",
    modo: "Na primeira vez, deixe acesa até a cera derreter por toda a superfície. Apare o pavio antes de acender de novo. Nunca deixe a vela acesa sem supervisão e mantenha longe de crianças, animais e objetos inflamáveis." },
  "vela-g": { desc: "Vela aromática artesanal na latinha grande, pra deixar a casa perfumada e aconchegante por mais tempo.",
    modo: "Na primeira vez, deixe acesa até a cera derreter por toda a superfície. Apare o pavio antes de acender de novo. Nunca deixe a vela acesa sem supervisão e mantenha longe de crianças, animais e objetos inflamáveis." },
  "body-splash-250": { desc: "Perfume leve para o corpo, pra usar a qualquer hora do dia.",
    modo: "Borrife sobre a pele limpa, nos pulsos, pescoço e colo. Pode reaplicar ao longo do dia." },
  "body-shimmer-225": { desc: "Perfuma e deixa um brilho suave na pele.",
    modo: "Agite antes de usar e borrife sobre a pele limpa e seca, nos braços, colo e ombros." },
  "hidratante-250": { desc: "Hidratação diária com toque leve e o perfume do aroma que você escolher.",
    modo: "Após o banho, aplique na pele limpa e seca, massageando até absorver." },
  "hidratante-moldura-300": { desc: "Hidratação diária com toque leve e o perfume do aroma que você escolher.",
    modo: "Após o banho, aplique na pele limpa e seca, massageando até absorver." },
  "sabonete-fatia-125": { desc: "Sabonete artesanal em fatia, feito à mão em pequenas quantidades.",
    modo: "Molhe o sabonete e a pele, faça espuma, massageie e enxágue bem. Guarde em saboneteira seca entre os usos." },
  "sabonete-gel-250": { desc: "Sabonete líquido artesanal, perfumado e delicado com a pele.",
    modo: "Aplique uma pequena quantidade na pele molhada, faça espuma e enxágue." },
  "espuma-facial-70": { desc: "Espuma de limpeza facial suave, para o dia a dia.",
    modo: "Aplique no rosto úmido, massageie suavemente evitando a área dos olhos e enxágue." },
  "kit-lavabo": { desc: "Difusor de varetas e sabonete líquido no mesmo aroma, pra deixar o lavabo perfumado e bonito. Um presente que fica lindo em qualquer casa.",
    modo: "Difusor: coloque as varetas no frasco e vire-as a cada 2 ou 3 dias. Sabonete: aplique nas mãos molhadas, faça espuma e enxágue." },
  "caixa-misteriosa": { desc: "Uma seleção surpresa de produtos Sagrado de Mim, montada à mão. Edição limitada: você só descobre o que tem dentro quando abrir." }
};
function infoProduto(id) { return (typeof PRODUTOS_INFO !== "undefined" && PRODUTOS_INFO[id]) || {}; }
