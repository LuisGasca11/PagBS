import { useEffect, useState } from "react";
import { LogIn, LogOut, User, Settings, ChevronDown, X, Menu, UserCircle } from "lucide-react";

export default function NavBar({
  links = [
    { label: "Sistema ERP", href: "/MicroPage" },
    { label: "Precios", href: "/Prices" },
    { label: "Contáctanos", href: "/FormMicro" },
  ],
  isAuthenticated,
  username,
  userRole,
  userId,
  onLoginClick,
  onLogoutClick,
  onOpenAdmin,
  onOpenVpsAdmin,
  onOpenHourlyAdmin,
  onOpenUsersAdmin,
  onOpenDocuments,
  onOpenProfile,
}) {
  const [scrollY, setScrollY] = useState(0);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [currentPath, setCurrentPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
      if (window.history.pushState === originalPushState) {
        window.history.pushState = originalPushState;
      }
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

  const isAdmin = userRole === 'admin';
  const isPrices = currentPath === "/Prices";

  const showNotAvailableMessage = () => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `
      fixed top-20 right-4 z-[9999] 
      bg-gradient-to-r from-orange-500 to-orange-600 
      text-white px-6 py-4 rounded-xl shadow-2xl max-w-md 
      border border-orange-300 animate-slide-in-right
    `;
    messageDiv.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="font-bold">Panel no disponible</p>
          <p class="text-sm opacity-90 mt-1">
            Los paneles de administración solo se pueden usar en la sección de <strong>Precios</strong>.
            <br>
            <span class="text-xs opacity-80">Tu sesión está activa y puedes seguir navegando.</span>
          </p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="text-white/80 hover:text-white ml-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.classList.add('animate-fade-out-up');
        setTimeout(() => {
          if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
          }
        }, 300);
      }
    }, 5000);
  };

  const handleAdminClick = () => {
    if (!isPrices) {
      showNotAvailableMessage();
      setShowAdminMenu(false);
      return;
    }
    setShowAdminMenu(false);
    onOpenAdmin && onOpenAdmin();
  };

  const handleVpsClick = () => {
    if (!isPrices) {
      showNotAvailableMessage();
      setShowAdminMenu(false);
      return;
    }
    setShowAdminMenu(false);
    onOpenVpsAdmin && onOpenVpsAdmin();
  };

  const handleHourlyClick = () => {
    if (!isPrices) {
      showNotAvailableMessage();
      setShowAdminMenu(false);
      return;
    }
    setShowAdminMenu(false);
    onOpenHourlyAdmin && onOpenHourlyAdmin();
  };

  const handleUsersClick = () => {
    if (!isPrices) {
      showNotAvailableMessage();
      setShowAdminMenu(false);
      return;
    }
    setShowAdminMenu(false);
    onOpenUsersAdmin && onOpenUsersAdmin();
  };

  const handleDocumentosClick = () => {
    setShowAdminMenu(false);
    setShowMobileMenu(false);
    
    if (onOpenDocuments) {
      onOpenDocuments(); 
    } else {
      window.location.href = "/documentos";
    }
  };

  const handleProfileClick = () => {
    setShowAdminMenu(false);
    setShowMobileMenu(false);
    onOpenProfile && onOpenProfile();
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

  const handleLoginClick = () => {
    setShowMobileMenu(false);
    onLoginClick && onLoginClick();
  };

  const getRoleText = () => {
    if (userRole === 'admin') return 'Administrador';
    if (userRole === 'user') return 'Usuario';
    return userRole || 'Usuario';
  };

  return (
    <>
      {loggingOut && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl animate-scaleIn mx-4">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                <LogOut className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
              </div>
              <p className="text-base sm:text-lg font-semibold text-gray-800">Cerrando sesión...</p>
            </div>
          </div>
        </div>
      )}

      <nav
        className={`fixed top-0 left-0 w-full z-50 
        transition-all duration-300 backdrop-blur-xl
        border-b border-transparent
        ${scrollY > 80 ? "bg-white/95 shadow-lg border-gray-200" : "bg-white/50"}
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
          <div className="flex justify-between items-center gap-2 sm:gap-4">
            
            <div className="flex-shrink-0 w-12 sm:w-14 md:w-16 lg:w-20"></div>

            <div className="hidden lg:flex justify-center gap-1 xl:gap-2 flex-1">
              {links.map((link, i) => {
                const isActive = currentPath === link.href;
                return (
                  <a
                    key={i}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`
                      group relative px-3 xl:px-4 py-2 rounded-xl font-semibold text-sm xl:text-base
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
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-slideUp transition-width duration-300" />
                    )}
                  </a>
                );
              })}
              
              {isAuthenticated && (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDocumentosClick();
                  }}
                  className={`
                    group relative px-3 xl:px-4 py-2 rounded-xl font-semibold text-sm xl:text-base
                    transition-all duration-300 overflow-hidden
                    flex items-center gap-2
                    ${currentPath === "/documentos" || currentPath.includes("documentos")
                      ? "text-orange-600 bg-orange-50" 
                      : "text-gray-600 hover:text-orange-500 hover:bg-orange-50/50"
                    }
                  `}
                >
                  <span className="relative z-10 whitespace-nowrap">Documentos</span>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-orange-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
                  </div>

                  {currentPath === "/documentos" && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-slideUp transition-width duration-300" />
                  )}
                </a>
              )}
            </div>

            <div className="hidden lg:flex items-center relative flex-shrink-0">
              {!isAuthenticated ? (
                <button
                  onClick={handleLoginClick}
                  className="group relative flex items-center gap-2 px-4 xl:px-5 py-2 xl:py-2.5 rounded-xl text-white backdrop-blur-xl transition-all shadow-lg overflow-hidden bg-orange-500 hover:shadow-xl hover:bg-orange-600 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span className="font-semibold text-sm xl:text-base">Iniciar Sesión</span>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                  </div>
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowAdminMenu(!showAdminMenu)}
                    className="flex items-center gap-2 px-3 xl:px-4 py-2 xl:py-2.5 rounded-xl bg-white border-2 border-gray-200 shadow-sm hover:bg-gray-50 hover:border-orange-300 transition-all duration-200 hover:shadow-md active:scale-[0.98]"
                  >
                    <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-inner">
                      <User className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-white" />
                    </div>
                    <span className="text-xs xl:text-sm font-semibold text-gray-700 max-w-[100px] truncate">{username}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform text-gray-600 ${
                        showAdminMenu ? "rotate-180 text-orange-600" : ""
                      }`}
                    />
                  </button>

                  {showAdminMenu && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border-2 border-gray-100 flex flex-col py-2 animate-slideDown">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs text-gray-500 font-medium uppercase">{getRoleText()}</p>
                      </div>

                      {/* OPCIÓN MI PERFIL - SIEMPRE VISIBLE */}
                      <button
                        onClick={handleProfileClick}
                        className="px-4 py-2.5 text-sm flex gap-3 items-center text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-150 group"
                      >
                        <UserCircle className="w-4 h-4 group-hover:scale-110" />
                        <span className="font-medium">Mi Perfil</span>
                      </button>

                      {isAdmin && (
                        <>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button
                            onClick={handleUsersClick}
                            className={`px-4 py-2.5 text-sm flex gap-3 items-center transition-all duration-150 group
                              ${isPrices 
                                ? "text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer" 
                                : "text-gray-400 cursor-not-allowed"
                              }`}
                            disabled={!isPrices}
                          >
                            <User className={`w-4 h-4 ${isPrices ? "group-hover:scale-110" : ""}`} />
                            <span className="font-medium">Admin Usuarios</span>
                            {!isPrices && (
                              <span className="ml-auto text-xs text-gray-400">🔒</span>
                            )}
                          </button>
                          
                          <button
                            onClick={handleAdminClick}
                            className={`px-4 py-2.5 text-sm flex gap-3 items-center transition-all duration-150 group
                              ${isPrices 
                                ? "text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer" 
                                : "text-gray-400 cursor-not-allowed"
                              }`}
                            disabled={!isPrices}
                          >
                            <Settings className={`w-4 h-4 ${isPrices ? "group-hover:rotate-90" : ""}`} /> 
                            <span className="font-medium">Admin Precios</span>
                            {!isPrices && (
                              <span className="ml-auto text-xs text-gray-400">🔒</span>
                            )}
                          </button>
                          
                          <button
                            onClick={handleVpsClick}
                            className={`px-4 py-2.5 text-sm flex gap-3 items-center transition-all duration-150 group
                              ${isPrices 
                                ? "text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer" 
                                : "text-gray-400 cursor-not-allowed"
                              }`}
                            disabled={!isPrices}
                          >
                            <Settings className={`w-4 h-4 ${isPrices ? "group-hover:rotate-90" : ""}`} /> 
                            <span className="font-medium">Admin VPS</span>
                            {!isPrices && (
                              <span className="ml-auto text-xs text-gray-400">🔒</span>
                            )}
                          </button>
                          
                          <button
                            onClick={handleHourlyClick}
                            className={`px-4 py-2.5 text-sm flex gap-3 items-center transition-all duration-150 group
                              ${isPrices 
                                ? "text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer" 
                                : "text-gray-400 cursor-not-allowed"
                              }`}
                            disabled={!isPrices}
                          >
                            <Settings className={`w-4 h-4 ${isPrices ? "group-hover:rotate-90" : ""}`} /> 
                            <span className="font-medium">Admin Hora</span>
                            {!isPrices && (
                              <span className="ml-auto text-xs text-gray-400">🔒</span>
                            )}
                          </button>
                        </>
                      )}

                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2.5 text-sm flex gap-3 items-center text-red-600 hover:bg-red-50 transition-all duration-150 group"
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
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300 focus:outline-none hover:scale-110 active:scale-95 ml-auto"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {showMobileMenu && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gradient-to-br from-black/80 via-orange-900/20 to-black/80 backdrop-blur-lg animate-fadeIn"
            onClick={() => setShowMobileMenu(false)}
          ></div>
          
          <div className="fixed inset-x-4 top-20 bottom-4 max-h-[calc(100vh-6rem)] overflow-y-auto animate-scaleIn">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 p-4 sm:p-6 relative overflow-hidden">
              
              <button
                onClick={() => setShowMobileMenu(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all hover:rotate-90 hover:scale-110 active:scale-95 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-12 sm:h-16"></div>

              <div className="flex flex-col gap-2">
                {links.map((link, i) => {
                  const isActive = currentPath === link.href;
                  return (
                    <a
                      key={i}
                      href={link.href}
                      onClick={() => {
                        handleLinkClick(link.href);
                        setShowMobileMenu(false);
                      }}
                      className={`
                        group relative px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg
                        transition-all duration-300 overflow-hidden
                        flex items-center gap-3
                        ${isActive
                          ? "text-orange-600 bg-orange-50 border border-orange-200" 
                          : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 hover:border-orange-100 border border-transparent"
                        }
                      `}
                    >
                      <span className="relative z-10 whitespace-nowrap">{link.label}</span>
                    </a>
                  );
                })}
                
                {isAuthenticated && (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDocumentosClick();
                    }}
                    className={`
                      group relative px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg
                      transition-all duration-300 overflow-hidden
                      flex items-center gap-3
                      ${currentPath === "/documentos" || currentPath.includes("documentos")
                        ? "text-orange-600 bg-orange-50 border border-orange-200" 
                        : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 hover:border-orange-100 border border-transparent"
                      }
                    `}
                  >
                    <span className="relative z-10 whitespace-nowrap">Documentos</span>
                  </a>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 sm:pt-6 mt-4 sm:mt-6">
                {!isAuthenticated ? (
                  <button
                    onClick={handleLoginClick}
                    className="w-full relative flex items-center justify-center gap-3 px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-white transition-all shadow-lg group overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <LogIn className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    <span className="font-semibold text-base sm:text-lg">Iniciar Sesión</span>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                    </div>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl sm:rounded-2xl border border-orange-200 shadow-sm">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md flex-shrink-0">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 font-medium">Usuario</p>
                        <p className="font-semibold text-gray-800 truncate">{username}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-orange-600 font-medium">{getRoleText()}</p>
                        </div>
                      </div>
                    </div>

                    {/* OPCIÓN MI PERFIL - MOBILE */}
                    <button
                      onClick={handleProfileClick}
                      className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-left flex gap-3 items-center text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all group"
                    >
                      <UserCircle className="w-5 h-5 transition-transform group-hover:scale-110 flex-shrink-0" /> 
                      <span className="font-medium text-sm sm:text-base">Mi Perfil</span>
                    </button>

                    {isAdmin && (
                      <>
                        <p className="text-xs text-gray-500 font-medium px-1 pt-2">ADMINISTRACIÓN</p>
                        
                        {isPrices ? (
                          <>
                            <button
                              onClick={() => {
                                handleUsersClick();
                                setShowMobileMenu(false);
                              }}
                              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-left flex gap-3 items-center text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all group"
                            >
                              <User className="w-5 h-5 transition-transform group-hover:scale-110 flex-shrink-0" /> 
                              <span className="font-medium text-sm sm:text-base">Admin Usuarios</span>
                            </button>
                            
                            <button
                              onClick={() => {
                                handleAdminClick();
                                setShowMobileMenu(false);
                              }}
                              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-left flex gap-3 items-center text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all group"
                            >
                              <Settings className="w-5 h-5 transition-transform group-hover:rotate-90 flex-shrink-0" /> 
                              <span className="font-medium text-sm sm:text-base">Admin Precios</span>
                            </button>
                            
                            <button
                              onClick={() => {
                                handleVpsClick();
                                setShowMobileMenu(false);
                              }}
                              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-left flex gap-3 items-center text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all group"
                            >
                              <Settings className="w-5 h-5 transition-transform group-hover:rotate-90 flex-shrink-0" /> 
                              <span className="font-medium text-sm sm:text-base">Admin VPS</span>
                            </button>
                            
                            <button
                              onClick={() => {
                                handleHourlyClick();
                                setShowMobileMenu(false);
                              }}
                              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-left flex gap-3 items-center text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all group"
                            >
                              <Settings className="w-5 h-5 transition-transform group-hover:rotate-90 flex-shrink-0" /> 
                              <span className="font-medium text-sm sm:text-base">Admin Hora</span>
                            </button>
                          </>
                        ) : (
                          <div className="px-4 sm:px-5 py-3 bg-orange-50 rounded-xl border border-orange-200">
                            <p className="text-sm text-orange-600 font-medium">
                              ⚠️ Los paneles solo están disponibles en la página de <strong>Precios</strong>
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              Ve a <a href="/Prices" className="text-orange-500 font-bold" onClick={() => setShowMobileMenu(false)}>/Prices</a> para usar las funciones de administración.
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    <div className="border-t border-gray-200 my-2"></div>

                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        setTimeout(() => handleLogout(), 100);
                      }}
                      className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-left flex gap-3 items-center text-red-600 hover:bg-red-50 rounded-xl transition-all group"
                    >
                      <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-1 flex-shrink-0" /> 
                      <span className="font-medium text-sm sm:text-base">Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
              <div className="absolute bottom-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-tr from-orange-300/20 to-transparent rounded-full blur-3xl opacity-50 animate-pulse-slow animation-delay-500"></div>
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
            transform: scale(0.95) translateY(-10px);
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
            transform: translateY(5px) scaleX(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) scaleX(1);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes fade-out-up {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        .animate-fade-out-up {
          animation: fade-out-up 0.3s ease-out forwards;
        }

        .transition-width {
          transition-property: width;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        button:disabled:hover {
          transform: none !important;
          background-color: inherit !important;
        }
      `}</style>
    </>
  );
}