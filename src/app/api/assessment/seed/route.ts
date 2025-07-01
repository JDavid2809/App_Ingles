import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Crear nivel básico si no existe
    let nivel = await prisma.nivel.findFirst({
      where: { nombre: 'Nivel Básico' }
    });

    if (!nivel) {
      nivel = await prisma.nivel.create({
        data: {
          nombre: 'Nivel Básico',
          b_activo: true
        }
      });
    }

    // Crear examen de nivelación si no existe
    let examen = await prisma.examen.findFirst({
      where: { nombre: 'Examen de Nivelación' }
    });

    if (!examen) {
      examen = await prisma.examen.create({
        data: {
          nombre: 'Examen de Nivelación',
          id_nivel: nivel.id_nivel,
          b_activo: true
        }
      });
    }

    // Preguntas del examen
    const questions = [
      {
        question: "What is your name?",
        options: ["My name is John", "I am John", "John is my name", "All of the above"],
        correct: 3,
      },
      {
        question: "Choose the correct sentence:",
        options: ["She don't like coffee", "She doesn't like coffee", "She not like coffee", "She no like coffee"],
        correct: 1,
      },
      {
        question: "What time _____ you usually wake up?",
        options: ["do", "does", "are", "is"],
        correct: 0,
      },
      {
        question: "I _____ been to London twice.",
        options: ["have", "has", "had", "having"],
        correct: 0,
      },
      {
        question: "If I _____ you, I would study harder.",
        options: ["am", "was", "were", "be"],
        correct: 2,
      },
      {
        question: "The book _____ on the table belongs to me.",
        options: ["who", "which", "what", "where"],
        correct: 1,
      },
      {
        question: "She asked me _____ I was going to the party.",
        options: ["that", "if", "what", "when"],
        correct: 1,
      },
      {
        question: "By the time you arrive, I _____ finished my work.",
        options: ["will have", "will", "would have", "have"],
        correct: 0,
      },
      {
        question: "Choose the correct passive voice:",
        options: [
          "The house is being built by them",
          "The house is building by them", 
          "The house built by them",
          "The house building by them"
        ],
        correct: 0,
      },
      {
        question: "I wish I _____ speak French fluently.",
        options: ["can", "could", "will", "would"],
        correct: 1,
      },
    ];

    // Verificar si ya existen preguntas
    const existingQuestions = await prisma.pregunta.findMany({
      where: { id_examen: examen.id_examen }
    });

    if (existingQuestions.length > 0) {
      return NextResponse.json({ 
        message: 'Las preguntas ya existen en la base de datos',
        examId: examen.id_examen,
        questionsCount: existingQuestions.length
      });
    }

    // Crear preguntas y respuestas
    for (let i = 0; i < questions.length; i++) {
      const questionData = questions[i];
      
      const pregunta = await prisma.pregunta.create({
        data: {
          id_examen: examen.id_examen,
          descripcion: questionData.question
        }
      });

      // Crear respuestas para cada pregunta
      for (let j = 0; j < questionData.options.length; j++) {
        await prisma.respuesta.create({
          data: {
            id_pregunta: pregunta.id_pregunta,
            descripcion: questionData.options[j],
            es_correcta: j === questionData.correct
          }
        });
      }
    }

    return NextResponse.json({
      message: 'Examen de nivelación creado exitosamente',
      examId: examen.id_examen,
      questionsCreated: questions.length
    });

  } catch (error) {
    console.error('Error al crear examen:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
