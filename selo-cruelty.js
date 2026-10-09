// Selo "Cruelty Free" (não testado em animais), em traço fino, usado em todas as etiquetas.
// seloCrueltyFree(tamanho, cor) -> SVG; tamanho em qualquer unidade CSS ("9mm", "40px").
function seloCrueltyFree(tamanho, cor) {
  cor = cor || "#2E2A25";
  const id = "cf" + Math.random().toString(36).slice(2, 8);
  return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:' + tamanho + '; height:' + tamanho + '; display:block;" aria-label="Cruelty free - não testado em animais">' +
    '<defs><path id="' + id + 'a" d="M 16 50 A 34 34 0 0 1 84 50"/><path id="' + id + 'b" d="M 12 50 A 38 38 0 0 0 88 50"/></defs>' +
    '<circle cx="50" cy="50" r="47" fill="none" stroke="' + cor + '" stroke-width="2"/>' +
    '<text font-family="Arial, Helvetica, sans-serif" font-size="11.5" font-weight="700" letter-spacing="1.6" fill="' + cor + '">' +
      '<textPath href="#' + id + 'a" startOffset="50%" text-anchor="middle">CRUELTY FREE</textPath></text>' +
    '<text font-family="Arial, Helvetica, sans-serif" font-size="7.4" font-weight="700" letter-spacing="0.6" fill="' + cor + '">' +
      '<textPath href="#' + id + 'b" startOffset="50%" text-anchor="middle">NÃO TESTADO EM ANIMAIS</textPath></text>' +
    '<g fill="none" stroke="' + cor + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M 47 61 C 39 52 34 36 38 30 C 42 25 49 33 50 46 L 50 61"/>' +
      '<path d="M 53 61 C 61 52 66 36 62 30 C 58 25 51 33 50 46"/>' +
      '<path d="M 31 73 A 19 14 0 0 1 69 73"/>' +
    '</g>' +
  '</svg>';
}

// Selo "Feito à mão" (artesanal), mesmo estilo do Cruelty Free.
function seloFeitoAMao(tamanho, cor) {
  cor = cor || "#2E2A25";
  const id = "fm" + Math.random().toString(36).slice(2, 8);
  return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:' + tamanho + '; height:' + tamanho + '; display:block;" aria-label="Feito à mão - produto artesanal">' +
    '<defs><path id="' + id + 'a" d="M 16 50 A 34 34 0 0 1 84 50"/><path id="' + id + 'b" d="M 12 50 A 38 38 0 0 0 88 50"/></defs>' +
    '<circle cx="50" cy="50" r="47" fill="none" stroke="' + cor + '" stroke-width="2"/>' +
    '<text font-family="Arial, Helvetica, sans-serif" font-size="11.5" font-weight="700" letter-spacing="1.6" fill="' + cor + '">' +
      '<textPath href="#' + id + 'a" startOffset="50%" text-anchor="middle">FEITO À MÃO</textPath></text>' +
    '<text font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="700" letter-spacing="1.4" fill="' + cor + '">' +
      '<textPath href="#' + id + 'b" startOffset="50%" text-anchor="middle">ARTESANAL</textPath></text>' +
    '<g fill="none" stroke="' + cor + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M 50 50 C 44 45 38 40 38 34.5 C 38 30.5 41 28 44.2 28 C 46.6 28 48.6 29.4 50 31.6 C 51.4 29.4 53.4 28 55.8 28 C 59 28 62 30.5 62 34.5 C 62 40 56 45 50 50 Z"/>' +
      '<path d="M 27 62 L 34 58 C 38 56 42 56.5 46 58.5 L 54 62 C 56.5 63.2 56 66.5 53 66.4 L 44.5 65.6"/>' +
      '<path d="M 55 64.2 L 67 58.8 C 70 57.5 72.5 60.5 70.2 62.8 L 60 71 C 57 73.3 53.5 74 50 73.5 L 36 71.5 L 30 74.5"/>' +
    '</g>' +
  '</svg>';
}
