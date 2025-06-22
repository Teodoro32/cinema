import { Sessao } from "src/Sessao/entities/sessao.entity";

export class Ingresso {
  id: number;
  nome: string;
  sessaoId: number;
  numeroAssento: string;
  preco?: number 
  status?: string 
  criadoEm: Date;

  sessao: Sessao;
}
