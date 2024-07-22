import { IsString, MinLength } from 'class-validator';

export class CreateAlojamientoDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsString()
  @MinLength(1)
  direccion: string;

  @IsString()
  @MinLength(1)
  ciudad: string;

  @IsString()
  @MinLength(1)
  provincia: string;
}
