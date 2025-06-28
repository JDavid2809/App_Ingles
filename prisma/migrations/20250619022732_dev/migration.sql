/*
  Warnings:

  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email_unico` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `id_usuario` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `pass` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "estudiante" DROP CONSTRAINT "estudiante_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "profesor" DROP CONSTRAINT "profesor_usuarioId_fkey";

-- DropIndex
DROP INDEX "usuario_email_unico_key";

-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
DROP COLUMN "email_unico",
DROP COLUMN "id_usuario",
DROP COLUMN "login",
DROP COLUMN "nombre",
DROP COLUMN "pass",
ADD COLUMN     "email" VARCHAR(200),
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" VARCHAR(25),
ADD COLUMN     "password" VARCHAR(255),
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "estudiante" ADD CONSTRAINT "estudiante_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesor" ADD CONSTRAINT "profesor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
