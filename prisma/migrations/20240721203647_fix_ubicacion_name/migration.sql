/*
  Warnings:

  - You are about to drop the column `ubicacionId` on the `Inmueble` table. All the data in the column will be lost.
  - You are about to drop the `Ubicacion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `alojamientoId` to the `Inmueble` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inmueble" DROP CONSTRAINT "Inmueble_ubicacionId_fkey";

-- AlterTable
ALTER TABLE "Inmueble" DROP COLUMN "ubicacionId",
ADD COLUMN     "alojamientoId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Ubicacion";

-- CreateTable
CREATE TABLE "Alojamiento" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,

    CONSTRAINT "Alojamiento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inmueble" ADD CONSTRAINT "Inmueble_alojamientoId_fkey" FOREIGN KEY ("alojamientoId") REFERENCES "Alojamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
