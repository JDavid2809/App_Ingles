export default function MethodSection() {
  const steps = [
    {
      number: "01",
      title: "Evaluación Inicial",
      description: "Realizamos un examen de nivelación para conocer tu nivel actual de inglés"
    },
    {
      number: "02", 
      title: "Plan Personalizado",
      description: "Creamos un plan de estudios adaptado a tus necesidades y objetivos"
    },
    {
      number: "03",
      title: "Clases Interactivas",
      description: "Participa en clases dinámicas con actividades prácticas y conversación"
    },
    {
      number: "04",
      title: "Seguimiento Continuo",
      description: "Monitoreamos tu progreso y ajustamos el plan según tu avance"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestra Metodología
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un proceso estructurado y efectivo que te llevará al siguiente nivel
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
