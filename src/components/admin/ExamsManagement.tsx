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
  FileText,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Save,
  X,
  Search,
  Eye,
  Copy,
  CheckCircle,
  AlertCircle,
  PlayCircle
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

export default function ExamsManagement() {
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

  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null)

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
        variant: "destructive"
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
      }
    } catch (error) {
      console.error('Error loading levels:', error)
    }
  }

  const handleCreateExam = async () => {
    try {
      const response = await fetch('/api/admin/examenes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(examForm)
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Examen creado correctamente"
        })
        setIsDialogOpen(false)
        resetForm()
        loadExams()
      } else {
        throw new Error('Error creating exam')
      }
    } catch (error) {
      console.error('Error creating exam:', error)
      toast({
        title: "Error",
        description: "No se pudo crear el examen",
        variant: "destructive"
      })
    }
  }

  const handleUpdateExam = async () => {
    if (!selectedExam?.id) return

    try {
      const response = await fetch(`/api/admin/examenes/${selectedExam.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(examForm)
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Examen actualizado correctamente"
        })
        setIsDialogOpen(false)
        resetForm()
        loadExams()
      } else {
        throw new Error('Error updating exam')
      }
    } catch (error) {
      console.error('Error updating exam:', error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el examen",
        variant: "destructive"
      })
    }
  }

  const handleDeleteExam = async (examId: number) => {
    try {
      const response = await fetch(`/api/admin/examenes/${examId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Examen eliminado correctamente"
        })
        loadExams()
      } else {
        throw new Error('Error deleting exam')
      }
    } catch (error) {
      console.error('Error deleting exam:', error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el examen",
        variant: "destructive"
      })
    }
  }

  const addQuestion = () => {
    if (questionForm.question.trim() && questionForm.options.every(opt => opt.trim())) {
      const newQuestions = [...examForm.questions, { ...questionForm }]
      setExamForm({ ...examForm, questions: newQuestions })
      resetQuestionForm()
      setIsAddingQuestion(false)
      toast({
        title: "Pregunta agregada",
        description: "La pregunta se ha agregado al examen"
      })
    } else {
      toast({
        title: "Error",
        description: "Completa todos los campos de la pregunta",
        variant: "destructive"
      })
    }
  }

  const editQuestion = (index: number) => {
    const question = examForm.questions[index]
    setQuestionForm(question)
    setEditingQuestionIndex(index)
    setIsAddingQuestion(true)
  }

  const updateQuestion = () => {
    if (editingQuestionIndex === null) return
    
    const updatedQuestions = [...examForm.questions]
    updatedQuestions[editingQuestionIndex] = { ...questionForm }
    setExamForm({ ...examForm, questions: updatedQuestions })
    resetQuestionForm()
    setIsAddingQuestion(false)
    setEditingQuestionIndex(null)
    toast({
      title: "Pregunta actualizada",
      description: "La pregunta se ha actualizado correctamente"
    })
  }

  const removeQuestion = (index: number) => {
    const updatedQuestions = examForm.questions.filter((_, i) => i !== index)
    setExamForm({ ...examForm, questions: updatedQuestions })
    toast({
      title: "Pregunta eliminada",
      description: "La pregunta se ha eliminado del examen"
    })
  }

  const resetForm = () => {
    setExamForm({
      name: "",
      level: "",
      active: true,
      questions: []
    })
    resetQuestionForm()
    setSelectedExam(null)
    setIsEditing(false)
    setIsAddingQuestion(false)
    setEditingQuestionIndex(null)
  }

  const resetQuestionForm = () => {
    setQuestionForm({
      question: "",
      options: ["", "", "", ""],
      correct: 0
    })
  }

  const openEditDialog = (exam: Exam) => {
    setSelectedExam(exam)
    setExamForm(exam)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const duplicateExam = (exam: Exam) => {
    setExamForm({
      ...exam,
      name: `${exam.name} (Copia)`,
      id: undefined
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const filteredExams = exams.filter(exam =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.level.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestión de Exámenes</h2>
          <p className="text-muted-foreground">
            Crea, edita y administra exámenes de nivelación y evaluación
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true) }}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Examen
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? 'Editar Examen' : 'Nuevo Examen'}
              </DialogTitle>
              <DialogDescription>
                {isEditing ? 'Modifica el examen existente' : 'Crea un nuevo examen para evaluación'}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] pr-4">
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Información</TabsTrigger>
                  <TabsTrigger value="questions">
                    Preguntas ({examForm.questions.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nombre del Examen</Label>
                      <Input
                        id="name"
                        value={examForm.name}
                        onChange={(e) => setExamForm({ ...examForm, name: e.target.value })}
                        placeholder="Examen de Nivelación A1"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="level">Nivel</Label>
                      <Select 
                        value={examForm.level} 
                        onValueChange={(value) => setExamForm({ ...examForm, level: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem key={level.id_nivel} value={level.nombre}>
                              {level.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="active"
                        checked={examForm.active}
                        onChange={(e) => setExamForm({ ...examForm, active: e.target.checked })}
                      />
                      <Label htmlFor="active">Examen activo</Label>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="questions" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Preguntas del Examen</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddingQuestion(true)}
                      disabled={isAddingQuestion}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Agregar Pregunta
                    </Button>
                  </div>

                  {isAddingQuestion && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          {editingQuestionIndex !== null ? 'Editar Pregunta' : 'Nueva Pregunta'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-2">
                          <Label>Pregunta</Label>
                          <Textarea
                            value={questionForm.question}
                            onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                            placeholder="Escribe la pregunta..."
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Opciones</Label>
                          {questionForm.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="correct"
                                checked={questionForm.correct === index}
                                onChange={() => setQuestionForm({ ...questionForm, correct: index })}
                              />
                              <Input
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...questionForm.options]
                                  newOptions[index] = e.target.value
                                  setQuestionForm({ ...questionForm, options: newOptions })
                                }}
                                placeholder={`Opción ${index + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={editingQuestionIndex !== null ? updateQuestion : addQuestion}
                          >
                            <Save className="mr-2 h-4 w-4" />
                            {editingQuestionIndex !== null ? 'Actualizar' : 'Agregar'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setIsAddingQuestion(false)
                              setEditingQuestionIndex(null)
                              resetQuestionForm()
                            }}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Cancelar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-2">
                    {examForm.questions.map((question, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium mb-2">{index + 1}. {question.question}</p>
                              <div className="space-y-1">
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className="flex items-center space-x-2 text-sm">
                                    {question.correct === optIndex ? (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <div className="h-4 w-4 rounded-full border border-gray-300" />
                                    )}
                                    <span className={question.correct === optIndex ? "font-medium text-green-600" : ""}>
                                      {option}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => editQuestion(index)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeQuestion(index)}
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollArea>
            <DialogFooter>
              <Button
                onClick={isEditing ? handleUpdateExam : handleCreateExam}
                disabled={!examForm.name || !examForm.level}
              >
                {isEditing ? 'Actualizar' : 'Crear'} Examen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Exámenes</CardTitle>
              <CardDescription>
                Gestiona todos los exámenes de nivelación y evaluación
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar exámenes..."
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
                <TableHead>Nivel</TableHead>
                <TableHead>Preguntas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium">{exam.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{exam.level}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="mr-1 h-4 w-4" />
                      {exam.questions.length}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={exam.active ? "default" : "secondary"}>
                      {exam.active ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {exam.createdAt ? new Date(exam.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(exam)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => duplicateExam(exam)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Vista Previa
                        </DropdownMenuItem>
                        <Separator />
                        <DropdownMenuItem 
                          onClick={() => exam.id && handleDeleteExam(exam.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
