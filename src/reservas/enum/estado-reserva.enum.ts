import { EstadoReserva } from '@prisma/client';

export const ListaEstadosReserva = [
  EstadoReserva.PENDIENTE,
  EstadoReserva.PAGO_PARCIAL,
  EstadoReserva.PAGADA,
  EstadoReserva.CANCELADA,
];
