import React from "react";

export default function RetosFyttsa() {
  return (
    <div className="font-lexend bg-white">
      {/* Hero Section */}
      <section className="bg-white py-24 px-6 w-full">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col text-left">
            <span className="text-indigo-600 font-bold tracking-[0.3em] mb-4 uppercase text-sm">Caso de Éxito</span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 tracking-tighter">
              TAURUS
            </h1>

            <p className="text-lg mb-8">
              <a
                href="https://www.taurus.com.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-medium underline decoration-2 underline-offset-4 hover:text-indigo-800 transition-colors"
              >
                www.taurus.com.mx
              </a>
            </p>

            <div className="space-y-3 mb-10 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
              <p className="font-semibold text-gray-800">
                Industria: <span className="font-normal text-gray-600">Venta de productos para el hogar.</span>
              </p>
              <p className="font-semibold text-gray-800">
                Ubicación: <span className="font-normal text-gray-600">México.</span>
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-indigo-600 pl-6">
              Taurus México es una marca reconocida a nivel internacional por su amplia gama de productos 
              para el hogar. Con una sólida presencia física, la empresa decidió dar el siguiente paso hacia la transformación digital 
              para ofrecer una experiencia de compra moderna y eficiente.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src="/bmkt/taurus.webp"
                alt="Productos Taurus"
                className="relative rounded-xl w-[450px] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* Retos Section */}
        <div className="max-w-6xl mx-auto mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-indigo-600 font-bold tracking-[.2em] uppercase text-xs mb-2 block">Problemáticas identificadas</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                Los <span className="text-indigo-600">Retos</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-md md:text-right text-sm leading-relaxed">
              Identificamos los puntos de fricción que limitaban el crecimiento digital de la marca antes de nuestra intervención.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚙️",
                title: "Limitación Tecnológica",
                desc: "El ecosistema en WordPress presentaba fallos de escalabilidad y lentitud en picos de tráfico.",
              },
              {
                icon: "📦",
                title: "Caos en Catálogo",
                desc: "Falta de una estructura jerárquica, dificultando que el cliente encontrara productos específicos.",
              },
              {
                icon: "💬",
                title: "Brecha de Atención",
                desc: "Inexistencia de un canal formal de soporte, generando desconfianza en la post-venta.",
              },
              {
                icon: "🛡️",
                title: "Garantías Manuales",
                desc: "Procesos lentos y deficientes que afectaban la reputación de la marca en el servicio técnico.",
              },
              {
                icon: "📉",
                title: "Fuga de Clientes",
                desc: "No existían incentivos de lealtad, perdiendo la oportunidad de generar recompras recurrentes.",
              }
            ].map((reto, i) => (
              <div 
                key={i} 
                className={`group p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 
                  ${i === 0 ? 'md:col-span-2 bg-indigo-900 text-white border-indigo-800 shadow-xl shadow-indigo-200' 
                            : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50'}`}
              >
                <div className={`text-3xl mb-4 p-3 rounded-2xl inline-block ${i === 0 ? 'bg-indigo-800' : 'bg-indigo-50'}`}>
                  {reto.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${i === 0 ? 'text-white' : 'text-gray-900'}`}>
                  {reto.title}
                </h3>
                <p className={`text-sm leading-relaxed ${i === 0 ? 'text-indigo-100' : 'text-gray-500'}`}>
                  {reto.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Imagen Destacada con fondo Indigo muy tenue */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center">
            <img
              src="/bmkt/middle.webp"
              alt="Ecosistema Digital"
              className="rounded-3xl shadow-2xl w-full object-cover border-8 border-white"
            />
          </div>
        </div>
      </section>

      {/* Soluciones Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-12">
          <div className="md:w-1/2 flex flex-col text-left">
            <h2 className="text-5xl font-black mb-12 text-gray-900 tracking-tight">
              Nuestras <span className="text-indigo-600">Soluciones</span>
            </h2>

            <div className="space-y-16">
              {[
                { title: "Migración a Shopify", desc: "Migración estructurada manteniendo la identidad visual y mejorando radicalmente la velocidad y seguridad." },
                { title: "Catálogo intuitivo", desc: "Categorías claras y filtros avanzados que optimizan la búsqueda del usuario final." },
                { title: "Atención al cliente integrada", desc: "Implementación de Zendesk para soporte en tiempo real vía chat y correo centralizado." }
              ].map((sol, i) => (
                <div key={i} className="group">
                  <h3 className="text-2xl mb-3 text-gray-900 font-bold group-hover:text-indigo-600 transition-colors">
                    {sol.title}
                  </h3>
                  <div className="w-16 h-1 bg-indigo-600 mb-5 transition-all group-hover:w-24"></div>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {sol.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center sticky top-24">
            <img
              src="/bmkt/movil.webp"
              alt="Mockup Mobile"
              className="w-[480px] rounded-3xl shadow-[0_20px_50px_rgba(79,70,229,0.15)] object-cover"
            />
          </div>
        </div>

        {/* Soluciones Parte 2 */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-start gap-12 mt-32">
          <div className="md:w-1/2 flex flex-col text-left">
            <div className="space-y-16">
              {[
                { title: "Sistema de recompensas", desc: "Configuración de Smile.io para ganar puntos por compras, incentivando la recompra y fidelización." },
                { title: "Garantías Automatizadas", desc: "Sección especial para solicitudes de garantía, facilitando el seguimiento y la gestión interna." }
              ].map((sol, i) => (
                <div key={i} className="group">
                  <h3 className="text-2xl mb-3 text-gray-900 font-bold group-hover:text-indigo-600 transition-colors">
                    {sol.title}
                  </h3>
                  <div className="w-16 h-1 bg-indigo-600 mb-5 transition-all group-hover:w-24"></div>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {sol.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src="/bmkt/reviews.webp"
              alt="Reviews Mockup"
              className="w-[480px] rounded-3xl shadow-[0_20px_50px_rgba(79,70,229,0.15)] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Herramientas con toques indigo */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-20 text-gray-900 tracking-tight">
            Tecnologías <span className="text-indigo-600">Utilizadas</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Shopify", img: "/bmkt/shp.webp" },
              { name: "Zendesk", img: "/bmkt/zen.webp" },
              { name: "Smile", img: "/bmkt/smi.webp" },
              { name: "Form Builder", img: "/bmkt/form.webp" }
            ].map((tool, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-indigo-50">
                <img src={tool.img} alt={tool.name} className="w-16 h-16 object-contain mx-auto mb-4" />
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">{tool.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resultados Section - Gradiente Indigo */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-indigo-900 rounded-[3rem] overflow-hidden relative p-12 md:p-20 shadow-2xl">
            {/* Círculos decorativos de fondo */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20"></div>
            
            <h2 className="text-white text-4xl md:text-5xl font-black mb-16 text-center">
              Resultados <span className="text-indigo-400">Impactantes</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                "Incremento del 30% en retención y conversión.",
                "63% más de eficiencia en atención al cliente.",
                "Automatización total en gestión de garantías."
              ].map((res, i) => (
                <div key={i} className="text-center md:text-left border-l border-indigo-500/30 pl-6">
                  <p className="text-white text-2xl font-bold leading-snug">{res}</p>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-xl text-gray-500 leading-relaxed max-w-4xl mx-auto text-center mt-16 font-medium">
            La transformación de Taurus México demuestra cómo una migración estratégica a Shopify 
            fortalece la relación con el cliente y abre nuevas oportunidades de crecimiento digital masivo.
          </p>
        </div>
      </section>
    </div>
  );
}