import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin/AdminDashboard"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  
  // Verificar si está autenticado
  if (!session) {
    redirect("/Login")
  }
  
  // Verificar si es admin
  if ((session.user as any)?.rol !== 'ADMIN') {
    redirect("/Student") // Redirigir a página de estudiante
  }
  
  return <AdminDashboard />
}
