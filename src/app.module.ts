import { Module } from '@nestjs/common';
import { AlojamientosModule } from './alojamientos/alojamientos.module';
import { ReservasModule } from './reservas/reservas.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [AlojamientosModule, ReservasModule, SeedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
