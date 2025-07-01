import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Obtener estadísticas generales
    const [
      totalStudents,
      activeStudents,
      totalTeachers,
      activeTeachers,
      totalCourses,
      activeCourses,
      totalExams,
      recentPayments,
      recentEnrollments
    ] = await Promise.all([
      prisma.estudiante.count(),
      prisma.estudiante.count({ where: { b_activo: true } }),
      prisma.profesor.count(),
      prisma.profesor.count({ where: { b_activo: true } }),
      prisma.curso.count(),
      prisma.curso.count({ where: { b_activo: true } }),
      prisma.examen.count({ where: { b_activo: true } }),
      prisma.pago.findMany({
        take: 5,
        orderBy: { fecha_pago: 'desc' },
        include: {
          estudiante: {
            select: { nombre: true, email: true }
          },
          imparte: {
            include: {
              curso: {
                select: { nombre: true }
              }
            }
          }
        }
      }),
      prisma.horario.findMany({
        take: 5,
        orderBy: { id_horario: 'desc' },
        include: {
          estudiante: {
            select: { nombre: true, email: true }
          },
          curso: {
            select: { nombre: true, modalidad: true }
          }
        }
      })
    ])

    // Obtener pagos por mes (últimos 6 meses)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyPayments = await prisma.pago.groupBy({
      by: ['fecha_pago'],
      where: {
        fecha_pago: {
          gte: sixMonthsAgo
        }
      },
      _sum: {
        monto: true
      },
      _count: {
        id_pago: true
      }
    })

    // Obtener distribución de estudiantes por nivel
    const studentsByLevel = await prisma.horario.groupBy({
      by: ['id_curso'],
      _count: {
        id_estudiante: true
      }
    })

    return NextResponse.json({
      overview: {
        totalStudents,
        activeStudents,
        totalTeachers,
        activeTeachers,
        totalCourses,
        activeCourses,
        totalExams
      },
      recentActivity: {
        recentPayments,
        recentEnrollments
      },
      analytics: {
        monthlyPayments,
        studentsByLevel
      }
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
