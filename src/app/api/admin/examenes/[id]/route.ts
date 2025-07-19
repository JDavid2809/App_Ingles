import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const params = await context.params
    const examId = parseInt(params.id)
    const { name, level, active, questions } = await request.json()

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

    // Actualizar el examen
    await prisma.examen.update({
      where: { id_examen: examId },
      data: {
        nombre: name,
        id_nivel: nivel.id_nivel,
        b_activo: active
      }
    });

    // Eliminar preguntas y respuestas existentes
    const preguntasExistentes = await prisma.pregunta.findMany({
      where: { id_examen: examId }
    });

    for (const pregunta of preguntasExistentes) {
      await prisma.respuesta.deleteMany({
        where: { id_pregunta: pregunta.id_pregunta }
      });
    }

    await prisma.pregunta.deleteMany({
      where: { id_examen: examId }
    });

    // Crear las nuevas preguntas y respuestas
    for (const questionData of questions) {
      const pregunta = await prisma.pregunta.create({
        data: {
          id_examen: examId,
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
      message: 'Examen actualizado exitosamente'
    });

  } catch (error) {
    console.error('Error al actualizar examen:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const params = await context.params
    const examId = parseInt(params.id)

    // Verificar si el examen existe
    const examen = await prisma.examen.findUnique({
      where: { id_examen: examId }
    });

    if (!examen) {
      return NextResponse.json(
        { error: 'Examen no encontrado' },
        { status: 404 }
      );
    }

    // Eliminar respuestas primero
    const preguntas = await prisma.pregunta.findMany({
      where: { id_examen: examId }
    });

    for (const pregunta of preguntas) {
      await prisma.respuesta.deleteMany({
        where: { id_pregunta: pregunta.id_pregunta }
      });
    }

    // Eliminar preguntas
    await prisma.pregunta.deleteMany({
      where: { id_examen: examId }
    });

    // Eliminar examen
    await prisma.examen.delete({
      where: { id_examen: examId }
    });

    return NextResponse.json({
      message: 'Examen eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar examen:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const examId = parseInt(context.params.id);

    const examen = await prisma.examen.findUnique({
      where: { id_examen: examId },
      include: {
        nivel: true,
        pregunta: {
          include: {
            respuesta: true
          }
        }
      }
    });

    if (!examen) {
      return NextResponse.json(
        { error: 'Examen no encontrado' },
        { status: 404 }
      );
    }

    // Formatear para el frontend
    const formattedExamen = {
      id: examen.id_examen,
      name: examen.nombre,
      level: examen.nivel?.nombre || 'Sin nivel',
      active: examen.b_activo,
      questions: examen.pregunta.map(pregunta => ({
        id: pregunta.id_pregunta,
        question: pregunta.descripcion,
        options: pregunta.respuesta.map(respuesta => respuesta.descripcion),
        correct: pregunta.respuesta.findIndex(respuesta => respuesta.es_correcta)
      }))
    };

    return NextResponse.json(formattedExamen);

  } catch (error) {
    console.error('Error al obtener examen:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
