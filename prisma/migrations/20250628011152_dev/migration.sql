-- DropForeignKey
ALTER TABLE "Administrador" DROP CONSTRAINT "Administrador_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "estudiante" DROP CONSTRAINT "estudiante_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "profesor" DROP CONSTRAINT "profesor_id_usuario_fkey";

-- AddForeignKey
ALTER TABLE "estudiante" ADD CONSTRAINT "estudiante_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesor" ADD CONSTRAINT "profesor_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
