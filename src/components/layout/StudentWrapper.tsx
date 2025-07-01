"use client"

import { useEffect } from 'react';

interface StudentWrapperProps {
  children: React.ReactNode;
}

export const StudentWrapper = ({ children }: StudentWrapperProps) => {
  useEffect(() => {
    // Ocultar el navbar y footer cuando se monta el componente
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    const body = document.body;
    
    if (navbar) {
      navbar.style.display = 'none';
    }
    if (footer) {
      footer.style.display = 'none';
    }
    
    // Evitar scroll en el body para páginas de dashboard
    body.style.overflow = 'hidden';
    body.style.height = '100vh';

    // Limpiar cuando se desmonta el componente
    return () => {
      if (navbar) {
        navbar.style.display = '';
      }
      if (footer) {
        footer.style.display = '';
      }
      body.style.overflow = '';
      body.style.height = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-hidden">
      {children}
    </div>
  );
};
