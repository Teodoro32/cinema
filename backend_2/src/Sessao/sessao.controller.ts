import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SessaoService } from './sessao.service';
import { SessaoDto } from './dto/sessao.dto';

@Controller('api/sessao')
export class SessaoController {
  constructor(private readonly sessaoService: SessaoService) {}

  @Post()
  cadastrarSessao(@Body() dto: SessaoDto) {
    return this.sessaoService.cadastrarSessao(dto);
  }

  @Get()
  listar() {
    return this.sessaoService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.sessaoService.buscarPorId(id);
  }

  @Put(':id')
  atualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: SessaoDto) {
    return this.sessaoService.atualizar(id, dto);
  }

  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.sessaoService.remover(id);
  }
}
