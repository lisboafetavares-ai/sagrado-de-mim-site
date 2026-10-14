// Editor livre de etiquetas (Estilo A, tudo editável) — usado na aba "Todas as etiquetas" do painel.
const EL_FONTES = [
  ["Bodoni (serifa elegante)", "'Bodoni Moda', Georgia, serif"], ["Cormorant (serifa clássica)", "'Cormorant Garamond', Georgia, serif"],
  ["Playfair (serifa forte)", "'Playfair Display', Georgia, serif"], ["Lora (serifa suave)", "'Lora', Georgia, serif"],
  ["Gloock (serifa encorpada)", "'Gloock', Georgia, serif"], ["Jost (moderna)", "'Jost', Arial, sans-serif"],
  ["Montserrat (moderna forte)", "'Montserrat', Arial, sans-serif"], ["Raleway (moderna fina)", "'Raleway', Arial, sans-serif"],
  ["Josefin (geométrica)", "'Josefin Sans', Arial, sans-serif"], ["DM Mono (máquina de escrever)", "'DM Mono', 'Courier New', monospace"],
  ["Dancing Script (cursiva)", "'Dancing Script', cursive"], ["Great Vibes (cursiva fina)", "'Great Vibes', cursive"],
  ["Georgia", "Georgia, serif"], ["Arial", "Arial, sans-serif"]
];
// Paleta ampla e neutra (tons terrosos, sálvia, azul-acinzentado, rosados, marrons)
const EL_CORES = ["#FFFFFF", "#FFFDF9", "#FBF7EE", "#F7EFDF", "#D8C8A9", "#8F9A6C", "#667449", "#2E2A25", "#000000", "#D4D6D5", "#C4BCB1", "#F0E6E4", "#EEE6DB", "#A79186", "#B8C3BD", "#CABC9F", "#EFCBBF", "#E6CCB5", "#9A7153", "#ABB9B9", "#ADA592", "#DABDB7", "#EAC3A4", "#93674E", "#7D8D8A", "#A0957F", "#C1A399", "#D2A57C", "#855845", "#587883", "#909E87", "#DCA68E", "#B28156", "#8E4733", "#5A6970", "#828574", "#B77C74", "#96684E", "#79422D", "#445C60", "#6C7467", "#9B5354", "#935435", "#68362B", "#455151", "#7D5754", "#7E3E22", "#4E2F2C", "#3E453D", "#5A6567", "#5A4437", "#603117", "#552C32", "#212D3B", "#502A1F", "#4D2A17", "#33271B", "#D3D5C8", "#9CA8A4", "#89968C", "#73847C", "#5C6C61", "#8F8B6E", "#988E73", "#CCBBA9", "#BB8970", "#A76B51", "#384B5A", "#506171", "#848D92", "#B1AEA7", "#6B6A65", "#4A4B45"];
const EL_PRESETS = [["Kayali Slim",3.5,5],["Kayali",4.5,5],["Perfume",4,5],["Difusor",5,5],["Difusor",7,4],["3 em 1",5,3],["3 em 1",3,2],
  ["Sabonete / Difusor",9.9,6.77],["Hidratante",6,6],["Body Splash",5,7],["Perfume pequeno",6.5,3.4],["Perfume",7,5]];

