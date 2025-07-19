"use client"

import { useEffect } from 'react';

interface AdminWrapperProps {
  children: React.ReactNode;
}

export const AdminWrapper = ({ children }: AdminWrapperProps) => {
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
    
    // body.style.overflow = 'hidden';
    // body.style.height = '100vh';

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
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      {children}
    </div>
  );
};
