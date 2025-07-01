import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import PaymentsManagement from "@/components/admin/PaymentsManagement"

export default async function PaymentsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/Login")
  }
  
  if ((session.user as any)?.rol !== 'ADMIN') {
    redirect("/Student")
  }
  
  return <PaymentsManagement />
}
