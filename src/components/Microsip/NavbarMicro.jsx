import { useEffect, useState } from "react";
import { LogIn, LogOut, User, Settings, ChevronDown } from "lucide-react";
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
  
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isLoginPage = location.pathname === "/Prices" || location.pathname === "/EditablePage";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-xl border-b ${scrollY > 80 ? "bg-white/80 shadow-md border-gray-300" : "bg-white/40 border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-3 items-center">
        <div></div>
        <div className="hidden md:flex justify-center gap-10 font-semibold text-gray-600 text-lg mt-3">
          {links.map((link, i) => (
            <a key={i} href={link.href} className="hover:text-orange-500 transition-all hover:-translate-y-[2px]">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex justify-end items-center relative">
          {isLoginPage && !isAuthenticated && (
            <button
              onClick={onLoginClick}  
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 backdrop-blur-xl transition shadow"
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
                <ChevronDown className={`w-4 h-4 transition text-black ${showAdminMenu ? "rotate-180" : ""}`} />
              </button>

              {showAdminMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border flex flex-col py-2 animate-fade-down">
                  <button onClick={onOpenAdmin} className="px-4 py-2 text-sm flex gap-2 items-center text-black hover:bg-gray-100">
                    <Settings className="w-4 h-4" /> Admin Precios
                  </button>
                  <button onClick={onOpenVpsAdmin} className="px-4 py-2 text-sm flex gap-2 items-center text-black hover:bg-gray-100">
                    <Settings className="w-4 h-4" /> Admin VPS
                  </button>
                  <button onClick={onOpenHourlyAdmin} className="px-4 py-2 text-sm flex gap-2 items-center text-black hover:bg-gray-100">
                    <Settings className="w-4 h-4" /> Admin Hora
                  </button>

                  <div className="border-t my-1"></div>

                  <button onClick={onLogoutClick} className="px-4 py-2 text-sm flex gap-2 items-center text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4" /> Salir
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
