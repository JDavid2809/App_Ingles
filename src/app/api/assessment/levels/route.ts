import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const niveles = await prisma.nivel.findMany({
      where: {
        b_activo: true
      },
      orderBy: {
        id_nivel: 'asc'
      }
    });

    return NextResponse.json(niveles);

  } catch (error) {
    console.error('Error al obtener niveles:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
