import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../features/Home/pages/PaginaInicial";
import CadastroSala from "../features/Salas/pages/cadastroSalas";
import CadastroFilme from "../features/Filme/pages/cadastroFilmes";
import CadastroSessoes from "../features/Sessoes/pages/CadastroSessoes";
import VendasIngressos from "../features/Ingressos/pages/VendasIngressos";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage  />} />
        <Route path="/cadastro-filmes" element={<CadastroFilme />} />
        <Route path="/cadastro-salas" element={<CadastroSala/>} />
        <Route path="/cadastro-sessoes" element={<CadastroSessoes/>} />
        <Route path="/venda-ingressos" element={<VendasIngressos/> } />
        {/* Adicione mais rotas aqui */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
