import React, { useState, useEffect } from "react";
import MicrosipFooter from "../MicrosipFooter";
import NavBar from "../NavbarMicro";

const Compras: React.FC = () => {
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

            <section className="bg-orange-50 text-amber-300 w-full py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Compras</h1>
                            <p className="text-base sm:text-lg text-gray-600">
                                Optimiza tu presupuesto y haz rentable tu negocio organizando tu proceso de compras
                            </p>

                            <div className="mt-8">
                                <a href="/FormMicro" className="inline-block bg-orange-500 text-white font-semibold px-8 py-2 rounded-full shadow hover:bg-orange-600 transition text-center">
                                    ADQUIERE MICROSIP
                                </a>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src="/icons/compras.png"
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
                                            Valida acorde al SAT los comprobantes fiscales digitales emitidos por los proveedores
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Almacena los comprobantes fiscales digitales emitidos por los proveedores
                                        </p>
                                        <p className="text-gray-500 text-sm font-medium">
                                            Impuestos precargados:
                                        </p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>IVA general 16%</li>
                                            <li>IVA Tasa 0%</li>
                                            <li>IEPS 8%</li>
                                            <li>IVA retenido</li>
                                        </ul>
                                        <p className="text-gray-500 text-sm">
                                            Personalización de impuestos
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Registra los pedimentos de importación
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Registra el régimen fiscal del proveedor
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Indica el tipo de actividad del proveedor para generar la DIOT
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
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-pink-500">
                                        Cumplimiento fiscal
                                    </h3>
                                    <div className="space-y-3">
                                        <p className="text-gray-500 text-sm">
                                            Generales:
                                        </p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Nombre</li>
                                            <li>Correo electronico</li>
                                            <li>RFC</li>
                                            <li>Moneda del proveedor</li>
                                            <li>Contacto</li>
                                            <li>Estado</li>
                                            <li>Ciudad</li>
                                            <li>Límite de credito</li>
                                            <li>Visualización de datos fiscales de los proveedores</li>                                            
                                        </ul>
                                        <p className="text-gray-500 text-sm">
                                            Información específica:
                                        </p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Clave del proveedor</li>
                                            <li>Concepto bancario</li>
                                            <li>Condiciones de pago</li>
                                            <li>Límite de crédito</li>
                                            <li>Plazos para pago</li>
                                            <li>Descuento por pronto pago</li>                                                                          
                                        </ul>
                                        <p className="text-gray-500 text-sm">
                                            Clasiicación;
                                        </p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Zona</li>
                                            <li>Tipo de proveedor</li>                                                                       
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/comp1.svg"
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
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#0c3bc7]">
                                        Precios
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Programar pagos de proveedores:</p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Al registrar las compras</li>
                                            <li>En base a la lista de precios del proveedor</li>                                                                       
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/comp2.svg"
                                        alt="Herramientas"
                                        className="h-24 sm:h-32 lg:h-40 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CARD 4 */}
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

                        {/* CARD 5 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#ffb816]">
                                        Reportes predefinidos
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Compras por artículo</p>
                                        <p className="text-gray-500 text-sm">Compras por proveedor</p>
                                        <p className="text-gray-500 text-sm">Mayores compras</p>
                                        <p className="text-gray-500 text-sm">Diarios de compras</p>
                                        <p className="text-gray-500 text-sm">Impuestos</p>                                        
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

                        {/* CARD 6 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#6285f0]">
                                        Herramientas
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Calcula los niveles de inventario</p>
                                        <p className="text-gray-500 text-sm">Plan de compras</p>
                                        <p className="text-gray-500 text-sm">Importa y exporta documentos</p>
                                        <p className="text-gray-500 text-sm">Reemplaza impuestos a los artículos</p>
                                        <p className="text-gray-500 text-sm">Exporta comprobantes fiscales en XML</p>
                                        <p className="text-gray-500 text-sm">Corrige datos de pedimentos</p>
                                        <p className="text-gray-500 text-sm">Eliminar historia</p>
                                        <p className="text-gray-500 text-sm">Inicializar las compras</p>
                                        <p className="text-gray-500 text-sm">Crea pólizas contables</p>
                                        <p className="text-gray-500 text-sm">Cambiar precios de compra del proveedor</p>
                                        <p className="text-gray-500 text-sm">Elabora planes consolidados de almacenes</p>
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
                    </div>
                </section>

                <section className="bg-zinc-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl sm:text-3xl text-gray-500 font-bold mb-6">Integraciones</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        
                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-purple-400 rounded-2xl bg-purple-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/inventarios.png"
                                        alt="Cuentas por cobrar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">INVENTARIOS</h4>
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
                                <div className="border border-red-500 rounded-2xl bg-red-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/cuentas_pagar.png"
                                        alt="Cuentas por pagar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">CUENTAS POR PAGAR</h4>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
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
                    </div>
                </section>
            </div>
            <MicrosipFooter />
        </>
    );
};

export default Compras;