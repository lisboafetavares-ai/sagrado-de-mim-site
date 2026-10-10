// Estúdio de etiquetas do painel: todas as etiquetas da Sagrado de Mim, editáveis, para imprimir ou baixar.
// Cada modelo desenha em "px de projeto" e informa o tamanho real em mm; a impressão converte para o tamanho exato.
const PALETA = { creme: "#F7EFDF", areia: "#D8C8A9", sage: "#8F9A6C", oliva: "#667449", tinta: "#2E2A25" };
const PALETA_OPCOES = [["Creme", "#F7EFDF"], ["Areia", "#D8C8A9"], ["Sage", "#8F9A6C"], ["Oliva", "#667449"]];
const TINTA_OPCOES = [["Automática", ""], ["Escura", "#2E2A25"], ["Oliva", "#667449"], ["Creme", "#F7EFDF"], ["Areia", "#D8C8A9"]];
const ESCUROS = ["#667449", "#8f9a6c"];
function esEsc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
function tintaPara(fundo, escolhida) { return escolhida || (ESCUROS.includes(String(fundo).toLowerCase()) ? PALETA.creme : PALETA.tinta); }
function logoPara(tinta) {
  const m = { "#f7efdf": "creme", "#d8c8a9": "areia", "#8f9a6c": "sage", "#667449": "oliva" };
  const k = m[String(tinta).toLowerCase()];
  return new URL(k ? "assets/logo-cursiva-" + k + ".png" : "assets/logo-cursiva.png", location.href).href;
}
function notasCurtas(aroma) {
  const i = typeof infoAroma === "function" ? infoAroma(aroma) : null;
  if (!i || !i.saida) return "";
  return [i.saida, i.corpo, i.fundo].map(x => String(x).split(",")[0].trim()).join(" - ");
}
function paoSvg(meses, cor, w) {
  return '<svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg" style="width:' + w + 'px; display:block;"><g fill="none" stroke="' + cor + '" stroke-width="3.8" stroke-linejoin="round" stroke-linecap="round">' +
    '<path d="M12 44 L14 74 Q50 90 86 74 L88 44"/><path d="M12 44 Q50 58 88 44"/><path d="M12 44 Q16 36 34 33"/><path d="M13.2 52 Q50 64 86.8 52"/>' +
    '<ellipse cx="54" cy="20" rx="38" ry="12" transform="rotate(-9 54 20)"/><path d="M16.6 26 L17.4 32 Q22 44 58 40 Q88 36 92.4 20 L91.6 14"/></g>' +
    '<text x="50" y="76.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="' + cor + '">' + meses + ' M</text></svg>';
}
function selos(cor, w, comPao, meses) {
  return '<div style="display:flex; gap:' + Math.round(w / 2.4) + 'px; align-items:center; justify-content:center;">' +
    seloFeitoAMao(w + 'px', cor) + (comPao ? paoSvg(meses || 12, cor, w - 2) : '') + seloCrueltyFree(w + 'px', cor) + '</div>';
}
function produtosDe(filtro) { return PRODUTOS.filter(filtro); }
function nomeProduto(p) { return (p.grupoNome || p.nome) + (p.variante ? " · " + p.variante : (p.tamanho ? " " + p.tamanho : "")); }

