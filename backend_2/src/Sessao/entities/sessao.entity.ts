import { Filme } from 'src/filmes/entities/filmes.entity';
import { Formato } from 'src/enums/enums.enum';
import { Sala } from 'src/Sala/entities/sala.entity';
import { Ingresso } from 'src/Ingresso/entities/ingresso.entity';

export class Sessao {
  id: number;
  filmeId: number;
  salaId: number;
  dataHora: Date;
  preco: number;
  idioma: string;
  formato: Formato;

  filme: Filme;
  sala: Sala;
  ingressos: Ingresso[];
}
