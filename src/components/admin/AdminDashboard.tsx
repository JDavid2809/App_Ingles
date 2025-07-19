"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  CreditCard, 
  TrendingUp,
  UserPlus,
  Settings,
  FileText,
  Calendar,
  BarChart3,
  Sparkles,
  Shield
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import StudentsManagement from "@/components/admin/StudentsManagement"
import TeachersManagement from "@/components/admin/TeachersManagement"
import CoursesManagement from "@/components/admin/CoursesManagement"
import PaymentsManagement from "@/components/admin/PaymentsManagement"
import ExamsManagement from "@/components/admin/ExamsManagement"

interface DashboardStats {
  overview: {
    totalStudents: number
    activeStudents: number
    totalTeachers: number
    activeTeachers: number
    totalCourses: number
    activeCourses: number
    totalExams: number
  }
  recentActivity: {
    recentPayments: any[]
    recentEnrollments: any[]
  }
  analytics: {
    monthlyPayments: any[]
    studentsByLevel: any[]
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/dashboard')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        throw new Error('Error loading dashboard data')
      }
    } catch (error) {
      console.error('Error loading dashboard:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos del panel",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e30f28]/5 via-white to-[#00246a]/5 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20">
          <div className="w-16 h-16 border-4 border-[#e30f28] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#00246a] text-lg font-medium">Cargando panel de administración...</p>
      </div>
    </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e30f28]/5 via-white to-[#00246a]/5">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header mejorado */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-[#e30f28]/20 p-8 relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e30f28]/20 to-[#00246a]/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#00246a]/20 to-[#e30f28]/20 rounded-full blur-xl"></div>
          
          <div className="flex justify-between items-center relative">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-[#e30f28] to-[#00246a] rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#e30f28] via-[#00246a] to-[#e30f28] bg-clip-text text-transparent">
                  Panel de Administración
                </h1>
                <Sparkles className="h-6 w-6 text-[#e30f28]" />
              </div>
                <p className="text-[#00246a] text-lg">
                Gestión integral del sistema de enseñanza de inglés
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Último acceso</p>
                <p className="font-medium text-[#00246a]">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-[#e30f28] to-[#00246a] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                A
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="[&_[role=tablist]]:bg-gradient-to-r [&_[role=tablist]]:from-[#e30f28]/10 [&_[role=tablist]]:to-[#00246a]/10 [&_[role=tablist]]:rounded-xl [&_[role=tablist]]:p-1 [&_[role=tablist]]:border [&_[role=tablist]]:border-[#e30f28]/20">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Estudiantes
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Profesores
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Cursos
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Pagos
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Exámenes
            </TabsTrigger>
          </TabsList>
        <TabsContent value="overview" className="space-y-8">
          {/* Stats Cards mejoradas */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-[#e30f28]/5 via-[#e30f28]/10 to-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-[#e30f28]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#00246a] flex items-center gap-2"><span>Estudiantes Totales</span><span className='inline-flex items-center justify-center w-6 h-6 rounded bg-[#e30f28] text-white'><Users className='h-4 w-4'/></span></CardTitle>
                {/* Ícono ahora está en el título */}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#00246a]">{stats?.overview.totalStudents || 0}</div>
                <p className="text-sm text-gray-500 mt-1">
                  {stats?.overview.activeStudents || 0} activos
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#00246a]/5 via-[#00246a]/10 to-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-[#00246a]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#00246a] flex items-center gap-2"><span>Profesores</span><span className='inline-flex items-center justify-center w-6 h-6 rounded bg-[#00246a] text-white'><GraduationCap className='h-4 w-4'/></span></CardTitle>
                {/* Ícono ahora está en el título */}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#00246a]">{stats?.overview.totalTeachers || 0}</div>
                <p className="text-sm text-gray-500 mt-1">
                  {stats?.overview.activeTeachers || 0} activos
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#e30f28]/5 via-[#e30f28]/10 to-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-[#e30f28]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#00246a] flex items-center gap-2"><span>Cursos</span><span className='inline-flex items-center justify-center w-6 h-6 rounded bg-[#e30f28] text-white'><BookOpen className='h-4 w-4'/></span></CardTitle>
                {/* Ícono ahora está en el título */}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#00246a]">{stats?.overview.totalCourses || 0}</div>
                <p className="text-sm text-gray-500 mt-1">
                  {stats?.overview.activeCourses || 0} activos
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#00246a]/5 via-[#00246a]/10 to-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-[#00246a]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#00246a] flex items-center gap-2"><span>Exámenes</span><span className='inline-flex items-center justify-center w-6 h-6 rounded bg-[#00246a] text-white'><FileText className='h-4 w-4'/></span></CardTitle>
                {/* Ícono ahora está en el título */}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#00246a]">{stats?.overview.totalExams || 0}</div>
                <p className="text-sm text-gray-500 mt-1">
                  Disponibles
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity mejorada */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-white/80 backdrop-blur-sm border border-green-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <div className="p-2 bg-gradient-to-r from-green-700 to-green-800 rounded-lg">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  Pagos Recientes
                </CardTitle>
                <CardDescription className="text-gray-700">
                  Últimos pagos registrados en el sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {stats?.recentActivity.recentPayments.slice(0, 5).map((payment: any) => (
                    <div key={payment.id_pago} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{payment.estudiante?.nombre}</p>
                        <p className="text-xs text-gray-500">
                          {payment.imparte?.curso?.nombre}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-700">${payment.monto}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(payment.fecha_pago).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white/80 backdrop-blur-sm border border-blue-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <div className="p-2 bg-gradient-to-r from-blue-700 to-blue-800 rounded-lg">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  Inscripciones Recientes
                </CardTitle>
                <CardDescription className="text-gray-700">
                  Últimas inscripciones a cursos
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {stats?.recentActivity.recentEnrollments.slice(0, 5).map((enrollment: any) => (
                    <div key={enrollment.id_horario} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{enrollment.estudiante?.nombre}</p>
                        <p className="text-xs text-gray-500">
                          {enrollment.curso?.nombre}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 text-purple-900 border border-purple-300 shadow-sm"
                      >
                        {enrollment.curso?.modalidad}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blue-200">
          <StudentsManagement />
        </TabsContent>

        <TabsContent value="teachers" className="bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-green-200">
          <TeachersManagement />
        </TabsContent>

        <TabsContent value="courses" className="bg-gradient-to-br from-purple-50 via-purple-100 to-indigo-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-200">
          <CoursesManagement />
        </TabsContent>

        <TabsContent value="payments" className="bg-gradient-to-br from-emerald-50 via-green-100 to-green-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-green-200">
          <PaymentsManagement />
        </TabsContent>

        <TabsContent value="exams" className="bg-gradient-to-br from-orange-50 via-orange-100 to-yellow-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-orange-200">
          <ExamsManagement />
        </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
