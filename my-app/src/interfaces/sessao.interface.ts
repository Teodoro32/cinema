import { Formato } from "../enums/formato.enum";

export interface Sessao {
  id?: number;
  filmeId: number;
  salaId: number;
  dataHora: string;  // string por vir do JSON
  preco: number;
  idioma: string;
  formato: Formato;
}
