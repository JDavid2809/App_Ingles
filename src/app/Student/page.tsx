

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

import { redirect } from "next/navigation"
import { Student } from "@/components/Student/Student";



export default async function Dashboard() {

    const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/Login");
  }

  const user = await prisma.usuario.findUnique({
    where: {
      email: session.user?.email || "",
    },
    include: {
      estudiante: true,
    },
  })
  
    
 

   return (
      <Student user={user!}/>
   )


}
