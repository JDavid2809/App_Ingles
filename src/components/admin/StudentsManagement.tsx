"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Eye,
  UserCheck,
  UserX,
  BookOpen,
  Calendar,
  CreditCard
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Student {
  id_estudiante: number
  nombre: string
  email: string
  telefono?: string
  edad: number
  b_activo: boolean
  usuario: {
    email: string
    nombre: string
  }
  categoria_edad?: {
    rango: string
  }
  horario: any[]
  pago: any[]
  historial_academico: any[]
}

interface Course {
  id_curso: number
  nombre: string
  modalidad: string
}

export default function StudentsManagement() {
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()

  // Estados para el formulario
  const [studentForm, setStudentForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    edad: "",
    id_categoria_edad: "",
    password: ""
  })

  useEffect(() => {
    loadStudents()
    loadCourses()
  }, [currentPage, searchTerm])

  const loadStudents = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: searchTerm
      })
      
      const response = await fetch(`/api/admin/students?${params}`)
      if (response.ok) {
        const data = await response.json()
        setStudents(data.students)
        setTotalPages(data.pagination.pages)
      }
    } catch (error) {
      console.error('Error loading students:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los estudiantes",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const loadCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses')
      if (response.ok) {
        const data = await response.json()
        setCourses(data.courses)
      }
    } catch (error) {
      console.error('Error loading courses:', error)
    }
  }

  const handleCreateStudent = async () => {
    try {
      const response = await fetch('/api/admin/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...studentForm,
          edad: parseInt(studentForm.edad),
          id_categoria_edad: studentForm.id_categoria_edad ? parseInt(studentForm.id_categoria_edad) : null
        })
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Estudiante creado correctamente"
        })
        setIsDialogOpen(false)
        resetForm()
        loadStudents()
      } else {
        throw new Error('Error creating student')
      }
    } catch (error) {
      console.error('Error creating student:', error)
      toast({
        title: "Error",
        description: "No se pudo crear el estudiante",
        variant: "destructive"
      })
    }
  }

  const handleUpdateStudent = async () => {
    if (!selectedStudent) return

    try {
      const response = await fetch(`/api/admin/students/${selectedStudent.id_estudiante}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...studentForm,
          edad: parseInt(studentForm.edad),
          id_categoria_edad: studentForm.id_categoria_edad ? parseInt(studentForm.id_categoria_edad) : null
        })
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Estudiante actualizado correctamente"
        })
        setIsDialogOpen(false)
        resetForm()
        loadStudents()
      } else {
        throw new Error('Error updating student')
      }
    } catch (error) {
      console.error('Error updating student:', error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el estudiante",
        variant: "destructive"
      })
    }
  }

  const handleDeactivateStudent = async (studentId: number) => {
    try {
      const response = await fetch(`/api/admin/students/${studentId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Estudiante desactivado correctamente"
        })
        loadStudents()
      } else {
        throw new Error('Error deactivating student')
      }
    } catch (error) {
      console.error('Error deactivating student:', error)
      toast({
        title: "Error",
        description: "No se pudo desactivar el estudiante",
        variant: "destructive"
      })
    }
  }

  const handleEnrollStudent = async (studentId: number, courseId: number) => {
    try {
      const response = await fetch('/api/admin/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId,
          courseId
        })
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Estudiante inscrito en el curso correctamente"
        })
        loadStudents()
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Error enrolling student')
      }
    } catch (error: any) {
      console.error('Error enrolling student:', error)
      toast({
        title: "Error",
        description: error.message || "No se pudo inscribir el estudiante",
        variant: "destructive"
      })
    }
  }

  const resetForm = () => {
    setStudentForm({
      nombre: "",
      email: "",
      telefono: "",
      edad: "",
      id_categoria_edad: "",
      password: ""
    })
    setSelectedStudent(null)
    setIsEditing(false)
  }

  const openEditDialog = (student: Student) => {
    setSelectedStudent(student)
    setStudentForm({
      nombre: student.nombre,
      email: student.email,
      telefono: student.telefono || "",
      edad: student.edad.toString(),
      id_categoria_edad: "",
      password: ""
    })
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const openDetailDialog = (student: Student) => {
    setSelectedStudent(student)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestión de Estudiantes</h2>
          <p className="text-muted-foreground">
            Administra la lista de estudiantes, inscripciones y seguimiento académico
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true) }}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Estudiante
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? 'Editar Estudiante' : 'Nuevo Estudiante'}
              </DialogTitle>
              <DialogDescription>
                {isEditing ? 'Modifica la información del estudiante' : 'Agrega un nuevo estudiante al sistema'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre completo</Label>
                <Input
                  id="nombre"
                  value={studentForm.nombre}
                  onChange={(e) => setStudentForm({ ...studentForm, nombre: e.target.value })}
                  placeholder="Juan Pérez"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  placeholder="juan@ejemplo.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={studentForm.telefono}
                  onChange={(e) => setStudentForm({ ...studentForm, telefono: e.target.value })}
                  placeholder="123-456-7890"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edad">Edad</Label>
                <Input
                  id="edad"
                  type="number"
                  value={studentForm.edad}
                  onChange={(e) => setStudentForm({ ...studentForm, edad: e.target.value })}
                  placeholder="25"
                />
              </div>
              {!isEditing && (
                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña inicial</Label>
                  <Input
                    id="password"
                    type="password"
                    value={studentForm.password}
                    onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                    placeholder="Contraseña temporal"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button onClick={isEditing ? handleUpdateStudent : handleCreateStudent}>
                {isEditing ? 'Actualizar' : 'Crear'} Estudiante
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Estudiantes</CardTitle>
              <CardDescription>
                Gestiona y monitorea todos los estudiantes registrados
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar estudiantes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[250px]"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
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
                  <TableCell className="font-medium">{student.nombre}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.edad} años</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {student.horario.length} curso(s)
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.b_activo ? "default" : "secondary"}>
                      {student.b_activo ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
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

          {/* Paginación */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <div className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Detalle del Estudiante */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalle del Estudiante</DialogTitle>
            <DialogDescription>
              Información completa y historial académico
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="courses">Cursos</TabsTrigger>
                <TabsTrigger value="payments">Pagos</TabsTrigger>
                <TabsTrigger value="history">Historial</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label>Nombre</Label>
                    <p className="text-sm">{selectedStudent.nombre}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <Label>Teléfono</Label>
                    <p className="text-sm">{selectedStudent.telefono || 'No especificado'}</p>
                  </div>
                  <div>
                    <Label>Edad</Label>
                    <p className="text-sm">{selectedStudent.edad} años</p>
                  </div>
                  <div>
                    <Label>Estado</Label>
                    <Badge variant={selectedStudent.b_activo ? "default" : "secondary"}>
                      {selectedStudent.b_activo ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="courses" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Cursos Inscritos</Label>
                    <Select onValueChange={(courseId) => handleEnrollStudent(selectedStudent.id_estudiante, parseInt(courseId))}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Inscribir en curso" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id_curso} value={course.id_curso.toString()}>
                            {course.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    {selectedStudent.horario.map((enrollment: any) => (
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
                    {selectedStudent.pago.slice(0, 5).map((payment: any) => (
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
                    {selectedStudent.historial_academico.slice(0, 5).map((record: any) => (
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
    </div>
  )
}
