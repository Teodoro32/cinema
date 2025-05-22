import React from 'react';
import styles from './Menu.module.css';

function Menu() {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${styles.navbar || ''}`}>
      <div className="container">
        <a className="navbar-brand" href="#">
          <span className="text-danger">Cine</span>
          <span className="text-white">Mais</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cadastro-filmes">Filmes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cadastro-salas">Salas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cadastro-sessoes">Sessões</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/venda-ingressos">Ingressos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
