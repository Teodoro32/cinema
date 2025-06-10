// import { Session } from '../../sessions/entities/session.entity';   importar ainda!!

export class Filme {
  id: number;
  titulo: string;
  descricao?: string | null;
  genero: string;
  classificacao: string;
  duracao: number;
  dataEstreia: Date;
  imagemUrl: string;
  createdAt: Date;
}