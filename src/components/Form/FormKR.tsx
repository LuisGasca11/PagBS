"use client"

import { useEffect } from "react"
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react"


export function ContactSection() {
  return (
    <section
      id="contact-section"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,255,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center scroll-reveal">
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Listo para transformar tu almacén?
          </h2>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Déjanos tus datos y un consultor te contactará para una demo personalizada
          </p>

          {/* FORM CARD */}
          <div className="
            max-w-2xl mx-auto bg-card/80 rounded-2xl p-8 backdrop-blur-sm shadow-lg
            border border-[oklch(45%_.15_280)]
          ">
            
            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre completo</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 bg-black/40 rounded-lg
                    border border-gray-600
                    focus:ring-2 focus:ring-[oklch(45%_.15_280_/_0.3)]
                    focus:border-[oklch(45%_.15_280)]
                    transition-all text-white placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email empresarial</label>
                <input
                  type="email"
                  placeholder="tu@empresa.com"
                  className="w-full px-4 py-3 bg-black/40 rounded-lg
                    border border-gray-600
                    focus:ring-2 focus:ring-[oklch(45%_.15_280_/_0.3)]
                    focus:border-[oklch(45%_.15_280)]
                    transition-all text-white placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Empresa</label>
                <input
                  type="text"
                  placeholder="Nombre de tu empresa"
                  className="w-full px-4 py-3 bg-black/40 rounded-lg
                    border border-gray-600
                    focus:ring-2 focus:ring-[oklch(45%_.15_280_/_0.3)]
                    focus:border-[oklch(45%_.15_280)]
                    transition-all text-white placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Teléfono</label>
                <input
                  type="tel"
                  placeholder="+52 55 1234 5678"
                  className="w-full px-4 py-3 bg-black/40 rounded-lg
                    border border-gray-600
                    focus:ring-2 focus:ring-[oklch(45%_.15_280_/_0.3)]
                    focus:border-[oklch(45%_.15_280)]
                    transition-all text-white placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* TEXTAREA */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium">¿Qué te interesa más?</label>
              <textarea
                rows={3}
                placeholder="Cuéntanos sobre tu almacén y qué desafíos enfrentas..."
                className="w-full px-4 py-3 bg-black/40 rounded-lg
                  border border-gray-600
                  focus:ring-2 focus:ring-[oklch(45%_.15_280_/_0.3)]
                  focus:border-[oklch(45%_.15_280)]
                  transition-all text-white placeholder:text-muted-foreground resize-none"
              />
            </div>

            {/* BUTTON */}
            <button
              className="
                w-full bg-[oklch(45%_.15_280)]
                hover:bg-[oklch(45%_.15_280_/_0.85)]
                text-white font-bold py-4 text-lg rounded-xl transition-all mb-4 
                flex items-center justify-center gap-2
              "
            >
              Solicitar Demo Gratuita
              <ArrowRight className="h-5 w-5" />
            </button>

            <p className="text-md text-muted-foreground text-center">
              Al enviar este formulario, aceptas que un especialista de black_sheep® se ponga en contacto contigo
            </p>
          </div>

          {/* ITEMS BELOW */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[oklch(45%_.15_280)]." />
              <span>Demo en 15 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[oklch(45%_.15_280)]." />
              <span>Sin compromiso</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[oklch(45%_.15_280)]." />
              <span>Respuesta en 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
