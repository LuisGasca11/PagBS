import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbmkt";
import BmktFooter from "./BmktFooter";
import { annotate } from 'rough-notation'; 
import { FileText, ShoppingCart, CreditCard, Receipt, Sparkles } from 'lucide-react';


function useInView(options = {}) {
    const ref = useRef(null);
    const [isInView, setIsView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsView(true);
            }
        }, { threshold: 0.1, ...options });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return [ref, isInView];
}

export default function Landing() {
    const [heroRef, heroInView] = useInView();
    const [section1Ref, section1InView] = useInView();
    const [section2Ref, section2InView] = useInView();
    const [section3Ref, section3InView] = useInView();
    const [section4Ref, section4InView] = useInView();
    const [section5Ref, section5InView] = useInView();
    const [section6Ref, section6InView] = useInView();
    const [section7Ref, section7InView] = useInView();


    const notationRef = useRef(null);

    useEffect(() => {
        if (notationRef.current) {
            const annotation = annotate(notationRef.current, {
                type: 'highlight',
                color: '#f97316',
                padding: [0, 10],
                strokeWidth: 3,
                multiline: true,
                iterations: 2
            });
            
            if (section1InView) {
                annotation.show();
            }
        }
    }, [section1InView]);


    useEffect(() => {
       document.title = "BMKT";
       return () => (document.title = "Black-Sheep");
    }, []);

    return (
        <>
            <Navbar />
            <div className="w-full bg-white overflow-hidden">
                <section
                    id="inicio"
                    ref={heroRef}
                    className="relative w-full bg-cover bg-center text-white py-20 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 flex flex-col items-center"
                    style={{ backgroundImage: "url('/header.webp')" }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className={`relative z-10 w-full max-w-7xl transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-start mb-6">
                            EVOLUCIONA TU<br />
                            EMPRESA CON UNA<br />
                            TIENDA ONLINE
                        </h1>

                        <button className="bg-lime-400 hover:bg-lime-500 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            VER PAQUETES
                        </button>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white"></div>
                </section>

                <section
                    ref={section1Ref}
                    className="w-full bg-white px-4 sm:px-6"
                >
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:gap-16 py-10 md:py-20 items-center">
                        <div className={`
                            text-center md:text-left
                            transition-all duration-1000 delay-200
                            ${section1InView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
                        `}>
                            <h2 className="
                                text-6xl 
                                font-extrabold text-gray-900 leading-tight mb-7 text-center
                            ">
                                Integración <span className="text-green-600"> <br />en Tiempo Real</span>
                            </h2>
                            
                            <p className="
                                text-lg sm:text-xl md:text-1xl lg:text-2xl
                                font-light text-black leading-relaxed text-center mb-7
                            ">
                                Conecta <span className="font-bold">MICROSIP </span>a un canal <span className="font-bold"> B2C y B2B</span> respetando precios, inventarios y pedidos.
                            </p>

                            <p className="
                                mt-6 text-lg sm:text-2xl md:text-2xl
                                font-bold text-gray-900 leading-normal  text-center uppercase mb-7 font-caveat
                            ">
                                <span className="relative inline-block">
                                <span className="relative z-10 font-black">Sin sincronizadores</span>
                                <svg
                                    className="absolute left-0 bottom-1 w-full h-4 z-0"
                                    viewBox="0 0 200 20"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                    d="M2 15 Q50 5 100 12 T198 10"
                                    fill="none"
                                    stroke="#fcd34d"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    />
                                </svg>
                                </span>
                                <br />
                            </p>
                            
                            <p className="
                                mt-4 text-base sm:text-lg text-gray-600 italic text-center 
                            ">
                                <span className="font-bold text-black">Extensión viva de tu operación Microsip. </span>
                            </p>
                        </div>

                        <div className={`
                            flex justify-center transition-all duration-1000 delay-400
                            ${section1InView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                        `}>
                            <img 
                                src="/bmkt/msp2.png" 
                                className="
                                    w-full max-w-lg
                                    
                                    hover:scale-[1.03] transition-transform duration-700 
                                    cursor-pointer
                                " 
                                alt="Esquema de integración Microsip B2BGo" 
                            />
                        </div>
                    </div>
                </section>

                <div className="w-full h-[2px] bg-gradient-to-r from-[#00C8FF] via-[#FF5AE0] to-[#D014FF] opacity-60 my-12 md:my-16 lg:my-24 rounded-full"></div>

                <section
                    ref={section2Ref}
                    className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6"
                >
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className={`relative flex justify-center order-2 md:order-1 transition-all duration-1000 delay-200 ${section2InView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                            <img 
                                src="bmk2.png" 
                                className="w-full max-w-lg  hover:scale-[1.03] transition-transform duration-700 cursor-pointer" 
                                alt="Una sucursal más" 
                            />
                        </div>

                        <div className={`text-center md:text-left order-1 md:order-2 transition-all duration-1000 delay-400 ${section2InView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#232B34] font-extrabold mb-4 leading-tight">
                                UNA SUCURSAL<br />
                                MÁS, EN LÍNEA
                            </h2>
                            <p className="text-[20px] sm: text-[#232B34] leading-relaxed">
                                Vende <span className="font-bold">sin límites</span> de ubicación ni horarios. Lleva tu negocio al siguiente nivel con una tienda en línea totalmente <span className="font-bold">integrada a tu sistema ERP.</span>
                            </p>
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-gradient-to-r from-[#00C8FF] via-[#FF5AE0] to-[#D014FF] opacity-60 my-12 md:my-16 lg:my-24 rounded-full"></div>

                <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24">

                        <div
                            ref={section3Ref}
                            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
                        >
                            <div className={`flex flex-col justify-center items-center md:items-start text-center md:text-left transition-all duration-1000 ${section3InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#232B34] leading-tight mb-4">
                                    VENDE DE FORMA<br />
                                    OMNICANAL
                                </h2>
                                <p className="text-[22px] text-gray-700 max-w-xl">
                                    Conecta tu punto de venta, tu equipo de ventas y tus integraciones en un solo sistema. <br />
                                </p>
                            </div>

                            <div className={`flex justify-center transition-all duration-1000 delay-300 ${section3InView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                <img 
                                    src="/bmkt/bmkt3.png" 
                                    className="w-full max-w-lg rounded-xl  hover:scale-105 transition-all duration-500" 
                                    alt="Omnicanal" 
                                />
                            </div>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-[#00C8FF] via-[#FF5AE0] to-[#D014FF] opacity-60 rounded-full"></div>

                        <div
                            ref={section4Ref}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
                        >
                            <div className={`flex justify-center order-2 md:order-1 transition-all duration-1000 ${section4InView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                <img 
                                    src="/bmkt/bmkt4.png" 
                                    className="w-full h-[500px] max-w-lg rounded-xl hover:scale-105 transition-all duration-500" 
                                    alt="Inventario" 
                                />
                            </div>

                            <div className={`text-center md:text-left order-1 md:order-2 transition-all duration-1000 delay-300 ${section4InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#232B34] leading-tight mb-4">
                                    GESTIONA TU INVENTARIO <br />EN TIEMPO REAL
                                </h2>
                                <p className="text-[22px] text-gray-700 max-w-xl">
                                    Conexión bidireccional entre tu ERP y tus canales de venta. Todo se actualiza al instante.                                
                                </p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-[#00C8FF] via-[#FF5AE0] to-[#D014FF] opacity-60 rounded-full"></div>

                        <div
                            ref={section5Ref}
                            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
                        >
                            <div className={`flex flex-col justify-center items-center md:items-start text-center md:text-left transition-all duration-1000 ${section5InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#232B34] leading-tight mb-4">
                                    SIMPLIFICA TU LOGÍSTICA
                                </h2>
                                <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-xl">
                                    B-MKT se integra con diversos carriers que te ayudan a entregar tus productos en todo México.
                                </p>
                            </div>

                            <div className={`flex justify-center transition-all duration-1000 delay-300 ${section5InView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                <img 
                                    src="/bmkt/bmkt5.png" 
                                    className="w-full max-w-lg rounded-xl hover:scale-105 transition-all duration-500" 
                                    alt="Logística" 
                                />
                            </div>
                        </div>
                        
                        {/*
                        <div className="w-full h-px bg-gradient-to-r from-[#00C8FF] via-[#FF5AE0] to-[#D014FF] opacity-60 rounded-full"></div>

                        <div
                            ref={section6Ref}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
                        >
                            <div className={`flex justify-center order-2 md:order-1 transition-all duration-1000 ${section6InView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                <img 
                                    src="/ftc.png" 
                                    className="w-full max-w-lg rounded-xl hover:scale-105 transition-all duration-500" 
                                    alt="Fidelización" 
                                />
                            </div>

                            <div className={`text-center md:text-left order-1 md:order-2 transition-all duration-1000 delay-300 ${section6InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#232B34] leading-tight mb-4">
                                    FIDELIZA A TUS CLIENTES
                                </h2>
                                <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-xl">
                                    Las herramientas de mailing e inbox de Shopify te permiten mantener una comunicación fluida con tus clientes.
                                </p>
                            </div>
                        </div>
                        */}
                    </div>
                </section>

                <div className="w-full h-[2px] bg-gradient-to-r from-[#00C8FF] via-[#FF5AE0] to-[#D014FF] opacity-60 my-12 md:my-16 lg:my-24 rounded-full"></div>
 <section
      ref={section7Ref}
      className="w-full bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20 md:py-24 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${section7InView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4">
            TUS CLIENTES PODRÁN
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Herramientas poderosas al alcance de tus clientes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card Grande - Catálogos */}
          <div className={`lg:col-span-8 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-8 sm:p-10 transition-all duration-1000 hover:shadow-2xl hover:scale-[1.02] ${section7InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white">
                  CATÁLOGOS
                </h3>
              </div>
              
              <img
                src="/arti.png"
                className="rounded-2xl w-full max-w-2xl mx-auto mb-6 shadow-2xl border-4 border-white/20"
                alt="Catálogos"
              />
              
              <p className="text-white/90 text-lg leading-relaxed max-w-2xl">
                Accede a un portal en la nube con la información completa de tus productos: precios y existencias siempre sincronizadas en tiempo real.
              </p>
            </div>
          </div>

          {/* Card Mediana - Cotizaciones */}
          <div className={`lg:col-span-4 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 p-6 sm:p-8 transition-all duration-1000 delay-100 hover:shadow-2xl hover:scale-[1.02] ${section7InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform -translate-x-24 translate-y-24" />
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              
              <img 
                src="/prod.png" 
                className="rounded-2xl w-full shadow-xl mb-6 border-2 border-white/30" 
                alt="Cotizaciones" 
              />
              
              <div className="mt-auto">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  Crea cotizaciones
                </h3>
                <p className="text-white/90 text-base">
                  Cuando quieras, con internet.
                </p>
              </div>
            </div>
          </div>

          {/* Card Mediana - Pedidos */}
          <div className={`lg:col-span-4 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-6 sm:p-8 transition-all duration-1000 delay-200 hover:shadow-2xl hover:scale-[1.02] ${section7InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform translate-x-24 -translate-y-24" />
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              
              <img 
                src="/pedido.png" 
                className="rounded-2xl w-full shadow-xl mb-6 border-2 border-white/30" 
                alt="Pedidos" 
              />
              
              <div className="mt-auto">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  Pedidos
                </h3>
                <p className="text-white/90 text-base">
                  Con las condiciones configuradas en Microsip. Verás el pedido reflejado en tu sistema.
                </p>
              </div>
            </div>
          </div>

          {/* Card Mediana - Estados de cuenta */}
          <div className={`lg:col-span-4 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-6 sm:p-8 transition-all duration-1000 delay-300 hover:shadow-2xl hover:scale-[1.02] ${section7InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform translate-x-24 translate-y-24" />
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              
              <img 
                src="/edc.png" 
                className="rounded-2xl w-full shadow-xl mb-6 border-2 border-white/30" 
                alt="Estados de cuenta" 
              />
              
              <div className="mt-auto">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  Estados de cuenta
                </h3>
                <p className="text-white/90 text-base">
                  Con información de su límite de crédito y adeudos pendientes y por vencer.
                </p>
              </div>
            </div>
          </div>

          {/* Card Mediana - Facturas */}
          <div className={`lg:col-span-4 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 p-6 sm:p-8 transition-all duration-1000 delay-400 hover:shadow-2xl hover:scale-[1.02] ${section7InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform -translate-x-24 -translate-y-24" />
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              
              <img 
                src="/descfac.png" 
                className="rounded-2xl w-full shadow-xl mb-6 border-2 border-white/30" 
                alt="Facturas" 
              />
              
              <div className="mt-auto">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  Facturas
                </h3>
                <p className="text-white/90 text-base">
                  En cualquier momento, en formato PDF.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
              
            </div>
            <BmktFooter />
        </>
    );
}