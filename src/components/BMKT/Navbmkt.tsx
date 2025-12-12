import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const isContactPage = location.pathname === "/BmktForm";

  const grad = "bg-gradient-to-r from-[#00C8FF] via-[#38FF66] via-[#FF5AE0] to-[#D014FF]";

  const casos = [
    { label: "Stick", link: "https://stick.mx" },
    { label: "KRKN", link: "https://krkn.mx" },
    { label: "Microsip", link: "/MicroPage" },
    { label: "BMKT", link: "/BmktPage" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        backdrop-blur-2xl
        ${
          isContactPage
            ? "bg-black shadow-lg"      
            : scrolled
            ? "bg-black/40 shadow-lg backdrop-blur-xl"
            : "bg-white/5 backdrop-blur-xl border-b border-white/50"

        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          <img
            src="/bmktW.png"
            alt="BMKT Logo"
            className="h-10 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          />

          <div className="hidden md:flex items-center space-x-8">

            <a
              href="#inicio"
              className="
                text-white font-medium transition-all
                hover:text-transparent hover:bg-clip-text 
                hover:bg-gradient-to-r hover:from-[#00C8FF] hover:via-[#38FF66] hover:to-[#FF5AE0]
              "
            >
              Inicio
            </a>

            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="
                    text-white font-medium transition-all
                    hover:text-transparent hover:bg-clip-text 
                    hover:bg-gradient-to-r hover:from-[#38FF66] hover:via-[#FF5AE0] hover:to-[#D014FF]
                    "
                >
                    Casos de Éxito ▾
                </button>

                {dropdownOpen && (
                    <div
                    className="
                        absolute mt-3 right-0 w-56 rounded-2xl z-50 overflow-hidden
                        bg-[#0F1113]/95 backdrop-blur-xl shadow-2xl
                        border border-white/10
                        animate-fade-in-down
                    "
                    >
                    {casos.map((c, i) => (
                        <a
                        key={i}
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            block px-4 py-3 text-white/90 font-medium
                            hover:bg-white/10 hover:text-white
                            transition-all duration-200
                        "
                        >
                        {c.label}
                        </a>
                    ))}
                    </div>
                )}
            </div>

            <a
              href="/BmktForm"
              className={`${grad} text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all`}
            >
              Contacto
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor">
              {isOpen ? (
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/30 backdrop-blur-xl border-t border-white/10 px-4 py-4 space-y-2">

          <a
            href="#inicio"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-white font-medium hover:bg-white/10 rounded-md"
          >
            Inicio
          </a>

          <p className="px-3 py-2 text-white/90 font-semibold">Casos de Éxito</p>

          <div className="pl-4 space-y-1">
            {casos.map((c, i) => (
              <a
                key={i}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="
                  block px-3 py-2 text-white/90 font-medium rounded-md
                  hover:bg-gradient-to-r hover:from-[#00C8FF]/30 hover:to-[#FF5AE0]/30 hover:text-white
                "
              >
                {c.label}
              </a>
            ))}
          </div>

          <a
            href="/BmktForm"
            onClick={() => setIsOpen(false)}
            className={`${grad} block px-3 py-2 rounded-md text-white font-medium`}
          >
            Contacto
          </a>

        </div>
      )}
    </nav>
  );
};

export default Navbar;