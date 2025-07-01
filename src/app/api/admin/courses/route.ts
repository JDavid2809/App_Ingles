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
    const modalidad = searchParams.get('modalidad') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where: any = {}
    
    if (search) {
      where.nombre = { contains: search, mode: 'insensitive' }
    }
    
    if (modalidad) {
      where.modalidad = modalidad
    }

    const [courses, total] = await Promise.all([
      prisma.curso.findMany({
        where,
        include: {
          imparte: {
            include: {
              profesor: {
                select: {
                  nombre: true,
                  paterno: true,
                  materno: true
                }
              },
              nivel: {
                select: {
                  nombre: true
                }
              }
            }
          },
          horario: {
            include: {
              estudiante: {
                select: {
                  id_estudiante: true,
                  nombre: true,
                  email: true
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
      prisma.curso.count({ where })
    ])

    return NextResponse.json({
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
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
    const { nombre, modalidad, inicio, fin } = body

    const curso = await prisma.curso.create({
      data: {
        nombre,
        modalidad,
        inicio: inicio ? new Date(inicio) : null,
        fin: fin ? new Date(fin) : null
      }
    })

    return NextResponse.json(curso, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
