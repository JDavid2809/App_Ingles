import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import CoursesManagement from "@/components/admin/CoursesManagement"

export default async function CoursesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/Login")
  }
  
  if ((session.user as any)?.rol !== 'ADMIN') {
    redirect("/Student")
  }
  
  return <CoursesManagement />
}
