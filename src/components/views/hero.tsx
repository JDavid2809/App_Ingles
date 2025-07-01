export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Aprende Inglés de Manera Efectiva
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Clases personalizadas con profesores nativos y metodología moderna
        </p>
        <div className="space-x-4">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Comenzar Ahora
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Saber Más
          </button>
        </div>
      </div>
    </section>
  )
}
