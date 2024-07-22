import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UpdateHabitacionDto } from './dto/update-habitacion.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HabitacionesService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createHabitacionDto: CreateHabitacionDto) {
    try {
      const habitacion = await this.habitacion.create({
        data: createHabitacionDto,
      });

      return { ...habitacion };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return await this.habitacion.findMany();
  }

  async findOne(id: number) {
    const habitacion = await this.habitacion.findFirst({
      where: { id },
    });

    if (!habitacion) {
      throw new NotFoundException(`No se encontró el alojamiento con id ${id}`);
    }

    return habitacion;
  }

  update(id: number, updateHabitacionDto: UpdateHabitacionDto) {
    return `This action updates a #${id} habitacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} habitacione`;
  }

  //ATENCION: Solo usar para Seed
  async borrarHabitaciones() {
    await this.habitacion.deleteMany({});

    await this
      .$executeRaw`TRUNCATE TABLE "Habitacion" RESTART IDENTITY CASCADE`;
  }
}
