import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Sessao as PrismaSessao } from '@prisma/client';
import { SessaoDto } from './dto/sessao.dto';

const prisma = new PrismaClient();
@Injectable()
export class SessaoService {
  async cadastrarSessao(dto: SessaoDto): Promise<PrismaSessao> {
    return prisma.sessao.create({
      data: {
        filmeId: dto.filmeId,
        salaId: dto.salaId,
        dataHora: new Date(dto.dataHora),
        preco: dto.preco,
        idioma: dto.idioma,
        formato: dto.formato,
      },
    });
  }

  async listar() {
    return prisma.sessao.findMany({
      include: {
        filme: true,
        sala: true,
        ingressos: true,
      },
    });
  }

  async buscarPorId(id: number) {
    const sessao = await prisma.sessao.findUnique({
      where: { id },
      include: {
        filme: true,
        sala: true,
        ingressos: true,
      },
    });

    if (!sessao) throw new NotFoundException('Sessão não encontrada');
    return sessao;
  }

  async atualizar(id: number, dto: SessaoDto) {
    const sessaoExistente = await prisma.sessao.findUnique({ where: { id } });

    if (!sessaoExistente) {
      throw new NotFoundException('Sessão não encontrada');
    }

    return prisma.sessao.update({
      where: { id },
      data: {
        filmeId: dto.filmeId,
        salaId: dto.salaId,
        dataHora: new Date(dto.dataHora),
        preco: dto.preco,
        idioma: dto.idioma,
        formato: dto.formato,
      },
    });
  }

  async remover(id: number) {
    const sessaoExistente = await prisma.sessao.findUnique({ where: { id } });
    if (!sessaoExistente) throw new NotFoundException('Sessão não encontrada');

    return prisma.sessao.delete({ where: { id } });
  }
}
