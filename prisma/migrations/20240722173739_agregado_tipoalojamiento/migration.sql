/*
  Warnings:

  - You are about to drop the column `camaId` on the `Estadia` table. All the data in the column will be lost.
  - You are about to drop the column `habitacionId` on the `Estadia` table. All the data in the column will be lost.
  - You are about to drop the column `inmuebleId` on the `Estadia` table. All the data in the column will be lost.
  - Added the required column `alojamientoId` to the `Estadia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoAlojamiento` to the `Estadia` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoAlojamiento" AS ENUM ('CAMA', 'HABITACION', 'INMUEBLE_COMPLETO');

-- DropForeignKey
ALTER TABLE "Estadia" DROP CONSTRAINT "Estadia_camaId_fkey";

-- DropForeignKey
ALTER TABLE "Estadia" DROP CONSTRAINT "Estadia_habitacionId_fkey";

-- DropForeignKey
ALTER TABLE "Estadia" DROP CONSTRAINT "Estadia_inmuebleId_fkey";

-- AlterTable
ALTER TABLE "Estadia" DROP COLUMN "camaId",
DROP COLUMN "habitacionId",
DROP COLUMN "inmuebleId",
ADD COLUMN     "alojamientoId" INTEGER NOT NULL,
ADD COLUMN     "tipoAlojamiento" "TipoAlojamiento" NOT NULL;

-- AlterTable
ALTER TABLE "Reserva" ALTER COLUMN "sena" DROP NOT NULL;
