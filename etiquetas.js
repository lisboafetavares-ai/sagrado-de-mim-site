// Etiquetas automáticas para imprimir a partir de um pedido (usado no painel).
// Para mudar textos de um produto (tipo, modo de uso, ingredientes), edite ETIQUETAS_CORPO abaixo.
// Medidas: etiqueta de produto 99 x 67,7 mm (deitada) · selo da caixa 67,7 x 99 mm (em pé).

const ETIQUETA_COR_LATERAL = "#A2A285"; // verde sage (oliva claro) da paleta
const ETIQUETA_FUNDO = "#F3EEE4";        // bege da paleta
const ETIQUETA_SELO_FUNDO = "#DCDDCB";   // sage bem claro

const ETIQUETAS_CORPO = {
  "sabonete-fatia-125": { tipo: "SABONETE ARTESANAL", modo: "Molhe o sabonete e a pele, faça espuma, massageie e enxágue bem.", ingredientes: "" },
  "sabonete-gel-250": { tipo: "SABONETE EM GEL", modo: "Aplique uma pequena quantidade na pele molhada, faça espuma e enxágue.", ingredientes: "" },
  "espuma-facial-70": { tipo: "ESPUMA DE LIMPEZA FACIAL", modo: "Aplique no rosto úmido, massageie suavemente evitando a área dos olhos e enxágue.", ingredientes: "" },
  "hidratante-250": { tipo: "HIDRATANTE CORPORAL", modo: "Após o banho, aplique na pele limpa e seca, massageando até absorver.", ingredientes: "" },
  "hidratante-moldura-300": { tipo: "HIDRATANTE MOLDURA", modo: "Após o banho, aplique na pele limpa e seca, massageando até absorver.", ingredientes: "" },
  "manteiga-200": { tipo: "MANTEIGA CORPORAL", modo: "Aplique pequenas quantidades na pele, massageando até absorver. Ideal após o banho.", ingredientes: "" },
  "creme-pes-100": { tipo: "CREME PARA OS PÉS", modo: "Aplique nos pés limpos e secos, massageando principalmente as áreas ressecadas.", ingredientes: "" }
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
  const corpo = [], semModelo = [], faltaIngred = new Set();
  (order.itens || []).forEach(item => {
    const p = etqProdutoDoItem(item);
    const cfg = p && ETIQUETAS_CORPO[p.id];
    if (cfg) {
      corpo.push({ item, p, cfg, aroma: etqAromaDoItem(item) });
      if (!cfg.ingredientes) faltaIngred.add(p.nome + (p.tamanho ? " " + p.tamanho : ""));
    } else {
      semModelo.push(item.tipo);
    }
  });
  return { corpo, semModelo, faltaIngred: [...faltaIngred] };
}

