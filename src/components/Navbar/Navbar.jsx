import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GooeyNav from '../ReactBits/GooeyNav';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsMenuOpen(false), 300);
    }
  };

  const handleNavClick = () => {
    setIsAnimating(false);
    setTimeout(() => setIsMenuOpen(false), 300);
  };

  const menuItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Proyectos", href: "#proyects" },
    { label: "Equipo", href: "#team" },
    { label: "Contacto", href: "/form" } 
  ];

  return (
    <nav className="bg-black shadow-lg fixed w-full top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3 z-10">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-md">
              <img 
                src="/Sheep Icon.png" 
                alt="Black Sheep Logo"
                className="w-8 h-8"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white leading-tight">Black_Sheep</h1>
            </div>
          </div>

          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
            <GooeyNav items={menuItems} />
          </div>

          <div className="hidden md:block w-40"></div>

          <div className="md:hidden z-50">
            <button
              onClick={handleMenuToggle}
              className="text-white hover:text-white/80 focus:outline-none focus:text-white/80 bg-white/10 rounded-lg p-2 transition duration-300"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {(isMenuOpen || isAnimating) && (
            <div className={`
              md:hidden fixed inset-0 bg-black z-40 mt-16
              transition-all duration-300 ease-in-out
              ${isAnimating ? 'bg-opacity-90' : 'bg-opacity-0'}
            `}>
              <div className={`
                absolute top-4 left-4 right-4 bg-[#0E0F15] border border-gray-800 rounded-2xl p-6 shadow-2xl
                transition-all duration-300 ease-out
                ${isAnimating 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 -translate-y-4'
                }
              `}>
                <div className="flex flex-col space-y-3">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      className={`
                        transition-all duration-500 ease-out
                        ${isAnimating 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-4'
                        }
                      `}
                      style={{
                        transitionDelay: isAnimating ? `${index * 100 + 200}ms` : '0ms'
                      }}
                    >
                      <Link
                        to={item.href}
                        onClick={handleNavClick}
                        className="
                          text-white hover:text-white/80 py-4 px-6 rounded-xl 
                          bg-white/5 hover:bg-white/10 transition-all duration-300 
                          text-center font-medium block w-full
                          border border-transparent hover:border-white/20
                          transform hover:scale-105 active:scale-95
                          shadow-lg hover:shadow-xl
                        "
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  <div className={`
                    absolute -top-10 -right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl
                    transition-all duration-1000
                    ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                  `}></div>
                  <div className={`
                    absolute -bottom-10 -left-10 w-16 h-16 bg-blue-500/10 rounded-full blur-xl
                    transition-all duration-1000 delay-300
                    ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                  `}></div>
                </div>
              </div>

              <div className={`
                absolute bottom-8 left-1/2 transform -translate-x-1/2
                transition-all duration-500 delay-700
                ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}>
                <button
                  onClick={handleMenuToggle}
                  className="
                    text-white/80 hover:text-white py-3 px-8 rounded-full
                    bg-white/10 hover:bg-white/20 transition-all duration-300
                    border border-white/20 hover:border-white/40
                    text-sm font-medium
                    backdrop-blur-sm
                  "
                >
                  Cerrar Menú
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;