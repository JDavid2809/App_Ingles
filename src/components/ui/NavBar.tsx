"use client"

import { DollarSign, LogIn, UserPlus, Menu, X, BookMarked, House, LogOut, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const [, setIsMobile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  // Evitar problemas de hidratación
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogin = () => {
    router.push("/Login")
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const handleDashboard = () => {
    if (session?.user) {
      const userRole = (session.user as any)?.rol
      if (userRole === 'ADMIN') {
        router.push("/admin")
      } else if (userRole === 'ESTUDIANTE') {
        router.push("/Student")
      } else {
        router.push("/Student") // Default fallback
      }
    }
  }

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()

    window.addEventListener("resize", checkIfMobile)

    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <>
      <header className="bg-white shadow-none md:shadow-lg sticky top-0 z-50 backdrop-blur-sm ">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 md:flex-none flex justify-center md:justify-start">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logoIngles.jpg"
                  alt="Logo"
                  width={400}
                  height={200}
                  className="h-14 w-auto md:h-16 md:w-auto"
                />
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8 flex-1 justify-center">
              <Link
                href="/"
                className="text-[#00246a] hover:text-[#e30f28] transition-all duration-300 font-medium relative group py-2 flex items-center space-x-2"
              >
                <House className="h-5 w-5" />
                <span>Inicio</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e30f28] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/Courses"
                className="text-[#00246a] hover:text-[#e30f28] transition-all duration-300 font-medium relative group py-2 flex items-center space-x-2"
              >
                <BookMarked className="h-5 w-5" />
                <span>Cursos</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e30f28] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#precios"
                className="text-[#00246a] hover:text-[#e30f28] transition-all duration-300 font-medium relative group py-2 flex items-center space-x-2"
              >
                <DollarSign className="h-5 w-5" />
                <span>Precios</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e30f28] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-3">
              {!isMounted || status === "loading" ? (
                // Loading state - mostrar hasta que esté montado y la sesión cargue
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-24 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              ) : session ? (
                // User logged in
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleDashboard}
                    className="bg-[#00246a] text-white hover:bg-[#00246a]/90 px-4 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Mi Panel</span>
                  </button>
                </div>
              ) : (
                // User not logged in
                <div className="flex items-center space-x-3">
                  <button onClick={handleLogin} className="bg-white text-[#00246a] border border-[#00246a] hover:bg-gray-100 px-4 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Iniciar Sesión</span>
                  </button>
                  <button onClick={handleLogin} className="bg-[#e30f28] text-white hover:bg-[#e30f28]/90 px-4 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow flex items-center space-x-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Registrarse</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden absolute right-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#00246a] p-2 rounded-full hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Auth Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3 pt-4">
                {!isMounted || status === "loading" ? (
                  // Loading state - mostrar hasta que esté montado y la sesión cargue
                  <div className="flex flex-col space-y-3">
                    <div className="w-full h-12 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-full h-12 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                ) : session ? (
                  // User logged in
                  <>
                    <button 
                      onClick={() => {
                        handleDashboard()
                        setIsMobileMenuOpen(false)
                      }}
                      className="bg-[#00246a] text-white hover:bg-[#00246a]/90 px-4 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span>Mi Panel</span>
                    </button>
                    {/* Botón de cerrar sesión eliminado para evitar duplicidad con el sidebar */}
                  </>
                ) : (
                  // User not logged in
                  <>
                    <button 
                      onClick={() => {
                        handleLogin()
                        setIsMobileMenuOpen(false)
                      }}
                      className="bg-white text-[#00246a] border border-[#00246a] hover:bg-gray-100 px-4 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Iniciar Sesión</span>
                    </button>
                    <button 
                      onClick={() => {
                        handleLogin()
                        setIsMobileMenuOpen(false)
                      }}
                      className="bg-[#e30f28] text-white hover:bg-[#e30f28]/90 px-4 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Registrarse</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation Tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center py-3 px-2 text-[#00246a] hover:text-[#e30f28]">
            <House className="h-6 w-6" />
            <span className="text-xs mt-1">Inicio</span>
          </Link>
          <Link href="/Courses" className="flex flex-col items-center py-3 px-2 text-[#00246a] hover:text-[#e30f28]">
            <BookMarked className="h-6 w-6" />
            <span className="text-xs mt-1">Cursos</span>
          </Link>
          <Link href="#precios" className="flex flex-col items-center py-3 px-2 text-[#00246a] hover:text-[#e30f28]">
            <DollarSign className="h-6 w-6" />
            <span className="text-xs mt-1">Precios</span>
          </Link>
        </div>
      </div>
    </>
  )
}
