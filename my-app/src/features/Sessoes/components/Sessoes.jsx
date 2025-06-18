import React, { useState, useEffect } from "react";
import Menu from "../../../components/Menu/Menu";
import {
  listarSessoes,
  cadastrarSessao,
  atualizarSessao,
  deletarSessao,
} from "../services/sessoesService";
import { getFilmes } from "../../Filme/services/filmeService";
import { listarSalas } from "../../Salas/services/salaService";
import styles from "./sessoes.module.css";

function Sessoes() {
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const mostrarMensagem = (texto, tipo) => {
    setMensagem(texto);
    setTipoMensagem(tipo);
    setTimeout(() => {
      setMensagem("");
      setTipoMensagem("");
    }, 3000);
  };

  const [sessoes, setSessoes] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [salas, setSalas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    filmeId: "",
    salaId: "",
    dataHora: "",
    preco: "",
    idioma: "",
    formato: "",
  });

  // Carrega sessões, filmes e salas
  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const [sessoes, filmes, salas] = await Promise.all([
      listarSessoes(),
      getFilmes(),
      listarSalas(),
    ]);
    setSessoes(sessoes);
    setFilmes(filmes);
    setSalas(salas);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault(); // 👈 Impede o recarregamento da página

    console.log("Dados do formulário:", form);
    if (
      !form.filmeId ||
      !form.salaId ||
      !form.dataHora ||
      !form.preco ||
      !form.idioma ||
      !form.formato
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const sessao = {
      ...form,
      filmeId: parseInt(form.filmeId),
      salaId: parseInt(form.salaId),
      preco: parseFloat(form.preco),
    };

    if (editandoId) {
      await atualizarSessao(editandoId, sessao);
      mostrarMensagem("Sessão atualizada com sucesso!", "sucesso");
    } else {
      await cadastrarSessao(sessao);
      mostrarMensagem("Sessão criada com sucesso!", "sucesso");
    }

    await carregarDados();
    limparFormulario();
  }

  function handleEditar(sessao) {
    setForm({
      filmeId: sessao.filmeId,
      salaId: sessao.salaId,
      dataHora: sessao.dataHora.slice(0, 16),
      preco: sessao.preco,
      idioma: sessao.idioma,
      formato: sessao.formato,
    });
    setEditandoId(sessao.id);
    document.getElementById("btnCancelarEditSessao").style.display =
      "inline-block";
  }

  function limparFormulario() {
    setForm({
      filmeId: "",
      salaId: "",
      dataHora: "",
      preco: "",
      idioma: "",
      formato: "",
    });
    setEditandoId(null);
    document.getElementById("btnCancelarEditSessao").style.display = "none";
  }

  async function handleExcluir(id) {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        await deletarSessao(id);
        mostrarMensagem("Sessão excluída com sucesso!", "sucesso");
        await carregarDados();
      } catch (erro) {
        console.error("Erro ao excluir sessão:", erro);
        mostrarMensagem("Erro ao excluir sessão", "erro");
      }
    }
  }

  return (
    <div className="bg-dark text-light min-vh-100">
      <Menu />
      {/* Conteúdo Principal */}
      <div className="container mt-5 pt-5">
        <h1 className="mb-4">Cadastro de Sessões</h1>

        {mensagem && (
          <div
            className={`${styles.mensagem} ${
              tipoMensagem === "sucesso" ? styles.sucesso : styles.erro
            }`}
          >
            {mensagem}
          </div>
        )}

        {/* Formulário */}
        <form id="formSessao" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="filme" className="form-label">
              Filme
            </label>
            <select
              id="filme"
              name="filmeId"
              className="form-select"
              required
              value={form.filmeId}
              onChange={handleChange}
            >
              <option value="">Selecione um filme</option>
              {filmes.map((filme) => (
                <option key={filme.id} value={filme.id}>
                  {filme.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="sala" className="form-label">
              Sala
            </label>
            <select
              id="sala"
              name="salaId"
              className="form-select"
              required
              value={form.salaId}
              onChange={handleChange}
            >
              <option value="">Selecione uma sala</option>
              {salas.map((sala) => (
                <option key={sala.id} value={sala.id}>
                  {sala.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="dataHora" className="form-label">
              Data e Hora
            </label>
            <input
              type="datetime-local"
              id="dataHora"
              name="dataHora"
              className="form-control"
              required
              value={form.dataHora}
              onChange={handleChange}
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
              name="preco"
              required
              placeholder="Digite o preço"
              value={form.preco}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="idioma" className="form-label">
              Idioma
            </label>
            <select
              id="idioma"
              name="idioma"
              className="form-select"
              required
              value={form.idioma}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Dublado">Dublado</option>
              <option value="Legendado">Legendado</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="formato" className="form-label">
              Formato
            </label>
            <select
              id="formato"
              name="formato"
              className="form-select"
              required
              value={form.formato}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="DOIS_D">2D</option>
              <option value="TRES_D">3D</option>
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

        {/* Botão atualizar
        <button
          type="button"
          className="btn btn-info mt-4"
          id="btnAtualizarTabelaSessao"
          onClick={carregarDados}
        >
          Atualizar Tabela
        </button> */}

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
              {sessoes.map((sessao) => (
                <tr key={sessao.id}>
                  <td>
                    {filmes.find((f) => f.id === sessao.filmeId)?.titulo ||
                      "N/A"}
                  </td>
                  <td>
                    {salas.find((s) => s.id === sessao.salaId)?.nome || "N/A"}
                  </td>
                  <td>{new Date(sessao.dataHora).toLocaleString()}</td>
                  <td>R$ {sessao.preco.toFixed(2)}</td>
                  <td>{sessao.idioma}</td>
                  <td>
                    {sessao.formato === "DOIS_D"
                      ? "2D"
                      : sessao.formato === "TRES_D"
                      ? "3D"
                      : sessao.formato}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEditar(sessao)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleExcluir(sessao.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Sessoes;
