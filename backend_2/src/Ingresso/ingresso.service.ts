import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Ingresso as PrismaIngresso } from '@prisma/client';
import { IngressoDto } from './dto/ingresso.dto';

const prisma = new PrismaClient();

@Injectable()
export class IngressoService {
  async cadastrarIngresso(data: IngressoDto): Promise<PrismaIngresso> {
    return prisma.ingresso.create({
      data: {
        nome: data.nome,
        sessaoId: data.sessaoId,
        numeroAssento: data.numeroAssento,
        preco: data.preco,
        status: data.status,
        criadoEm: data.criadoEm ?? undefined,
      },
      include: {
        sessao: {
          include: {
            filme: true,
          },
        },
      },
    });
  }

  async listarTodos(): Promise<PrismaIngresso[]> {
    return prisma.ingresso.findMany({
      include: {
        sessao:{
          include:{
            filme: true,
          },
        },
      },
    });
  }

  async buscarPorId(id: number): Promise<PrismaIngresso | null> {
    return prisma.ingresso.findUnique({
      where: { id },
      include: { sessao: true },
    });
  }

  async atualizar(id: number, data: IngressoDto): Promise<PrismaIngresso> {
    const ingressoExistente = await prisma.ingresso.findUnique({
      where: { id },
    });
    if (!ingressoExistente) {
      throw new NotFoundException(`Ingresso com ID ${id} não encontrado`);
    }

    return prisma.ingresso.update({
      where: { id },
      data: {
        nome: data.nome,
        sessaoId: data.sessaoId,
        numeroAssento: data.numeroAssento,
        preco: data.preco,
        status: data.status,
      },
    });
  }

  async remover(id: number): Promise<void> {
    await prisma.ingresso.delete({
      where: { id },
    });
  }
}
