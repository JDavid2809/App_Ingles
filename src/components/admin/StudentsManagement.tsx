"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import StudentForm from "./StudentForm"
import StudentsTable from "./StudentsTable"
import StudentDetailDialog from "./StudentDetailDialog"

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
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-700 flex items-center gap-2">Gestión de Estudiantes <span className='inline-flex items-center justify-center w-7 h-7 rounded bg-blue-600 text-white'><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 5.87V17m0 0a4 4 0 00-3-3.87M12 17a4 4 0 013-3.87M12 17v3m0-3a4 4 0 00-3-3.87M12 17a4 4 0 013-3.87M12 17v3m0-3a4 4 0 00-3-3.87M12 17a4 4 0 013-3.87' /></svg></span></h2>
          <p className="text-gray-500">
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
            </DialogHeader>
            <StudentForm
              studentForm={studentForm}
              setStudentForm={setStudentForm}
              isEditing={isEditing}
              onSubmit={isEditing ? handleUpdateStudent : handleCreateStudent}
            />
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
          <StudentsTable
            students={students}
            openDetailDialog={openDetailDialog}
            openEditDialog={openEditDialog}
            handleDeactivateStudent={handleDeactivateStudent}
          />
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
      <StudentDetailDialog
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        student={selectedStudent}
        courses={courses}
        handleEnrollStudent={handleEnrollStudent}
      />
    </div>
  )
}
