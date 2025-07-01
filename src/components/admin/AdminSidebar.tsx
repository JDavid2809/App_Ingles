"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  ChevronRight
} from "lucide-react"
import { signOut } from "next-auth/react"

const sidebarItems = [
  {
    title: "Resumen",
    href: "/admin",
    icon: BarChart3
  },
  {
    title: "Estudiantes",
    href: "/admin/students",
    icon: Users
  },
  {
    title: "Profesores",
    href: "/admin/teachers",
    icon: GraduationCap
  },
  {
    title: "Cursos",
    href: "/admin/courses",
    icon: BookOpen
  },
  {
    title: "Pagos",
    href: "/admin/payments",
    icon: CreditCard
  },
  {
    title: "Exámenes",
    href: "/admin/examenes",
    icon: FileText
  }
]


export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  const handleSignOut = () => {
    signOut({ callbackUrl: "/Login" })
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}
      <div
        className={`
          h-full w-80 bg-white transform transition-transform duration-300 ease-in-out
          shadow-2xl z-50 fixed top-0 left-0
          lg:relative lg:z-0 lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Administrador</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* User Profile Section (dummy admin) */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Administrador</h3>
              <p className="text-sm text-gray-500">Panel de control</p>
              <div className="flex items-center mt-1">
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <button
                  key={item.href}
                  onClick={() => {
                    window.location.href = item.href
                    setIsOpen(false)
                  }}
                  className={`
                    w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive
                      ? "bg-blue-600 text-white shadow-lg transform scale-105"
                      : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                    }
                  `}
                >
                  <div
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                      ${isActive ? "bg-white bg-opacity-20" : "bg-gray-100 group-hover:bg-gray-200"}
                    `}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? "text-blue-900" : "text-blue-600"}`} />
                  </div>
                  <span className="font-medium flex-1 text-left">{item.title}</span>
                  {isActive && <ChevronRight className="h-4 w-4 text-white" />}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <Separator className="mb-3" />
          <div className="space-y-2">
            <button
              onClick={() => { window.location.href = "/"; setIsOpen(false) }}
              className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-all duration-200"
            >
              <Home className="h-5 w-5 text-blue-600" />
              <span className="font-medium flex-1 text-left">Inicio</span>
            </button>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 hover:text-red-700 transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium flex-1 text-left">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
