"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Star, ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react"
import { Button } from "../ui/button"



export default function Hero() {
    const [currentWord, setCurrentWord] = useState(0)
    const words = ["Fluido", "Seguro", "Profesional", "Exitoso"]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-full px-4 py-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Aprendizaje Potenciado por IA</span>
                            <motion.div
                                className="w-2 h-2 bg-green-400 rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                            />
                        </motion.div>

                        {/* Main Heading */}
                        <div className="space-y-6">
                            <motion.h1
                                className="text-5xl lg:text-7xl font-bold leading-tight"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                                    Vuélvete
                                </span>
                                <br />
                                <div className="relative inline-block">
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={currentWord}
                                            className="bg-gradient-to-r from-primary via-red-400 to-secondary bg-clip-text text-transparent"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {words[currentWord]}
                                        </motion.span>
                                    </AnimatePresence>
                                    <motion.span
                                        className="absolute -right-2 top-0 w-1 h-full bg-primary"
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                                    />
                                </div>
                                <br />
                                <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                                    en Inglés
                                </span>
                            </motion.h1>

                            <motion.p
                                className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Domina el inglés con nuestra plataforma revolucionaria potenciada por IA.
                                <span className="text-gray-900 dark:text-white font-semibold"> Lecciones personalizadas</span>,
                                <span className="text-primary font-semibold"> retroalimentación en tiempo real</span>, y
                                <span className="text-secondary font-semibold"> resultados garantizados</span>.
                            </motion.p>
                        </div>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Button size="lg" className="group">
                                Comenzar Ahora
                                <motion.div className="ml-2" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                                    <ArrowRight className="w-5 h-5" />
                                </motion.div>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="group border-gray-300 dark:border-white/20 text-gray-700 dark:text-white bg-transparent"
                            >
                                <motion.div
                                    className="mr-2"
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <Play className="w-5 h-5" />
                                </motion.div>
                                Ver Demo
                            </Button>
                        </motion.div>

                        {/* Social Proof */}
                        <motion.div
                            className="flex items-center space-x-8 pt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <div className="flex items-center space-x-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-white dark:border-slate-900"
                                            whileHover={{ scale: 1.2, zIndex: 10 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        />
                                    ))}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300">
                                    <span className="font-bold text-gray-900 dark:text-white">50K+</span> estudiantes
                                </div>
                            </div>
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 + i * 0.1 }}
                                    >
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    </motion.div>
                                ))}
                                <span className="text-gray-600 dark:text-gray-300 ml-2">4.9/5 calificación</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Interactive Dashboard */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <motion.div
                            className="relative bg-white/50 dark:bg-gradient-to-br dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-white/10 shadow-2xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Panel de Aprendizaje</div>
                            </div>

                            {/* Progress Cards */}
                            <div className="space-y-6">
                                {[
                                    { name: "Confianza al Hablar", progress: 94, color: "primary" },
                                    { name: "Dominio de Gramática", progress: 87, color: "secondary" },
                                    { name: "Vocabulario", progress: 91, color: "yellow" },
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        className={`bg-gradient-to-r ${item.color === "primary"
                                                ? "from-primary/20"
                                                : item.color === "secondary"
                                                    ? "from-secondary/20"
                                                    : "from-yellow-500/20"
                                            } to-transparent p-4 rounded-xl border ${item.color === "primary"
                                                ? "border-primary/20"
                                                : item.color === "secondary"
                                                    ? "border-secondary/20"
                                                    : "border-yellow-500/20"
                                            }`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 + index * 0.2 }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-900 dark:text-white font-semibold">{item.name}</span>
                                            <span
                                                className={`font-bold ${item.color === "primary"
                                                        ? "text-primary"
                                                        : item.color === "secondary"
                                                            ? "text-secondary"
                                                            : "text-yellow-500"
                                                    }`}
                                            >
                                                {item.progress}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                                            <motion.div
                                                className={`h-2 rounded-full ${item.color === "primary"
                                                        ? "bg-gradient-to-r from-primary to-red-400"
                                                        : item.color === "secondary"
                                                            ? "bg-gradient-to-r from-secondary to-blue-400"
                                                            : "bg-gradient-to-r from-yellow-400 to-orange-400"
                                                    }`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.progress}%` }}
                                                transition={{ delay: 1 + index * 0.2, duration: 1 }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
                                {[
                                    { icon: TrendingUp, value: "28", label: "Días Seguidos", color: "text-green-400" },
                                    { icon: Users, value: "156", label: "Horas Aprendidas", color: "text-blue-400" },
                                    { icon: Star, value: "A2", label: "Nivel Actual", color: "text-yellow-400" },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        className="text-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2 + index * 0.1 }}
                                    >
                                        <div className="flex items-center justify-center mb-1">
                                            <stat.icon className={`w-4 h-4 ${stat.color} mr-1`} />
                                            <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Floating Elements */}
                        <motion.div
                            className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl"
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        >
                            <Sparkles className="w-8 h-8 text-white" />
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-xl"
                            animate={{
                                y: [0, 10, 0],
                                rotate: [0, -5, 5, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                        >
                            <TrendingUp className="w-6 h-6 text-white" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
