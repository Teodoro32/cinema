import React, { useEffect, useState } from "react";
import Menu from "../../../components/Menu/Menu";
import styles from "./Ingressos.module.css";

// Importa os métodos do service já configurado
import { listarIngressos } from "../services/ingressosService";
import { cadastrarIngresso } from "../services/ingressosService";
import { atualizarIngresso } from "../services/ingressosService";
import { deletarIngresso } from "../services/ingressosService";
import { listarSessoes } from "../../Sessoes/services/sessoesService";

function Ingressos() {
  const [ingressos, setIngressos] = useState([]);
  const [sessoes, setSessoes] = useState([]);

  const [formData, setFormData] = useState({
    nome: "",
    numeroAssento: "",
    sessaoId: "",
  });

  // Estado para armazenar o ingresso que está sendo editado (null se for cadastro novo)
  const [editandoId, setEditandoId] = useState(null);


  useEffect(() => {
    console.log("useEffect disparado");

    async function fetchData() {
      try {
        console.log("Chamando listarIngressos...");
        const ingressosData = await listarIngressos();
        setIngressos(ingressosData);
      } catch (error) {
        console.warn("Erro ao buscar ingressos:", error);
      }

      try {
        console.log("Buscando sessoes...");
        const sessoesData = await listarSessoes();
        console.log("Sessoes carregadas:", sessoesData);
        setSessoes(sessoesData);
      } catch (error) {
        alert("Erro ao carregar sessões");
        console.error("Erro ao buscar sessões:", error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Submete o formulário, decide entre criar ou atualizar pelo editandoId
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editandoId !== null) {
        // Atualiza ingresso existente
        await atualizarIngresso(editandoId, {
          nome: formData.nome,
          numeroAssento: formData.numeroAssento,
          sessaoId: Number(formData.sessaoId),
        });
        setEditandoId(null); // sai do modo edição
      } else {
        // Cadastra novo ingresso
        await cadastrarIngresso({
          nome: formData.nome,
          numeroAssento: formData.numeroAssento,
          sessaoId: Number(formData.sessaoId),
        });
      }

      // Atualiza lista após cadastro/edição
      const ingressosAtualizados = await listarIngressos();
      setIngressos(ingressosAtualizados);

      setFormData({ nome: "", numeroAssento: "", sessaoId: "" });
    } catch (error) {
      alert(
        editandoId !== null
          ? "Erro ao atualizar ingresso"
          : "Erro ao cadastrar ingresso"
      );
      console.error(error);
    }
  };

  // Inicia edição populando o formulário com os dados do ingresso
  function handleEditar(ingresso) {
    setEditandoId(ingresso.id);
    setFormData({
      nome: ingresso.nome,
      numeroAssento: ingresso.numeroAssento,
      sessaoId: ingresso.sessaoId.toString(),
    });
  }

  // Exclui ingresso e atualiza lista
  async function handleExcluir(id) {
    if (!window.confirm("Tem certeza que deseja excluir este ingresso?"))
      return;

    try {
      await deletarIngresso(id);
      setIngressos((prev) => prev.filter((ing) => ing.id !== id));
      alert("Ingresso excluído com sucesso!");
    } catch (error) {
      alert("Erro ao excluir ingresso");
      console.error(error);
    }
  }

  return (
    <div className={styles.pageIngressos}>
      <Menu />

      <div className="container py-5">
        <h1 className="mb-4 text-center">Venda de Ingressos</h1>

        <form id="form-venda" className="row g-3 mb-5" onSubmit={handleSubmit}>
          <div className="col-md-6 col-12">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              className="form-control"
              required
              value={formData.nome}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 col-12">
            <label htmlFor="sessaoId" className="form-label">
              Sessão (Filme - Horário)
            </label>
            <select
              id="sessaoId"
              className="form-select"
              required
              value={formData.sessaoId}
              onChange={handleChange}
            >
              <option value="">Selecione uma sessão</option>
              {sessoes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.filme.titulo} - {new Date(s.dataHora).toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 col-12">
            <label htmlFor="numeroAssento" className="form-label">
              Assento
            </label>
            <input
              type="text"
              id="numeroAssento"
              className="form-control"
              required
              value={formData.numeroAssento}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-danger w-100">
              Vender Ingresso
            </button>
          </div>
        </form>

        <h2 className="mb-4">Ingressos Vendidos</h2>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Filme</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Assento</th>
                <th>Ações</th> {/* Nova coluna */}
              </tr>
            </thead>
            <tbody>
              {ingressos.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center">
                    Nenhum ingresso vendido ainda.
                  </td>
                </tr>
              )}
              {ingressos.map((i) => (
                <tr key={i.id}>
                  <td>{i.nome}</td>
                  <td>{i.sessao?.filme?.titulo || "N/A"}</td>
                  <td>
                    {new Date(i.sessao?.dataHora).toLocaleDateString() || "N/A"}
                  </td>
                  <td>
                    {new Date(i.sessao?.dataHora).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }) || "N/A"}
                  </td>
                  <td>{i.numeroAssento}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEditar(i)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleExcluir(i.id)}
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

export default Ingressos;
