/*
  Warnings:

  - You are about to drop the `Estadia` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `alojamientoId` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoAlojamiento` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Estadia" DROP CONSTRAINT "Estadia_reservaId_fkey";

-- AlterTable
ALTER TABLE "Reserva" ADD COLUMN     "alojamientoId" INTEGER NOT NULL,
ADD COLUMN     "tipoAlojamiento" "TipoAlojamiento" NOT NULL;

-- DropTable
DROP TABLE "Estadia";
