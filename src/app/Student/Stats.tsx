"use client"

import { BookOpen, Clock, CheckCircle, TrendingUp } from "lucide-react"

const stats = [
    {
        title: "Cursos Activos",
        value: "3",
        change: "+1 este mes",
        icon: BookOpen,
        color: "from-blue-500 to-blue-600",
    },
    {
        title: "Horas Esta Semana",
        value: "12.5",
        change: "+2.5 vs semana pasada",
        icon: Clock,
        color: "from-green-500 to-green-600",
    },
    {
        title: "Tareas Completadas",
        value: "24",
        change: "+4 esta semana",
        icon: CheckCircle,
        color: "from-purple-500 to-purple-600",
    },
    {
        title: "Progreso General",
        value: "75%",
        change: "+5% este mes",
        icon: TrendingUp,
        color: "from-orange-500 to-orange-600",
    },
]

export function StatsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                                <Icon className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                            <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
