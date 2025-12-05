import React, { useState, useEffect } from "react";
import MicrosipFooter from "../MicrosipFooter";
import NavBar from "../NavbarMicro";

const EnRuta: React.FC = () => {
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
                onLoginClick={() => {}}
                onLogoutClick={() => {}}
                onOpenAdmin={() => {}}
                onOpenVpsAdmin={() => {}}
                onOpenHourlyAdmin={() => {}}
                />
            </div>

            <section className="bg-sky-50 text-sky-500 w-full py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">En Ruta</h1>
                            <p className="text-base sm:text-lg text-gray-600">
                                Sincroniza tus pedidos y existencias con Shopify o MercadoLibre
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src="/icons/en-ruta.png"
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

                <section className="max-w-6xl mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        <div className="bg-[#1194f6] text-white p-8 rounded-2xl shadow-lg">
                            <div className="flex items-start gap-4 mb-4">
                                <img src="/Modulos/ruta1.svg" alt="Consulta" className="h-10" />
                                <h3 className="text-2xl font-semibold">Consulta</h3>
                            </div>

                            <p className="font-medium mb-2">Información de los clientes</p>
                            <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                                <li>Saldos vencidos y por vencer</li>
                                <li>Descuentos por pronto pago</li>
                                <li>Políticas de crédito</li>
                                <li>Estatus de los pedidos</li>
                                <li>Pagos aplicados y por depositar</li>
                                <li>Precios</li>
                                <li>Existencias</li>
                                <li>Descuentos de los productos</li>
                            </ul>

                            <p className="font-medium mt-6 mb-2">Información de los artículos</p>
                            <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                                <li>Precios</li>
                                <li>Existencias</li>
                                <li>Descuentos de los productos</li>
                            </ul>
                        </div>

                        <div className="bg-[#1194f6] text-white p-8 rounded-2xl shadow-lg">
                            <div className="flex items-start gap-4 mb-4">
                                <img src="/Modulos/ruta2.svg" alt="Registra" className="h-10" />
                                <h3 className="text-2xl font-semibold">Registra</h3>
                            </div>

                            <ul className="space-y-1 list-disc list-inside ml-4 text-sm">
                                <li>Pedidos</li>
                                <li>Clientes nuevos</li>
                                <li>Pagos recolectados</li>
                            </ul>

                            <p className="font-medium mt-6 mb-2">Aplicarlos:</p>
                            <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                                <li>Por antigüedad a las facturas</li>
                                <li>En forma individual</li>
                                <li>Como anticipo</li>
                                <li>Envía por correo electrónico los acuses de recibo a los clientes</li>
                            </ul>
                        </div>

                        <div className="bg-[#1194f6] text-white p-8 rounded-2xl shadow-lg md:col-span-1">
                            <div className="flex items-start gap-4 mb-4">
                                <img src="/Modulos/ruta3.svg" alt="Gestiona" className="h-10" />
                                <h3 className="text-2xl font-semibold">Gestiona</h3>
                            </div>

                            <p className="font-medium mb-2">Cada agente cuenta con</p>
                            <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                                <li>Acceso personalizado</li>
                                <li>Visualización de su cartera de clientes</li>
                            </ul>

                            <p className="font-medium mt-6 mb-2">Información</p>
                            <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                                <li>Actividad de cada vendedor</li>
                                <li>Reportes de ventas por ruta</li>
                                <li>Historial de visitas realizadas</li>
                                <li>Programa las visitas de los agentes</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="bg-zinc-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl sm:text-3xl text-gray-500 font-bold mb-6">Integraciones</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-green-500 rounded-2xl bg-green-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/cuentas_cobrar.png"
                                        alt="Cuentas por cobrar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">CUENTAS POR COBRAR</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        -Se reflejan los pagos de los clientes que reciben los vendedores en ruta
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
                                        -Genera los pedidos de los clientes realizados durante la visita del vendedor
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

export default EnRuta;