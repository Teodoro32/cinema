document.addEventListener("DOMContentLoaded", function() {
  // Recupera as sessões do localStorage ou inicializa um array vazio.
  let sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
  let editIndex = -1; // -1 indica modo de adição (não edição).

  // Recupera os registros de filmes e salas do localStorage.
  // Esses dados serão usados para popular os selects.
  const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
  const salas = JSON.parse(localStorage.getItem("salas")) || [];

  // Função para popular o select de filmes.
  function popularSelectFilme() {
    const selectFilme = document.getElementById("filme");
    selectFilme.innerHTML = '<option value="">Selecione um filme</option>';
    filmes.forEach((filme, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = filme.titulo || "Filme sem título";
      selectFilme.appendChild(option);
    });
  }

  // Função para popular o select de salas.
  function popularSelectSala() {
    const selectSala = document.getElementById("sala");
    selectSala.innerHTML = '<option value="">Selecione uma sala</option>';
    salas.forEach((sala, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = sala.nome || "Sala sem nome";
      selectSala.appendChild(option);
    });
  }

  popularSelectFilme();
  popularSelectSala();

  // Função para atualizar a tabela de sessões.
  function atualizarTabela() {
    const tabelaBody = document.querySelector("#tabelaSessoes tbody");
    tabelaBody.innerHTML = "";
    sessoes.forEach((sessao, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${sessao.filme}</td>
        <td>${sessao.sala}</td>
        <td>${sessao.dataHora}</td>
        <td>${sessao.preco}</td>
        <td>${sessao.idioma}</td>
        <td>${sessao.formato}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarSessao(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="excluirSessao(${index})">Excluir</button>
        </td>
      `;
      tabelaBody.appendChild(tr);
    });
  }

  // Função para salvar (ou atualizar) uma sessão.
  function salvarSessao(sessao) {
    if (editIndex === -1) {
      sessoes.push(sessao);
    } else {
      sessoes[editIndex] = sessao;
      editIndex = -1;
      document.getElementById("btnSalvarSessao").textContent = "Salvar Sessão";
      document.getElementById("btnCancelarEditSessao").style.display = "none";
    }
    localStorage.setItem("sessoes", JSON.stringify(sessoes));
    atualizarTabela();
  }

  // Evento de envio do formulário.
  document.getElementById("formSessao").addEventListener("submit", function(e) {
    e.preventDefault();
    const filmeIndex = document.getElementById("filme").value;
    const salaIndex = document.getElementById("sala").value;
    const dataHora = document.getElementById("dataHora").value;
    const preco = document.getElementById("preco").value;
    const idioma = document.getElementById("idioma").value;
    const formato = document.getElementById("formato").value;

    // Obtemos os títulos/nomes dos registros de filmes e salas para armazenar na sessão.
    const filmeValor = filmes[filmeIndex] ? filmes[filmeIndex].titulo : "Indefinido";
    const salaValor = salas[salaIndex] ? salas[salaIndex].nome : "Indefinido";

    const sessaoObj = {
      filme: filmeValor,
      sala: salaValor,
      dataHora: dataHora,
      preco: preco,
      idioma: idioma,
      formato: formato
    };

    salvarSessao(sessaoObj);
    this.reset();
  });

  // Vincula o clique do botão "Atualizar Tabela"
  document.getElementById("btnAtualizarTabelaSessao").addEventListener("click", function() {
    atualizarTabela();
  });

  // Função para editar uma sessão.
  window.editarSessao = function(index) {
    const sessao = sessoes[index];
    // Busca os índices correspondentes para os selects.
    const filmeIndex = filmes.findIndex(f => f.titulo === sessao.filme);
    const salaIndex = salas.findIndex(s => s.nome === sessao.sala);
    document.getElementById("filme").value = filmeIndex >= 0 ? filmeIndex : "";
    document.getElementById("sala").value = salaIndex >= 0 ? salaIndex : "";
    document.getElementById("dataHora").value = sessao.dataHora;
    document.getElementById("preco").value = sessao.preco;
    document.getElementById("idioma").value = sessao.idioma;
    document.getElementById("formato").value = sessao.formato;
    editIndex = index;
    document.getElementById("btnSalvarSessao").textContent = "Atualizar Sessão";
    document.getElementById("btnCancelarEditSessao").style.display = "inline-block";
  };

  // Função para excluir uma sessão.
  window.excluirSessao = function(index) {
    if (confirm("Deseja realmente excluir esta sessão?")) {
      sessoes.splice(index, 1);
      localStorage.setItem("sessoes", JSON.stringify(sessoes));
      atualizarTabela();
    }
  };

  // Evento para cancelar a edição.
  document.getElementById("btnCancelarEditSessao").addEventListener("click", function() {
    editIndex = -1;
    document.getElementById("formSessao").reset();
    document.getElementById("btnSalvarSessao").textContent = "Salvar Sessão";
    this.style.display = "none";
  });

  atualizarTabela();
});
