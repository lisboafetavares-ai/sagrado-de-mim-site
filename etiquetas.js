// Etiquetas automáticas para imprimir a partir de um pedido (usado no painel).
// Para mudar textos de um produto (tipo, modo de uso, ingredientes), edite ETIQUETAS_CORPO abaixo.
// Medidas: etiqueta de produto 99 x 67,7 mm (deitada) · selo da caixa 67,7 x 99 mm (em pé).

const ETIQUETA_COR_LATERAL = "#8F9A6C"; // verde sage (oliva claro) da paleta
const ETIQUETA_FUNDO = "#F7EFDF";        // bege da paleta
const ETIQUETA_SELO_FUNDO = "#D8C8A9";   // sage bem claro

const ETIQUETAS_CORPO = {
  "sabonete-fatia-125": { tipo: "SABONETE ARTESANAL", modo: "Molhe o sabonete e a pele, faça espuma, massageie e enxágue bem.", ingredientes: "", meses: 12 },
  "sabonete-gel-250": { tipo: "SABONETE LÍQUIDO", modo: "Aplique uma pequena quantidade na pele molhada, faça espuma e enxágue.", ingredientes: "", meses: 12 },
  "espuma-facial-70": { tipo: "ESPUMA DE LIMPEZA FACIAL", modo: "Aplique no rosto úmido, massageie suavemente evitando a área dos olhos e enxágue.", ingredientes: "", meses: 12 },
  "hidratante-250": { tipo: "HIDRATANTE CORPORAL", modo: "Após o banho, aplique na pele limpa e seca, massageando até absorver.", ingredientes: "", meses: 12 },
  "hidratante-moldura-300": { tipo: "HIDRATANTE CORPORAL", modo: "Após o banho, aplique na pele limpa e seca, massageando até absorver.", ingredientes: "", meses: 12 },
  "manteiga-200": { tipo: "MANTEIGA CORPORAL", modo: "Aplique pequenas quantidades na pele, massageando até absorver. Ideal após o banho.", ingredientes: "", meses: 12 },
  "creme-pes-100": { tipo: "CREME PARA OS PÉS", modo: "Aplique nos pés limpos e secos, massageando principalmente as áreas ressecadas.", ingredientes: "", meses: 12 }
};

function etqEsc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

// Descobre o produto do item (pelo id salvo no pedido ou, em pedidos antigos, pelo nome)
function etqProdutoDoItem(item) {
  if (typeof PRODUTOS === "undefined") return null;
  if (item.produto_id) return PRODUTOS.find(p => p.id === item.produto_id) || null;
  return null;
}

function etqAromaDoItem(item) {
  return item.aroma_estoque || (item.detalhes && item.detalhes["Aroma"]) || "";
}

// Lista o que vai sair na folha e o que ainda falta
function etiquetasDoPedido(order) {
  const corpo = [], casa = [], semModelo = [], faltaIngred = new Set();
  (order.itens || []).forEach(item => {
    const d = item.detalhes || {};
    if (d["Nome do aroma"] && ETQ_CASA[item.tipo]) {
      casa.push({ item, cfg: ETQ_CASA[item.tipo], nome: d["Nome do aroma"], base: d["Base aromática"] || "" });
      return;
    }
    const p = etqProdutoDoItem(item);
    const cfg = p && ETIQUETAS_CORPO[p.id];
    if (cfg) {
      corpo.push({ item, p, cfg, aroma: etqAromaDoItem(item) });
      if (!cfg.ingredientes) faltaIngred.add(p.nome + (p.tamanho ? " " + p.tamanho : ""));
    } else {
      semModelo.push(item.tipo);
    }
  });
  return { corpo, casa, semModelo, faltaIngred: [...faltaIngred] };
}


// Ícone "válido X meses depois de aberto" (pote aberto com o número de meses)
function etqIconePAO(meses) {
  return '<svg class="pao" viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg" aria-label="Válido ' + meses + ' meses depois de aberto">' +
    '<g fill="none" stroke="#2E2A25" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round">' +
    '<path d="M12 44 L14 74 Q50 90 86 74 L88 44"/>' +
    '<path d="M12 44 Q50 58 88 44"/>' +
    '<path d="M12 44 Q16 36 34 33"/>' +
    '<path d="M13.2 52 Q50 64 86.8 52"/>' +
    '<ellipse cx="54" cy="20" rx="38" ry="12" transform="rotate(-9 54 20)"/>' +
    '<path d="M16.6 26 L17.4 32 Q22 44 58 40 Q88 36 92.4 20 L91.6 14"/>' +
    '</g>' +
    '<text x="50" y="76.5" text-anchor="middle" font-family="Jost, Helvetica, Arial, sans-serif" font-size="16" font-weight="500" fill="#2E2A25" letter-spacing="1">' + meses + ' M</text>' +
    '</svg>';
}

