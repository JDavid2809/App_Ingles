"use client"
import {BookOpen, Calendar, GraduationCap, Home, Settings, User, FileText, Award, ChevronRight, X,} from "lucide-react"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
    activeSection: string
    onSectionChange: (section: string) => void
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

export function Sidebar({ isOpen, onClose, activeSection, onSectionChange }: SidebarProps) {
    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}
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
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-[#00246a] rounded-full flex items-center justify-center text-white font-bold text-lg">
                            MG
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">María González</h3>
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
                <nav className="flex-1 p-4">
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
            </div>
        </>
    )
}