// Etiquetas prontas no Estilo A (as aprovadas), por produto. s = escala dos elementos.
const CU_CORPO = "Uso externo. Evite contato com os olhos. Mantenha fora do alcance de crianças.";
const CU_CASA = "Não ingerir. Mantenha longe do sol, do fogo e do alcance de crianças e animais.";
const CU_PERF = "Não ingerir. Uso externo. Evite contato com os olhos.";
const EL_PRONTAS = [
  ["Difusor 250 ml", "difusor-250", 9.9, 6.77, 1.2, "Bamboo Trouss", "DIFUSOR DE VARETAS", "250 ml", CU_CASA],
  ["Refil 500 ml", "refil-500", 9.9, 6.77, 1.2, "Bamboo Trouss", "REFIL DE DIFUSOR", "500 ml", CU_CASA],
  ["Refil 1 L", "refil-1l", 9.9, 6.77, 1.2, "Bamboo Trouss", "REFIL DE DIFUSOR", "1 L", CU_CASA],
  ["Home Spray 250 ml", "home-spray-250", 9.9, 6.77, 1.2, "Bamboo Trouss", "HOME SPRAY", "250 ml", CU_CASA],
  ["Home Spray 500 ml", "home-spray-500", 9.9, 6.77, 1.2, "Bamboo Trouss", "HOME SPRAY", "500 ml", CU_CASA],
  ["Água para Lençol", "agua-lencol", 9.9, 6.77, 1.2, "Bamboo Trouss", "ÁGUA PARA LENÇOL", "250 ml", CU_CASA],
  ["Sabonete Artesanal", "sabonete-fatia-125", 9.9, 6.77, 1.2, "Rosa Mosqueta", "SABONETE ARTESANAL", "125 g", CU_CORPO],
  ["Sabonete Líquido", "sabonete-gel-250", 9.9, 6.77, 1.2, "Rosas Brancas", "SABONETE LÍQUIDO", "250 ml", CU_CORPO],
  ["Hidratante (Moldura)", "hidratante-moldura-300", 6, 6, 0.95, "Mademoiselle", "HIDRATANTE CORPORAL", "300 g", CU_CORPO],
  ["Vela pequena", "vela-p", 6, 6, 0.95, "Bamboo Trouss", "VELA AROMÁTICA", "pequena", "Nunca deixe a vela acesa sem supervisão. Mantenha longe de crianças, animais e objetos inflamáveis."],
  ["Vela grande", "vela-g", 6, 6, 0.95, "Bamboo Trouss", "VELA AROMÁTICA", "grande", "Nunca deixe a vela acesa sem supervisão. Mantenha longe de crianças, animais e objetos inflamáveis."],
  ["Body Splash", "body-splash-250", 5, 7, 0.85, "Dreams", "BODY SPLASH", "250 ml", CU_CORPO],
  ["Body Shimmer", "body-shimmer-225", 5, 7, 0.85, "Madamme Magnólia", "BODY SHIMMER", "225 ml", CU_CORPO],
  ["Neutralizador", "neutralizador-70", 5, 7, 0.85, "Capim Limão", "NEUTRALIZADOR DE ODORES", "70 ml", CU_CASA],
  ["Passa Fácil", "passa-facil", 5, 7, 0.85, "Confort Home", "PASSA FÁCIL", "", CU_CASA],
  ["Espuma Facial", "espuma-facial-70", 5, 7, 0.85, "Espuma Facial", "LIMPEZA FACIAL", "70 ml", CU_CORPO],
  ["Perfume personalizado 6,5×3,4", "", 6.5, 3.4, 0.6, "Dreams", "PERFUME", "personalizado", CU_PERF],
  ["Perfume 7×5", "", 7, 5, 0.85, "Dreams", "PERFUME", "", CU_PERF],
  ["Kayali Slim 3,5×5", "", 3.5, 5, 0.66, "Nerolia e Lima", "EAU DE PARFUM", "", CU_PERF],
  ["Kayali 4,5×5", "", 4.5, 5, 0.8, "Nerolia", "EAU DE PARFUM", "", CU_PERF],
  ["Perfume 4×5", "", 4, 5, 0.72, "Nerolia e Lima", "EAU DE PARFUM", "", CU_PERF],
  ["Difusor 5×5", "difusor-250", 5, 5, 0.8, "White Gardênia", "DIFUSOR DE VARETAS", "", CU_CASA],
  ["Difusor 7×4", "difusor-250", 7, 4, 0.85, "Bamboo Trouss", "DIFUSOR DE VARETAS", "", CU_CASA],
  ["3 em 1 · 5×3", "", 5, 3, 0.55, "Perfume 3 em 1", "CORPO · CASA · CARRO", "", CU_PERF],
  ["3 em 1 · 3×2", "", 3, 2, 0.36, "3 em 1", "CORPO · CASA · CARRO", "", CU_PERF]
];
const PERF_INGR = "Álcool de Cereais, Essência, Glicerina Bidestilada, Extrato Glicerinado, Água Mineral, Corante Cosmético.";
function elAplicarPronta(i) {
  const p = EL_PRONTAS[i], s = p[4];
  const inf = (p[1] && typeof infoProduto === "function") ? infoProduto(p[1]) : {};
  const ehPerfume = /PERFUME|PARFUM|3 EM 1|CORPO · CASA/.test(p[6]);
  EL = Object.assign(JSON.parse(JSON.stringify(EL_PADRAO)), {
    larg: p[2], alt: p[3], titulo: p[5], sub: p[6], vol: p[7], extra: "",
    logoTam: +(24 * s).toFixed(1), tituloTam: +(5.4 * s).toFixed(1), subTam: +(1.9 * s).toFixed(2), volTam: +(1.7 * s).toFixed(2),
    faixaEsp: +(1.6 * s).toFixed(2), versoTam: +(1.75 * s).toFixed(2), seloTam: +(5.5 * s).toFixed(1),
    ingredientes: inf.ingredientes || (ehPerfume ? PERF_INGR : ""), modo: inf.modo || (ehPerfume ? "Borrife sobre a pele, nos pulsos e no pescoço." : ""), cuidados: p[8]
  });
}
const EL_PADRAO = {
  lado: "frente", larg: 5, alt: 5, fundo: "#FBF7EE", faixaCor: "#8F9A6C", faixaPos: "esquerda", faixaEsp: 1.6,
  mostrarLogo: true, logoCor: "#667449", logoTam: 22,
  titulo: "Bamboo Trouss", tituloFonte: "'Bodoni Moda', Georgia, serif", tituloTam: 4.6, tituloCor: "#3A3631", maiusculas: true,
  mostrarLinha: true, linhaCor: "#8F9A6C",
  sub: "DIFUSOR DE VARETAS", subFonte: "'Jost', Arial, sans-serif", subTam: 1.8, subCor: "#3A3631",
  extra: "", extraTam: 1.9, vol: "250 ml", volTam: 1.7, alinhar: "center",
  ingredientes: "Álcool de Cereais, Fragrância, Água Mineral, Corante.", modo: "Coloque as varetas no frasco e vire-as a cada 2 ou 3 dias.",
  cuidados: "Não ingerir. Mantenha longe do sol, do fogo e do alcance de crianças e animais.", versoTam: 1.7, versoFonte: "'Jost', Arial, sans-serif",
  mostrarSelos: true, seloTam: 5.5, mostrarContato: true, espaco: 1
};
let EL = JSON.parse(JSON.stringify(EL_PADRAO));
const _logoCache = {};
function elLogo(cor, cb) {
  if (_logoCache[cor]) return _logoCache[cor];
  const img = new Image();
  img.onload = () => {
    const c = document.createElement("canvas"); c.width = img.width * 3; c.height = img.height * 3;
    const x = c.getContext("2d"); x.drawImage(img, 0, 0, c.width, c.height);
    x.globalCompositeOperation = "source-in"; x.fillStyle = cor; x.fillRect(0, 0, c.width, c.height);
    _logoCache[cor] = c.toDataURL("image/png"); if (cb) cb();
  };
  img.src = "assets/logo-cursiva.png";
  return "assets/logo-cursiva.png";
}
function elEsc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
function elHtml(e, aoCarregarLogo) {
  const W = +e.larg * 10, H = +e.alt * 10, k = e.espaco || 1;
  const fe = +e.faixaEsp, fp = e.faixaPos;
  const pad = { l: 3.5, r: 3.5, t: 3, b: 3 };
  let faixa = "";
  if (fp === "esquerda") { faixa = `<div style="position:absolute;left:0;top:0;bottom:0;width:${fe}mm;background:${e.faixaCor}"></div>`; pad.l += fe; }
  if (fp === "direita") { faixa = `<div style="position:absolute;right:0;top:0;bottom:0;width:${fe}mm;background:${e.faixaCor}"></div>`; pad.r += fe; }
  if (fp === "topo") { faixa = `<div style="position:absolute;left:0;right:0;top:0;height:${fe}mm;background:${e.faixaCor}"></div>`; pad.t += fe; }
  if (fp === "base") { faixa = `<div style="position:absolute;left:0;right:0;bottom:0;height:${fe}mm;background:${e.faixaCor}"></div>`; pad.b += fe; }
  if (fp === "moldura") { faixa = `<div style="position:absolute;inset:${Math.max(1, fe)}mm;border:${Math.max(.2, fe / 4)}mm solid ${e.faixaCor}"></div>`; pad.l += fe; pad.r += fe; pad.t += fe; pad.b += fe; }
  const al = e.alinhar, ai = al === "center" ? "center" : "flex-start";
  const sel = (sz, cor) => (typeof seloFeitoAMao === "function" ? seloFeitoAMao(sz + "mm", cor) + seloCrueltyFree(sz + "mm", cor) : "");
  let corpo;
  if (e.lado === "verso") {
    const t = `font-family:${e.versoFonte};font-size:${e.versoTam}mm;line-height:1.45;color:${e.subCor};margin:0 0 ${1.4 * k}mm`;
    const h = `font-family:${e.versoFonte};font-weight:600;font-size:${e.versoTam * .88}mm;letter-spacing:.22em;color:${e.linhaCor};margin:0 0 ${.4 * k}mm`;
    corpo = `<div style="position:absolute;left:${pad.l}mm;right:${pad.r}mm;top:${pad.t}mm;bottom:${pad.b}mm;display:flex;flex-direction:column;text-align:left">` +
      (e.ingredientes ? `<p style="${h}">INGREDIENTES</p><p style="${t}">${elEsc(e.ingredientes)}</p>` : "") +
      (e.modo ? `<p style="${h}">MODO DE USO</p><p style="${t}">${elEsc(e.modo)}</p>` : "") +
      (e.cuidados ? `<p style="${h}">CUIDADOS</p><p style="${t}">${elEsc(e.cuidados)}</p>` : "") +
      `<div style="margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:2mm">` +
      (e.mostrarSelos ? `<div style="display:flex;gap:1mm">${sel(e.seloTam, e.linhaCor)}</div>` : "<span></span>") +
      (e.mostrarContato ? `<div style="font-family:${e.versoFonte};font-size:${e.versoTam * .9}mm;text-align:right;line-height:1.4;color:${e.subCor}">Feito à mão · Sagrado de Mim<br>sagradodemim.com.br · (31) 99915-3132</div>` : "") +
      `</div></div>`;
  } else {
    corpo = `<div style="position:absolute;left:${pad.l}mm;right:${pad.r}mm;top:${pad.t}mm;bottom:${pad.b}mm;display:flex;flex-direction:column;align-items:${ai};justify-content:center;text-align:${al}">` +
      (e.mostrarLogo ? `<img src="${elLogo(e.logoCor, aoCarregarLogo)}" alt="Sagrado de Mim" style="width:${e.logoTam}mm;display:block">` : "") +
      (e.titulo ? `<div style="font-family:${e.tituloFonte};font-size:${e.tituloTam}mm;line-height:1.05;letter-spacing:.05em;color:${e.tituloCor};margin-top:${2.6 * k}mm;${e.maiusculas ? "text-transform:uppercase;" : ""}word-break:break-word">${elEsc(e.titulo)}</div>` : "") +
      (e.extra ? `<div style="font-family:${e.subFonte};font-size:${e.extraTam}mm;letter-spacing:.2em;color:${e.subCor};margin-top:${1 * k}mm">${elEsc(e.extra)}</div>` : "") +
      (e.mostrarLinha ? `<div style="width:${Math.max(6, e.tituloTam * 2)}mm;height:.3mm;background:${e.linhaCor};margin:${2 * k}mm 0"></div>` : `<div style="height:${2 * k}mm"></div>`) +
      (e.sub ? `<div style="font-family:${e.subFonte};font-size:${e.subTam}mm;letter-spacing:.26em;color:${e.subCor}">${elEsc(e.sub)}</div>` : "") +
      (e.vol ? `<div style="font-family:${e.subFonte};font-size:${e.volTam}mm;letter-spacing:.12em;color:${e.subCor};margin-top:${1 * k}mm">${elEsc(e.vol)}</div>` : "") +
      `</div>`;
  }
  return `<div class="el-etq" style="position:relative;overflow:hidden;width:${W}mm;height:${H}mm;background:${e.fundo}">${faixa}${corpo}</div>`;
}

