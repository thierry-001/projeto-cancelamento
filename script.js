// Quiz perguntas (com casos reais)
const perguntas = [
  {
    pergunta: "O cantor Tilo Santos foi acusado de falas preconceituosas. As pessoas fizeram mutirão para derrubar suas redes sociais. Isso é crítica ou cancelamento?",
    opcoes: ["Crítica", "Cancelamento"],
    resposta: "Cancelamento"
  },
  {
    pergunta: "Um influenciador fala algo errado sem intenção, e seguidores explicam com respeito. Isso é crítica ou cancelamento?",
    opcoes: ["Crítica", "Cancelamento"],
    resposta: "Crítica"
  },
  {
    pergunta: "Um homem maltrata um cavalo e corta suas patas, gerando revolta geral e denúncias. As pessoas pedem prisão imediata. Isso é crítica ou cancelamento?",
    opcoes: ["Crítica", "Cancelamento"],
    resposta: "Crítica"
  }
];

let indice = 0;
let pontos = 0;

function iniciarQuiz() {
  indice = 0;
  pontos = 0;
  document.getElementById("resultado-quiz").textContent = "";
  mostrarPergunta();
}

function mostrarPergunta() {
  if (indice < perguntas.length) {
    const q = perguntas[indice];
    const quizDiv = document.getElementById("quiz-container");
    quizDiv.innerHTML = `
      <p><strong>${q.pergunta}</strong></p>
      ${q.opcoes.map(opcao => 
        `<button onclick="responder('${opcao}')">${opcao}</button>`
      ).join("")}
    `;
  } else {
    document.getElementById("quiz-container").innerHTML = "";
    document.getElementById("resultado-quiz").textContent =
      `Você acertou ${pontos} de ${perguntas.length} questões.`;
  }
}

function responder(opcao) {
  const q = perguntas[indice];
  if (opcao === q.resposta) pontos++;
  indice++;
  mostrarPergunta();
  contarVisitante(); // Adiciona visitante ao clicar na opção
}

// Enquete
let votosSim = 0;
let votosNao = 0;

function votar(opcao) {
  if (opcao === 'sim') votosSim++;
  else votosNao++;
  document.getElementById('resultado-enquete').textContent =
    `Cancelar: ${votosSim} | Dialogar: ${votosNao}`;
  contarVisitante(); // Adiciona visitante ao votar na enquete
}

// Mural de mensagens (salvo no localStorage)
function postarMensagem() {
  const input = document.getElementById('mensagem');
  const texto = input.value.trim();
  if (texto !== "") {
    salvarMensagem(texto);
    exibirMensagens();
    input.value = "";
    contarVisitante(); // Adiciona visitante ao postar mensagem
  }
}

function salvarMensagem(msg) {
  let mensagens = JSON.parse(localStorage.getItem("mural")) || [];
  mensagens.push(msg);
  localStorage.setItem("mural", JSON.stringify(mensagens));
}

function exibirMensagens() {
  const lista = document.getElementById('lista-mensagens');
  lista.innerHTML = "";
  let mensagens = JSON.parse(localStorage.getItem("mural")) || [];
  mensagens.forEach(msg => {
    const li = document.createElement('li');
    li.textContent = msg;
    li.classList.add("nova-msg"); // adiciona estilo chamativo
    lista.appendChild(li);
    // Remove a classe de destaque depois de 1.5s
    setTimeout(() => li.classList.remove("nova-msg"), 1500);
  });

  // Rolagem automática pro final
  lista.scrollTop = lista.scrollHeight;
}

// Função para limpar mural
function limparMural() {
  localStorage.removeItem("mural"); // limpa do localStorage
  exibirMensagens(); // atualiza a exibição
}

// Contador de visitantes
function contarVisitante() {
  let contador = parseInt(localStorage.getItem("visitantes")) || 0;
  contador++;
  localStorage.setItem("visitantes", contador);
  document.getElementById("num-visitantes").textContent = contador; // atualizar no span
}

// Música de fundo
function configurarMusica() {
  const musica = document.getElementById("musica-fundo");
  if (musica) {
    musica.volume = 0.5; // volume mais baixo (0.0 a 1.0)
  }
}

// Função para tocar/pausar música ao clicar no player
function tocarMusica() {
  const musica = document.getElementById("musica-fundo");
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
}

// Carregar mural, contador e configurar player ao abrir
window.onload = () => {
  exibirMensagens();
  const contadorDisplay = document.getElementById("num-visitantes");
  if (contadorDisplay) {
    contadorDisplay.textContent = localStorage.getItem("visitantes") || 0;
  }
};
