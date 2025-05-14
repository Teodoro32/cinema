import React from 'react';
import styles from './Home.module.css';

function Home(){
  return (
    <div className={styles.wrapper}>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
        <div className="container">
          <a className={`navbar-brand ${styles.navbarBrand}`} href="#">
            <span className={styles.textDanger}>Cine</span>
            <span className={styles.textWhite}>Mais</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
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

      {/* Conteúdo principal */}
      <div className={`container ${styles.main}`}>
        <header className={styles.header}>
          <h1 className={`${styles.title} ${styles.textDanger}`}>
            Bem-vindo ao <span className={styles.textWhite}>CineMais</span>
          </h1>
          <p className={styles.lead}>O sistema completo para gerenciamento de cinemas</p>
        </header>

        <div className="row g-4">
          {/* Card Filmes */}
          <div className="col-md-4">
            <div className={styles.card}>
              <div className="card-body">
                <h5 className={styles.cardTitle}>Cadastro de Filmes</h5>
                <p className={styles.cardText}>
                  Cadastre novos filmes com informações detalhadas, como título, descrição, gênero, duração e data de estreia.
                </p>
                <div className={styles.cardButtons}>
                  <a href="/cadastro-filmes" className="btn btn-danger">Acessar</a>
                </div>
              </div>
            </div>
          </div>

          {/* Card Salas */}
          <div className="col-md-4">
            <div className={styles.card}>
              <div className="card-body">
                <h5 className={styles.cardTitle}>Cadastro de Salas</h5>
                <p className={styles.cardText}>
                  Gerencie as salas do cinema, definindo capacidade e tipo (2D, 3D, IMAX) para ver os filmes desejados.
                </p>
                <div className={styles.cardButtons}>
                  <a href="/cadastro-salas" className="btn btn-danger">Acessar</a>
                </div>
              </div>
            </div>
          </div>

          {/* Card Sessões */}
          <div className="col-md-4">
            <div className={styles.card}>
              <div className="card-body">
                <h5 className={styles.cardTitle}>Sessões e Ingressos</h5>
                <p className={styles.cardText}>
                  Configure as sessões e disponibilize a venda dos ingressos, combinando dados de filmes e salas.
                </p>
                <div className={styles.cardButtons}>
                  <a href="/cadastro-sessoes" className="btn btn-danger flex-grow-1">Sessões</a>
                  <a href="/venda-ingressos" className="btn btn-danger flex-grow-1">Ingressos</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seções de dados carregáveis */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Filmes em Cartaz</h2>
          <div id="listaFilmes" className="row g-4 mt-3">
            {/* Placeholder */}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Próximas Sessões</h2>
          <div id="listaSessoes" className="list-group mt-3">
            {/* Placeholder */}
          </div>
        </section>
      </div>

      {/* Rodapé */}
      <footer className={styles.footer}>
        <div className="container">
          <p className="mb-0">© 2025 Gabriel Teodoro - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
