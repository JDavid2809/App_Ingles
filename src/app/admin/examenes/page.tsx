"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Save,
  X,
  Search,
  Filter,
  Eye,
  Copy,
  Settings,
  ChevronRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Question {
  id?: number
  question: string
  options: string[]
  correct: number
}

interface Exam {
  id?: number
  name: string
  level: string
  active: boolean
  questions: Question[]
  createdAt?: string
  updatedAt?: string
}

interface Level {
  id_nivel: number
  nombre: string
  b_activo: boolean
}

export default function ExamManagementPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [levels, setLevels] = useState<Level[]>([])
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  // Estados para el formulario de examen
  const [examForm, setExamForm] = useState<Exam>({
    name: "",
    level: "",
    active: true,
    questions: []
  })

  // Estados para el formulario de pregunta
  const [questionForm, setQuestionForm] = useState<Question>({
    question: "",
    options: ["", "", "", ""],
    correct: 0
  })

  useEffect(() => {
    loadExams()
    loadLevels()
  }, [])

  const loadExams = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/examenes')
      if (response.ok) {
        const data = await response.json()
        setExams(data)
      }
    } catch (error) {
      console.error('Error loading exams:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los exámenes",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadLevels = async () => {
    try {
      const response = await fetch('/api/assessment/levels')
      if (response.ok) {
        const data = await response.json()
        setLevels(data)
        console.log('Niveles cargados:', data)
        
      }
    } catch (error) {
      console.error('Error loading levels:', error)
    }
  }

  const handleSaveExam = async () => {
    try {
      if (!examForm.name.trim()) {
        toast({
          title: "Error",
          description: "El nombre del examen es requerido",
          variant: "destructive",
        })
        return
      }

      if (examForm.questions.length === 0) {
        toast({
          title: "Error",
          description: "El examen debe tener al menos una pregunta",
          variant: "destructive",
        })
        return
      }

      // Encontrar el nombre del nivel basado en el id seleccionado
      const selectedLevel = levels.find((l) => l.id_nivel.toString() === examForm.level);
      const levelName = selectedLevel ? selectedLevel.nombre : '';

      const examToSend = {
        name: examForm.name,
        level: levelName, // La API espera el nombre del nivel
        active: examForm.active,
        questions: examForm.questions
      }

      const url = isEditing ? `/api/admin/examenes/${examForm.id}` : '/api/admin/examenes'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(examToSend),
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: `Examen ${isEditing ? 'actualizado' : 'creado'} correctamente`,
        })
        setIsDialogOpen(false)
        resetForm()
        loadExams()
      } else {
        throw new Error('Error al guardar el examen')
      }
    } catch (error) {
      console.error('Error saving exam:', error)
      toast({
        title: "Error",
        description: `No se pudo ${isEditing ? 'actualizar' : 'crear'} el examen`,
        variant: "destructive",
      })
    }
  }

  const handleDeleteExam = async (examId: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este examen?')) return

    try {
      const response = await fetch(`/api/admin/examenes/${examId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Examen eliminado correctamente",
        })
        loadExams()
      } else {
        throw new Error('Error al eliminar el examen')
      }
    } catch (error) {
      console.error('Error deleting exam:', error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el examen",
        variant: "destructive",
      })
    }
  }

  const handleEditExam = (exam: Exam) => {
    setExamForm(exam)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleNewExam = () => {
    resetForm()
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setExamForm({
      name: "",
      level: "",
      active: true,
      questions: []
    })
    setQuestionForm({
      question: "",
      options: ["", "", "", ""],
      correct: 0
    })
  }

  const handleAddQuestion = () => {
    if (!questionForm.question.trim()) {
      toast({
        title: "Error",
        description: "La pregunta es requerida",
        variant: "destructive",
      })
      return
    }

    if (questionForm.options.some(option => !option.trim())) {
      toast({
        title: "Error",
        description: "Todas las opciones son requeridas",
        variant: "destructive",
      })
      return
    }

    const newQuestion: Question = {
      id: Date.now() + Math.random(), // Más único que solo Date.now()
      ...questionForm
    }

    setExamForm(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }))

    setQuestionForm({
      question: "",
      options: ["", "", "", ""],
      correct: 0
    })

    toast({
      title: "Éxito",
      description: "Pregunta agregada correctamente",
    })
  }

  const handleRemoveQuestion = (questionId: number) => {
    setExamForm(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }))
  }

  const handleEditQuestion = (question: Question) => {
    setQuestionForm(question)
    handleRemoveQuestion(question.id!)
  }

  const filteredExams = exams.filter(exam =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.level.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Gestión de Exámenes</h1>
            <p className="text-slate-600 mt-1">
              Administra los exámenes de nivelación y evaluación
            </p>
          </div>
          <Button 
            onClick={handleNewExam} 
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Plus className="h-4 w-4" />
            Nuevo Examen
          </Button>
        </div>

        {/* Barra de búsqueda y filtros */}
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg border-b border-slate-200">
            <CardTitle className="text-lg text-slate-900">Filtros</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Buscar exámenes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-100">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>        {/* Lista de exámenes */}
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg border-b border-slate-200">
            <CardTitle className="text-slate-900">Exámenes ({filteredExams.length})</CardTitle>
            <CardDescription className="text-slate-700">
              Lista de todos los exámenes disponibles en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-100 hover:bg-slate-100">
                      <TableHead className="text-slate-800 font-semibold">Nombre</TableHead>
                      <TableHead className="text-slate-800 font-semibold">Nivel</TableHead>
                      <TableHead className="text-slate-800 font-semibold">Preguntas</TableHead>
                      <TableHead className="text-slate-800 font-semibold">Estado</TableHead>
                      <TableHead className="text-slate-800 font-semibold">Fecha</TableHead>
                      <TableHead className="text-right text-slate-800 font-semibold">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
              <TableBody>
                {filteredExams.map((exam) => (
                  <TableRow key={exam.id} className="hover:bg-slate-50 transition-colors duration-200 border-b border-slate-200">
                    <TableCell className="font-medium text-slate-900">{exam.name}</TableCell>
                    <TableCell className="text-slate-700">{exam.level}</TableCell>
                    <TableCell className="text-slate-700">{exam.questions.length}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={exam.active ? "default" : "secondary"}
                        className={exam.active 
                          ? "bg-green-100 text-green-800 hover:bg-green-200 border border-green-200" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                        }
                      >
                        {exam.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-700">{exam.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 text-slate-700">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border-slate-300 shadow-lg">
                          <DropdownMenuItem onClick={() => handleEditExam(exam)} className="cursor-pointer text-slate-800 hover:bg-slate-100">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedExam(exam)} className="cursor-pointer text-slate-800 hover:bg-slate-100">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-slate-800 hover:bg-slate-100">
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => exam.id && handleDeleteExam(exam.id)}
                            className="text-red-600 cursor-pointer hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
              </div>
            )}
          </CardContent>
        </Card>        {/* Dialog para crear/editar examen */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-slate-300 shadow-2xl">
            <DialogHeader className="bg-gradient-to-r from-slate-50 to-slate-100 -mx-6 -mt-6 px-6 py-4 border-b border-slate-200">
              <DialogTitle className="text-slate-900 text-xl">
                {isEditing ? "Editar Examen" : "Crear Nuevo Examen"}
              </DialogTitle>
              <DialogDescription className="text-slate-700">
                {isEditing 
                  ? "Modifica los datos del examen seleccionado" 
                  : "Completa la información para crear un nuevo examen"
                }
              </DialogDescription>
            </DialogHeader>

          <Tabs defaultValue="general" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1">
              <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:text-slate-900">
                Información General
              </TabsTrigger>
              <TabsTrigger value="questions" className="data-[state=active]:bg-white data-[state=active]:text-slate-900">
                Preguntas ({examForm.questions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-medium">Nombre del Examen</Label>
                  <Input
                    id="name"
                    value={examForm.name}
                    onChange={(e) => setExamForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Examen de Nivelación A1"
                    className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level" className="text-slate-700 font-medium">Nivel</Label>
                  <Select
                    value={examForm.level}
                    onValueChange={(value: string) => setExamForm(prev => ({ ...prev, level: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(levels) && levels.length > 0 && levels.map((level) => (
                        level && level.id_nivel !== undefined && (
                          <SelectItem key={level.id_nivel} value={level.id_nivel.toString()}>
                            {level.nombre}
                          </SelectItem>
                        )
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={examForm.active}
                  onChange={(e) => setExamForm(prev => ({ ...prev, active: e.target.checked }))}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="active" className="text-slate-700 font-medium">Examen activo</Label>
              </div>
            </TabsContent>

            <TabsContent value="questions" className="space-y-6 mt-6">
              {/* Formulario para agregar pregunta */}
              <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader className="bg-slate-50 rounded-t-lg border-b border-slate-200">
                  <CardTitle className="text-lg text-slate-900">Agregar Nueva Pregunta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="question" className="text-slate-700 font-medium">Pregunta</Label>
                    <Textarea
                      id="question"
                      value={questionForm.question}
                      onChange={(e) => setQuestionForm(prev => ({ ...prev, question: e.target.value }))}
                      placeholder="Escribe la pregunta aquí..."
                      rows={3}
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">Opciones de respuesta</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {questionForm.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <input
                            type="radio"
                            name="correct"
                            checked={questionForm.correct === index}
                            onChange={() => setQuestionForm(prev => ({ ...prev, correct: index }))}
                            className="text-blue-600 border-slate-300 focus:ring-blue-500"
                          />
                          <Input
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...questionForm.options]
                              newOptions[index] = e.target.value
                              setQuestionForm(prev => ({ ...prev, options: newOptions }))
                            }}
                            placeholder={`Opción ${index + 1}`}
                            className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-slate-600">
                      Selecciona la respuesta correcta marcando el círculo correspondiente
                    </p>
                  </div>

                  <Button onClick={handleAddQuestion} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Pregunta
                  </Button>
                </CardContent>
              </Card>

              {/* Lista de preguntas agregadas */}
              {examForm.questions.length > 0 && (
                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardHeader className="bg-slate-50 rounded-t-lg border-b border-slate-200">
                    <CardTitle className="text-lg text-slate-900">Preguntas del Examen ({examForm.questions.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {examForm.questions.map((question, index) => (
                          <Card key={question.id || `temp-${index}`} className="p-4 bg-slate-50 border-slate-200">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium mb-3 text-slate-900">
                                  {index + 1}. {question.question}
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  {question.options.map((option, optionIndex) => (
                                    <div
                                      key={`question-${question.id || index}-option-${optionIndex}`}
                                      className={`flex items-center space-x-2 p-3 rounded-lg border ${
                                        optionIndex === question.correct
                                          ? 'bg-green-100 text-green-800 border-green-200'
                                          : 'bg-white text-slate-700 border-slate-200'
                                      }`}
                                    >
                                      {optionIndex === question.correct && (
                                        <CheckCircle className="h-4 w-4" />
                                      )}
                                      <span>{option}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditQuestion(question)}
                                  className="border-slate-300 text-slate-700 hover:bg-slate-100"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoveQuestion(question.id!)}
                                  className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter className="bg-slate-50 -mx-6 -mb-6 px-6 py-4 mt-6 border-t border-slate-200">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-300 text-slate-700 hover:bg-slate-100">
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSaveExam} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? "Actualizar" : "Crear"} Examen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  )
}
