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

    const categorias = await prisma.categoria_edad.findMany({
      where: { b_activo: true },
      orderBy: { rango: 'asc' }
    })

    return NextResponse.json(categorias)
  } catch (error) {
    console.error('Error fetching age categories:', error)
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
    const { rango } = body

    const categoria = await prisma.categoria_edad.create({
      data: { rango }
    })

    return NextResponse.json(categoria, { status: 201 })
  } catch (error) {
    console.error('Error creating age category:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
