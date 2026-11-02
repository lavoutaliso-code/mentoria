/* ══════════════════════════════════════════════════════════════════════════
   O QUE AS EX-MENTORADAS FALARAM AO VIVO NO CHAT

   ⚠️ NADA AQUI FOI ESCRITO POR MIM. Cada frase saiu do chat do Google Meet na
   gravação da aula de 02/11/2026, lida quadro a quadro em recorte de alta
   resolução. O print de cada uma está em
   `~/Desktop/carrossel-feedbacks-live/provas/`, e as 159 mensagens inteiras
   em `provas/chat-completo-159-mensagens.json`.

   ⚠️ A CAMILA CANASSA FICA. Eu a tinha tirado porque a FRASE dela é sobre a
   Lei dos Potes, não sobre a mentoria. Ela confirmou em 02/11: *«pode deixar a
   camila sim, é ex mentorada»* — o título fala de QUEM escreveu, não de qual
   produto a frase cita, então está correto.

   ⚠️ `texto` é o que vai na tela: só ortografia e pontuação. Nenhuma palavra
   trocada, tirada ou acrescentada — exceto onde a nota avisa, e aí o original
   está escrito do lado.
   ══════════════════════════════════════════════════════════════════════════ */
const DEPOIMENTOS_LIVE = [
  {
    nome: 'Larissa Cristina', hora: '12:09', cor: '#FF9F0A',
    fala: 'Comprei sua mentoria e desde então tenho tido ótimos resultados.',
    fala2: 'Tenho equipe depois q vi você.',
  },
  {
    nome: 'Júnia Rocha', hora: '12:33', cor: '#30D158',
    fala: 'Meu negócio transformou muito depois das aulas dela — e está '
        + 'transformando. É um tapa na cara em todas as áreas da empresa.',
    /* original: «Gente eu tenho a mentoria gravada dela . Meu negócio
       transformou muito depois das aulas dela e está transformando. É muito
       complexo e um tapa na cara em todas áreas da empresa» */
  },
  {
    nome: 'Jessica Lopes', hora: '12:45', cor: '#0A84FF',
    fala: 'Eu saí do operacional, e tô focada em abrir a segunda unidade em '
        + 'outra cidade após todas as mentorias da Isa. Fiz todas desde a primeira.',
    /* original tinha «agir a segunda unidade» — erro de digitação */
  },
  {
    nome: 'Mary Dias', hora: '12:43', cor: '#BF5AF2',
    fala: 'Eu fiz uma mentoria com vc e aprendi muita coisa.',
    /* a frase continua falando da dificuldade de montar equipe na cidade
       dela — contexto, não elogio nem crítica */
  },
  {
    nome: 'Camila Canassa Silva', hora: '12:45', cor: '#FF375F',
    fala: 'A Lei dos Potes ajudou muito o meu salão. Amoooo',
    /* original com caixa baixa: «A lei dos potes ajudou muito o meu salão.
       Amoooo» — «Lei dos Potes» é nome de produto, vai maiúsculo */
  },
];
