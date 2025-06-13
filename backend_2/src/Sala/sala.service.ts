import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient, Sala as PrismaSala, TipoSala } from '@prisma/client';
import { SalaDto } from './dto/sala.dto';
import { Sala } from './entities/sala.entity';

const prisma = new PrismaClient();

@Injectable()
export class SalaService {
  async cadastrarSala(data: SalaDto): Promise<PrismaSala> {
    function mapTipoSala(tipo: string): TipoSala {
      switch (tipo) {
        case '2D':
          return TipoSala.DOIS_D;
        case '3D':
          return TipoSala.TRES_D;
        case 'IMAX':
          return TipoSala.IMAX;
        default:
          throw new BadRequestException('Tipo de sala inválido');
      }
    }
    return prisma.sala.create({
      data: {
        nome: data.nome,
        capacidade: data.capacidade,
        tipo: mapTipoSala(data.tipo),
      },
    });
  }

  async listarTodas(): Promise<PrismaSala[]> {
    return prisma.sala.findMany({
      include: { sessoes: true }, // incluir sessoes se necessário
    });
  }

  async buscarPorId(id: number): Promise<PrismaSala | null> {
    return prisma.sala.findUnique({
      where: { id },
      include: { sessoes: true },
    });
  }

  async atualizarSala(id: number, data: SalaDto): Promise<PrismaSala> {
    const salaExistente = await prisma.sala.findUnique({ where: { id } });
    if (!salaExistente) {
      throw new NotFoundException('Sala não encontrada');
    }

    function mapTipoSala(tipo: string): TipoSala {
      switch (tipo) {
        case '2D':
          return TipoSala.DOIS_D;
        case '3D':
          return TipoSala.TRES_D;
        case 'IMAX':
          return TipoSala.IMAX;
        default:
          throw new BadRequestException('Tipo de sala inválido');
      }
    }

    return prisma.sala.update({
      where: { id },
      data: {
        nome: data.nome,
        capacidade: data.capacidade,
        tipo: mapTipoSala(data.tipo),
      },
    });
  }

  async removerSala(id: number): Promise<void> {
    const salaExistente = await prisma.sala.findUnique({ where: { id } });
    if (!salaExistente) {
      throw new NotFoundException('Sala não encontrada');
    }

    await prisma.sala.delete({
      where: { id },
    });
  }
}
