import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [hoverHighlight, setHoverHighlight] = useState({ left: 0, width: 0, opacity: 0 });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isMenuOpen]);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (href, index) => {
    setActiveItem(index);
    setIsMenuOpen(false);

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 450);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const menuItems = [
    { label: "INICIO", href: "#inicio" },
    { label: "PRODUCTOS", href: "#proyects" },
    { label: "EQUIPO", href: "#equipo" },
    { label: "CONTACTO", href: "/form" }
  ];

  const updateHighlight = (index) => {
    const el = document.querySelector(`#nav-item-${index}`);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const parentRect = el.parentElement.getBoundingClientRect();

    setHighlightStyle({
      left: rect.left - parentRect.left,
      width: rect.width,
      opacity: 1
    });
  };

  useEffect(() => {
    if (activeItem !== null) updateHighlight(activeItem);
  }, [activeItem]);

  const updateHoverHighlight = (index) => {
    const el = document.querySelector(`#nav-item-${index}`);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const parentRect = el.parentElement.getBoundingClientRect();

    setHoverHighlight({
      left: rect.left - parentRect.left,
      width: rect.width,
      opacity: 0.4
    });
  };

  useEffect(() => {
    const sections = menuItems
      .filter(i => i.href.startsWith("#"))
      .map(i => document.querySelector(i.href))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const index = menuItems.findIndex(i => i.href === `#${id}`);
            if (index !== -1) setActiveItem(index);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        className={`
          fixed w-full top-0 z-50 transition-all duration-300
          ${scrolled
            ? "bg-black/95 backdrop-blur-lg shadow-lg border-b border-gray-800"
            : "bg-black/80 backdrop-blur-md border-b border-gray-800/50"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <div className="flex-shrink-0 flex items-center space-x-3 z-10">
              <Link to="/">
                <div className="w-40 h-10 flex items-center">
                  <img src="/BSwhite 1.png" className="w-full object-contain" alt="Black Sheep Logo" />
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center flex-1 gap-2 relative">

              <div
                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                style={highlightStyle}
              ></div>

              <div
                className="absolute bottom-0 h-0.5 bg-white/40 rounded-full transition-all duration-300"
                style={hoverHighlight}
              ></div>

              {menuItems.map((item, index) => (
                item.href.startsWith("#") ? (
                  <button
                    id={`nav-item-${index}`}
                    key={index}
                    onClick={() => handleNavClick(item.href, index)}
                    onMouseEnter={() => updateHoverHighlight(index)}
                    onMouseLeave={() => setHoverHighlight({ opacity: 0 })}
                    className={`
                      group relative px-6 py-2.5 rounded-xl font-medium
                      transition-all duration-300
                      ${activeItem === index
                        ? "text-white bg-white/15"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    id={`nav-item-${index}`}
                    key={index}
                    to={item.href}
                    onClick={() => setActiveItem(index)}
                    onMouseEnter={() => updateHoverHighlight(index)}
                    onMouseLeave={() => setHoverHighlight({ opacity: 0 })}
                    className={`
                      group relative px-6 py-2.5 rounded-xl font-medium
                      transition-all duration-300
                      ${activeItem === index
                        ? "text-white bg-white/15"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                )
              ))}

            </div>

            <div className="md:hidden z-50">
              <button
                onClick={handleMenuToggle}
                className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                  <span className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
                  <span className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
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
            <span className="text-3xl">×</span>
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

          <div className="w-full max-w-md space-y-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`
                  transition-all duration-700 ease-out
                  ${isMenuOpen 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-12'
                  }
                `}
                style={{ transitionDelay: isMenuOpen ? `${index * 100 + 200}ms` : '0ms' }}
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
                    <span className="text-2xl font-semibold text-white group-hover:text-white">
                      {item.label}
                    </span>
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
                    <span className="text-2xl font-semibold text-white group-hover:text-white">
                      {item.label}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 text-center">
            <p className="text-white/40 text-sm">Black Sheep © 2026</p>
          </div>
        </div>
      </div>

    </>
  );
};

export default Navbar;
