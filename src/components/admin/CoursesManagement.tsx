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
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Eye,
  Calendar,
  Users
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Course {
  id_curso: number
  nombre: string
  modalidad: string
  inicio?: string
  fin?: string
  b_activo: boolean
  imparte: any[]
  horario: any[]
}

export default function CoursesManagement() {
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [modalityFilter, setModalityFilter] = useState("TODAS")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()

  // Estados para el formulario
  const [courseForm, setCourseForm] = useState({
    nombre: "",
    modalidad: "",
    inicio: "",
    fin: ""
  })

  useEffect(() => {
    loadCourses()
  }, [currentPage, searchTerm, modalityFilter])

  const loadCourses = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: searchTerm,
        modalidad: modalityFilter === "TODAS" ? "" : modalityFilter
      })
      
      const response = await fetch(`/api/admin/courses?${params}`)
      if (response.ok) {
        const data = await response.json()
        setCourses(data.courses)
        setTotalPages(data.pagination.pages)
      }
    } catch (error) {
      console.error('Error loading courses:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los cursos",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCourse = async () => {
    try {
      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseForm)
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Curso creado correctamente"
        })
        setIsDialogOpen(false)
        resetForm()
        loadCourses()
      } else {
        throw new Error('Error creating course')
      }
    } catch (error) {
      console.error('Error creating course:', error)
      toast({
        title: "Error",
        description: "No se pudo crear el curso",
        variant: "destructive"
      })
    }
  }

  const resetForm = () => {
    setCourseForm({
      nombre: "",
      modalidad: "",
      inicio: "",
      fin: ""
    })
    setSelectedCourse(null)
    setIsEditing(false)
  }

  const openDetailDialog = (course: Course) => {
    setSelectedCourse(course)
    setIsDetailDialogOpen(true)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No definida'
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestión de Cursos</h2>
          <p className="text-muted-foreground">
            Administra los cursos disponibles y su contenido académico
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true) }}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Curso
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nuevo Curso</DialogTitle>
              <DialogDescription>
                Crea un nuevo curso en el sistema
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre del Curso</Label>
                <Input
                  id="nombre"
                  value={courseForm.nombre}
                  onChange={(e) => setCourseForm({ ...courseForm, nombre: e.target.value })}
                  placeholder="Inglés Básico A1"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modalidad">Modalidad</Label>
                <Select 
                  value={courseForm.modalidad} 
                  onValueChange={(value) => setCourseForm({ ...courseForm, modalidad: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona modalidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRESENCIAL">Presencial</SelectItem>
                    <SelectItem value="ONLINE">En línea</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="inicio">Fecha de Inicio</Label>
                <Input
                  id="inicio"
                  type="date"
                  value={courseForm.inicio}
                  onChange={(e) => setCourseForm({ ...courseForm, inicio: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fin">Fecha de Fin</Label>
                <Input
                  id="fin"
                  type="date"
                  value={courseForm.fin}
                  onChange={(e) => setCourseForm({ ...courseForm, fin: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateCourse}>
                Crear Curso
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Cursos</CardTitle>
              <CardDescription>
                Gestiona y monitorea todos los cursos disponibles
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={modalityFilter} onValueChange={setModalityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Modalidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODAS">Todas</SelectItem>
                  <SelectItem value="PRESENCIAL">Presencial</SelectItem>
                  <SelectItem value="ONLINE">En línea</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cursos..."
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
                <TableHead>Modalidad</TableHead>
                <TableHead>Fechas</TableHead>
                <TableHead>Estudiantes</TableHead>
                <TableHead>Profesores</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id_curso}>
                  <TableCell className="font-medium">{course.nombre}</TableCell>
                  <TableCell>
                    <Badge variant={course.modalidad === 'PRESENCIAL' ? 'default' : 'secondary'}>
                      {course.modalidad}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Inicio: {formatDate(course.inicio)}</div>
                      <div>Fin: {formatDate(course.fin)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {course.horario?.length || 0}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {course.imparte?.length || 0} profesor(es)
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={course.b_activo ? "default" : "secondary"}>
                      {course.b_activo ? "Activo" : "Inactivo"}
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
                        <DropdownMenuItem onClick={() => openDetailDialog(course)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          Horarios
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
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

      {/* Dialog de Detalle del Curso */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalle del Curso</DialogTitle>
            <DialogDescription>
              Información completa del curso y estudiantes inscritos
            </DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nombre del Curso</Label>
                  <p className="text-sm font-medium">{selectedCourse.nombre}</p>
                </div>
                <div>
                  <Label>Modalidad</Label>
                  <Badge variant={selectedCourse.modalidad === 'PRESENCIAL' ? 'default' : 'secondary'}>
                    {selectedCourse.modalidad}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha de Inicio</Label>
                  <p className="text-sm">{formatDate(selectedCourse.inicio)}</p>
                </div>
                <div>
                  <Label>Fecha de Fin</Label>
                  <p className="text-sm">{formatDate(selectedCourse.fin)}</p>
                </div>
              </div>
              <div>
                <Label>Profesores Asignados</Label>
                <div className="space-y-2 mt-2">
                  {selectedCourse.imparte?.map((assignment: any) => (
                    <div key={assignment.id_imparte} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">
                          {`${assignment.profesor?.nombre} ${assignment.profesor?.paterno || ''} ${assignment.profesor?.materno || ''}`.trim()}
                        </p>
                        <p className="text-sm text-muted-foreground">{assignment.nivel?.nombre}</p>
                      </div>
                      <Badge variant="outline">{assignment.tipo}</Badge>
                    </div>
                  )) || []}
                  {(!selectedCourse.imparte || selectedCourse.imparte.length === 0) && (
                    <p className="text-sm text-muted-foreground">No hay profesores asignados</p>
                  )}
                </div>
              </div>
              <div>
                <Label>Estudiantes Inscritos ({selectedCourse.horario?.length || 0})</Label>
                <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                  {selectedCourse.horario?.map((enrollment: any) => (
                    <div key={enrollment.id_horario} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">{enrollment.estudiante?.nombre}</p>
                        <p className="text-sm text-muted-foreground">{enrollment.estudiante?.email}</p>
                      </div>
                    </div>
                  )) || []}
                  {(!selectedCourse.horario || selectedCourse.horario.length === 0) && (
                    <p className="text-sm text-muted-foreground">No hay estudiantes inscritos</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
