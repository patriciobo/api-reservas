interface AlojamientoSeed {
  nombre: string;
  direccion: string;
  ciudad: string;
  provincia: string;
}

interface InmuebleSeed {
  nombre: string;
  maxPersonas?: number;
  precioPorNoche?: number;
  precioPorMes?: number;
  precioPorPersona?: number;
  alojamientoId: number;
}

interface HabitacionSeed {
  nombre: string;
  maxPersonas?: number;
  precioPorNoche?: number;
  precioPorMes?: number;
  precioPorPersona?: number;
  inmuebleId: number;
}

interface CamaSeed {
  nombre: string;
  maxPersonas?: number;
  precioPorNoche: number;
  precioPorMes?: number;
  precioPorPersona?: number;
  habitacionId: number;
}

interface SeedData {
  alojamientos: AlojamientoSeed[];
  inmuebles: InmuebleSeed[];
  habitaciones: HabitacionSeed[];
  camas: CamaSeed[];
}

export const initialData: SeedData = {
  alojamientos: [
    {
      //id: 1
      nombre: 'Hostel Villa Margarita',
      direccion: 'Parana 1169',
      ciudad: 'Capilla del Monte',
      provincia: 'Córdoba',
    },
    {
      //id: 2
      nombre: 'Cabañas Alto las Flores',
      direccion: 'Julio Cortazar S/N',
      ciudad: 'Santa Rosa de Calamuchita',
      provincia: 'Córdoba',
    },
    {
      //id: 3
      nombre: 'Edificio Venezia 8',
      direccion: 'Lima 1169',
      ciudad: 'Cordoba',
      provincia: 'Córdoba',
    },
  ],

  inmuebles: [
    {
      //id: 1
      nombre: 'Casa Principal',
      alojamientoId: 1,
    },
    {
      //id: 2
      nombre: 'Cabaña 1',
      precioPorNoche: 50,
      precioPorPersona: 15,
      maxPersonas: 6,
      alojamientoId: 2,
    },
    {
      //id: 3
      nombre: 'Cabaña 2',
      precioPorNoche: 50,
      precioPorPersona: 15,
      maxPersonas: 6,
      alojamientoId: 2,
    },
    {
      //id: 4
      nombre: 'Cabaña 3',
      precioPorNoche: 50,
      precioPorPersona: 15,
      maxPersonas: 6,
      alojamientoId: 2,
    },
    {
      //id: 5
      nombre: 'Cabaña 4',
      precioPorNoche: 50,
      precioPorPersona: 15,
      maxPersonas: 6,
      alojamientoId: 2,
    },
    {
      //id: 6
      nombre: 'Depto 2F',
      precioPorNoche: 20,
      precioPorPersona: 12,
      maxPersonas: 3,
      alojamientoId: 3,
    },
  ],

  habitaciones: [
    {
      //id: 1
      nombre: 'Habitacion Privada',
      precioPorNoche: 30,
      precioPorPersona: 15,
      maxPersonas: 3,
      inmuebleId: 1,
    },
    {
      //id: 2
      nombre: 'Habitacion Compartida 1',
      inmuebleId: 1,
    },
    {
      //id: 3
      nombre: 'Habitacion Compartida 2',
      inmuebleId: 1,
    },
  ],
  camas: [
    {
      //id: 1
      nombre: 'Cama 1',
      precioPorNoche: 8,
      maxPersonas: 1,
      habitacionId: 2,
    },
    {
      //id: 2
      nombre: 'Cama 2',
      precioPorNoche: 8,
      maxPersonas: 1,
      habitacionId: 2,
    },
    {
      //id: 3
      nombre: 'Cama 3',
      precioPorNoche: 8,
      maxPersonas: 1,
      habitacionId: 2,
    },
    {
      //id: 4
      nombre: 'Cama 4',
      precioPorNoche: 8,
      maxPersonas: 1,
      habitacionId: 2,
    },
    {
      //id: 5
      nombre: 'Cama 1',
      precioPorNoche: 8,
      maxPersonas: 1,
      habitacionId: 3,
    },
    {
      //id: 6
      nombre: 'Cama 2',
      precioPorNoche: 8,
      maxPersonas: 1,
      habitacionId: 3,
    },
    {
      //id: 7
      nombre: 'Cama 3',
      precioPorNoche: 8,
      maxPersonas: 1,
      habitacionId: 3,
    },
    {
      //id: 8
      nombre: 'Cama 4',
      precioPorNoche: 8,
      maxPersonas: 1,
      habitacionId: 3,
    },
  ],
};
