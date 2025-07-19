import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";

interface StudentFormProps {
  studentForm: any;
  setStudentForm: (form: any) => void;
  isEditing: boolean;
  onSubmit: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ studentForm, setStudentForm, isEditing, onSubmit }) => (
  <div className="grid gap-4 py-4 bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100">
    <div className="grid gap-2">
      <Label htmlFor="nombre" className="text-gray-700 dark:text-gray-100 font-semibold">Nombre completo</Label>
      <Input
        id="nombre"
        value={studentForm.nombre}
        onChange={(e) => setStudentForm({ ...studentForm, nombre: e.target.value })}
        placeholder="Juan Pérez"
        className="border-2 border-blue-100 focus:border-blue-600 placeholder-gray-500 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 shadow-sm"
      />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="email" className="text-gray-700 dark:text-gray-100 font-semibold">Email</Label>
      <Input
        id="email"
        type="email"
        value={studentForm.email}
        onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
        placeholder="juan@ejemplo.com"
        className="border-2 border-blue-100 focus:border-blue-600 placeholder-gray-500 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 shadow-sm"
      />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="telefono" className="text-gray-700 dark:text-gray-100 font-semibold">Teléfono</Label>
      <Input
        id="telefono"
        value={studentForm.telefono}
        onChange={(e) => setStudentForm({ ...studentForm, telefono: e.target.value })}
        placeholder="123-456-7890"
        className="border-2 border-blue-100 focus:border-blue-600 placeholder-gray-500 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 shadow-sm"
      />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="edad" className="text-gray-700 dark:text-gray-100 font-semibold">Edad</Label>
      <Input
        id="edad"
        type="number"
        value={studentForm.edad}
        onChange={(e) => setStudentForm({ ...studentForm, edad: e.target.value })}
        placeholder="25"
        className="border-2 border-blue-100 focus:border-blue-600 placeholder-gray-500 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 shadow-sm"
      />
    </div>
    {!isEditing && (
      <div className="grid gap-2">
        <Label htmlFor="password" className="text-gray-700 dark:text-gray-100 font-semibold">Contraseña inicial</Label>
        <Input
          id="password"
          type="password"
          value={studentForm.password}
          onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
          placeholder="Contraseña temporal"
          className="border-2 border-blue-100 focus:border-blue-600 placeholder-gray-500 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 shadow-sm"
        />
      </div>
    )}
    <Button onClick={onSubmit}>
      {isEditing ? 'Actualizar' : 'Crear'} Estudiante
    </Button>
  </div>
);

export default StudentForm;
