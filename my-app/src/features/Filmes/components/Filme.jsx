import React, { useState } from "react";
import Button from "../../../components/Button/Button";

function Filme() {
  // Estados para os campos do formulário
  const [filme, setFilme] = useState({
    titulo: '',
    descricao: '',
    genero: '',
    classificacao: '',
    duracao: '',
    dataEstreia: '',
    imagem: null,
    preview: ''
  });

  const [filmes, setFilmes] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  // Manipulador de mudanças nos campos
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'imagem') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilme({
            ...filme,
            imagem: file,
            preview: reader.result
          });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFilme({
        ...filme,
        [name]: value
      });
    }
  };

  // Manipulador de envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editando) {
      // Atualizar filme existente
      const filmesAtualizados = filmes.map(f => 
        f.id === idEditando ? { ...filme, id: idEditando } : f
      );
      setFilmes(filmesAtualizados);
      setEditando(false);
      setIdEditando(null);
    } else {
      // Adicionar novo filme
      const novoFilme = { ...filme, id: Date.now() };
      setFilmes([...filmes, novoFilme]);
    }
    
    // Resetar formulário
    setFilme({
      titulo: '',
      descricao: '',
      genero: '',
      classificacao: '',
      duracao: '',
      dataEstreia: '',
      imagem: null,
      preview: ''
    });
  };

  // Função para editar filme
  const editarFilme = (id) => {
    const filmeParaEditar = filmes.find(f => f.id === id);
    setFilme(filmeParaEditar);
    setEditando(true);
    setIdEditando(id);
  };

  // Função para excluir filme
  const excluirFilme = (id) => {
    setFilmes(filmes.filter(f => f.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Cadastro de Filmes</h1>

      {/* Formulário de Cadastro de Filmes */}
      <form id="formFilme" onSubmit={handleSubmit}>
        {/* Campo Título */}
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input 
            type="text" 
            id="titulo" 
            name="titulo"
            className="form-control" 
            required 
            placeholder="Digite o título do filme"
            value={filme.titulo}
            onChange={handleChange}
          />
        </div>
        
        {/* Campo Descrição */}
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">Descrição</label>
          <textarea 
            id="descricao" 
            name="descricao"
            className="form-control" 
            rows="3" 
            required 
            placeholder="Insira a descrição do filme"
            value={filme.descricao}
            onChange={handleChange}
          ></textarea>
        </div>
        
        {/* Campo Gênero */}
        <div className="mb-3">
          <label htmlFor="genero" className="form-label">Gênero</label>
          <select 
            id="genero" 
            name="genero"
            className="form-select" 
            required
            value={filme.genero}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="Ação">Ação</option>
            <option value="Drama">Drama</option>
            <option value="Comédia">Comédia</option>
            <option value="Romance">Romance</option>
            <option value="Ficção Científica">Ficção Científica</option>
          </select>
        </div>
        
        {/* Campo Classificação */}
        <div className="mb-3">
          <label htmlFor="classificacao" className="form-label">Classificação Indicativa</label>
          <select 
            id="classificacao" 
            name="classificacao"
            className="form-select" 
            required
            value={filme.classificacao}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="Livre">Livre</option>
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
          </select>
        </div>
        
        {/* Campo Duração */}
        <div className="mb-3">
          <label htmlFor="duracao" className="form-label">Duração (minutos)</label>
          <input 
            type="number" 
            id="duracao" 
            name="duracao"
            className="form-control" 
            required 
            placeholder="Ex.: 120"
            value={filme.duracao}
            onChange={handleChange}
          />
        </div>
        
        {/* Campo Data de Estreia */}
        <div className="mb-3">
          <label htmlFor="dataEstreia" className="form-label">Data de Estreia</label>
          <input 
            type="date" 
            id="dataEstreia" 
            name="dataEstreia"
            className="form-control" 
            required
            value={filme.dataEstreia}
            onChange={handleChange}
          />
        </div>
        
        {/* Campo Upload de Imagem */}
        <div className="mb-3">
          <label htmlFor="imagem" className="form-label">Imagem do Filme (Pôster)</label>
          <input 
            type="file" 
            id="imagem" 
            name="imagem"
            className="form-control" 
            accept="image/*"
            onChange={handleChange}
          />
          {filme.preview && (
            <img 
              src={filme.preview} 
              id="preview" 
              className="filme-imagem mt-3" 
              alt="Pré-visualização da Imagem" 
              style={{ maxWidth: '200px' }}
            />
          )}
        </div>
        
        {/* Botões para Salvar e Cancelar Edição */}
        <button type="submit" variant="danger" onClick={handleSubmit}>
          {editando ? 'Atualizar Filme' : 'Salvar Filme'}
        </button>
        {editando && (
          <button 
            type="button" 
            variant="secondary"
            onClick={() => {
              setEditando(false);
              setIdEditando(null);
              setFilme({
                titulo: '',
                descricao: '',
                genero: '',
                classificacao: '',
                duracao: '',
                dataEstreia: '',
                imagem: null,
                preview: ''
              });
            }}
          >
            Cancelar Edição
          </button>
        )}
      </form>

      {/* Botão para atualizar manualmente a tabela */}
      <button type="button" variant="warning" onClick={()=> editarFilme(filme.id)}>
        Atualizar Tabela
      </button>

      {/* Tabela para exibir os filmes cadastrados */}
      <h2 className="mt-5">Filmes Cadastrados</h2>
      <table className="table table-striped" id="tabelaFilmes">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Gênero</th>
            <th>Classificação</th>
            <th>Duração</th>
            <th>Data de Estreia</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filmes.map((filme) => (
            <tr key={filme.id}>
              <td>{filme.titulo}</td>
              <td>{filme.descricao}</td>
              <td>{filme.genero}</td>
              <td>{filme.classificacao}</td>
              <td>{filme.duracao} minutos</td>
              <td>{filme.dataEstreia}</td>
              <td>
                <button 
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarFilme(filme.id)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => excluirFilme(filme.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Filme;