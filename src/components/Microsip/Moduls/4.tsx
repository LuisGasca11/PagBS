import React, { useState, useEffect } from "react";
import MicrosipFooter from "../MicrosipFooter";
import NavBar from "../NavbarMicro";

const CeoMovil: React.FC = () => {
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


            <section className="bg-green-50 text-emerald-500 w-full py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">CEO Móvil</h1>
                            <p className="text-base sm:text-lg text-gray-600">
                                Visualiza en cualquier momento la información más importante de tu empresa desde la comodidad de un dispositivo móvil
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src="/icons/ceo_movil.png"
                                alt="Bancos"
                                className="h-16 sm:h-20 lg:h-24 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-white px-4 sm:px-6 lg:px-10 py-10 text-gray-700">
                {/* FUNCIONALIDADES */}
                <section className="mb-5 max-w-6xl mx-auto">

                    <h2 className="text-3xl font-bold text-gray-500 mb-10">
                        Funcionalidades
                    </h2>

                    <p className="text-gray-500 mb-10 font-bold">
                        Aplica filtros de consulta y asígnalos como favoritos
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <div className="bg-zinc-100 p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-2xl text-emerald-500 font-semibold mb-4">
                                Ventas
                            </h3>
                            <ul className="text-gray-600 space-y-1">
                                <li>Importe de las ventas de un periodo</li>
                                <li>Artículos más vendidos</li>
                                <li>Línea de artículos</li>
                                <li>Por almacén</li>
                                <li>Por cliente</li>
                                <li>Por vendedor</li>
                                <li>Precio de los artículos</li>
                                <li>CFDI cancelados de viáticos</li>
                            </ul>
                        </div>

                        <div className="bg-zinc-100 p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-2xl text-emerald-500 font-semibold mb-4">
                                Valor de:
                            </h3>
                            <p className="font-medium text-gray-600 mb-2">Inventario:</p>
                            <ul className="text-gray-600 space-y-1 mb-4 list-disc list-inside">
                                <li>Periodo</li>
                                <li>Artículos</li>
                                <li>Línea de artículo</li>
                                <li>Almacén</li>
                                <li>Sucursal</li>
                            </ul>

                            <p className="font-medium text-gray-600 mb-2">Compras:</p>
                            <ul className="text-gray-600 space-y-1 list-disc list-inside">
                                <li>Por artículo</li>
                                <li>Por proveedor</li>
                            </ul>
                        </div>

                        <div className="bg-zinc-100 p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-2xl text-emerald-500 font-semibold mb-4">
                                Vigila tu cartera
                            </h3>

                            <p className="font-medium text-gray-600 mb-2">Saldo de tus clientes:</p>
                            <ul className="text-gray-600 space-y-1 mb-4 list-disc list-inside">
                                <li>Vencido</li>
                                <li>Por vencer</li>
                                <li>Cobros por depositar</li>
                            </ul>

                            <p className="font-medium text-gray-600 mb-2">Cuentas por cobrar:</p>
                            <ul className="text-gray-600 space-y-1 list-disc list-inside">
                                <li>Periodo</li>
                                <li>Artículos</li>
                                <li>Línea de artículo</li>
                                <li>Grupo de artículos</li>
                                <li>Cliente</li>
                                <li>Tipo de cliente</li>
                                <li>Zona/Sucursal</li>
                            </ul>
                        </div>

                        <div className="bg-zinc-100 p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-2xl text-emerald-500 font-semibold mb-4">
                                Cumple con tus pagos
                            </h3>

                            <p className="font-medium text-gray-600 mb-2">Saldo de tus proveedores:</p>
                            <ul className="text-gray-600 space-y-1 mb-4 list-disc list-inside">
                                <li>Vencido</li>
                                <li>Por vencer</li>
                            </ul>

                            <p className="font-medium text-gray-600 mb-2">Cuentas por pagar:</p>
                            <ul className="text-gray-600 space-y-1 list-disc list-inside">
                                <li>Periodo</li>
                                <li>Artículos</li>
                                <li>Línea de artículo</li>
                                <li>Grupo de artículos</li>
                                <li>Proveedor</li>
                            </ul>
                        </div>

                        <div className="bg-zinc-100 p-6 rounded-xl shadow-sm border border-gray-200 md:col-span-1">
                            <h3 className="text-2xl text-emerald-500 font-semibold mb-4">
                                Situación financiera
                            </h3>

                            <ul className="text-gray-600 space-y-1">
                                <li>Saldo disponible de tus cuentas bancarias</li>
                                <li>Estado de resultados</li>
                                <li>Balance general</li>
                                <li>Flujo de efectivo</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-16 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <div className="bg-emerald-400 p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-2xl text-white font-semibold mb-4">
                                Tienes la opción de enviar por correo eletrónico las consultas realizadas
                            </h3>
                        </div>

                        <div className="bg-emerald-400 p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-2xl text-white font-semibold mb-4">
                                La información va de acuerdo a los módulos Microsip que tengas instalados                            
                            </h3>
                        </div>                        
                    </div>
                </section>
            </div>
            <MicrosipFooter />
        </>
    );
};

export default CeoMovil;