"use client"

import { CheckCircle, Clock, AlertCircle, FileText } from "lucide-react"

const assignments = [
    {
        id: 1,
        title: "Essay: My Future Goals",
        course: "English Conversation",
        dueDate: "18 Ene 2024",
        status: "pending",
        priority: "high",
    },
    {
        id: 2,
        title: "Presentation: Market Analysis",
        course: "Business English",
        dueDate: "20 Ene 2024",
        status: "completed",
        priority: "medium",
    },
    {
        id: 3,
        title: "Grammar Exercise Set 5",
        course: "Grammar Fundamentals",
        dueDate: "16 Ene 2024",
        status: "overdue",
        priority: "high",
    },
    {
        id: 4,
        title: "Vocabulary Quiz Chapter 3",
        course: "English Conversation",
        dueDate: "22 Ene 2024",
        status: "pending",
        priority: "low",
    },
]

export function AssignmentsSection() {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-5 w-5 text-green-500" />
            case "pending":
                return <Clock className="h-5 w-5 text-yellow-500" />
            case "overdue":
                return <AlertCircle className="h-5 w-5 text-red-500" />
            default:
                return <FileText className="h-5 w-5 text-gray-500" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "overdue":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "border-l-red-500"
            case "medium":
                return "border-l-yellow-500"
            case "low":
                return "border-l-green-500"
            default:
                return "border-l-gray-300"
        }
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Tareas Recientes</h2>
                    <p className="text-sm text-gray-600">Mantén el control de tus proyectos</p>
                </div>
                <button className="text-[#e30f28] text-sm font-medium hover:text-[#00246a] transition-colors">Ver Todas</button>
            </div>

            <div className="space-y-4">
                {assignments.map((assignment) => (
                    <div
                        key={assignment.id}
                        className={`border-l-4 ${getPriorityColor(assignment.priority)} bg-gray-50 rounded-r-xl p-4 hover:shadow-md transition-shadow cursor-pointer`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                {getStatusIcon(assignment.status)}
                                <div>
                                    <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                                    <p className="text-sm text-gray-600">{assignment.course}</p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 mb-1">Vence: {assignment.dueDate}</p>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                                    {assignment.status === "completed" && "Completada"}
                                    {assignment.status === "pending" && "Pendiente"}
                                    {assignment.status === "overdue" && "Vencida"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
