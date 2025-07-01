const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function updateAdminPassword() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔧 Actualizando contraseña del administrador...');
    
    // Buscar el usuario admin
    const adminUser = await prisma.usuario.findFirst({
      where: {
        email: 'admin@ingles.com',
        rol: 'ADMIN'
      }
    });

    if (!adminUser) {
      console.log('❌ No se encontró el usuario administrador');
      return;
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // Actualizar la contraseña
    await prisma.usuario.update({
      where: {
        id: adminUser.id
      },
      data: {
        password: hashedPassword
      }
    });
    
    console.log('✅ Contraseña actualizada correctamente!');
    console.log('📧 Email: admin@ingles.com');
    console.log('🔐 Contraseña: admin123');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminPassword();
