import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateInmuebleDto } from './dto/create-inmueble.dto';
import { UpdateInmuebleDto } from './dto/update-inmueble.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class InmueblesService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createInmuebleDto: CreateInmuebleDto) {
    try {
      const inmueble = await this.inmueble.create({
        data: createInmuebleDto,
      });

      return { ...inmueble };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return await this.inmueble.findMany();
  }

  async findOne(id: number) {
    const inmueble = await this.inmueble.findFirst({
      where: { id },
    });

    if (!inmueble) {
      throw new NotFoundException(`No se encontró el alojamiento con id ${id}`);
    }

    return inmueble;
  }

  update(id: number, updateInmuebleDto: UpdateInmuebleDto) {
    return `This action updates a #${id} inmueble`;
  }

  remove(id: number) {
    return `This action removes a #${id} inmueble`;
  }

  //ATENCION: Solo usar para Seed
  async borrarInmuebles() {
    await this.inmueble.deleteMany({});

    await this.$executeRaw`TRUNCATE TABLE "Inmueble" RESTART IDENTITY CASCADE`;
  }
}