const PADRAO_LACRE = "<svg width=\"302\" height=\"470\" viewBox=\"0 0 302 470\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" style=\"display:block\"><defs>\n<g id=\"lavanda\"><path d=\"M0 26 L0 -24\" stroke=\"#667449\" stroke-width=\"1.2\" fill=\"none\" stroke-linecap=\"round\"></path>\n<ellipse cx=\"2.2\" cy=\"-24.0\" rx=\"2.1\" ry=\"3.1\" fill=\"#8F9A6C\" transform=\"rotate(18 2.2 -24.0)\"></ellipse><ellipse cx=\"-2.2\" cy=\"-19.8\" rx=\"2.1\" ry=\"3.1\" fill=\"#8F9A6C\" transform=\"rotate(-18 -2.2 -19.8)\"></ellipse><ellipse cx=\"2.2\" cy=\"-15.6\" rx=\"2.1\" ry=\"3.1\" fill=\"#8F9A6C\" transform=\"rotate(18 2.2 -15.6)\"></ellipse><ellipse cx=\"-2.2\" cy=\"-11.399999999999999\" rx=\"2.1\" ry=\"3.1\" fill=\"#8F9A6C\" transform=\"rotate(-18 -2.2 -11.399999999999999)\"></ellipse><ellipse cx=\"2.2\" cy=\"-7.199999999999999\" rx=\"2.1\" ry=\"3.1\" fill=\"#8F9A6C\" transform=\"rotate(18 2.2 -7.199999999999999)\"></ellipse><ellipse cx=\"-2.2\" cy=\"-3.0\" rx=\"2.1\" ry=\"3.1\" fill=\"#8F9A6C\" transform=\"rotate(-18 -2.2 -3.0)\"></ellipse><ellipse cx=\"2.2\" cy=\"1.2000000000000028\" rx=\"2.1\" ry=\"3.1\" fill=\"#8F9A6C\" transform=\"rotate(18 2.2 1.2000000000000028)\"></ellipse><ellipse cx=\"-2.2\" cy=\"5.400000000000002\" rx=\"2.1\" ry=\"3.1\" fill=\"#8F9A6C\" transform=\"rotate(-18 -2.2 5.400000000000002)\"></ellipse>\n<path d=\"M0 14 q-6 -3 -9 -10\" stroke=\"#667449\" stroke-width=\"1\" fill=\"none\" stroke-linecap=\"round\"></path></g>\n<g id=\"eucalipto\"><path d=\"M0 26 C2 10 -2 -8 1 -26\" stroke=\"#6B5A48\" stroke-width=\"1.1\" fill=\"none\" stroke-linecap=\"round\"></path>\n<circle cx=\"5.5\" cy=\"18.0\" r=\"4.6\" fill=\"#8F9A6C\" stroke=\"#667449\" stroke-width=\"0.6\"></circle><circle cx=\"-5\" cy=\"9.5\" r=\"4.1\" fill=\"#8F9A6C\" stroke=\"#667449\" stroke-width=\"0.6\"></circle><circle cx=\"5.5\" cy=\"1.0\" r=\"3.7\" fill=\"#8F9A6C\" stroke=\"#667449\" stroke-width=\"0.6\"></circle><circle cx=\"-5\" cy=\"-7.5\" r=\"3.2\" fill=\"#8F9A6C\" stroke=\"#667449\" stroke-width=\"0.6\"></circle><circle cx=\"5.5\" cy=\"-16.0\" r=\"2.8\" fill=\"#8F9A6C\" stroke=\"#667449\" stroke-width=\"0.6\"></circle></g>\n<g id=\"ramo\"><path d=\"M0 26 Q-2 0 2 -26\" stroke=\"#667449\" stroke-width=\"1.1\" fill=\"none\" stroke-linecap=\"round\"></path><ellipse cx=\"5\" cy=\"16.0\" rx=\"2.6\" ry=\"7\" fill=\"#667449\" transform=\"rotate(55 5 16.0)\"></ellipse><ellipse cx=\"-5\" cy=\"7.5\" rx=\"2.6\" ry=\"7\" fill=\"#667449\" transform=\"rotate(-55 -5 7.5)\"></ellipse><ellipse cx=\"5\" cy=\"-1.0\" rx=\"2.6\" ry=\"7\" fill=\"#667449\" transform=\"rotate(55 5 -1.0)\"></ellipse><ellipse cx=\"-5\" cy=\"-9.5\" rx=\"2.6\" ry=\"7\" fill=\"#667449\" transform=\"rotate(-55 -5 -9.5)\"></ellipse><ellipse cx=\"5\" cy=\"-18.0\" rx=\"2.6\" ry=\"7\" fill=\"#667449\" transform=\"rotate(55 5 -18.0)\"></ellipse><ellipse cx=\"2\" cy=\"-28\" rx=\"2.4\" ry=\"6\" fill=\"#667449\"></ellipse></g>\n<g id=\"lua\"><path d=\"M6 -9 A10 10 0 1 0 6 9 A7.5 7.5 0 1 1 6 -9z\" fill=\"#8F9A6C\"></path></g>\n<g id=\"estrela\"><path d=\"M0 -7 L1.7 -1.7 L7 0 L1.7 1.7 L0 7 L-1.7 1.7 L-7 0 L-1.7 -1.7z\" fill=\"#8F9A6C\"></path></g>\n<g id=\"bagas\"><path d=\"M0 22 Q1 6 -4 -6 M0.5 8 Q6 0 8 -8 M-1 0 Q-8 -4 -10 -10\" stroke=\"#6B5A48\" stroke-width=\"1\" fill=\"none\" stroke-linecap=\"round\"></path>\n<circle cx=\"-4\" cy=\"-8\" r=\"2.6\" fill=\"#8F9A6C\"></circle><circle cx=\"-1\" cy=\"-11\" r=\"2.2\" fill=\"#8F9A6C\"></circle><circle cx=\"8\" cy=\"-10\" r=\"2.6\" fill=\"#8F9A6C\"></circle><circle cx=\"10.5\" cy=\"-6\" r=\"2\" fill=\"#8F9A6C\"></circle><circle cx=\"-10\" cy=\"-12\" r=\"2.4\" fill=\"#8F9A6C\"></circle><circle cx=\"-12.5\" cy=\"-8\" r=\"1.8\" fill=\"#8F9A6C\"></circle></g>\n<g id=\"folha\"><path d=\"M0 12 Q-9 0 0 -13 Q9 0 0 12z\" fill=\"#8F9A6C\"></path><path d=\"M0 12 L0 -11\" stroke=\"#667449\" stroke-width=\"0.8\"></path></g>\n</defs><use href=\"#lavanda\" transform=\"translate(17.4 24.2) rotate(34) scale(0.87)\"></use><use href=\"#eucalipto\" transform=\"translate(80.7 27.0) rotate(-32) scale(0.85)\"></use><use href=\"#estrela\" transform=\"translate(55.1 23.3) rotate(-3) scale(0.70)\"></use><use href=\"#ramo\" transform=\"translate(141.4 25.0) rotate(27) scale(0.81)\"></use><use href=\"#folha\" transform=\"translate(115.8 35.0) rotate(-10) scale(0.67)\"></use><use href=\"#bagas\" transform=\"translate(194.5 20.3) rotate(-16) scale(0.80)\"></use><use href=\"#estrela\" transform=\"translate(219.0 22.1) rotate(26) scale(0.57)\"></use><use href=\"#lavanda\" transform=\"translate(255.9 26.6) rotate(1) scale(0.80)\"></use><use href=\"#folha\" transform=\"translate(231.5 39.1) rotate(-7) scale(0.74)\"></use><use href=\"#lavanda\" transform=\"translate(162.5 76.3) rotate(-8) scale(0.81)\"></use><use href=\"#ramo\" transform=\"translate(227.9 67.7) rotate(-33) scale(0.85)\"></use><use href=\"#lavanda\" transform=\"translate(286.0 65.9) rotate(-20) scale(0.82)\"></use><use href=\"#lavanda\" transform=\"translate(17.4 113.8) rotate(19) scale(0.82)\"></use><use href=\"#lavanda\" transform=\"translate(134.4 114.7) rotate(38) scale(0.92)\"></use><use href=\"#eucalipto\" transform=\"translate(205.1 119.2) rotate(-32) scale(0.95)\"></use><use href=\"#lua\" transform=\"translate(227.1 123.2) rotate(20) scale(0.63)\"></use><use href=\"#ramo\" transform=\"translate(253.0 114.0) rotate(11) scale(0.80)\"></use><use href=\"#estrela\" transform=\"translate(275.8 117.1) rotate(20) scale(0.58)\"></use><use href=\"#lavanda\" transform=\"translate(40.4 166.0) rotate(-15) scale(0.83)\"></use><use href=\"#eucalipto\" transform=\"translate(106.2 160.4) rotate(10) scale(0.88)\"></use><use href=\"#ramo\" transform=\"translate(161.2 164.3) rotate(-34) scale(0.81)\"></use><use href=\"#lua\" transform=\"translate(184.6 171.7) rotate(-15) scale(0.71)\"></use><use href=\"#bagas\" transform=\"translate(224.9 162.0) rotate(-26) scale(0.91)\"></use><use href=\"#estrela\" transform=\"translate(200.1 167.5) rotate(7) scale(0.56)\"></use><use href=\"#lavanda\" transform=\"translate(279.2 169.5) rotate(20) scale(0.81)\"></use><use href=\"#folha\" transform=\"translate(256.8 157.8) rotate(-8) scale(0.66)\"></use><use href=\"#ramo\" transform=\"translate(16.0 209.8) rotate(31) scale(0.95)\"></use><use href=\"#bagas\" transform=\"translate(81.7 212.5) rotate(-29) scale(0.81)\"></use><use href=\"#lua\" transform=\"translate(107.9 229.2) rotate(-29) scale(0.68)\"></use><use href=\"#lavanda\" transform=\"translate(138.7 214.3) rotate(-14) scale(0.95)\"></use><use href=\"#estrela\" transform=\"translate(165.1 228.7) rotate(14) scale(0.69)\"></use><use href=\"#ramo\" transform=\"translate(204.1 216.5) rotate(-12) scale(0.90)\"></use><use href=\"#lavanda\" transform=\"translate(265.7 210.5) rotate(23) scale(0.93)\"></use><use href=\"#estrela\" transform=\"translate(290.0 193.0) rotate(-26) scale(0.57)\"></use><use href=\"#lavanda\" transform=\"translate(36.0 255.6) rotate(-7) scale(0.85)\"></use><use href=\"#ramo\" transform=\"translate(105.7 258.0) rotate(-3) scale(0.88)\"></use><use href=\"#estrela\" transform=\"translate(81.8 243.2) rotate(-29) scale(0.74)\"></use><use href=\"#lavanda\" transform=\"translate(156.8 261.9) rotate(13) scale(0.87)\"></use><use href=\"#eucalipto\" transform=\"translate(221.3 254.2) rotate(9) scale(0.88)\"></use><use href=\"#ramo\" transform=\"translate(281.3 263.7) rotate(-0) scale(0.84)\"></use><use href=\"#lavanda\" transform=\"translate(23.1 310.5) rotate(30) scale(0.86)\"></use><use href=\"#estrela\" transform=\"translate(46.4 297.3) rotate(-9) scale(0.73)\"></use><use href=\"#eucalipto\" transform=\"translate(71.2 300.3) rotate(38) scale(0.92)\"></use><use href=\"#folha\" transform=\"translate(94.9 290.0) rotate(-5) scale(0.68)\"></use><use href=\"#ramo\" transform=\"translate(138.9 303.3) rotate(27) scale(0.95)\"></use><use href=\"#estrela\" transform=\"translate(111.9 295.3) rotate(6) scale(0.69)\"></use><use href=\"#bagas\" transform=\"translate(195.9 303.8) rotate(12) scale(0.88)\"></use><use href=\"#lavanda\" transform=\"translate(258.3 301.8) rotate(22) scale(0.84)\"></use><use href=\"#ramo\" transform=\"translate(46.9 358.3) rotate(-31) scale(0.82)\"></use><use href=\"#folha\" transform=\"translate(74.7 364.9) rotate(-18) scale(0.65)\"></use><use href=\"#bagas\" transform=\"translate(97.5 346.6) rotate(-2) scale(0.91)\"></use><use href=\"#estrela\" transform=\"translate(124.1 348.1) rotate(27) scale(0.65)\"></use><use href=\"#lavanda\" transform=\"translate(170.9 348.4) rotate(28) scale(0.90)\"></use><use href=\"#folha\" transform=\"translate(198.5 356.4) rotate(-22) scale(0.64)\"></use><use href=\"#ramo\" transform=\"translate(225.4 357.4) rotate(-10) scale(0.89)\"></use><use href=\"#lavanda\" transform=\"translate(286.0 357.8) rotate(-3) scale(0.90)\"></use><use href=\"#estrela\" transform=\"translate(262.7 372.2) rotate(29) scale(0.75)\"></use><use href=\"#lavanda\" transform=\"translate(18.8 403.0) rotate(-14) scale(0.94)\"></use><use href=\"#ramo\" transform=\"translate(76.2 394.5) rotate(-5) scale(0.88)\"></use><use href=\"#lavanda\" transform=\"translate(138.8 393.8) rotate(25) scale(0.81)\"></use><use href=\"#eucalipto\" transform=\"translate(194.2 397.5) rotate(23) scale(0.82)\"></use><use href=\"#estrela\" transform=\"translate(221.8 397.3) rotate(27) scale(0.57)\"></use><use href=\"#ramo\" transform=\"translate(255.3 399.8) rotate(-17) scale(0.91)\"></use><use href=\"#lavanda\" transform=\"translate(42.6 450.6) rotate(-15) scale(0.86)\"></use><use href=\"#eucalipto\" transform=\"translate(109.0 443.0) rotate(37) scale(0.88)\"></use><use href=\"#lua\" transform=\"translate(84.5 429.1) rotate(-30) scale(0.63)\"></use><use href=\"#ramo\" transform=\"translate(163.6 441.0) rotate(4) scale(0.95)\"></use><use href=\"#estrela\" transform=\"translate(137.5 425.4) rotate(2) scale(0.63)\"></use></svg>";

