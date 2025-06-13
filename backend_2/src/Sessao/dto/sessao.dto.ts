
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Formato } from "src/enums/enums.enum";

export class SessaoDto {
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsNotEmpty()
  filmeId: number;

  @IsNumber()
  @IsNotEmpty()
  salaId: number;

  @IsDateString()
  @IsNotEmpty()
  dataHora: string; // ISO string

  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @IsString()
  @IsNotEmpty()
  idioma: string;

  @IsEnum(Formato)
  @IsNotEmpty()
  formato: Formato;
}
