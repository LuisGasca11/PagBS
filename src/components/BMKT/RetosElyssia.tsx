import React from "react";

export default function RetosElyssia() {
  return (
    <div className="font-lexend bg-[#FDFCF8]"> 
      {/* Hero Section */}
      <section className="py-24 px-6 w-full relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col text-left">
            <span className="text-emerald-800 font-bold tracking-[0.3em] mb-4 uppercase text-sm">Caso de Éxito</span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-emerald-950 tracking-tighter">
              ELYSSIA
            </h1>

            <p className="text-lg mb-8">
              <a
                href="https://elyssia.com.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-medium underline decoration-2 underline-offset-4 hover:text-emerald-900 transition-colors"
              >
                www.elyssia.com.mx
              </a>
            </p>

            <div className="space-y-3 mb-10 bg-[#F5F2EA] p-6 rounded-2xl border border-emerald-100/50">
              <p className="font-semibold text-emerald-900">
                Industria: <span className="font-normal text-emerald-800/80">Cuidado personal y bienestar.</span>
              </p>
              <p className="font-semibold text-emerald-900">
                Ubicación: <span className="font-normal text-emerald-800/80">México.</span>
              </p>
            </div>

            <p className="text-lg text-emerald-900/80 leading-relaxed italic border-l-4 border-emerald-600 pl-6 py-1">
              Elyssia es una marca que redefine el cuidado personal. Buscaban una presencia digital que reflejara la pureza de sus productos a través de una experiencia de compra minimalista y sofisticada.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-200 to-beige-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src="/bmkt/taurus.webp" 
                alt="Elyssia Experience"
                className="relative rounded-xl w-[450px] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] grayscale-[20%] hover:grayscale-0"
              />
            </div>
          </div>
        </div>

        {/* Retos Section */}
        <div className="max-w-6xl mx-auto mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-emerald-700 font-bold tracking-[.2em] uppercase text-xs mb-2 block font-lexend">Desafíos de Marca</span>
              <h2 className="text-4xl md:text-5xl font-black text-emerald-950 tracking-tight">
                Los <span className="text-emerald-600 italic font-serif">Retos</span>
              </h2>
            </div>
            <p className="text-emerald-800/60 max-w-md md:text-right text-sm leading-relaxed">
              Analizamos la fricción estética y técnica que impedía a Elyssia conectar con su audiencia premium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🌿", title: "Identidad Visual", desc: "Necesidad de una estética orgánica que respirara calma y exclusividad." },
              { icon: "📱", title: "Experiencia Mobile", desc: "El 80% de su tráfico es móvil y requería una navegación sin fricciones." },
              { icon: "✨", title: "Storytelling", desc: "Falta de conexión entre los beneficios del producto y la narrativa visual." },
              { icon: "♻️", title: "Logística Sustentable", desc: "Integrar procesos de envío que reflejaran los valores de la marca." },
              { icon: "📈", title: "Conversión", desc: "Optimizar el checkout para reducir el abandono de carrito en productos de lujo." }
            ].map((reto, i) => (
              <div 
                key={i} 
                className={`group p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 
                  ${i === 0 ? 'md:col-span-2 bg-emerald-900 text-[#F5F2EA] border-emerald-800 shadow-xl shadow-emerald-900/10' 
                            : 'bg-white border-emerald-50 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-900/5'}`}
              >
                <div className={`text-3xl mb-4 p-3 rounded-2xl inline-block ${i === 0 ? 'bg-emerald-800' : 'bg-[#F5F2EA]'}`}>
                  {reto.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${i === 0 ? 'text-white' : 'text-emerald-950'}`}>
                  {reto.title}
                </h3>
                <p className={`text-sm leading-relaxed ${i === 0 ? 'text-emerald-100/80' : 'text-emerald-800/70'}`}>
                  {reto.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#F5F2EA]">
        <div className="max-w-5xl mx-auto text-center">
            <p className="text-emerald-800/40 font-bold mb-8 tracking-widest uppercase text-xs">Visualizing the change</p>
            <img
              src="/bmkt/middle.webp"
              alt="Ecosistema Digital"
              className="rounded-3xl shadow-2xl w-full object-cover border-[12px] border-white"
            />
        </div>
      </section>

      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-12">
          <div className="md:w-1/2 flex flex-col text-left">
            <h2 className="text-5xl font-black mb-12 text-emerald-950 tracking-tight">
              Estrategia <span className="text-emerald-600">Orgánica</span>
            </h2>

            <div className="space-y-16">
              {[
                { title: "Diseño UI Minimalista", desc: "Espacios en blanco y tipografías elegantes que permiten que el producto sea el protagonista." },
                { title: "Navegación Sensorial", desc: "Uso de micro-interacciones suaves que imitan la fluidez de la marca." },
                { title: "Optimización de Embudo", desc: "Rediseño completo del flujo de compra centrado en la confianza y claridad." }
              ].map((sol, i) => (
                <div key={i} className="group">
                  <h3 className="text-2xl mb-3 text-emerald-900 font-bold group-hover:text-emerald-600 transition-colors">
                    {sol.title}
                  </h3>
                  <div className="w-16 h-1 bg-emerald-200 mb-5 transition-all group-hover:w-24 group-hover:bg-emerald-500"></div>
                  <p className="text-xl text-emerald-800/70 leading-relaxed font-light">
                    {sol.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center sticky top-24">
            <div className="relative">
                <div className="absolute inset-0 bg-emerald-600/5 rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0"></div>
                <img
                  src="/bmkt/movil.webp"
                  alt="Elyssia Mobile"
                  className="relative w-[480px] rounded-[3rem] shadow-2xl border-4 border-white"
                />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-emerald-950 rounded-[3rem] overflow-hidden relative p-12 md:p-20 shadow-2xl">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#F5F2EA] rounded-full blur-[130px] opacity-10"></div>
            
            <h2 className="text-[#F5F2EA] text-4xl md:text-5xl font-black mb-16 text-center tracking-tighter">
              Impacto <span className="italic font-serif text-emerald-400">Elyssia</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                "Crecimiento del 45% en ventas recurrentes.",
                "Reducción del 25% en rebote móvil.",
                "Posicionamiento como marca Top-of-Mind."
              ].map((res, i) => (
                <div key={i} className="text-center md:text-left border-l border-emerald-500/30 pl-6">
                  <p className="text-[#F5F2EA] text-2xl font-bold leading-snug">{res}</p>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-xl text-emerald-900/50 leading-relaxed max-w-4xl mx-auto text-center mt-16 font-medium">
            La transformación de Elyssia demuestra que el diseño honesto y una infraestructura sólida en Shopify son la clave para escalar marcas de cuidado personal en la era digital.
          </p>
        </div>
      </section>
    </div>
  );
}