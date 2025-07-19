"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  CheckCircle,
  Zap,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginLoader } from "../ui/loaders/LoginLoader";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);

    if (res?.error) {
      setError("Correo o contraseña incorrectos");
    } else if (res?.ok) {
      console.log({ res });
      router.push("/Student");
    }
  }

  return (
    <div className="relative">
      {/* Enhanced floating decorative elements */}
      <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-[#e30f28]/40 via-[#e30f28]/50 to-[#00246a]/60 rounded-full opacity-20 animate-pulse shadow-2xl"></div>
      <div className="absolute -top-4 -right-10 w-10 h-10 bg-gradient-to-br from-[#00246a]/40 via-[#e30f28]/50 to-[#00246a]/60 rounded-full opacity-30 animate-bounce shadow-xl"></div>
      <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-[#e30f28]/40 via-[#00246a]/50 to-[#e30f28]/50 rounded-full opacity-25 animate-ping shadow-lg"></div>
      <div className="absolute -bottom-4 -right-8 w-6 h-6 bg-gradient-to-br from-[#00246a]/40 to-[#e30f28]/50 rounded-full opacity-30 animate-pulse"></div>

      <div className="relative border-0 shadow-2xl bg-gradient-to-br from-white/95 via-white/90 to-[#e30f28]/5 backdrop-blur-2xl rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-all duration-700 hover:shadow-[#e30f28]/20">
        {/* Enhanced animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#e30f28] via-[#00246a] to-[#e30f28] rounded-3xl opacity-30 animate-pulse"></div>
        <div className="absolute inset-[3px] bg-gradient-to-br from-white/95 via-white/90 to-[#e30f28]/5 rounded-3xl"></div>

        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-br from-[#e30f28] via-[#e30f28] to-[#00246a] text-white p-10 overflow-hidden">
          {/* Complex animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            <div
              className="absolute top-4 left-4 w-32 h-32 border-2 border-white/20 rounded-full animate-spin"
              style={{ animationDuration: "25s" }}
            ></div>
            <div
              className="absolute bottom-4 right-4 w-20 h-20 border border-white/15 rounded-full animate-spin"
              style={{
                animationDuration: "18s",
                animationDirection: "reverse",
              }}
            ></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-lg rotate-45 animate-pulse"></div>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-center gap-4">
              <div className="p-3 bg-white/25 rounded-2xl backdrop-blur-sm shadow-lg">
                <CheckCircle className="w-7 h-7 animate-pulse" />
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
                ¡Bienvenido de vuelta!
              </h2>
            </div>
            <p className="text-white/90 text-center text-lg font-semibold">
              Continúa tu viaje hacia el dominio del inglés
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
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div className="absolute bottom-6 left-6 opacity-25">
            <Shield className="w-5 h-5 animate-bounce" />
          </div>
          <div className="absolute top-1/2 right-4 opacity-20">
            <Sparkles
              className="w-4 h-4 animate-spin"
              style={{ animationDuration: "4s" }}
            />
          </div>
          <div className="absolute bottom-1/2 left-4 opacity-20">
            <Star className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`relative space-y-6 md:space-y-8 lg:space-y-10 p-6 md:p-8 lg:p-12 bg-gradient-to-b from-white/90 to-gray-50/70`}
        >
          {/* Enhanced Email Field */}
          <div className="space-y-5 group">
            {error && (
              <p className="p-3 bg-red-500 text-white text-center uppercase text-sm">
                {error}
              </p>
            )}
            <label
              htmlFor="email"
              className="text-slate-800 font-black text-base md:text-lg mb-3 group-hover:text-[#e30f28] transition-all duration-300 flex items-center gap-3"
            >
              <div className="p-1 bg-[#e30f28]/10 rounded-lg group-hover:bg-[#e30f28]/20 transition-all duration-300">
                <Mail className="w-5 h-5 text-[#e30f28] group-hover:scale-110 transition-transform duration-300" />
              </div>
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#e30f28]/20 to-[#00246a]/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative">
                <Mail className="absolute left-3 md:left-4 top-3 md:top-4 h-5 w-5 md:h-6 md:w-6 text-slate-400 group-hover:text-[#e30f28] group-hover:scale-110 transition-all duration-300 z-10" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full pl-10 md:pl-12 pr-4 md:pr-6 h-12 md:h-14 border-3 border-gray-200 text-black focus:border-[#e30f28] focus:ring-6 focus:ring-[#e30f28]/20 focus:outline-none text-sm md:text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/95 backdrop-blur-sm font-semibold placeholder:text-gray-400 group-hover:bg-white group-hover:border-[#e30f28]/50"
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#e30f28]/10 to-[#00246a]/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Password Field */}
          <div className="space-y-5 group">
            <label
              htmlFor="password"
              className="text-slate-800 font-black text-base md:text-lg mb-3 group-hover:text-[#e30f28] transition-all duration-300 flex items-center gap-3"
            >
              <div className="p-1 bg-[#e30f28]/10 rounded-lg group-hover:bg-[#e30f28]/20 transition-all duration-300">
                <Lock className="w-5 h-5 text-[#e30f28] group-hover:scale-110 transition-transform duration-300" />
              </div>
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative">
                <Lock className="absolute left-3 md:left-4 top-3 md:top-4 h-5 w-5 md:h-6 md:w-6 text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300 z-10" />
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 md:pl-12 pr-12 md:pr-14 h-12 md:h-14 border-3 border-gray-200 text-black focus:border-[#e30f28] focus:ring-6 focus:ring-[#e30f28]/20 focus:outline-none text-sm md:text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/95 backdrop-blur-sm font-semibold placeholder:text-gray-400 group-hover:bg-white group-hover:border-[#e30f28]/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-[#e30f28] transition-all duration-300 hover:scale-125 z-10 p-1 rounded-xl hover:bg-[#e30f28]/10"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Remember & Forgot */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pt-3">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 md:w-5 md:h-5 rounded-lg border-3 border-gray-300 text-indigo-600 focus:ring-indigo-600 focus:ring-3 transition-all duration-300 cursor-pointer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-30 transition-all duration-300 pointer-events-none"></div>
              </div>
              <label
                htmlFor="remember"
                className="text-xs sm:text-sm text-slate-700 font-bold group-hover:text-slate-900 transition-colors cursor-pointer"
              >
                Recordarme
              </label>
            </div>
            <button className="text-xs sm:text-sm text-rose-600 hover:text-rose-700 font-bold hover:underline transition-all duration-300 hover:scale-105 px-3 py-2 rounded-xl hover:bg-rose-50">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Ultra Enhanced Login Button */}
          <button
            type="submit"
            disabled={loading}
           
            className= {` w-full relative h-12 md:h-16 text-base md:text-xl font-black rounded-2xl shadow-2xl transform hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500 flex items-center justify-center overflow-hidden group bg-gradient-to-r from-[#e30f28] via-[#e30f28] to-[#00246a] hover:from-[#e30f28] hover:via-[#e30f28]/90 hover:to-[#00246a] text-white 
              ${loading && "opacity-60 cursor-not-allowed "} `}
          >
            {/* Multiple animated backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#e30f28]/60 via-[#00246a]/50 to-[#e30f28]/60 opacity-0 group-hover:opacity-40 transition-all duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-45 from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-pulse"></div>

            {/* Button content */}
            <div className="relative z-10 flex items-center">
              <div className="p-2 bg-white/25 rounded-xl mr-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="text-base md:text-xl tracking-wide">
                Iniciar Sesión
              </span>
            </div>

            {/* Enhanced glow effects */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#e30f28]/60 to-[#00246a]/60 blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700 -z-10"></div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#e30f28] to-[#00246a] blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700 -z-20"></div>
          </button>

          {/* Enhanced Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-3 border-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-r from-white via-gray-50 to-white px-6 py-3 text-sm text-gray-600 font-black rounded-2xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm">
                O continúa con
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
              <span className="text-gray-700 tracking-wide">
                Continuar con Google
              </span>
            </div>
          </button>
        </form>
      </div>
      {loading && (
     <LoginLoader/>
)}

    </div>
  );
}
