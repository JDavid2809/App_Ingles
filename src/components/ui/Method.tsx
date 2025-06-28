"use client"

import { useState } from "react"
import Image from "next/image"
import { Lightbulb } from "lucide-react"

const pasos = [
    {
        number: "01",
        title: "Evaluación Inicial",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quas veniam tempora placeat voluptates beatae!",
        image: "/logoIngles.jpg",
    },
    {
        number: "02",
        title: "Aprendizaje Interactivo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quas veniam tempora placeat voluptates beatae!",
        image: "/logoIngles.jpg",
    },
    {
        number: "03",
        title: "Práctica Conversacional",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quas veniam tempora placeat voluptates beatae!",
        image: "/logoIngles.jpg",
    },
    {
        number: "04",
        title: "Evaluación Continua",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quas veniam tempora placeat voluptates beatae!",
        image: "/logoIngles.jpg",
    },
]

export default function MethodSection() {
    const [activeStep, setActiveStep] = useState(0)

    return (
        <section id="method" className="py-5 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#e30f28]/5 rounded-full -translate-x-1/2 -translate-y-1/2 -z-10"></div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00246a]/5 rounded-full translate-x-1/3 -translate-y-1/3 -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center space-x-2 bg-[#00246a]/10 text-[#00246a] px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Lightbulb className="w-5 h-5"/>
                        <span>Nuestra Metodología</span>
                    </div>

                    <h2 className="text-4xl font-bold text-[#00246a] mb-4">Cómo funciona nuestro método</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quas veniam tempora placeat voluptates beatae!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        {pasos.map((step, index) => (
                            <div
                                key={index}
                                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${activeStep === index
                                        ? "bg-gradient-to-r from-[#e30f28]/10 to-[#00246a]/10 shadow-lg"
                                        : "hover:bg-gray-50"
                                    }`}
                                onClick={() => setActiveStep(index)}
                            >
                                <div className="flex items-start space-x-4">
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-all duration-300 ${activeStep === index ? "bg-[#e30f28] text-white" : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {step.number}
                                    </div>
                                    <div className="flex-1">
                                        <h3
                                            className={`text-xl font-bold mb-2 transition-colors duration-300 ${activeStep === index ? "text-[#e30f28]" : "text-[#00246a]"
                                                }`}
                                        >
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#e30f28]/20 to-[#00246a]/20 rounded-3xl transform -rotate-6 scale-105"></div>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={pasos[activeStep].image || "/placeholder.svg"}
                                alt={pasos[activeStep].title}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00246a]/80 to-transparent rounded-3xl flex items-end p-8">
                            <div className="text-white">
                                <div className="text-sm font-medium opacity-80">Paso {pasos[activeStep].number}</div>
                                <div className="text-2xl font-bold">{pasos[activeStep].title}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}