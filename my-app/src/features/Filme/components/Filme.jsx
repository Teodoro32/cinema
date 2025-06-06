import React, { useState, useEffect } from "react";
import styles from "./Filme.module.css";
import Menu from "../../../components/Menu/Menu";
import {
  criarFilme,
  getFilmes,
  atualizarFilme,
  deletarFilme,
} from "../services/filmeService";

function Filme() {
  // Estados para os campos do formulário
  const [filme, setFilme] = useState({
    titulo: "",
    descricao: "",
    genero: "",
    classificacao: "",
    duracao: "",
    dataEstreia: "",
    imagem: null,
    preview: "",
  });

  const [filmes, setFilmes] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getMovies();
        setFilmes(data);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      }
    }
    fetchMovies();
  }, []);

  // Manipulador de mudanças nos campos
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imagem") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilme({
            ...filme,
            imagem: file,
            preview: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFilme({
        ...filme,
        [name]: value,
      });
    }
  };

  // Manipulador de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      titulo: filme.titulo,
      descricao: filme.descricao,
      genero: filme.genero,
      classificacao: filme.classificacao,
      duracao: Number(filme.duracao),
      dataEstreia: new Date(filme.dataEstreia).toISOString(),
      imagem: filme.preview // Atenção: idealmente deve ser uma URL da imagem armazenada no backend
    };

    try {
      if (editando) {
        await atualizarFilme(idEditando, movieData);
      } else {
        await criarFilme(movieData);
      }

      const atualizarFilme = await getMovies();
      setFilmes(atualizarFilme);

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
      setEditando(false);
      setIdEditando(null);
    } catch (error) {
      console.error('Erro ao salvar filme:', error);
      alert('Erro ao salvar filme. Tente novamente.');
    }
  };


  // Função para editar filme
  const editarFilme = (id) => {
    const filmeParaEditar = filmes.find((f) => f.id === id);
    setFilme({
      titulo: filmeParaEditar.titulo,
      descricao: filmeParaEditar.descricao,
      genero: filmeParaEditar.genero,
      classificacao: filmeParaEditar.classificacao,
      duracao: filmeParaEditar.duracao,
      dataEstreia: filmeParaEditar.dataEstreia,
      imagem: null,
      preview: filmeParaEditar.imageUrl || ''
    });
    setEditando(true);
    setIdEditando(id);
  };


  // Função para excluir filme
  const excluirFilme = async (id) => {
    try {
      await deletarFilme(id);
      const atualizarFilme = await getMovies();
      setFilmes(atualizarFilme);
    } catch (error) {
      console.error('Erro ao excluir filme:', error);
      alert('Erro ao excluir filme. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <Menu />
      <h1 className={styles.title}>Cadastro de Filmes</h1>

      {/* Formulário de Cadastro de Filmes */}
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Campo Título */}
        <div className={styles.formGroup}>
          <label htmlFor="titulo" className={styles.formLabel}>
            Título
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            className={styles.formControl}
            required
            placeholder="Digite o título do filme"
            value={filme.titulo}
            onChange={handleChange}
          />
        </div>

        {/* Campo Descrição */}
        <div className={styles.formGroup}>
          <label htmlFor="descricao" className={styles.formLabel}>
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            className={styles.formControl}
            rows="3"
            required
            placeholder="Insira a descrição do filme"
            value={filme.descricao}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Campo Gênero */}
        <div className={styles.formGroup}>
          <label htmlFor="genero" className={styles.formLabel}>
            Gênero
          </label>
          <select
            id="genero"
            name="genero"
            className={styles.formSelect}
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
        <div className={styles.formGroup}>
          <label htmlFor="classificacao" className={styles.formLabel}>
            Classificação Indicativa
          </label>
          <select
            id="classificacao"
            name="classificacao"
            className={styles.formSelect}
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
        <div className={styles.formGroup}>
          <label htmlFor="duracao" className={styles.formLabel}>
            Duração (minutos)
          </label>
          <input
            type="number"
            id="duracao"
            name="duracao"
            className={styles.formControl}
            required
            placeholder="Ex.: 120"
            value={filme.duracao}
            onChange={handleChange}
          />
        </div>

        {/* Campo Data de Estreia */}
        <div className={styles.formGroup}>
          <label htmlFor="dataEstreia" className={styles.formLabel}>
            Data de Estreia
          </label>
          <input
            type="date"
            id="dataEstreia"
            name="dataEstreia"
            className={styles.formControl}
            required
            value={filme.dataEstreia}
            onChange={handleChange}
          />
        </div>

        {/* Campo Upload de Imagem */}
        <div className={styles.formGroup}>
          <label htmlFor="imagem" className={styles.formLabel}>
            Imagem do Filme (Pôster)
          </label>
          <input
            type="file"
            id="imagem"
            name="imagem"
            className={styles.formControl}
            accept="image/*"
            onChange={handleChange}
          />
          {filme.preview && (
            <img
              src={filme.preview}
              className={styles.filmeImagem}
              alt="Pré-visualização da Imagem"
            />
          )}
        </div>

        {/* Botões para Salvar e Cancelar Edição */}
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonPrimary}`}
          onClick={handleSubmit}
        >
          {editando ? "Atualizar Filme" : "Salvar Filme"}
        </button>
        {editando && (
          <button
            type="button"
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={() => {
              setEditando(false);
              setIdEditando(null);
              setFilme({
                titulo: "",
                descricao: "",
                genero: "",
                classificacao: "",
                duracao: "",
                dataEstreia: "",
                imagem: null,
                preview: "",
              });
            }}
          >
            Cancelar Edição
          </button>
        )}
      </form>

      <h2 className={styles.subtitle}>Filmes Cadastrados</h2>
      <table className={styles.table}>
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
                  className={`${styles.actionButton} ${styles.buttonPrimary}`}
                  onClick={() => editarFilme(filme.id)}
                >
                  Editar
                </button>
                <button
                  className={`${styles.actionButton} ${styles.buttonDanger}`}
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
