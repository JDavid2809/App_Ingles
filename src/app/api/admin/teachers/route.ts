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
        { paterno: { contains: search, mode: 'insensitive' as const } },
        { materno: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {}

    const [teachers, total] = await Promise.all([
      prisma.profesor.findMany({
        where,
        include: {
          usuario: {
            select: {
              email: true,
              nombre: true
            }
          },
          imparte: {
            include: {
              curso: {
                select: {
                  nombre: true,
                  modalidad: true
                }
              },
              nivel: {
                select: {
                  nombre: true
                }
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          nombre: 'asc'
        }
      }),
      prisma.profesor.count({ where })
    ])

    return NextResponse.json({
      teachers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching teachers:', error)
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
    const { 
      nombre, 
      paterno, 
      materno, 
      email, 
      password,
      curp, 
      rfc, 
      direccion, 
      telefonos, 
      nivel_estudios, 
      observaciones 
    } = body

    // Crear usuario primero
    const usuario = await prisma.usuario.create({
      data: {
        email,
        password, // En producción, esto debería estar hasheado
        nombre: `${nombre} ${paterno} ${materno}`,
        rol: 'PROFESOR'
      }
    })

    // Crear profesor
    const profesor = await prisma.profesor.create({
      data: {
        nombre,
        paterno,
        materno,
        curp,
        rfc,
        direccion,
        telefonos,
        nivel_estudios,
        observaciones,
        id_usuario: usuario.id
      },
      include: {
        usuario: {
          select: {
            email: true,
            nombre: true
          }
        }
      }
    })

    return NextResponse.json(profesor, { status: 201 })
  } catch (error) {
    console.error('Error creating teacher:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
