import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";
import MicrosipFooter from "./MicrosipFooter";
import NavBar from "./NavbarMicro";
import { loadSession, clearSession } from "./utils/auth";


export default function FormMicro() {


    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [scrollY, setScrollY] = useState(0);


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    useEffect(() => {
    const session = loadSession();

    if (session?.user) {
        setIsAuthenticated(true);
        setUsername(session.user.usuario);
    }
    }, []);

    const handleAdminClick = () => {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'fixed top-20 right-4 z-[9999] bg-orange-500 text-white px-6 py-4 rounded-xl shadow-2xl animate-slide-in-right';
      messageDiv.innerHTML = `
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p class="font-medium">¡Sesión activa!</p>
            <p class="text-sm">Usa los paneles en la sección de Precios</p>
          </div>
        </div>
      `;
      document.body.appendChild(messageDiv);
      setTimeout(() => messageDiv.remove(), 3000);
    };

    const handleLogout = () => {
    clearSession();
    setIsAuthenticated(false);
    setUsername("");
    };

  return (
    <>
      <div className="relative w-full">
        <a
          href="/MicroPage"
          className={`fixed top-4 left-4 z-[60] transition-all duration-300 
            ${scrollY > 80 ? "scale-75 translate-y-[-10px]" : "scale-100"}
          `}
        >
          <img
            src="/msppart.webp"
            alt="logo"
            className="h-12 sm:h-12 object-contain"
          />
        </a>

        <NavBar
          isAuthenticated={isAuthenticated}
          username={username}
          userRole={userRole}
          onLoginClick={() => setShowLoginModal(true)}
          onLogoutClick={handleLogout}
          onOpenAdmin={handleAdminClick}
          onOpenVpsAdmin={handleAdminClick}
          onOpenHourlyAdmin={handleAdminClick}
          onOpenUsersAdmin={handleAdminClick}
        />
      </div>

      {/* CONTENIDO */}
      <section id="contact-section" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white" />

        <div className="max-w-4xl mx-auto relative z-10">

            {/* TITULO */}
            <div className="text-center animate-fade-up">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">
                ¿Listo para transformar tu almacén?
                </h2>

                <p className="text-lg text-orange-400 font-bold mb-12 max-w-2xl mx-auto">
                Déjanos tus datos y un consultor te contactará para una demo personalizada
                </p>
            </div>

            {/* FORM CARD */}
            <div 
                className="
                max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg
                border border-[oklch(0.75_0.21_55)]
                animate-fade-up
                " 
                style={{ animationDelay: "0.15s" }}
            >

                {/* FORM GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                <div className="space-y-2 animate-fade-in text-black" style={{ animationDelay: "0.2s" }}>
                    <label className="text-sm font-bold ">NOMBRE</label>
                    <input type="text" placeholder="Tu nombre"
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-orange-300 focus:border-orange-500 text-black"
                    />
                </div>

                <div className="space-y-2 animate-fade-in text-black" style={{ animationDelay: "0.3s" }}>
                    <label className="text-sm font-bold">CORREO</label>
                    <input type="email" placeholder="tu@empresa.com"
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-orange-300 focus:border-orange-500 text-black"
                    />
                </div>

                <div className="space-y-2 animate-fade-in text-black" style={{ animationDelay: "0.4s" }}>
                    <label className="text-sm font-bold">EMPRESA</label>
                    <input type="text" placeholder="Nombre de tu empresa"
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-orange-300 focus:border-orange-500 text-black"
                    />
                </div>

                <div className="space-y-2 animate-fade-in text-black" style={{ animationDelay: "0.5s" }}>
                    <label className="text-sm font-bold">MÓVIL</label>
                    <input type="tel" placeholder="+52 55 1234 5678"
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-orange-300 focus:border-orange-500 text-black"
                    />
                </div>

                </div>

                <div className="space-y-2 mb-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <label className="text-sm font-bold text-black justify-center items-center">¿QUÉ TE INTERESA MÁS?</label>
                <textarea rows={3} placeholder="Cuéntanos..."
                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-orange-300 focus:border-orange-500 text-black resize-none"
                />
                </div>

                <button
                className="
                    w-full bg-orange-500 hover:bg-orange-600 text-white 
                    font-bold py-4 text-lg rounded-xl transition-all mb-4 
                    flex items-center justify-center gap-2
                    hover:animate-bounce-soft
                "
                >
                Solicitar Demo Gratuita
                <ArrowRight className="h-5 w-5" />
                </button>

                <p className="text-sm text-center text-gray-600 animate-fade-in" style={{ animationDelay: "0.7s" }}>
                Al enviar este formulario, aceptas ser contactado por un especialista de black_sheep®.
                </p>

            </div>

            {/* BENEFICIOS */}
            <div className="flex flex-wrap justify-center items-center gap-10 mt-12 font-bold text-black">

                <div className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: "0.8s" }}>
                <CheckCircle className="h-5 w-5 text-orange-500" />
                Demo en 15 minutos
                </div>

                <div className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: "1s" }}>
                <Shield className="h-5 w-5 text-orange-500" />
                Sin compromiso
                </div>

                <div className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: "1.2s" }}>
                <Zap className="h-5 w-5 text-orange-500" />
                Respuesta en 24h
                </div>

            </div>

        </div>

      </section>

      <MicrosipFooter />
    </>
  );
}
