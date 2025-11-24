import React, { useEffect, useState } from 'react';

const Krkn = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  useEffect(() => {
    document.title = "KRKN - Sistema de Gestión de Almacenes Inteligente";
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-12">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .scroll-animate {
          opacity: 0;
        }
        .glow-blue-purple {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
        }
        .glow-blue-purple-hover:hover {
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.6);
        }
      `}</style>

      {/* Main Content */}
      <main>
        <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 scroll-animate">

              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Desarrollado por black_sheep
              </h2>
              
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
                Combinamos la potencia del ERP líder en México
                {' '}con nuestra experiencia en transformación digital para PyMEs.
              </p>

              <div className="flex justify-center mt-16 scroll-animate">
                <div className="bg-white rounded-2xl p-8 shadow-2xl border border-orange-200 transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/BS Horizontal 1.png"
                    alt="black_sheep - Partner Oficial Microsip"
                    className="w-full max-w-xs object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl w-full max-w-xs h-32 items-center justify-center flex-col">
                    <div className="text-2xl mb-2">🐑</div>
                    <p className="text-white font-semibold text-center">
                      black_sheep
                    </p>
                    <p className="text-white text-sm text-center">Partner Oficial</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-black via-indigo-900/20 to-black">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-indigo-500">KRKN</span> WMS
              </h1>
              <p className="text-xl leading-relaxed mb-4 text-gray-300"> 
                Domina tu almacén con la fuerza del kraken
              </p>
              <p className="text-xl leading-relaxed text-gray-300">
                <span className="text-indigo-500 font-semibold">El sistema de gestión de almacenes más poderoso y disruptivo del mercado. Controla cada tentáculo de tu operación logística.</span>
              </p>
              <div className="mt-8 flex gap-4">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105">
                  Solicitar Demo
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center scroll-animate">
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 transform rotate-3 glow-blue-purple">
                  <div className="bg-black rounded-2xl p-8 transform -rotate-3 border border-indigo-500/30">
                    <div className="rounded-xl h-96 flex items-center justify-center overflow-hidden">
                      <img 
                        src="/krkn.png"
                        alt="Sistema de Gestión de Almacenes KRKN"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center flex-col bg-gradient-to-br from-indigo-900 to-black">
                        <div className="text-8xl mb-4">🏭</div>
                        <p className="text-2xl font-bold text-indigo-400">KRKN WMS</p>
                        <p className="text-gray-400">Gestión de Almacenes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Retos Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center scroll-animate">
              Desafíos en <span className="text-indigo-500">Gestión de Almacenes</span>
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Falta de Visibilidad en Tiempo Real",
                  description: "No saber exactamente qué hay en stock, dónde está ubicado y en qué cantidad en cualquier momento del día."
                },
                {
                  title: "Ineficiencia en Procesos de Picking",
                  description: "Rutas de recolecta no optimizadas que resultan en tiempos excesivos y errores en la preparación de pedidos."
                },
                {
                  title: "Gestión Manual de Ubicaciones",
                  description: "Sistemas anticuados que no optimizan el espacio ni la ubicación de productos según rotación y demanda."
                },
                {
                  title: "Descoordinación en Recepción y Almacenaje",
                  description: "Procesos lentos de recepción, inspección y ubicación de mercancías que generan cuellos de botella."
                },
                {
                  title: "Control Ineficiente de Inventarios",
                  description: "Conteos físicos manuales propensos a errores y falta de precisión en los niveles de stock."
                },
                {
                  title: "Falta de Integración con Sistemas Externos",
                  description: "Dificultad para sincronizar datos con ERP, e-commerce, transportistas y otros sistemas de la cadena de suministro."
                }
              ].map((reto, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800 p-6 rounded-lg border-l-4 border-indigo-500 scroll-animate glow-blue-purple-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold text-indigo-400 mb-3">{reto.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{reto.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ventajas Competitivas Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black to-indigo-900/20">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center scroll-animate">
              Soluciones <span className="text-indigo-500">KRKN WMS</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Consultoría Experta */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-indigo-500/30 scroll-animate glow-blue-purple-hover">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <div className="text-2xl text-white">🎯</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-indigo-400 mb-4 text-center">
                  Consultoría Experta
                </h3>
                <p className="text-gray-300 text-center mb-4">
                  En 2025 nos convertimos en empresa independiente para llevar al mercado lo que ya estaba probado en casa por más de 3 años.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Experiencia real en operación logística</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Soluciones validadas en uso interno</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Implementación con Know+How propio</span>
                  </div>
                </div>
              </div>

              {/* Personalización Total */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-indigo-500/30 scroll-animate glow-blue-purple-hover">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <div className="text-2xl text-white">⚙️</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-indigo-400 mb-4 text-center">
                  Personalización Total
                </h3>
                <p className="text-gray-300 text-center mb-4">
                  KRKN se adapta a tu operación, no al revés. Configuración flexible para cualquier industria.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Workflows personalizados</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Integraciones a medida</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Escalabilidad garantizada</span>
                  </div>
                </div>
              </div>

              {/* Soporte con ADN propio */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-indigo-500/30 scroll-animate glow-blue-purple-hover">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <div className="text-2xl text-white">🔧</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-indigo-400 mb-4 text-center">
                  Soporte con ADN propio
                </h3>
                <p className="text-gray-300 text-center mb-4">
                  Usamos lo que desarrollamos. Por eso nuestro soporte no es de manual, sino de gente que sabe cómo duele la operación.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Soporte 24/7</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">SLA garantizado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Actualizaciones incluidas sin costo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Soluciones Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black to-indigo-900/20">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center scroll-animate">
              Ventajas <span className="text-indigo-500">Competitivas KRKN</span>
            </h2>
            
            {/* Soluciones Principales */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {/* Control Total del Inventario */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-indigo-500/30 scroll-animate glow-blue-purple-hover">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <div className="text-2xl text-white">📊</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-indigo-400 mb-3 text-center">
                  Control Total del Almacén
                </h3>
                <p className="text-gray-300 text-center">
                  Visibilidad completa en tiempo real de cada producto, ubicación y movimiento en tu almacén
                </p>
              </div>

              {/* Gestión Inteligente de Ubicaciones */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-indigo-500/30 scroll-animate glow-blue-purple-hover">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <div className="text-2xl text-white">🗺️</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-indigo-400 mb-3 text-center">
                  Gestión Inteligente de Ubicaciones
                </h3>
                <p className="text-gray-300 text-center">
                  Optimización automática de la ubicación de productos según rotación y características
                </p>
              </div>

              {/* Picking y Packing Optimizado */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-indigo-500/30 scroll-animate glow-blue-purple-hover">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <div className="text-2xl text-white">⚡</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-indigo-400 mb-3 text-center">
                  Picking y Packing Optimizado
                </h3>
                <p className="text-gray-300 text-center">
                  Rutas inteligentes que reducen tiempos de preparación y aumentan eficiencia operativa
                </p>
              </div>

              {/* Automatización de Procesos */}
              <div className="bg-gray-800 rounded-2xl p-6 border border-indigo-500/30 scroll-animate glow-blue-purple-hover">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <div className="text-2xl text-white">🤖</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-indigo-400 mb-3 text-center">
                  Automatización de Procesos
                </h3>
                <p className="text-gray-300 text-center">
                  Flujos de trabajo automatizados que eliminan errores humanos y mejoran precisión
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* KRKN WMS PRO Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8 scroll-animate">
                <div className="text-center lg:text-left">
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">
                    KRKN <span className="text-indigo-500">WMS PRO</span>
                  </h3>
                  <p className="text-xl text-gray-300 mb-8">
                    La solución definitiva para centros de distribución y almacenes de alto volumen
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  {[
                    "Sin límite de usuarios",
                    "Actualizaciones incluidas",
                    "Recepción (Control de Entradas)",
                    "Picking (Preparación de Pedidos)",
                    "Packing (Empaque y Envío)",
                    "Acomodo (Organización de Inventario)",
                    "Despacho (Gestión de Salidas)",
                    "Integración con ERP (MICROSIP)",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-4 scroll-animate" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-2 flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{feature}</h4>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center lg:text-left">
                  <button className="
                    bg-gradient-to-r from-indigo-600 to-purple-700 
                    hover:from-indigo-500 hover:to-purple-600 
                    text-white px-8 py-4 rounded-xl 
                    font-bold text-lg transition-all duration-300 
                    transform hover:scale-105 shadow-2xl
                    border-2 border-indigo-500
                    hover:shadow-indigo-500/30
                    glow-blue-purple-hover
                  ">
                    ¡Solicitar Demo PRO!
                  </button>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative scroll-animate">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 transform rotate-2 glow-blue-purple">
                  <div className="bg-black rounded-2xl p-8 transform -rotate-2 border border-indigo-500/30">
                    <div className="rounded-xl h-96 flex items-center justify-center overflow-hidden">
                      <img 
                        src="/krkn.png"
                        alt="KRKN WMS PRO Dashboard"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center flex-col bg-gradient-to-br from-indigo-900 to-black">
                        <div className="text-8xl mb-4">🚀</div>
                        <h4 className="text-2xl font-bold text-indigo-400 mb-2">KRKN PRO</h4>
                        <p className="text-gray-400">Gestión de Élite</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900/30 to-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 scroll-animate">
              ¿Listo para <span className="text-indigo-500">Revolucionar tu Almacén</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed scroll-animate">
              Descubre cómo <span className="text-indigo-500 font-semibold">KRKN WMS</span> puede transformar tu operación logística.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-animate">
              <button className="
                bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg 
                hover:bg-indigo-500 transition-all transform hover:scale-105
                border-2 border-indigo-500 glow-blue-purple-hover
              ">
                Solicitar Demo Gratis
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Krkn;