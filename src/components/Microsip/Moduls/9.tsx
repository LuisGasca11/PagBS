import React, { useState, useEffect } from "react";
import MicrosipFooter from "../MicrosipFooter";
import NavBar from "../NavbarMicro";

const SyncE: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isEditCardsModalOpen, setIsEditCardsModalOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className="relative w-full bg-white">
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
                    userRole={"guest"}
                    userId={null}
                    onLoginClick={() => {}}
                    onLogoutClick={() => {}}
                    onOpenAdmin={() => {}}
                    onOpenVpsAdmin={() => {}}
                    onOpenHourlyAdmin={() => {}}
                    onOpenUsersAdmin={() => {}}
                    onOpenDocuments={() => {}}
                    onOpenProfile={() => {}}
                />
            </div>


            <section className="bg-purple-50 text-purple-400 w-full py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Sync-E</h1>
                            <p className="text-base sm:text-lg text-gray-600">
                                Sincroniza tus pedidos y existencias con Shopify o MercadoLibre
                            </p>

                            <div className="mt-8">
                                <a href="/FormMicro" className="inline-block bg-orange-500 text-white font-semibold px-8 py-2 rounded-full shadow hover:bg-orange-600 transition text-center">
                                    ADQUIERE MICROSIP
                                </a>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src="/icons/synce.png"
                                alt="Bancos"
                                className="h-16 sm:h-20 lg:h-24 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-white px-4 sm:px-6 lg:px-10 py-10 text-gray-700">
                {/* FUNCIONALIDADES */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6 sm:gap-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-500 mt-8 sm:mt-12 lg:mt-16 mb-6 sm:mb-8 text-center lg:text-left">
                        Funcionalidades
                    </h2>
                </div>

                <section className="mb-16 max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Card 1 */}
                        <div className="bg-purple-400 p-6 rounded-xl shadow-sm border border-purple-300">
                            <div className="flex items-center gap-4">
                                <img src="/Modulos/sync1.svg" className="w-10 h-10" />
                                <h3 className="text-xl text-white font-semibold">
                                    Tienes la opción de enviar por correo electrónico las consultas realizadas
                                </h3>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-purple-400 p-6 rounded-xl shadow-sm border border-purple-300">
                            <div className="flex items-center gap-4">
                                <img src="/Modulos/sync2.svg" className="w-10 h-10" />
                                <h3 className="text-xl text-white font-semibold">
                                    Sincronización manual o automática
                                </h3>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-purple-400 p-6 rounded-xl shadow-sm border border-purple-300">
                            <div className="flex items-center gap-4">
                                <img src="/Modulos/sync3.svg" className="w-10 h-10" />
                                <h3 className="text-xl text-white font-semibold">
                                    Agrupación por líneas de artículos
                                </h3>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-purple-400 p-6 rounded-xl shadow-sm border border-purple-300">
                            <div className="flex items-center gap-4">
                                <img src="/Modulos/sync4.svg" className="w-10 h-10" />
                                <h3 className="text-xl text-white font-semibold">
                                    Generación automática del pedido en el módulo de Ventas
                                </h3>
                            </div>
                        </div>

                        {/* Card 5 */}
                        <div className="bg-purple-400 p-6 rounded-xl shadow-sm border border-purple-300 md:col-span-1">
                            <div className="flex items-center gap-4">
                                <img src="/Modulos/sync5.svg" className="w-10 h-10" />
                                <h3 className="text-xl text-white font-semibold">
                                    Conecta tu tienda en línea
                                </h3>
                            </div>
                        </div>

                    </div>
                </section>

                <section className="bg-zinc-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl sm:text-3xl text-gray-500 font-bold mb-6">Integraciones</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-purple-500 rounded-2xl bg-purple-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/inventarios.png"
                                        alt="Cuentas por cobrar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">INVENTARIOS</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Controla las existencias de los artículos
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-orange-400 rounded-2xl bg-orange-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/ventas.png"
                                        alt="Cuentas por pagar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">VENTAS</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Las ventas realizadas en la tienda en línea se ven reflejadas en este módulo
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <MicrosipFooter />
        </>
    );
};

export default SyncE;