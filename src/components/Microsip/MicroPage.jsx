import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { ArrowDown, Award, CheckCircle, Sparkles } from "lucide-react";
import DownloadPresentation from './DownloadPresentation';
import NavBar from './NavbarMicro';
import MicrosipFooter from './MicrosipFooter';
import { loadSession, clearSession } from "./utils/auth";
import LoginModal from './LoginModal';

const MicroPage = () => {
    const [pricesDB, setPricesDB] = useState({});
    const [hourlyPricesDB, setHourlyPricesDB] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);
    const [showAdminPanel, setShowAdminPanel] = useState(false);
    const [showAdminVpsPanel, setShowAdminVpsPanel] = useState(false);
    const [showAdminHourlyPanel, setShowAdminHourlyPanel] = useState(false);
    const [showAdminUsersPanel, setShowAdminUsersPanel] = useState(false);
    const [showAdminDocumentsPanel, setShowAdminDocumentsPanel] = useState(false);
    const [sessionWarning, setSessionWarning] = useState(false);
    const [showLogoutAnimation, setShowLogoutAnimation] = useState(false);
    const [logoutClosing, setLogoutClosing] = useState(false);
    const [selectedVps, setSelectedVps] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [vpsPlans, setVpsPlans] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [tabKey, setTabKey] = useState(0);
    const [hoveredIcon, setHoveredIcon] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [scrollY, setScrollY] = useState(0);

    const whySectionRef = React.useRef(null);

    useEffect(() => {
        document.title = "MICROSIP ERP - Blog ";
        
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            document.title = "Black-Sheep";
            window.removeEventListener('scroll', handleScroll);
        };
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
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const session = loadSession();

        if (session?.user) {
            setIsAuthenticated(true);
            setUsername(session.user.usuario);
            setUserRole(session.user.rol); 
        }
    }, []);

    const handleLoginSuccess = (user) => {
        setIsAuthenticated(true);
        setUsername(user.usuario);
        setUserRole(user.rol);
        setShowLoginModal(false);
        setShowLoginSuccess(true);
        
        setTimeout(() => {
            setShowLoginSuccess(false);
        }, 2000);
    };

    const handleLogout = () => {
        setShowLogoutAnimation(true);
        setTimeout(() => setLogoutClosing(true), 900);
        setTimeout(() => {
            clearSession();
            setIsAuthenticated(false);
            setUsername("");
            setUserRole(null);
            setShowLogoutAnimation(false);
            setLogoutClosing(false);
        }, 1300);
    };

    const handleAdminClick = () => {
        if (isAuthenticated && userRole === 'admin') {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'fixed top-20 right-4 z-[9999] bg-orange-500 text-white px-6 py-4 rounded-xl shadow-2xl animate-slide-in-right max-w-sm';
            messageDiv.innerHTML = `
                <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div>
                        <p class="font-bold">¡Hola ${username}!</p>
                        <p class="text-sm mt-1">Para usar los paneles de administración, dirígete a la página de <strong>Precios</strong>.</p>
                        <a href="/Prices" class="inline-block mt-2 text-sm bg-white text-orange-600 px-3 py-1 rounded-lg font-bold hover:bg-gray-100 transition">
                            Ir a Precios →
                        </a>
                    </div>
                </div>
            `;
            document.body.appendChild(messageDiv);
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    };

    const handleOpenDocuments = () => {
        if (userRole === 'admin' || userRole === 'user') {
            sessionStorage.setItem('openDocumentsModal', 'true');
            window.location.href = "/Prices";
        }
    };

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

    const scrollToWhy = () => {
        whySectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen transition-colors duration-300 overflow-x-hidden">
            
            <div className="relative w-full">
                <a
                    href="/MicroPage"
                    className={`fixed top-4 left-4 z-[60] transition-all duration-300 
                        ${scrollY > 80 ? "scale-75 translate-y-[-10px]" : "scale-100"}
                    `}
                >
                    <img
                        src="/msppart.webp"
                        alt="logo"
                        className="h-10 sm:h-12 object-contain"
                    />
                </a>

                <NavBar
                    isAuthenticated={isAuthenticated}
                    username={username}
                    userRole={userRole}
                    onLoginClick={() => setShowLoginModal(true)}
                    onLogoutClick={handleLogout}
                    onOpenAdmin={handleAdminClick}
                    onOpenVpsAdmin={handleAdminClick}
                    onOpenHourlyAdmin={handleAdminClick}
                    onOpenUsersAdmin={handleAdminClick}
                    onOpenDocuments={handleOpenDocuments}
                />
            </div>

            {/* Modal de Login */}
            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onSuccess={handleLoginSuccess}
                />
            )}

            {showLoginSuccess && (
                <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-xl text-sm z-50 animate-bounce-in">
                    ¡Bienvenido, {username}!
                </div>
            )}

            {showLogoutAnimation && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl animate-scaleIn mx-4">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            <p className="text-base sm:text-lg font-semibold text-gray-800">Cerrando sesión...</p>
                        </div>
                    </div>
                </div>
            )}

            <main>
                <section className="w-full bg-white py-12 sm:py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        
                        <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl py-10 text-black font-extrabold leading-tight">
                                <span className="text-orange-500 inline-block animate-slide-in-left-1">Maximiza</span><br />
                                <span className="inline-block animate-slide-in-left-2">el potencial</span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 leading-relaxed">
                                Toma el control, realiza decisiones informadas y alcanza todas tus metas 
                                con un <span className="font-bold">ERP</span> hecho para tu empresa. 
                                <span className="font-bold"> Microsip</span>: el secreto de los empresarios exitosos.
                            </p>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                                <a 
                                    href="/FormMicro" 
                                    className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition text-center 
                                    animate-fade-in delay-500 pulse-animation"
                                >
                                    ADQUIERE MICROSIP
                                </a>
                                <button
                                    onClick={scrollToWhy}
                                    className="border border-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:border-black transition text-center 
                                    animate-fade-in delay-700" 
                                >
                                    ¿POR QUÉ ELEGIR EL ERP MICROSIP?
                                </button>
                            </div>
                        </div>

                        {/* Imagen */}
                        <div className="flex justify-center mt-8 lg:mt-0">
                            <img 
                                src="/cart.png" 
                                alt="Microsip demo"
                                className="w-full max-w-md lg:max-w-xl object-contain drop-shadow-xl animate-float-subtle" 
                            />
                        </div>
                    </div>

                    <div className="w-full bg-gray-100 border-t mt-12 sm:mt-16 pt-6 sm:pt-10 pb-6 sm:pb-10">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 sm:gap-10 scroll-animate">
                                <div className="text-sm sm:text-base text-gray-500 text-center sm:text-left whitespace-nowrap">
                                    Encuéntranos en:
                                </div>
                                <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 opacity-80 w-full sm:w-auto">
                                    <a href="https://www.forbes.com.mx/ad-sistema-integral-soluciones-erp-para-negocio-microsip/" target="_blank" rel="noopener noreferrer" className="flex justify-center hover:opacity-100 transition-opacity">
                                        <img src="https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b5916c1a4fb250eb1b_logo-forbes-mexico.png" loading="lazy" alt="forbes" className="h-6 sm:h-8 w-auto object-contain" />
                                    </a>
                                    <a href="https://www.eleconomista.com.mx/el-empresario/Microsip-el-ERP-Mexicano-que-ayuda-a-las-empresas-a-crecer-20230327-0033.html" target="_blank" rel="noopener noreferrer" className="flex justify-center hover:opacity-100 transition-opacity">
                                        <img src="https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b581250c0ac23ccf90_logo-el-economista.png" loading="lazy" alt="economista" className="h-6 sm:h-8 w-auto object-contain" />
                                    </a>
                                    <a href="https://expansion.mx/empresas/2023/09/25/descubre-como-liberar-el-potencial-de-tu-empresa-con-el-erp-microsip" target="_blank" rel="noopener noreferrer" className="flex justify-center hover:opacity-100 transition-opacity">
                                        <img src="https://cdn.prod.website-files.com/627983ccef617d453b9485ad/6512fdf5ca29f22e6b9e3748_Logo_expansion_para_www.png" alt="expansion" loading="lazy" className="h-6 sm:h-8 w-auto object-contain" />
                                    </a>
                                    <a href="https://playersoflife.com/torreon/carta-porte-por-que-la-necesito-en-mi-empresa/" target="_blank" rel="noopener noreferrer" className="flex justify-center hover:opacity-100 transition-opacity">
                                        <img src="https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b4716fa942e19a1d77_logo-players-of-life.png" loading="lazy" alt="players" className="h-6 sm:h-8 w-auto object-contain" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={whySectionRef} className="w-full bg-white text-black py-12 sm:py-16 md:py-24 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-12 sm:mb-16 md:mb-20 scroll-animate">
                            ¿Por qué elegir el ERP Microsip?
                        </h1>

                        <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12 mb-16 sm:mb-24 md:mb-32 scroll-animate">
                            <div className="text-center md:text-left md:pl-8 lg:pl-20">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                    Cumple al 100% con el SAT
                                </h2>
                                <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8">
                                    Facilita el cumplimiento con el CFDI 4.0, Carta Porte, RESICO y demás requisitos.
                                </p>
                                <a 
                                    href="/sat"
                                    className="inline-flex items-center gap-3 text-black hover:text-orange-400 transition-all group"
                                >
                                    <img src="/fle.webp" alt="Flecha" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    <p className="font-bold text-sm sm:text-base">Descubre como cumplimos con el SAT</p>
                                </a>
                            </div>
                            <div className="flex justify-center md:pr-8 lg:pr-20">
                                <img
                                    src="/sat.png"
                                    alt="Cumplimiento SAT"
                                    className="w-40 sm:w-56 md:w-64 lg:w-72"
                                />
                            </div>
                        </div>

                        {/* BLOQUE 2 */}
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 sm:mb-24 md:mb-32 scroll-animate">
                            <div className="flex justify-center order-2 md:order-1 md:pl-8 lg:pl-40">
                                <img
                                    src="/linne.png"
                                    alt="Control de inventarios"
                                    className="w-40 sm:w-56 md:w-64 lg:w-72"
                                />
                            </div>
                            <div className="text-center md:text-left order-1 md:order-2 md:pr-8 lg:pr-20">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                    Sistema ERP Modular
                                </h2>
                                <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8">
                                    Un sistema flexible que se adapta al tamaño y modelo de operación de tu empresa.
                                </p>
                                <a 
                                    href="/SistemaMicrosip"
                                    className="inline-flex items-center gap-3 text-black hover:text-orange-400 transition-all group"
                                >
                                    <img src="/fle.webp" alt="Flecha" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    <p className="font-bold text-sm sm:text-base">Conoce el sistema ERP</p>
                                </a>
                            </div>
                        </div>

                        {/* BLOQUE 3 */}
                        <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12 mb-16 sm:mb-24 md:mb-32 scroll-animate">
                            <div className="text-center md:text-left md:pl-8 lg:pl-20">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                    20 años de experiencia
                                </h2>
                                <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8">
                                    Comenzamos siendo clientes MICROSIP desde hace más de 20 años
                                </p>
                                <a 
                                    href="/Experiencia"
                                    className="inline-flex items-center gap-3 text-black hover:text-orange-400 transition-all group"
                                >
                                    <img src="/fle.webp" alt="Flecha" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    <p className="font-bold text-sm sm:text-base">Aprende más sobre nosotros</p>
                                </a>
                            </div>
                            <div className="flex justify-center md:pr-8 lg:pr-20">
                                <img
                                    src="/35a.png"
                                    alt="Experiencia"
                                    className="w-56 sm:w-72 md:w-80 lg:w-[350px]"
                                />
                            </div>
                        </div>

                        {/* BLOQUE 4 */}
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 sm:mb-24 md:mb-32 scroll-animate">
                            <div className="flex justify-center order-2 md:order-1 md:pl-8 lg:pl-40">
                                <img
                                    src="/part.png"
                                    alt="Comunidad"
                                    className="w-40 sm:w-56 md:w-64 lg:w-72"
                                />
                            </div>
                            <div className="text-center md:text-left order-1 md:order-2 md:pr-8 lg:pr-20">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                    Partners expertos
                                </h2>
                                <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8">
                                    Somos partners MICROSIP certificados y al igual que tú somos clientes de la herramienta.
                                </p>
                                <a 
                                    href="/FormMicro"
                                    className="inline-flex items-center gap-3 text-black hover:text-orange-400 transition-all group"
                                >
                                    <img src="/fle.webp" alt="Flecha" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    <p className="font-bold text-sm sm:text-base">Contactanos</p>
                                </a>
                            </div>
                        </div>

                        {/* BLOQUE 5 */}
                        <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12 scroll-animate">
                            <div className="text-center md:text-left md:pl-8 lg:pl-20">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                    Comunidad de usuarios
                                </h2>
                                <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8">
                                    Conecta con una comunidad digital de miles de usuarios dispuestos a ayudarte.
                                </p>
                                <a 
                                    href="https://club.microsip.com/"
                                    className="inline-flex items-center gap-3 text-black hover:text-orange-400 transition-all group"
                                >
                                    <img src="/fle.webp" alt="Flecha" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    <p className="font-extrabold text-sm sm:text-base">Explora CLUB MICROSIP</p>
                                </a>
                            </div>
                            <div className="flex justify-center md:pr-8 lg:pr-20">
                                <img
                                    src="/com.png"
                                    alt="Comunidad"
                                    className="w-56 sm:w-72 md:w-80 lg:w-[350px]"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <MicrosipFooter />
            </main>

            <style jsx global>{`
                /* General Fade-in for Hero Buttons */
                .animate-fade-in {
                    opacity: 0;
                    animation: fadeIn 0.8s ease-out forwards;
                }
                .delay-500 {
                    animation-delay: 0.5s;
                }
                .delay-700 {
                    animation-delay: 0.7s;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                /* Título Hero (Slide-in) */
                .animate-slide-in-left-1 {
                    opacity: 0;
                    transform: translateX(-50px);
                    animation: slideInLeft 0.8s ease-out forwards;
                    animation-delay: 0.2s;
                }
                .animate-slide-in-left-2 {
                    opacity: 0;
                    transform: translateX(-50px);
                    animation: slideInLeft 0.8s ease-out forwards;
                    animation-delay: 0.4s;
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                /* Párrafo Hero (Slide-in Right) */
                .animate-slide-in-right {
                    opacity: 0;
                    transform: translateX(50px);
                    animation: slideInRight 0.8s ease-out forwards;
                    animation-delay: 0.6s;
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                /* Imagen Principal (Float Subtle) */
                .animate-float-subtle {
                    animation: floatSubtle 3s ease-in-out infinite;
                }
                @keyframes floatSubtle {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                    100% { transform: translateY(0); }
                }

                .scroll-animate {
                    opacity: 1;
                }
                .animate-fade-in-up {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .scroll-animate.animate-fade-in-up {
                animation: fadeInUp 0.8s ease-out forwards;
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Pulse Effect for Primary Button */
                .pulse-animation {
                    animation: pulse-ring 2s ease-out infinite, fadeIn 0.8s ease-out forwards;
                }
                @keyframes pulse-ring {
                    0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.5); }
                    80% { box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
                }

                /* Animaciones adicionales para el login */
                @keyframes bounce-in {
                    0% { opacity: 0; transform: scale(0.5); }
                    70% { opacity: 1; transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                .animate-bounce-in {
                    animation: bounce-in 0.4s ease-out;
                }

                /* Animación para mensajes emergentes */
                @keyframes slide-in-right-message {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-slide-in-right {
                    animation: slide-in-right-message 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

            `}</style>
        </div>
    );
};

export default MicroPage;