import { Sessao } from 'src/Sessao/entities/sessao.entity';
import { TipoSala } from '@prisma/client';

export class Sala {
  id: number;
  nome: string;
  capacidade: number
  tipo: TipoSala;
  sessoes?: Sessao[];
}