const MODELOS = {
  corpo: {
    titulo: "Sabonetes, hidratantes e corpo", mm: [99, 67.7], px: [374, 256],
    campos: [
      { id: "produto", rot: "Produto", tipo: "select", opcoes: () => produtosDe(p => ["Corpo", "Banho & Facial"].includes(p.cat)).map(p => [nomeProduto(p), p.id]) },
      { id: "aroma", rot: "Aroma", tipo: "select", opcoes: s => { const p = PRODUTOS.find(x => x.id === s.produto); return p ? aromasDe(p).map(a => [a, a]) : []; } },
      { id: "tipoTexto", rot: "Tipo (no topo)", tipo: "texto", auto: s => (typeof ETIQUETAS_CORPO !== "undefined" && ETIQUETAS_CORPO[s.produto] || {}).tipo || ((PRODUTOS.find(x => x.id === s.produto) || {}).grupoNome || (PRODUTOS.find(x => x.id === s.produto) || {}).nome || "").toUpperCase() },
      { id: "ingredientes", rot: "Ingredientes", tipo: "area", auto: s => infoProduto(s.produto).ingredientes || "" },
      { id: "modo", rot: "Modo de uso", tipo: "area", auto: s => infoProduto(s.produto).modo || "" },
      { id: "meses", rot: "Validade depois de aberto (meses)", tipo: "numero", padrao: 12 },
      { id: "fundo", rot: "Fundo", tipo: "cor", padrao: PALETA.creme },
      { id: "lateral", rot: "Faixa lateral", tipo: "cor", padrao: PALETA.sage }
    ],
    html: s => {
      const p = PRODUTOS.find(x => x.id === s.produto) || {};
      const tf = tintaPara(s.fundo), tl = tintaPara(s.lateral);
      const t = 'font-family:Arial,sans-serif; font-size:6.8px; line-height:1.35; margin:0;';
      const ingred = s.ingredientes ? esEsc(s.ingredientes) : '<span style="display:inline-block; width:120px; border-bottom:0.5px solid ' + tl + ';">&nbsp;</span>';
      return '<div style="position:relative; overflow:hidden; width:374px; height:256px; background:' + s.fundo + '; color:' + tf + '; font-family:Jost,Arial,sans-serif;">' +
        '<div style="position:absolute; left:0; top:0; width:238px; height:256px; box-sizing:border-box; padding:22px 20px 20px; display:flex; flex-direction:column; align-items:center; justify-content:space-between; text-align:center;">' +
          '<div style="font-size:9px; letter-spacing:.16em; border-bottom:1px solid ' + tf + '; padding:0 6px 3px;">' + esEsc(s.tipoTexto) + '</div>' +
          '<div style="font-family:Gloock,Georgia,serif; font-size:34px; line-height:1.05;">' + esEsc(String(s.aroma || "").toLowerCase().replace(/ e /g, " & ")) + '</div>' +
          '<div style="font-size:8.5px; letter-spacing:.14em; line-height:1.5; text-transform:uppercase; border-top:1px solid ' + tf + '; border-bottom:1px solid ' + tf + '; padding:4px 10px;">feito à mão<br>pensado para você</div>' +
        '</div>' +
        '<div style="position:absolute; left:10px; bottom:10px;">' + seloCrueltyFree('30px', tf) + '</div>' +
        '<div style="position:absolute; left:10px; bottom:44px;">' + seloFeitoAMao('30px', tf) + '</div>' +
        '<div style="position:absolute; left:238px; top:0; width:136px; height:256px; background:' + s.lateral + ';"></div>' +
        '<div style="position:absolute; left:178px; top:60px; width:256px; height:136px; transform:rotate(-90deg); box-sizing:border-box; padding:11px 14px 9px; display:flex; flex-direction:column; gap:4px; color:' + tl + ';">' +
          '<div style="display:flex; align-items:flex-end; gap:8px;"><img src="' + logoPara(tl) + '" alt="" style="height:24px; width:auto; display:block;"><span style="font-size:7px; letter-spacing:.16em; padding-bottom:3px;">AROMAS · ARTESANAL</span></div>' +
          '<div style="height:1px; background:' + tl + ';"></div>' +
          '<p style="' + t + '"><b>INGREDIENTES:</b> ' + ingred + '</p>' +
          (s.modo ? '<p style="' + t + '"><b>MODO DE USO:</b> ' + esEsc(s.modo) + '</p>' : '') +
          '<p style="' + t + ' font-size:6.4px;">Uso externo. Evite contato com os olhos.</p>' +
          '<div style="margin-top:auto; display:flex; justify-content:space-between; align-items:flex-end; ' + t + '"><span style="display:flex; align-items:flex-end; gap:6px;">' + paoSvg(s.meses || 12, tl, 30) + '<b style="font-size:9px;">' + esEsc(p.tamanho || "") + '</b></span><span style="text-align:right;">sagradodemim.com.br<br>(31) 99915-3132</span></div>' +
        '</div></div>';
    }
  },
  bodysplash: {
    titulo: "Body Splash", mm: [50, 70], px: [250, 350],
    campos: [
      { id: "nome", rot: "Nome (destaque)", tipo: "texto", padrao: "Lua Nova" },
      { id: "aroma", rot: "Aroma", tipo: "select", opcoes: () => (typeof AROMAS_BODY_SPLASH !== "undefined" ? AROMAS_BODY_SPLASH : []).map(a => [a, a]) },
      { id: "notas", rot: "Notas", tipo: "texto", auto: s => notasCurtas(s.aroma) },
      { id: "volume", rot: "Volume", tipo: "texto", padrao: "250 ml" },
      { id: "ingredientes", rot: "Ingredientes", tipo: "area", auto: () => infoProduto("body-splash-250").ingredientes || "" },
      { id: "fundo", rot: "Fundo", tipo: "cor", padrao: PALETA.creme },
      { id: "tinta", rot: "Cor do texto", tipo: "tinta", padrao: "" }
    ],
    html: s => {
      const tk = tintaPara(s.fundo, s.tinta), L = 'height:0; border-top:1px solid ' + tk + '; width:100%;';
      return '<div style="width:250px; height:350px; position:relative; overflow:hidden; background:' + s.fundo + '; color:' + tk + '; font-family:\'DM Mono\',\'Courier New\',monospace; border-radius:16px; box-sizing:border-box; padding:34px 22px 14px; display:flex; flex-direction:column; align-items:center; text-align:center;">' +
        '<img src="' + logoPara(tk) + '" alt="Sagrado de Mim" style="width:82px; height:auto; display:block;">' +
        '<div style="margin-top:22px; font-size:24px; font-weight:500; line-height:1.1; word-break:break-word;">' + esEsc(s.nome) + '</div>' +
        '<div style="margin-top:auto; width:100%;">' +
          '<div style="' + L + '"></div><div style="font-size:15px; font-weight:500; padding:7px 0 2px;">Body Splash</div>' +
          '<div style="font-size:6.6px; padding:0 0 6px;">Aroma ' + esEsc(s.aroma) + ' · ' + esEsc(s.volume) + ' · feito à mão</div>' +
          '<div style="' + L + '"></div><div style="font-size:8.6px; padding:10px 0 14px;">' + esEsc(s.notas || " ") + '</div>' +
          '<div style="' + L + '"></div><div style="font-size:8.5px; padding:9px 0;">sagradodemim.com.br</div>' +
          '<div style="' + L + '"></div><div style="padding:9px 0 6px;">' + selos(tk, 24, true, 12) + '</div>' +
          '<div style="font-family:Arial,sans-serif; font-size:4.6px; line-height:1.3;">Ingredientes: ' + esEsc(s.ingredientes || "________________") + '. Uso externo. Evite contato com os olhos.</div>' +
        '</div></div>';
    }
  },
  perfume: {
    titulo: "Perfume", mm: [70, 50], px: [350, 250],
    campos: [
      { id: "nome", rot: "Nome do perfume", tipo: "texto", padrao: "Lua Nova" },
      { id: "aroma", rot: "Essência / aroma", tipo: "select", opcoes: () => Object.keys(typeof AROMAS_INFO !== "undefined" ? AROMAS_INFO : {}).map(a => [a, a]) },
      { id: "fundo", rot: "Fundo", tipo: "cor", padrao: PALETA.creme }
    ],
    html: s => {
      const i = typeof infoAroma === "function" ? infoAroma(s.aroma) : null;
      const notas = i && i.saida ? { saida: i.saida, corpo: i.corpo, fundo: i.fundo } : (i ? { linha: i.desc } : {});
      const h = etiquetaPerfumeHtml({ canvasId: "estudio-perf", nome: s.nome, aroma: s.aroma, notas: notas, logoUrl: logoPara(PALETA.tinta) });
      return h.replace('background:#F7EFDF;', 'background:' + s.fundo + ';').replace('margin:0 auto 20px;', 'margin:0;');
    }
  },
  casa: {
    titulo: "Difusor / Home Spray personalizado", mm: [99, 67.7], px: [495, 338],
    campos: [
      { id: "nome", rot: "Nome do aroma (da cliente)", tipo: "texto", padrao: "Manhã de Domingo" },
      { id: "produto", rot: "Produto", tipo: "select", opcoes: () => [["Difusor de Varetas", "difusor"], ["Home Spray", "spray"]] },
      { id: "base", rot: "Aroma base", tipo: "select", opcoes: () => (typeof AROMAS !== "undefined" ? AROMAS : []).map(a => [a, a]) },
      { id: "volume", rot: "Volume", tipo: "texto", auto: s => s.produto === "spray" ? "200mL" : "250mL" },
      { id: "ingredientes", rot: "Ingredientes", tipo: "area", auto: s => s.produto === "spray" ? "Água, Álcool, Fragrância, Glicerina." : "Óleo Mineral, Fragrância, Álcool, Corante." },
      { id: "fundo", rot: "Fundo", tipo: "cor", padrao: PALETA.creme }
    ],
    html: s => {
      const tk = tintaPara(s.fundo);
      return '<div style="position:relative; overflow:hidden; width:495px; height:338px; background:' + s.fundo + '; color:' + tk + '; display:flex; align-items:center; gap:12px; padding:16px 18px; box-sizing:border-box;">' +
        '<div style="position:relative; width:44px; height:306px; flex-shrink:0;"><div style="position:absolute; top:50%; left:50%; width:296px; height:44px; transform:translate(-50%,-50%) rotate(-90deg); font-family:Arial,sans-serif; font-weight:700; font-size:9px; line-height:1.4; display:flex; align-items:center;"><span>Ingredientes: ' + esEsc(s.ingredientes) + ' · Aroma: ' + esEsc(s.base) + ' (peça um refil informando esse nome)</span></div></div>' +
        '<div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:Georgia,serif;">' +
          '<img src="' + logoPara(tk) + '" alt="" style="width:140px; margin-bottom:14px;">' +
          '<div style="border:1.5px solid ' + tk + '; padding:12px 18px; text-align:center; margin-bottom:12px; min-width:240px; font-size:30px; letter-spacing:1px;">' + esEsc(s.nome) + '</div>' +
          '<div style="font-size:24px; letter-spacing:1px; margin-bottom:8px;">' + (s.produto === "spray" ? "HOME SPRAY" : "DIFUSOR DE VARETAS") + '</div>' +
          '<div style="font-family:Arial,sans-serif; font-size:16px;">' + esEsc(s.volume) + '</div>' +
        '</div>' +
        '<div style="position:absolute; right:16px; bottom:16px;">' + selos(tk, 42, false) + '</div></div>';
    }
  },
  selo: {
    titulo: "Selo da caixa (\"um aroma feito para você\")", mm: [67.7, 99], px: [256, 374],
    campos: [
      { id: "l1", rot: "Frase, linha 1", tipo: "texto", padrao: "um aroma" },
      { id: "l2", rot: "Frase, linha 2 (itálico)", tipo: "texto", padrao: "feito" },
      { id: "l3", rot: "Frase, linha 3", tipo: "texto", padrao: "para você" },
      { id: "fundo", rot: "Fundo", tipo: "cor", padrao: PALETA.areia },
      { id: "tinta", rot: "Cor do texto", tipo: "tinta", padrao: "" }
    ],
    html: s => {
      const tk = tintaPara(s.fundo, s.tinta);
      return '<div style="width:256px; height:374px; position:relative; overflow:hidden; background:' + s.fundo + '; color:' + tk + ';">' +
        '<div style="position:absolute; right:30px; top:28px; text-align:right; font-family:\'Bodoni Moda\',Georgia,serif; font-size:27px; line-height:1.05;"><div>' + esEsc(s.l1) + '</div><div style="font-style:italic; padding-right:14px;">' + esEsc(s.l2) + '</div><div>' + esEsc(s.l3) + '</div></div>' +
        '<div style="position:absolute; left:0; bottom:0; width:256px; padding:0 22px 28px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; gap:6px;"><img src="' + logoPara(tk) + '" alt="Sagrado de Mim" style="width:150px; display:block;"><div style="font-family:Jost,Arial,sans-serif; font-size:11px; letter-spacing:.06em;">sagradodemim.com.br</div></div></div>';
    }
  },
  lacre: {
    titulo: "Lacre da caixa (faixa comprida)", mm: [80, 200], px: [302, 756],
    campos: [
      { id: "lema", rot: "Frase", tipo: "texto", padrao: "feito à mão, pensado para você" },
      { id: "fundo", rot: "Fundo", tipo: "cor", padrao: PALETA.creme }
    ],
    html: s => {
      const tk = tintaPara(s.fundo);
      return '<div style="width:302px; height:756px; position:relative; overflow:hidden; background:' + s.fundo + '; color:' + tk + ';">' +
        '<div style="position:absolute; left:0; top:0; width:302px; height:470px;">' + PADRAO_LACRE + '</div>' +
        '<div style="position:absolute; left:26px; top:46px; width:98px; height:88px; border:1px solid ' + PALETA.oliva + '; background:' + s.fundo + '; display:flex; align-items:center; justify-content:center;"><img src="' + logoPara(tk) + '" alt="" style="width:84px;"></div>' +
        '<div style="position:absolute; left:0; top:500px; width:302px; padding:0 28px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; text-align:center; gap:10px;">' +
          '<img src="' + logoPara(tk) + '" alt="Sagrado de Mim" style="width:170px; display:block;">' +
          '<div style="font-family:\'Cormorant Garamond\',Georgia,serif; font-style:italic; font-size:19px;">' + esEsc(s.lema) + '</div>' +
          '<div style="width:40px; height:1px; background:' + PALETA.oliva + ';"></div>' +
          '<div style="font-family:Jost,Arial,sans-serif; font-size:10px; letter-spacing:.24em;">AROMAS · ARTESANAL</div>' +
          '<div style="font-family:Jost,Arial,sans-serif; font-size:10px;">sagradodemim.com.br</div>' +
        '</div></div>';
    }
  }
};

