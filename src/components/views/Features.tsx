"use client"

import { BookOpen, Clock, Lightbulb, MessageCircleMore, Sparkles, Users, Zap } from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: (
      <BookOpen className="h-8 w-8" />
    ),
    title: "Método Interactivo",
    description:
      "Aprende con ejercicios dinámicos y contenido multimedia que hace el aprendizaje divertido y efectivo.",
  },
  {
    icon: (
      <Users className="h-8 w-8"/>
    ),
    title: "Clases en Vivo",
    description: "Participa en sesiones en tiempo real con profesores nativos y otros estudiantes de tu nivel.",
  },
  {
    icon: (
      <Clock className="h-8 w-8" />
    ),
    title: "Horarios Flexibles",
    description: "Estudia a tu ritmo con acceso 24/7 a la plataforma y clases en diferentes horarios.",
  },
  {
    icon: (
      <Sparkles className="h-8 w-8" />
    ),
    title: "Certificación",
    description: "Obtén un certificado reconocido internacionalmente al completar cada nivel del curso.",
  },
  {
    icon: (
      <Lightbulb className="h-8 w-8"/>
    ),
    title: "Tecnología Avanzada",
    description: "Mejora tu pronunciación con tecnología de reconocimiento de voz avanzada.",
  },
  {
    icon: (
      <MessageCircleMore className="h-8 w-8"/>
    ),
    title: "Conversación Real",
    description: "Practica conversaciones reales con hablantes nativos y otros estudiantes.",
  },
]

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <section id="features" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#e30f28]/5 rounded-full -translate-x-1/2 -translate-y-1/2 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00246a]/5 rounded-full translate-x-1/3 translate-y-1/3 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 bg-[#e30f28]/10 text-[#e30f28] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4"/>
            <span>Características Destacadas</span>
          </div>

          <h2 className="text-4xl font-bold text-[#00246a] mb-4">¿Por qué elegir nuestro curso?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre las características que hacen de nuestro método la mejor opción para aprender inglés
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  hoveredFeature === index ? "bg-[#e30f28] text-white scale-110" : "bg-[#e30f28]/10 text-[#e30f28]"
                }`}
              >
                {feature.icon}
              </div>

              <h3
                className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                  hoveredFeature === index ? "text-[#e30f28]" : "text-[#00246a]"
                }`}
              >
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
