document.addEventListener("DOMContentLoaded", function () {
  // Seleciona os containers onde os dados serão exibidos
  const listaFilmesContainer = document.getElementById("listaFilmes");
  const listaSessoesContainer = document.getElementById("listaSessoes");

  // Recupera os dados salvos no localStorage ou utiliza arrays vazios
  const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
  const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

  // Debug: Mostra no console os dados carregados
  console.log("Filmes carregados:", filmes);
  console.log("Sessões carregadas:", sessoes);

  // Função para exibir os filmes em cards
  function carregarFilmes() {
    listaFilmesContainer.innerHTML = "";
    if (filmes.length === 0) {
      listaFilmesContainer.innerHTML = '<p class="text-center">Nenhum filme cadastrado.</p>';
    } else {
      filmes.forEach(function (filme) {
        const col = document.createElement("div");
        col.className = "col-md-4";
        // Se o filme não tiver imagem, usa um placeholder (altere o caminho se necessário)
        const imgSrc = filme.imagem && filme.imagem.trim() !== "" ? filme.imagem : "./imagens/placeholder.png";
        col.innerHTML = `
          <div class="card h-100">
            <img src="${imgSrc}" class="card-img-top" alt="${filme.titulo}">
            <div class="card-body">
              <h5 class="card-title">${filme.titulo}</h5>
              <p class="card-text">${filme.descricao}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Estreia: ${filme.dataEstreia}</small>
            </div>
          </div>
        `;
        listaFilmesContainer.appendChild(col);
      });
    }
  }

  // Função para exibir as sessões como itens de lista
  function carregarSessoes() {
    listaSessoesContainer.innerHTML = "";
    if (sessoes.length === 0) {
      listaSessoesContainer.innerHTML = '<p class="text-center">Nenhuma sessão disponível.</p>';
    } else {
      sessoes.forEach(function (sessao) {
        const item = document.createElement("a");
        item.className = "list-group-item list-group-item-action flex-column align-items-start";
        item.innerHTML = `
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${sessao.filme}</h5>
            <small>${sessao.dataHora}</small>
          </div>
          <p class="mb-1">Sala: ${sessao.sala} | Preço: ${sessao.preco}</p>
          <small>Idioma: ${sessao.idioma} | Formato: ${sessao.formato}</small>
        `;
        listaSessoesContainer.appendChild(item);
      });
    }
  }

  // Chama as funções para carregar os dados na Home
  carregarFilmes();
  carregarSessoes();
});
