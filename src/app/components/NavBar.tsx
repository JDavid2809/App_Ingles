"use client";

import { BookMarked, DollarSign, House } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <header className="bg-white rounded-bl-2xl rounded-br-2xl shadow-lg sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 md:flex-none flex justify-center md:justify-start">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logoIngles.jpg"
                  alt="Logo"
                  width={400}
                  height={200}
                  className="h-14 w-auto md:h-16 md:w-auto"
                />
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8 flex-1 justify-center">
              <Link
                href="#inicio"
                className="text-[#00246a] hover:text-[#e30f28] transition-all duration-300 font-medium relative group py-2 flex items-center space-x-2"
              >
                <House className="h-5 w-5" />
                <span>Inicio</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e30f28] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#cursos"
                className="text-[#00246a] hover:text-[#e30f28] transition-all duration-300 font-medium relative group py-2 flex items-center space-x-2"
              >
                <BookMarked className="h-5 w-5" />
                <span>Cursos</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e30f28] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#precios"
                className="text-[#00246a] hover:text-[#e30f28] transition-all duration-300 font-medium relative group py-2 flex items-center space-x-2"
              >
                <DollarSign className="h-5 w-5" />
                <span>Precios</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e30f28] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
        <div className="flex justify-around items-center">
          <Link
            href="#inicio"
            className="flex flex-col items-center py-3 px-2 text-[#00246a] hover:text-[#e30f28]"
          >
            <House className="h-6 w-6" />
            <span className="text-xs mt-1">Inicio</span>
          </Link>
          <Link
            href="#cursos"
            className="flex flex-col items-center py-3 px-2 text-[#00246a] hover:text-[#e30f28]"
          >
            <BookMarked className="h-6 w-6" />
            <span className="text-xs mt-1">Cursos</span>
          </Link>
          <Link
            href="#precios"
            className="flex flex-col items-center py-3 px-2 text-[#00246a] hover:text-[#e30f28]"
          >
            <DollarSign className="h-6 w-6" />
            <span className="text-xs mt-1">Precios</span>
          </Link>
        </div>
      </div>
      <div className="md:hidden h-16"></div>
    </>
  );
}
