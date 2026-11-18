/* ===== Tela inicial + módulo "nossa história" ===== */
const Home = (() => {
  const C = window.CONTENT;

  /* ---------- bonequinhos pixel ---------- */
  const SPRITES = {
    ela: [
      "....hhhhhh....",
      "..hhhhhhhhhh..",
      ".hhhhhhhhhhhh.",
      ".hhhsssssshhh.",
      ".hhsssssssshh.",
      ".hhsesssseshh.",
      ".hhsssssssshh.",
      ".hhscsssscshh.",
      ".hhsssmmssshh.",
      ".hh.ssssss.hh.",
      ".hh..ssss..hh.",
      ".h.tttttttt.h.",
      "..tttttttttt..",
      ".tttttttttttt."
    ],
    ele: [
      "....hhhhhh....",
      "...hhhhhhhh...",
      "..hhhhhhhhhh..",
      "..hhhhhhhhhh..",
      "..hssssssssh..",
      "..h" + "sesssses" + "h..",
      "..hssssssssh..",
      "..hscsssscsh..",
      "..hsssmmsssh..",
      "...ssssssss...",
      "....ssssss....",
      "..tttttttttt..",
      ".tttttttttttt.",
      "tttttttttttttt"
    ]
  };
  // acerta as linhas para 14 colunas
  Object.values(SPRITES).forEach(rows => rows.forEach((r, i) => rows[i] = r.padEnd(14, '.').slice(0, 14)));

  function pixelAvatar(qual, cores){
    const rows = SPRITES[qual];
    const S = rows.length + 2, cv = document.createElement('canvas');
    cv.width = cv.height = S;
    const g = cv.getContext('2d');
    const out = getComputedStyle(document.documentElement).getPropertyValue('--vinho-escuro').trim() || '#4e1124';
    const pal = { s: cores.pele, h: cores.cabelo, t: cores.roupa, e: '#2a1220', c: '#ff9bb5', m: '#b3405e', a: cores.laco || '#ff8fb1' };
    const grid = rows.map(r => [...r]);
    if (qual === 'ela'){ [[10,1],[11,1],[10,2],[11,2]].forEach(([x,y]) => grid[y][x] = 'a'); }
    const filled = (x, y) => grid[y] && grid[y][x] && grid[y][x] !== '.';
    for (let y = -1; y <= rows.length; y++){
      for (let x = -1; x <= 14; x++){
        if (filled(x, y)){ g.fillStyle = pal[grid[y][x]]; g.fillRect(x + 1, y + 1, 1, 1); }
        else if (filled(x+1,y)||filled(x-1,y)||filled(x,y+1)||filled(x,y-1)){ g.fillStyle = out; g.fillRect(x + 1, y + 1, 1, 1); }
      }
    }
    return cv;
  }

  function avatar(qual){
    const p = C.casal[qual];
    const div = document.createElement('div');
    div.className = 'avatar ' + qual;
    div.title = p.nome;
    if (p.foto){
      const img = new Image(); img.src = p.foto; img.alt = p.nome;
      img.onerror = () => { div.innerHTML = ''; div.appendChild(pixelAvatar(qual, p.pixel)); };
      div.appendChild(img);
    } else div.appendChild(pixelAvatar(qual, p.pixel));
    return div;
  }

  /* ---------- tempo juntos ---------- */
  const pad = n => String(n).padStart(2, '0');
  function diff(a, b){
    let y = b.getFullYear() - a.getFullYear(), m = b.getMonth() - a.getMonth(), d = b.getDate() - a.getDate();
    let h = b.getHours() - a.getHours(), mi = b.getMinutes() - a.getMinutes(), s = b.getSeconds() - a.getSeconds();
    if (s < 0){ s += 60; mi--; }
    if (mi < 0){ mi += 60; h--; }
    if (h < 0){ h += 24; d--; }
    if (d < 0){ d += new Date(b.getFullYear(), b.getMonth(), 0).getDate(); m--; }
    if (m < 0){ m += 12; y--; }
    return { y, m, d, h, mi, s };
  }
  function proximoMes(start, now){
    const total = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
    for (let k = Math.max(1, total); k <= total + 2; k++){
      const t = new Date(start.getFullYear(), start.getMonth() + k, 1, start.getHours(), start.getMinutes());
      const last = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
      t.setDate(Math.min(start.getDate(), last));
      if (t > now) return { k, data: t };
    }
  }
  function textoProximo(start, now){
    const p = proximoMes(start, now);
    if (!p) return '';
    const dias = Math.ceil((p.data - now) / 864e5);
    const nome = p.k % 12 === 0 ? `${p.k / 12} ano${p.k / 12 > 1 ? 's' : ''} de nós` : `${p.k}º mesversário`;
    return dias <= 0 ? `hoje é o nosso ${nome}! 🎉` : `faltam <b>${dias}</b> dia${dias > 1 ? 's' : ''} pro nosso ${nome}`;
  }

  function mensagemDoDia(offset = 0){
    const lista = C.mensagensDoDia || [];
    if (!lista.length) return '';
    const dia = Math.floor(Date.now() / 864e5 - new Date().getTimezoneOffset() / 1440);
    return lista[(dia + offset) % lista.length];
  }

  /* ---------- montagem ---------- */
  let timer;
  function render(root){
    const { ele, ela } = C.casal;
    const inicio = new Date(C.casal.inicio);
    const dataBR = isNaN(inicio) ? '' : inicio.toLocaleDateString('pt-BR');

    root.innerHTML = `
      <section class="banner">
        <div class="couple" id="couple"><span class="heart">♥</span></div>
        <div class="names">
          <h1>${UI.esc(ele.nome)} <i>♡</i> ${UI.esc(ela.nome)}</h1>
          <p>${UI.esc(C.casal.frase)}</p>
          ${dataBR ? `<span class="since">juntos desde ${dataBR}</span>` : ''}
        </div>
      </section>

      <nav class="linkrow" id="atalhos"></nav>

      <div class="grid">
        <div class="box c-azul contador larga">
          <span class="label">tempo juntos</span>
          <div class="dias"><span id="totDias">0</span><small>dias de nós ♡</small></div>
          <div class="units" id="units"></div>
          <p class="prox" id="prox"></p>
        </div>

        <div class="box c-rosa motd">
          <span class="label rosa">mensagem do dia</span>
          <p id="motd"></p>
          <div class="acoes"><button class="mini" id="outraMsg">outra ↻</button></div>
        </div>

        <div class="box sobre">
          <span class="label turq">sobre nós</span>
          <p>${UI.esc(C.sobre.resumo)}</p>
          <div class="acoes"><button class="mini" data-open="sobre">ler mais →</button></div>
        </div>

        <div class="box c-turq">
          <span class="label vinho">fav ♡ da ${UI.esc(ela.nome)}</span>
          <div class="chips">${C.gostos.ela.map(g => `<span class="chip">${UI.esc(g.icone)} ${UI.esc(g.nome)}</span>`).join('')}</div>
        </div>

        <div class="box">
          <span class="label">no repeat</span>
          <div class="singers">${C.gostos.musicos.map((m, i) => `<div class="singer"><i>${i + 1}</i>${UI.esc(m)}</div>`).join('')}</div>
        </div>
      </div>

      <div class="player">
        <span class="eq"><i></i><i></i><i></i><i></i></span>
        <span class="t">tocando: <em>${UI.esc(C.player.tocando)}</em></span>
        <span class="bar"><i></i></span>
      </div>
      <div class="rodape">${UI.esc(C.site.rodape)}</div>`;

    // avatares
    const couple = root.querySelector('#couple');
    couple.insertBefore(avatar('ele'), couple.firstChild);
    couple.appendChild(avatar('ela'));

    // atalhos
    const nav = root.querySelector('#atalhos');
    C.atalhos.forEach(a => {
      const pronto = UI.hasModule(a.id);
      const b = document.createElement('button');
      b.className = `btn ${a.cor || 'azul'}${pronto ? '' : ' trava'}`;
      b.innerHTML = `<span>${UI.esc(a.icone)}</span>${UI.esc(a.rotulo)}${pronto ? '' : '<span class="tag">em breve</span>'}`;
      b.onclick = () => UI.launch(a.id);
      nav.appendChild(b);
    });

    // botões "ler mais"
    root.querySelectorAll('[data-open]').forEach(b => b.onclick = () => UI.launch(b.dataset.open));

    // mensagem do dia
    let off = 0;
    const motd = root.querySelector('#motd');
    const setMsg = () => { motd.textContent = mensagemDoDia(off); };
    setMsg();
    root.querySelector('#outraMsg').onclick = () => { off++; setMsg(); };

    // contador
    const unitsEl = root.querySelector('#units');
    const nomes = [['y','anos'],['m','meses'],['d','dias'],['h','horas'],['mi','min'],['s','seg']];
    unitsEl.innerHTML = nomes.map(([k, n]) => `<div class="unit"><b data-k="${k}">0</b><span>${n}</span></div>`).join('');
    const tot = root.querySelector('#totDias'), prox = root.querySelector('#prox');
    clearInterval(timer);
    const tick = () => {
      const now = new Date();
      if (isNaN(inicio)) return;
      const d = diff(inicio, now);
      nomes.forEach(([k]) => { unitsEl.querySelector(`[data-k="${k}"]`).textContent = ['h','mi','s'].includes(k) ? pad(d[k]) : d[k]; });
      tot.textContent = Math.max(0, Math.floor((now - inicio) / 864e5)).toLocaleString('pt-BR');
      prox.innerHTML = textoProximo(inicio, now);
    };
    tick(); timer = setInterval(tick, 1000);
  }

  /* ---------- módulo: nossa história ---------- */
  UI.registerModule('sobre', {
    titulo: 'nossa_historia.txt', icone: '📖', tom: 'turq', largura: 480,
    render(body){
      body.innerHTML = `<h2>nossa história</h2>${C.sobre.historia.map(p => `<p>${UI.esc(p)}</p>`).join('')}`;
    }
  });

  return { render };
})();
