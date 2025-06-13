import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class IngressoDto {
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsNotEmpty()
  sessaoId: number;

  @IsString()
  @IsNotEmpty()
  numeroAssento: string;

  @IsNumber()
  @IsOptional()
  preco?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsOptional()
  criadoEm?: Date; 
}
