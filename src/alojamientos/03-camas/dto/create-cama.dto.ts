import {
  IsString,
  MinLength,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateCamaDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsInt()
  @IsOptional()
  maxPersonas?: number;

  @IsNumber()
  precioPorNoche: number;

  @IsNumber()
  @IsOptional()
  precioPorMes?: number;

  @IsNumber()
  @IsOptional()
  precioPorPersona?: number;

  @IsInt()
  habitacionId: number;
}
