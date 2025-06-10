import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { FilmeDto } from './dto/filmes.dto';

@Controller('api/Filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @Post()
  cadastrarFilme(@Body() data: FilmeDto) {
    return this.filmesService.cadastrarFilme(data);
  }

  @Get()
  listarTodos() {
    return this.filmesService.listarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.filmesService.buscarPorId(+id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() data: FilmeDto) {
    return this.filmesService.atualizar(+id, data);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.filmesService.remover(+id);
  }
}