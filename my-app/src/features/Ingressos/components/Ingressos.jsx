import React from "react";
import Menu from "../../../components/Menu/Menu";
import styles from "./Ingressos.module.css";

function Ingressos() {
  return (
    <div className={styles.pageIngressos}>
      <Menu />

      <div className="container py-5">
        <h1 className="mb-4 text-center">Venda de Ingressos</h1>

        {/* Formulário de Venda de Ingressos */}
        <form id="form-venda" className="row g-3 mb-5">
          <div className="col-md-6 col-12">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input type="text" id="nome" className="form-control" required />
          </div>

          <div className="col-md-6 col-12">
            <label htmlFor="sessao" className="form-label">
              Sessão (Filme - Horário)
            </label>
            <select id="sessao" className="form-select" required>
              <option value="">Selecione uma sessão</option>
            </select>
          </div>

          <div className="col-md-4 col-12">
            <label htmlFor="assento" className="form-label">
              Assento
            </label>
            <input type="text" id="assento" className="form-control" required />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-danger w-100">
              Vender Ingresso
            </button>
          </div>
        </form>

        <h2 className="mb-4">Ingressos Vendidos</h2>

        {/* Tabela Responsiva para Ingressos Vendidos */}
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Filme</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Assento</th>
              </tr>
            </thead>
            <tbody>{/* As linhas de vendas vão aparecer aqui */}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Ingressos;
