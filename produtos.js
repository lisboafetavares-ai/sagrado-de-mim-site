// Fonte única dos produtos da loja (usada por loja.html, checkout e painel).
// Para colocar foto real: salvar em assets/produtos/ e preencher "img" (ex.: "assets/produtos/home-spray-500.jpg").
// Produto com "limitado": true não vira sob encomenda: quando o estoque zera, aparece como esgotado.
// Produtos com o mesmo "grupo" aparecem num anúncio só na loja, com escolha de tamanho ("variante").
// Produto com "preco": null fica escondido na loja até ter preço.
// Produto com "oculto": true fica fora da loja (não está disponível no momento); para voltar, apague o "oculto".
// O estoque NÃO fica aqui: fica na tabela "stock" do Supabase.

// Aromas de Home Spray e Difusor (lista geral)
const AROMAS = ["Bamboo Trouss", "Nerolia Vetiver", "Incenso Spicy", "Lavanda", "Verbena", "Herbeus", "Maison Vert", "Bobo & Jabuticaba", "Alecrim"];

const AROMAS_HIDRATANTE = ["Aveia e Mel", "Chá Branco", "Mademoiselle", "Rosa Chá"];
const AROMAS_SABONETE = ["Alecrim Blanc", "Rosa Mosqueta", "Algas", "Chá Verde"];
const AROMAS_LIQUIDO_ESPUMA = ["Rosas Brancas"];
const AROMAS_VELAS = ["Lavandin", "Flor de Cerejeira", "Spicy Incense", "Folhas & Bamboo", "Caramelo", "Chocolate", "Canela"];
const AROMAS_LENCOL = ["Chá Branco", "Bamboo Dreams", "Lavanda", "Flor de Cerejeira"];
const AROMAS_BODY_SPLASH = ["Dreams", "Lavanda", "Rosa & Lichia", "Imaginato"];
const AROMAS_SHIMMER = ["Madamme Magnólia", "Madamme Rosa"];
const AROMAS_NEUTRALIZADOR = ["Capim Limão", "Bamboo Trouss", "Amazônia"];
const AROMAS_PASSA_FACIL = ["Confort Home"];

// Lista de aromas de cada produto: usa "aromas" do produto se tiver, senão a lista geral AROMAS.
function aromasDe(p) {
  if (!p || !p.aroma) return [];
  return p.aromas || AROMAS;
}

