import { useState, useEffect } from 'react';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export interface AssessmentData {
  examId: number;
  questions: Question[];
}

export interface AssessmentResult {
  resultId: number;
  score: number;
  totalQuestions: number;
  percentage: string;
  level: string;
  message: string;
}

export const useAssessment = () => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load questions from API
  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/assessment/questions');
      
      if (!response.ok) {
        throw new Error('Error al cargar las preguntas');
      }
      
      const data = await response.json();
      setAssessmentData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error loading questions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Submit assessment results
  const submitResults = async (
    studentId: number,
    score: number,
    answers: number[]
  ): Promise<AssessmentResult | null> => {
    if (!assessmentData) return null;

    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          examId: assessmentData.examId,
          score,
          totalQuestions: assessmentData.questions.length,
          answers
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los resultados');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error submitting results:', err);
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  // Get student history
  const getStudentHistory = async (studentId: number) => {
    try {
      const response = await fetch(`/api/assessment/history/${studentId}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener el historial');
      }
      
      return await response.json();
    } catch (err) {
      console.error('Error getting history:', err);
      return [];
    }
  };

  // Load questions on mount
  useEffect(() => {
    loadQuestions();
  }, []);

  // Retry loading questions
  const retryLoading = () => {
    loadQuestions();
  };

  return {
    assessmentData,
    loading,
    submitting,
    error,
    submitResults,
    getStudentHistory,
    retryLoading
  };
};
