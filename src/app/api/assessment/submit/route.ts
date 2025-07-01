import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentId, examId, score, totalQuestions, answers } = body;

    // Validar datos requeridos
    if (!studentId || !examId || score === undefined || !totalQuestions) {
      return NextResponse.json(
        { error: 'Datos requeridos faltantes' },
        { status: 400 }
      );
    }

    // Calcular porcentaje
    const percentage = (score / totalQuestions) * 100;

    // Guardar resultado del examen
    const resultado = await prisma.resultado_examen.create({
      data: {
        id_estudiante: studentId,
        id_examen: examId,
        calificacion: percentage,
        fecha: new Date()
      }
    });

    // Determinar nivel basado en el score
    const level = getLevel(percentage);
    
    return NextResponse.json({
      resultId: resultado.id_resultado,
      score,
      totalQuestions,
      percentage: percentage.toFixed(2),
      level,
      message: 'Resultado guardado exitosamente'
    });

  } catch (error) {
    console.error('Error al guardar resultado:', error);
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