function etqHtmlCorpo(e, logoUrl) {
  // Mesmo desenho do estúdio de etiquetas (374 x 256 px = 99 x 67,7 mm em tamanho real)
  if (typeof MODELOS !== "undefined" && MODELOS.corpo) {
    const st = { produto: e.p.id, aroma: e.aroma, tipoTexto: e.cfg.tipo, ingredientes: e.cfg.ingredientes || (typeof infoProduto === "function" ? infoProduto(e.p.id).ingredientes : "") || "",
      modo: e.cfg.modo, meses: e.cfg.meses || 12, fundo: "#F7EFDF", lateral: "#8F9A6C" };
    return '<div class="etq" style="width:99mm; height:67.7mm;"><div style="transform:scale(' + ((99 * 96 / 25.4) / 374) + '); transform-origin:0 0; width:374px; height:256px;">' + MODELOS.corpo.html(st) + '</div></div>';
  }
  return '';
}


// ---- Difusor / Home Spray do quiz "Aroma para Casa" (mesmo modelo da aba Personalizar Etiqueta) ----
const ETQ_CASA = {
  "Difusor de Varetas": { nome: "DIFUSOR DE VARETAS", ingredientes: "Óleo Mineral, Fragrância, Álcool, Corante.", volume: "250mL" },
  "Home Spray": { nome: "HOME SPRAY", ingredientes: "Água, Álcool, Fragrância, Glicerina.", volume: "200mL" }
};

function etqHtmlCasa(e, logoUrl) {
  const f = (99 * 96 / 25.4) / 495;
  return '<div class="etq" style="width:99mm; height:67.7mm;"><div style="transform:scale(' + f + '); transform-origin:0 0; width:495px; height:338px;">' +
    etiquetaCasaHtml({ nome: e.nome, base: e.base, produto: e.item.tipo === "Home Spray" ? "spray" : "difusor", ingredientes: e.cfg.ingredientes, volume: e.cfg.volume, logoUrl: logoUrl }) +
  '</div></div>';
}

function etqHtmlSelo(logoUrl) {
  return '<div class="etq selo">' +
    '<div class="frase"><div>um aroma</div><div class="it">feito</div><div>para você</div></div>' +
    '<div class="base"><img src="' + logoUrl + '" alt="Sagrado de Mim"><div class="site">sagradodemim.com.br</div></div>' +
  '</div>';
}

