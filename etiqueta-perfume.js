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
  return '<div id="' + (o.canvasId || "label-canvas") + '" style="position:relative; overflow:hidden; background:#F7EFDF; width:350px; height:250px; box-sizing:border-box; padding:10px; margin:0 auto 20px; color:' + INK + '; font-family:Arial, Helvetica, sans-serif; ' + (o.interactive ? 'cursor:crosshair;' : '') + '">' +
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

// ---------- Perfume personalizado (etiqueta pequena) : 65 x 34 mm = 325 x 170 px ----------
function etiquetaPerfumePequenaHtml(o) {
  const INK = o.tinta || "#2E2A25", L = "1px solid " + INK;
  const f = o.fonte || { family: "Georgia, serif", style: "normal", weight: "400" };
  const n = o.notas || {};
  const curta = s => String(s || "").split(",").slice(0, 2).map(x => x.trim()).filter(Boolean).join(", ");
  const notasHtml = n.linha
    ? '<div><b style="font-weight:700;">NOTAS:</b> ' + epEsc(n.linha) + '</div>'
    : ['SAÍDA', 'CORPO', 'FUNDO'].map((rot, i) => { const v = [n.saida, n.corpo, n.fundo][i]; return v ? '<div><b style="font-weight:700;">' + rot + ':</b> ' + epEsc(curta(v)) + '</div>' : ''; }).join('');
  return '<div id="' + (o.canvasId || "label-canvas") + '" style="position:relative; overflow:hidden; width:325px; height:170px; background:' + (o.fundo || "#F7EFDF") + '; color:' + INK + '; font-family:Arial, Helvetica, sans-serif; box-sizing:border-box; margin:0 auto 20px; ' + (o.interactive ? 'cursor:crosshair;' : '') + '">' +
    '<div style="position:absolute; left:8px; top:8px; width:30px; height:154px; display:flex; align-items:center; justify-content:center; pointer-events:none;">' +
      '<div style="width:150px; transform:rotate(-90deg); font-size:4.4px; line-height:1.35; font-weight:700; text-align:center; flex-shrink:0;">PERFUME — Composição: Álcool de Cereais, Essência, Glicerina Bidestilada, Extrato Glicerinado, Água Mineral e Corante Cosmético. NÃO INGERIR. EVITAR CONTATO COM OS OLHOS. USO EXTERNO. PRODUTO ARTESANAL · Válido por 1 ano.</div>' +
    '</div>' +
    '<div style="position:absolute; left:42px; top:8px; width:275px; height:154px; border:' + L + '; box-sizing:border-box; display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); grid-template-rows:100px 52px; pointer-events:none;">' +
      '<div style="grid-column:1 / span 3; display:flex; align-items:center; gap:8px; padding:0 10px; border-bottom:' + L + ';">' +
        '<img src="' + (o.logoUrl || "assets/logo-cursiva.png") + '" alt="Sagrado de Mim" style="width:84px; height:auto; display:block; flex-shrink:0;">' +
        '<div style="flex:1; min-width:0; text-align:center;"><div style="font-family:' + f.family + '; font-style:' + f.style + '; font-weight:' + f.weight + '; font-size:22px; line-height:1.05; word-break:break-word;">' + epEsc(o.nome || "Nome do perfume") + '</div>' +
          (o.aroma ? '<div style="font-size:6.4px; letter-spacing:0.22em; margin-top:6px; text-transform:uppercase;">' + epEsc(o.aroma) + '</div>' : '') + '</div>' +
      '</div>' +
      '<div style="grid-column:1 / span 2; border-right:' + L + '; padding:4px 8px; font-size:5.8px; letter-spacing:0.08em; line-height:1.55; display:flex; flex-direction:column; justify-content:center; text-transform:uppercase;">' + notasHtml + '</div>' +
      '<div style="display:flex; align-items:center; justify-content:space-evenly;">' + (typeof seloFeitoAMao === "function" ? seloFeitoAMao('22px', INK) : '') + (typeof seloCrueltyFree === "function" ? seloCrueltyFree('22px', INK) : '') + '</div>' +
    '</div>' +
    (o.iconesHtml || '') +
  '</div>';
}

