import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GooeyNav from '../ReactBits/GooeyNav';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleNavClick = (href) => {
    setIsAnimating(false);
    setTimeout(() => setIsMenuOpen(false), 300);

    if (href.startsWith('#')) {
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 350);
    }
  };

  const menuItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Proyectos", href: "#proyects" },
    { label: "Equipo", href: "#equipo" },
    { label: "Contacto", href: "/form" } 
  ];

  return (
    <nav className={`
      fixed w-full top-0 z-50 transition-all duration-300
      ${scrolled 
        ? 'bg-black/95 backdrop-blur-lg shadow-lg border-b border-gray-800' 
        : 'bg-black/80 backdrop-blur-md border-b border-gray-800/50'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3 z-10">
            <Link 
              to="/#inicio"
              className="group flex items-center space-x-3 transition-transform duration-300 hover:scale-105"
            >
              <div className="w-40 h-10 aspect-video rounded-lg flex items-center justify-center shadow-md transition-all duration-300 ">
                <img 
                  src="/black_sheep_white.png" 
                  alt="Black Sheep Logo"
                  className="w-full transition-transform duration-300 object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1">
            <GooeyNav items={menuItems} />
          </div>

          <div className="hidden md:block w-10"></div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button
              onClick={handleMenuToggle}
              className={`
                text-white focus:outline-none rounded-lg p-2 transition-all duration-300
                ${isMenuOpen 
                  ? 'bg-white/20 hover:bg-white/25 rotate-90' 
                  : 'bg-white/10 hover:bg-white/15 hover:scale-110'
                }
              `}
              aria-label="Toggle menu"
            >
              <svg 
                className="h-6 w-6 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {(isMenuOpen || isAnimating) && (
            <>
              {/* Backdrop con blur */}
              <div 
                className={`
                  md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 mt-16
                  transition-opacity duration-300
                  ${isAnimating ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={handleMenuToggle}
              />

              {/* Menu Container */}
              <div className={`
                md:hidden fixed inset-x-0 top-20 z-40 px-4
                transition-all duration-300 ease-out
                ${isAnimating 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 -translate-y-4'
                }
              `}>
                <div className="bg-gradient-to-br from-[#0E0F15] to-[#1a1b24] border border-gray-700/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                  
                  {/* Menu Items */}
                  <div className="flex flex-col space-y-3 relative z-10">
                    {menuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`
                          transition-all duration-500 ease-out
                          ${isAnimating 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 translate-x-8'
                          }
                        `}
                        style={{
                          transitionDelay: isAnimating ? `${index * 80 + 150}ms` : '0ms'
                        }}
                      >
                        {item.href.startsWith('#') ? (
                          <button
                            onClick={() => handleNavClick(item.href)}
                            className="
                              text-white hover:text-white py-4 px-6 rounded-xl 
                              bg-white/5 hover:bg-white/10 transition-all duration-300 
                              text-center font-medium w-full
                              border border-white/10 hover:border-white/20
                              transform hover:scale-[1.02] active:scale-95
                              shadow-lg hover:shadow-xl
                              relative overflow-hidden group
                            "
                          >
                            <span className="relative z-10">{item.label}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </button>
                        ) : (
                          <Link
                            to={item.href}
                            onClick={() => handleNavClick(item.href)}
                            className="
                              text-white hover:text-white py-4 px-6 rounded-xl 
                              bg-white/5 hover:bg-white/10 transition-all duration-300 
                              text-center font-medium block w-full
                              border border-white/10 hover:border-white/20
                              transform hover:scale-[1.02] active:scale-95
                              shadow-lg hover:shadow-xl
                              relative overflow-hidden group
                            "
                          >
                            <span className="relative z-10">{item.label}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Efectos decorativos de fondo */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    <div className={`
                      absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl
                      transition-all duration-1000
                      ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                    `} />
                    <div className={`
                      absolute -bottom-10 -left-10 w-28 h-28 bg-blue-500/20 rounded-full blur-2xl
                      transition-all duration-1000 delay-200
                      ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                    `} />
                    <div className={`
                      absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl
                      transition-all duration-1000 delay-400
                      ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                    `} />
                  </div>

                  {/* Borde animado */}
                  <div className={`
                    absolute inset-0 rounded-2xl
                    bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    blur-sm
                  `} />
                </div>

                {/* Botón Cerrar */}
                <div className={`
                  mt-4 flex justify-center
                  transition-all duration-500
                  ${isAnimating ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-4'}
                `}>
                  <button
                    onClick={handleMenuToggle}
                    className="
                      text-white/90 hover:text-white py-3 px-8 rounded-full
                      bg-white/10 hover:bg-white/20 transition-all duration-300
                      border border-white/20 hover:border-white/40
                      text-sm font-medium backdrop-blur-sm
                      transform hover:scale-105 active:scale-95
                      shadow-lg hover:shadow-xl
                    "
                  >
                    Cerrar Menú
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;