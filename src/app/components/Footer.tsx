import { Facebook, Instagram, Mail, MapPinCheckInside, PhoneCall, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#00246a] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#e30f28] to-[#e30f28]/80 rounded-full flex items-center justify-center">
                            </div>
                            <span className="text-2xl font-bold">Triunfando con el inglés</span>
                        </div>

                        <p className="text-gray-300 leading-relaxed">
                            Transformamos vidas a través del aprendizaje del inglés. Únete a nuestra comunidad global de estudiantes
                            exitosos.
                        </p>

                        <div className="flex space-x-4">
                            <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-[#e30f28] transition-colors duration-300">
                                <Facebook />
                            </a>
                            <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-[#e30f28] transition-colors duration-300">
                                <Twitter />
                            </a>
                            <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-[#e30f28] transition-colors duration-300">
                                <Instagram />
                            </a>
                            <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-[#e30f28] transition-colors duration-300">
                                <Youtube />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold">Enlaces Rápidos</h3>
                        <div className="space-y-3">
                            <a href="#" className="block text-gray-300 hover:text-[#e30f28] transition-colors duration-300">
                                Sobre Nosotros
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-[#e30f28] transition-colors duration-300">
                                Nuestros Cursos
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-[#e30f28] transition-colors duration-300">
                                Testimonios
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-[#e30f28] transition-colors duration-300">
                                Blog
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-[#e30f28] transition-colors duration-300">
                                Preguntas Frecuentes
                            </a>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold">Soporte</h3>
                        <div className="space-y-3">
                            <a href="#" className="block text-gray-300 hover:text-[#e30f28] transition-colors duration-300">
                                Centro de Ayuda
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-[#e30f28] transition-colors duration-300">
                                Contacto
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-[#e30f28] transition-colors duration-300">
                                Términos de Servicio
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-[#e30f28] transition-colors duration-300">
                                Política de Privacidad
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-[#e30f28] transition-colors duration-300">
                                Reembolsos
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold">Contacto</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-[#e30f28]"/>
                                <span className="text-gray-300">info@linguafast.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <PhoneCall className="h-5 w-5 text-[#e30f28]"/>
                                <span className="text-gray-300">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPinCheckInside className="h-5 w-5 text-[#e30f28]"/>
                                <span className="text-gray-300">
                                    123 Education Street
                                    <br />
                                    Learning City, LC 12345
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-300 text-center md:text-left">
                        © {new Date().getFullYear()} LinguaFast. Todos los derechos reservados.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-300 hover:text-[#e30f28] transition-colors duration-300">
                            Términos
                        </a>
                        <a href="#" className="text-gray-300 hover:text-[#e30f28] transition-colors duration-300">
                            Privacidad
                        </a>
                        <a href="#" className="text-gray-300 hover:text-[#e30f28] transition-colors duration-300">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
