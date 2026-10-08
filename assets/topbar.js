/* Barra do topo compartilhada (todas as páginas, menos a home — que tem a própria — e o painel).
   Para mudar links, cores ou textos da barra, é só editar este arquivo. */
(function () {
  if (window.__topbarLoaded) return;
  window.__topbarLoaded = true;

  var CSS = [
    '.tb{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(246,239,230,0.95);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-bottom:1px solid rgba(61,58,52,0.2);}',
    '.tb *{box-sizing:border-box;}',
    '.tb-in{max-width:1080px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;gap:22px;}',
    '.tb-brand img{height:50px;width:auto;display:block;}',
    '.tb-links{display:flex;gap:24px;margin-left:10px;font-family:Arial,sans-serif;font-size:13px;letter-spacing:0.4px;}',
    '.tb-links a{color:#4a463e;text-decoration:none;padding-bottom:2px;border-bottom:2px solid transparent;}',
    '.tb-links a:hover{color:#556238;}',
    '.tb-links a.tb-active{color:#556238;font-weight:700;border-bottom-color:#556238;}',
    '.tb-actions{margin-left:auto;display:flex;gap:10px;align-items:center;position:relative;}',
    '.tb-btn{font-family:Arial,sans-serif;font-weight:700;font-size:13px;padding:10px 16px;border-radius:10px;border:1px solid transparent;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;line-height:1.2;}',
    '.tb-primary{background:#556238;color:#fff;}',
    '.tb-ghost{background:transparent;border-color:rgba(61,58,52,0.3);color:#332f28;}',
    '.tb-badge{background:#fff;color:#556238;border-radius:999px;font-size:11px;padding:2px 7px;display:none;}',
    '.tb-panel{position:absolute;right:0;top:calc(100% + 10px);width:236px;background:#fbf7f0;border:1px solid rgba(61,58,52,0.2);border-radius:14px;box-shadow:0 14px 34px rgba(61,58,52,0.16);padding:8px;display:none;flex-direction:column;}',
    '.tb-panel.tb-open{display:flex;}',
    '.tb-panel a{font-family:Arial,sans-serif;font-size:14px;padding:11px 12px;border-radius:8px;color:#332f28;text-decoration:none;text-align:left;}',
    '.tb-panel a:hover{background:#eef1e6;}',
    '.tb-sep{height:1px;background:rgba(61,58,52,0.2);margin:6px 4px;}',
    '.tb-g{display:flex;flex-direction:column;}',
    '.tb-lbl-m{display:none;}',
    '.tb.tb-sess .tb-g-out,.tb.tb-sess .tb-enter{display:none;}',
    '.tb:not(.tb-sess) .tb-g-in,.tb:not(.tb-sess) .tb-menubtn{display:none;}',
    '@media (min-width:861px){.tb-g-site{display:none;}}',
    '@media (max-width:860px){',
    '  .tb-links{display:none;}',
    '  .tb-enter{display:none !important;}',
    '  .tb:not(.tb-sess) .tb-menubtn{display:inline-flex;}',
    '  .tb-lbl-d{display:none;}',
    '  .tb-lbl-m{display:inline;font-size:18px;line-height:1;}',
    '  .tb-cartlbl{display:none;}',
    '}'
  ].join('\n');

  var HTML =
    '<div class="tb-in">' +
      '<a class="tb-brand" href="index.html" aria-label="Sagrado de Mim, início"><img src="assets/logo-cursiva.png" alt="Sagrado de Mim"></a>' +
      '<nav class="tb-links">' +
        '<a href="index.html#perfumes" data-tb="perfumes">Perfume personalizado</a>' +
        '<a href="loja.html" data-tb="loja">Loja</a>' +
        '<a href="quiz-casa.html" data-tb="casa">Aroma para casa</a>' +
      '</nav>' +
      '<div class="tb-actions">' +
        '<a class="tb-btn tb-primary" href="carrinho.html">🛒 <span class="tb-cartlbl">Carrinho</span> <span class="tb-badge" id="tb-count">0</span></a>' +
        '<a class="tb-btn tb-ghost tb-enter" href="auth.html">Entrar</a>' +
        '<button type="button" class="tb-btn tb-ghost tb-menubtn" id="tb-menubtn" aria-haspopup="true"><span class="tb-lbl-d">Minha conta ▾</span><span class="tb-lbl-m">☰</span></button>' +
        '<div class="tb-panel" id="tb-panel">' +
          '<div class="tb-g tb-g-site">' +
            '<a href="index.html#perfumes">Perfume personalizado</a>' +
            '<a href="loja.html">Loja</a>' +
            '<a href="quiz-casa.html">Aroma para casa</a>' +
            '<div class="tb-sep"></div>' +
          '</div>' +
          '<div class="tb-g tb-g-in">' +
            '<a href="meu-perfil.html">Meu perfil</a>' +
            '<a href="meus-pedidos.html">Meus pedidos</a>' +
            '<a href="admin.html" id="tb-admin" style="display:none;">Painel da loja</a>' +
            '<div class="tb-sep"></div>' +
            '<a href="#" id="tb-logout">Sair</a>' +
          '</div>' +
          '<div class="tb-g tb-g-out">' +
            '<a href="auth.html">Entrar ou criar conta</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var ACTIVE = {
    'loja.html': 'loja',
    'quiz-casa.html': 'casa',
    'quiz-corporal.html': 'perfumes',
    'perfume-monte.html': 'perfumes'
  };

  function readJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || 'null') || fallback; } catch (e) { return fallback; }
  }

  function init() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.className = 'tb';
    bar.id = 'tb';
    bar.innerHTML = HTML;
    document.body.insertBefore(bar, document.body.firstChild);

    // marca o item do menu da página atual
    var file = (location.pathname.split('/').pop() || 'index.html');
    var key = ACTIVE[file];
    if (key) {
      var a = bar.querySelector('.tb-links a[data-tb="' + key + '"]');
      if (a) a.classList.add('tb-active');
    }

    // empurra o conteúdo para baixo da barra (que é fixa), sem mexer no resto do layout da página
    var basePad = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
    function pad() { document.body.style.paddingTop = (basePad + bar.offsetHeight) + 'px'; }
    pad();
    window.addEventListener('resize', pad);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(pad);
    var logo = bar.querySelector('.tb-brand img');
    if (logo && !logo.complete) logo.addEventListener('load', pad);

    var panel = bar.querySelector('#tb-panel');
    bar.querySelector('#tb-menubtn').addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.toggle('tb-open');
    });
    document.addEventListener('click', function (e) { if (!panel.contains(e.target)) panel.classList.remove('tb-open'); });
    bar.querySelector('#tb-logout').addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('sagradoSession');
      window.location.href = 'index.html';
    });

    function refresh() {
      var s = readJSON('sagradoSession', null);
      bar.classList.toggle('tb-sess', !!s);
      bar.querySelector('#tb-admin').style.display = (s && s.isAdmin) ? 'block' : 'none';
      var cart = readJSON('sagradoCart', []);
      var n = Array.isArray(cart) ? cart.length : 0;
      var badge = bar.querySelector('#tb-count');
      badge.textContent = n;
      badge.style.display = n > 0 ? 'inline-block' : 'none';
    }
    refresh();
    window.updateTopbarCart = refresh;
    window.addEventListener('storage', refresh);
    setInterval(refresh, 800); // mantém o contador certo quando a página mexe no carrinho sem recarregar
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
