import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const resolvedParams = await params
    const id = parseInt(resolvedParams.id)
    
    const student = await prisma.estudiante.findUnique({
      where: { id_estudiante: id },
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
                modalidad: true,
                inicio: true,
                fin: true
              }
            },
            horario_detalle: {
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
                }
              }
            }
          }
        },
        pago: {
          include: {
            imparte: {
              include: {
                curso: {
                  select: {
                    nombre: true
                  }
                }
              }
            }
          },
          orderBy: {
            fecha_pago: 'desc'
          }
        },
        historial_academico: {
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
                curso: {
                  select: {
                    nombre: true
                  }
                }
              }
            }
          },
          orderBy: {
            fecha: 'desc'
          }
        },
        resultado_examen: {
          include: {
            examen: {
              select: {
                nombre: true,
                nivel: {
                  select: {
                    nombre: true
                  }
                }
              }
            }
          },
          orderBy: {
            fecha: 'desc'
          }
        }
      }
    })

    if (!student) {
      return NextResponse.json({ error: 'Estudiante no encontrado' }, { status: 404 })
    }

    return NextResponse.json(student)
  } catch (error) {
    console.error('Error fetching student:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const resolvedParams = await params
    const id = parseInt(resolvedParams.id)
    const body = await request.json()
    const { nombre, email, telefono, edad, id_categoria_edad, b_activo } = body

    const updatedStudent = await prisma.estudiante.update({
      where: { id_estudiante: id },
      data: {
        nombre,
        email,
        telefono,
        edad,
        id_categoria_edad,
        b_activo
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

    return NextResponse.json(updatedStudent)
  } catch (error) {
    console.error('Error updating student:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.rol !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const resolvedParams = await params
    const id = parseInt(resolvedParams.id)

    // Desactivar en lugar de eliminar para mantener integridad referencial
    const deactivatedStudent = await prisma.estudiante.update({
      where: { id_estudiante: id },
      data: { b_activo: false }
    })

    return NextResponse.json({ message: 'Estudiante desactivado correctamente' })
  } catch (error) {
    console.error('Error deactivating student:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