// ---------- Interface ----------
let ESTUDIO = { modelo: "corpo", s: {} };
function estudioPadroes(mid) {
  const m = MODELOS[mid], s = {};
  m.campos.forEach(c => {
    if (c.padrao !== undefined) s[c.id] = c.padrao;
    else if (c.tipo === "select") { const o = c.opcoes(s); s[c.id] = o.length ? o[0][1] : ""; }
    else s[c.id] = "";
  });
  m.campos.forEach(c => { if (c.auto) s[c.id] = c.auto(s); });
  return s;
}
function renderEstudio() {
  const box = document.getElementById("estudio");
  if (!box) return;
  const m = MODELOS[ESTUDIO.modelo], s = ESTUDIO.s;
  const est = 'width:100%; box-sizing:border-box; font-family:Arial,sans-serif; font-size:14px; padding:9px 11px; border-radius:8px; border:1px solid rgba(61,58,52,0.3); background:#fff;';
  const campo = c => {
    let inp;
    if (c.tipo === "select") inp = '<select data-campo="' + c.id + '" style="' + est + '">' + c.opcoes(s).map(o => '<option value="' + esEsc(o[1]) + '"' + (o[1] === s[c.id] ? ' selected' : '') + '>' + esEsc(o[0]) + '</option>').join('') + '</select>';
    else if (c.tipo === "area") inp = '<textarea data-campo="' + c.id + '" rows="3" style="' + est + ' resize:vertical;">' + esEsc(s[c.id]) + '</textarea>';
    else if (c.tipo === "cor" || c.tipo === "tinta") {
      const ops = c.tipo === "cor" ? PALETA_OPCOES : TINTA_OPCOES;
      inp = '<div style="display:flex; gap:8px; flex-wrap:wrap;">' + ops.map(o => '<button type="button" data-cor="' + c.id + '" data-valor="' + o[1] + '" title="' + o[0] + '" style="min-width:44px; height:44px; border-radius:10px; cursor:pointer; font-size:11px; font-family:Arial,sans-serif; background:' + (o[1] || '#fff') + '; color:' + (ESCUROS.includes(String(o[1]).toLowerCase()) ? '#F7EFDF' : '#2E2A25') + '; border:' + (s[c.id] === o[1] ? '3px solid #2E2A25' : '1px solid rgba(61,58,52,0.3)') + ';">' + (o[1] ? '' : 'Auto') + '</button>').join('') + '</div>';
    }
    else inp = '<input data-campo="' + c.id + '" type="' + (c.tipo === "numero" ? "number" : "text") + '" value="' + esEsc(s[c.id]) + '" style="' + est + '">';
    return '<label style="display:block; font-family:Arial,sans-serif; font-weight:700; font-size:13px; margin:12px 0 5px;">' + c.rot + '</label>' + inp;
  };
  const escala = Math.min(1, 560 / m.px[0]);
  box.innerHTML =
    '<div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">' + Object.keys(MODELOS).map(k => '<button type="button" data-modelo="' + k + '" style="padding:9px 14px; border-radius:999px; cursor:pointer; font-family:Arial,sans-serif; font-size:13px; border:1px solid ' + PALETA.oliva + '; background:' + (k === ESTUDIO.modelo ? PALETA.oliva : '#fff') + '; color:' + (k === ESTUDIO.modelo ? '#fff' : PALETA.oliva) + ';">' + MODELOS[k].titulo + '</button>').join('') + '</div>' +
    '<p style="font-family:Arial,sans-serif; font-size:12px; color:#6b6558; margin:0 0 12px;">Tamanho real: ' + String(m.mm[0]).replace(".", ",") + ' × ' + String(m.mm[1]).replace(".", ",") + ' mm</p>' +
    '<div style="background:#ece6da; border-radius:12px; padding:20px; display:flex; justify-content:center; overflow:auto;"><div style="width:' + Math.round(m.px[0] * escala) + 'px; height:' + Math.round(m.px[1] * escala) + 'px;"><div id="estudio-preview" style="transform:scale(' + escala + '); transform-origin:0 0; width:' + m.px[0] + 'px; height:' + m.px[1] + 'px;">' + m.html(s) + '</div></div></div>' +
    '<div style="margin-top:8px;">' + m.campos.map(campo).join('') + '</div>' +
    '<div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-top:20px;">' +
      '<label style="font-family:Arial,sans-serif; font-size:13px; font-weight:700;">Quantidade <input id="estudio-qtd" type="number" min="1" max="60" value="1" style="width:70px; padding:8px; border-radius:8px; border:1px solid rgba(61,58,52,0.3);"></label>' +
      '<button type="button" class="btn" id="estudio-imprimir" style="font-size:13px; padding:10px 16px;">🖨️ Imprimir</button>' +
      '<button type="button" class="btn" id="estudio-png" style="font-size:13px; padding:10px 16px; background:#fff; color:' + PALETA.oliva + '; border:1px solid ' + PALETA.oliva + ';">⬇️ Baixar imagem</button>' +
    '</div>';
  box.querySelectorAll("[data-modelo]").forEach(b => b.onclick = () => { ESTUDIO = { modelo: b.dataset.modelo, s: estudioPadroes(b.dataset.modelo) }; renderEstudio(); });
  box.querySelectorAll("[data-cor]").forEach(b => b.onclick = () => { ESTUDIO.s[b.dataset.cor] = b.dataset.valor; renderEstudio(); });
  box.querySelectorAll("[data-campo]").forEach(el => {
    const atualiza = () => {
      ESTUDIO.s[el.dataset.campo] = el.value;
      // campos automáticos dependentes (aroma -> notas, produto -> ingredientes etc.)
      MODELOS[ESTUDIO.modelo].campos.forEach(c => {
        if (c.tipo === "select" && c.id !== el.dataset.campo) { const o = c.opcoes(ESTUDIO.s).map(x => x[1]); if (o.length && !o.includes(ESTUDIO.s[c.id])) ESTUDIO.s[c.id] = o[0]; }
        if (c.auto && c.id !== el.dataset.campo) ESTUDIO.s[c.id] = c.auto(ESTUDIO.s);
      });
      if (el.tagName === "SELECT") renderEstudio();
      else document.getElementById("estudio-preview").innerHTML = MODELOS[ESTUDIO.modelo].html(ESTUDIO.s);
    };
    el.addEventListener(el.tagName === "SELECT" ? "change" : "input", atualiza);
  });
  document.getElementById("estudio-imprimir").onclick = imprimirEstudio;
  document.getElementById("estudio-png").onclick = baixarEstudio;
}
function abrirEstudio() { if (!ESTUDIO.s || !Object.keys(ESTUDIO.s).length) ESTUDIO.s = estudioPadroes(ESTUDIO.modelo); renderEstudio(); }