const PRODUTOS = [
  // Casa & Ambiente
  {"id": "difusor-250", "grupo": "difusor", "grupoNome": "Difusor de Varetas", "variante": "Difusor 250ml", "cat": "Perfumaria & Ambiente", "nome": "Difusor de Varetas", "tamanho": "250ml", "preco": 168.5, "aroma": true, "img": "assets/produtos/difusor.jpg"},
  {"id": "refil-500", "grupo": "difusor", "grupoNome": "Difusor de Varetas", "variante": "Refil 500ml", "cat": "Perfumaria & Ambiente", "nome": "Refil de Difusor de Varetas", "tamanho": "500ml", "preco": 175.0, "aroma": true, "img": null},
  {"id": "refil-1l", "grupo": "difusor", "grupoNome": "Difusor de Varetas", "variante": "Refil 1L", "cat": "Perfumaria & Ambiente", "nome": "Refil de Difusor de Varetas", "tamanho": "1L", "preco": 346.9, "aroma": true, "img": null},
  {"id": "home-spray-250", "grupo": "home-spray", "grupoNome": "Home Spray", "variante": "250ml", "cat": "Perfumaria & Ambiente", "nome": "Home Spray", "tamanho": "250ml", "preco": 45.0, "aroma": true, "img": "assets/produtos/home-spray.jpg"},
  {"id": "home-spray-500", "grupo": "home-spray", "grupoNome": "Home Spray", "variante": "500ml", "cat": "Perfumaria & Ambiente", "nome": "Home Spray", "tamanho": "500ml", "preco": 85.0, "aroma": true, "img": "assets/produtos/home-spray.jpg"},
  {"id": "agua-lencol", "cat": "Perfumaria & Ambiente", "nome": "Água para Lençol", "tamanho": "", "preco": null, "aroma": true, "aromas": AROMAS_LENCOL, "img": "assets/kits/agua-lencol.jpg"},
  {"id": "neutralizador-70", "cat": "Perfumaria & Ambiente", "nome": "Neutralizador de Odores", "tamanho": "70ml", "preco": 29.9, "aroma": true, "aromas": AROMAS_NEUTRALIZADOR, "img": null},
  {"id": "passa-facil", "cat": "Perfumaria & Ambiente", "nome": "Passa Fácil", "tamanho": "", "preco": 29.9, "aroma": true, "aromas": AROMAS_PASSA_FACIL, "img": null},
  {"id": "vela-p", "grupo": "vela", "grupoNome": "Vela na Latinha", "variante": "Pequena", "cat": "Perfumaria & Ambiente", "nome": "Vela na Latinha — Pequena", "tamanho": "", "preco": 35.0, "aroma": true, "aromas": AROMAS_VELAS, "img": "assets/kits/vela.jpg"},
  {"id": "vela-g", "grupo": "vela", "grupoNome": "Vela na Latinha", "variante": "Grande", "cat": "Perfumaria & Ambiente", "nome": "Vela na Latinha — Grande", "tamanho": "", "preco": 70.0, "aroma": true, "aromas": AROMAS_VELAS, "img": "assets/kits/vela.jpg"},
  {"id": "aromatizador-100", "cat": "Perfumaria & Ambiente", "nome": "Aromatizador de Ambientes", "tamanho": "100ml", "preco": 26.9, "aroma": true, "oculto": true, "img": null},

  // Perfumes (perfume só personalizado, pelo quiz)
  {"id": "body-splash-250", "cat": "Perfumaria Pessoal", "nome": "Body Splash", "tamanho": "250ml", "preco": 89.9, "aroma": true, "aromas": AROMAS_BODY_SPLASH, "img": null},
  {"id": "body-shimmer-225", "cat": "Perfumaria Pessoal", "nome": "Body Shimmer", "tamanho": "225ml", "preco": null, "aroma": true, "aromas": AROMAS_SHIMMER, "img": null},
  {"id": "perfume-cabelo-40", "cat": "Perfumaria Pessoal", "nome": "Perfume para Cabelos", "tamanho": "40ml", "preco": 44.9, "aroma": true, "oculto": true, "img": null},

  // Corpo
  {"id": "hidratante-250", "grupo": "hidratante", "grupoNome": "Hidratante Corporal", "variante": "250ml", "cat": "Corpo", "nome": "Hidratante Corporal", "tamanho": "250ml", "preco": 79.9, "aroma": true, "oculto": true, "aromas": AROMAS_HIDRATANTE, "img": null},
  {"id": "hidratante-moldura-300", "grupo": "hidratante", "grupoNome": "Hidratante Corporal", "variante": "300g · pote Moldura", "cat": "Corpo", "nome": "Hidratante Corporal", "tamanho": "300g · pote Moldura", "preco": 129.9, "aroma": true, "aromas": AROMAS_HIDRATANTE, "img": "assets/produtos/hidratante.jpg"},
  {"id": "manteiga-200", "cat": "Corpo", "nome": "Manteiga Corporal", "tamanho": "200g", "preco": 149.9, "aroma": true, "oculto": true, "img": null},
  {"id": "creme-pes-100", "cat": "Corpo", "nome": "Creme para Tratamento dos Pés", "tamanho": "100ml", "preco": 89.9, "aroma": true, "oculto": true, "img": null},

  // Banho & Facial
  {"id": "sabonete-fatia-125", "cat": "Banho & Facial", "nome": "Sabonete Fatia", "tamanho": "125g", "preco": 32.0, "aroma": true, "aromas": AROMAS_SABONETE, "img": "assets/produtos/sabonete-fatia.jpg"},
  {"id": "sabonete-gel-250", "cat": "Banho & Facial", "nome": "Sabonete Líquido", "tamanho": "250ml", "preco": 123.6, "aroma": true, "aromas": AROMAS_LIQUIDO_ESPUMA, "img": "assets/produtos/sabonete-liquido.jpg"},
  {"id": "espuma-facial-70", "cat": "Banho & Facial", "nome": "Espuma de Limpeza Facial", "tamanho": "70ml", "preco": 62.0, "aroma": true, "aromas": AROMAS_LIQUIDO_ESPUMA, "img": null},

  // Edição limitada
  {"id": "caixa-misteriosa", "cat": "Edição limitada", "nome": "Caixa Misteriosa", "tamanho": "Blind box de produtos", "preco": 250.0, "aroma": false, "limitado": true, "img": null}
];
