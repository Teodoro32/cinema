import { IsString, IsNumber, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class FilmeDto {
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsNotEmpty()
  classificacao: string;

  @IsNumber()
  @IsNotEmpty()
  duracao: number;

  @IsDateString()
  @IsNotEmpty()
  dataEstreia: string;

  @IsString()
  @IsNotEmpty()
  imagemUrl: string;
}