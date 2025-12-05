import React, { useState, useEffect } from "react";
import MicrosipFooter from "../MicrosipFooter";
import NavBar from "../NavbarMicro";

const Inventarios: React.FC = () => {
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

            <section className="bg-purple-50 text-purple-500 w-full py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Inventarios</h1>
                            <p className="text-base sm:text-lg text-gray-600">
                                Controla existencias y optimiza el flujo de mercancía de tus almacenes
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src="/icons/inventarios.png"
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
                                            Registra pedimentos de importación
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Emite el CFDI de traslado de mercancía propia
                                        </p>
                                        <p className="text-gray-500 text-sm font-medium">
                                            Cancela los CFDI directamente en el SAT y archivo de confirmaciones
                                        </p>                                        
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/banc1.svg"
                                        alt="Cumplimiento Fiscal"
                                        className="h-24 sm:h-32 lg:h-40 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-sky-500">
                                        Manejo de artículos
                                    </h3>
                                    <div className="space-y-3">
                                        <p className="text-gray-500 text-sm">
                                            Información de registro:
                                        </p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Nombre</li>
                                            <li>Imagen</li>
                                            <li>Clave</li>
                                            <li>Unidad de medida de ecompra</li>
                                            <li>Unidad de medida de venta</li>
                                            <li>Líneas</li>
                                            <li>Grupo de líneas</li>
                                            <li>Proveedor</li>
                                            <li>Clasificador</li>                                            
                                            <li>Existencias</li>                                            
                                            <li>Números de serie</li>                                            
                                        </ul>
                                        <p className="text-gray-500 text-sm">
                                            Control e historial
                                        </p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Existencias</li>
                                            <li>Precio</li>
                                            <li>Rotación</li>
                                            <li>Kárdex</li>                                                                      
                                            <li>Lotex</li>                                                                      
                                            <li>Filtro de almacenes</li>                                                                      
                                            <li>Importación de artículos desde archivos externos</li>                                                                      
                                        </ul>                              
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/comp3.svg"
                                        alt="Cumplimiento Fiscal"
                                        className="h-24 sm:h-32 lg:h-40 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#ffb816]">
                                        Reportes predefinidos
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Existencia y valor de inventario</p>
                                        <p className="text-gray-500 text-sm">Situación del inventario</p>
                                        <p className="text-gray-500 text-sm">Rotación del inventario</p>
                                        <p className="text-gray-500 text-sm">Kárdex de los artículos</p>
                                        <p className="text-gray-500 text-sm">Relaciones del inventario</p>                                        
                                        <p className="text-gray-500 text-sm">Diarios del inventario</p>                                        
                                        <p className="text-gray-500 text-sm">Resultado del inventario físico</p>                                        
                                        <p className="text-gray-500 text-sm">Capas de costo</p>                                        
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

                <section className="bg-zinc-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md mb-16 max-w-6xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-semibold text-gray-500 mb-6">Complementos</h3>
                    
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                        {/* Card de contenido */}
                        <div className="bg-white p-4 sm:p-6 border-2 border-gray-200 rounded-lg flex-1">
                            <div className="border border-blue-600 rounded-2xl bg-blue-50 w-fit p-2 mb-4">
                                <img
                                    src="/icons/sics.png"
                                    alt="Movimientos bancarios"
                                    className="h-8 sm:h-10 object-contain"
                                />
                            </div>
                            <h4 className="text-xs sm:text-[13px] text-gray-500 tracking-wider mb-3 sm:mb-4 font-semibold">
                                SICS
                            </h4>
                            <p className="mb-2 sm:mb-3 text-sm sm:text-[15px] text-gray-500">
                                Homologa los datos de los catálogos de cada sucursal por medio de una sincronización
                            </p>
                            <p className="mb-3 sm:mb-4 text-sm sm:text-[15px] text-gray-500">
                                Información de tus sucursales actualiza y unificada
                            </p>
                            <a href="#" className="text-orange-500 text-sm font-semibold hover:underline">
                                Conoce más
                            </a>
                        </div>
                        
                        <div className="flex-shrink-0 self-center mx-auto lg:mx-0">
                            <img
                                src="/Modulos/banc4.svg"
                                alt="Ilustración complementos"
                                className="h-32 sm:h-40 lg:h-48 object-contain"
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-zinc-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl sm:text-3xl text-gray-500 font-bold mb-6">Integraciones</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        
                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-orange-400 rounded-2xl bg-orange-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/ventas.png"
                                        alt="Cuentas por cobrar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">VENTAS</h4>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                        Registra las entradas y salidas del inventarios
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                        Verifica las existencias
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Calcula los niveles de inventario basado en el método de Máximos y Mínimos
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-amber-400 rounded-2xl bg-amber-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/punto-venta.png"
                                        alt="Cuentas por pagar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">PUNTO DE VENTA</h4>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                        Genera los cargos a los proveedores por compras
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Genera los cargos a los proveedores por compras
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Genera los créditos por devoluciones
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
                                        Genera las pólizas correspondientes a las compras y a las devoluciones a proveedores
                                    </p>
                                </div>
                            </div>    
                        </div>

                        <div className="bg-white p-4 sm:p-6 border border-gray-300 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-yellow-400 rounded-2xl bg-yellow-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/compras.png"
                                        alt="Contabilidad"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">COMPRAS</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Genera las pólizas correspondientes a las compras y a las devoluciones a proveedores
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

export default Inventarios;