import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { studentId, courseId } = body

    // Primero verificar que el estudiante y curso existen
    const [student, course] = await Promise.all([
      prisma.estudiante.findUnique({ where: { id_estudiante: studentId } }),
      prisma.curso.findUnique({ where: { id_curso: courseId } })
    ])

    if (!student || !course) {
      return NextResponse.json({ error: 'Estudiante o curso no encontrado' }, { status: 404 })
    }

    // Verificar si ya está inscrito en el curso
    const existingEnrollment = await prisma.horario.findFirst({
      where: {
        id_estudiante: studentId,
        id_curso: courseId
      }
    })

    if (existingEnrollment) {
      return NextResponse.json({ error: 'El estudiante ya está inscrito en este curso' }, { status: 400 })
    }

    // Crear la inscripción
    const enrollment = await prisma.horario.create({
      data: {
        id_estudiante: studentId,
        id_curso: courseId,
        comentario: 'Inscripción realizada por administrador'
      },
      include: {
        estudiante: {
          select: {
            nombre: true,
            email: true
          }
        },
        curso: {
          select: {
            nombre: true,
            modalidad: true
          }
        }
      }
    })

    return NextResponse.json(enrollment, { status: 201 })
  } catch (error) {
    console.error('Error enrolling student:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { studentId, courseId } = body

    // Eliminar la inscripción
    const deleted = await prisma.horario.deleteMany({
      where: {
        id_estudiante: studentId,
        id_curso: courseId
      }
    })

    if (deleted.count === 0) {
      return NextResponse.json({ error: 'Inscripción no encontrada' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Estudiante removido del curso correctamente' })
  } catch (error) {
    console.error('Error removing student from course:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
