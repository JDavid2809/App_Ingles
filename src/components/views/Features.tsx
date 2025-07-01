export default function FeaturesSection() {
  const features = [
    {
      title: "Profesores Nativos",
      description: "Aprende con profesores nativos de habla inglesa",
      icon: "👨‍🏫"
    },
    {
      title: "Clases Personalizadas",
      description: "Metodología adaptada a tu nivel y objetivos",
      icon: "🎯"
    },
    {
      title: "Horarios Flexibles",
      description: "Elige los horarios que mejor se adapten a ti",
      icon: "⏰"
    },
    {
      title: "Certificación",
      description: "Obtén certificados reconocidos internacionalmente",
      icon: "📜"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ofrecemos la mejor experiencia de aprendizaje con metodología probada y resultados garantizados
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
