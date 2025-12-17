import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavbarMicro";
import MicrosipFooter from "./MicrosipFooter";
import { loadSession, clearSession } from "./utils/auth";

function useInView(options = {}) {
    const ref = useRef(null);
    const [isInView, setIsView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsView(true);
            }
        }, { threshold: 0.1, ...options });

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return [ref, isInView];
}

export default function Experiencia() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [scrollY, setScrollY] = useState(0);

    const [heroRef, heroInView] = useInView();
    const [aboutRef, aboutInView] = useInView();
    const [ctaRef, ctaInView] = useInView();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        document.title = "Experiencia";
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.title = "Black-Sheep";
        };
    }, []);

      useEffect(() => {
    const session = loadSession();

    if (session?.user) {
        setIsAuthenticated(true);
        setUsername(session.user.usuario);
    }
    }, []);

    const handleLogout = () => {
    clearSession();
    setIsAuthenticated(false);
    setUsername("");
    };

    return (
        <>
            <div className="relative w-full mb-14">
                <a
                    href="/MicroPage"
                    className={`fixed top-4 left-4 z-[60] transition-all duration-500 
                        ${scrollY > 80 ? "scale-75 translate-y-[-10px] opacity-80" : "scale-100 opacity-100"}
                    `}
                >
                    <img src="/msppart.webp" alt="logo" className="h-10 sm:h-12 object-contain" />
                </a>

                <NavBar
                    isAuthenticated={isAuthenticated}
                    username={username}
                    onLoginClick={() => { }}
                    onLogoutClick={handleLogout}
                    onOpenAdmin={() => { }}
                    onOpenVpsAdmin={() => { }}
                    onOpenHourlyAdmin={() => { }}
                />
            </div>

            <section ref={heroRef} className="w-full bg-white px-6 sm:px-10 lg:px-20 py-16 overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 max-w-7xl mx-auto">

                    <div className={`max-w-2xl transition-all duration-1000 transform ${heroInView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                        <h1 className="text-4xl sm:text-7xl font-extrabold text-gray-900 leading-tight">
                            ¿Qué es el ERP<br />
                            <span className="text-orange-500/90">MICROSIP?</span>
                        </h1>

                        <p className="mt-10 text-gray-500 text-[17px] leading-relaxed">
                            El sistema ERP <strong>MICROSIP</strong> fue desarrollado para controlar los procesos administrativos y operativos de las PyMEs.
                            Durante más de 35 años MICROSIP ha <strong>maximizado el potencial</strong> de más de 100 mil empresas.
                            Cuenta con presencia en toda la República Mexicana con <strong>8 oficinas regionales</strong> y más de <strong>350 partners certificados como black_sheep®</strong>.
                        </p>
                    </div>

                    <div className={`flex ml-20 transition-all duration-1000 delay-300 transform ${heroInView ? 'translate-x-0 opacity-100 rotate-0' : 'translate-x-20 opacity-0 rotate-6'}`}>
                        <img
                            src="/micro3d.png"
                            alt="Microsip Logo"
                            className="w-[600px] h-auto object-contain drop-shadow-2xl ml-10"
                        />
                    </div>
                </div>
            </section>

            <section ref={aboutRef} className="w-full bg-[#f8fafc] px-6 sm:px-10 lg:px-20 py-24">
                <div className="max-w-6xl mx-auto">

                    <div className={`text-center mb-16 transition-all duration-1000 ${aboutInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-3xl sm:text-6xl font-extrabold text-gray-900 mb-4">
                            NOSOTROS
                        </h2>
                        <div className="w-20 h-1 bg-orange-500 mx-auto mb-6 rounded-full"></div>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                            Somos una empresa con una sólida trayectoria, enfocada en transformar
                            procesamientos empresariales mediante tecnología.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Columna 1 */}
                        <div className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-700 delay-100 transform ${aboutInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                            <h3 className="text-[20px] font-extrabold text-gray-900 mb-4 uppercase text-center">Nuestra Experiencia</h3>
                            <ul className="space-y-3 text-gray-600 text-lg leading-relaxed">
                                <li>• Más de 15 años como expertos en Microsip.</li>
                                <li>• Somos desarrolladores y clientes MICROSIP</li>
                            </ul>
                        </div>

                        {/* Columna 2 */}
                        <div className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-700 delay-300 transform ${aboutInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                            <h3 className="text-[20px] font-extrabold text-center  uppercase text-gray-900 mb-4">Nuestra Esencia</h3>
                            <ul className="space-y-3 text-gray-600 text-lg leading-relaxed">
                                <li>• 3ra generación con mentalidad digital.</li>
                                <li>• Adaptamos la tecnología a tu negocio.</li>
                            </ul>
                        </div>

                        {/* Columna 3 */}
                        <div className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-700 delay-500 transform ${aboutInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                            <h3 className="text-[20px] font-extrabold text-gray-900 mb-4 ¿Qué nos diferencia? uppercase">¿Qué nos diferencia?</h3>
                            <ul className="space-y-3 text-gray-600 text-lg leading-relaxed">
                                <li>• Enfoque consultivo y cercano.</li>
                                <li>• Visión a largo plazo y estabilidad.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={ctaRef} className="w-full bg-white px-4 py-20 overflow-hidden">
                <div className={`w-full max-w-7xl mx-auto text-center transition-all duration-1000 transform ${ctaInView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>

                    <p className="text-gray-400 text-base md:text-xl lg:text-2xl italic leading-relaxed whitespace-nowrap inline-block w-full text-center">
                        Toma el control, realiza decisiones informadas y alcanza todas tus metas con un ERP hecho para tu empresa.
                    </p>

                    <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent w-full"></div>
                </div>
            </section>

            <MicrosipFooter />
        </>
    );
}