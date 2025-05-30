import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-black`}>
      <div className="container">
        <Link className="navbar-brand" to="#">
          <span className="text-danger">Cine</span>
          <span className="text-white">Mais</span>
        </Link>
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
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cadastro-filmes">Filme</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cadastro-salas">Salas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cadastro-sessoes">Sessões</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/venda-ingressos">Ingressos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
