import React, { useState, useEffect } from "react";
import Menu from "../../../components/Menu/Menu";
import { listarSalas, criarSala, atualizarSala } from "../services/salaService";
import styles from "./Sala.module.css";

function Sala() {
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

  const [salas, setSalas] = useState([]);
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [tipo, setTipo] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Buscar salas ao carregar
  useEffect(() => {
    async function fetchSalas() {
      try {
        const dados = await listarSalas();
        setSalas(dados);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      }
    }

    fetchSalas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaSala = { nome, capacidade: Number(capacidade), tipo };

    if (editIndex !== null) {
      const salaEditada = salas[editIndex];
      try {
        const salaAtualizada = await atualizarSala(salaEditada.id, novaSala);
        const atualizadas = [...salas];
        atualizadas[editIndex] = salaAtualizada;
        setSalas(atualizadas);
        setMensagem("Sala atualizada com sucesso!");
        setTipoMensagem("sucesso");
        setEditIndex(null);
      } catch (error) {
        setMensagem("Erro ao atualizar sala.");
        setTipoMensagem("erro");
      }
    } else {
      try {
        const salaCriada = await criarSala(novaSala);
        setSalas([...salas, salaCriada]);
        setMensagem("Sala cadastrada com sucesso!");
        setTipoMensagem("sucesso");
      } catch (error) {
        setMensagem("Erro ao cadastrar sala.");
        setTipoMensagem("erro");
      }
    }

    setNome("");
    setCapacidade("");
    setTipo("");
  };

  const handleEdit = (index) => {
    const sala = salas[index];
    setNome(sala.nome);
    setCapacidade(sala.capacidade);
    setTipo(sala.tipo);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const atualizadas = salas.filter((_, i) => i !== index);
    setSalas(atualizadas);
    if (editIndex === index) {
      setNome("");
      setCapacidade("");
      setTipo("");
      setEditIndex(null);
    }
  };

  const handleCancel = () => {
    setNome("");
    setCapacidade("");
    setTipo("");
    setEditIndex(null);
  };

  return (
    <div className="bg-dark text-light min-vh-100">
      <Menu />
      {/* Conteúdo principal */}
      <div className="container mt-5">
        <h1 className="mb-4">Cadastro de Salas</h1>

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
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nomeSala" className="form-label">
              Nome da Sala
            </label>
            <input
              type="text"
              id="nomeSala"
              className="form-control"
              required
              placeholder="Digite o nome da sala"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="capacidade" className="form-label">
              Capacidade
            </label>
            <input
              type="Number"
              id="capacidade"
              className="form-control"
              required
              placeholder="Digite a capacidade"
              value={capacidade}
              onChange={(e) => setCapacidade(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tipo" className="form-label">
              Tipo
            </label>
            <select
              id="tipo"
              className="form-select"
              required
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="IMAX">IMAX</option>
            </select>
          </div>
          <button type="submit" className="btn btn-danger me-2">
            {editIndex !== null ? "Atualizar Sala" : "Salvar Sala"}
          </button>
          {editIndex !== null && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancelar Edição
            </button>
          )}
        </form>

        {/* Tabela de Salas */}
        <h2 className="mt-5">Salas Cadastradas</h2>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Capacidade</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {salas.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Nenhuma sala cadastrada.
                </td>
              </tr>
            ) : (
              salas.map((sala, index) => (
                <tr key={index}>
                  <td>{sala.nome}</td>
                  <td>{sala.capacidade}</td>
                  <td>{sala.tipo}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(index)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(index)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sala;
