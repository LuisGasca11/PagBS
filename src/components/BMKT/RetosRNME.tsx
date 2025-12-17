import React from "react";

export default function RetosRNME() {
  return (
    <div className="font-lexend bg-white">
      <section className="bg-white py-24 px-6 w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50 -z-10" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col text-left">
            <span className="text-red-600 font-bold tracking-[0.3em] mb-4 uppercase text-sm">Caso de Éxito</span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 tracking-tighter leading-none">
              TAURUS
            </h1>

            <p className="text-lg mb-8">
              <a
                href="https://www.taurus.com.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 font-medium underline decoration-2 underline-offset-4 hover:text-red-800 transition-colors"
              >
                www.taurus.com.mx
              </a>
            </p>

            <div className="space-y-3 mb-10 bg-red-50/50 p-6 rounded-2xl border border-red-100">
              <p className="font-semibold text-gray-800">
                Industria: <span className="font-normal text-gray-600">Venta de productos para el hogar.</span>
              </p>
              <p className="font-semibold text-gray-800">
                Ubicación: <span className="font-normal text-gray-600">México.</span>
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-green-500 pl-6 bg-gradient-to-r from-green-50/50 to-transparent py-2">
              Taurus México es una marca reconocida a nivel internacional por su amplia gama de productos 
              para el hogar. Con una sólida presencia física, decidieron dar el paso hacia la transformación digital 
              para ofrecer una experiencia moderna.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-green-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <img
                src="/bmkt/taurus.webp"
                alt="Productos Taurus"
                className="relative rounded-xl w-[450px] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] border border-gray-100"
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-gray-100 pb-8">
            <div>
              <span className="text-red-600 font-bold tracking-[.2em] uppercase text-xs mb-2 block font-lexend">Problemáticas identificadas</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                Los <span className="text-red-600 italic">Retos</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-md md:text-right text-sm leading-relaxed font-medium">
              Identificamos los puntos de fricción que limitaban el crecimiento antes de nuestra intervención.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Limitación Tecnológica",
                desc: "El ecosistema en WordPress presentaba fallos de escalabilidad y lentitud.",
              },
              {
                title: "Caos en Catálogo",
                desc: "Falta de una estructura jerárquica, dificultando la búsqueda de productos.",
              },
              {
                title: "Brecha de Atención",
                desc: "Inexistencia de un canal formal de soporte, generando desconfianza.",
              },
              {
                title: "Garantías Manuales",
                desc: "Procesos lentos que afectaban la reputación en el servicio técnico.",
              },
              {
                title: "Fuga de Clientes",
                desc: "No existían incentivos de lealtad ni recurrencia de compra.",
              }
            ].map((reto, i) => (
              <div 
                key={i} 
                className={`group p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 
                  ${i === 0 ? 'md:col-span-2 bg-gray-900 text-white border-gray-800 shadow-2xl shadow-red-900/20' 
                            : 'bg-white border-slate-100 hover:border-red-200 hover:shadow-xl hover:shadow-red-50'}`}
              >
                <h3 className={`text-xl font-bold mb-3 ${i === 0 ? 'text-red-500' : 'text-gray-900'}`}>
                  {reto.title}
                </h3>
                <p className={`text-sm leading-relaxed ${i === 0 ? 'text-gray-300' : 'text-gray-500'}`}>
                  {reto.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-12">
          <div className="md:w-1/2 flex flex-col text-left">
            <h2 className="text-5xl font-black mb-12 text-gray-900 tracking-tight">
              Nuestras <span className="text-green-600">Soluciones</span>
            </h2>

            <div className="space-y-16">
              {[
                { title: "Migración a Shopify", desc: "Migración estructurada mejorando radicalmente la velocidad y seguridad." },
                { title: "Catálogo intuitivo", desc: "Categorías claras y filtros avanzados que optimizan la búsqueda." },
                { title: "Atención integrada", desc: "Implementación de Zendesk para soporte en tiempo real centralizado." }
              ].map((sol, i) => (
                <div key={i} className="group">
                  <h3 className="text-2xl mb-3 text-gray-900 font-bold group-hover:text-green-600 transition-colors flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-sm">{i+1}</span>
                    {sol.title}
                  </h3>
                  <div className="w-16 h-1 bg-green-500 mb-5 transition-all group-hover:w-24"></div>
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
              className="w-[480px] rounded-[3rem] shadow-[0_20px_50px_rgba(22,163,74,0.15)] object-cover border-4 border-white"
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-20 text-gray-900 tracking-tight">
            Tecnologías <span className="text-red-600 italic">Utilizadas</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Shopify", img: "/bmkt/shp.webp" },
              { name: "Zendesk", img: "/bmkt/zen.webp" },
              { name: "Smile", img: "/bmkt/smi.webp" },
              { name: "Form Builder", img: "/bmkt/form.webp" }
            ].map((tool, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-red-50">
                <img src={tool.img} alt={tool.name} className="w-16 h-16 object-contain mx-auto mb-4 grayscale group-hover:grayscale-0 transition-all" />
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">{tool.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 via-black to-red-950 rounded-[3rem] overflow-hidden relative p-12 md:p-20 shadow-2xl">
            <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-green-500 rounded-full blur-[120px] opacity-10"></div>
            
            <h2 className="text-white text-4xl md:text-5xl font-black mb-16 text-center">
              Resultados <span className="text-green-500 underline decoration-green-500/30 underline-offset-8">Impactantes</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                "Incremento del 30% en retención y conversión.",
                "63% más de eficiencia en atención al cliente.",
                "Automatización total en gestión de garantías."
              ].map((res, i) => (
                <div key={i} className="text-center md:text-left border-l-2 border-green-500 pl-6 group">
                  <p className="text-white text-2xl font-bold leading-snug group-hover:text-green-400 transition-colors">{res}</p>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-xl text-gray-500 leading-relaxed max-w-4xl mx-auto text-center mt-16 font-medium">
            La transformación de Taurus México demuestra cómo una migración estratégica a <span className="text-red-600 font-bold">Shopify</span> fortalece la relación con el cliente y abre nuevas oportunidades de crecimiento.
          </p>
        </div>
      </section>
    </div>
  );
}