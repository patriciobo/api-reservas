import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateAlojamientoDto } from './dto/create-alojamiento.dto';
// import { UpdateAlojamientoDto } from './dto/update-alojamiento.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AlojamientosService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createAlojamientoDto: CreateAlojamientoDto) {
    try {
      const alojamiento = await this.alojamiento.create({
        data: createAlojamientoDto,
      });

      return { ...alojamiento };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return await this.alojamiento.findMany();
  }

  async findOne(id: number) {
    const alojamiento = await this.alojamiento.findFirst({
      where: { id },
    });

    if (!alojamiento) {
      throw new NotFoundException(`No se encontró el alojamiento con id ${id}`);
    }

    return alojamiento;
  }

  update(id: number /* updateAlojamientoDto: UpdateAlojamientoDto */) {
    return `This action updates a #${id} alojamiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} alojamiento`;
  }

  //ATENCION: Solo usar para Seed
  async borrarAlojamientos() {
    await this.alojamiento.deleteMany({});

    await this
      .$executeRaw`TRUNCATE TABLE "Alojamiento" RESTART IDENTITY CASCADE`;
  }
}
