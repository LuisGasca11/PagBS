import React, { useState, useEffect } from "react";
import MicrosipFooter from "../MicrosipFooter";
import NavBar from "../NavbarMicro";

const Contabilidad: React.FC = () => {
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

            <section className="bg-cyan-50 text-sky-400 w-full py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Contabilidad</h1>
                            <p className="text-base sm:text-lg text-gray-600">
                                Automatiza y controla la información contable de tu empresa
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src="/icons/cont_elect.png"
                                alt="Bancos"
                                className="h-20 sm:h-24 lg:h-24 object-contain"
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
                                        Cumplimiento Fiscal
                                    </h3>
                                    <div className="space-y-2">
                                      <p className="text-gray-500 text-sm">Guarda todos los CFDIs emitidos y recibidos</p>
                                      <p className="text-gray-500 text-sm">Agrega comprobantes con XML y sin XML</p>
                                      <p className="text-gray-500 text-sm">Agrega comprobantes directo al portal del SAT</p>
                                      <p className="text-gray-500 text-sm">Herramienta de información de CFDI PPD:</p>
                                      <ul className="list-disc list-inside text-gray-500 text-sm ml-4">
                                        <li>Completamente pagado</li>
                                        <li>Parcialmente pagado</li>
                                        <li>Sin pago</li>
                                      </ul>
                                      <p className="text-gray-500 text-sm">Genera la balanza de comprobación para el SAT</p>
                                      <p className="text-gray-500 text-sm">Exporta pólizas contables para el SAT</p>
                                      <p className="text-gray-500 text-sm">Reporte auxiliar de folios para el SAT</p>
                                      <p className="text-gray-500 text-sm">Genera archivo para la DIOT</p>
                                      <p className="text-gray-500 text-sm">Verifica el estado de los CFDIs ante el SAT:</p>
                                      <ul className="list-disc list-inside text-gray-500 text-sm ml-4">
                                        <li>Vigentes</li>
                                        <li>Cancelados</li>
                                        <li>No encontrados</li>
                                      </ul>
                                      <p className="text-gray-500 text-sm">Valida contribuyentes incumplidos de los CFDI</p>
                                      <p className="text-gray-500 text-sm">Valida los datos fiscales de tus clientes y proveedores</p>
                                      <p className="text-gray-500 text-sm">NIF C06: Calculo del valor residual de los activos fijos</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/banc1.svg"
                                        alt="Cumplimiento Fiscal"
                                        className="h-32 sm:h-60 lg:h-36 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#ffb816]">
                                        Reportes Predefinidos
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Mayores y auxiliares</p>
                                        <p className="text-gray-500 text-sm">Balanza de comprobación</p>
                                        <p className="text-gray-500 text-sm">Diario general</p>
                                        <p className="text-gray-500 text-sm">Libro mayor</p>
                                        <p className="text-gray-500 text-sm">Movimiento neto del ejercicio</p>
                                        <p className="text-gray-500 text-sm">Pólizas concentradas</p>
                                        <p className="text-gray-500 text-sm">Asientos con recordatorios</p>
                                        <p className="text-gray-500 text-sm">Saldos promedio</p>
                                        <p className="text-gray-500 text-sm">Deprecaciones de activos fijos</p>
                                        <p className="text-gray-500 text-sm">Ajuste anual por inflación</p>
                                        <p className="text-gray-500 text-sm">Impuesto al activo</p>
                                        <p className="text-gray-500 text-sm">Comprobantes fiscales</p>
                                        <p className="text-gray-500 text-sm">Terceros</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/banc3.svg"
                                        alt="Reportes"
                                        className="h-30 sm:h-45 lg:h-36 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#335ddd]">
                                        Presupuestos
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Genera presupuestos para cada área de la empresa</p>
                                        <p className="text-gray-500 text-sm">Crea reportes de presupuestos ejercidos</p>
                                        <p className="text-gray-500 text-sm">Asigna presupuesto:</p>
                                        <ul className="list-disc list-inside text-gray-500 text-sm ml-4">
                                          <li>General: para todos los ejercicios</li>
                                          <li>Un ejercicio en especifico</li>
                                      </ul>                                    
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/cont2.svg"
                                        alt="Herramientas"
                                        className="h-30 sm:h-45 lg:h-36 object-contain"
                                    />
                                </div>
                            </div>
                          </div>  

                        {/* CARD 4 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#6285f0]">
                                        Herramientas
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Traspasar asientos entre cuentas</p>
                                        <p className="text-gray-500 text-sm">Recalcular saldos</p>
                                        <p className="text-gray-500 text-sm">Consolididar empresas</p>
                                        <p className="text-gray-500 text-sm">Inicializar la contabilidad</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/banc2.svg"
                                        alt="Herramientas"
                                        className="h-30 sm:h-45 lg:h-36 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CARD 5 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#b062f0]">
                                        Activos fijos
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Cálculo de depreciación de los activos</p>
                                        <ul className="list-disc list-inside text-gray-500 text-sm ml-4">
                                          <li>Depreciación contable</li>
                                          <li>Depreciación fiscal</li>
                                        </ul> 
                                        <p className="text-gray-500 text-sm">Historial:</p>
                                        <ul className="list-disc list-inside text-gray-500 text-sm ml-4">
                                          <li>Genera la póliza de depreciación</li>
                                          <li>Agrega a tus activos fijos documentos de respaldo</li>
                                        </ul> 
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/cont3.svg"
                                        alt="Herramientas"
                                        className="h-30 sm:h-45 lg:h-36 object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-zinc-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl sm:text-3xl text-gray-500 font-bold mb-6">Integraciones</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        {/* Card Nómina */}
                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-pink-300 rounded-2xl bg-pink-50 p-2 flex-shrink-0">
                                    <img
                                        src="/Modulos/banc6.svg"
                                        alt="Nómina"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 text-gray-700">NÓMINA</h4>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                        Los pagos de nómina realizados con cheque generan el retiro correspondiente en el módulo de Bancos
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        En la carpeta de pagos por liberar del módulo Bancos, se consultan los pagos de Nómina
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card Cuentas por Cobrar */}
                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-red-400 rounded-2xl bg-red-50 p-2 flex-shrink-0">
                                    <img
                                        src="/Modulos/banc7.svg"
                                        alt="Cuentas por cobrar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 text-gray-700">CUENTAS POR COBRAR</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Los cobros o depósitos en este módulo, generan a su vez, depósitos en el módulo de Bancos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card Cuentas por Pagar */}
                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-green-400 rounded-2xl bg-green-50 p-2 flex-shrink-0">
                                    <img
                                        src="/Modulos/banc8.svg"
                                        alt="Cuentas por pagar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 text-gray-700">CUENTAS POR PAGAR</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Se generan los retiros correspondientes realizados por medio del módulo Cuentas por Pagar.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card Contabilidad */}
                        <div className="bg-white p-4 sm:p-6 border border-gray-300 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-blue-300 rounded-2xl bg-cyan-100 p-2 flex-shrink-0">
                                    <img
                                        src="/Modulos/banc9.svg"
                                        alt="Contabilidad"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 text-gray-700">CONTABILIDAD</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Al crear depósitos y retiros en Bancos, se crean las pólizas contables.
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

export default Contabilidad;