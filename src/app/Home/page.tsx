import HeroSection from "@/components/hero";
import Navbar from "@/components/NavBar";
import MethodSection from "@/components/Method";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";


export default async function Home() {
 
  const session = await getServerSession(authOptions)
  console.log(session)
  

   const xd = await prisma.usuario.findFirst({
    where:{
      email: session?.user?.email ?? "",
    },
    include:{
      estudiante:true
    }
   })
   console.log("Usuario encontrado:", xd)

     if(!session) redirect('/Login')

  return (
    <div className="min-h-screen bg-white">
      
      <Navbar/>
        <HeroSection/>
        <MethodSection/>
    </div>
  );
}
