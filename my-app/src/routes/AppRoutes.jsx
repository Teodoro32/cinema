import { BrowserRouter, Route, Routes } from "react-router-dom";
import Filme from "../features/Filme/components/Filme";
import HomePage from "../features/Home/pages/paginaInicial";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage  />} />
        <Route path="/cadastro-filmes" element={<Filme />} />
        {/* Adicione mais rotas aqui */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
