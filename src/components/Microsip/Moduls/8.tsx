import React, { useState, useEffect } from "react";
import MicrosipFooter from "../MicrosipFooter";
import NavBar from "../NavbarMicro";

const CuentasCobrar: React.FC = () => {
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


            <section className="bg-green-50 text-green-500 w-full py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Cuentas por Cobrar</h1>
                            <p className="text-base sm:text-lg text-gray-600">
                                Controla el saldo de tus clientes con crédito y plazos de pago
                            </p>

                            <div className="mt-8">
                                <a href="/FormMicro" className="inline-block bg-orange-500 text-white font-semibold px-8 py-2 rounded-full shadow hover:bg-orange-600 transition text-center">
                                    ADQUIERE MICROSIP
                                </a>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src="/icons/cuentas_cobrar.png"
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
                                            Emite comprobantes fiscales digitales de acuerdo al Código Fiscal de la Federación
                                        </p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>CFDI de ingreso de los cargos</li>
                                            <li>CFDI de egreso de los créditos</li>
                                            <li>CFDI de pago con el complemento de recepción de pagos (CRP) de los cobros</li>
                                            <li>CFDI de ingreso de los anticipos recibidos</li>
                                        </ul>
                                        <p className="text-gray-500 text-sm">
                                            Aplica anticipos CFDI en los cargos
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Cancela en el SAT el CFDI de una operación
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Emite el CFDI con los siguientes complementos fiscales
                                        </p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Arrendamientos de inmuebles</li>
                                            <li>Donatarias</li>
                                            <li>Notarías públicas</li>
                                            <li>Instituto Nacional Electoral (INE)</li>
                                            <li>Maneja el traslado o la retención de imp</li>
                                        </ul>
                                        <p className="text-gray-500 text-sm">
                                            Valida el RFC de los clientes en las listas del SAT
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Verifica en el SAT el estatus del proceso de cancelación de un CFDI
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Selección del uso del CFDI por régimen fiscal
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Crea cargos de ventas CFDI como notas de débito de documentos relacionados
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
                                        <p className="text-gray-500 text-sm">Recalcular saldos</p>
                                        <p className="text-gray-500 text-sm">Exportar comprobantes fiscales en XML</p>
                                        <p className="text-gray-500 text-sm">Cargar intereses moratorios</p>
                                        <p className="text-gray-500 text-sm">Liquidar saldos pequeños</p>
                                        <p className="text-gray-500 text-sm">Emitir estados de cuenta por cliente</p>
                                        <p className="text-gray-500 text-sm">Eliminar historia</p>
                                        <p className="text-gray-500 text-sm">Manejar cobros pendientes</p>
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
                                        Movimientos
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Registra de cargos y créditos fiscales</p>
                                        <p className="text-gray-500 text-sm">Genera una nota de crédito fiscal automática por descuentos por pronto pago</p>
                                        <p className="text-gray-500 text-sm">Genera cargos periódicos como renta, luz y agua</p>
                                        <p className="text-gray-500 text-sm">Registra movimientos personalizados de cargo o crédito</p>
                                        <p className="text-gray-500 text-sm">Crea las pólizas contables directamente a la contabilidad</p>
                                        <p className="text-gray-500 text-sm">Maneja anticipos para RESICOs</p>
                                        <p className="text-gray-500 text-sm">Genera automáticamente notas de crédito por descuentos por pronto pago</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/cpp1.svg"
                                        alt="Movimientos"
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
                                        <p className="text-gray-500 text-sm">Comisiones de los cobradores</p>
                                        <p className="text-gray-500 text-sm">Auxiliares de los clientes</p>
                                        <p className="text-gray-500 text-sm">Cargos de los clientes</p>
                                        <p className="text-gray-500 text-sm">Relaciones de las cuentas por cobrar</p>
                                        <p className="text-gray-500 text-sm">Diarios de cuentas por cobrar</p>
                                        <p className="text-gray-500 text-sm">Cobros por depositar</p>
                                        <p className="text-gray-500 text-sm">Cobros de los cobradores</p>
                                        <p className="text-gray-500 text-sm">Anticipos de los clientes</p>
                                        <p className="text-gray-500 text-sm">IVA causado en los cobros</p>
                                        <p className="text-gray-500 text-sm">IFPS causado en los cobros</p>
                                        <p className="text-gray-500 text-sm">Retenciones de los impuestos de los cobros</p>
                                        <p className="text-gray-500 text-sm">Saldos por acreditar cálculo de intereses moratorios</p>
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
                                        Crea de forma automática el depósito de los cobros y la póliza correspondiente
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
                                        Registra los cargos a los proveedores por las ventas realizadas
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-yellow-400 rounded-2xl bg-yellow-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/punto-venta.png"
                                        alt="Cuentas por pagar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">PUNTO DE VENTA</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Genera los cargos a los clientes por las ventas que se les realizan
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
                                        Genera las pólizas de los cargos y créditos de los clientes
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

export default CuentasCobrar;