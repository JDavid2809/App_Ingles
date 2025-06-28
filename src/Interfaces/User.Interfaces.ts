
export interface User{
  
    estudiante: {
        email: string;
        telefono: string | null;
        nombre: string;
        edad: number;
        b_activo: boolean | null;
        id_estudiante: number;
        id_categoria_edad: number | null;
        id_usuario: number;
    } | null;

}