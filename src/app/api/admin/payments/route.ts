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

    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where: any = {}
    
    if (studentId) {
      where.id_estudiante = parseInt(studentId)
    }

    const [payments, total] = await Promise.all([
      prisma.pago.findMany({
        where,
        include: {
          estudiante: {
            select: {
              nombre: true,
              email: true
            }
          },
          imparte: {
            include: {
              curso: {
                select: {
                  nombre: true
                }
              },
              profesor: {
                select: {
                  nombre: true,
                  paterno: true,
                  materno: true
                }
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          fecha_pago: 'desc'
        }
      }),
      prisma.pago.count({ where })
    ])

    return NextResponse.json({
      payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { id_estudiante, id_imparte, monto, fecha_pago, tipo } = body

    const pago = await prisma.pago.create({
      data: {
        id_estudiante,
        id_imparte,
        monto,
        fecha_pago: new Date(fecha_pago),
        tipo
      },
      include: {
        estudiante: {
          select: {
            nombre: true,
            email: true
          }
        },
        imparte: {
          include: {
            curso: {
              select: {
                nombre: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(pago, { status: 201 })
  } catch (error) {
    console.error('Error creating payment:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
