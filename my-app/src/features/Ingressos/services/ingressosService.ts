const API_URL = "api/ingressos";

export interface IngressoDto {
  id?: number;
  nome: string;
  sessaoId: number;
  numeroAssento: string;
  preco?: number;
  status?: string;
  criadoEm?: string; // string por ser serializado como ISO
}

export interface IngressoResponse extends IngressoDto {
  id: number;
  criadoEm: string;
  sessao?: {
    id: number;
    filmeId: number;
    salaId: number;
    dataHora: string;
    preco: number;
    idioma: string;
    formato: string;
  };
}


export async function listarIngressos(): Promise<IngressoResponse[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar ingressos");
  return res.json();
}

export async function buscarIngressoPorId(id: number): Promise<IngressoResponse> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar ingresso");
  return res.json();
}

export async function cadastrarIngresso(data: IngressoDto): Promise<IngressoResponse> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar ingresso");
  return res.json();
}

export async function atualizarIngresso(id: number, data: IngressoDto): Promise<IngressoResponse> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar ingresso");
  return res.json();
}

export async function deletarIngresso(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar ingresso");
}