function imprimirEstudio() {
  const m = MODELOS[ESTUDIO.modelo], html = m.html(ESTUDIO.s);
  const qtd = Math.max(1, Math.min(60, parseInt(document.getElementById("estudio-qtd").value) || 1));
  const f = (m.mm[0] * 96 / 25.4) / m.px[0];
  const uma = '<div style="width:' + m.mm[0] + 'mm; height:' + m.mm[1] + 'mm; overflow:hidden; outline:0.2mm dashed #c9c2b6; break-inside:avoid;"><div style="transform:scale(' + f + '); transform-origin:0 0; width:' + m.px[0] + 'px; height:' + m.px[1] + 'px;">' + html + '</div></div>';
  const w = window.open("", "_blank");
  if (!w) { alert("O navegador bloqueou a janela de impressão. Permita pop-ups para este site."); return; }
  w.document.write('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Etiquetas</title>' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500&family=Gloock&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&family=DM+Mono:wght@400;500&family=Cormorant+Garamond:ital,wght@1,500&display=swap">' +
    '<style>@page{size:A4;margin:10mm} *{-webkit-print-color-adjust:exact;print-color-adjust:exact;box-sizing:border-box} body{margin:0} .folha{display:flex;flex-wrap:wrap;gap:4mm} .aviso{font:13px Arial;background:#F7EFDF;padding:10px;margin:10px;border-radius:8px} @media print{.aviso{display:none}}</style></head><body>' +
    '<div class="aviso">Imprima em <b>tamanho real (100%)</b>, papel A4, sem "ajustar à página".</div><div class="folha">' + uma.repeat(qtd) + '</div>' +
    '<script>(async function(){try{await document.fonts.ready}catch(e){}await Promise.all([...document.images].map(function(i){return i.complete?0:new Promise(function(r){i.onload=i.onerror=r})}));setTimeout(function(){window.print()},300)})();<\/script></body></html>');
  w.document.close();
}
async function baixarEstudio() {
  const el = document.getElementById("estudio-preview").firstElementChild;
  const btn = document.getElementById("estudio-png"); btn.disabled = true; btn.textContent = "Gerando...";
  try {
    const wrap = document.createElement("div");
    wrap.style.cssText = "position:fixed; left:-10000px; top:0;";
    wrap.innerHTML = el.outerHTML; document.body.appendChild(wrap);
    try { await document.fonts.ready; } catch (e) {}
    const canvas = await html2canvas(wrap.firstElementChild, { backgroundColor: null, scale: 4 });
    wrap.remove();
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "etiqueta-" + ESTUDIO.modelo + "-" + (ESTUDIO.s.nome || ESTUDIO.s.aroma || "sagrado").toString().toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".png";
    a.click();
  } catch (e) { alert("Não foi possível gerar a imagem agora."); }
  btn.disabled = false; btn.textContent = "⬇️ Baixar imagem";
}
