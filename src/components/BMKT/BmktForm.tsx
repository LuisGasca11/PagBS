import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";
import Navbar from './Navbmkt';
import BmktFooter from './BmktFooter';

export default function BmktForm() {

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />

      <section id="contact-section" className="py-20 mt-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white" />

        <div className="max-w-4xl mx-auto relative z-10">

          {/* TÍTULO */}
          <div className="text-center animate-fade-up">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-[#232B34]">
              ¿Listo para llevar tu negocio al siguiente nivel?
            </h2>

            <p className="text-lg font-semibold mb-12 max-w-2xl mx-auto
              bg-gradient-to-r from-[#00C8FF] via-[#FF5AE0] to-[#D014FF] 
              text-transparent bg-clip-text
            ">
              Déjanos tus datos y un consultor te contactará para una demo personalizada
            </p>
          </div>

          {/* FORM CARD */}
          <div 
            className="
              max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-xl
              border border-[#00C8FF]/40 hover:shadow-[0_0_25px_#00C8FF40]
              transition-all duration-300 animate-fade-up
            " 
            style={{ animationDelay: "0.15s" }}
          >

            {/* FORM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              {/* INPUT */}
              <div className="space-y-2 animate-fade-in text-[#232B34]" style={{ animationDelay: "0.2s" }}>
                <label className="text-sm font-bold">NOMBRE</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="
                    w-full px-4 py-3 bg-white rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-[#00C8FF] focus:border-[#00C8FF] 
                    text-[#232B34] transition-all
                  "
                />
              </div>

              <div className="space-y-2 animate-fade-in text-[#232B34]" style={{ animationDelay: "0.3s" }}>
                <label className="text-sm font-bold">CORREO</label>
                <input
                  type="email"
                  placeholder="tu@empresa.com"
                  className="
                    w-full px-4 py-3 bg-white rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-[#38FF66] focus:border-[#38FF66]
                    text-[#232B34] transition-all
                  "
                />
              </div>

              <div className="space-y-2 animate-fade-in text-[#232B34]" style={{ animationDelay: "0.4s" }}>
                <label className="text-sm font-bold">EMPRESA</label>
                <input
                  type="text"
                  placeholder="Nombre de tu empresa"
                  className="
                    w-full px-4 py-3 bg-white rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-[#FF5AE0] focus:border-[#FF5AE0]
                    text-[#232B34] transition-all
                  "
                />
              </div>

              <div className="space-y-2 animate-fade-in text-[#232B34]" style={{ animationDelay: "0.5s" }}>
                <label className="text-sm font-bold">MÓVIL</label>
                <input
                  type="tel"
                  placeholder="+52 55 1234 5678"
                  className="
                    w-full px-4 py-3 bg-white rounded-lg border border-gray-300
                    focus:ring-2 focus:ring-[#D014FF] focus:border-[#D014FF]
                    text-[#232B34] transition-all
                  "
                />
              </div>

            </div>

            {/* TEXTAREA */}
            <div className="space-y-2 mb-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <label className="text-sm font-bold text-[#232B34]">¿QUÉ TE INTERESA MÁS?</label>
              <textarea
                rows={3}
                placeholder="Cuéntanos..."
                className="
                  w-full px-4 py-3 bg-white rounded-lg border border-gray-300
                  focus:ring-2 focus:ring-[#00C8FF] focus:border-[#00C8FF]
                  text-[#232B34] resize-none transition-all
                "
              />
            </div>

            {/* BOTÓN */}
            <button
              className="
                w-full py-4 text-lg rounded-xl font-bold mb-4
                bg-gradient-to-r from-[#00C8FF] via-[#FF5AE0] to-[#D014FF]
                text-white shadow-lg hover:shadow-[0_0_20px_rgba(255,90,224,0.5)]
                hover:scale-[1.02] active:scale-[0.98]
                transition-all flex items-center justify-center gap-2
              "
            >
              Solicitar Demo Gratuita
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* DISCLAIMER */}
            <p className="text-sm text-center text-gray-600 animate-fade-in" style={{ animationDelay: "0.7s" }}>
              Al enviar este formulario, aceptas ser contactado por un especialista de black_sheep®.
            </p>

          </div>

          {/* BENEFICIOS */}
          <div className="flex flex-wrap justify-center items-center gap-10 mt-12 font-bold text-[#232B34]">

            <div className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: "0.8s" }}>
              <CheckCircle className="h-5 w-5 text-[#38FF66]" />
              Demo en 15 minutos
            </div>

            <div className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: "1s" }}>
              <Shield className="h-5 w-5 text-[#00C8FF]" />
              Sin compromiso
            </div>

            <div className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: "1.2s" }}>
              <Zap className="h-5 w-5 text-[#FF5AE0]" />
              Respuesta en 24h
            </div>

          </div>

        </div>
      </section>

      <BmktFooter />
    </>
  );
}
