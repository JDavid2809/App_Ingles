/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `estudiante` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `profesor` table. All the data in the column will be lost.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `b_activo` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `usuario` table. All the data in the column will be lost.
  - The `id` column on the `usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_usuario]` on the table `estudiante` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_usuario]` on the table `profesor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_usuario` to the `estudiante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `profesor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'PROFESOR', 'ESTUDIANTE');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "estudiante" DROP CONSTRAINT "estudiante_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "profesor" DROP CONSTRAINT "profesor_usuarioId_fkey";

-- DropIndex
DROP INDEX "estudiante_usuarioId_key";

-- DropIndex
DROP INDEX "profesor_usuarioId_key";

-- AlterTable
ALTER TABLE "estudiante" DROP COLUMN "usuarioId",
ADD COLUMN     "id_usuario" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "profesor" DROP COLUMN "usuarioId",
ADD COLUMN     "id_usuario" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
DROP COLUMN "b_activo",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "tipo",
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "rol" "Rol" NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "password" SET DATA TYPE TEXT,
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropEnum
DROP TYPE "TipoUsuario";

-- CreateTable
CREATE TABLE "Administrador" (
    "id_administrador" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "nombre" VARCHAR(25),
    "image" VARCHAR(50) NOT NULL,
    "email_unico" VARCHAR(200),
    "b_activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id_administrador")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_id_usuario_key" ON "Administrador"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "estudiante_id_usuario_key" ON "estudiante"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "profesor_id_usuario_key" ON "profesor"("id_usuario");

-- AddForeignKey
ALTER TABLE "estudiante" ADD CONSTRAINT "estudiante_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesor" ADD CONSTRAINT "profesor_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
