import { SalaInterfaces } from "../../../interfaces/sala.interface";

const API_URL = "/api/salas";

export async function listarSalas(): Promise<SalaInterfaces[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar salas");
  return res.json();
}

export async function buscarSalaPorId(id: number): Promise<SalaInterfaces> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar sala");
  return res.json();
}

export async function criarSala(data: SalaInterfaces): Promise<SalaInterfaces> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar sala");
  return res.json();
}

export async function atualizarSala(id: number, data: SalaInterfaces): Promise<SalaInterfaces> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar sala");
  return res.json();
}

export async function deletarSala(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar sala");
}
