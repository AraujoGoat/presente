/* ===== Núcleo: janelas, avisos e módulos =====
   As próximas partes (poemas, galeria, etc.) usam isto:
     UI.registerModule('poemas', { titulo:'poemas', icone:'💌', tom:'rosa', largura:460, render(body, win){...} })
   Depois qualquer botão pode abrir com UI.launch('poemas').                */
const UI = (() => {
  const wins = new Map();
  const modules = {};
  let z = 100;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const isMobile = () => window.matchMedia('(max-width:700px)').matches;

  /* ---------- aviso ---------- */
  let toastTimer;
  function toast(msg, ms = 2600){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('on'), ms);
  }

  /* ---------- janelas ---------- */
  function focus(w){ w.el.style.zIndex = ++z; }

  function open(id, opts = {}){
    if (wins.has(id)){ focus(wins.get(id)); return wins.get(id); }

    const el = document.createElement('div');
    el.className = `win tone-${opts.tom || 'azul'}`;
    el.dataset.id = id;
    el.innerHTML = `
      <div class="win-title">
        <span class="win-ico">${esc(opts.icone || '♥')}</span>
        <span class="win-name">${esc(opts.titulo || id)}</span>
        <button class="wbtn" aria-label="fechar">×</button>
      </div>
      <div class="win-body"></div>`;
    document.getElementById('windows').appendChild(el);

    const width = Math.min(opts.largura || 460, window.innerWidth - 16);
    el.style.width = width + 'px';
    const n = wins.size % 6;
    el.style.left = Math.max(8, (window.innerWidth - width) / 2 + (n - 2) * 26) + 'px';
    el.style.top  = Math.max(8, Math.min(70 + n * 28, window.innerHeight - 200)) + 'px';

    const w = {
      id, el,
      body: el.querySelector('.win-body'),
      setTitle: t => { el.querySelector('.win-name').textContent = t; },
      close: () => close(id)
    };
    wins.set(id, w);
    focus(w);
    el.addEventListener('pointerdown', () => focus(w));
    el.querySelector('.wbtn').addEventListener('click', w.close);
    w.onClose = opts.aoFechar;

    // arrastar pela barra de título (só no computador)
    const bar = el.querySelector('.win-title');
    bar.addEventListener('pointerdown', e => {
      if (isMobile() || e.target.closest('.wbtn')) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - r.left, dy = e.clientY - r.top;
      bar.setPointerCapture(e.pointerId);
      bar.classList.add('arrastando');
      const move = ev => {
        el.style.left = Math.min(Math.max(0, ev.clientX - dx), window.innerWidth - 80) + 'px';
        el.style.top  = Math.min(Math.max(0, ev.clientY - dy), window.innerHeight - 40) + 'px';
      };
      const up = () => {
        bar.classList.remove('arrastando');
        bar.removeEventListener('pointermove', move);
        bar.removeEventListener('pointerup', up);
      };
      bar.addEventListener('pointermove', move);
      bar.addEventListener('pointerup', up);
    });

    if (opts.html) w.body.innerHTML = opts.html;
    if (opts.render) opts.render(w.body, w);
    return w;
  }

  function close(id){
    const w = wins.get(id);
    if (!w) return;
    wins.delete(id);
    w.el.classList.add('fechando');
    setTimeout(() => w.el.remove(), 150);
    if (w.onClose) w.onClose();
  }

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !wins.size) return;
    const top = [...wins.values()].sort((a, b) => (+b.el.style.zIndex) - (+a.el.style.zIndex))[0];
    top.close();
  });

  /* ---------- módulos ---------- */
  function registerModule(id, def){ modules[id] = def; }
  const hasModule = id => !!modules[id];
  function launch(id){
    const m = modules[id];
    if (!m){ toast('essa parte chega em breve ✨'); return null; }
    return open(id, { titulo: m.titulo, icone: m.icone, tom: m.tom, largura: m.largura, render: m.render, aoFechar: m.aoFechar });
  }

  return { open, close, toast, esc, launch, registerModule, hasModule, isMobile };
})();
