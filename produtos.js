// Fonte única dos produtos da loja (usada por loja.html, checkout e painel).
// Para colocar foto real: salvar em assets/produtos/ e preencher "img" (ex.: "assets/produtos/home-spray-500.jpg").
// O estoque NÃO fica aqui: fica na tabela "stock" do Supabase.
const AROMAS = ["Lavanda", "Canela", "Incenso", "Mirra com Arruda", "Bamboo Trouss", "Nerolia", "Chá Verde"];

const PRODUTOS = [
  {"id": "difusor-250", "cat": "Perfumaria & Ambiente", "nome": "Difusor de Varetas", "tamanho": "250ml", "preco": 168.5, "aroma": true, "img": null},
  {"id": "refil-500", "cat": "Perfumaria & Ambiente", "nome": "Refil de Difusor de Varetas", "tamanho": "500ml", "preco": 175.0, "aroma": true, "img": null},
  {"id": "refil-1l", "cat": "Perfumaria & Ambiente", "nome": "Refil de Difusor de Varetas", "tamanho": "1L", "preco": 346.9, "aroma": true, "img": null},
  {"id": "aromatizador-100", "cat": "Perfumaria & Ambiente", "nome": "Aromatizador de Ambientes", "tamanho": "100ml", "preco": 26.9, "aroma": false, "img": null},
  {"id": "home-spray-250", "cat": "Perfumaria & Ambiente", "nome": "Home Spray", "tamanho": "250ml", "preco": 45.0, "aroma": true, "img": null},
  {"id": "home-spray-500", "cat": "Perfumaria & Ambiente", "nome": "Home Spray", "tamanho": "500ml", "preco": 85.0, "aroma": true, "img": null},
  {"id": "neutralizador-70", "cat": "Perfumaria & Ambiente", "nome": "Neutralizador de Odores", "tamanho": "70ml", "preco": 29.9, "aroma": false, "img": null},
  {"id": "vela-p", "cat": "Perfumaria & Ambiente", "nome": "Vela na Latinha — Pequena", "tamanho": "", "preco": 35.0, "aroma": false, "img": null},
  {"id": "vela-g", "cat": "Perfumaria & Ambiente", "nome": "Vela na Latinha — Grande", "tamanho": "", "preco": 70.0, "aroma": false, "img": null},
  {"id": "perfume-cabelo-40", "cat": "Perfumaria Pessoal", "nome": "Perfume para Cabelos", "tamanho": "40ml", "preco": 44.9, "aroma": false, "img": null},
  {"id": "body-splash-240", "cat": "Perfumaria Pessoal", "nome": "Body Splash", "tamanho": "240ml", "preco": 89.9, "aroma": false, "img": null},
  {"id": "hidratante-250", "cat": "Corpo", "nome": "Hidratante Corporal", "tamanho": "250ml", "preco": 79.9, "aroma": false, "img": null},
  {"id": "hidratante-moldura-300", "cat": "Corpo", "nome": "Hidratante Corporal \"Moldura\"", "tamanho": "300g", "preco": 129.9, "aroma": false, "img": null},
  {"id": "manteiga-200", "cat": "Corpo", "nome": "Manteiga Corporal", "tamanho": "200g", "preco": 149.9, "aroma": false, "img": null},
  {"id": "creme-pes-100", "cat": "Corpo", "nome": "Creme para Tratamento dos Pés", "tamanho": "100ml", "preco": 89.9, "aroma": false, "img": null},
  {"id": "passa-facil", "cat": "Corpo", "nome": "Passa Fácil", "tamanho": "", "preco": 29.9, "aroma": false, "img": null},
  {"id": "sabonete-fatia-125", "cat": "Banho & Facial", "nome": "Sabonete Fatia", "tamanho": "125g", "preco": 32.0, "aroma": false, "img": null},
  {"id": "sabonete-gel-250", "cat": "Banho & Facial", "nome": "Sabonete em Gel", "tamanho": "250ml", "preco": 123.6, "aroma": false, "img": null},
  {"id": "espuma-facial-70", "cat": "Banho & Facial", "nome": "Espuma de Limpeza Facial", "tamanho": "70ml", "preco": 62.0, "aroma": false, "img": null}
];