function etqHtmlCorpo(e, logoUrl) {
  const aroma = (e.aroma || "").toLowerCase().replace(/ e /g, " & ");
  const ingred = e.cfg.ingredientes
    ? etqEsc(e.cfg.ingredientes)
    : '<span style="display:inline-block; width:150px; border-bottom:0.5px solid #2E2A25;">&nbsp;</span>';
  return '<div class="etq corpo">' +
    '<div class="frente">' +
      '<div class="tipo">' + etqEsc(e.cfg.tipo) + '</div>' +
      '<div class="aroma">' + etqEsc(aroma || e.p.nome.toLowerCase()) + '</div>' +
      '<div class="lema">feito à mão<br>pensado para você</div>' +
    '</div>' +
    '<div class="lateral"></div>' +
    '<div class="girado">' +
      '<div class="marca"><img src="' + logoUrl + '" alt=""><span>AROMAS · ARTESANAL</span></div>' +
      '<div class="linha"></div>' +
      '<div class="txt"><b>INGREDIENTES:</b> ' + ingred + '</div>' +
      '<div class="txt"><b>MODO DE USO:</b> ' + etqEsc(e.cfg.modo) + '</div>' +
      '<div class="txt pequeno">Uso externo. Evite contato com os olhos. Em caso de irritação, suspenda o uso.</div>' +
      '<div class="rodape"><span><span class="vol">' + etqEsc(e.p.tamanho) + '</span><br>Validade: ______ · Lote: ______</span>' +
      '<span style="text-align:right">sagradodemim.com.br<br>(31) 99915-3132</span></div>' +
    '</div>' +
  '</div>';
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
.aviso { font-size: 13px; background: #eef1e6; color: #3d4a33; padding: 10px 14px; border-radius: 8px; margin: 10px; }
@media print { .aviso { display: none; } }
.folha { display: flex; flex-wrap: wrap; gap: 4mm; align-content: flex-start; }
.etq { position: relative; overflow: hidden; outline: 0.2mm dashed #c9c2b6; break-inside: avoid; page-break-inside: avoid; }
.corpo { width: 99mm; height: 67.7mm; background: ${ETIQUETA_FUNDO}; }
.corpo .frente { position: absolute; left: 0; top: 0; width: 63mm; height: 67.7mm; padding: 5.8mm 5.3mm 5.3mm; display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center; }
.corpo .tipo { font-size: 9px; letter-spacing: .16em; border-bottom: 1px solid #2E2A25; padding: 0 6px 3px; }
.corpo .aroma { font-family: 'Gloock', Georgia, serif; font-size: 34px; line-height: 1.05; }
.corpo .lema { font-size: 8.5px; letter-spacing: .14em; line-height: 1.5; text-transform: uppercase; border-top: 1px solid #2E2A25; border-bottom: 1px solid #2E2A25; padding: 4px 10px; }
.corpo .lateral { position: absolute; left: 63mm; top: 0; width: 36mm; height: 67.7mm; background: ${ETIQUETA_COR_LATERAL}; }
.corpo .girado { position: absolute; left: 47.15mm; top: 15.85mm; width: 67.7mm; height: 36mm; transform: rotate(-90deg); padding: 3.2mm 4.2mm 2.6mm; display: flex; flex-direction: column; gap: 5px; }
.corpo .marca { display: flex; align-items: flex-end; gap: 8px; }
.corpo .marca img { height: 30px; width: auto; display: block; }
.corpo .marca span { font-size: 7px; letter-spacing: .16em; padding-bottom: 3px; }
.corpo .linha { height: 1px; background: #2E2A25; }
.corpo .txt { font-size: 7px; line-height: 1.35; }
.corpo .txt b { font-weight: 500; letter-spacing: .1em; }
.corpo .pequeno { font-size: 6.5px; }
.corpo .rodape { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; font-size: 7px; line-height: 1.35; }
.corpo .vol { font-size: 9px; font-weight: 500; }
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
  if (!info.corpo.length && !op.selo) { alert("Esse pedido não tem etiquetas automáticas ainda."); return; }
  const w = window.open("", "_blank");
  if (!w) { alert("O navegador bloqueou a janela de impressão. Permita pop-ups para este site e tente de novo."); return; }
  const avisos = [];
  if (info.faltaIngred.length) avisos.push("Ingredientes ainda não cadastrados para: " + info.faltaIngred.join(", ") + " (sai um espaço em branco pra preencher à mão).");
  if (info.semModelo.length) avisos.push("Sem etiqueta automática ainda: " + info.semModelo.join(", ") + ".");
  const html = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Etiquetas ' + etqEsc(codigo) + '</title>' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500&family=Gloock&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&display=swap">' +
    '<style>' + ETQ_CSS + '</style></head><body>' +
    '<div class="aviso">Pedido ' + etqEsc(codigo) + ' · imprima em <b>tamanho real (100%)</b>, papel A4, sem "ajustar à página".' + (avisos.length ? '<br>' + avisos.map(etqEsc).join('<br>') : '') + '</div>' +
    '<div class="folha">' + info.corpo.map(e => etqHtmlCorpo(e, logoUrl)).join('') + (op.selo ? etqHtmlSelo(logoUrl) : '') + '</div>' +
    '<script>(async function(){try{await document.fonts.ready;}catch(e){}' +
    'await Promise.all([...document.images].map(function(i){return i.complete?0:new Promise(function(r){i.onload=i.onerror=r;});}));' +
    'setTimeout(function(){window.print();},300);})();<\/script>' +
    '</body></html>';
  w.document.open(); w.document.write(html); w.document.close();
}
