import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";
import MicrosipFooter from "./MicrosipFooter";
import emailjs from '@emailjs/browser';
import NavBar from "./NavbarMicro";
import LoginModal from './LoginModal';
import { loadSession, clearSession } from "./utils/auth";

export default function FormMicro() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [scrollY, setScrollY] = useState(0);
    const [showLogoutAnimation, setShowLogoutAnimation] = useState(false);

    const [isSending, setIsSending] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        empresa: '',
        movil: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        const templateParams = {
            from_name: formData.nombre,
            reply_to: formData.correo,
            company: formData.empresa,
            phone: formData.movil,
            message: formData.mensaje,
        };

        try {
            await emailjs.send(
                'service_65gee8h', 
                'template_t5yu8ff', 
                templateParams,
                '7Yw68iSr5StWrSfIT' 
            );

            alert("¡Mensaje enviado con éxito! Nos contactaremos pronto.");
            setFormData({ nombre: '', correo: '', empresa: '', movil: '', mensaje: '' });
        } catch (error) {
            console.error("Error al enviar:", error);
            alert("Hubo un error al enviar el mensaje. Por favor intenta de nuevo.");
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
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

    const handleAdminClick = () => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'fixed top-20 right-4 z-[9999] bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-slide-in-right max-w-md border border-orange-300';
        messageDiv.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <p class="font-bold">Panel no disponible</p>
                    <p class="text-sm opacity-90 mt-1">
                        Los paneles de administración solo se pueden usar en la sección de <strong>Precios</strong>.
                        <br>
                        <span class="text-xs opacity-80">Tu sesión está activa y puedes seguir navegando.</span>
                    </p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="text-white/80 hover:text-white ml-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(messageDiv);
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.classList.add('animate-fade-out-up');
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 300);
            }
        }, 5000);
    };

    const handleLogout = () => {
        setShowLogoutAnimation(true);
        setTimeout(() => {
            clearSession();
            setIsAuthenticated(false);
            setUsername("");
            setUserRole(null);
            setShowLogoutAnimation(false);
        }, 1300);
    };

    return (
        <>
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
                        className="h-12 sm:h-12 object-contain"
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
                />
            </div>

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

            <section id="contact-section" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-5">
                <div className="absolute inset-0 bg-white" />

                <div className="max-w-4xl mx-auto relative z-10">

                    <div className="text-center animate-fade-up">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">
                            ¿Listo para transformar tu almacén?
                        </h2>

                        <p className="text-lg text-orange-400 font-bold mb-12 max-w-2xl mx-auto">
                            Déjanos tus datos y un consultor te contactará para una demo personalizada
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-[oklch(0.75_0.21_55)] animate-fade-up"
                        style={{ animationDelay: "0.15s" }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2 animate-fade-in text-black" style={{ animationDelay: "0.2s" }}>
                                <label className="text-sm font-bold ">NOMBRE</label>
                                <input
                                    type="text"
                                    name="nombre" 
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tu nombre"
                                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 text-black"
                                />
                            </div>

                            <div className="space-y-2 animate-fade-in text-black" style={{ animationDelay: "0.3s" }}>
                                <label className="text-sm font-bold">CORREO</label>
                                <input
                                    type="email"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    required
                                    placeholder="tu@empresa.com"
                                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 text-black"
                                />
                            </div>

                            <div className="space-y-2 animate-fade-in text-black" style={{ animationDelay: "0.4s" }}>
                                <label className="text-sm font-bold">EMPRESA</label>
                                <input
                                    type="text"
                                    name="empresa"
                                    value={formData.empresa}
                                    onChange={handleChange}
                                    required
                                    placeholder="Nombre de tu empresa"
                                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 text-black"
                                />
                            </div>

                            <div className="space-y-2 animate-fade-in text-black" style={{ animationDelay: "0.5s" }}>
                                <label className="text-sm font-bold">MÓVIL</label>
                                <input
                                    type="tel"
                                    name="movil"
                                    value={formData.movil}
                                    onChange={handleChange}
                                    required
                                    placeholder="+52 55 1234 5678"
                                    className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 text-black"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 mb-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                            <label className="text-sm font-bold text-black justify-center items-center">¿QUÉ TE INTERESA MÁS?</label>
                            <textarea
                                name="mensaje"
                                value={formData.mensaje}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Cuéntanos..."
                                className="w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 text-black resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSending}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 text-lg rounded-xl transition-all mb-4 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSending ? "Enviando..." : "Solicitar Demo Gratuita"}
                            {!isSending && <ArrowRight className="h-5 w-5" />}
                        </button>

                        <p className="text-sm text-center text-gray-600 animate-fade-in" style={{ animationDelay: "0.7s" }}>
                            Al enviar este formulario, aceptas ser contactado por un especialista de black_sheep®.
                        </p>
                    </form>

                    <div className="flex flex-wrap justify-center items-center gap-10 mt-12 font-bold text-black">

                        <div className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: "0.8s" }}>
                            <CheckCircle className="h-5 w-5 text-orange-500" />
                            Demo en 15 minutos
                        </div>

                        <div className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: "1s" }}>
                            <Shield className="h-5 w-5 text-orange-500" />
                            Sin compromiso
                        </div>

                        <div className="flex items-center gap-2 animate-fade-up" style={{ animationDelay: "1.2s" }}>
                            <Zap className="h-5 w-5 text-orange-500" />
                            Respuesta en 24h
                        </div>
                    </div>
                </div>
            </section>
            <MicrosipFooter />
        </>
    );
}