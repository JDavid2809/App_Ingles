"use client"
import { AssignmentsSection } from '@/app/Student/Assigments'
import { CoursesSection } from '@/app/Student/Courses'
import { Sidebar } from '@/app/Student/Sidebar'
import { StatsCards } from '@/app/Student/Stats'
import { UpcomingClasses } from '@/app/Student/Upcoaming'
import { User } from '@/Interfaces/User.Interfaces'
import React, { useState } from 'react'


interface Props{
    user: User;
}

export const Student = ({user}: Props) => {
      const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("dashboard")


   const renderContent = () => {
   

        switch (activeSection) {
            case "dashboard":
                return (
                    <div className="space-y-6">
                        <StatsCards />
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <div className="xl:col-span-2">
                                <CoursesSection />
                            </div>
                            <div>
                                <UpcomingClasses />
                            </div>
                        </div>
                        <AssignmentsSection />
                    </div>
                )
            case "courses":
                return (
                    <div className="space-y-6">
                        <CoursesSection />
                    </div>
                )
            case "assignments":
                return (
                    <div className="space-y-6">
                        <AssignmentsSection />
                    </div>
                )
            default:
                return (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sección en Desarrollo</h2>
                            <p className="text-gray-600">Esta sección estará disponible pronto</p>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="h-screen w-screen flex overflow-hidden bg-gray-50">
            {/* Sidebar (ya incluye su propia lógica de posición) */}
            <Sidebar
                user={user}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
            />

            {/* Área principal */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <div className="h-16 flex items-center px-4 border-b bg-white shadow-sm z-10">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-700"
                    >
                        ☰ Abrir menú
                    </button>
                    <h1 className="ml-4 font-bold text-xl">Panel Estudiante</h1>
                </div>

                {/* Contenido */}
                <main className="flex-1 overflow-y-auto p-4">
                    <div className="max-w-7xl mx-auto">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    )
}
