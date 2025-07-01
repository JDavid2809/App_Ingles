import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { studentId: string } }
) {
  try {
    const studentId = parseInt(params.studentId);

    if (isNaN(studentId)) {
      return NextResponse.json(
        { error: 'ID de estudiante inválido' },
        { status: 400 }
      );
    }

    // Obtener historial de resultados del estudiante
    const resultados = await prisma.resultado_examen.findMany({
      where: {
        id_estudiante: studentId
      },
      include: {
        examen: true
      },
      orderBy: {
        fecha: 'desc'
      }
    });

    const historial = resultados.map(resultado => ({
      id: resultado.id_resultado,
      examName: resultado.examen?.nombre || 'Examen',
      score: resultado.calificacion,
      date: resultado.fecha,
      level: getLevel(Number(resultado.calificacion))
    }));

    return NextResponse.json(historial);

  } catch (error) {
    console.error('Error al obtener historial:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

function getLevel(percentage: number): string {
  if (percentage >= 90) return "C2 - Proficiency";
  if (percentage >= 80) return "C1 - Advanced";
  if (percentage >= 70) return "B2 - Upper Intermediate";
  if (percentage >= 60) return "B1 - Intermediate";
  if (percentage >= 50) return "A2 - Elementary";
  if (percentage >= 40) return "A1 - Beginner";
  return "Pre-A1 - Starter";
}
