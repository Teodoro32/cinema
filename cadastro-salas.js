// Recupera o array de salas do localStorage (ou inicializa com um array vazio)
let salas = JSON.parse(localStorage.getItem('salas')) || [];
let editIndex = -1; // Índice do registro que está sendo editado (-1 indica que não está em modo de edição)

// Função para atualizar a tabela com os registros atuais
function atualizarTabelaSalas() {
  const tabelaBody = document.querySelector("#tabelaSalas tbody");
  tabelaBody.innerHTML = ""; // Limpa a tabela
  salas.forEach((sala, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sala.nome}</td>
      <td>${sala.capacidade}</td>
      <td>${sala.tipo}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editarSala(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="excluirSala(${index})">Excluir</button>
      </td>
    `;
    tabelaBody.appendChild(tr);
  });
}

// Função para salvar (ou atualizar) um registro de sala
function salvarSala(sala) {
  if (editIndex === -1) {
    // Se não estiver em edição, adiciona o novo registro
    salas.push(sala);
  } else {
    // Se estiver editando, atualiza o registro existente
    salas[editIndex] = sala;
    editIndex = -1;
    // Restaura o texto e oculta o botão de cancelamento da edição
    document.getElementById("btnSalvar").textContent = "Salvar Sala";
    document.getElementById("btnCancelarEdit").style.display = "none";
  }
  localStorage.setItem('salas', JSON.stringify(salas));
  atualizarTabelaSalas();
}

// Evento de submissão do formulário
document.getElementById('formSala').addEventListener('submit', function(e) {
  e.preventDefault();
  // Coleta os valores dos campos
  const nome = document.getElementById("nomeSala").value;
  const capacidade = document.getElementById("capacidade").value;
  const tipo = document.getElementById("tipo").value;
  
  // Cria um objeto para a sala
  const sala = { nome, capacidade, tipo };
  
  salvarSala(sala);
  // Limpa o formulário
  this.reset();
});

// Função para editar um registro: preenche o formulário com os dados selecionados
function editarSala(index) {
  const sala = salas[index];
  document.getElementById("nomeSala").value = sala.nome;
  document.getElementById("capacidade").value = sala.capacidade;
  document.getElementById("tipo").value = sala.tipo;
  editIndex = index;
  // Altera o texto do botão para indicar atualização e exibe o botão de cancelar
  document.getElementById("btnSalvar").textContent = "Atualizar Sala";
  document.getElementById("btnCancelarEdit").style.display = "inline-block";
}

// Função para excluir um registro
function excluirSala(index) {
  if (confirm("Deseja realmente excluir esta sala?")) {
    salas.splice(index, 1);
    localStorage.setItem('salas', JSON.stringify(salas));
    atualizarTabelaSalas();
  }
}

// Evento para cancelar a edição
document.getElementById("btnCancelarEdit").addEventListener("click", function(){
  editIndex = -1;
  document.getElementById("formSala").reset();
  document.getElementById("btnSalvar").textContent = "Salvar Sala";
  this.style.display = "none";
});

// Atualiza a tabela ao carregar a página
atualizarTabelaSalas();
