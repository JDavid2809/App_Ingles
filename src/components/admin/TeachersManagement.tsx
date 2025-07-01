"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  GraduationCap,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Eye,
  UserCheck,
  UserX
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Teacher {
  id_profesor: number
  nombre: string
  paterno?: string
  materno?: string
  curp?: string
  rfc?: string
  direccion?: string
  telefonos?: string
  nivel_estudios?: string
  observaciones?: string
  b_activo: boolean
  usuario: {
    email: string
    nombre: string
  }
  imparte: any[]
}

export default function TeachersManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()

  // Estados para el formulario
  const [teacherForm, setTeacherForm] = useState({
    nombre: "",
    paterno: "",
    materno: "",
    email: "",
    password: "",
    curp: "",
    rfc: "",
    direccion: "",
    telefonos: "",
    nivel_estudios: "",
    observaciones: ""
  })

  useEffect(() => {
    loadTeachers()
  }, [currentPage, searchTerm])

  const loadTeachers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: searchTerm
      })
      
      const response = await fetch(`/api/admin/teachers?${params}`)
      if (response.ok) {
        const data = await response.json()
        setTeachers(data.teachers)
        setTotalPages(data.pagination.pages)
      }
    } catch (error) {
      console.error('Error loading teachers:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los profesores",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTeacher = async () => {
    try {
      const response = await fetch('/api/admin/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacherForm)
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Profesor creado correctamente"
        })
        setIsDialogOpen(false)
        resetForm()
        loadTeachers()
      } else {
        throw new Error('Error creating teacher')
      }
    } catch (error) {
      console.error('Error creating teacher:', error)
      toast({
        title: "Error",
        description: "No se pudo crear el profesor",
        variant: "destructive"
      })
    }
  }

  const resetForm = () => {
    setTeacherForm({
      nombre: "",
      paterno: "",
      materno: "",
      email: "",
      password: "",
      curp: "",
      rfc: "",
      direccion: "",
      telefonos: "",
      nivel_estudios: "",
      observaciones: ""
    })
    setSelectedTeacher(null)
    setIsEditing(false)
  }

  const openDetailDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestión de Profesores</h2>
          <p className="text-muted-foreground">
            Administra el personal docente y sus asignaciones
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true) }}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Profesor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Nuevo Profesor</DialogTitle>
              <DialogDescription>
                Agrega un nuevo profesor al sistema
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    value={teacherForm.nombre}
                    onChange={(e) => setTeacherForm({ ...teacherForm, nombre: e.target.value })}
                    placeholder="Juan"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paterno">Apellido Paterno</Label>
                  <Input
                    id="paterno"
                    value={teacherForm.paterno}
                    onChange={(e) => setTeacherForm({ ...teacherForm, paterno: e.target.value })}
                    placeholder="Pérez"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="materno">Apellido Materno</Label>
                <Input
                  id="materno"
                  value={teacherForm.materno}
                  onChange={(e) => setTeacherForm({ ...teacherForm, materno: e.target.value })}
                  placeholder="García"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={teacherForm.email}
                  onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                  placeholder="juan@ejemplo.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña inicial</Label>
                <Input
                  id="password"
                  type="password"
                  value={teacherForm.password}
                  onChange={(e) => setTeacherForm({ ...teacherForm, password: e.target.value })}
                  placeholder="Contraseña temporal"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="curp">CURP</Label>
                  <Input
                    id="curp"
                    value={teacherForm.curp}
                    onChange={(e) => setTeacherForm({ ...teacherForm, curp: e.target.value })}
                    placeholder="CURP"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rfc">RFC</Label>
                  <Input
                    id="rfc"
                    value={teacherForm.rfc}
                    onChange={(e) => setTeacherForm({ ...teacherForm, rfc: e.target.value })}
                    placeholder="RFC"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  value={teacherForm.direccion}
                  onChange={(e) => setTeacherForm({ ...teacherForm, direccion: e.target.value })}
                  placeholder="Dirección completa"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefonos">Teléfono</Label>
                <Input
                  id="telefonos"
                  value={teacherForm.telefonos}
                  onChange={(e) => setTeacherForm({ ...teacherForm, telefonos: e.target.value })}
                  placeholder="123-456-7890"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nivel_estudios">Nivel de Estudios</Label>
                <Input
                  id="nivel_estudios"
                  value={teacherForm.nivel_estudios}
                  onChange={(e) => setTeacherForm({ ...teacherForm, nivel_estudios: e.target.value })}
                  placeholder="Licenciatura, Maestría, etc."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  value={teacherForm.observaciones}
                  onChange={(e) => setTeacherForm({ ...teacherForm, observaciones: e.target.value })}
                  placeholder="Notas adicionales"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateTeacher}>
                Crear Profesor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Profesores</CardTitle>
              <CardDescription>
                Gestiona y monitorea todo el personal docente
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar profesores..."
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
                <TableHead>Teléfono</TableHead>
                <TableHead>Cursos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id_profesor}>
                  <TableCell className="font-medium">
                    {`${teacher.nombre} ${teacher.paterno || ''} ${teacher.materno || ''}`.trim()}
                  </TableCell>
                  <TableCell>{teacher.usuario.email}</TableCell>
                  <TableCell>{teacher.telefonos || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {teacher.imparte.length} curso(s)
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={teacher.b_activo ? "default" : "secondary"}>
                      {teacher.b_activo ? "Activo" : "Inactivo"}
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
                        <DropdownMenuItem onClick={() => openDetailDialog(teacher)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
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

      {/* Dialog de Detalle del Profesor */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalle del Profesor</DialogTitle>
            <DialogDescription>
              Información completa del docente
            </DialogDescription>
          </DialogHeader>
          {selectedTeacher && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nombre Completo</Label>
                  <p className="text-sm">{`${selectedTeacher.nombre} ${selectedTeacher.paterno || ''} ${selectedTeacher.materno || ''}`.trim()}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-sm">{selectedTeacher.usuario.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>CURP</Label>
                  <p className="text-sm">{selectedTeacher.curp || 'No especificado'}</p>
                </div>
                <div>
                  <Label>RFC</Label>
                  <p className="text-sm">{selectedTeacher.rfc || 'No especificado'}</p>
                </div>
              </div>
              <div>
                <Label>Dirección</Label>
                <p className="text-sm">{selectedTeacher.direccion || 'No especificada'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Teléfono</Label>
                  <p className="text-sm">{selectedTeacher.telefonos || 'No especificado'}</p>
                </div>
                <div>
                  <Label>Nivel de Estudios</Label>
                  <p className="text-sm">{selectedTeacher.nivel_estudios || 'No especificado'}</p>
                </div>
              </div>
              <div>
                <Label>Observaciones</Label>
                <p className="text-sm">{selectedTeacher.observaciones || 'Ninguna'}</p>
              </div>
              <div>
                <Label>Cursos Asignados</Label>
                <div className="space-y-2 mt-2">
                  {selectedTeacher.imparte.map((assignment: any) => (
                    <div key={assignment.id_imparte} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">{assignment.curso?.nombre}</p>
                        <p className="text-sm text-muted-foreground">{assignment.nivel?.nombre}</p>
                      </div>
                      <Badge variant="outline">{assignment.curso?.modalidad}</Badge>
                    </div>
                  ))}
                  {selectedTeacher.imparte.length === 0 && (
                    <p className="text-sm text-muted-foreground">No tiene cursos asignados</p>
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
