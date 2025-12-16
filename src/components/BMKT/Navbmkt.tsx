import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const isContactPage = location.pathname === "/BmktForm";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCasosClick = (e) => {
    e?.preventDefault();
    window.location.href = "/CExito";
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${
            isContactPage
              ? "bg-black/95 backdrop-blur-xl shadow-2xl border-b border-white/5"
              : scrolled
              ? "bg-black/80 backdrop-blur-2xl shadow-2xl border-b border-white/10"
              : "bg-transparent backdrop-blur-md"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <a href="#inicio" className="group">
              <img
                src="/bmktW.png"
                alt="BMKT Logo"
                className="h-12 transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(0,200,255,0.6)]"
              />
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              
              <a
                href="#inicio"
                className="
                  relative px-5 py-2 text-white/90 font-medium 
                  transition-all duration-300 rounded-lg
                  hover:text-white hover:bg-white/5
                  group
                "
              >
                Inicio
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#00C8FF] to-[#38FF66] transition-all duration-300 group-hover:w-3/4"></span>
              </a>

              <a
                href="/CasosExito"
                onClick={(e) => handleCasosClick(e)}
                className="
                  relative px-5 py-2 text-white/90 font-medium 
                  transition-all duration-300 rounded-lg
                  hover:text-white hover:bg-white/5
                  group
                "
              >
                Casos de Éxito
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#FF5AE0] to-[#D014FF] transition-all duration-300 group-hover:w-3/4"></span>
              </a>

              {/* Botón Contacto */}
              <a
                href="/BmktForm"
                className="
                  relative ml-4 px-7 py-2.5 rounded-full font-semibold text-white
                  bg-gradient-to-r from-[#00C8FF] via-[#38FF66] to-[#FF5AE0]
                  hover:shadow-[0_0_25px_rgba(0,200,255,0.5)]
                  hover:scale-105 active:scale-95
                  transition-all duration-300
                  overflow-hidden group
                "
              >
                <span className="relative z-10">Contacto</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF5AE0] via-[#D014FF] to-[#00C8FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </a>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-black/50 transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-500 ease-in-out
            ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="px-6 py-6 bg-black/50 backdrop-blur-xl border-t border-white/10 space-y-2">
            
            <a
              href="#inicio"
              onClick={() => setIsOpen(false)}
              className="
                block px-4 py-3 text-white/90 font-medium rounded-lg
                hover:text-white hover:bg-white/10
                transition-all duration-300
              "
            >
              Inicio
            </a>

            <a
              href="/CExito"
              onClick={(e) => {
                handleCasosClick(e);
                setIsOpen(false);
              }}
              className="
                block px-4 py-3 text-white/90 font-medium rounded-lg
                hover:text-white hover:bg-white/10
                transition-all duration-300
              "
            >
              Casos de Éxito
            </a>

            <a
              href="/BmktForm"
              onClick={() => setIsOpen(false)}
              className="
                block mt-4 px-4 py-3 rounded-lg text-white font-semibold text-center
                bg-gradient-to-r from-[#00C8FF] via-[#38FF66] to-[#FF5AE0]
                hover:shadow-[0_0_25px_rgba(0,200,255,0.5)]
                transition-all duration-300
              "
            >
              Contacto
            </a>
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;