import { EstadoReserva } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ListaEstadosReserva } from '../enum/estado-reserva.enum';

export class CambiarEstadoReservaDto {
  @IsUUID()
  id: string;

  @IsNumber()
  @IsOptional()
  sena: number;

  @IsEnum(ListaEstadosReserva, {
    message: `Los estados validos son ${ListaEstadosReserva}`,
  })
  estado: EstadoReserva;
}