const ETQ_CSS = `
@page { size: A4; margin: 10mm; }
* { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: Jost, 'Helvetica Neue', Arial, sans-serif; color: #2E2A25; background: #fff; }
.aviso { font-size: 13px; background: #D8C8A9; color: #667449; padding: 10px 14px; border-radius: 8px; margin: 10px; }
@media print { .aviso { display: none; } }
.folha { display: flex; flex-wrap: wrap; gap: 4mm; align-content: flex-start; }
.etq { position: relative; overflow: hidden; outline: 0.2mm dashed #D8C8A9; break-inside: avoid; page-break-inside: avoid; }
.corpo { width: 99mm; height: 67.7mm; background: ${ETIQUETA_FUNDO}; }
.corpo .frente { position: absolute; left: 0; top: 0; width: 63mm; height: 67.7mm; padding: 5.8mm 5.3mm 5.3mm; display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center; }
.corpo .tipo { font-size: 9px; letter-spacing: .16em; border-bottom: 1px solid #2E2A25; padding: 0 6px 3px; }
.corpo .aroma { font-family: 'Gloock', Georgia, serif; font-size: 34px; line-height: 1.05; }
.corpo .lema { font-size: 8.5px; letter-spacing: .14em; line-height: 1.5; text-transform: uppercase; border-top: 1px solid #2E2A25; border-bottom: 1px solid #2E2A25; padding: 4px 10px; }
.corpo .lateral { position: absolute; left: 63mm; top: 0; width: 36mm; height: 67.7mm; background: ${ETIQUETA_COR_LATERAL}; }
.corpo .girado { position: absolute; left: 47.15mm; top: 15.85mm; width: 67.7mm; height: 36mm; transform: rotate(-90deg); padding: 3mm 4.2mm 2.4mm; display: flex; flex-direction: column; gap: 3px; }
.corpo .marca { display: flex; align-items: flex-end; gap: 8px; }
.corpo .marca img { height: 24px; width: auto; display: block; }
.corpo .marca span { font-size: 7px; letter-spacing: .16em; padding-bottom: 3px; }
.corpo .linha { height: 1px; background: #2E2A25; }
.corpo .txt { font-size: 7px; line-height: 1.35; }
.corpo .txt b { font-weight: 500; letter-spacing: .1em; }
.corpo .pequeno { font-size: 6.5px; }
.corpo .rodape { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; font-size: 7px; line-height: 1.35; }
.corpo .vol { font-size: 9px; font-weight: 500; }
.corpo .pao-box { display: flex; align-items: flex-end; gap: 7px; }
.corpo .pao { width: 8.5mm; height: auto; display: block; }
.casa { position: relative; width: 99mm; height: 67.7mm; background: #fff; color: #1a1a1a; display: flex; align-items: center; gap: 2.4mm; padding: 3.2mm 3.6mm; }
.casa .ing { position: relative; width: 8.8mm; height: 61.2mm; flex-shrink: 0; }
.casa .ing-txt { position: absolute; top: 50%; left: 50%; width: 59.2mm; height: 8.8mm; transform: translate(-50%,-50%) rotate(-90deg); font-family: Arial, sans-serif; font-weight: 700; font-size: 6.8px; line-height: 1.4; display: flex; align-items: center; }
.casa .meio { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: Georgia, serif; }
.casa .meio img { width: 28mm; margin-bottom: 2.8mm; }
.casa .moldura { border: 1.5px solid #1a1a1a; padding: 2.4mm 3.6mm; text-align: center; margin-bottom: 2.4mm; min-width: 48mm; font-size: 22.7px; letter-spacing: 1px; }
.casa .produto { font-size: 18px; letter-spacing: 1px; text-align: center; margin-bottom: 1.6mm; }
.casa .vol { font-family: Arial, sans-serif; font-size: 12px; }
.selo { width: 67.7mm; height: 99mm; background: ${ETIQUETA_SELO_FUNDO}; }
.selo .frase { position: absolute; right: 8mm; top: 7.4mm; text-align: right; font-family: 'Bodoni Moda', Georgia, serif; font-size: 27px; line-height: 1.05; }
.selo .frase .it { font-style: italic; padding-right: 14px; }
.selo .base { position: absolute; left: 0; bottom: 0; width: 100%; padding: 0 6mm 7.4mm; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.selo .base img { width: 40mm; height: auto; display: block; }
.selo .site { font-size: 11px; letter-spacing: .06em; }
`;

// Abre uma janela com a folha A4 pronta e chama a impressão
function imprimirEtiquetasPedido(codigo, order, opcoes) {
  const op = Object.assign({ selo: true }, opcoes || {});
  const info = etiquetasDoPedido(order);
  const logoUrl = new URL("assets/logo-cursiva.png", location.href).href;
  if (!info.corpo.length && !info.casa.length && !op.selo) { alert("Esse pedido não tem etiquetas automáticas ainda."); return; }
  const w = window.open("", "_blank");
  if (!w) { alert("O navegador bloqueou a janela de impressão. Permita pop-ups para este site e tente de novo."); return; }
  const avisos = [];
  if (info.faltaIngred.length) avisos.push("Ingredientes ainda não cadastrados para: " + info.faltaIngred.join(", ") + " (sai um espaço em branco pra preencher à mão).");
  if (info.semModelo.length) avisos.push("Sem etiqueta automática ainda: " + info.semModelo.join(", ") + ".");
  const html = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Etiquetas ' + etqEsc(codigo) + '</title>' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500&family=Gloock&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&display=swap">' +
    '<style>' + ETQ_CSS + '</style></head><body>' +
    '<div class="aviso">Pedido ' + etqEsc(codigo) + ' · imprima em <b>tamanho real (100%)</b>, papel A4, sem "ajustar à página".' + (avisos.length ? '<br>' + avisos.map(etqEsc).join('<br>') : '') + '</div>' +
    '<div class="folha">' + info.casa.map(e => etqHtmlCasa(e, logoUrl)).join('') + info.corpo.map(e => etqHtmlCorpo(e, logoUrl)).join('') + (op.selo ? etqHtmlSelo(logoUrl) : '') + '</div>' +
    '<script>(async function(){try{await document.fonts.ready;}catch(e){}' +
    'await Promise.all([...document.images].map(function(i){return i.complete?0:new Promise(function(r){i.onload=i.onerror=r;});}));' +
    'setTimeout(function(){window.print();},300);})();<\/script>' +
    '</body></html>';
  w.document.open(); w.document.write(html); w.document.close();
}
