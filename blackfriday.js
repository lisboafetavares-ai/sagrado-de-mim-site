// BLACK FRIDAY Sagrado de Mim — vale até 30/11/2026 (23h59, horário de Brasília).
// Depois dessa data o site volta sozinho para os preços normais e o cupom deixa de funcionar.
// Para encerrar antes: troque BF_FIM por uma data no passado.

const BF_FIM = new Date("2026-12-01T00:00:00-03:00");
const BF_ATIVA = new Date() < BF_FIM;

// Preço promocional por produto (id do produtos.js -> novo preço)
const BF_PRECOS = {
  "hidratante-250": 65.0,          // hidratante frasco PET
  "hidratante-moldura-300": 89.9,  // hidratante pote Moldura
  "difusor-250": 95.0,
  "home-spray-500": 55.0,          // home spray vidro
  "vela-p": 19.9,                  // vela latinha
  "vela-g": 35.0,                  // vela latona
  "body-splash-250": 49.9
};

// Produtos que normalmente ficam ocultos, mas aparecem durante a Black Friday
const BF_MOSTRAR = ["hidratante-250"];

// Desconto dos quizzes (perfume personalizado e aroma para casa)
const BF_DESCONTO_QUIZ = 0.30;
function bfQuiz(preco) {
  return BF_ATIVA ? Math.round(preco * (1 - BF_DESCONTO_QUIZ) * 100) / 100 : preco;
}

// Cupom de valor fixo, descontado no total da compra
const BF_CUPOM = { code: "SAGRADOBLACK", valor: 10 };

// Mostra "de R$ X por R$ Y" (preço antigo riscado)
function bfBrl(v) { return "R$ " + Number(v).toFixed(2).replace(".", ","); }
function bfPrecoHtml(original, atual) {
  if (original == null || original === atual) return bfBrl(atual);
  return '<s style="opacity:.55; font-weight:400; font-size:.85em; margin-right:6px;">' + bfBrl(original) + '</s>' +
         '<span style="color:#667449; font-weight:700;">' + bfBrl(atual) + '</span>';
}

// Aplica nos produtos da loja (chamado no fim do produtos.js)
function bfAplicarProdutos(lista) {
  if (!BF_ATIVA) return;
  lista.forEach(p => {
    if (BF_PRECOS[p.id] != null && p.preco != null) {
      p.precoOriginal = p.preco;
      p.preco = BF_PRECOS[p.id];
    }
    if (BF_MOSTRAR.includes(p.id)) p.oculto = false;
  });
}

// Faixa no topo do site
if (BF_ATIVA) {
  document.addEventListener("DOMContentLoaded", () => {
    const faixa = document.createElement("div");
    faixa.style.cssText = "background:#3d3a34; color:#F7EFDF; text-align:center; font-family:Jost,Arial,sans-serif; font-size:13px; letter-spacing:.04em; padding:9px 14px;";
    faixa.innerHTML = "<strong>BLACK FRIDAY</strong> · preços especiais até 30/11 · cupom <strong>" + BF_CUPOM.code + "</strong> = R$ " + BF_CUPOM.valor + " off no total";
    document.body.prepend(faixa);
  });
}
