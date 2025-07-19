import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, UserX } from "lucide-react";
import React from "react";

interface StudentsTableProps {
  students: any[];
  openDetailDialog: (student: any) => void;
  openEditDialog: (student: any) => void;
  handleDeactivateStudent: (id: number) => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({ students, openDetailDialog, openEditDialog, handleDeactivateStudent }) => (
  <Table className="rounded-2xl overflow-hidden border-2 border-blue-100 shadow-lg bg-white">
    <TableHeader>
      <TableRow>
        <TableHead>Nombre</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Edad</TableHead>
        <TableHead>Cursos</TableHead>
        <TableHead>Estado</TableHead>
        <TableHead>Acciones</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {students.map((student) => (
        <TableRow key={student.id_estudiante}>
          <TableCell className="font-medium text-gray-900 bg-blue-50 border-b-2 border-blue-100">{student.nombre}</TableCell>
          <TableCell className="bg-blue-50 border-b-2 border-blue-100">{student.email}</TableCell>
          <TableCell className="bg-blue-50 border-b-2 border-blue-100">{student.edad} años</TableCell>
          <TableCell className="bg-blue-50 border-b-2 border-blue-100">
            <Badge variant="secondary">
              {student.horario.length} curso(s)
            </Badge>
          </TableCell>
          <TableCell className="bg-blue-50 border-b-2 border-blue-100">
            <Badge variant={student.b_activo ? "default" : "secondary"}>
              {student.b_activo ? "Activo" : "Inactivo"}
            </Badge>
          </TableCell>
          <TableCell className="bg-blue-50 border-b-2 border-blue-100">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openDetailDialog(student)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalle
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openEditDialog(student)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleDeactivateStudent(student.id_estudiante)}
                  className="text-red-600"
                >
                  <UserX className="mr-2 h-4 w-4" />
                  Desactivar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default StudentsTable;
