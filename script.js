// 1. Base inicial
const jogadorasIniciais = [
  { nome: "Andressa Alves", posicao: "Meio-campo", clube: "Corinthians", foto: "img/AndressaAlves.jpg", gols: 15, assistencias: 10, jogos: 28, favorita: false },
  { nome: "Dayana Rodríguez", posicao: "Meio-campo", clube: "Corinthians", foto: "img/DayanaRodríguez.jpg", gols: 5, assistencias: 12, jogos: 30, favorita: false },
  { nome: "Mariza", posicao: "Zagueira", clube: "Corinthians", foto: "img/Mariza.jpg", gols: 2, assistencias: 1, jogos: 32, favorita: false },
  { nome: "Thaís Regina", posicao: "Zagueira", clube: "Corinthians", foto: "img/ThaisRegina.jpg", gols: 1, assistencias: 2, jogos: 25, favorita: false },
  { nome: "Letícia Teles", posicao: "Zagueira", clube: "Corinthians", foto: "img/LeticiaTeles.jpg", gols: 0, assistencias: 0, jogos: 18, favorita: false }
];



// 2. Inicializa LocalStorage
function inicializarBanco() {
  if (!localStorage.getItem("jogadoras")) {
    localStorage.setItem("jogadoras", JSON.stringify(jogadorasIniciais));
  }
}
inicializarBanco();

// 3. Pega jogadoras do LocalStorage
function getJogadoras() {
  return JSON.parse(localStorage.getItem("jogadoras")) || [];
}

// 4. Controle de edição
let editandoIndex = null;

// 5. Carrega jogadora no formulário
function carregarJogadoraNoFormulario(index) {
  const jogadora = getJogadoras()[index];
  document.getElementById("nome").value = jogadora.nome;
  document.getElementById("posicao").value = jogadora.posicao;
  document.getElementById("clube").value = jogadora.clube;
  document.getElementById("gols").value = jogadora.gols;
  document.getElementById("assistencias").value = jogadora.assistencias;
  document.getElementById("jogos").value = jogadora.jogos;
  document.getElementById("foto").value = jogadora.foto;
  document.getElementById("fotoClube").value = jogadora.fotoClube; 
  editandoIndex = index;
}

// 6. Alterna favorita
function toggleFavorita(index) {
  const jogadoras = getJogadoras();
  jogadoras[index].favorita = !jogadoras[index].favorita;
  localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
  renderizarJogadoras();
}

// 7. Remove jogadora
function excluirJogadora(index) {
  if (confirm("Tem certeza que deseja remover esta jogadora?")) {
    const jogadoras = getJogadoras();
    jogadoras.splice(index, 1);
    localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
    renderizarJogadoras();
    alert("Jogadora removida com sucesso!");
  }
}

// 8. Renderiza jogadoras
function renderizarJogadoras() {
  const container = document.getElementById("player-list");
  const jogadoras = getJogadoras();
  container.innerHTML = "";

  jogadoras.forEach((jogadora, index) => {
    // CORRIGIDO: A classe do card agora é card para usar o estilo CSS correto
    const card = document.createElement("div");
    card.className = "card";
    const favoriteIcon = jogadora.favorita ? '★' : '☆'; // Usando caracteres Unicode

    card.innerHTML = `
      <img src="${jogadora.foto}" alt="${jogadora.nome}">
      <h2>${jogadora.nome}</h2>
      <p><strong>Posição:</strong> ${jogadora.posicao}</p>
      <p><strong>Clube:</strong> ${jogadora.clube}</p>
      <p><strong>Gols:</strong> ${jogadora.gols}</p>
      <p><strong>Assistências:</strong> ${jogadora.assistencias}</p>
      <p><strong>Jogos:</strong> ${jogadora.jogos}</p>
      <button class="favoritar-btn ${jogadora.favorita ? 'favorita' : ''}" data-index="${index}">${favoriteIcon}</button>
      <button class="editar-btn" data-index="${index}">Editar</button>
      <button class="excluir-btn" data-index="${index}">Remover</button>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll(".favoritar-btn").forEach(button => {
    button.addEventListener("click", () => toggleFavorita(button.dataset.index));
  });

  document.querySelectorAll(".editar-btn").forEach(button => {
    button.addEventListener("click", () => carregarJogadoraNoFormulario(button.dataset.index));
  });

  document.querySelectorAll(".excluir-btn").forEach(button => {
    button.addEventListener("click", () => excluirJogadora(button.dataset.index));
  });
}

// 9. Formulário: adicionar ou editar jogadora
const form = document.getElementById("player-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const novaJogadora = {
    nome: document.getElementById("nome").value,
    posicao: document.getElementById("posicao").value,
    clube: document.getElementById("clube").value,
    gols: parseInt(document.getElementById("gols").value),
    assistencias: parseInt(document.getElementById("assistencias").value),
    jogos: parseInt(document.getElementById("jogos").value),
    foto: document.getElementById("foto").value,
    fotoClube: document.getElementById("fotoClube").value,
    favorita: false
  };

  const jogadoras = getJogadoras();

  if (editandoIndex !== null) {
    jogadoras[editandoIndex] = {
      ...jogadoras[editandoIndex],
      ...novaJogadora
    };
    alert("Jogadora editada com sucesso!");
    editandoIndex = null;
    document.getElementById("submit-button").textContent = "Adicionar Jogadora";
  } else {
    novaJogadora.id = Date.now().toString();
    jogadoras.push(novaJogadora);
    alert("Jogadora adicionada com sucesso!");
  }

  localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
  renderizarJogadoras();
  form.reset();
});

// 10. Inicializa tela
renderizarJogadoras();

function resetarBanco() {
  localStorage.setItem("jogadoras", JSON.stringify(jogadorasIniciais));
  renderizarJogadoras();
  alert("Base de jogadoras restaurada ao estado inicial!");
}

document.getElementById("reset-btn").addEventListener("click", resetarBanco);Z