// ---------- Difusor / Home Spray personalizado em grade : 99 x 67,7 mm = 495 x 338 px ----------
function etiquetaCasaHtml(o) {
  const INK = o.tinta || "#2E2A25", L = "1px solid " + INK;
  const spray = o.produto === "spray";
  const info = typeof infoAroma === "function" ? infoAroma(o.base) : null;
  const curta = s => String(s || "").split(",").slice(0, 3).map(x => x.trim()).filter(Boolean).join(", ");
  const notasHtml = info && info.saida
    ? ['SAÍDA', 'CORPO', 'FUNDO'].map((rot, i) => '<div><b style="font-weight:700;">' + rot + ':</b> ' + epEsc(curta([info.saida, info.corpo, info.fundo][i])) + '</div>').join('')
    : (info && info.desc ? '<div style="text-transform:none; letter-spacing:0.02em;">' + epEsc(info.desc) + '</div>' : '<div>AROMA ' + epEsc(o.base || "") + '</div>');
  const ingred = o.ingredientes != null && o.ingredientes !== "" ? o.ingredientes : (o.tituloProduto ? "________________" : null) || (spray ? "Água, Álcool, Fragrância, Glicerina." : "Óleo Mineral, Fragrância, Álcool, Corante.");
  const vol = o.volume || (o.tituloProduto ? "—" : (spray ? "200mL" : "250mL"));
  const c = 'display:flex; align-items:center; justify-content:center; text-align:center;';
  return '<div id="' + (o.canvasId || "casa-label") + '" style="position:relative; overflow:hidden; width:495px; height:338px; background:' + (o.fundo || "#F7EFDF") + '; color:' + INK + '; font-family:Arial, Helvetica, sans-serif; box-sizing:border-box; padding:14px; margin:' + (o.margem || "0") + ';">' +
    '<div style="width:467px; height:280px; border:' + L + '; box-sizing:border-box; display:grid; grid-template-columns:repeat(6, minmax(0, 1fr)); grid-template-rows:140px 46px 46px 46px;">' +
      '<div style="grid-column:1 / span 6; display:flex; align-items:center; gap:14px; padding:0 20px; border-bottom:' + L + ';">' +
        '<img src="' + (o.logoUrl || "assets/logo-cursiva.png") + '" alt="Sagrado de Mim" style="width:150px; height:auto; display:block; flex-shrink:0;">' +
        '<div style="flex:1; min-width:0; text-align:center; font-family:Georgia, serif; font-size:34px; line-height:1.05; letter-spacing:0.04em; word-break:break-word;">' + epEsc(o.nome || "Nome do aroma") + '</div>' +
      '</div>' +
      '<div style="grid-column:1 / span 3; grid-row:2 / span 2; border-right:' + L + '; border-bottom:' + L + '; padding:6px 14px; font-size:8.6px; letter-spacing:0.1em; line-height:1.7; display:flex; flex-direction:column; justify-content:center; text-transform:uppercase;">' + notasHtml + '</div>' +
      '<div style="grid-column:4 / span 3; border-bottom:' + L + '; ' + c + ' font-size:11px; letter-spacing:0.2em; padding:0 6px;">' + epEsc(o.tituloProduto || (spray ? "HOME SPRAY" : "DIFUSOR DE VARETAS")) + '</div>' +
      '<div style="grid-column:4; border-right:' + L + '; border-bottom:' + L + '; ' + c + ' font-size:11px; letter-spacing:0.06em;">' + epEsc(vol) + '</div>' +
      '<div style="grid-column:5; border-right:' + L + '; border-bottom:' + L + '; ' + c + '">' + (typeof seloFeitoAMao === "function" ? seloFeitoAMao('34px', INK) : '') + '</div>' +
      '<div style="grid-column:6; border-bottom:' + L + '; ' + c + '">' + (typeof seloCrueltyFree === "function" ? seloCrueltyFree('34px', INK) : '') + '</div>' +
      '<div style="grid-column:1 / span 3; border-right:' + L + '; ' + c + ' font-size:10px; letter-spacing:0.18em; text-transform:uppercase; padding:0 8px;">Aroma ' + epEsc(o.base || "") + '</div>' +
      '<div style="grid-column:4 / span 3; ' + c + ' font-size:11px; letter-spacing:0.06em;">sagradodemim.com.br</div>' +
    '</div>' +
    '<div style="margin-top:8px; font-size:6.6px; line-height:1.4; font-weight:700; text-align:center; padding:0 10px;">Ingredientes: ' + epEsc(ingred) + ' Uso externo. Não ingerir. Mantenha fora do alcance de crianças e animais.' + (o.tituloProduto ? '' : ' Para pedir um refil, informe o aroma ' + epEsc(o.base || "") + '.') + '</div>' +
  '</div>';
}
