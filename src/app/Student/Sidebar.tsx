"use client"
import { User as usuario } from "@/Interfaces/User.Interfaces"
import { BookOpen, Calendar, GraduationCap, Home, Settings, User, FileText, Award, ChevronRight, X, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
    activeSection: string
    onSectionChange: (section: string) => void
    user: usuario
}

const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, color: "text-blue-600" },
    { id: "courses", label: "Mis Cursos", icon: BookOpen, color: "text-green-600" },
    { id: "schedule", label: "Horario", icon: Calendar, color: "text-purple-600" },
    { id: "assignments", label: "Tareas", icon: FileText, color: "text-orange-600" },
    { id: "achievements", label: "Logros", icon: Award, color: "text-yellow-600" },
    { id: "profile", label: "Perfil", icon: User, color: "text-indigo-600" },
    { id: "settings", label: "Configuración", icon: Settings, color: "text-gray-600" },
]

export function Sidebar({ isOpen, onClose, activeSection, onSectionChange, user }: SidebarProps) {
    const handleSignOut = () => {
        signOut({ callbackUrl: "/Login" })
    }

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}
            <div
                className={`
                h-screen w-80 bg-white transform transition-transform duration-300 ease-in-out
                shadow-2xl z-[60] fixed top-0 left-0 bottom-0 flex flex-col
                lg:relative lg:z-0 lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#e30f28] rounded-xl flex items-center justify-center shadow-lg">
                            <GraduationCap className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Estudiante</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* User Profile Section */}
                <div className="p-6 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-[#00246a] rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {user.estudiante?.nombre.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{user.estudiante?.nombre}</h3>
                            <p className="text-sm text-gray-500">Nivel Intermedio</p>
                            <div className="flex items-center mt-1">
                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-gradient-to-r from-[#e30f28] to-[#00246a] rounded-full"></div>
                                </div>
                                <span className="text-xs text-gray-500 ml-2">75%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-2">

                        {navigationItems.map((item) => {
                            const Icon = item.icon
                            const isActive = activeSection === item.id
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        onSectionChange(item.id)
                                        onClose()
                                    }}
                                    className={`
                                    w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 group
                                    ${isActive
                                                ? "bg-[#e30f28] text-white shadow-lg transform scale-105"
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
                                            <Icon className={`h-5 w-5 ${isActive ? "text-[#00246a]" : item.color}`} />
                                        </div>
                                        <span className="font-medium flex-1 text-left">{item.label}</span>
                                        {isActive && <ChevronRight className="h-4 w-4 text-white" />}
                                    </button>
                            )
                        })}
                    </div>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex-shrink-0">
                    <div className="space-y-2">
                        <button
                            onClick={() => { 
                                window.location.href = "/"; 
                                onClose(); 
                            }}
                            className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-all duration-200"
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100">
                                <Home className="h-5 w-5 text-gray-600" />
                            </div>
                            <span className="font-medium flex-1 text-left">Inicio</span>
                        </button>
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 hover:text-red-700 transition-all duration-200"
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-100">
                                <LogOut className="h-5 w-5 text-red-600" />
                            </div>
                            <span className="font-medium flex-1 text-left">Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
