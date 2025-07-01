#!/usr/bin/env node

/**
 * Script para crear un usuario administrador
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('🔧 Creando usuario administrador...');

    // Verificar si ya existe un admin
    const existingAdmin = await prisma.usuario.findFirst({
      where: {
        rol: 'ADMIN'
      }
    });

    if (existingAdmin) {
      console.log('✅ Ya existe un usuario administrador:', existingAdmin.email);
      console.log('🔄 Actualizando contraseña...');
      
      // Hashear la nueva contraseña
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      // Actualizar la contraseña
      await prisma.usuario.update({
        where: {
          id: existingAdmin.id
        },
        data: {
          password: hashedPassword
        }
      });
      
      console.log('✅ Contraseña actualizada correctamente!');
      console.log('📧 Email: admin@ingles.com');
      console.log('🔐 Contraseña: admin123');
      return;
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Crear usuario administrador
    const adminUser = await prisma.usuario.create({
      data: {
        email: 'admin@ingles.com',
        password: hashedPassword,
        nombre: 'Administrador',
        rol: 'ADMIN'
      }
    });

    // Crear el perfil de administrador
    const adminProfile = await prisma.administrador.create({
      data: {
        id_usuario: adminUser.id,
        nombre: 'Administrador Principal',
        image: 'admin.jpg',
        email_unico: 'admin@ingles.com',
        b_activo: true
      }
    });

    console.log('✅ Usuario administrador creado exitosamente!');
    console.log('📧 Email: admin@ingles.com');
    console.log('🔐 Contraseña: admin123');
    console.log('');
    console.log('🚀 Ahora puedes iniciar sesión en: http://localhost:3000/Login');
    console.log('💻 Y acceder al panel de admin en: http://localhost:3000/admin');

  } catch (error) {
    console.error('❌ Error creando administrador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
