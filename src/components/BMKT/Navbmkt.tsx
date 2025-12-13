import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown, X, Menu } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  
  const location = useLocation();
  const isContactPage = location.pathname === "/BmktForm";

  const casos = [
    { label: "Elyssia", link: "https://elyssia.com.mx/" },
    { label: "KRKN", link: "https://krkn.mx" },
    { label: "Stick", link: "https://stick.mx/" },
    { label: "QDWDA", link: "/" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

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

              {/* Dropdown Desktop */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`
                    relative px-5 py-2 font-medium rounded-lg
                    flex items-center gap-2 transition-all duration-300
                    group
                    ${dropdownOpen 
                      ? 'text-white bg-white/10' 
                      : 'text-white/90 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  Casos de Éxito
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#FF5AE0] to-[#D014FF] transition-all duration-300 group-hover:w-3/4"></span>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-56 animate-slideDown">
                    <div className="relative">
                      {/* Flecha superior */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-[#00C8FF] to-[#D014FF] rotate-45"></div>
                      
                      <div className="relative p-[1px] rounded-xl bg-gradient-to-br from-[#00C8FF] via-[#FF5AE0] to-[#D014FF] shadow-2xl">
                        <div className="bg-black/95 backdrop-blur-xl rounded-xl overflow-hidden">
                          {casos.map((caso, index) => (
                            <a
                              key={index}
                              href={caso.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                block px-5 py-3 text-white/90 font-medium
                                hover:text-white hover:bg-gradient-to-r hover:from-[#00C8FF]/10 hover:to-[#FF5AE0]/10
                                transition-all duration-300
                                border-b border-white/5 last:border-b-0
                                group
                              "
                            >
                              <span className="flex items-center justify-between">
                                {caso.label}
                                <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

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

            {/* Casos de Éxito Mobile */}
            <div className="space-y-2">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="
                  w-full flex items-center justify-between px-4 py-3
                  text-white/90 font-medium rounded-lg
                  hover:text-white hover:bg-white/10
                  transition-all duration-300
                "
              >
                Casos de Éxito
                <ChevronDown 
                  size={18} 
                  className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {dropdownOpen && (
                <div className="space-y-2 mt-2">
                  {casos.map((caso, index) => (
                    <div
                      key={index}
                      className="p-[1px] rounded-lg bg-gradient-to-r from-[#00C8FF] to-[#D014FF] ml-4"
                    >
                      <a
                        href={caso.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          setIsOpen(false);
                          setDropdownOpen(false);
                        }}
                        className="
                          block px-4 py-3 text-white font-medium rounded-[7px]
                          bg-black/95 backdrop-blur-md
                          hover:bg-gradient-to-r hover:from-[#00C8FF]/20 hover:to-[#FF5AE0]/20
                          transition-all duration-300
                          text-center
                        "
                      >
                        {caso.label}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

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