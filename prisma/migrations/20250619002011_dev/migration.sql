/*
  Warnings:

  - The values [USER] on the enum `TipoUsuario` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[usuarioId]` on the table `estudiante` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId]` on the table `profesor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `estudiante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `profesor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoUsuario_new" AS ENUM ('ADMIN', 'PROFESOR', 'ESTUDIANTE');
ALTER TABLE "usuario" ALTER COLUMN "tipo" TYPE "TipoUsuario_new" USING ("tipo"::text::"TipoUsuario_new");
ALTER TYPE "TipoUsuario" RENAME TO "TipoUsuario_old";
ALTER TYPE "TipoUsuario_new" RENAME TO "TipoUsuario";
DROP TYPE "TipoUsuario_old";
COMMIT;

-- AlterTable
ALTER TABLE "estudiante" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "profesor" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "estudiante_usuarioId_key" ON "estudiante"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "profesor_usuarioId_key" ON "profesor"("usuarioId");

-- AddForeignKey
ALTER TABLE "estudiante" ADD CONSTRAINT "estudiante_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesor" ADD CONSTRAINT "profesor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
