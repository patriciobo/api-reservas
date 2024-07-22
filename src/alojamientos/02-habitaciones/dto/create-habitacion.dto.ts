import {
  IsString,
  MinLength,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateHabitacionDto {
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
  inmuebleId: number;
}
