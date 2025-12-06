import React from "react";

export default function BmktPage() {
  return (
    <div className="font-sans">
      <header className="bg-white py-20 px-6 relative z-10 w-auto h-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          
          {/* Left content */}
          <div className="md:w-1/2 flex flex-col items-start text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 md:ml-30 text-gray-900 md:ml-40 tracking-widest">
              TAURUS
            </h1>

            <p className="text-base md:text-lg mb-2 md:ml-40 text-gray-600">
              <a
                href="https://www.taurus.com.mx"
                className="underline hover:text-gray-800 transition-colors"
              >
                www.taurus.com.mx
              </a>
            </p>

            <div className="space-y-1 mb-6 md:ml-40">
              <div className="flex items-start gap-2">
                <span className="text-sm md:text-base font-semibold text-gray-800 min-w-[80px]">
                  Industria:
                </span>
                <span className="text-sm md:text-base text-gray-600">
                  Venta de productos para el hogar.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sm md:text-base font-semibold text-gray-800 min-w-[80px]">
                  Ubicación:
                </span>
                <span className="text-sm md:text-base text-gray-600">
                  México.
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-4 md:ml-40">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Taurus México es una marca reconocida a nivel internacional por su amplia gama de productos para el hogar, incluyendo electrodomésticos, artículos de cocina, ventilación, y más. 
                Con una sólida presencia física, la empresa decidió dar el siguiente paso hacia la transformación digital para ofrecer una experiencia de compra moderna, cómoda y eficiente a sus clientes en todo el país.
              </p>
            </div>
          </div>

          {/* Right image */}
          <div className="md:w-1/2 flex justify-center relative md:mr-30">
            <img
              src="/bmkt/taurus.webp"
              alt="Productos Taurus para el hogar"
              className="rounded-lg w-96 max-w-md object-cover"
            />
          </div>
        </div>

        <div className="max-w-3xl mt-4">
          <h2 className="text-4xl md:text-5xl md:ml-60 font-bold mb-6 text-gray-900 tracking-widest">
            Retos
          </h2>

          <ul className="space-y-3 text-base md:text-lg text-gray-600 leading-relaxed md:ml-50">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Taurus ya contaba con una tienda online desarrollada en WordPress, por lo que su rendimiento y escalabilidad era limitada.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                El catálogo de productos no contaba con una categorización y orden en la tienda.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                No contaban con un canal de atención al cliente para la atención de dudas sobre los productos.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                La atención de solicitudes de garantía era deficiente por lo que buscaban integrar un medio de atención dentro de la tienda en línea.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Querían integrar un programa de recompensas para fidelizar a los clientes.
              </span>
            </li>
          </ul>
        </div>
      </header>

      <section 
        className="py-20 px-6"
        style={{ backgroundColor: '#f6f6e9' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center">
            <img
              src="/bmkt/middle.webp"
              alt="Imagen centrada"
              className="rounded-lg w-full max-w-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start">

          <div className="md:w-1/2 flex flex-col text-left md:ml-40">
            <h1 className="text-5xl md:text-5xl font-bold mb-5 text-gray-900 tracking-wider">
              Soluciones
            </h1>

            <div className="mb-12 w-full">
              <h2 className="text-xl md:text-2xl mb-3 text-gray-800 tracking-wider font-semibold">
                Migración a Shopify
              </h2>
              <div className="w-24 h-px bg-black mb-5"></div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Se realizó una migración estructurada desde WordPress hacia Shopify, manteniendo la identidad visual y mejorando la navegación, velocidad y seguridad de la tienda.
              </p>
            </div>

            <div className="mb-12 w-full">
              <h2 className="text-xl md:text-2xl mb-3 text-gray-800 tracking-wider font-semibold">
                Catálogo intuitivo
              </h2>
              <div className="w-24 h-px bg-black mb-5"></div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Se organizó el extenso catálogo en categorías claras con filtros que mejoran la experiencia del usuario al buscar productos específicos.
              </p>
            </div>

            <div className="w-full">
              <h2 className="text-xl md:text-2xl mb-3 text-gray-800 tracking-wider font-semibold">
                Atención al cliente integrada
              </h2>
              <div className="w-24 h-px bg-black mb-5"></div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Se implementó Zendesk directamente en la tienda para ofrecer soporte en tiempo real mediante chat y correo.
              </p>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center relative md:ml-[-20px] md:mr-32">
            <img
              src="/bmkt/movil.webp"
              alt="Mockup principal"
              className="w-96 md:w-[550px] rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-2 mt-24">

          <div className="md:w-1/2 flex justify-center md:ml-50">
            <img
              src="/bmkt/reviews.webp"
              alt="Mockup reviews"
              className="w-72 md:w-[500px] rounded-lg object-cover"
            />
          </div>

          <div className="md:w-1/2 flex flex-col text-left md:mr-28">

            <div className="mb-12 w-full">
              <h2 className="text-xl md:text-2xl mb-3 text-gray-800 tracking-wider font-semibold">
                Sistema de recompensas
              </h2>
              <div className="w-24 h-px bg-black mb-5"></div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Se configuró Smile que permite a los clientes ganar puntos por sus compras y otras interacciones, incentivando la recompra.
              </p>
            </div>

            <div className="w-full">
              <h2 className="text-xl md:text-2xl mb-3 text-gray-800 tracking-wider font-semibold">
                Proceso de garantías automatizado
              </h2>
              <div className="w-24 h-px bg-black mb-5"></div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Se habilitó una sección especial para que los clientes soliciten garantías desde la tienda, facilitando el seguimiento y la gestión interna.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 tracking-widest">
            Herramientas
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16 flex-wrap">
            
            <div className="text-center">
              <img 
                src="/bmkt/shp.webp" 
                alt="Shopify" 
                className="w-20 h-20 md:w-24 md:h-24 object-contain mx-auto mb-4"
              />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">Shopify</h3>
            </div>
            
            <div className="text-center">
              <img 
                src="/bmkt/zen.webp" 
                alt="Zendesk" 
                className="w-20 h-20 md:w-24 md:h-24 object-contain mx-auto mb-4"
              />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">Zendesk</h3>
            </div>
            
            <div className="text-center">
              <img 
                src="/bmkt/smi.webp" 
                alt="Smile" 
                className="w-20 h-20 md:w-24 md:h-24 object-contain mx-auto mb-4"
              />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">Smile</h3>
            </div>
            
            <div className="text-center">
              <img 
                src="/bmkt/form.webp" 
                alt="Form Builder" 
                className="w-20 h-20 md:w-24 md:h-24 object-contain mx-auto mb-4"
              />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">Form Builder</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="bg-[#14202E] text-white rounded-2xl mb-20 py-16 px-8">
            
            <h1 className="text-3xl md:text-4xl font-bold mb-10 tracking-wider">
              Resultados
            </h1>

            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  Incrementó 30% la retención de usuarios y su conversión.
                </h2>
              </div>
              
              <div className="flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  Aumentó un 63% la eficiencia en la atención al cliente gracias a los canales de comunicación integrados.
                </h2>
              </div>
              
              <div className="flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  Mejoró la organización de las solicitudes de garantía y por ende su atención.
                </h2>
              </div>
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            La renovación de la tienda en línea de Taurus México demuestra cómo una migración bien ejecutada a Shopify, combinada con integraciones estratégicas, puede fortalecer la relación con los clientes, automatizar procesos y abrir nuevas oportunidades de crecimiento digital.
          </p>
        </div>
      </section>
    </div>
  );
}