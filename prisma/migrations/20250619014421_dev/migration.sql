/*
  Warnings:

  - A unique constraint covering the columns `[email_unico]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_unico_key" ON "usuario"("email_unico");
