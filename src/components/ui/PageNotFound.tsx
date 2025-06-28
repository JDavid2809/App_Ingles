"use client"

import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-20 left-20 w-2 h-2 bg-[#e30f28] rounded-full opacity-30"></div>
            <div className="absolute top-40 right-32 w-3 h-3 bg-[#00246a] rounded-full opacity-20"></div>
            <div className="absolute bottom-32 left-16 w-2 h-2 bg-[#e30f28] rounded-full opacity-25"></div>
            <div className="absolute bottom-20 right-20 w-3 h-3 bg-[#00246a] rounded-full opacity-15"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-12">
                    {/* Clean 404 Display */}
                    <div className="space-y-6">
                        <div className="relative">
                            <h1 className="text-8xl md:text-9xl font-black text-[#ff8fa3] select-none">404</h1>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl md:text-5xl font-bold text-[#00246a]">Oops!</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#00246a]">Página no encontrada</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                La página que buscas no existe o ha sido movida. Te ayudamos a encontrar lo que necesitas.
                            </p>
                        </div>
                    </div>

                    {/* Simple Illustration */}
                    <div className="max-w-sm mx-auto">
                        <div className="bg-gray-50 rounded-3xl p-12 relative">
                            {/* Simple Search Icon */}
                            <div className="w-24 h-24 mx-auto mb-6 relative">
                                <div className="w-16 h-16 border-4 border-[#e30f28] rounded-full absolute top-0 left-0"></div>
                                <div className="w-6 h-1 bg-[#e30f28] rounded-full absolute bottom-2 right-2 rotate-45"></div>
                            </div>

                            <div className="absolute top-6 left-6 text-[#00246a] text-2xl opacity-30">?</div>
                            <div className="absolute top-8 right-8 text-[#e30f28] text-lg opacity-40">?</div>
                            <div className="absolute bottom-8 left-8 text-[#00246a] text-xl opacity-25">?</div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/"
                            className="bg-[#e30f28] hover:bg-[#e30f28]/90 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#e30f28]/25 flex items-center group"
                        >
                            <Home className="h-5 w-5 mr-2"/>
                            Ir al Inicio
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="bg-white border-2 border-[#00246a] text-[#00246a] hover:bg-[#00246a] hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center group"
                        >
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            Volver Atrás
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
