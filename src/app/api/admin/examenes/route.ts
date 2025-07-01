import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  // Verificar autenticación de admin
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const examenes = await prisma.examen.findMany({
      include: {
        nivel: true,
        pregunta: {
          include: {
            respuesta: true
          }
        }
      },
      orderBy: {
        id_examen: 'desc'
      }
    });

    // Formatear los datos para el frontend
    const formattedExamenes = examenes.map(examen => ({
      id: examen.id_examen,
      name: examen.nombre,
      level: examen.nivel?.nombre || 'Sin nivel',
      active: examen.b_activo,
      createdAt: new Date().toLocaleDateString(), // Puedes agregar campo created_at a la BD
      questions: examen.pregunta.map(pregunta => ({
        id: pregunta.id_pregunta,
        question: pregunta.descripcion,
        options: pregunta.respuesta.map(respuesta => respuesta.descripcion),
        correct: pregunta.respuesta.findIndex(respuesta => respuesta.es_correcta)
      }))
    }));

    return NextResponse.json(formattedExamenes);

  } catch (error) {
    console.error('Error al obtener exámenes:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  // Verificar autenticación de admin
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { name, level, active, questions } = await request.json();

    // Validar datos requeridos
    if (!name || !level || !questions || questions.length === 0) {
      return NextResponse.json(
        { error: 'Datos requeridos faltantes' },
        { status: 400 }
      );
    }

    // Buscar el nivel
    const nivel = await prisma.nivel.findFirst({
      where: { nombre: level }
    });

    if (!nivel) {
      return NextResponse.json(
        { error: 'Nivel no encontrado' },
        { status: 400 }
      );
    }

    // Crear el examen
    const examen = await prisma.examen.create({
      data: {
        nombre: name,
        id_nivel: nivel.id_nivel,
        b_activo: active
      }
    });

    // Crear las preguntas y respuestas
    for (const questionData of questions) {
      const pregunta = await prisma.pregunta.create({
        data: {
          id_examen: examen.id_examen,
          descripcion: questionData.question
        }
      });

      // Crear respuestas
      for (let i = 0; i < questionData.options.length; i++) {
        await prisma.respuesta.create({
          data: {
            id_pregunta: pregunta.id_pregunta,
            descripcion: questionData.options[i],
            es_correcta: i === questionData.correct
          }
        });
      }
    }

    return NextResponse.json({
      message: 'Examen creado exitosamente',
      examId: examen.id_examen
    });

  } catch (error) {
    console.error('Error al crear examen:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
