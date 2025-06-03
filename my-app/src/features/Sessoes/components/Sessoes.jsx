import React from "react";
import Menu from "../../../components/Menu/Menu";

function Sessoes() {
  return (
    <div className="bg-dark text-light min-vh-100">
        <Menu/>
      {/* Conteúdo Principal */}
      <div className="container mt-5 pt-5">
        <h1 className="mb-4">Cadastro de Sessões</h1>

        {/* Formulário */}
        <form id="formSessao">
          <div className="mb-3">
            <label htmlFor="filme" className="form-label">
              Filme
            </label>
            <select id="filme" className="form-select" required>
              <option value="">Selecione um filme</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="sala" className="form-label">
              Sala
            </label>
            <select id="sala" className="form-select" required>
              <option value="">Selecione uma sala</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="dataHora" className="form-label">
              Data e Hora
            </label>
            <input
              type="datetime-local"
              id="dataHora"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="preco" className="form-label">
              Preço
            </label>
            <input
              type="number"
              id="preco"
              className="form-control"
              required
              placeholder="Digite o preço"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="idioma" className="form-label">
              Idioma
            </label>
            <select id="idioma" className="form-select" required>
              <option value="">Selecione</option>
              <option value="Dublado">Dublado</option>
              <option value="Legendado">Legendado</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="formato" className="form-label">
              Formato
            </label>
            <select id="formato" className="form-select" required>
              <option value="">Selecione</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
            </select>
          </div>

          <button type="submit" className="btn btn-danger" id="btnSalvarSessao">
            Salvar Sessão
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            id="btnCancelarEditSessao"
            style={{ display: "none" }}
          >
            Cancelar Edição
          </button>
        </form>

        {/* Botão atualizar */}
        <button
          type="button"
          className="btn btn-info mt-4"
          id="btnAtualizarTabelaSessao"
        >
          Atualizar Tabela
        </button>

        {/* Tabela */}
        <h2 className="mt-5">Sessões Cadastradas</h2>
        <div className="table-responsive">
          <table className="table table-striped" id="tabelaSessoes">
            <thead>
              <tr>
                <th>Filme</th>
                <th>Sala</th>
                <th>Data e Hora</th>
                <th>Preço</th>
                <th>Idioma</th>
                <th>Formato</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* As linhas serão preenchidas futuramente com dados */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Sessoes;
