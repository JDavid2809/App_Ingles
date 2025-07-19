"use client"

import { useState } from "react"
import LoginForm from "@/components/Login/login-form"
import RegisterForm from "@/components/Register/register-form"
import Image from "next/image"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e30f28]/5 via-white to-[#00246a]/5 relative overflow-hidden">
      {/* Enhanced Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#e30f28]/20 via-[#e30f28]/30 to-[#00246a]/30 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#00246a]/20 via-[#e30f28]/30 to-[#00246a]/30 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#e30f28]/10 via-[#00246a]/20 to-[#e30f28]/10 rounded-full opacity-20 blur-3xl animate-pulse"></div>

        {/* Animated geometric shapes */}
        <div
          className="absolute top-20 left-20 w-32 h-32 border-2 border-[#e30f28]/30 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-[#00246a]/30 rounded-lg rotate-45 animate-pulse"></div>

        {/* Floating particles with improved animation */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-r from-[#e30f28] to-[#00246a] rounded-full opacity-70 animate-bounce shadow-lg"></div>
        <div
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-gradient-to-r from-[#00246a] to-[#e30f28] rounded-full opacity-70 animate-bounce shadow-lg"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-3/4 w-2 h-2 bg-gradient-to-r from-[#e30f28] to-[#00246a] rounded-full opacity-70 animate-bounce shadow-lg"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Additional floating elements */}
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-gradient-to-r from-[#e30f28]/80 to-[#00246a]/80 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-gradient-to-r from-[#00246a]/80 to-[#e30f28]/80 rounded-full opacity-60 animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-3 md:p-4 lg:p-6">
        {/* Enhanced Logo Section */}
        <div className="mb-6 md:mb-8 lg:mb-10 transform hover:scale-105 transition-all duration-300">
          <div className="relative p-4 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e30f28]/20 to-[#00246a]/20 rounded-3xl animate-pulse"></div>
            <Image
              src="/imageIngles.png"
              alt="Triunfando con el Inglés"
              width={150}
              height={100}
              className="w-32 h-20 md:w-36 md:h-24 lg:w-40 lg:h-28 object-contain relative z-10"
            />
          </div>
        </div>

        {/* Auth Forms Container */}
        <div className="w-full max-w-sm md:max-w-lg lg:max-w-2xl mx-auto">
          {/* Enhanced Tab Navigation */}
          <div className="grid grid-cols-2 bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-2 md:p-3 mb-4 md:mb-6 lg:mb-8 transform hover:scale-[1.02] transition-all duration-300">
            <button
              onClick={() => setActiveTab("login")}
              className={`py-3 px-4 md:py-4 md:px-6 font-bold rounded-2xl transition-all duration-500 relative overflow-hidden group ${
                activeTab === "login"
                  ? "bg-gradient-to-r from-[#e30f28] via-[#e30f28] to-[#00246a] text-white shadow-2xl transform scale-[1.02] shadow-[#e30f28]/25"
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/20"
              }`}
            >
              {activeTab === "login" && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e30f28]/20 to-[#00246a]/20 animate-pulse"></div>
                </>
              )}
              <span className="relative z-10 text-xs md:text-sm font-extrabold tracking-wide">Iniciar Sesión</span>
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`py-3 px-4 md:py-4 md:px-6 font-bold rounded-2xl transition-all duration-500 relative overflow-hidden group ${
                activeTab === "register"
                  ? "bg-gradient-to-r from-[#00246a] via-[#00246a] to-[#e30f28] text-white shadow-2xl transform scale-[1.02] shadow-[#00246a]/25"
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/20"
              }`}
            >
              {activeTab === "register" && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00246a]/20 to-[#e30f28]/20 animate-pulse"></div>
                </>
              )}
              <span className="relative z-10 text-xs md:text-sm font-extrabold tracking-wide">Registrarse</span>
            </button>
          </div>

          {/* Form Content with enhanced transitions */}
          <div className="relative min-h-[500px] md:min-h-[600px]">
            <div
              className={`transition-all duration-700 ${
                activeTab === "login"
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 translate-x-8 scale-95 absolute inset-0 pointer-events-none"
              }`}
            >
              {activeTab === "login" && <LoginForm />}
            </div>
            <div
              className={`transition-all duration-700 ${
                activeTab === "register"
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 translate-x-8 scale-95 absolute inset-0 pointer-events-none"
              }`}
            >
              {activeTab === "register" && <RegisterForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
