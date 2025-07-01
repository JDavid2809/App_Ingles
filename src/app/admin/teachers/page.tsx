import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import TeachersManagement from "@/components/admin/TeachersManagement"

export default async function TeachersPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/Login")
  }
  
  if ((session.user as any)?.rol !== 'ADMIN') {
    redirect("/Student")
  }
  
  return <TeachersManagement />
}
