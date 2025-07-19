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
  CreditCard,
  Plus,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Calendar
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Payment {
  id_pago: number
  monto: string
  fecha_pago: string
  tipo: string
  estudiante?: {
    nombre: string
    email: string
  }
  imparte: {
    curso: {
      nombre: string
    }
    profesor?: {
      nombre: string
      paterno?: string
      materno?: string
    }
  }
}

interface Student {
  id_estudiante: number
  nombre: string
  email: string
}

interface Course {
  id_imparte: number
  curso: {
    id_curso: number
    nombre: string
  }
}

export default function PaymentsManagement() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()

  // Estados para el formulario
  const [paymentForm, setPaymentForm] = useState({
    id_estudiante: "",
    id_imparte: "",
    monto: "",
    fecha_pago: "",
    tipo: "Mensualidad"
  })

  // Estados para estadísticas
  const [stats, setStats] = useState({
    totalPayments: 0,
    monthlyTotal: 0,
    pendingPayments: 0
  })

  useEffect(() => {
    loadPayments()
    loadStudents()
    loadCourses()
  }, [currentPage, searchTerm])

  const loadPayments = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      })
      
      const response = await fetch(`/api/admin/payments?${params}`)
      if (response.ok) {
        const data = await response.json()
        setPayments(data.payments)
        setTotalPages(data.pagination.pages)
        
        // Calcular estadísticas simples
        const total = data.payments.reduce((sum: number, payment: Payment) => sum + parseFloat(payment.monto), 0)
        setStats({
          totalPayments: data.payments.length,
          monthlyTotal: total,
          pendingPayments: 0 // Esto se calcularía con lógica adicional
        })
      }
    } catch (error) {
      console.error('Error loading payments:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los pagos",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const loadStudents = async () => {
    try {
      const response = await fetch('/api/admin/students?limit=100')
      if (response.ok) {
        const data = await response.json()
        setStudents(data.students)
      }
    } catch (error) {
      console.error('Error loading students:', error)
    }
  }

  const loadCourses = async () => {
    try {
      // Necesitamos obtener los cursos con sus profesores asignados (imparte)
      const response = await fetch('/api/admin/courses?limit=100')
      if (response.ok) {
        const data = await response.json()
        // Transformar para obtener las asignaciones (imparte)
        const allAssignments: Course[] = []
        data.courses.forEach((course: any) => {
          if (course.imparte) {
            course.imparte.forEach((assignment: any) => {
              allAssignments.push({
                id_imparte: assignment.id_imparte,
                curso: {
                  id_curso: course.id_curso,
                  nombre: course.nombre
                }
              })
            })
          }
        })
        setCourses(allAssignments)
      }
    } catch (error) {
      console.error('Error loading courses:', error)
    }
  }

  const handleCreatePayment = async () => {
    try {
      const response = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...paymentForm,
          id_estudiante: parseInt(paymentForm.id_estudiante),
          id_imparte: parseInt(paymentForm.id_imparte),
          monto: parseFloat(paymentForm.monto)
        })
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Pago registrado correctamente"
        })
        setIsDialogOpen(false)
        resetForm()
        loadPayments()
      } else {
        throw new Error('Error creating payment')
      }
    } catch (error) {
      console.error('Error creating payment:', error)
      toast({
        title: "Error",
        description: "No se pudo registrar el pago",
        variant: "destructive"
      })
    }
  }

  const resetForm = () => {
    setPaymentForm({
      id_estudiante: "",
      id_imparte: "",
      monto: "",
      fecha_pago: "",
      tipo: "Mensualidad"
    })
    setSelectedPayment(null)
  }

  const openDetailDialog = (payment: Payment) => {
    setSelectedPayment(payment)
    setIsDetailDialogOpen(true)
  }

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(typeof amount === 'string' ? parseFloat(amount) : amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX')
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-lg border-2 border-green-100">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-700 flex items-center gap-2">Gestión de Pagos <span className='inline-flex items-center justify-center w-7 h-7 rounded bg-green-600 text-white'><svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-2.21 0-4-1.79-4-4h2a2 2 0 004 0h2c0 2.21-1.79 4-4 4zm0-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' /></svg></span></h2>
          <p className="text-gray-500">
            Administra el historial de pagos y colegiaturas
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true) }}>
              <Plus className="mr-2 h-4 w-4" />
              Registrar Pago
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Pago</DialogTitle>
              <DialogDescription>
                Registra un pago realizado por un estudiante
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="estudiante">Estudiante</Label>
                <Select 
                  value={paymentForm.id_estudiante} 
                  onValueChange={(value) => setPaymentForm({ ...paymentForm, id_estudiante: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona estudiante" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id_estudiante} value={student.id_estudiante.toString()}>
                        {student.nombre} - {student.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="curso">Curso</Label>
                <Select 
                  value={paymentForm.id_imparte} 
                  onValueChange={(value) => setPaymentForm({ ...paymentForm, id_imparte: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id_imparte} value={course.id_imparte.toString()}>
                        {course.curso.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="monto">Monto</Label>
                <Input
                  id="monto"
                  type="number"
                  step="0.01"
                  value={paymentForm.monto}
                  onChange={(e) => setPaymentForm({ ...paymentForm, monto: e.target.value })}
                  placeholder="1500.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fecha_pago">Fecha de Pago</Label>
                <Input
                  id="fecha_pago"
                  type="date"
                  value={paymentForm.fecha_pago}
                  onChange={(e) => setPaymentForm({ ...paymentForm, fecha_pago: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo de Pago</Label>
                <Select 
                  value={paymentForm.tipo} 
                  onValueChange={(value) => setPaymentForm({ ...paymentForm, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mensualidad">Mensualidad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreatePayment}>
                Registrar Pago
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos del Mes</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPayments}</div>
            <p className="text-xs text-muted-foreground">
              Total: {formatCurrency(stats.monthlyTotal)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.monthlyTotal)}</div>
            <p className="text-xs text-muted-foreground">
              Este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">
              Por cobrar
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Historial de Pagos</CardTitle>
              <CardDescription>
                Registro completo de pagos y colegiaturas
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar pagos..."
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
                <TableHead>Estudiante</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id_pago}>
                  <TableCell className="font-medium">
                    <div>
                      <p>{payment.estudiante?.nombre}</p>
                      <p className="text-sm text-muted-foreground">{payment.estudiante?.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{payment.imparte.curso.nombre}</TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(payment.monto)}
                  </TableCell>
                  <TableCell>{formatDate(payment.fecha_pago)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{payment.tipo}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openDetailDialog(payment)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Generar Recibo
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

      {/* Dialog de Detalle del Pago */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalle del Pago</DialogTitle>
            <DialogDescription>
              Información completa del pago registrado
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="grid gap-4 py-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(selectedPayment.monto)}
                </div>
                <p className="text-sm text-muted-foreground">Monto pagado</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Estudiante</Label>
                  <p className="text-sm font-medium">{selectedPayment.estudiante?.nombre}</p>
                  <p className="text-xs text-muted-foreground">{selectedPayment.estudiante?.email}</p>
                </div>
                <div>
                  <Label>Fecha de Pago</Label>
                  <p className="text-sm">{formatDate(selectedPayment.fecha_pago)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Curso</Label>
                  <p className="text-sm">{selectedPayment.imparte.curso.nombre}</p>
                </div>
                <div>
                  <Label>Tipo de Pago</Label>
                  <Badge variant="outline">{selectedPayment.tipo}</Badge>
                </div>
              </div>
              {selectedPayment.imparte.profesor && (
                <div>
                  <Label>Profesor</Label>
                  <p className="text-sm">
                    {`${selectedPayment.imparte.profesor.nombre} ${selectedPayment.imparte.profesor.paterno || ''} ${selectedPayment.imparte.profesor.materno || ''}`.trim()}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Generar Recibo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
