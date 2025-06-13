import { IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer"
import { TipoSala } from "@prisma/client";
import { SessaoDto } from "src/Sessao/dto/sessao.dto";


export class SalaDto {
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsNotEmpty()
  capacidade: number;

  @IsEnum(TipoSala)
  @IsNotEmpty()
  tipo: TipoSala;

  @ValidateNested({ each: true })
  @Type(() => SessaoDto)
  @IsOptional()
  sessoes?: SessaoDto[];
}