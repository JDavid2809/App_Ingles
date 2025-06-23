"use client"

import { Video, MapPin, Clock, Calendar } from "lucide-react"

const upcomingClasses = [
  {
    id: 1,
    course: "English Conversation",
    time: "10:00 AM",
    date: "Hoy",
    instructor: "Sarah Johnson",
    type: "online",
    duration: "60 min",
  },
  {
    id: 2,
    course: "Business English",
    time: "2:00 PM",
    date: "Mañana",
    instructor: "Michael Brown",
    type: "presencial",
    duration: "90 min",
  },
  {
    id: 3,
    course: "Grammar Fundamentals",
    time: "9:00 AM",
    date: "Miércoles",
    instructor: "Emma Wilson",
    type: "online",
    duration: "45 min",
  },
]

export function UpcomingClasses() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Próximas Clases</h2>
          <p className="text-sm text-gray-600">Tus sesiones programadas</p>
        </div>
        <button className="text-[#e30f28] text-sm font-medium hover:text-[#00246a] transition-colors">
          Ver Calendario
        </button>
      </div>

      <div className="space-y-4">
        {upcomingClasses.map((class_) => (
          <div
            key={class_.id}
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                class_.type === "online" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
              }`}
            >
              {class_.type === "online" ? <Video className="h-6 w-6" /> : <MapPin className="h-6 w-6" />}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{class_.course}</h3>
              <p className="text-sm text-gray-600">{class_.instructor}</p>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{class_.date}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>
                    {class_.time} ({class_.duration})
                  </span>
                </div>
              </div>
            </div>

            <button className="px-4 py-2 bg-gradient-to-r from-[#e30f28] to-[#00246a] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
              Unirse
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
