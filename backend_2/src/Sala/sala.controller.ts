import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SalaService } from './sala.service';
import { SalaDto } from './dto/sala.dto';

@Controller('api/salas')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Post()
  cadastrar(@Body() dto: SalaDto) {
    console.log('Chegou no endpoint de cadastrar sala:', dto);
    return this.salaService.cadastrarSala(dto);
  }

  @Get()
  listarTodas() {
    return this.salaService.listarTodas();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.salaService.buscarPorId(id);
  }

  @Put(':id')
  atualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: SalaDto) {
    return this.salaService.atualizarSala(id, dto);
  }

  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.salaService.removerSala(id);
  }
}
