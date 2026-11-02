/* ══════════════════════════════════════════════════════════════════════════
   A PÁGINA DIRETA DA MENTORIA — só o preço, os dois botões e a prova viva.

   É um recorte testado do `pagina.js` da página completa
   (`~/Desktop/fimdeano-checklist`). Tudo que não é oferta ficou de fora:
   aulão, checklist, calculadora, torneira, cartão e doca.
   ══════════════════════════════════════════════════════════════════════════ */
const g = id => document.getElementById(id);
const reais = v => v.toLocaleString('pt-BR', { minimumFractionDigits:2, maximumFractionDigits:2 });

/* os eventos do funil: é com eles que o anúncio aprende quem converte */
window.marcar = function (evento, dados) {
  try { if (window.fbq) fbq('trackCustom', evento, dados || {}); } catch (e) {}
  try { if (window.rastro && window.rastro.evento) window.rastro.evento(evento, dados || {}); } catch (e) {}
};

/* ─────────────── 1 · O PREÇO ───────────────
   ⚠️ A CONTA FECHA NA TELA: parcela × n = total, e de onde vem o juro.
   A parcela é calculada pela tabela Price, a mesma do cartão — nenhum número
   de dinheiro aqui é digitado à mão. */
(function preco(){
  const { de, por, parcelas:n, JUROS_AM:i } = PRECO;
  const p = i > 0 ? por * i / (1 - Math.pow(1+i, -n)) : por/n;
  const total = p * n;

  g('porValor').textContent = por.toLocaleString('pt-BR');
  document.querySelector('.de s').textContent = 'R$ ' + de.toLocaleString('pt-BR');
  g('parcelaTxt').textContent = `${n}x de R$ ${reais(p)}`;
  g('fonteTxt').innerHTML =
    `${n} × R$ ${reais(p)} = <b>R$ ${reais(total)}</b> no parcelado · `
    + `juros do cartão de ${(i*100).toLocaleString('pt-BR',{minimumFractionDigits:2})}% a.m., `
    + `a taxa que a Kiwify cobra do comprador. À vista: R$ ${por.toLocaleString('pt-BR')}.`;
  document.querySelector('.selo-off').textContent =
    '−' + Math.round((1 - por/de)*100) + '%';
})();

/* ─────────────── 2 · PROVA VIVA ───────────────
   ⚠️ As setas são pedido dela, mas num celular quem arrasta é o dedo. Então as
   setas existem E a posição é lida do scroll de verdade: dedo e seta nunca
   discordam. */
(function provaViva(){
  const tira = g('pvTira'), pontos = g('pvPontos'),
        ant = g('pvAnt'), prox = g('pvProx'), dica = g('pvArrasta');
  if (!tira || typeof DEPOIMENTOS_LIVE === 'undefined') return;

  const esc = s => String(s).replace(/[&<>"]/g, c =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

  tira.innerHTML = DEPOIMENTOS_LIVE.map(d => `
    <article class="pv-card">
      <div class="pv-barra">
        <span class="mini"><i></i>AO VIVO</span>
        <b>Chat da aula<span>2 de novembro</span></b>
      </div>
      <div class="pv-corpo">
        <div class="pv-nome">${esc(d.nome)}</div>
        <div class="pv-bolha">${esc(d.fala)}</div>
        ${d.fala2 ? `<div class="pv-bolha">${esc(d.fala2)}</div>` : ''}
        <div class="pv-assina">
          <span class="pv-av" style="background:${d.cor}">${esc(d.nome.trim()[0])}</span>
          <span class="pv-hora">escrito às ${esc(d.hora)}, durante a aula</span>
        </div>
      </div>
    </article>`).join('');

  pontos.innerHTML = DEPOIMENTOS_LIVE.map((_, i) =>
    `<i class="${i === 0 ? 'on' : ''}"></i>`).join('');
  const bolas = [...pontos.children];

  const passo = () => {
    const c = tira.querySelector('.pv-card');
    return c ? c.offsetWidth + 10 : tira.clientWidth;   /* 10 = o gap */
  };
  /* ⚠️ NO FIM DA TIRA A DIVISÃO NÃO FECHA: o scroll máximo é menor que
     (n-1) passos, então o arredondamento marcava o penúltimo ponto no último
     cartão. No limite, o índice é o último, ponto. */
  const fim = () => tira.scrollWidth - tira.clientWidth;
  const atual = () => tira.scrollLeft >= fim() - 2
    ? DEPOIMENTOS_LIVE.length - 1
    : Math.round(tira.scrollLeft / passo());

  /* ⚠️ `primeira` existe porque o navegador RESTAURA o scroll da tira ao
     recarregar: sem ela, a dica «arrasta pro lado» se dava por cumprida e
     sumia de quem nunca arrastou. */
  let jaArrastou = false, primeira = true;
  function pinta(){
    const i = Math.max(0, Math.min(bolas.length - 1, atual()));
    bolas.forEach((b, k) => b.classList.toggle('on', k === i));
    ant.disabled  = tira.scrollLeft <= 2;
    prox.disabled = tira.scrollLeft >= fim() - 2;
    if (!primeira && !jaArrastou && tira.scrollLeft > 8){
      jaArrastou = true;
      dica.classList.add('sumiu');
      marcar('ArrastouDepoimentos');
    }
    primeira = false;
  }
  tira.addEventListener('scroll', pinta, { passive:true });
  ant.addEventListener('click',  () => tira.scrollBy({ left:-passo(), behavior:'smooth' }));
  prox.addEventListener('click', () => tira.scrollBy({ left: passo(), behavior:'smooth' }));
  addEventListener('resize', pinta);
  /* a primeira pintura espera o LAYOUT: rodando direto, a largura rolável
     ainda era 0 e a seta da esquerda nascia acesa no primeiro cartão */
  requestAnimationFrame(() => requestAnimationFrame(pinta));
  addEventListener('load', pinta);
  pinta();
})();

/* ─────────────── 3 · OS DOIS BOTÕES ───────────────
   Mesmo destino, eventos diferentes: é assim que dá pra saber se é a oferta ou
   a prova das ex-mentoradas que faz a pessoa clicar, em vez de supor. */
function ligaBotao(id, origem){
  const a = g(id);
  if (!a) return;
  if (LINK_MENTORIA && LINK_MENTORIA !== '#'){
    a.href = LINK_MENTORIA;
    a.addEventListener('click', () => {
      marcar('CliqueMentoria', { origem });
      try { if (window.fbq) fbq('track','InitiateCheckout',
        { value: PRECO.por, currency:'BRL' }); } catch (e) {}
    });
  } else {
    a.classList.add('morto');
    a.addEventListener('click', e => {
      e.preventDefault();
      g('peCta').textContent = '⚠️ O link do checkout não foi colado em conteudo.js (LINK_MENTORIA).';
      g('peCta').style.color = '#FF9A54';
    });
  }
}
ligaBotao('cta',  'oferta');
ligaBotao('cta2', 'depois-dos-depoimentos');
