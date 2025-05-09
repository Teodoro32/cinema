// Obtém os filmes salvos do localStorage ou inicializa com um array vazio.
let filmes = JSON.parse(localStorage.getItem("filmes")) || [];
let editIndex = -1; // -1 indica que não estamos editando nenhum registro.
let imagemBase64 = "";

// Função para atualizar a tabela de filmes.
function atualizarTabela() {
  const tabelaBody = document.querySelector("#tabelaFilmes tbody");
  tabelaBody.innerHTML = "";
  filmes.forEach((filme, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${filme.titulo}</td>
      <td>${filme.descricao}</td>
      <td>${filme.genero}</td>
      <td>${filme.classificacao}</td>
      <td>${filme.duracao}</td>
      <td>${filme.dataEstreia}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editarFilme(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="excluirFilme(${index})">Excluir</button>
      </td>
    `;
    tabelaBody.appendChild(tr);
  });
}

// Função para salvar (ou atualizar) um filme.
function salvarFilme(filme) {
  if (editIndex === -1) {
    filmes.push(filme);
  } else {
    filmes[editIndex] = filme;
    editIndex = -1;
    document.getElementById("btnSalvar").textContent = "Salvar Filme";
    document.getElementById("btnCancelarEdit").style.display = "none";
  }
  localStorage.setItem("filmes", JSON.stringify(filmes));
  atualizarTabela();
}

// Evento de envio do formulário.
document.getElementById("formFilme").addEventListener("submit", function (e) {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const genero = document.getElementById("genero").value;
  const classificacao = document.getElementById("classificacao").value;
  const duracao = document.getElementById("duracao").value;
  const dataEstreia = document.getElementById("dataEstreia").value;
  
  const filmeObj = {
    titulo,
    descricao,
    genero,
    classificacao,
    duracao,
    dataEstreia,
    imagem: imagemBase64
  };
  salvarFilme(filmeObj);
  this.reset();
  document.getElementById("preview").style.display = "none";
  imagemBase64 = "";
});

// Função para editar um filme.
function editarFilme(index) {
  const filme = filmes[index];
  document.getElementById("titulo").value = filme.titulo;
  document.getElementById("descricao").value = filme.descricao;
  document.getElementById("genero").value = filme.genero;
  document.getElementById("classificacao").value = filme.classificacao;
  document.getElementById("duracao").value = filme.duracao;
  document.getElementById("dataEstreia").value = filme.dataEstreia;
  if (filme.imagem) {
    document.getElementById("preview").src = filme.imagem;
    document.getElementById("preview").style.display = "block";
    imagemBase64 = filme.imagem;
  } else {
    document.getElementById("preview").style.display = "none";
    imagemBase64 = "";
  }
  editIndex = index;
  document.getElementById("btnSalvar").textContent = "Atualizar Filme";
  document.getElementById("btnCancelarEdit").style.display = "inline-block";
}

// Função para excluir um filme.
function excluirFilme(index) {
  if (confirm("Deseja realmente excluir este filme?")) {
    filmes.splice(index, 1);
    localStorage.setItem("filmes", JSON.stringify(filmes));
    atualizarTabela();
  }
}

// Evento para cancelar a edição.
document.getElementById("btnCancelarEdit").addEventListener("click", function(){
  editIndex = -1;
  document.getElementById("formFilme").reset();
  document.getElementById("preview").style.display = "none";
  imagemBase64 = "";
  document.getElementById("btnSalvar").textContent = "Salvar Filme";
  this.style.display = "none";
});

// Processa o upload da imagem e exibe a pré-visualização.
document.getElementById("imagem").addEventListener("change", function (e) {
  const arquivo = e.target.files[0];
  if (arquivo) {
    const reader = new FileReader();
    reader.onload = function (evt) {
      imagemBase64 = evt.target.result;
      document.getElementById("preview").src = imagemBase64;
      document.getElementById("preview").style.display = "block";
    };
    reader.readAsDataURL(arquivo);
  }
});

// Atualiza a tabela ao carregar a página.
atualizarTabela();