function elRender(box) {
  const e = EL;
  const cores = (campo) => `<div class="el-cores">${EL_CORES.map(c => `<button type="button" title="${c}" data-cor="${campo}" data-v="${c}" style="background:${c};${e[campo].toLowerCase() === c.toLowerCase() ? "outline:3px solid #2E2A25;" : ""}"></button>`).join("")}<input type="color" data-campo="${campo}" value="${e[campo]}" title="Outra cor"></div>`;
  const txt = (campo, rot, area) => `<label class="el-l">${rot}${area ? `<textarea data-campo="${campo}" rows="3">${elEsc(e[campo])}</textarea>` : `<input data-campo="${campo}" value="${elEsc(e[campo])}">`}</label>`;
  const rng = (campo, rot, min, max, step) => `<label class="el-l">${rot} <b data-v-de="${campo}">${e[campo]}</b><input type="range" data-campo="${campo}" min="${min}" max="${max}" step="${step}" value="${e[campo]}"></label>`;
  const fonte = (campo, rot) => `<label class="el-l">${rot}<select data-campo="${campo}">${EL_FONTES.map(f => `<option value="${elEsc(f[1])}" ${f[1] === e[campo] ? "selected" : ""} style="font-family:${elEsc(f[1])}">${f[0]}</option>`).join("")}</select></label>`;
  const chk = (campo, rot) => `<label class="el-c"><input type="checkbox" data-campo="${campo}" ${e[campo] ? "checked" : ""}> ${rot}</label>`;
  const salvos = JSON.parse(localStorage.getItem("sdm_modelos_etiqueta") || "[]");
  const escala = Math.min(4, 420 / (e.larg * 10 * 3.78), 360 / (e.alt * 10 * 3.78)) || 1;
  box.innerHTML = `
  <style>
    .el-wrap{display:flex;flex-wrap:wrap;gap:20px;font-family:Arial,sans-serif;font-size:13px;color:#2E2A25}
    .el-prev{flex:1 1 420px;min-width:280px;position:sticky;top:10px;align-self:flex-start}
    .el-palco{background:#ece6da;border-radius:12px;padding:20px;display:flex;justify-content:center;align-items:center;min-height:300px;overflow:auto}
    .el-ctrl{flex:1 1 360px;min-width:280px}
    .el-ctrl details{background:#fff;border:1px solid rgba(61,58,52,.15);border-radius:10px;padding:8px 12px;margin-bottom:8px}
    .el-ctrl summary{cursor:pointer;font-weight:700;color:#667449;padding:4px 0}
    .el-l{display:block;margin:8px 0 2px;font-weight:600;font-size:12px}
    .el-l input:not([type=range]),.el-l textarea,.el-l select{display:block;width:100%;box-sizing:border-box;margin-top:3px;padding:7px 9px;border:1px solid rgba(61,58,52,.3);border-radius:7px;font-family:inherit;font-size:13px;font-weight:400}
    .el-l input[type=range]{display:block;width:100%;margin-top:4px}
    .el-c{display:inline-flex;align-items:center;gap:5px;margin:6px 12px 2px 0;font-size:12px;cursor:pointer}
    .el-cores{display:flex;flex-wrap:wrap;gap:4px;margin:4px 0 6px}
    .el-cores button{width:22px;height:22px;border-radius:50%;border:1px solid rgba(0,0,0,.2);cursor:pointer;padding:0}
    .el-cores input{width:30px;height:24px;padding:0;border:none;background:none;cursor:pointer}
    .el-pres{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}
    .el-pres button,.el-btn{padding:6px 10px;border-radius:999px;border:1px solid #667449;background:#fff;color:#667449;cursor:pointer;font-size:12px}
    .el-btn.p{background:#667449;color:#fff}
    .el-tam{display:flex;gap:8px;align-items:end}
    .el-tam input{width:80px}
  </style>
  <div class="el-wrap">
    <div class="el-prev">
      <div style="display:flex;gap:6px;margin-bottom:8px">
        <button type="button" class="el-btn ${e.lado === "frente" ? "p" : ""}" data-lado="frente">Frente</button>
        <button type="button" class="el-btn ${e.lado === "verso" ? "p" : ""}" data-lado="verso">Verso</button>
        <span style="margin-left:auto;font-size:12px;color:#6b6558;align-self:center">${String(e.larg).replace(".", ",")} × ${String(e.alt).replace(".", ",")} cm</span>
      </div>
      <div class="el-palco"><div style="width:${e.larg * 10 * 3.78 * escala}px;height:${e.alt * 10 * 3.78 * escala}px"><div id="el-preview" style="transform:scale(${escala});transform-origin:0 0">${elHtml(e, () => elRender(box))}</div></div></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px">
        <label style="font-weight:700;font-size:12px">Quantidade <input id="el-qtd" type="number" min="1" max="200" value="1" style="width:64px;padding:6px;border:1px solid rgba(61,58,52,.3);border-radius:7px"></label>
        <label class="el-c"><input type="checkbox" id="el-par"> imprimir frente + verso juntos</label>
        <button type="button" class="el-btn p" id="el-imprimir">🖨️ Imprimir</button>
        <button type="button" class="el-btn" id="el-png">⬇️ Baixar imagem</button>
      </div>
      <div style="margin-top:14px;background:#fff;border:1px solid rgba(61,58,52,.15);border-radius:10px;padding:10px 12px">
        <b style="font-size:12px">Meus modelos salvos</b>
        <div style="display:flex;gap:6px;margin-top:6px"><input id="el-nome-modelo" placeholder="Nome do modelo (ex: Difusor 5x5 lavanda)" style="flex:1;padding:6px 8px;border:1px solid rgba(61,58,52,.3);border-radius:7px"><button type="button" class="el-btn p" id="el-salvar">Salvar</button></div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">${salvos.map((m, i) => `<span style="display:inline-flex;gap:2px"><button type="button" class="el-btn" data-carregar="${i}">${elEsc(m.nome)}</button><button type="button" class="el-btn" data-apagar="${i}" title="Apagar" style="padding:6px 8px">✕</button></span>`).join("") || '<span style="font-size:12px;color:#8a8676">Nenhum ainda. Edite uma etiqueta e salve aqui pra usar de novo.</span>'}</div>
        <button type="button" class="el-btn" id="el-reset" style="margin-top:8px">Começar do zero</button>
      </div>
    </div>
    <div class="el-ctrl">
      <details open><summary>📦 Etiquetas prontas (Opção A aprovada)</summary>
        <p style="margin:4px 0 6px;color:#6b6558;font-size:12px">Clique no produto pra carregar a etiqueta aprovada. Depois é só mudar o que quiser.</p>
        <div class="el-pres">${EL_PRONTAS.map((p, i) => `<button type="button" data-pronta="${i}">${p[0]}</button>`).join("")}</div>
      </details>
      <details><summary>📏 Tamanho</summary>
        <div class="el-pres">${EL_PRESETS.map(p => `<button type="button" data-pre="${p[1]}x${p[2]}">${p[0]} ${String(p[1]).replace(".", ",")}×${String(p[2]).replace(".", ",")}</button>`).join("")}</div>
        <div class="el-tam"><label class="el-l">Largura (cm)<input type="number" step="0.1" min="1" max="19" data-campo="larg" value="${e.larg}"></label><label class="el-l">Altura (cm)<input type="number" step="0.1" min="1" max="27" data-campo="alt" value="${e.alt}"></label></div>
      </details>
      <details open><summary>✏️ Textos da frente</summary>
        ${txt("titulo", "Nome / aroma (destaque)")}${chk("maiusculas", "Tudo em maiúsculas")}
        ${txt("extra", "Linha extra (ex.: nome personalizado)")}
        ${txt("sub", "Tipo do produto")}
        ${txt("vol", "Volume / peso (ex.: 250 ml)")}
        <label class="el-l">Alinhamento<select data-campo="alinhar"><option value="center" ${e.alinhar === "center" ? "selected" : ""}>Centralizado</option><option value="left" ${e.alinhar === "left" ? "selected" : ""}>À esquerda</option></select></label>
      </details>
      <details><summary>📝 Textos do verso</summary>
        ${txt("ingredientes", "Ingredientes", 1)}${txt("modo", "Modo de uso", 1)}${txt("cuidados", "Cuidados", 1)}
        ${chk("mostrarSelos", "Mostrar selos")}${chk("mostrarContato", "Mostrar contato")}
        ${fonte("versoFonte", "Fonte do verso")}${rng("versoTam", "Tamanho das letras do verso (mm)", 0.8, 4, 0.1)}${rng("seloTam", "Tamanho dos selos (mm)", 3, 12, 0.5)}
      </details>
      <details open><summary>🔠 Fontes e tamanhos</summary>
        ${fonte("tituloFonte", "Fonte do nome")}${rng("tituloTam", "Tamanho do nome (mm)", 1.5, 14, 0.1)}
        ${fonte("subFonte", "Fonte dos outros textos")}${rng("subTam", "Tamanho do tipo (mm)", 0.8, 6, 0.1)}${rng("volTam", "Tamanho do volume (mm)", 0.8, 6, 0.1)}${rng("extraTam", "Tamanho da linha extra (mm)", 0.8, 6, 0.1)}
        ${rng("espaco", "Espaço entre os itens", 0.3, 3, 0.1)}
      </details>
      <details open><summary>🎨 Cores</summary>
        <label class="el-l">Fundo</label>${cores("fundo")}
        <label class="el-l">Faixa / borda</label>${cores("faixaCor")}
        <label class="el-l">Nome / aroma</label>${cores("tituloCor")}
        <label class="el-l">Outros textos</label>${cores("subCor")}
        <label class="el-l">Tracinho, títulos do verso e selos</label>${cores("linhaCor")}
        <label class="el-l">Logo</label>${cores("logoCor")}
      </details>
      <details open><summary>✨ Elementos</summary>
        ${chk("mostrarLogo", "Mostrar logo")}${rng("logoTam", "Tamanho do logo (mm)", 6, 60, 0.5)}
        <label class="el-l">Faixa / borda<select data-campo="faixaPos">${[["esquerda","Faixa na esquerda"],["direita","Faixa na direita"],["topo","Faixa em cima"],["base","Faixa embaixo"],["moldura","Moldura em volta"],["nenhuma","Sem faixa"]].map(o => `<option value="${o[0]}" ${e.faixaPos === o[0] ? "selected" : ""}>${o[1]}</option>`).join("")}</select></label>
        ${rng("faixaEsp", "Espessura da faixa (mm)", 0.3, 15, 0.1)}
        ${chk("mostrarLinha", "Mostrar tracinho")}
      </details>
    </div>
  </div>`;
  const re = () => elRender(box);
  box.querySelectorAll("[data-campo]").forEach(inp => {
    const ev = inp.type === "checkbox" || inp.tagName === "SELECT" ? "change" : "input";
    inp.addEventListener(ev, () => {
      const c = inp.dataset.campo;
      EL[c] = inp.type === "checkbox" ? inp.checked : (inp.type === "range" || inp.type === "number") ? parseFloat(inp.value) || 0 : inp.value;
      if (inp.type === "range") { const b = box.querySelector(`[data-v-de="${c}"]`); if (b) b.textContent = inp.value; document.getElementById("el-preview").innerHTML = elHtml(EL, re); }
      else if (inp.type === "text" || inp.tagName === "TEXTAREA" || (inp.tagName === "INPUT" && !inp.type) || inp.type === "color") document.getElementById("el-preview").innerHTML = elHtml(EL, re);
      else re();
    });
    if (inp.type === "number" || inp.type === "color") inp.addEventListener("change", re);
  });
  box.querySelectorAll("[data-cor]").forEach(b => b.onclick = () => { EL[b.dataset.cor] = b.dataset.v; re(); });
  box.querySelectorAll("[data-pre]").forEach(b => b.onclick = () => { const [w, h] = b.dataset.pre.split("x").map(Number); EL.larg = w; EL.alt = h; const base = Math.min(w, h * 1.2); EL.logoTam = Math.round(base * 4.4 * 2) / 2; EL.tituloTam = Math.round(base * 0.9 * 10) / 10; EL.subTam = Math.max(1, Math.round(base * .34 * 10) / 10); EL.volTam = EL.subTam; EL.extraTam = EL.subTam; EL.versoTam = Math.max(1, Math.round(base * .3 * 10) / 10); EL.seloTam = Math.max(3, Math.round(base * 1.1)); EL.faixaEsp = Math.max(.8, Math.round(base * .3 * 10) / 10); re(); });
  box.querySelectorAll("[data-pronta]").forEach(b => b.onclick = () => { elAplicarPronta(+b.dataset.pronta); re(); });
  box.querySelectorAll("[data-lado]").forEach(b => b.onclick = () => { EL.lado = b.dataset.lado; re(); });
  box.querySelectorAll("[data-carregar]").forEach(b => b.onclick = () => { EL = Object.assign(JSON.parse(JSON.stringify(EL_PADRAO)), salvos[+b.dataset.carregar].estado); re(); });
  box.querySelectorAll("[data-apagar]").forEach(b => b.onclick = () => { if (!confirm("Apagar este modelo?")) return; salvos.splice(+b.dataset.apagar, 1); localStorage.setItem("sdm_modelos_etiqueta", JSON.stringify(salvos)); re(); });
  document.getElementById("el-salvar").onclick = () => { const n = document.getElementById("el-nome-modelo").value.trim() || ("Modelo " + (salvos.length + 1)); salvos.push({ nome: n, estado: JSON.parse(JSON.stringify(EL)) }); localStorage.setItem("sdm_modelos_etiqueta", JSON.stringify(salvos)); re(); };
  document.getElementById("el-reset").onclick = () => { EL = JSON.parse(JSON.stringify(EL_PADRAO)); re(); };
  document.getElementById("el-imprimir").onclick = elImprimir;
  document.getElementById("el-png").onclick = elPng;
}
function elImprimir() {
  const qtd = Math.max(1, Math.min(200, parseInt(document.getElementById("el-qtd").value) || 1));
  const par = document.getElementById("el-par").checked;
  const frente = elHtml(Object.assign({}, EL, { lado: "frente" })), verso = elHtml(Object.assign({}, EL, { lado: "verso" })), atual = elHtml(EL);
  let pecas = []; for (let i = 0; i < qtd; i++) { if (par) { pecas.push(frente, verso); } else pecas.push(atual); }
  const w = window.open("", "_blank");
  if (!w) { alert("O navegador bloqueou a janela de impressão. Permita pop-ups para este site."); return; }
  w.document.write('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Etiquetas</title>' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=Gloock&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&family=DM+Mono:wght@400;500&family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Playfair+Display:wght@400;700&family=Lora&family=Montserrat:wght@400;600&family=Raleway:wght@300;400&family=Josefin+Sans&family=Dancing+Script&family=Great+Vibes&display=swap">' +
    '<style>@page{size:A4;margin:10mm} *{-webkit-print-color-adjust:exact;print-color-adjust:exact;box-sizing:border-box} body{margin:0} p{margin:0} .folha{display:flex;flex-wrap:wrap;gap:3mm;align-content:flex-start} .aviso{font:13px Arial;background:#F7EFDF;padding:10px;margin:0 0 10px;border-radius:8px} @media print{.aviso{display:none}}</style></head><body>' +
    '<div class="aviso">Imprima em <b>tamanho real (100%)</b>, papel A4, sem "ajustar à página".</div><div class="folha">' + pecas.join("") + '</div>' +
    '<script>(async function(){try{await document.fonts.ready}catch(e){}await Promise.all([...document.images].map(function(i){return i.complete?0:new Promise(function(r){i.onload=i.onerror=r})}));setTimeout(function(){window.print()},300)})();<\/script></body></html>');
  w.document.close();
}
async function elPng() {
  const el = document.querySelector("#el-preview .el-etq");
  const wrap = document.createElement("div"); wrap.style.cssText = "position:fixed;left:-10000px;top:0"; wrap.innerHTML = el.outerHTML; document.body.appendChild(wrap);
  try { await document.fonts.ready; } catch (e) {}
  try {
    const canvas = await html2canvas(wrap.firstElementChild, { backgroundColor: null, scale: 6 });
    const a = document.createElement("a"); a.href = canvas.toDataURL("image/png"); a.download = "etiqueta-" + (EL.titulo || "sagrado").toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".png"; a.click();
  } catch (e) { alert("Não foi possível gerar a imagem agora."); }
  wrap.remove();
}
