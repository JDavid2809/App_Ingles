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
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = search ? {
      OR: [
        { nombre: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
        { telefono: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {}

    const [students, total] = await Promise.all([
      prisma.estudiante.findMany({
        where,
        include: {
          usuario: {
            select: {
              email: true,
              nombre: true
            }
          },
          categoria_edad: {
            select: {
              rango: true
            }
          },
          horario: {
            include: {
              curso: {
                select: {
                  nombre: true,
                  modalidad: true
                }
              }
            }
          },
          pago: {
            orderBy: {
              fecha_pago: 'desc'
            },
            take: 1
          },
          historial_academico: {
            orderBy: {
              fecha: 'desc'
            },
            take: 5
          }
        },
        skip,
        take: limit,
        orderBy: {
          nombre: 'asc'
        }
      }),
      prisma.estudiante.count({ where })
    ])

    return NextResponse.json({
      students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching students:', error)
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
    const { nombre, email, telefono, edad, id_categoria_edad, password } = body

    // Crear usuario primero
    const usuario = await prisma.usuario.create({
      data: {
        email,
        password, // En producción, esto debería estar hasheado
        nombre,
        rol: 'ESTUDIANTE'
      }
    })

    // Crear estudiante
    const estudiante = await prisma.estudiante.create({
      data: {
        nombre,
        email,
        telefono,
        edad,
        id_categoria_edad,
        id_usuario: usuario.id
      },
      include: {
        usuario: {
          select: {
            email: true,
            nombre: true
          }
        },
        categoria_edad: {
          select: {
            rango: true
          }
        }
      }
    })

    return NextResponse.json(estudiante, { status: 201 })
  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
