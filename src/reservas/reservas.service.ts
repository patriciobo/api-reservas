import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CrearReservaDto } from './dto/crear-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { PrismaClient, TipoAlojamiento } from '@prisma/client';
import { CambiarEstadoReservaDto } from './dto/cambiar-estado-reserva.dto';

@Injectable()
export class ReservasService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(crearReservaDto: CrearReservaDto) {
    try {
      await this.verificarDisponibilidad(crearReservaDto);

      const precioTotal =
        await this.calcularPrecioTotalReserva(crearReservaDto);

      const reserva = await this.reserva.create({
        data: {
          precioTotal: precioTotal,
          ...crearReservaDto,
        },
      });

      return { ...reserva };
    } catch (error) {
      throw new HttpException(
        error.response.message,
        error.response.statusCode,
      );
    }
  }

  async verificarDisponibilidad(reserva: CrearReservaDto) {
    if (reserva.fechaEntrada >= reserva.fechaSalida) {
      throw new BadRequestException(
        'La fecha de entrada ingresada es igual o posterior a la de salida',
      );
    }
    const reservaEnConflicto = await this.reserva.findFirst({
      where: {
        AND: [
          {
            tipoAlojamiento: reserva.tipoAlojamiento,
            alojamientoId: reserva.alojamientoId,
            fechaEntrada: {
              lt: reserva.fechaSalida,
            },
          },
          {
            tipoAlojamiento: reserva.tipoAlojamiento,
            alojamientoId: reserva.alojamientoId,
            fechaSalida: {
              gt: reserva.fechaEntrada,
            },
          },
        ],
      },
    });

    if (reservaEnConflicto) {
      throw new BadRequestException(
        `Hay otra reserva que se superpone con las fechas y el alojamiento seleccionado.`,
      );
    }

    return true;
  }

  calcularNoches(fechaEntrada, fechaSalida) {
    // Convertir la diferencia en milisegundos a días
    const unDia = 24 * 60 * 60 * 1000; // Horas * Minutos * Segundos * Milisegundos
    const diferenciaMilisegundos = fechaSalida - fechaEntrada;
    const diferenciaDias = diferenciaMilisegundos / unDia;

    // Asegurarse de redondear a la baja (Math.floor) para obtener noches completas
    return Math.floor(diferenciaDias);
  }

  async calcularPrecioTotalReserva(reserva: CrearReservaDto) {
    let precioTotalPorNoche = 0;

    //El precio por noche es el precio minimo
    switch (reserva.tipoAlojamiento) {
      case TipoAlojamiento.INMUEBLE_COMPLETO:
        const inmueble = await this.inmueble.findFirst({
          where: { id: reserva.alojamientoId },
        });

        if (!inmueble) {
          throw new NotFoundException(
            `No se encontró el inmueble con id: ${reserva.alojamientoId}`,
          );
        }

        if (reserva.cantPersonas > inmueble.maxPersonas) {
          throw new BadRequestException(
            `La cantidad de personas es mayor a la permitida para el inmueble seleccionado.`,
          );
        }

        precioTotalPorNoche =
          inmueble.precioPorNoche >
          inmueble.precioPorPersona * reserva.cantPersonas
            ? inmueble.precioPorNoche
            : inmueble.precioPorPersona * reserva.cantPersonas;

        break;

      case TipoAlojamiento.HABITACION:
        const habitacion = await this.habitacion.findFirst({
          where: { id: reserva.alojamientoId },
        });

        if (!habitacion) {
          throw new NotFoundException(
            `No se encontró la habitacion con id: ${reserva.alojamientoId}`,
          );
        }

        if (reserva.cantPersonas > habitacion.maxPersonas) {
          throw new BadRequestException(
            `La cantidad de personas es mayor a la permitida para la habitación seleccionada.`,
          );
        }

        precioTotalPorNoche =
          habitacion.precioPorNoche >
          habitacion.precioPorPersona * reserva.cantPersonas
            ? habitacion.precioPorNoche
            : habitacion.precioPorPersona * reserva.cantPersonas;

        break;

      case TipoAlojamiento.CAMA:
        const cama = await this.cama.findFirst({
          where: { id: reserva.alojamientoId },
        });

        if (!cama) {
          throw new NotFoundException(
            `No se encontró la cama con id: ${reserva.alojamientoId}`,
          );
        }

        if (reserva.cantPersonas > cama.maxPersonas) {
          throw new BadRequestException(
            `La cantidad de personas es mayor a la permitida para la cama seleccionada.`,
          );
        }

        precioTotalPorNoche =
          cama.precioPorNoche > cama.precioPorPersona * reserva.cantPersonas
            ? cama.precioPorNoche
            : cama.precioPorPersona * reserva.cantPersonas;

        break;
    }

    const totalNoches = this.calcularNoches(
      reserva.fechaEntrada,
      reserva.fechaSalida,
    );

    const precioTotalReserva = precioTotalPorNoche * totalNoches;

    return precioTotalReserva;
  }

  async findAll() {
    return await this.reserva.findMany({});
  }

  async findOne(id: string) {
    const reserva = await this.reserva.findFirst({
      where: { id },
    });

    if (!reserva) {
      throw new NotFoundException(`No se encontró la reserva.`);
    }

    return reserva;
  }

  //TODO: No tiene uso de momento, es para actualizar el estado de manera automatica de ser necesario
  async cambiarEstadoReserva(cambiarEstado: CambiarEstadoReservaDto) {
    const { id, estado } = cambiarEstado;

    const reserva = await this.findOne(id);

    if (reserva.estado === estado) {
      return reserva;
    }

    return this.reserva.update({
      where: { id },
      data: {
        estado,
      },
    });
  }

  async update(id: string, updateReservaDto: UpdateReservaDto) {
    const reservaEncontrada = await this.findOne(id); //Se puede optimizar con try/catch

    const reservaActualizada = {
      ...reservaEncontrada,
      ...updateReservaDto,
    };

    if (
      updateReservaDto.hasOwnProperty('fechaEntrada') ||
      updateReservaDto.hasOwnProperty('fechaSalida')
    ) {
      await this.verificarDisponibilidad(reservaActualizada);
    }

    const precioTotal =
      await this.calcularPrecioTotalReserva(reservaActualizada);

    return await this.reserva.update({
      where: { id },
      data: { ...reservaActualizada, precioTotal },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} reserva`;
  }
}
