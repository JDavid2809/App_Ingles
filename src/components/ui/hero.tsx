"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Star, ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react"
import { useRouter } from "next/navigation"

const words = ["Fluido", "Seguro", "Profesional", "Exitoso"]
const stats = [
  { icon: TrendingUp, value: "28", label: "Días Seguidos", color: "text-green-400" },
  { icon: Users, value: "156", label: "Horas Aprendidas", color: "text-blue-400" },
  { icon: Star, value: "A2", label: "Nivel Actual", color: "text-yellow-400" },
]
const progressItems = [
  { name: "Confianza al Hablar", progress: 94, color: "#e30f28" },
  { name: "Dominio de Gramática", progress: 87, color: "#00246a" },
  { name: "Vocabulario", progress: 91, color: "#05df72" },
]

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => setCurrentWord((i) => (i + 1) % words.length), 2000)
    return () => clearInterval(interval)
  }, [])

  const handleStart = () => router.push("/Login")

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <Content currentWord={currentWord} handleStart={handleStart} />
        <Dashboard />
      </div>
    </section>
  )
}

const AnimatedBackground = () => (
  <div className="absolute inset-0">
    {[
      { className: "top-20 left-10 w-72 h-72", color: "#e30f28" },
      { className: "bottom-20 right-10 w-96 h-96", color: "#00246a" },
    ].map(({ className, color }, i) => (
      <motion.div
        key={i}
        className={`absolute ${className} bg-[${color}]/20 rounded-full blur-3xl`}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i }}
      />
    ))}
    <motion.div
      className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#e30f28]/10 to-[#00246a]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
  </div>
)

type ContentProps = {
  currentWord: number;
  handleStart: () => void;
};

const Content = ({ currentWord, handleStart }: ContentProps) => (
  <div className="space-y-8">
    <motion.h1 className="text-5xl lg:text-7xl font-bold leading-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
      <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Vuélvete</span>
      <br />
      <div className="relative inline-block">
        <AnimatePresence mode="wait">
          <motion.span key={currentWord} className="bg-gradient-to-r from-[#e30f28] via-red-400 to-[#00246a] bg-clip-text text-transparent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            {words[currentWord]}
          </motion.span>
        </AnimatePresence>
        <motion.span className="absolute -right-2 top-0 w-1 h-full bg-[#e30f28]" animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
      </div>
      <br />
      <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">en Inglés</span>
    </motion.h1>
    <motion.p className="text-xl lg:text-2xl text-gray-600 max-w-2xl leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
      Domina el inglés con nuestra plataforma revolucionaria potenciada por profecionales. <span className="text-gray-900 font-semibold">Lecciones personalizadas</span>, <span className="text-[#e30f28] font-semibold">retroalimentación en tiempo real</span>, y <span className="text-[#00246a] font-semibold">resultados garantizados</span>.
    </motion.p>
    <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
      <button onClick={handleStart} className="group bg-[#e30f28] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#e30f28]/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center">
        Comenzar Ahora <motion.div className="ml-2" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}><ArrowRight className="w-5 h-5" /></motion.div>
      </button>
      <button className="group border border-gray-300 text-gray-700 bg-transparent px-8 py-4 rounded-xl font-medium text-lg hover:border-[#00246a] hover:shadow-md transition-all duration-300 flex items-center justify-center">
        <motion.div className="mr-2" whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400 }}><Play className="w-5 h-5" /></motion.div> Ver Demo
      </button>
    </motion.div>
  </div>
)

const Dashboard = () => (
  <motion.div className="relative" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}>
    <motion.div className="relative bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-2xl" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {["red-400", "yellow-400", "green-400"].map((color) => (<div key={color} className={`w-3 h-3 bg-${color} rounded-full`}></div>))}
        </div>
        <div className="text-sm text-gray-500">Panel de Aprendizaje</div>
      </div>
      <div className="space-y-6">
        {progressItems.map((item, index) => (
          <motion.div key={item.name} className="bg-gradient-to-r from-gray-50 to-transparent p-4 rounded-xl border border-gray-200" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + index * 0.2 }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-900 font-semibold">{item.name}</span>
              <span className="font-bold" style={{ color: item.color }}>{item.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div className="h-2 rounded-full" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}90)` }} initial={{ width: 0 }} animate={{ width: `${item.progress}%` }} transition={{ delay: 1 + index * 0.2, duration: 1 }} />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        {stats.map((stat, index) => (
          <motion.div key={stat.label} className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + index * 0.1 }}>
            <div className="flex items-center justify-center mb-1">
              <stat.icon className={`w-4 h-4 ${stat.color} mr-1`} />
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <span className="text-xs text-gray-500">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
C
  </motion.div>
)
