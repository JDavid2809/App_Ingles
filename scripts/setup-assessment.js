#!/usr/bin/env node

/**
 * Script de inicialización para la API de Assessment
 * Ejecuta las migraciones de Prisma y pobla la base de datos con datos de prueba
 */

const { execSync } = require('child_process');

console.log('🚀 Iniciando configuración de la API de Assessment...\n');

try {
  // 1. Generar cliente de Prisma
  console.log('📦 Generando cliente de Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // 2. Aplicar migraciones
  console.log('\n🗄️ Aplicando migraciones de base de datos...');
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
  
  // 3. Verificar la conexión a la base de datos
  console.log('\n🔍 Verificando conexión a la base de datos...');
  execSync('npx prisma db pull', { stdio: 'inherit' });
  
  console.log('\n✅ Configuración completada exitosamente!');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Inicia el servidor: npm run dev');
  console.log('2. Pobla la base de datos: POST http://localhost:3000/api/assessment/seed');
  console.log('3. Visita el examen: http://localhost:3000/assessment');
  
} catch (error) {
  console.error('\n❌ Error durante la configuración:', error.message);
  console.log('\n🔧 Solución sugerida:');
  console.log('1. Verifica que PostgreSQL esté ejecutándose');
  console.log('2. Revisa la variable DATABASE_URL en .env');
  console.log('3. Asegúrate de que la base de datos existe');
  process.exit(1);
}
