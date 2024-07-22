-- AlterTable
ALTER TABLE "Cama" ADD COLUMN     "precioPorPersona" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Habitacion" ADD COLUMN     "precioPorPersona" DOUBLE PRECISION,
ALTER COLUMN "maxPersonas" DROP NOT NULL,
ALTER COLUMN "precioPorNoche" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Inmueble" ADD COLUMN     "precioPorPersona" DOUBLE PRECISION,
ALTER COLUMN "maxPersonas" DROP NOT NULL,
ALTER COLUMN "precioPorNoche" DROP NOT NULL;
