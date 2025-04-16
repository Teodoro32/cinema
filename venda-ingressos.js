// Função para carregar as sessões no select
function carregarSessoes() {
  const sessaoSelect = document.getElementById("sessao");
  // Recuperar as sessões do localStorage (supondo que elas já estejam lá)
  const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
  
  // Preencher o select com as sessões
  sessoes.forEach(sessao => {
    const option = document.createElement("option");
    option.value = `${sessao.filme}-${sessao.horario}`;
    option.textContent = `${sessao.filme} - ${sessao.horario}`;
    sessaoSelect.appendChild(option);
  });
}

// Carregar as sessões quando a página for carregada
window.onload = function() {
  carregarSessoes();
};

// Manipulação do formulário de venda
document.getElementById("form-venda").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const nome = document.getElementById("nome").value;
  const sessao = document.getElementById("sessao").value;
  const assento = document.getElementById("assento").value;
  
  if (!nome || !sessao || !assento) {
    alert("Preencha todos os campos.");
    return;
  }

  const sessaoSelecionada = sessao.split("-");
  const filme = sessaoSelecionada[0];
  const horario = sessaoSelecionada[1];
  
  const ingresso = {
    nome: nome,
    filme: filme,
    horario: horario,
    assento: assento
  };

  // Adicionar o ingresso à tabela
  const tbody = document.querySelector("tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${ingresso.nome}</td>
    <td>${ingresso.filme}</td>
    <td>${new Date().toLocaleDateString()}</td>
    <td>${ingresso.horario}</td>
    <td>${ingresso.assento}</td>
  `;
  tbody.appendChild(row);
  
  // Limpar o formulário
  document.getElementById("form-venda").reset();
});
