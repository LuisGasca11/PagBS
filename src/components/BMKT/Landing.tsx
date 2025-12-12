import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbmkt";
import BmktFooter from "./BmktFooter";

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

    return (
        <>
            <Navbar />
            <div className="w-full bg-white overflow-hidden">
                <section
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
                </section>

                <section
                    ref={section1Ref}
                    className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6"
                >
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className={`text-center md:text-left transition-all duration-1000 delay-200 ${section1InView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            <p className="text-lg sm:text-xl md:text-2xl font-light text-[#232B34] leading-relaxed">
                                Conecta tu sistema Microsip a B2BGo,<br className="hidden sm:block" />
                                una plataforma en la nube con la que<br className="hidden sm:block" />
                                puedes vender por mayoreo en línea.
                            </p>
                        </div>

                        <div className={`flex justify-center transition-all duration-1000 delay-400 ${section1InView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <img src="b2bgo.webp" className="w-full sm:w-3/4 max-w-sm hover:scale-105 transition-transform duration-500" alt="B2BGo" />
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
                            <img src="UC.webp" className="w-full sm:w-3/4 max-w-sm hover:scale-105 transition-transform duration-500" alt="Una sucursal más" />
                        </div>

                        <div className={`text-center md:text-left order-1 md:order-2 transition-all duration-1000 delay-400 ${section2InView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#232B34] font-extrabold mb-4 leading-tight">
                                UNA SUCURSAL<br />
                                MÁS, EN LÍNEA
                            </h2>
                            <p className="text-base sm:text-lg lg:text-xl text-[#232B34] leading-relaxed">
                                Sin restricciones geográficas<br className="hidden sm:block" />
                                ni horarios, expande tus oportunidades<br className="hidden sm:block" />
                                de venta con una tienda online en<br className="hidden sm:block" />
                                Shopify.
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
                                <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-xl">
                                    Conecta tu tienda Shopify a diversos marketplaces para que tus clientes compren
                                    desde donde más les convenga.
                                </p>
                            </div>

                            <div className={`flex justify-center transition-all duration-1000 delay-300 ${section3InView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                <img src="/vfo.png" className="w-full max-w-sm rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500" alt="Omnicanal" />
                            </div>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-[#00C8FF] via-[#FF5AE0] to-[#D014FF] opacity-60 rounded-full"></div>

                        <div
                            ref={section4Ref}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
                        >
                            <div className={`flex justify-center order-2 md:order-1 transition-all duration-1000 ${section4InView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                <img src="/gfi.png" className="w-full max-w-sm rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500" alt="Inventario" />
                            </div>

                            <div className={`text-center md:text-left order-1 md:order-2 transition-all duration-1000 delay-300 ${section4InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#232B34] leading-tight mb-4">
                                    GESTIONA FÁCILMENTE TU<br />
                                    INVENTARIO
                                </h2>
                                <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-xl">
                                    Conecta tu ERP a Shopify para que tu inventario se mantenga sincronizado en tiempo real.
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
                                    Shopify se integra con diversos carriers que te ayudan a entregar tus productos en todo México.
                                </p>
                            </div>

                            <div className={`flex justify-center transition-all duration-1000 delay-300 ${section5InView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                <img src="/stl.png" className="w-full max-w-sm rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500" alt="Logística" />
                            </div>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-[#00C8FF] via-[#FF5AE0] to-[#D014FF] opacity-60 rounded-full"></div>

                        <div
                            ref={section6Ref}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
                        >
                            <div className={`flex justify-center order-2 md:order-1 transition-all duration-1000 ${section6InView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                <img src="/ftc.png" className="w-full max-w-sm rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500" alt="Fidelización" />
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
                    </div>
                </section>

                <div className="w-full h-[2px] bg-gradient-to-r from-[#00C8FF] via-[#FF5AE0] to-[#D014FF] opacity-60 my-12 md:my-16 lg:my-24 rounded-full"></div>

                <section
                    ref={section7Ref}
                    className="w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6"
                >
                    <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-[#232B34] mb-12 sm:mb-16 transition-all duration-1000 ${section7InView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        TUS CLIENTES PODRÁN
                    </h1>

                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        <div className={`lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#3B4148] to-[#15202B] flex flex-col items-center justify-center text-center transition-all duration-1000 hover:scale-105 ${section7InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <img
                                src="/arti.png"
                                className="rounded-2xl w-full max-w-md mx-auto mb-6 shadow-xl"
                                alt="Catálogos"
                            />
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                Visualizar tus catálogos
                            </h3>
                            <p className="text-white text-base sm:text-lg max-w-xl">
                                En el portal en la nube con información de todos tus productos, su precio y el número de existencias sincronizado en tiempo real.
                            </p>
                        </div>

                        <div className={`rounded-3xl p-6 sm:p-8 bg-[#CBFF5E] flex flex-col gap-6 items-center text-center transition-all duration-1000 delay-200 hover:scale-105 ${section7InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <img src="/prod.png" className="rounded-xl w-full max-w-xs shadow-lg" alt="Cotizaciones" />
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                                    Crear cotizaciones
                                </h3>
                                <p className="text-gray-700 text-base sm:text-lg">
                                    Desde su teléfono o PC, a cualquier hora; solo requieren tener internet.
                                </p>
                            </div>
                        </div>

                        <div className={`rounded-3xl p-6 sm:p-8 bg-[#F3F1E8] flex flex-col gap-6 items-center text-center transition-all duration-1000 delay-300 hover:scale-105 ${section7InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <img src="/pedido.png" className="rounded-xl w-full max-w-xs shadow-lg" alt="Pedidos" />
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                                    Levantar pedidos
                                </h3>
                                <p className="text-gray-700 text-base sm:text-lg">
                                    Con las condiciones configuradas en Microsip. Verás el pedido reflejado en tu sistema.
                                </p>
                            </div>
                        </div>

                        <div className={`rounded-3xl p-6 sm:p-8 bg-[#CBFF5E] flex flex-col gap-6 items-center text-center transition-all duration-1000 delay-400 hover:scale-105 ${section7InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <img src="/edc.png" className="rounded-xl w-full max-w-xs shadow-lg" alt="Estados de cuenta" />
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                                    Consultar sus estados de cuenta
                                </h3>
                                <p className="text-gray-700 text-base sm:text-lg">
                                    Con información de su límite de crédito y adeudos pendientes y por vencer.
                                </p>
                            </div>
                        </div>

                        <div className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#3B4148] to-[#15202B] flex flex-col gap-6 items-center text-center transition-all duration-1000 delay-500 hover:scale-105 ${section7InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <img src="/descfac.png" className="rounded-xl w-full max-w-xs shadow-lg" alt="Facturas" />
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                                    Descargar facturas
                                </h3>
                                <p className="text-gray-300 text-base sm:text-lg">
                                    En cualquier momento, en formato PDF.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <BmktFooter />
        </>
    );
}