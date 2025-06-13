import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FilmeDto } from './dto/filmes.dto';
import { Filme } from './entities/filmes.entity';


const prisma = new PrismaClient();

@Injectable()
export class FilmesService {
  async cadastrarFilme(data: FilmeDto): Promise<Filme> {
    return prisma.filme.create({
      data: {
        ...data,
        dataEstreia: new Date(data.dataEstreia),
        imagemUrl: data.imagemUrl || '',
      },
    });
  }

  async listarTodos(): Promise<Filme[]> {
    return prisma.filme.findMany();
  }

  async buscarPorId(id: number): Promise<Filme | null> {
    return prisma.filme.findUnique({
      where: { id },
    });
  }

  async atualizar(id: number, data: FilmeDto): Promise<Filme> {
    return prisma.filme.update({
      where: { id },
      data: {
        ...data,
        dataEstreia: data.dataEstreia ? new Date(data.dataEstreia) : undefined,
      },
    });
  }

  async remover(id: number): Promise<void> {
    await prisma.filme.delete({
      where: { id },
    });
  }
}