import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { IngressoService } from './ingresso.service';
import { IngressoDto } from './dto/ingresso.dto';

@Controller('api/ingressos')
export class IngressoController {
  constructor(private readonly ingressoService: IngressoService) {}

  @Post()
  async cadastrar(@Body() dto: IngressoDto) {
    return this.ingressoService.cadastrarIngresso(dto);
  }

  @Get()
  listarTodos() {
    return this.ingressoService.listarTodos();
  }

  @Get(':id')
  async buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.ingressoService.buscarPorId(id);
  }

  @Put(':id')
  async atualizar(
    @Param('id', ParseIntPipe) id: number, @Body() dto: IngressoDto,) {
    return this.ingressoService.atualizar(id, dto);
  }

  @Delete(':id')
  async remover(@Param('id', ParseIntPipe) id: number) {
    return this.ingressoService.remover(id);
  }
}
