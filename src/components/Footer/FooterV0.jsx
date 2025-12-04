"use client"

import { Twitter, Github, Linkedin } from "lucide-react"
import { useLocation } from "react-router-dom"

export function FooterSection() {

  const location = useLocation();
  const isMicroPage = location.pathname === "/MicroPage";

  const textMain = isMicroPage ? "text-black" : "text-foreground";
  const textMuted = isMicroPage ? "text-black/60" : "text-muted-foreground";

  return (
    <>
    <footer
      className={`
        w-full max-w-[1320px] mx-auto px-5 text-white
        flex flex-col md:flex-row justify-between items-start 
        gap-8 md:gap-0 py-10 md:py-[70px]
      `}
    >
      {/* Left Section */}
      <div className="flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <div className="flex gap-3 items-stretch justify-center">
          <div className={`text-xl font-semibold leading-4 ${textMain}`}>
            Black Sheep
          </div>
        </div>

        <p className={`${isMicroPage ? "text-black/70" : "text-foreground/90"} text-sm font-medium leading-[18px]`}>
          Automatiza. Optimiza. Crece.
        </p>

        <div className="flex justify-start items-start gap-3">
          <Twitter className={`w-4 h-4 ${textMuted}`} />
          <Github className={`w-4 h-4 ${textMuted}`} />
          <Linkedin className={`w-4 h-4 ${textMuted}`} />
        </div>
      </div>

      {/* Right Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 p-4 md:p-8 w-full md:w-auto text-white">
        
        {/* Column 1 */}
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className={`${textMuted} text-sm font-medium leading-5`}>Empresa</h3>
          <div className="flex flex-col gap-2">
            <a className={`${textMain} text-sm hover:underline`}>Quiénes somos</a>
            <a className={`${textMain} text-sm hover:underline`}>Misión y visión</a>
            <a className={`${textMain} text-sm hover:underline`}>Nuestro equipo</a>
            <a className={`${textMain} text-sm hover:underline`}>Contacto</a>
            <a className={`${textMain} text-sm hover:underline`}>Centro de ayuda</a>
            <a className={`${textMain} text-sm hover:underline`}>Estado del servicio</a>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className={`${textMuted} text-sm`}>Software</h3>
          <div className="flex flex-col gap-2">
            <a className={`${textMain} text-sm hover:underline`}>Características</a>
            <a className={`${textMain} text-sm hover:underline`}>Planes y precios</a>
            <a className={`${textMain} text-sm hover:underline`}>Integraciones</a>
            <a className={`${textMain} text-sm hover:underline`}>Casos de uso</a>
            <a className={`${textMain} text-sm hover:underline`}>Solicitar demostración</a>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className={`${textMuted} text-sm`}>Recursos</h3>
          <div className="flex flex-col gap-2">
            <a className={`${textMain} text-sm hover:underline`}>Documentación</a>
            <a className={`${textMain} text-sm hover:underline`}>API</a>
            <a className={`${textMain} text-sm hover:underline`}>Blog</a>
            <a className={`${textMain} text-sm hover:underline`}>Comunidad</a>
          </div>
        </div>
      </div>
    </footer>

    {/* Bottom Bar */}
    <div className={`w-full py-4 px-5`}>
      <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-4">
        {/* Left - Powered by */}
        <div className="flex items-center gap-2">
          <img src="/black_sheep_white.png" alt="Black Sheep" className="h-8 object-contain" />
        </div>

        {/* Center - Links and Info */}
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex flex-wrap justify-center items-center gap-2 text-white/80 text-xs">
            <span>© 2025 Blck Sheep</span>
            <span>|</span>
            <a href="#" className="hover:underline">Aviso de Privacidad</a>
            <span>|</span>
            <a href="#" className="hover:underline">Términos y Condiciones</a>
            <span>|</span>
            <a href="#" className="hover:underline">Seguridad de Datos</a>
          </div>
        </div>

        {/* Right - Logo */}
        <div className="flex items-center">
          <img src="/LOGO_FYTTSA_White.png" alt="Fyttg" className="h-16 object-contain" />
        </div>
      </div>
    </div>
    </>
  )
}
