import { TipoSala } from "../enums/tipoSala.enum";
import { Sessao } from "./sessao.interface";

export interface SalaInterfaces {
  id?: number;
  nome: string;
  capacidade: number;
  tipo: TipoSala;
  sessoes?: Sessao[];
}
