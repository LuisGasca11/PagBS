import React, { useState, useEffect } from "react";
import MicrosipFooter from "../MicrosipFooter";
import NavBar from "../NavbarMicro";

const CuentasPagar: React.FC = () => {
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


            <section className="bg-red-50 text-red-500 w-full py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Cuentas por Pagar</h1>
                            <p className="text-base sm:text-lg text-gray-600">
                                Domina tus pasivos, sus fechas de pago y dirige una empresa sana.
                            </p>

                            <div className="mt-8">
                                <a href="/FormMicro" className="inline-block bg-orange-500 text-white font-semibold px-8 py-2 rounded-full shadow hover:bg-orange-600 transition text-center">
                                    ADQUIERE MICROSIP
                                </a>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src="/icons/cuentas_pagar.png"
                                alt="Bancos"
                                className="h-16 sm:h-20 lg:h-24 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-white px-4 sm:px-6 lg:px-10 py-10 text-gray-700">
                {/* FUNCIONALIDADES */}
                <section className="mb-16">

                    <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6 sm:gap-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-500 mt-8 sm:mt-12 lg:mt-16 mb-6 sm:mb-8 text-center lg:text-left">
                        Funcionalidades
                    </h2>
                        {/* CARD 1 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-orange-500">
                                        Cumplimiento fiscal
                                    </h3>
                                    <div className="space-y-3">
                                        <p className="text-gray-500 text-sm">
                                            Genera archivos externos con información de pagos a proveedores para elaborar la DIOT
                                        </p>
                                        <p className="text-gray-500 text-sm font-medium">
                                            Emite CFDI de constancias de retenciones de impuestos IVA e ISR:
                                        </p>
                                        <ul className="text-gray-600 space-y-1 list-disc list-inside ml-7">
                                            <li>Servicios profesionales</li>
                                            <li>Arrendamiento de inmuebles</li>
                                            <li>Dividendos</li>
                                            <li>Enajenación de bienes inmuebles</li>
                                            <li>Adquisición de bienes</li>
                                            <li>Remanente distribuible</li>
                                            <li>Pago a extranjeros</li>
                                        </ul>
                                        <p className="text-gray-500 text-sm">
                                            Importa los documentos el CFDI del proveedor
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/banc1.svg"
                                        alt="Cumplimiento Fiscal"
                                        className="h-24 sm:h-32 lg:h-36 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#6285f0]">
                                        Herramientas
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Programar pagos de proveedores</p>
                                        <p className="text-gray-500 text-sm">Generar constancias de retenciones</p>
                                        <p className="text-gray-500 text-sm">Exportar información para la DIOT</p>
                                        <p className="text-gray-500 text-sm">Liquidar saldos pequeños</p>
                                        <p className="text-gray-500 text-sm">Recalcular saldos</p>
                                        <p className="text-gray-500 text-sm">Eliminar historia</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/banc2.svg"
                                        alt="Herramientas"
                                        className="h-24 sm:h-32 lg:h-36 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#45c026]">
                                        Presupuestos
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Registro de cargos y creditos</p>
                                        <p className="text-gray-500 text-sm">Adjunta archivos que soporten la operación al documento</p>
                                        <p className="text-gray-500 text-sm">Registra movimientos personalizados de cargo o crédito</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/cpp1.svg"
                                        alt="Herramientas"
                                        className="h-24 sm:h-32 lg:h-36 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CARD 4 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#ffb816]">
                                        Reportes predefinidos
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Antigüedad de las cuentas por pagar</p>
                                        <p className="text-gray-500 text-sm">Pronóstico de pagos</p>
                                        <p className="text-gray-500 text-sm">Rotación de las cuentas por pagar</p>
                                        <p className="text-gray-500 text-sm">Auxiliares de los proveedores</p>
                                        <p className="text-gray-500 text-sm">Cargos de los proveedores</p>
                                        <p className="text-gray-500 text-sm">Relaciones de cuentas por pagar</p>
                                        <p className="text-gray-500 text-sm">Diarios de cuentas por pagar</p>
                                        <p className="text-gray-500 text-sm">IVA acreditado en los pagos</p>
                                        <p className="text-gray-500 text-sm">IEPS acreditado en los pagos</p>
                                        <p className="text-gray-500 text-sm">Retenciones de impuestos de los pagos</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/banc3.svg"
                                        alt="Reportes"
                                        className="h-24 sm:h-32 lg:h-36 object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-zinc-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl sm:text-3xl text-gray-500 font-bold mb-6">Integraciones</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-emerald-300 rounded-2xl bg-emerald-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/bancos.png"
                                        alt="Cuentas por cobrar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">BANCOS</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Registra automáticamente el retiro y la póliza correspondientes de los pagos a proveedores
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-yellow-400 rounded-2xl bg-yellow-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/compras.png"
                                        alt="Cuentas por pagar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">COMPRAS</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Registra los cargos a los proveedores por las compras realizadas
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 sm:p-6 border border-gray-300 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-blue-300 rounded-2xl bg-cyan-100 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/cont_elect.png"
                                        alt="Contabilidad"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">CONTABILIDAD</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Genera las pólizas de los cargos y créditos de los proveedores
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

export default CuentasPagar;