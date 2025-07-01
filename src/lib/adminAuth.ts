import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function adminAuth() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return { authorized: false, error: 'No autenticado' }
  }
  
  // Verificar si el usuario es administrador/profesor
  if ((session.user as any)?.rol !== 'PROFESOR' && (session.user as any)?.rol !== 'ADMIN') {
    return { authorized: false, error: 'Acceso denegado - Solo administradores' }
  }
  
  return { authorized: true, user: session.user }
}

export async function requireAdmin() {
  const auth = await adminAuth()
  
  if (!auth.authorized) {
    return NextResponse.json(
      { error: auth.error }, 
      { status: 401 }
    )
  }
  
  return null // No error, continuar
}
