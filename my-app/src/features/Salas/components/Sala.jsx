import React, { useState } from "react";
import Menu from "../../../components/Menu/Menu";

function Sala() {
  const [salas, setSalas] = useState([]);
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [tipo, setTipo] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaSala = { nome, capacidade, tipo };

    if (editIndex !== null) {
      const atualizadas = [...salas];
      atualizadas[editIndex] = novaSala;
      setSalas(atualizadas);
      setEditIndex(null);
    } else {
      setSalas([...salas, novaSala]);
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
        <Menu/> 
      {/* Conteúdo principal */}
      <div className="container mt-5">
        <h1 className="mb-4">Cadastro de Salas</h1>

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
              type="number"
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
