// src/services/filmeService.ts

interface Filme {
  id?: number;
  titulo: string;
  descricao: string;
  genero: string;
  classificacao: string;
  duracao: number;
  dataEstreia: string;
  // Se usar imagem via URL ou base64, pode incluir aqui, por exemplo:
  imagem?: string;
}

// Função para buscar todos os filmes
export async function getFilmes(): Promise<Filme[]> {
  const res = await fetch('/api/filmes');
  if (!res.ok) throw new Error('Erro ao buscar filmes');
  return res.json();
}

// Função para criar um novo filme
export async function criarFilme(filme: Filme): Promise<Filme> {
  const res = await fetch('http://localhost:3000/api/Filmes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filme),
  });
  if (!res.ok) throw new Error('Erro ao criar filme');
  return res.json();
}

// Função para atualizar filme
export async function atualizarFilme(id: number, filme: Filme): Promise<Filme> {
  const res = await fetch(`/api/filmes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filme),
  });
  if (!res.ok) throw new Error('Erro ao atualizar filme');
  return res.json();
}

// Função para deletar filme
export async function deletarFilme(id: number): Promise<void> {
  const res = await fetch(`/api/filmes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao deletar filme');
}
