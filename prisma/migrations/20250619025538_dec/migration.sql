/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "estudiante" DROP CONSTRAINT "estudiante_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "profesor" DROP CONSTRAINT "profesor_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "userId" SET DATA TYPE TEXT;
DROP SEQUENCE "Account_id_seq";

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Session_id_seq";

-- AlterTable
ALTER TABLE "estudiante" ALTER COLUMN "usuarioId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "profesor" ALTER COLUMN "usuarioId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "usuario_id_seq";

-- AddForeignKey
ALTER TABLE "estudiante" ADD CONSTRAINT "estudiante_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesor" ADD CONSTRAINT "profesor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
