"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

import { CheckCircle, Clock, Loader2 } from "lucide-react"

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface AssessmentData {
  examId: number;
  questions: Question[];
}

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Load questions from API
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/api/assessment/questions')
        if (response.ok) {
          const data = await response.json()
          setAssessmentData(data)
        } else {
          console.error('Error loading questions')
        }
      } catch (error) {
        console.error('Error loading questions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [])

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResults && assessmentData) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && assessmentData) {
      // Auto-submit when time runs out
      handleTimeUp()
    }
  }, [timeLeft, showResults, assessmentData])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleTimeUp = async () => {
    if (!assessmentData) return
    
    const correctAnswers = answers.reduce((acc, answer, index) => {
      return acc + (answer === assessmentData.questions[index].correct ? 1 : 0)
    }, 0)
    
    await submitResults(correctAnswers, answers)
  }

  const submitResults = async (finalScore: number, finalAnswers: number[]) => {
    if (!assessmentData) return

    setSubmitting(true)
    try {
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: 1, // This should come from authentication
          examId: assessmentData.examId,
          score: finalScore,
          totalQuestions: assessmentData.questions.length,
          answers: finalAnswers
        }),
      })

      if (response.ok) {
        setScore(finalScore)
        setShowResults(true)
      } else {
        console.error('Error submitting results')
      }
    } catch (error) {
      console.error('Error submitting results:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      // Restore the previously selected answer
      setSelectedAnswer(answers[currentQuestion - 1] ?? null)
    }
  }

  const handleRetakeExam = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedAnswer(null)
    setShowResults(false)
    setScore(0)
    setTimeLeft(15 * 60)
  }

  const handleNext = async () => {
    if (selectedAnswer !== null && assessmentData) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedAnswer
      setAnswers(newAnswers)

      if (currentQuestion < assessmentData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        // Calculate score and submit results
        const correctAnswers = newAnswers.reduce((acc, answer, index) => {
          return acc + (answer === assessmentData.questions[index].correct ? 1 : 0)
        }, 0)
        
        await submitResults(correctAnswers, newAnswers)
      }
    }
  }

  const getLevel = (score: number) => {
    if (!assessmentData) return "Pre-A1 - Starter"
    
    const percentage = (score / assessmentData.questions.length) * 100
    
    // Sistema de calificación más realista basado en estándares CEFR
    if (percentage >= 85) return "C2 - Proficiency"      // 85%+ = Dominio completo
    if (percentage >= 75) return "C1 - Advanced"         // 75-84% = Avanzado
    if (percentage >= 65) return "B2 - Upper Intermediate" // 65-74% = Intermedio Alto
    if (percentage >= 55) return "B1 - Intermediate"     // 55-64% = Intermedio
    if (percentage >= 40) return "A2 - Elementary"       // 40-54% = Elemental
    if (percentage >= 25) return "A1 - Beginner"         // 25-39% = Principiante
    return "Pre-A1 - Starter"                            // <25% = Pre-principiante
  }

  const getLevelDescription = (level: string) => {
    const descriptions: { [key: string]: string } = {
      "C2 - Proficiency": "Dominio excepcional del idioma. Puedes entender prácticamente todo con facilidad y expresarte de forma espontánea y precisa.",
      "C1 - Advanced": "Nivel avanzado sólido. Puedes usar el idioma de forma flexible y efectiva para propósitos académicos, profesionales y sociales.",
      "B2 - Upper Intermediate": "Intermedio alto competente. Entiendes textos complejos y puedes interactuar con fluidez con hablantes nativos.",
      "B1 - Intermediate": "Intermedio funcional. Te desenvuelves bien en situaciones cotidianas y puedes expresar opiniones y planes básicos.",
      "A2 - Elementary": "Elemental práctico. Puedes comunicarte en tareas simples y rutinarias que requieren intercambio directo de información.",
      "A1 - Beginner": "Principiante básico. Entiendes y usas expresiones familiares de uso muy frecuente y frases sencillas.",
      "Pre-A1 - Starter": "Conocimientos muy limitados. Es recomendable empezar con un curso básico desde el principio para construir una base sólida."
    }
    return descriptions[level] || ""
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold">Cargando examen...</h3>
              <p className="text-slate-600">Preparando las preguntas del examen de nivelación</p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Error state
  if (!assessmentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center">
        <Card className="p-6 text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Error</h3>
          <p className="text-slate-600 mb-4">No se pudieron cargar las preguntas del examen</p>
          <Button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </Button>
        </Card>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
        <div className="max-w-2xl mx-auto p-6">
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-slate-900">¡Examen Completado!</CardTitle>
              <CardDescription className="text-slate-700">Aquí están tus resultados del examen de nivelación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {score}/{assessmentData.questions.length}
                </div>
                <div className="text-lg text-slate-700">{((score / assessmentData.questions.length) * 100).toFixed(0)}% Correcto</div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg text-center shadow-md">
                <h3 className="text-xl font-semibold mb-2">Tu Nivel de Inglés</h3>
                <div className="text-2xl font-bold mb-2">{getLevel(score)}</div>
                <p className="text-sm opacity-90">{getLevelDescription(getLevel(score))}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800">Recomendaciones:</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Basado en tu nivel, te recomendamos comenzar con cursos {getLevel(score).split(" - ")[0]}</li>
                  <li>• Practica diariamente para mejorar tu nivel</li>
                  <li>• Considera tomar clases personalizadas</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Ver Cursos Recomendados
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 bg-white border-slate-300 text-slate-800 hover:bg-slate-50"
                  onClick={handleRetakeExam}
                >
                  Repetir Examen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-slate-900">Examen de Nivelación</CardTitle>
                <CardDescription className="text-slate-700">
                  Pregunta {currentQuestion + 1} de {assessmentData.questions.length}
                </CardDescription>
              </div>
              <div className={`flex items-center text-sm ${timeLeft <= 300 ? 'text-red-600 font-semibold' : 'text-slate-600'}`}>
                <Clock className={`h-4 w-4 mr-1 ${timeLeft <= 300 ? 'animate-pulse' : ''}`} />
                {formatTime(timeLeft)}
                {timeLeft <= 300 && <span className="ml-2 text-xs">⚠️ Tiempo limitado</span>}
              </div>
            </div>
            <Progress value={((currentQuestion + 1) / assessmentData.questions.length) * 100} className="mt-4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 text-slate-800">
                {assessmentData.questions[currentQuestion].question}
              </h3>

              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value: string) => setSelectedAnswer(Number.parseInt(value))}
              >
                {assessmentData.questions[currentQuestion].options.map((option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-slate-800">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                disabled={currentQuestion === 0}
                onClick={handlePrevious}
                className="border-slate-300 text-slate-800 hover:bg-slate-50"
              >
                Anterior
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null || submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  currentQuestion === assessmentData.questions.length - 1 ? "Finalizar" : "Siguiente"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
