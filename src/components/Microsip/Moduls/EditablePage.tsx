import React, { useState, useEffect } from "react";
import NavBar from "../NavbarMicro";
import LoginModal from "../LoginModal";
import EditCardsModal from "./EditCardsModal";
import MicrosipFooter from "../MicrosipFooter";

const EditablePage: React.FC = () => {
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

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleLoginSuccess = (user) => {
        setUsername(user.username);
        setIsAuthenticated(true);
        setIsLoginModalOpen(false);
    };

    const handleEditCardsClick = () => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true);
        } else {
            setIsEditCardsModalOpen(true);
        }
    };

    const handleCloseEditCardsModal = () => {
        setIsEditCardsModalOpen(false);
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
                    onLoginClick={handleLoginClick}
                    onLogoutClick={() => setIsAuthenticated(false)}
                    onOpenAdmin={() => { }}
                    onOpenVpsAdmin={() => { }}
                    onOpenHourlyAdmin={() => { }}
                />
            </div>

            {isLoginModalOpen && (
                <LoginModal onClose={handleCloseModal} onSuccess={handleLoginSuccess} />
            )}

            <EditCardsModal isOpen={isEditCardsModalOpen} onClose={handleCloseEditCardsModal} />

            <div className="bg-white p-10 text-gray-700 ">
                <section className="bg-emerald-50 p-16 text-emerald-400 rounded-lg mt-10">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-4">Bancos</h1>
                        <p className="text-lg mb-4 text-gray-600">
                            Lleva el control de las diferentes cuentas bancarias y el detalle de los movimientos.
                        </p>
                        </div>

                        <div>
                        <img
                            src="/icons/bancos.png"
                            alt="logo"
                            className="h-20 sm:h-20 object-contain"
                        />
                        </div>
                    </div>
                </section>


                {/* FUNCIONALIDADES */}
                <section className="mb-16 text-gray-700 content-center">
                    <h2 className="text-3xl font-bold text-gray-500 mt-16 mb-8 ml-96">Funcionalidades</h2>

                    <div className="grid grid-cols-1 gap-8 ml-96">
                        {/* CARD 1 */}
                        <div className="p-6 bg-zinc-100 rounded-lg w-9/12 shadow-md flex items-center">
                            <div className="flex-1">
                                <h1 className="text-3xl font-semibold mb-4 text-orange-500">Cumplimiento Fiscal</h1>
                                <p className="mb-2 text-gray-500 text-sm">Adjunta el CFDI correspondiente a retiros y depósitos</p>
                                <p className="mb-2 text-gray-500 text-sm">Válida contribuyentes incumplidos de los CFDI</p>
                                <p className="mb-2 text-gray-500 text-sm">Información de CFDI y PPD</p>
                                <p className="mb-2 text-gray-500 text-sm">Verifica el estado de los CFDI en el SAT</p>
                                <p className="mb-2 text-gray-500 text-sm">Válida ante el SAT el RFC de los terceros registrados</p>
                            </div>
                            <img
                                src="/Modulos/banc1.svg"
                                alt="logo"
                                className="h-30 sm:h-30 object-contain ml-4"
                            />
                        </div>

                        {/* CARD 2 */}
                        <div className="p-6 bg-zinc-100 rounded-lg w-9/12 shadow-md flex items-center">
                            <div className="flex-1">
                                <h1 className="text-3xl font-semibold mb-4 text-[#6285f0]">Herramientas</h1>
                                <p className="mb-2 text-gray-500 text-sm">Recalcular saldos</p>
                                <p className="mb-2 text-gray-500 text-sm">Eliminar historial de las cuentas bancarias</p>
                                <p className="mb-2 text-gray-500 text-sm">Inicializar las cuentas bancarias</p>
                                <p className="mb-2 text-gray-500 text-sm">Importar movimientos</p>
                                <p className="mb-2 text-gray-500 text-sm">Exportar movimientos</p>
                                <p className="mb-2 text-gray-500 text-sm">Acceso a la carpeta de comprobantes fiscales emitidos y recibidos</p>
                                <p className="mb-2 text-gray-500 text-sm">Dispersión de pagos a proveedores</p>
                            </div>
                            <img
                                src="/Modulos/banc2.svg"
                                alt="logo"
                                className="h-30 sm:h-30 object-contain ml-4"
                            />
                        </div>

                        {/* CARD 3 */}
                        <div className="p-6 bg-zinc-100 rounded-lg w-9/12 shadow-md flex items-center">
                            <div className="flex-1">
                                <h1 className="text-3xl font-semibold mb-4 text-[#ffb816]">Reportes Predefinidos</h1>
                                <p className="mb-2 text-gray-500 text-sm">Posición bancaria y depósitos</p>
                                <p className="mb-2 text-gray-500 text-sm">Auxiliares de bancos</p>
                                <p className="mb-2 text-gray-500 text-sm">Relaciones en bancos</p>
                                <p className="mb-2 text-gray-500 text-sm">Movimiento en tránsito</p>
                                <p className="mb-2 text-gray-500 text-sm">Retiros por beneficiario</p>
                                <p className="mb-2 text-gray-500 text-sm">Diario de bancos</p>
                                <p className="mb-2 text-gray-500 text-sm">Saldos promedios de bancos</p>
                                <p className="mb-2 text-gray-500 text-sm">Comprobantes fiscales</p>
                            </div>
                            <img
                                src="/Modulos/banc3.svg"
                                alt="logo"
                                className="h-30 sm:h-30 object-contain ml-4"
                            />
                        </div>
                    </div>
                </section>


                {/* Complementos */}
                <section className="bg-zinc-100 p-8 rounded-lg shadow-md mb-16 w-7/12 ml-96">
                    <h3 className="text-3xl font-semibold text-gray-500 mb-6">Complementos</h3>
                    <div className="flex">
                        <div className="bg-white p-6 border-2 border-gray-200 rounded-lg">
                            <div className="border border-emerald-200 rounded-2xl bg-emerald-50 border-1 w-fit p-0.5">
                                <img
                                    src="/Modulos/banc5.svg"
                                    alt="logo"
                                    className="h-10 sm:h-10 object-contain m-2 rounded-lg"
                                />
                            </div>
                            <h4 className="text-[13px] text-gray-500 tracking-wider mb-4 mt-2">MOVIMIENTOS BANCARIOS</h4>
                            <p className="mb-2 text-[15px] text-gray-500">Realiza tus conciliaciones bancarias eliminando la captura de tus estados de cuenta</p>
                            <p className="mb-2 text-[15px] text-gray-500">Importa los estados de cuenta directamente desde tu portal bancario</p>
                            <a href="#" className="text-orange-500 text-sm font-semibold">Conoce más</a>
                        </div>
                        <img
                            src="/Modulos/banc4.svg"
                            alt="logo"
                            className="h-30 sm:h-30 object-contain  ml-20"
                        />
                    </div>
                </section>

                {/* Integraciones */}
                <section className="bg-zinc-100 p-8 rounded-lg w-full shadow-md">
                <h3 className="text-3xl text-gray-500 font-bold mb-6 w-full">Integraciones</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    
                    <div className="bg-white border border-gray-300 p-6 rounded-lg">
                        <div className="border border-pink-300 rounded-2xl bg-pink-50 border-1 w-fit p-0.5">
                            <img
                                src="/Modulos/banc6.svg"
                                alt="logo"
                                className="h-10 sm:h-10 object-contain m-2 rounded-lg"
                            />
                        </div>
                    <h4 className="text-lg ">NÓMINA</h4>
                    <p className="text-sm mb-2">Los pagos de nómina realizados con cheque generan el retiro correspondiente en el módulo de Bancos</p>
                    <p className="text-sm">En la carpeta de pagos por liberar del módulo Bancos, se consultan los pagos de Nómina</p>
                    </div>

                    <div className="bg-white border border-gray-300 p-6 rounded-lg text-center">
                        <div className="border border-red-400 rounded-2xl bg-red-50 border-1 w-fit p-0.5">
                            <img
                                src="/Modulos/banc7.svg"
                                alt="logo"
                                className="h-10 sm:h-10 object-contain m-2 rounded-lg"
                            />
                        </div>
                    <h4 className="text-lg">CUENTAS POR COBRAR</h4>
                    <p className="text-sm">Los cobros o depósitos en este módulo, generan a su vez, depósitos en el módulo de Bancos.</p>
                    </div>

                    <div className="bg-white border border-gray-300 p-6 rounded-lg text-center">
                        <div className="border border-green-400 rounded-2xl bg-green-50 border-1 w-fit p-0.5">
                            <img
                                src="/Modulos/banc8.svg"
                                alt="logo"
                                className="h-10 sm:h-10 object-contain m-2 rounded-lg"
                            />
                        </div>
                    <h4 className="text-lg">CUENTAS POR PAGAR</h4>
                    <p className="text-sm">Se generan los retiros correspondientes realizados por medio del módulo Cuentas por Pagar.</p>
                    </div>

                    <div className="bg-white p-6 border border-gray-300 rounded-lg">
                        <div className="border border-blue-300 rounded-2xl bg-cyan-100 border-1 w-fit p-0.5">
                            <img
                                src="/Modulos/banc9.svg"
                                alt="logo"
                                className="h-10 sm:h-10 object-contain m-2 rounded-lg"
                            />
                        </div>
                    <h4 className="text-lg">CONTABILIDAD</h4>
                    <p className="text-sm">Al crear depósitos y retiros en Bancos, se crean las pólizas contables.</p>
                    </div>

                </div>
                </section>

            </div>

            <MicrosipFooter />
        </>
    );
};

export default EditablePage;
