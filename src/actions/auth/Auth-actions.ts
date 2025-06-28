
'use server'

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function registerUser(formData: FormData) {
  try {
    const entries = Object.fromEntries(formData.entries());
    const {
      nombre,
      apellido,
      email,
      telefono,
      password,
      confirmPassword,
      terms
    } = entries as {
      nombre: string;
      apellido: string;
      email: string;
      telefono: string;
      password: string;
      confirmPassword: string;
      terms?: string;
    };

    // Validación simple
    if (!nombre || !apellido || !email || !telefono || !password || !confirmPassword) {
      throw new Error("Todos los campos son obligatorios.");
    }

    if (password !== confirmPassword) {
      throw new Error("Las contraseñas no coinciden.");
    }

    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Ya existe una cuenta con este correo.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre: `${nombre} ${apellido}`,
        email,
        password: hashedPassword,
        rol: "ESTUDIANTE",
        estudiante: {
          create: {
            nombre: `${nombre} ${apellido}`,
            email,
            telefono,
            edad: 18, 
            b_activo: true,
          },
        },
      },
    });

    

    return { success: true, message: "Registro exitoso." }

  } catch (error ) {
    console.error("Error al registrar:", error);
    return { success: false, message: (error as any).message }
  }
}
