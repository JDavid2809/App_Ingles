
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 

 

const prisma = new PrismaClient();




  const hashedPassword = await bcrypt.hash("12345", 10);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre: `mia kalifa`,
        email: "mia@gmail.com",
        password: hashedPassword,
        rol: "PROFESOR",
        profesor: {
          create: {
            nombre: `mia kalifa `,
           
          
          paterno       : 'perez',
          
          materno         : 'jaj',
          curp            : 'PEJA010101HDFRRS09',
          rfc            : 'PEJA010101',
          direccion       : 'Calle Falsa 123',
          telefonos       : '555-1234',
          nivel_estudios  : 'Licenciatura',
          observaciones   : 'Profesor de matemáticas',
          b_activo     : true,

          },
        },
      },
    });

  }
