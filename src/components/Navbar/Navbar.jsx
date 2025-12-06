import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { X, Home, Briefcase, Users, Mail } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (href, index) => {
    setActiveItem(index);
    setIsMenuOpen(false);

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      } else {
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    }
  };

  const menuItems = [
    { label: "Inicio", href: "#inicio", icon: Home },
    { label: "Proyectos", href: "#proyects", icon: Briefcase },
    { label: "Equipo", href: "#equipo", icon: Users },
    { label: "Contacto", href: "/form", icon: Mail }
  ];

  return (
    <>
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
                to="/"
                onClick={() => {
                  if (location.pathname === '/') {
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="group flex items-center space-x-3 transition-transform duration-300 hover:scale-105"
              >
                <div className="w-40 h-10 rounded-lg flex items-center justify-center shadow-md transition-all duration-300">
                  <img 
                    src="/BSwhite 1.png" 
                    alt="Black Sheep Logo"
                    className="w-full transition-transform duration-300 object-contain group-hover:brightness-110"
                  />
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center flex-1 gap-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return item.href.startsWith('#') ? (
                  <button
                    key={index}
                    onClick={() => handleNavClick(item.href, index)}
                    className={`
                      group relative px-6 py-2.5 rounded-xl font-medium
                      transition-all duration-300 overflow-hidden
                      flex items-center gap-2
                      ${activeItem === index 
                        ? 'text-white bg-white/15' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <span className="relative z-10">{item.label}</span>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
                    </div>

                    {activeItem === index && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                    )}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={() => setActiveItem(index)}
                    className={`
                      group relative px-6 py-2.5 rounded-xl font-medium
                      transition-all duration-300 overflow-hidden
                      flex items-center gap-2
                      ${activeItem === index 
                        ? 'text-white bg-white/15' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    <span className="relative z-10">{item.label}</span>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
                    </div>

                    {activeItem === index && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:block w-10"></div>

            <div className="md:hidden z-50">
              <button
                onClick={handleMenuToggle}
                className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 focus:outline-none hover:scale-110 active:scale-95"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`
                    block h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center
                    ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}
                  `} />
                  <span className={`
                    block h-0.5 w-full bg-white rounded-full transition-all duration-300
                    ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
                  `} />
                  <span className={`
                    block h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center
                    ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}
                  `} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`
        md:hidden fixed inset-0 z-40 transition-all duration-500 ease-out
        ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}
      `}>
        <div 
          className={`
            absolute inset-0 bg-gradient-to-br from-black/95 via-purple-900/20 to-black/95 backdrop-blur-xl
            transition-opacity duration-500
            ${isMenuOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={handleMenuToggle}
        />

        <div className={`
          relative h-full flex flex-col justify-center items-center px-8
          transition-all duration-700 ease-out
          ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}>
          
          <button
            onClick={handleMenuToggle}
            className={`
              absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 
              text-white transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95
              ${isMenuOpen ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 -translate-y-4'}
            `}
          >
            <X className="w-6 h-6" />
          </button>

          <div className={`
            mb-12 transition-all duration-700 delay-100
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <img 
              src="/black_sheep_white.png" 
              alt="Black Sheep"
              className="w-48 h-auto opacity-30"
            />
          </div>

          {/* Menu Items */}
          <div className="w-full max-w-md space-y-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`
                    transition-all duration-700 ease-out
                    ${isMenuOpen 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-12'
                    }
                  `}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 100 + 200}ms` : '0ms'
                  }}
                >
                  {item.href.startsWith('#') ? (
                    <button
                      onClick={() => handleNavClick(item.href, index)}
                      className="
                        w-full group relative overflow-hidden
                        flex items-center gap-4 px-8 py-5 rounded-2xl
                        bg-white/5 hover:bg-white/10 
                        border border-white/10 hover:border-white/30
                        transition-all duration-300
                        hover:scale-105 active:scale-95
                        hover:shadow-2xl hover:shadow-purple-500/20
                      "
                    >
                      <Icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                      <span className="text-2xl font-semibold text-white group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                      
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                      </div>
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => handleNavClick(item.href, index)}
                      className="
                        w-full group relative overflow-hidden
                        flex items-center gap-4 px-8 py-5 rounded-2xl
                        bg-white/5 hover:bg-white/10 
                        border border-white/10 hover:border-white/30
                        transition-all duration-300
                        hover:scale-105 active:scale-95
                        hover:shadow-2xl hover:shadow-purple-500/20
                      "
                    >
                      <Icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                      <span className="text-2xl font-semibold text-white group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                      
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`
              absolute top-1/4 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl
              transition-all duration-1000
              ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            `} />
            <div className={`
              absolute bottom-1/4 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl
              transition-all duration-1000 delay-200
              ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            `} />
            <div className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl
              transition-all duration-1000 delay-400
              ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            `} />
          </div>

          {/* Footer */}
          <div className={`
            absolute bottom-8 text-center transition-all duration-700 delay-500
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <p className="text-white/40 text-sm">Black Sheep © 2026</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;