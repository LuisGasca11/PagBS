import React, { useState } from 'react';

const MicrosipSection = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

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
    <section className="mb-20 bg-gradient-to-br from-black to-gray-800 rounded-3xl p-8 border border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            MICROSIP® para <span className="text-yellow-400">todos</span>, desde pequeños emprendedores hasta grandes corporaciones.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Estamos ayudando a empresas de todos los tamaños a dar sus primeros pasos en el mundo digital,  
            con soluciones innovadoras que impulsan su crecimiento.
          </p>
        </div>

        {/* Divider */}
        <div className="flex justify-center mb-16">
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
        </div>

        <div className="mb-20 bg-gradient-to-br from-black to-gray-800 rounded-3xl p-8 border border-gray-700">
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
                  bg-black border-2 border-gray-700 rounded-2xl p-4 text-center transition-all duration-300 transform
                  hover:border-yellow-400 hover:bg-gray-900
                  hover:scale-110 hover:shadow-2xl hover:shadow-yellow-400/20
                  ${hoveredIcon === module.id ? 'scale-110 shadow-2xl shadow-yellow-400/20 border-yellow-400 bg-gray-900' : 'scale-100'}
                `}>
                  {/* Icon/Image Container */}
                  <div className="flex items-center justify-center mb-3">
                    <div className={`
                      w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center transition-all duration-300
                      ${hoveredIcon === module.id ? 'bg-gray-700 scale-110' : 'bg-gray-800'}
                    `}>
                      <ImageWithFallback module={module} />
                    </div>
                  </div>
                  
                  {/* Module Name */}
                  <div className={`
                    text-xs font-semibold transition-all duration-300
                    ${hoveredIcon === module.id ? 'text-yellow-400' : 'text-gray-300'}
                  `}>
                    {module.name}
                  </div>
                  
                  <div className={`
                    absolute bottom-0 left-1/2 transform -translate-x-1/2
                    h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full
                    transition-all duration-300
                    ${hoveredIcon === module.id ? 'w-3/4' : 'w-0'}
                  `}></div>
                </div>
                
                {hoveredIcon === module.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                    <div className="bg-gray-900 text-yellow-400 text-xs font-bold px-3 py-2 rounded-lg shadow-lg whitespace-nowrap border border-yellow-400">
                      {module.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Integrated Button */}
          <div className="text-center">
            <button className="
              bg-gradient-to-r from-yellow-500 to-orange-500 
              hover:from-yellow-400 hover:to-orange-400 
              text-gray-900 px-8 py-4 rounded-xl 
              font-bold text-lg transition-all duration-300 
              transform hover:scale-105 shadow-2xl
              border-2 border-yellow-400
              hover:shadow-yellow-400/30
              w-full max-w-md
            ">
              Encuentra la solución perfecta para tu empresa
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400">
            ¡Decídete ahora!
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Gestiona y optimiza tu operación con un ERP hecho para tu empresa.
          </p>
        </div>

        {/* Microsip PARTNER Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-4xl md:text-5xl font-bold mb-6">
                Microsip <span className="text-yellow-400">PARTNER</span>
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                La solución ERP diseñada específicamente para el crecimiento de tu empresa
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Cumple al 100% con todas las disposiciones fiscales</h4>
                  <p className="text-gray-300">Mantente siempre en regla con las obligaciones fiscales más recientes</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Moderniza tus gestiones financieras y operativas</h4>
                  <p className="text-gray-300">Con aplicaciones inteligentes que simplifican tus procesos diarios</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Sistema ERP modular y escalable</h4>
                  <p className="text-gray-300">Aumenta módulos y crece conforme a las necesidades de tu empresa</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Diseñado especialmente para PyMEs</h4>
                  <p className="text-gray-300">Entendemos las necesidades específicas de las pequeñas y medianas empresas</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Solución robusta a un precio competitivo</h4>
                  <p className="text-gray-300">MICROSIP® ofrece todas las funcionalidades que necesitas sin comprometer tu presupuesto</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="
                bg-gradient-to-r from-yellow-500 to-orange-500 
                hover:from-yellow-400 hover:to-orange-400 
                text-gray-900 px-8 py-4 rounded-xl 
                font-bold text-lg transition-all duration-300 
                transform hover:scale-105 shadow-2xl
                border-2 border-yellow-400
                hover:shadow-yellow-400/30
                  ">
                ¡Solicita una demo GRATIS!
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 transform rotate-2">
              <div className="bg-black rounded-2xl p-8 transform -rotate-2 shadow-2xl">
                <div className="rounded-xl h-96 flex items-center justify-center overflow-hidden">
                  <img 
                    src="Msp Partner 2 blanco.png" 
                    alt="Microsip PARTNER"
                    className="w-100 h-100 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MicrosipSection;