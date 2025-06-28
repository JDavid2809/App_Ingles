"use client"
export const LoginLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
    <div className="flex flex-col items-center space-y-6 animate-fade-in">
      {/* Spinner tipo cometa */}
      <div className="w-24 h-24 border-8 border-t-indigo-600 border-b-purple-500 border-l-transparent border-r-transparent rounded-full animate-spin shadow-xl"></div>

      {/* Texto con gradiente animado */}
      <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-pulse tracking-wide">
        Iniciando sesión...
      </h2>
    </div>
  </div>
  )
}
