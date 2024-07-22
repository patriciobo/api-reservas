import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateInmuebleDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsInt()
  @IsOptional()
  maxPersonas?: number;

  @IsNumber()
  @IsOptional()
  precioPorNoche?: number;

  @IsNumber()
  @IsOptional()
  precioPorMes?: number;

  @IsNumber()
  @IsOptional()
  precioPorPersona?: number;

  @IsInt()
  alojamientoId: number;
}
