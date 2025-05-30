import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import styles from './Home.module.css';
import Menu from '../../../components/Menu/Menu';
import './Home.module.css';
function Home(){
    return (
      <div className="containerHome">
        <Menu/>
        {/* Conteúdo principal */}
        <div className={`${styles.main}`}>
          <header className={styles.header}>
            <h1 className={`${styles.title} ${styles.textDanger}`}>
              Bem-vindo ao <span className={styles.textWhite}>CineMais</span>
            </h1>
            <p className={styles.lead}>O sistema completo para gerenciamento de cinemas</p>
          </header>
          <div className="containerPrincipal">
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
                    <Link to="/cadastro-filmes">
                      <Button variant="danger">Acessar</Button>
                    </Link>
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
                    <Link to="/cadastro-salas">
                      <Button variant="danger">Acessar</Button>
                    </Link>
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
                  <div className={`${styles.cardButtons} d-flex gap-2`}>
                    <Link to="/cadastro-sessoes" className="flex-grow-1">
                      <Button variant="danger">Sessões</Button>
                    </Link>
                    <Link to="/venda-ingressos" className="flex-grow-1">
                      <Button variant="danger">Ingressos</Button>
                    </Link>
                  </div>
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