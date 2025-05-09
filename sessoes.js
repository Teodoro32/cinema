// Aguarda até que o DOM esteja totalmente carregado
document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o elemento <tbody> da tabela onde as sessões serão exibidas
    const tbody = document.querySelector("table tbody");
  
    // Recupera o array de sessões armazenado no localStorage (ou um array vazio se não existir)
    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
  
    // Verifica se há sessões cadastradas
    if (sessoes.length === 0) {
      // Se não houver sessões, exibe uma linha informando que não há registros
      tbody.innerHTML = `<tr>
        <td colspan="5" class="text-center">Nenhuma sessão cadastrada</td>
      </tr>`;
    } else {
      // Limpa o conteúdo atual do <tbody>
      tbody.innerHTML = "";
      // Itera sobre o array de sessões para criar uma linha para cada sessão
      sessoes.forEach(function(sessao, index) {
        // Cria uma linha da tabela com as informações de cada sessão
        // A coluna "Ação" inclui um botão que redireciona para a página de venda de ingressos
        // Aqui usamos um parâmetro de query na URL para identificar a sessão selecionada (index)
        tbody.innerHTML += `
          <tr>
            <td>${sessao.filme}</td>
            <td>${sessao.sala}</td>
            <td>${sessao.dataHora}</td>
            <td>${sessao.preco}</td>
            <td>
              <a href="./venda-ingressos.html?sessao=${index}" class="btn btn-primary btn-sm">Comprar Ingresso</a>
            </td>
          </tr>
        `;
      });
    }
  });
  