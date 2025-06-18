import { Sessao } from "../../../interfaces/sessao.interface";

const API_URL = "api/sessao";

export async function listarSessoes(): Promise<Sessao[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao buscar sessões');
  return res.json();
}

export async function buscarSessaoPorId(id: number): Promise<Sessao[]> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Sessão não encontrada');
  return res.json();
}

export async function cadastrarSessao(sessao: Sessao): Promise<Sessao[]> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sessao),
  });
  if (!res.ok) throw new Error('Erro ao cadastrar sessão');
  return res.json();
}

export async function atualizarSessao(id: number, sessao: Sessao): Promise<Sessao[]> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sessao),
  });
  if (!res.ok) throw new Error('Erro ao atualizar sessão');
  return res.json();
}

export async function deletarSessao(id: number): Promise<void>  {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao deletar sessão');
}
