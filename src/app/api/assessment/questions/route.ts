import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Obtener el primer examen activo disponible
    const examen = await prisma.examen.findFirst({
      where: {
        b_activo: true
      },
      include: {
        pregunta: {
          include: {
            respuesta: true
          }
        }
      },
      orderBy: {
        id_examen: 'desc' // Obtener el más reciente
      }
    });

    if (!examen) {
      return NextResponse.json({ error: 'Examen no encontrado' }, { status: 404 });
    }

    // Formatear las preguntas para el frontend
    const questions = examen.pregunta.map(pregunta => ({
      id: pregunta.id_pregunta,
      question: pregunta.descripcion,
      options: pregunta.respuesta.map(respuesta => respuesta.descripcion),
      correct: pregunta.respuesta.findIndex(respuesta => respuesta.es_correcta)
    }));

    return NextResponse.json({
      examId: examen.id_examen,
      questions
    });

  } catch (error) {
    console.error('Error al obtener preguntas:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
