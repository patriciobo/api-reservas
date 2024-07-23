import {
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ListaTiposAlojamiento } from '../enum/tipo-alojamiento.enum';
import { EstadoReserva, TipoAlojamiento } from '@prisma/client';
import { ListaEstadosReserva } from '../enum/estado-reserva.enum';

export class CrearReservaDto {
  @IsDate()
  @Type(() => Date)
  fechaEntrada: Date;

  @IsDate()
  @Type(() => Date)
  fechaSalida: Date;

  @IsInt()
  @IsPositive()
  cantPersonas: number;

  @IsNumber()
  @IsOptional()
  sena: number;

  @IsEnum(ListaEstadosReserva, {
    message: `Los estados validos son ${ListaEstadosReserva}`,
  })
  @IsOptional()
  estado: EstadoReserva;

  @IsEnum(ListaTiposAlojamiento, {
    message: `Los tipos de alojamiento posibles son: ${ListaTiposAlojamiento}`,
  })
  tipoAlojamiento: TipoAlojamiento;

  @IsInt()
  @IsPositive()
  alojamientoId: number;
}
