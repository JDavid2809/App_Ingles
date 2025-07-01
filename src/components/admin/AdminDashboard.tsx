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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg font-medium">Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header mejorado */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-300/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-blue-300/30 rounded-full blur-xl"></div>
          
          <div className="flex justify-between items-center relative">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Panel de Administración
                </h1>
                <Sparkles className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-slate-600 text-lg">
                Gestión integral del sistema de enseñanza de inglés
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-500">Último acceso</p>
                <p className="font-medium text-slate-700">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                A
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg rounded-xl p-2 gap-1">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200 hover:bg-slate-100 text-xs md:text-sm"
            >
              <BarChart3 className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Resumen</span>
            </TabsTrigger>
            <TabsTrigger 
              value="students" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200 hover:bg-slate-100 text-xs md:text-sm"
            >
              <Users className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Estudiantes</span>
            </TabsTrigger>
            <TabsTrigger 
              value="teachers" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200 hover:bg-slate-100 text-xs md:text-sm"
            >
              <GraduationCap className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Profesores</span>
            </TabsTrigger>
            <TabsTrigger 
              value="courses" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200 hover:bg-slate-100 text-xs md:text-sm"
            >
              <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Cursos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="payments" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200 hover:bg-slate-100 text-xs md:text-sm"
            >
              <CreditCard className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Pagos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="exams" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-200 hover:bg-slate-100 text-xs md:text-sm"
            >
              <FileText className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Exámenes</span>
            </TabsTrigger>
          </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Stats Cards mejoradas */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Estudiantes Totales</CardTitle>
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">{stats?.overview.totalStudents || 0}</div>
                <p className="text-sm text-slate-500 mt-1">
                  {stats?.overview.activeStudents || 0} activos
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Profesores</CardTitle>
                <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">{stats?.overview.totalTeachers || 0}</div>
                <p className="text-sm text-slate-500 mt-1">
                  {stats?.overview.activeTeachers || 0} activos
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Cursos</CardTitle>
                <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">{stats?.overview.totalCourses || 0}</div>
                <p className="text-sm text-slate-500 mt-1">
                  {stats?.overview.activeCourses || 0} activos
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Exámenes</CardTitle>
                <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">{stats?.overview.totalExams || 0}</div>
                <p className="text-sm text-slate-500 mt-1">
                  Disponibles
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity mejorada */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  Pagos Recientes
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Últimos pagos registrados en el sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {stats?.recentActivity.recentPayments.slice(0, 5).map((payment: any) => (
                    <div key={payment.id_pago} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-all duration-200">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{payment.estudiante?.nombre}</p>
                        <p className="text-xs text-slate-500">
                          {payment.imparte?.curso?.nombre}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">${payment.monto}</p>
                        <p className="text-xs text-slate-500">
                          {new Date(payment.fecha_pago).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  Inscripciones Recientes
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Últimas inscripciones a cursos
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {stats?.recentActivity.recentEnrollments.slice(0, 5).map((enrollment: any) => (
                    <div key={enrollment.id_horario} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-all duration-200">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{enrollment.estudiante?.nombre}</p>
                        <p className="text-xs text-slate-500">
                          {enrollment.curso?.nombre}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border-purple-300"
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

        <TabsContent value="students" className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <StudentsManagement />
        </TabsContent>

        <TabsContent value="teachers" className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <TeachersManagement />
        </TabsContent>

        <TabsContent value="courses" className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <CoursesManagement />
        </TabsContent>

        <TabsContent value="payments" className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <PaymentsManagement />
        </TabsContent>

        <TabsContent value="exams" className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <ExamsManagement />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}
