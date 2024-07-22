import { Injectable } from '@nestjs/common';
import { InmueblesService } from 'src/alojamientos/01-inmuebles/inmuebles.service';
import { HabitacionesService } from 'src/alojamientos/02-habitaciones/habitaciones.service';
import { CamasService } from 'src/alojamientos/03-camas/camas.service';
import { AlojamientosService } from 'src/alojamientos/alojamientos.service';
import { initialData } from './data/seed.data';

@Injectable()
export class SeedService {
  constructor(
    private readonly alojamientosService: AlojamientosService,
    private readonly inmueblesService: InmueblesService,
    private readonly habitacionesService: HabitacionesService,
    private readonly camasService: CamasService,
  ) {}

  async cargarDatos() {
    await this.borrarTablas();

    await this.insertarAlojamientos();

    await this.insertarInmuebles();

    await this.insertarHabitaciones();

    await this.insertarCamas();

    return `Seed ejecutado correctamente`;
  }

  private async borrarTablas() {
    await this.camasService.borrarCamas();
    await this.habitacionesService.borrarHabitaciones();
    await this.inmueblesService.borrarInmuebles();
    await this.alojamientosService.borrarAlojamientos();
  }

  private async insertarAlojamientos() {
    const alojamientos = initialData.alojamientos;

    for (const alojamiento of alojamientos) {
      await this.alojamientosService.create(alojamiento);
    }
  }

  private async insertarInmuebles() {
    const inmuebles = initialData.inmuebles;

    for (const inmueble of inmuebles) {
      await this.inmueblesService.create(inmueble);
    }
  }

  private async insertarHabitaciones() {
    const habitaciones = initialData.habitaciones;

    for (const habitacion of habitaciones) {
      await this.habitacionesService.create(habitacion);
    }
  }

  private async insertarCamas() {
    const camas = initialData.camas;

    for (const cama of camas) {
      await this.camasService.create(cama);
    }
  }
}
