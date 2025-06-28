"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Phone, Sparkles, CheckCircle, Star, Gift, Heart, Zap } from "lucide-react"
import { registerUser } from "@/actions/auth/Auth-actions"

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMensaje("")
    setError(false)

  const formData = new FormData(e.currentTarget)
  const result = await registerUser(formData)

  if (result.success) {
    setMensaje(result.message)
    setError(false)
    
  } else {
    setMensaje(result.message)
    setError(true)
  }
}


  return (
    <div className="relative">
      {/* Enhanced floating decorative elements */}
      <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-rose-400 via-pink-500 to-red-600 rounded-full opacity-20 animate-pulse shadow-2xl"></div>
      <div className="absolute -top-4 -left-10 w-10 h-10 bg-gradient-to-br from-orange-400 via-pink-500 to-rose-600 rounded-full opacity-30 animate-bounce shadow-xl"></div>
      <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 rounded-full opacity-25 animate-ping shadow-lg"></div>
      <div className="absolute -bottom-4 -left-8 w-6 h-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-30 animate-pulse"></div>

      <form
        // action={registerUser} 
        onSubmit={handleSubmit}
        className="relative border-0 shadow-2xl bg-gradient-to-br from-white/95 via-white/90 to-rose-50/80 backdrop-blur-2xl rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-all duration-700 hover:shadow-rose-200/50">
        {/* Enhanced animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 rounded-3xl opacity-30 animate-pulse"></div>
        <div className="absolute inset-[3px] bg-gradient-to-br from-white/95 via-white/90 to-rose-50/80 rounded-3xl"></div>

        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 text-white p-10 overflow-hidden">
          {/* Complex animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            <div
              className="absolute top-4 left-4 w-32 h-32 border-2 border-white/20 rounded-full animate-spin"
              style={{ animationDuration: "25s" }}
            ></div>
            <div
              className="absolute bottom-4 right-4 w-20 h-20 border border-white/15 rounded-full animate-spin"
              style={{ animationDuration: "18s", animationDirection: "reverse" }}
            ></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-lg rotate-45 animate-pulse"></div>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-center gap-4">
              <div className="p-3 bg-white/25 rounded-2xl backdrop-blur-sm shadow-lg">
                <Sparkles className="w-7 h-7 animate-spin" style={{ animationDuration: "4s" }} />
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-white via-rose-100 to-pink-100 bg-clip-text text-transparent">
                ¡Únete a nosotros!
              </h2>
            </div>
            <p className="text-rose-100 text-center text-lg font-semibold">
              Comienza tu transformación con el inglés hoy mismo
            </p>
            <div className="flex justify-center space-x-3 pt-2">
              <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce shadow-sm"></div>
              <div
                className="w-2 h-2 bg-white/70 rounded-full animate-bounce shadow-sm"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-white/70 rounded-full animate-bounce shadow-sm"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>

          {/* Enhanced floating icons */}
          <div className="absolute top-6 right-6 opacity-25">
            <Star className="w-6 h-6 animate-pulse" />
          </div>
          <div className="absolute bottom-6 left-6 opacity-25">
            <Gift className="w-5 h-5 animate-bounce" />
          </div>
          <div className="absolute top-1/2 right-4 opacity-20">
            <Heart className="w-4 h-4 animate-pulse" />
          </div>
          <div className="absolute bottom-1/2 left-4 opacity-20">
            <Zap className="w-4 h-4 animate-bounce" />
          </div>
        </div>

        <div
          className={`relative space-y-5 md:space-y-6 lg:space-y-8 p-6 md:p-8 lg:p-12 bg-gradient-to-b from-white/90 to-gray-50/70`}
        >
           {
                mensaje && (
                  <div
                    className={`p-3 rounded-lg text-lg text-center capitalize font-semibold ${
                      error ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {mensaje}
                  </div>
                )
              }
          {/* Enhanced Name Fields */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            
            <div className="space-y-3 group">
             
              <label
                htmlFor="firstName"
                className="text-slate-800 font-bold text-xs md:text-sm group-hover:text-rose-700 transition-all duration-300 flex items-center gap-2"
              >
                <div className="p-1 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-all duration-300">
                  <User className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                Nombre
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400/30 to-pink-400/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative">
                  <User className="absolute left-2 md:left-3 top-2.5 md:top-3 h-4 w-4 md:h-5 md:w-5 text-slate-400 group-hover:text-rose-600 group-hover:scale-110 transition-all duration-300 z-10" />
                  <input
                    id="nombre"
                    name="nombre"
                   
                    placeholder="Juan"
                    className="w-full pl-8 md:pl-10 pr-3 md:pr-4 h-10 md:h-12 border-2 border-gray-200 text-black focus:border-rose-600 focus:ring-4 focus:ring-rose-100 focus:outline-none text-xs md:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 bg-white/95 backdrop-blur-sm font-semibold placeholder:text-gray-400 group-hover:bg-white group-hover:border-rose-300"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                </div>
              </div>
            </div>
            <div className="space-y-3 group">
              <label
                htmlFor="lastName"
                className="text-slate-800 font-bold text-xs md:text-sm group-hover:text-rose-700 transition-all duration-300 flex items-center gap-2"
              >
                <div className="p-1 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-all duration-300">
                  <User className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                Apellido
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400/30 to-pink-400/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative">
                  <User className="absolute left-2 md:left-3 top-2.5 md:top-3 h-4 w-4 md:h-5 md:w-5 text-slate-400 group-hover:text-rose-600 group-hover:scale-110 transition-all duration-300 z-10" />
                  <input
                    id="apellido"
                    name="apellido"
                    
                    placeholder="Pérez"
                    className="w-full pl-8 md:pl-10 pr-3 md:pr-4 h-10 md:h-12 border-2 border-gray-200 text-black focus:border-rose-600 focus:ring-4 focus:ring-rose-100 focus:outline-none text-xs md:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 bg-white/95 backdrop-blur-sm font-semibold placeholder:text-gray-400 group-hover:bg-white group-hover:border-rose-300"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Email Field */}
          <div className="space-y-4 group mb-3">
            <label
              htmlFor="registerEmail"
              className="text-slate-800 font-black text-base md:text-lg group-hover:text-rose-700 transition-all duration-300 flex items-center gap-3"
            >
              <div className="p-1 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-all duration-300">
                <Mail className="w-5 h-5 text-rose-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400/30 to-pink-400/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative">
                <Mail className="absolute left-3 md:left-4 top-3 md:top-4 h-5 w-5 md:h-6 md:w-6 text-slate-400 group-hover:text-rose-600 group-hover:scale-110 transition-all duration-300 z-10" />
                <input
                  id="email"
                  name="email"
                  type="email"
                
                  placeholder="tu@email.com"
                  className="w-full pl-10 md:pl-12 pr-4 md:pr-6 h-12 md:h-14 border-3 border-gray-200 text-black focus:border-rose-600 focus:ring-6 focus:ring-rose-100 focus:outline-none text-sm md:text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/95 backdrop-blur-sm font-semibold placeholder:text-gray-400 group-hover:bg-white group-hover:border-rose-300"
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Phone Field */}
          <div className="space-y-3 group">
            <label
              htmlFor="phone"
              className="text-slate-800 font-bold text-xs md:text-sm group-hover:text-rose-700 transition-all duration-300 flex items-center gap-2"
            >
              <div className="p-1 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-all duration-300">
                <Phone className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              Teléfono <span className="text-xs text-gray-500 font-normal">(Opcional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400/30 to-pink-400/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative">
                <Phone className="absolute left-2 md:left-3 top-2.5 md:top-3 h-4 w-4 md:h-5 md:w-5 text-slate-400 group-hover:text-rose-600 group-hover:scale-110 transition-all duration-300 z-10" />
                <input
                  
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  className="w-full pl-8 md:pl-10 pr-3 md:pr-4 h-10 md:h-12 border-2 border-gray-200 text-black focus:border-rose-600 focus:ring-4 focus:ring-rose-100 focus:outline-none text-xs md:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 bg-white/95 backdrop-blur-sm font-semibold placeholder:text-gray-400 group-hover:bg-white group-hover:border-rose-300"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Password Fields */}
          <div className="space-y-5">
            <div className="space-y-3 group">
              <label
                htmlFor="registerPassword"
                className="text-slate-800 font-bold text-xs md:text-sm group-hover:text-rose-700 transition-all duration-300 flex items-center gap-2"
              >
                <div className="p-1 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-all duration-300">
                  <Lock className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400/30 to-pink-400/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative">
                  <Lock className="absolute left-2 md:left-3 top-2.5 md:top-3 h-4 w-4 md:h-5 md:w-5 text-slate-400 group-hover:text-rose-600 group-hover:scale-110 transition-all duration-300 z-10" />
                  <input
                   
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-8 md:pl-10 pr-10 md:pr-12 h-10 md:h-12 border-2 border-gray-200 text-black focus:border-rose-600 focus:ring-4 focus:ring-rose-100 focus:outline-none text-xs md:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 bg-white/95 backdrop-blur-sm font-semibold placeholder:text-gray-400 group-hover:bg-white group-hover:border-rose-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 md:right-3 top-2.5 md:top-3 text-slate-400 hover:text-rose-600 transition-all duration-300 hover:scale-125 z-10 p-1 rounded-xl hover:bg-rose-50"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 md:h-5 md:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 md:h-5 md:w-5" />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                </div>
              </div>
            </div>

            <div className="space-y-3 group">
              <label
                htmlFor="confirmPassword"
                className="text-slate-800 font-bold text-xs md:text-sm group-hover:text-rose-700 transition-all duration-300 flex items-center gap-2"
              >
                <div className="p-1 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-all duration-300">
                  <Lock className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                Confirmar Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400/30 to-pink-400/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative">
                  <Lock className="absolute left-2 md:left-3 top-2.5 md:top-3 h-4 w-4 md:h-5 md:w-5 text-slate-400 group-hover:text-rose-600 group-hover:scale-110 transition-all duration-300 z-10" />
                  <input
                   
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-8 md:pl-10 pr-10 md:pr-12 h-10 md:h-12 border-2 border-gray-200 text-black focus:border-rose-600 focus:ring-4 focus:ring-rose-100 focus:outline-none text-xs md:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 bg-white/95 backdrop-blur-sm font-semibold placeholder:text-gray-400 group-hover:bg-white group-hover:border-rose-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 md:right-3 top-2.5 md:top-3 text-slate-400 hover:text-rose-600 transition-all duration-300 hover:scale-125 z-10 p-1 rounded-xl hover:bg-rose-50"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 md:h-5 md:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 md:h-5 md:w-5" />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Terms */}
          <div className="flex items-start space-x-3 pt-3 group cursor-pointer">
            <div className="relative mt-1">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="w-4 h-4 md:w-5 md:h-5 rounded-lg border-3 border-gray-300 text-rose-600 focus:ring-rose-600 focus:ring-3 transition-all duration-300 cursor-pointer"
                required
              />
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-500 rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-300 pointer-events-none"></div>
            </div>
            <label
              htmlFor="terms"
              className="text-xs md:text-sm text-slate-700 font-semibold leading-relaxed group-hover:text-slate-900 transition-colors cursor-pointer"
            >
              Acepto los{" "}
              <button className="text-rose-600 hover:text-rose-700 font-bold hover:underline transition-all duration-300 hover:scale-105">
                términos y condiciones
              </button>{" "}
              y la{" "}
              <button className="text-rose-600 hover:text-rose-700 font-bold hover:underline transition-all duration-300 hover:scale-105">
                política de privacidad
              </button>
            </label>
          </div>

          {/* Ultra Enhanced Register Button */}
          <button type="submit" className="w-full relative h-12 md:h-16 text-base md:text-xl font-black rounded-2xl shadow-2xl transform hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500 flex items-center justify-center overflow-hidden group bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:via-pink-700 hover:to-red-700 text-white">
            {/* Multiple animated backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 opacity-0 group-hover:opacity-40 transition-all duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-45 from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-pulse"></div>

            {/* Button content */}
            <div 
            
             className="relative z-10 flex items-center">
              <div className="p-2 bg-white/25 rounded-xl mr-3 group-hover:scale-110 group-hover:rotate-180 transition-all duration-700 shadow-lg">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
              </div>
             
              
            </div>
            

            {/* Enhanced glow effects */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700 -z-10"></div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700 -z-20"></div>
          </button>

          {/* Enhanced Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-3 border-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-r from-white via-gray-50 to-white px-6 py-3 text-sm text-gray-600 font-black rounded-2xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm">
                O regístrate con
              </span>
            </div>
          </div>

          {/* Ultra Enhanced Google Button */}
          <button className="w-full h-12 md:h-16 border-3 border-gray-200 hover:border-gray-300 text-sm md:text-lg font-black rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500 flex items-center justify-center relative overflow-hidden group bg-white hover:bg-gray-50">
            <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-yellow-50 to-blue-50 opacity-0 group-hover:opacity-60 transition-all duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="relative z-10 flex items-center">
              <div className="p-2 rounded-xl mr-3 group-hover:scale-110 transition-all duration-500 shadow-lg">
                <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <span className="text-lg text-gray-700 tracking-wide">Registrarse con Google</span>
            </div>
          </button>

          {/* Ultra Enhanced Success Indicators */}
          <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-3 border-green-200 rounded-2xl p-4 md:p-6 mt-6 transform hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs md:text-sm">
              <div className="flex items-center text-green-800 group cursor-pointer">
                <div className="p-1 bg-green-200 rounded-xl mr-2 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <span className="font-black">Acceso inmediato</span>
              </div>
              <div className="flex items-center text-green-800 group cursor-pointer">
                <div className="p-1 bg-green-200 rounded-xl mr-2 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <span className="font-black">100% Gratis</span>
              </div>
              <div className="flex items-center text-green-800 group cursor-pointer">
                <div className="p-1 bg-green-200 rounded-xl mr-2 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <span className="font-black">Sin compromisos</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
