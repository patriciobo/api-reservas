import { Module } from '@nestjs/common';
import { AlojamientosService } from './alojamientos.service';
import { AlojamientosController } from './alojamientos.controller';
import { InmueblesModule } from './01-inmuebles/inmuebles.module';
import { HabitacionesModule } from './02-habitaciones/habitaciones.module';
import { CamasModule } from './03-camas/camas.module';

@Module({
  controllers: [AlojamientosController],
  providers: [AlojamientosService],
  imports: [InmueblesModule, HabitacionesModule, CamasModule],
  exports: [AlojamientosService],
})
export class AlojamientosModule {}
