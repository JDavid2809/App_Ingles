"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation" // 👈 Importa el router

import { BadgeCheck, CirclePlay, Clock, Star } from "lucide-react";
;

const frases = [
  "Trabajo 👷🏻‍♂️",
  "Viajes ✈️",
  "Negocios 💼",
  "Estudios 👩🏻‍🎓",
  "Vida ♥️",
];

export default function HeroSection() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const router = useRouter() // 👈 Instancia del router

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % frases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    router.push("/Login") 
  }


  return (
    <section className="pt-8 pb-20 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#e30f28]/5 rounded-bl-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#00246a]/5 rounded-tr-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-[#e30f28]/10 text-[#e30f28] px-4 py-2 rounded-full text-sm font-medium">
              <span className="flex">
                <Star className="mr-1 h-4 w-4" />
                Cursos profesionales de Inglés
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-[#00246a]">Inglés para tu</span>
              <div className="relative h-16 md:h-20 overflow-hidden mt-2">
                <div
                  className="transition-transform duration-500 ease-in-out flex flex-col"
                  style={{
                    height: `${frases.length * 100}%`,
                    transform: `translateY(-${
                      currentPhrase * (100 / frases.length)
                    }%)`,
                  }}
                >
                  {frases.map((phrase, index) => (
                    <div
                      key={index}
                      className="text-[#e30f28] h-16 md:h-20 flex items-center text-primary w-full"
                      style={{ height: "100%" }}
                    >
                      {phrase}
                    </div>
                  ))}
                </div>
              </div>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              magnam rerum consequuntur nobis omnis ipsam beatae, repellendus
              sed, saepe quidem ex rem sunt quo optio! Repellendus iusto aliquid
              tempora error.
            </p>

            <div className="flex flex-wrap gap-4">
        <button
          onClick={handleStart}
          className="bg-[#e30f28] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow flex items-center space-x-2 hover:bg-[#e30f28]/90"
        >
          Comenzar Ahora
        </button>

              <button className="bg-white border-2 border-[#00246a] text-[#00246a] px-8 py-4 rounded-full font-medium hover:bg-[#00246a] hover:text-white transition-colors duration-300 group flex items-center">
                <CirclePlay className="mr-2" />
                Ver Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00246a]">10K+</div>
                <div className="text-sm text-gray-500">Estudiantes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00246a]">95%</div>
                <div className="text-sm text-gray-500">Éxito</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00246a]">4.9</div>
                <div className="text-sm text-gray-500">Calificación</div>
              </div>
            </div>
          </div>
          {/* Seccion de la imagen */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e30f28]/20 to-[#00246a]/20 rounded-3xl transform rotate-6 scale-105"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/logoIngles.jpg"
                alt="Estudiante aprendiendo inglés"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce">
              <div className="flex items-center space-x-2">
                <Clock className="text-[#e30f28]" />
                <div>
                  <div className="text-xs text-gray-500">Tiempo promedio</div>
                  <div className="text-lg font-bold text-[#00246a]">
                    6 meses
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce">
              <div className="flex items-center space-x-2">
                <BadgeCheck className="text-[#e30f28]" />
                <div>
                  <div className="text-xs text-gray-500">Tasa de éxito</div>
                  <div className="text-lg font-bold text-[#00246a]">98%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
