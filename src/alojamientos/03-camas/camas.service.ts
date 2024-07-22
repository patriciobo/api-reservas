import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateCamaDto } from './dto/create-cama.dto';
import { UpdateCamaDto } from './dto/update-cama.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CamasService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createCamaDto: CreateCamaDto) {
    try {
      const cama = await this.cama.create({
        data: createCamaDto,
      });

      return { ...cama };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return await this.cama.findMany();
  }

  async findOne(id: number) {
    const cama = await this.cama.findFirst({
      where: { id },
    });

    if (!cama) {
      throw new NotFoundException(`No se encontró el alojamiento con id ${id}`);
    }

    return cama;
  }

  update(id: number, updateCamaDto: UpdateCamaDto) {
    return `This action updates a #${id} cama`;
  }

  remove(id: number) {
    return `This action removes a #${id} cama`;
  }

  //ATENCION: Solo usar para Seed
  async borrarCamas() {
    await this.cama.deleteMany({});

    await this.$executeRaw`TRUNCATE TABLE "Cama" RESTART IDENTITY CASCADE`;
  }
}
