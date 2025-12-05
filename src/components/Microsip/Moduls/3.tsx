import React, { useState, useEffect } from "react";
import MicrosipFooter from "../MicrosipFooter";
import NavBar from "../NavbarMicro";

const Nomina: React.FC = () => {
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


            <section className="bg-pink-50 text-pink-400 w-full py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Nómina</h1>
                            <p className="text-base sm:text-lg text-gray-600">
                                Genera los pagos de nómina de tus empleados cumpliendo con las normas fiscales requeridas
                            </p>

                            <div className="mt-8">
                                <a href="/FormMicro" className="inline-block bg-orange-500 text-white font-semibold px-8 py-2 rounded-full shadow hover:bg-orange-600 transition text-center">
                                    ADQUIERE MICROSIP
                                </a>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src="/icons/nomina.png"
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
                                        Cumplimiento Fiscal
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Genera los CFDIs de los pagos hechos a los empleados</p>
                                        <p className="text-gray-500 text-sm">Genera los CFDIs de viáticos</p>
                                        <p className="text-gray-500 text-sm">Seguro social:</p>
                                        <ul className="list-disc list-inside text-gray-500 text-sm ml-4">
                                            <li>Calcula las cuotas obrero patronales para realizar los pagos correspondientes</li>
                                        </ul>
                                        <p className="text-gray-500 text-sm">Infonavit:</p>
                                        <ul className="list-disc list-inside text-gray-500 text-sm ml-4">
                                            <li>Porcentajes</li>
                                            <li>Salario base de cotización</li>
                                            <li>Promedio de vida activa</li>
                                            <li>Factor de prima</li>
                                        </ul>
                                        <p className="text-gray-500 text-sm">Cumplimiento de acuerda a la Ley Federal del Trabajo</p>
                                        <p className="text-gray-500 text-sm">Retención de ISR</p>
                                        <p className="text-gray-500 text-sm">Validar RFC de los empleados en las listas del SAT</p>
                                        <p className="text-gray-500 text-sm">Pago de prima vacacional por aniversario del empleado</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/banc1.svg"
                                        alt="Cumplimiento Fiscal"
                                        className="h-24 sm:h-40 lg:h-36 object-contain"
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
                                        <p className="text-gray-500 text-sm">Actualizar porcentajes de integración</p>
                                        <p className="text-gray-500 text-sm">Cambiar sueldos y salarios integrados</p>
                                        <p className="text-gray-500 text-sm">Simular pagos de nómina</p>
                                        <p className="text-gray-500 text-sm">Exportar información al SUA</p>
                                        <p className="text-gray-500 text-sm">Exportar información al IDSE</p>
                                        <p className="text-gray-500 text-sm">Exportar información para el DIM</p>
                                        <p className="text-gray-500 text-sm">Exportar CFDIs en XML</p>
                                        <p className="text-gray-500 text-sm">Eliminar la historia de ejercicios anteriores</p>
                                        <p className="text-gray-500 text-sm">Inicializar las nóminas</p>
                                        <p className="text-gray-500 text-sm">Importación y exportación de los pagos de nómina</p>
                                        <p className="text-gray-500 text-sm">Importación de registros de asistencia</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/banc2.svg"
                                        alt="Herramientas"
                                        className="h-24 sm:h-40 lg:h-36 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#ffb816]">
                                        Reportes Predefinidos
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Listado de pre-nómina</p>
                                        <p className="text-gray-500 text-sm">Listado de nómina</p>
                                        <p className="text-gray-500 text-sm">Impuestos de la nómina</p>
                                        <p className="text-gray-500 text-sm">Subsidio para el empleo</p>
                                        <p className="text-gray-500 text-sm">Salarios y aportaciones afectos al IETU</p>
                                        <p className="text-gray-500 text-sm">Auxiliares de los empleados</p>
                                        <p className="text-gray-500 text-sm">Relaciones de nómina</p>
                                        <p className="text-gray-500 text-sm">CFDI cancelados de viáticos</p>
                                        <p className="text-gray-500 text-sm">Contratos LFT de los empleados</p>
                                        <p className="text-gray-500 text-sm">Impuesto anual de los empleados</p>
                                        <p className="text-gray-500 text-sm">Declaración anual de riesgo de trabajo</p>
                                        <p className="text-gray-500 text-sm">Desglose del cálculo del IMSS</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/banc3.svg"
                                        alt="Reportes"
                                        className="h-24 sm:h-40 lg:h-36 object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>   

                <section className="bg-zinc-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl sm:text-3xl text-gray-500 font-bold mb-6">Integraciones</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        {/* Card Cuentas por Pagar */}
                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-emerald-300 rounded-2xl bg-emerald-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/bancos.png"
                                        alt="Cuentas por pagar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">BANCOS</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Los pagos realizados con cheque se reflejan automáticamente en este módulo
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card Contabilidad */}
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
                                        Se generan las pólizas contables de los movimientos de nómina
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

export default Nomina;