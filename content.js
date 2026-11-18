/* =====================================================================
   ♡ ARQUIVO DE CONTEÚDO — é AQUI que você personaliza tudo ♡
   Tudo o que aparece no site vem deste arquivo.
   (Na Parte 4 o painel de edição vai gerar/editar este arquivo pra você.)

   Dicas:
   - Textos ficam entre aspas "assim".
   - Não apague vírgulas nem chaves { } [ ].
   - Fotos: coloque na pasta /midia e escreva o caminho, ex: "midia/nos.jpg"
   ===================================================================== */

window.CONTENT = {

  /* ---------- Identidade do site ---------- */
  site: {
    titulo: "nosso cantinho",
    barraTitulo: "nosso_cantinho.exe",
    rodape: "feito com amor, por Gui ♡"
  },

  /* ---------- Cores (azul, turquesa e vinho + branco e rosa) ---------- */
  tema: {
    azul: "#3d7be0",
    turquesa: "#2bbfb3",
    vinho: "#7b1e3a",
    rosa: "#ffc2d4",
    branco: "#fffaf7"
  },

  /* ---------- O casal ---------- */
  casal: {
    inicio: "2024-03-14T19:30:00",          // data e hora que vocês começaram (ano-mês-diaTHH:MM:SS)
    frase: "dois nerds, um coração e muitos jogos ♡",
    ele: {
      nome: "Gui",
      foto: "",                               // ex: "midia/gui.jpg" (vazio = usa o bonequinho pixel)
      pixel: { pele: "#f6c9a8", cabelo: "#3a2a5a", roupa: "#3d7be0" }
    },
    ela: {
      nome: "Mari",
      foto: "",                               // ex: "midia/mari.jpg"
      pixel: { pele: "#f6c9a8", cabelo: "#7b1e3a", roupa: "#2bbfb3", laco: "#ff8fb1" }
    }
  },

  /* ---------- Carta de abertura ---------- */
  intro: {
    para: "Mari",
    dica: "toque na carta pra abrir",
    selo: "♥"
  },

  /* ---------- Menu de cima ----------
     (itens de partes ainda não prontas aparecem com cadeadinho) */
  menu: [
    { id: "inicio",  rotulo: "início",  icone: "🏠" },
    { id: "poemas",  rotulo: "poemas",  icone: "💌" },
    { id: "galeria", rotulo: "galeria", icone: "📷" },
    { id: "gostos",  rotulo: "gostos",  icone: "🎮" },
    { id: "musicas", rotulo: "músicas", icone: "🎵" },
    { id: "cartinha",rotulo: "segredo", icone: "🔐" }
  ],

  /* ---------- Botões grandes da tela inicial ---------- */
  atalhos: [
    { id: "poemas",  rotulo: "poemas pra você", icone: "💌", cor: "rosa"   },
    { id: "galeria", rotulo: "nossas fotos",    icone: "📷", cor: "azul"   },
    { id: "gostos",  rotulo: "seus gostos",     icone: "🎮", cor: "turq"   },
    { id: "musicas", rotulo: "playlist",        icone: "🎵", cor: "vinho"  },
    { id: "sobre",   rotulo: "nossa história",  icone: "📖", cor: "azul"   }
  ],

  /* ---------- Mensagem do dia (muda sozinha a cada dia) ---------- */
  mensagensDoDia: [
    "Hoje eu só queria te lembrar que você é a minha pessoa favorita.",
    "Se a vida fosse um jogo, eu escolheria você como parceira em todas as fases.",
    "Você é meu save point: onde eu me sinto em casa.",
    "Obrigado por tornar até os dias ruins mais leves.",
    "Eu gosto de tudo que a gente faz junto, até do silêncio.",
    "Você é a melhor coisa que aconteceu na minha história.",
    "Respira fundo: você é incrível e eu tô aqui por você.",
    "Seu sorriso é a minha trilha sonora favorita."
  ],

  /* ---------- Coisas que ela gosta ---------- */
  gostos: {
    ela: [
      { icone: "🍄", nome: "The Last of Us" },
      { icone: "🧟", nome: "Resident Evil" },
      { icone: "🦄", nome: "My Little Pony" },
      { icone: "🍥", nome: "Animes" },
      { icone: "🦸", nome: "Marvel" },
      { icone: "🦇", nome: "DC" },
      { icone: "🔫", nome: "COD" },
      { icone: "🎿", nome: "South Park" },
      { icone: "⚗️", nome: "Arcane" },
      { icone: "🐻", nome: "FNAF" },
      { icone: "🎧", nome: "Músicas" }
    ],
    musicos: ["Melanie Martinez", "Alex G", "Beabadoobee"]
  },

  /* ---------- Sobre nós ---------- */
  sobre: {
    resumo: "A gente se achou no meio de jogos, séries e músicas. Desde então, cada dia vira um capítulo novo.",
    historia: [
      "Tudo começou de um jeito simples, com uma conversa que não queria acabar. Eu não sabia, mas ali já estava começando a minha parte favorita do dia.",
      "Desde então, a gente já riu até doer, assistiu coisa demais, jogou até de madrugada e descobriu que o melhor lugar do mundo é do lado um do outro.",
      "(Troque este texto pela história de vocês de verdade ♡)"
    ]
  },

  /* ---------- Barra "tocando agora" ---------- */
  player: {
    tocando: "Melanie Martinez — Cry Baby"
  }
};
