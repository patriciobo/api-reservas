import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AlojamientosModule } from 'src/alojamientos/alojamientos.module';
import { InmueblesModule } from 'src/alojamientos/01-inmuebles/inmuebles.module';
import { HabitacionesModule } from 'src/alojamientos/02-habitaciones/habitaciones.module';
import { CamasModule } from 'src/alojamientos/03-camas/camas.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    AlojamientosModule,
    InmueblesModule,
    HabitacionesModule,
    CamasModule,
  ],
})
export class SeedModule {}
