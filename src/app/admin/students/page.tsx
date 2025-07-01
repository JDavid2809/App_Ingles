import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import StudentsManagement from "@/components/admin/StudentsManagement"

export default async function StudentsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/Login")
  }
  
  if ((session.user as any)?.rol !== 'ADMIN') {
    redirect("/Student")
  }
  
  return <StudentsManagement />
}
