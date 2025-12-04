import { useEffect, useState } from "react";
import { LogIn, LogOut, User, Settings, ChevronDown, Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
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

  const canUseAdmin = location.pathname === "/Prices";

  const requirePricesForAdmin = () => {
    alert("Para utilizar el panel de administración dirígete a la página de Precios (/Prices).");
  };

  const handleAdminClick = () => {
    if (!canUseAdmin) return requirePricesForAdmin();
    onOpenAdmin && onOpenAdmin();
  };

  const handleVpsClick = () => {
    if (!canUseAdmin) return requirePricesForAdmin();
    onOpenVpsAdmin && onOpenVpsAdmin();
  };

  const handleHourlyClick = () => {
    if (!canUseAdmin) return requirePricesForAdmin();
    onOpenHourlyAdmin && onOpenHourlyAdmin();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 
        transition-all duration-300 backdrop-blur-xl
        border-b border-transparent
        ${scrollY > 80 ? "bg-white/80 shadow-md border-gray-300" : "bg-white/40"}
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="w-10"></div>

            <div className="hidden md:flex justify-center gap-6 lg:gap-10 font-semibold text-gray-600 text-base lg:text-lg">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="hover:text-orange-500 transition-all hover:-translate-y-[2px] whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center relative">
              {!isAuthenticated && (
                <button
                  onClick={onLoginClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white backdrop-blur-xl transition shadow hover:bg-orange-600"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="font-semibold">Iniciar</span>
                </button>
              )}

              {isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={() => setShowAdminMenu(!showAdminMenu)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border shadow-sm hover:bg-gray-100 transition"
                  >
                    <User className="w-4 h-4 text-black" />
                    <span className="text-sm text-black">{username}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition text-black ${
                        showAdminMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showAdminMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border flex flex-col py-2">
                      <button
                        onClick={handleAdminClick}
                        className="px-4 py-2 text-sm flex gap-2 items-center text-black hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4" /> Admin Precios
                      </button>
                      <button
                        onClick={handleVpsClick}
                        className="px-4 py-2 text-sm flex gap-2 items-center text-black hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4" /> Admin VPS
                      </button>
                      <button
                        onClick={handleHourlyClick}
                        className="px-4 py-2 text-sm flex gap-2 items-center text-black hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4" /> Admin Hora
                      </button>

                      <div className="border-t my-1"></div>

                      <button
                        onClick={onLogoutClick}
                        className="px-4 py-2 text-sm flex gap-2 items-center text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" /> Salir
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {showMobileMenu && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          ></div>
          <div className="fixed top-16 right-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto">
            <div className="flex flex-col p-6 gap-4">
              <div className="flex flex-col gap-3">
                {links.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    onClick={() => setShowMobileMenu(false)}
                    className="text-lg font-semibold text-gray-700 hover:text-orange-500 transition py-2 border-b border-gray-100"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                {!isAuthenticated && (
                  <button
                    onClick={() => {
                      onLoginClick();
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500 text-white transition shadow hover:bg-orange-600"
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="font-semibold">Iniciar Sesión</span>
                  </button>
                )}

                {isAuthenticated && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl mb-2">
                      <User className="w-5 h-5 text-gray-700" />
                      <span className="font-semibold text-gray-700">{username}</span>
                    </div>

                    <button
                      onClick={() => {
                        handleAdminClick();
                        setShowMobileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left flex gap-2 items-center text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    >
                      <Settings className="w-5 h-5" /> Admin Precios
                    </button>
                    <button
                      onClick={() => {
                        handleVpsClick();
                        setShowMobileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left flex gap-2 items-center text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    >
                      <Settings className="w-5 h-5" /> Admin VPS
                    </button>
                    <button
                      onClick={() => {
                        handleHourlyClick();
                        setShowMobileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left flex gap-2 items-center text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    >
                      <Settings className="w-5 h-5" /> Admin Hora
                    </button>

                    <div className="border-t my-2"></div>

                    <button
                      onClick={() => {
                        onLogoutClick();
                        setShowMobileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left flex gap-2 items-center text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <LogOut className="w-5 h-5" /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
