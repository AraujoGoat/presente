/* ===== Inicialização ===== */
(() => {
  const C = window.CONTENT;
  const $ = id => document.getElementById(id);

  /* abrir a carta (configurada ANTES de tudo, para nunca travar) */
  const intro = $('intro');
  let aberta = false;
  const entrar = () => { try { intro.remove(); } catch(e){} $('stage').hidden = false; };
  const abrir = e => {
    if (aberta) return;
    aberta = true;
    if (e && e.preventDefault) e.preventDefault();
    intro.classList.add('aberta');
    setTimeout(() => intro.classList.add('sumindo'), 1300);
    setTimeout(entrar, 1900);
    setTimeout(entrar, 3500);            // garantia extra
  };
  ['click', 'pointerup', 'touchend'].forEach(ev => intro.addEventListener(ev, abrir));
  intro.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') abrir(e); });

  /* mostra erros na tela (ajuda a descobrir problemas no celular) */
  window.addEventListener('error', e => {
    const d = document.createElement('div');
    d.style.cssText = 'position:fixed;left:8px;right:8px;top:8px;z-index:9999;background:#fff;color:#900;padding:8px;font:12px monospace;border:2px solid #900;border-radius:8px;white-space:pre-wrap';
    d.textContent = 'Erro: ' + e.message + ' (linha ' + e.lineno + ')';
    document.body.appendChild(d);
  });

  /* tema */
  const r = document.documentElement.style;
  r.setProperty('--azul', C.tema.azul);
  r.setProperty('--turq', C.tema.turquesa);
  r.setProperty('--vinho', C.tema.vinho);
  r.setProperty('--rosa', C.tema.rosa);
  r.setProperty('--branco', C.tema.branco);
  document.title = '♡ ' + C.site.titulo;

  /* fundo com corações e estrelinhas subindo */
  const bg = $('bg'), glifos = ['♥', '✦', '♡', '★', '✧'];
  const cores = ['#ffffff', C.tema.rosa, C.tema.turquesa, C.tema.azul];
  for (let i = 0; i < 18; i++){
    const s = document.createElement('span');
    s.textContent = glifos[i % glifos.length];
    s.style.left = Math.random() * 100 + '%';
    s.style.fontSize = 14 + Math.random() * 24 + 'px';
    s.style.color = cores[i % cores.length];
    s.style.animationDuration = 14 + Math.random() * 16 + 's';
    s.style.animationDelay = -Math.random() * 28 + 's';
    s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
    s.style.setProperty('--rot', (Math.random() * 90 - 45) + 'deg');
    bg.appendChild(s);
  }

  /* carta de abertura */
  $('introPara').textContent = C.intro.para;
  $('introDica').textContent = C.intro.dica;
  $('introSelo').textContent = C.intro.selo || '♥';

  /* janela principal */
  $('tbName').textContent = C.site.barraTitulo;
  const menu = $('menubar');
  C.menu.forEach(m => {
    const b = document.createElement('button');
    const pronto = m.id === 'inicio' || UI.hasModule(m.id);
    b.className = 'mitem' + (m.id === 'inicio' ? ' ativo' : '') + (pronto ? '' : ' trava');
    b.innerHTML = `${UI.esc(m.icone)} ${UI.esc(m.rotulo)}${pronto ? '' : ' <span class="lock">🔒</span>'}`;
    b.onclick = () => {
      if (m.id === 'inicio') $('cardBody').scrollTo({ top: 0, behavior: 'smooth' });
      else UI.launch(m.id);
    };
    menu.appendChild(b);
  });

  Home.render($('cardBody'));

  const carinhos = ['te amo ♥', 'você é demais!', 'ganhou um abraço 🫂', 'sorria, é pra você 😊', 'que coisa linda ✨'];
  let ci = 0;
  $('btnHeart').onclick = () => UI.toast(carinhos[ci++ % carinhos.length]);
  $('btnX').onclick = () => UI.toast('calma! ainda tem muita coisa pra ver 🥺');
  $('btnMin').onclick = () => $('card').classList.toggle('recolhido');

  // atalho para desenvolver: index.html#pular abre direto
  if (location.hash === '#pular'){ intro.remove(); $('stage').hidden = false; }
})();
