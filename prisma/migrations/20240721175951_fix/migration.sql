/*
  Warnings:

  - You are about to drop the column `stripeChargeId` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserva" DROP COLUMN "stripeChargeId";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "name",
ADD COLUMN     "nombre" TEXT NOT NULL;
