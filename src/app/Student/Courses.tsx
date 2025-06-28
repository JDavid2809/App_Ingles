"use client"

import { BookOpen, User, Clock } from "lucide-react"

const courses = [
    {
        id: 1,
        name: "English Conversation",
        level: "Intermedio",
        progress: 75,
        nextClass: "Hoy 10:00 AM",
        instructor: "Sarah Johnson",
        color: "from-[#e30f28] to-red-600",
        students: 12,
    },
    {
        id: 2,
        name: "Business English",
        level: "Avanzado",
        progress: 60,
        nextClass: "Mañana 2:00 PM",
        instructor: "Michael Brown",
        color: "from-[#00246a] to-blue-800",
        students: 8,
    },
    {
        id: 3,
        name: "Grammar Fundamentals",
        level: "Principiante",
        progress: 90,
        nextClass: "Miércoles 9:00 AM",
        instructor: "Emma Wilson",
        color: "from-purple-500 to-purple-700",
        students: 15,
    },
]

export function CoursesSection() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Mis Cursos</h2>
                    <p className="text-sm text-gray-600">Sigue tu progreso en cada curso</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-[#e30f28] to-[#00246a] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
                    Ver Todos
                </button>
            </div>

            <div className="space-y-4">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="flex items-start space-x-4">
                            <div
                                className={`w-16 h-16 rounded-xl bg-gradient-to-r ${course.color} flex items-center justify-center flex-shrink-0`}
                            >
                                <BookOpen className="h-8 w-8 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">{course.name}</h3>
                                        <p className="text-sm text-gray-600">Nivel: {course.level}</p>
                                    </div>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                        {course.progress}% completado
                                    </span>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                    <div className="flex items-center space-x-1">
                                        <User className="h-4 w-4" />
                                        <span>{course.instructor}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{course.nextClass}</span>
                                    </div>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full bg-gradient-to-r ${course.color}`}
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
