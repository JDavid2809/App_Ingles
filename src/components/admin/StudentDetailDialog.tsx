import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import React from "react";

interface StudentDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: any;
  courses: any[];
  handleEnrollStudent: (studentId: number, courseId: number) => void;
}

const StudentDetailDialog: React.FC<StudentDetailDialogProps> = ({ open, onOpenChange, student, courses, handleEnrollStudent }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[600px] bg-white rounded-2xl shadow-lg border-2 border-blue-100 p-6">
      <DialogHeader>
        <DialogTitle>Detalle del Estudiante</DialogTitle>
        <DialogDescription>
          Información completa y historial académico
        </DialogDescription>
      </DialogHeader>
      {student && (
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="payments">Pagos</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>
          <TabsContent value="space-y-4 text-gray-900">
            <div className="grid gap-4 text-gray-900">
              <div>
                <Label className="text-gray-700 font-semibold">Nombre</Label>
                <p className="text-sm bg-blue-50 rounded px-2 py-1 border border-blue-100 inline-block">{student.nombre}</p>
              </div>
              <div>
                <Label className="text-gray-700 font-semibold">Email</Label>
                <p className="text-sm bg-blue-50 rounded px-2 py-1 border border-blue-100 inline-block">{student.email}</p>
              </div>
              <div>
                <Label className="text-gray-700 font-semibold">Teléfono</Label>
                <p className="text-sm bg-blue-50 rounded px-2 py-1 border border-blue-100 inline-block">{student.telefono || 'No especificado'}</p>
              </div>
              <div>
                <Label className="text-gray-700 font-semibold">Edad</Label>
                <p className="text-sm bg-blue-50 rounded px-2 py-1 border border-blue-100 inline-block">{student.edad} años</p>
              </div>
              <div>
                <Label className="text-gray-700 font-semibold">Estado</Label>
                <Badge variant={student.b_activo ? "default" : "secondary"}>
                  {student.b_activo ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="courses" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Cursos Inscritos</Label>
                <select onChange={e => handleEnrollStudent(student.id_estudiante, parseInt(e.target.value))} className="w-[200px] border rounded p-2">
                  <option value="">Inscribir en curso</option>
                  {courses.map((course) => (
                    <option key={course.id_curso} value={course.id_curso}>{course.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                {student.horario.map((enrollment: any) => (
                  <div key={enrollment.id_horario} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{enrollment.curso?.nombre}</p>
                      <p className="text-sm text-muted-foreground">{enrollment.curso?.modalidad}</p>
                    </div>
                    <Badge variant="outline">{enrollment.curso?.modalidad}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="payments" className="space-y-4">
            <div className="space-y-2">
              <Label>Historial de Pagos</Label>
              <div className="space-y-2">
                {student.pago.slice(0, 5).map((payment: any) => (
                  <div key={payment.id_pago} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">${payment.monto}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payment.fecha_pago).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">{payment.tipo}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <div className="space-y-2">
              <Label>Historial Académico</Label>
              <div className="space-y-2">
                {student.historial_academico.slice(0, 5).map((record: any) => (
                  <div key={record.id_historial} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">Calificación: {record.calificacion || 'N/A'}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.fecha ? new Date(record.fecha).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <Badge variant="outline">{record.tipo || 'General'}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </DialogContent>
  </Dialog>
);

export default StudentDetailDialog;
