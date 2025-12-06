import { useEffect, useState } from "react";
import { LogIn, LogOut, User, Settings, ChevronDown, X } from "lucide-react";

export default function NavBar({
  links = [
    { label: "Sistema ERP", href: "/MicroPage" },
    { label: "Precios", href: "/Prices" },
    { label: "Contáctanos", href: "/FormMicro" },
  ],
  isAuthenticated,
  username,
  onLoginClick,
  onLogoutClick,
  onOpenAdmin,
  onOpenVpsAdmin,
  onOpenHourlyAdmin,
}) {
  const [scrollY, setScrollY] = useState(0);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePathChange);
    
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handlePathChange();
    };

    return () => {
      window.removeEventListener("popstate", handlePathChange);
      window.history.pushState = originalPushState;
    };
  }, []);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMobileMenu]);

  const canUseAdmin = currentPath === "/Prices";

  const requirePricesForAdmin = () => {
    alert("Para utilizar el panel de administración dirígete a la página de Precios.");
  };

  const handleAdminClick = () => {
    if (!canUseAdmin) return requirePricesForAdmin();
    setShowAdminMenu(false);
    onOpenAdmin && onOpenAdmin();
  };

  const handleVpsClick = () => {
    if (!canUseAdmin) return requirePricesForAdmin();
    setShowAdminMenu(false);
    onOpenVpsAdmin && onOpenVpsAdmin();
  };

  const handleHourlyClick = () => {
    if (!canUseAdmin) return requirePricesForAdmin();
    setShowAdminMenu(false);
    onOpenHourlyAdmin && onOpenHourlyAdmin();
  };

  const handleLogout = () => {
    setLoggingOut(true);
    setShowAdminMenu(false);
    
    setTimeout(() => {
      onLogoutClick && onLogoutClick();
      setLoggingOut(false);
    }, 600);
  };

  const handleLinkClick = (href) => {
    setCurrentPath(href);
    setShowMobileMenu(false);
  };

  return (
    <>
      {loggingOut && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 shadow-2xl animate-scaleIn">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-lg font-semibold text-gray-800">Cerrando sesión...</p>
            </div>
          </div>
        </div>
      )}

      <nav
        className={`fixed top-0 left-0 w-full z-50 
        transition-all duration-300 backdrop-blur-xl
        border-b border-transparent
        ${scrollY > 80 ? "bg-white/90 shadow-md border-gray-300" : "bg-white/50"}
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
            </div>

            <div className="hidden md:flex justify-center gap-2 lg:gap-3">
              {links.map((link, i) => {
                const isActive = currentPath === link.href;
                return (
                  <a
                    key={i}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`
                      group relative px-4 lg:px-5 py-2.5 rounded-xl font-semibold text-base lg:text-lg
                      transition-all duration-300 overflow-hidden
                      flex items-center gap-2
                      ${isActive
                        ? "text-orange-600 bg-orange-50" 
                        : "text-gray-600 hover:text-orange-500 hover:bg-orange-50/50"
                      }
                    `}
                  >
                    <span className="relative z-10 whitespace-nowrap">{link.label}</span>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-orange-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
                    </div>

                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-slideUp" />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="hidden md:flex items-center relative">
              {!isAuthenticated ? (
                <button
                  onClick={canUseAdmin ? onLoginClick : requirePricesForAdmin}
                  className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-white backdrop-blur-xl transition-all shadow-lg overflow-hidden bg-orange-500 hover:shadow-xl hover:bg-orange-600 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span className="font-semibold">Iniciar Sesión</span>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
                  </div>
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowAdminMenu(!showAdminMenu)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border-2 border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all hover:scale-105 active:scale-95"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{username}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform text-gray-600 ${
                        showAdminMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showAdminMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border-2 border-gray-100 flex flex-col py-2 animate-slideDown">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs text-gray-500 font-medium">ADMINISTRACIÓN</p>
                      </div>
                      
                      <button
                        onClick={handleAdminClick}
                        className="px-4 py-2.5 text-sm flex gap-3 items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all group"
                      >
                        <Settings className="w-4 h-4 transition-transform group-hover:rotate-90" /> 
                        <span className="font-medium">Admin Precios</span>
                      </button>
                      <button
                        onClick={handleVpsClick}
                        className="px-4 py-2.5 text-sm flex gap-3 items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all group"
                      >
                        <Settings className="w-4 h-4 transition-transform group-hover:rotate-90" /> 
                        <span className="font-medium">Admin VPS</span>
                      </button>
                      <button
                        onClick={handleHourlyClick}
                        className="px-4 py-2.5 text-sm flex gap-3 items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all group"
                      >
                        <Settings className="w-4 h-4 transition-transform group-hover:rotate-90" /> 
                        <span className="font-medium">Admin Hora</span>
                      </button>

                      <div className="border-t border-gray-100 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="px-4 py-2.5 text-sm flex gap-3 items-center text-red-600 hover:bg-red-50 transition-all group"
                      >
                        <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-1" /> 
                        <span className="font-medium">Cerrar Sesión</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300 focus:outline-none hover:scale-110 active:scale-95"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`
                  block h-0.5 w-full bg-gray-700 rounded-full transition-all duration-300 origin-center
                  ${showMobileMenu ? 'rotate-45 translate-y-[7px]' : ''}
                `} />
                <span className={`
                  block h-0.5 w-full bg-gray-700 rounded-full transition-all duration-300
                  ${showMobileMenu ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
                `} />
                <span className={`
                  block h-0.5 w-full bg-gray-700 rounded-full transition-all duration-300 origin-center
                  ${showMobileMenu ? '-rotate-45 -translate-y-[7px]' : ''}
                `} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {showMobileMenu && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-gradient-to-br from-black/80 via-orange-900/20 to-black/80 backdrop-blur-lg animate-fadeIn"
            onClick={() => setShowMobileMenu(false)}
          ></div>
          
          <div className="fixed inset-x-4 top-20 bottom-4 overflow-y-auto animate-scaleIn">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-6 relative overflow-hidden">
              
              <button
                onClick={() => setShowMobileMenu(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all hover:rotate-90 hover:scale-110 active:scale-95 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-16"></div>

              <div className="flex flex-col gap-3 mb-6">
                {links.map((link, i) => {
                  const isActive = currentPath === link.href;
                  return (
                    <a
                      key={i}
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className={`group relative flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all hover:scale-[1.02] active:scale-95 overflow-hidden ${
                        isActive 
                          ? "bg-gradient-to-r from-orange-100 to-orange-50 border-orange-300" 
                          : "bg-gradient-to-r from-orange-50 to-transparent hover:from-orange-100 hover:to-orange-50 border-orange-100 hover:border-orange-200"
                      }`}
                      style={{
                        animation: `slideInRight 0.4s ease-out ${i * 0.1}s backwards`
                      }}
                    >
                      <span className={`text-lg font-semibold transition-colors ${
                        isActive ? "text-orange-600" : "text-gray-700 group-hover:text-orange-600"
                      }`}>
                        {link.label}
                      </span>

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="border-t border-gray-200 pt-6">
                {!isAuthenticated ? (
                  <button
                    onClick={() => {
                      if (canUseAdmin) {
                        onLoginClick();
                        setShowMobileMenu(false);
                      } else {
                        requirePricesForAdmin();
                      }
                    }}
                    className="w-full relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white transition-all shadow-lg group overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <LogIn className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    <span className="font-semibold text-lg">Iniciar Sesión</span>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                    </div>
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Usuario</p>
                        <p className="font-semibold text-gray-800">{username}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handleAdminClick();
                        setShowMobileMenu(false);
                      }}
                      className="w-full px-5 py-3 text-left flex gap-3 items-center text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all group"
                    >
                      <Settings className="w-5 h-5 transition-transform group-hover:rotate-90" /> 
                      <span className="font-medium">Admin Precios</span>
                    </button>
                    <button
                      onClick={() => {
                        handleVpsClick();
                        setShowMobileMenu(false);
                      }}
                      className="w-full px-5 py-3 text-left flex gap-3 items-center text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all group"
                    >
                      <Settings className="w-5 h-5 transition-transform group-hover:rotate-90" /> 
                      <span className="font-medium">Admin VPS</span>
                    </button>
                    <button
                      onClick={() => {
                        handleHourlyClick();
                        setShowMobileMenu(false);
                      }}
                      className="w-full px-5 py-3 text-left flex gap-3 items-center text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all group"
                    >
                      <Settings className="w-5 h-5 transition-transform group-hover:rotate-90" /> 
                      <span className="font-medium">Admin Hora</span>
                    </button>

                    <div className="border-t border-gray-200 my-2"></div>

                    <button
                      onClick={() => {
                        handleLogout();
                        setShowMobileMenu(false);
                      }}
                      className="w-full px-5 py-3 text-left flex gap-3 items-center text-red-600 hover:bg-red-50 rounded-xl transition-all group"
                    >
                      <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-1" /> 
                      <span className="font-medium">Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-orange-300/20 to-transparent rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px) scaleX(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) scaleX(1);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}