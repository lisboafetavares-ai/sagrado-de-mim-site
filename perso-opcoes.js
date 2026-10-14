// Opções extras de personalização para as clientes (cores, tamanho do nome e mais fontes).
const PERSO_FONTES_EXTRA = [
  { id: "cursiva-fina", label: "Cursiva fina", family: "'Great Vibes',cursive", style: "normal", weight: "400" },
  { id: "bodoni", label: "Bodoni", family: "'Bodoni Moda',serif", style: "normal", weight: "400" },
  { id: "cormorant", label: "Cormorant", family: "'Cormorant Garamond',serif", style: "italic", weight: "500" },
  { id: "lora", label: "Lora", family: "'Lora',serif", style: "italic", weight: "400" },
  { id: "minimal", label: "Minimalista", family: "'Jost',sans-serif", style: "normal", weight: "400" },
  { id: "maquina", label: "Máquina de escrever", family: "'DM Mono',monospace", style: "normal", weight: "400" }
];
const PERSO_FONTES_LINK = "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Lora:ital@1&family=Jost:wght@400;500&family=DM+Mono&display=swap";
(function () { if (document.querySelector('link[data-perso-fontes]')) return; const l = document.createElement("link"); l.rel = "stylesheet"; l.href = PERSO_FONTES_LINK; l.dataset.persoFontes = "1"; document.head.appendChild(l); })();

const PERSO_FUNDOS = [["Off-white", "#FFFDF9"], ["Buttercream", "#EDE2CF"], ["Branco suave", "#F4F3EE"], ["Areia", "#E1D6C3"], ["Seafoam", "#D5DCD4"], ["Sálvia clara", "#BEC9BB"], ["Rosado", "#E5C6C1"], ["Rosa antigo", "#D8BFBB"], ["Lavanda clara", "#BFC6D0"], ["Cinza pombo", "#D8D5D0"]];
const PERSO_DETALHES = [["Sálvia", "#8F9A6C"], ["Oliva", "#667449"], ["Taupe", "#AA9787"], ["Ameixa suave", "#B8A5A9"], ["Verde-água", "#8FA5A3"], ["Azul névoa", "#95A5B2"], ["Lilás acinzentado", "#9294A0"], ["Terracota", "#B77C74"], ["Marrom", "#5A4437"], ["Grafite", "#2E2A25"]];
const PERSO_NOMES = [["Grafite", "#2E2A25"], ["Preto", "#000000"], ["Oliva", "#667449"], ["Marrom", "#5A4437"], ["Terracota", "#9B5354"], ["Azul petróleo", "#445C60"], ["Ameixa", "#7D5754"], ["Taupe", "#7D6B5D"]];

function persoCorEscura(hex) { const h = String(hex).replace("#", ""); const r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16); return (0.299 * r + 0.587 * g + 0.114 * b) < 140; }

// st: objeto com fundo, detalhe, corNome, nomeTam. opcoes.semDetalhe esconde a cor dos detalhes.
function persoControlesHtml(st, opcoes) {
  opcoes = opcoes || {};
  const sw = (campo, lista) => '<div class="pc-cores">' + lista.map(c => '<button type="button" class="pc-cor" data-pc="' + campo + '" data-v="' + c[1] + '" title="' + c[0] + '" aria-label="' + c[0] + '" style="background:' + c[1] + ';' + (String(st[campo]).toLowerCase() === c[1].toLowerCase() ? 'outline:3px solid #2E2A25; outline-offset:1px;' : '') + '"></button>').join('') + '</div>';
  return '<div class="pc-box">' +
    '<style>.pc-box{font-family:Jost,Arial,sans-serif;font-size:13px;color:#332f28;margin:6px 0 4px}.pc-box .pc-t{font-weight:500;margin:12px 0 6px;display:block}.pc-cores{display:flex;flex-wrap:wrap;gap:8px}.pc-cor{width:32px;height:32px;border-radius:50%;border:1px solid rgba(0,0,0,.18);cursor:pointer;padding:0}.pc-box input[type=range]{width:100%}</style>' +
    '<span class="pc-t">Cor do fundo</span>' + sw("fundo", PERSO_FUNDOS) +
    (opcoes.semDetalhe ? '' : '<span class="pc-t">Cor dos detalhes</span>' + sw("detalhe", PERSO_DETALHES)) +
    '<span class="pc-t">Cor do nome</span>' + sw("corNome", PERSO_NOMES) +
    '<span class="pc-t">Tamanho do nome</span><input type="range" min="' + (opcoes.min || 14) + '" max="' + (opcoes.max || 40) + '" step="1" value="' + st.nomeTam + '" data-pc-tam="1" aria-label="Tamanho do nome">' +
    '</div>';
}
function persoLigar(root, st, aoMudar) {
  root.querySelectorAll("[data-pc]").forEach(b => b.addEventListener("click", () => { st[b.dataset.pc] = b.dataset.v; aoMudar(true); }));
  const r = root.querySelector("[data-pc-tam]"); if (r) r.addEventListener("input", () => { st.nomeTam = +r.value; aoMudar(false); });
}
