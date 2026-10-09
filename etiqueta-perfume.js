// Etiqueta de perfume em grade (70 x 50 mm = 350 x 250 px, 5 px por mm).
// Usada no quiz Perfume Corporal, no Monte seu Perfume e na aba Personalizar Etiqueta do painel.

// Notas típicas de cada família do quiz (mesmas da descrição do resultado).
const FAMILIA_NOTAS = {
  "Floral": "Flores brancas, Rosa, Jasmim",
  "Amadeirado": "Cedro, Sândalo, Âmbar",
  "Cítrico": "Laranja, Limão-siciliano, Bergamota",
  "Doce": "Baunilha, Mel, Especiarias doces",
  "Frutado": "Pêssego, Framboesa, Maçã",
  "Gourmand": "Chocolate, Café, Baunilha",
  "Aquático": "Notas marinhas, Notas aquáticas",
  "Especiado": "Pimenta-rosa, Canela, Cravo"
};
// Essência Peter Paiva usada em cada família. Quando preenchida (com um nome que exista em AROMAS_INFO),
// a etiqueta passa a mostrar a pirâmide oficial dessa essência. Ex.: "Floral": "Flor de Cerejeira"
const FAMILIA_ESSENCIA = {};

function epEsc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

function epIconePAO(meses) {
  return '<svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg" style="width:26px; display:block;"><g fill="none" stroke="#2E2A25" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round">' +
    '<path d="M12 44 L14 74 Q50 90 86 74 L88 44"/><path d="M12 44 Q50 58 88 44"/><path d="M12 44 Q16 36 34 33"/><path d="M13.2 52 Q50 64 86.8 52"/>' +
    '<ellipse cx="54" cy="20" rx="38" ry="12" transform="rotate(-9 54 20)"/><path d="M16.6 26 L17.4 32 Q22 44 58 40 Q88 36 92.4 20 L91.6 14"/></g>' +
    '<text x="50" y="76.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#2E2A25">' + meses + ' M</text></svg>';
}

// Notas: { saida, corpo, fundo } (pirâmide) ou { linha } (lista simples)
function notasDaFamilia(familia) {
  const ess = FAMILIA_ESSENCIA[familia];
  const info = ess && typeof infoAroma === "function" ? infoAroma(ess) : null;
  if (info && info.saida) return { aroma: ess, notas: { saida: info.saida, corpo: info.corpo, fundo: info.fundo } };
  return { aroma: familia, notas: { linha: FAMILIA_NOTAS[familia] || "" } };
}

function etiquetaPerfumeHtml(o) {
  const INK = "#2E2A25", L = "1px solid " + INK;
  const f = o.fonte || { family: "Georgia, serif", style: "normal", weight: "400" };
  const n = o.notas || {};
  const curta = s => String(s || "").split(",").slice(0, 3).map(x => x.trim()).filter(Boolean).join(", ");
  const notasHtml = n.linha
    ? '<div><b style="font-weight:700;">NOTAS:</b> ' + epEsc(n.linha) + '</div>'
    : ['SAÍDA', 'CORPO', 'FUNDO'].map((rot, i) => {
        const v = [n.saida, n.corpo, n.fundo][i];
        return v ? '<div><b style="font-weight:700;">' + rot + ':</b> ' + epEsc(curta(v)) + '</div>' : '';
      }).join('');
  const celula = 'display:flex; align-items:center; justify-content:center; text-align:center;';
  return '<div id="' + (o.canvasId || "label-canvas") + '" style="position:relative; overflow:hidden; background:#F3EEE4; width:350px; height:250px; box-sizing:border-box; padding:10px; margin:0 auto 20px; color:' + INK + '; font-family:Arial, Helvetica, sans-serif; ' + (o.interactive ? 'cursor:crosshair;' : '') + '">' +
    '<div style="width:330px; height:206px; border:' + L + '; box-sizing:border-box; display:grid; grid-template-columns:repeat(6, minmax(0, 1fr)); grid-template-rows:104px 34px 34px 32px; pointer-events:none;">' +
      '<div style="grid-column:1 / span 6; display:flex; align-items:center; gap:10px; padding:0 14px; border-bottom:' + L + ';">' +
        '<img src="' + (o.logoUrl || "assets/logo-cursiva.png") + '" alt="Sagrado de Mim" style="width:108px; height:auto; display:block; flex-shrink:0;">' +
        '<div style="flex:1; min-width:0; text-align:center; font-family:' + f.family + '; font-style:' + f.style + '; font-weight:' + f.weight + '; font-size:26px; line-height:1.05; letter-spacing:0.04em; word-break:break-word;">' + epEsc(o.nome || "Nome do perfume") + '</div>' +
      '</div>' +
      '<div style="grid-column:1 / span 3; grid-row:2 / span 2; border-right:' + L + '; border-bottom:' + L + '; padding:6px 10px; font-size:6.6px; letter-spacing:0.1em; line-height:1.65; display:flex; flex-direction:column; justify-content:center; text-transform:uppercase;">' + notasHtml + '</div>' +
      '<div style="grid-column:4 / span 3; border-bottom:' + L + '; ' + celula + ' font-size:8.5px; letter-spacing:0.22em;">PERFUME CORPORAL</div>' +
      '<div style="grid-column:4; border-right:' + L + '; border-bottom:' + L + '; ' + celula + '">' + (typeof seloFeitoAMao === "function" ? seloFeitoAMao('26px') : 'FEITO<br>À MÃO') + '</div>' +
      '<div style="grid-column:5; border-right:' + L + '; border-bottom:' + L + '; ' + celula + '">' + epIconePAO(12) + '</div>' +
      '<div style="grid-column:6; border-bottom:' + L + '; ' + celula + '">' + (typeof seloCrueltyFree === "function" ? seloCrueltyFree('26px') : '') + '</div>' +
      '<div style="grid-column:1 / span 3; border-right:' + L + '; ' + celula + ' font-size:8px; letter-spacing:0.2em; text-transform:uppercase; padding:0 6px;">' + epEsc(o.aroma || "") + '</div>' +
      '<div style="grid-column:4 / span 3; ' + celula + ' font-size:8.5px; letter-spacing:0.08em;">sagradodemim.com.br</div>' +
    '</div>' +
    '<div style="margin-top:6px; font-size:4.9px; line-height:1.35; font-weight:700; text-align:center; padding:0 6px; pointer-events:none;">PERFUME — Composição: Álcool de Cereais, Essência, Glicerina Bidestilada, Extrato Glicerinado, Água Mineral e Corante Cosmético. NÃO INGERIR. EVITAR CONTATO COM OS OLHOS. USO EXTERNO. PRODUTO ARTESANAL · Válido por 1 ano.</div>' +
    (o.iconesHtml || '') +
  '</div>';
}
