import React, { useEffect, useState } from 'react';

const MicroPage = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const images = {
    introduccion: "/msp.png", 
    soluciones: "/images/microsip-soluciones.jpg", 
    resultados: "/images/microsip-resultados.jpg" 
  };

   useEffect(() => {
    document.title = "MICROSIP ERP";
    
    return () => {
      document.title = "Black-Sheep"; 
    };
  }, []);

  const modules = [
    { 
      id: 1, 
      name: "Bancos", 
      icon: "📊",
      image: "/icons/icn_bancos-150x150.png" 
    },
    { 
      id: 2, 
      name: "Contabilidad Electronica", 
      icon: "🔢",
      image: "/icons/icn_contabilidad_electronica-150x150.png" 
    },
    { 
      id: 3, 
      name: "Nómina", 
      icon: "📱",
      image: "/icons/icn_nomina-150x150.png" 
    },
    { 
      id: 4, 
      name: "CEO Movil", 
      icon: "📱",
      image: "/icons/icn_ceo_movil-150x150.png" 
    },
    { 
      id: 5, 
      name: "Cuentas por Pagar", 
      icon: "💳",
      image: "/icons/icn_cuentas_pagar-150x150.png"  
    },
    { 
      id: 6, 
      name: "Cuentas por Cobrar", 
      icon: "💰",
      image: "/icons/icn_cuentas_cobrar-150x150.png" 
    },
    { 
      id: 7, 
      name: "Compras", 
      icon: "🛒",
      image: "/icons/icn_compras-150x150.png" 
    },
    { 
      id: 8, 
      name: "Inventarios", 
      icon: "📦",
      image: "/icons/icn_inventarios-150x150.png" 
    },
    { 
      id: 9, 
      name: "Sync-E", 
      icon: "⚡",
      image: "/icons/icn_sync_e-150x150.png" 
    },
    { 
      id: 10, 
      name: "Ventas", 
      icon: "📈",
      image: "/icons/icn_ceo_movil-150x150.png" 
    },
    { 
      id: 11, 
      name: "Punto de Venta", 
      icon: "🏪",
      image: "/icons/icn_punto_venta-150x150.png" 
    },
    { 
      id: 12, 
      name: "En Ruta", 
      icon: "🎯",
      image: "/icons/icn_en_ruta-150x150.png"  
    },
    { 
      id: 13, 
      name: "Sics", 
      icon: "🛡️",
      image: "/icons/icn_sics-150x150.png" 
    },
    { 
      id: 14, 
      name: "Administrador de Sucursales", 
      icon: "🏢",
      image: "/icons/icn_admin_sucursales-150x150.png" 
    }
  ];

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

  const ImageWithFallback = ({ module }) => {
    const [imageError, setImageError] = useState(false);

    if (imageError || !module.image) {
      return (
        <div className="w-12 h-12 flex items-center justify-center text-2xl">
          {module.icon}
        </div>
      );
    }

    return (
      <img 
        src={module.image} 
        alt={module.name}
        className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-12">
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
                Combinamos la potencia del <span className="font-bold text-orange-500">ERP líder en México</span> 
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
        <section className="min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-orange-500">MICROSIP</span> ERP
              </h1>
              <p className="text-lg leading-relaxed mb-4 text-gray-700"> 
                Toma el control, realiza decisiones informadas y alcanza todas tus metas con un <span className="text-orange-500 font-semibold"> ERP </span>hecho para tu empresa. 
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                <span className="text-orange-500 font-semibold">Microsip: </span> el secreto de los empresarios exitosos.
              </p>
            </div>
            <div className="flex items-center justify-center scroll-animate">
              <img 
                src="/msp.png"
                alt="Implementación ERP Microsip"
                className="w-full max-w-md object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl w-full max-w-md h-64 items-center justify-center flex-col">
                <div className="text-4xl mb-4">📊</div>
                <p className="text-white font-semibold text-lg text-center">
                  Logo Microsip
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Retos Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center scroll-animate">
              Retos en el <span className="text-orange-500">Desarrollo</span>
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Integración de Múltiples Módulos",
                  description: "Coordinación entre contabilidad, inventarios, facturación y nóminas en una plataforma unificada para garantizar la consistencia de datos y procesos."
                },
                {
                  title: "Adaptación a Reformas Fiscales",
                  description: "Mantener actualizado el sistema con los constantes cambios en la legislación mexicana, asegurando el cumplimiento normativo en todo momento."
                },
                {
                  title: "Curva de Aprendizaje",
                  description: "Facilitar la transición de procesos manuales a digitales para usuarios con distintos niveles técnicos, mediante interfaces intuitivas y capacitación especializada."
                },
                {
                  title: "Escalabilidad",
                  description: "Diseñar soluciones que crezcan junto con las empresas clientes, adaptándose a su evolución y nuevas necesidades operativas."
                },
                {
                  title: "Integración con Sistemas Existentes",
                  description: "Conectar Microsip con otras plataformas y herramientas que las empresas ya utilizan, manteniendo la integridad de los datos."
                },
                {
                  title: "Personalización por Industria",
                  description: "Adaptar las funcionalidades estándar de Microsip a los requerimientos específicos de diferentes sectores industriales."
                }
              ].map((reto, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500 scroll-animate"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold text-orange-500 mb-3">{reto.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{reto.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Soluciones Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center scroll-animate">
              Soluciones <span className="text-orange-500">Innovadoras</span>
            </h2>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 flex justify-center scroll-animate">
                <div className="w-full max-w-2xl h-96 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                  <img 
                    src={"/cart.png"} 
                    alt="Soluciones Implementadas Microsip"
                    className="w-full h-full object-contain p-8"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden bg-orange-100 rounded-xl w-full h-full items-center justify-center flex-col">
                    <div className="text-6xl mb-4">💡</div>
                    <p className="text-orange-600 font-semibold text-xl text-center">
                      Soluciones Implementadas
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 scroll-animate">
                <h3 className="text-2xl font-bold mb-8 text-gray-800">Nuestro Enfoque</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "Cumple al 100% con el SAT",
                      description: "Facilita el cumplimiento con el CFDI 4.0, Carta Porte, RESICO y demás requisitos."
                    },
                    {
                      title: "Sistema ERP Modular",
                      description: "Un sistema flexible que se adapta al tamaño y modelo de operación de tu empresa."
                    },
                    {
                      title: "39 años de experiencia",
                      description: "Aprovecha la experiencia de más de 100,000 clientes satisfechos y más de tres décadas de excelencia."
                    },
                    {
                      title: "Partners expertos en todo el país",
                      description: "Contamos con más de 350 partners certificados, siempre dispuestos a digitalizar los procesos de tu empresa."
                    },
                    {
                      title: "Comunidad de usuarios",
                      description: "Conecta con una comunidad digital de miles de usuarios dispuestos a ayudarte."
                    }
                  ].map((solucion, index) => (
                    <div 
                      key={index} 
                      className="flex items-start space-x-4 scroll-animate"
                      style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                    >
                      <div className="text-2xl flex-shrink-0 mt-1">{solucion.icon}</div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-2">{solucion.title}</h4>
                        <p className="text-gray-700 leading-relaxed">{solucion.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Módulos Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-16 scroll-animate">
              <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                MICROSIP® para <span className="text-orange-500">todos</span>, desde pequeños emprendedores hasta grandes corporaciones.
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                Estamos ayudando a empresas de todos los tamaños a dar sus primeros pasos en el mundo digital,  
                con soluciones innovadoras que impulsan su crecimiento.
              </p>
            </div>

            {/* Divider */}
            <div className="flex justify-center mb-16 scroll-animate">
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"></div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-300 shadow-lg scroll-animate">
              {/* Modules Grid - 2 rows */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`relative group cursor-pointer ${
                      index >= 7 ? 'md:col-start-2 lg:col-start-auto' : ''
                    }`}
                    onMouseEnter={() => setHoveredIcon(module.id)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    <div className={`
                      bg-white border-2 border-gray-300 rounded-2xl p-4 text-center transition-all duration-300 transform
                      hover:border-orange-400 hover:bg-orange-50
                      hover:scale-110 hover:shadow-2xl hover:shadow-orange-400/20
                      ${hoveredIcon === module.id ? 'scale-110 shadow-2xl shadow-orange-400/20 border-orange-400 bg-orange-50' : 'scale-100'}
                    `}>
                      {/* Icon/Image Container */}
                      <div className="flex items-center justify-center mb-3">
                        <div className={`
                          w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center transition-all duration-300
                          ${hoveredIcon === module.id ? 'bg-orange-100 scale-110' : 'bg-gray-100'}
                        `}>
                          <ImageWithFallback module={module} />
                        </div>
                      </div>
                      
                      {/* Module Name */}
                      <div className={`
                        text-xs font-semibold transition-all duration-300
                        ${hoveredIcon === module.id ? 'text-orange-500' : 'text-gray-700'}
                      `}>
                        {module.name}
                      </div>
                      
                      <div className={`
                        absolute bottom-0 left-1/2 transform -translate-x-1/2
                        h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full
                        transition-all duration-300
                        ${hoveredIcon === module.id ? 'w-3/4' : 'w-0'}
                      `}></div>
                    </div>
                    
                    {hoveredIcon === module.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                        <div className="bg-orange-500 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-lg whitespace-nowrap border border-orange-400">
                          {module.name}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-orange-500"></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Integrated Button */}
              <div className="text-center">
                <button className="
                  bg-gradient-to-r from-orange-500 to-orange-600 
                  hover:from-orange-400 hover:to-orange-500 
                  text-white px-8 py-4 rounded-xl 
                  font-bold text-lg transition-all duration-300 
                  transform hover:scale-105 shadow-2xl
                  border-2 border-orange-400
                  hover:shadow-orange-400/30
                  w-full max-w-md
                ">
                  Encuentra la solución perfecta para tu empresa
                </button>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16 scroll-animate">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-orange-500">
                ¡Decídete ahora!
              </h2>
              <p className="text-2xl md:text-3xl font-semibold text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Gestiona y optimiza tu operación con un ERP hecho para tu empresa.
              </p>
            </div>
          </div>
        </section>

        {/* Microsip PARTNER Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8 scroll-animate">
                <div className="text-center lg:text-left">
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">
                    Microsip <span className="text-orange-500">PARTNER</span>
                  </h3>
                  <p className="text-xl text-gray-700 mb-8">
                    La solución ERP diseñada específicamente para el crecimiento de tu empresa
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-6">
                  {[
                    {
                      title: "Cumple al 100% con todas las disposiciones fiscales",
                      description: "Mantente siempre en regla con las obligaciones fiscales más recientes"
                    },
                    {
                      title: "Moderniza tus gestiones financieras y operativas",
                      description: "Con aplicaciones inteligentes que simplifican tus procesos diarios"
                    },
                    {
                      title: "Sistema ERP modular y escalable",
                      description: "Aumenta módulos y crece conforme a las necesidades de tu empresa"
                    },
                    {
                      title: "Diseñado especialmente para PyMEs",
                      description: "Entendemos las necesidades específicas de las pequeñas y medianas empresas"
                    },
                    {
                      title: "Solución robusta a un precio competitivo",
                      description: "MICROSIP® ofrece todas las funcionalidades que necesitas sin comprometer tu presupuesto"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4 scroll-animate" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-full p-2 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center lg:text-left">
                  <button className="
                    bg-gradient-to-r from-orange-500 to-orange-600 
                    hover:from-orange-400 hover:to-orange-500 
                    text-white px-8 py-4 rounded-xl 
                    font-bold text-lg transition-all duration-300 
                    transform hover:scale-105 shadow-2xl
                    border-2 border-orange-400
                    hover:shadow-orange-400/30
                  ">
                    ¡Solicita una demo GRATIS!
                  </button>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="relative scroll-animate">
                <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-8 transform rotate-2">
                  <div className="bg-white rounded-2xl p-8 transform -rotate-2 shadow-2xl">
                    <div className="rounded-xl h-96 flex items-center justify-center overflow-hidden">
                      <img 
                        src="/msp.png" 
                        alt="Microsip PARTNER"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 scroll-animate">
              ¿Listo para <span className="text-orange-500">Transformar</span> tu Empresa?
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed scroll-animate">
              Descubre cómo <span className="text-orange-500 font-semibold">Microsip</span> puede optimizar tus operaciones y llevar tu negocio al siguiente nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-animate">
              <a
                href="/contacto"
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Solicitar Demo
              </a>
              <a
                href="https://microsip.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-900 transition-all transform hover:scale-105"
              >
                Visitar Sitio Oficial
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MicroPage;