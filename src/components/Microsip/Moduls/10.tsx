import React, { useState, useEffect } from "react";
import MicrosipFooter from "../MicrosipFooter";
import NavBar from "../NavbarMicro";

const Ventas: React.FC = () => {
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

            <section className="bg-orange-50 text-orange-500 w-full py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Ventas</h1>
                            <p className="text-base sm:text-lg text-gray-600">
                                Registra y controla el ciclo de ventas, desde la cotización hasta la entrega del producto
                            </p>
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

                                    <div className="space-y-4 text-gray-600 text-sm">

                                        <p className="font-medium text-gray-700">Facturación CFDI 4.0</p>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                            <li>CFDI de ingreso de las facturas</li>
                                            <li>CFDI de egreso de las devoluciones de ventas</li>
                                        </ul>

                                        <p>Aplica anticipos CFDI en las facturas</p>

                                        <p className="font-medium text-gray-700">Cancela en el SAT del CFDI de una operación</p>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                            <li>Cancela con el motivo 01 sin cambiar configuraciones de la empresa</li>
                                        </ul>

                                        <p className="font-medium text-gray-700">Complementos fiscales de CFDI</p>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                            <li>Donatarias Instituciones educativas privadas</li>
                                            <li>Servicios parciales de construcción</li>
                                            <li>Notarías públicas</li>
                                            <li>Arrendamiento</li>
                                            <li>INE</li>
                                            <li>Comercio exterior</li>
                                            <li>Complemento carta porte</li>
                                        </ul>

                                        <p className="font-medium text-gray-700">Traslado o retención de impuestos por cliente</p>

                                        <p className="font-medium text-gray-700">Personalización de impuestos</p>

                                        <p className="font-medium text-gray-700">Impuestos precargados</p>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                            <li>IVA general 16%</li>
                                            <li>IVA exento tasa 0%</li>
                                            <li>IVA Tasa 0%</li>
                                            <li>IEPS 8%</li>
                                            <li>IEPS cuota por unidad</li>
                                        </ul>

                                        <p className="font-medium text-gray-700">Retenciones</p>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                            <li>IVA</li>
                                            <li>ISR</li>
                                            <li>ISR a RESICOs</li>
                                        </ul>

                                        <p>Valida en las listas del SAT el RFC de tus clientes</p>
                                        <p>Verifica en el SAT el estatus del proceso de cancelación de un CFDI</p>
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
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-pink-400">
                                        Gestión de clientes
                                    </h3>
                                    <div className="space-y-3">
                                        <p className="text-gray-500 text-sm">
                                            Campos de registro:
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Generales
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
                                            Clasificación:
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
                                            Historial
                                        </p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Zona</li>
                                            <li>Tipo de proveedor</li>                                                                       
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/vent1.svg"
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
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#45c026]">
                                        Movimientos
                                    </h3>

                                    <div className="space-y-4 text-gray-600 text-sm">

                                        {/* Tipos de documentos */}
                                        <p className="font-medium text-gray-700">Tipos de documentos</p>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                            <li>Cotizaciones</li>
                                            <li>Pedidos</li>
                                            <li>Facturas</li>
                                            <li>Remisiones</li>
                                            <li>Devoluciones de ventas</li>
                                            <li>Devoluciones de remisiones</li>
                                            <li>Traslados</li>
                                        </ul>

                                        {/* Envío de documentos */}
                                        <p className="font-medium text-gray-700">Envío de documentos por correo electrónico</p>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                            <li>Maneja anticipos para RESICOs</li>
                                            <li>Elabora facturas como notas de crédito de documentos relacionados</li>
                                        </ul>

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
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-sky-500">
                                        Manejo de artículos
                                    </h3>
                                    <div className="space-y-3">
                                        <p className="text-gray-500 text-sm">
                                            Campos de registro:
                                        </p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Generales</li>
                                            <li>Nombre</li>
                                            <li>Imágenes</li>
                                            <li>Clave</li>
                                            <li>Unidad de medida</li>
                                            <li>Proveedor</li>
                                            <li>Líneas de artículos</li>
                                            <li>Grupo de líneas</li>
                                            <li>Clasificador de artículos Existencias</li>                                                                                       
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
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#a163ff]">
                                        Gestión de vendedores
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Políticas de comisión por</p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Artículos vendidos</li>
                                            <li>Clientes</li>                                                                       
                                            <li>Monto de venta</li>                                                                       
                                        </ul>
                                        <p className="text-gray-500 text-sm">Generación de reportes por vendedor</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/vent2.svg"
                                        alt="Herramientas"
                                        className="h-24 sm:h-32 lg:h-40 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CARD 6 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#0c3bc7]">
                                        Precios
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Precios:</p>
                                        <p className="text-gray-500 text-sm">Listas de prcios ilimitadas</p>
                                        <p className="text-gray-500 text-sm">Actualización de precio por:</p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Porcentaje</li>
                                            <li>Monto fijo</li>                                                                       
                                            <li>Precio anterior</li>                                                                       
                                            <li>Lista de precios</li>                                                                       
                                            <li>Costo de última compra</li>                                                                       
                                            <li>Margen de utilidad</li>                                                                       
                                        </ul>
                                        <p className="text-gray-500 text-sm">Determinación de precios de venta por:</p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Margen: excedente sobre el costo para fijar el precio</li>
                                            <li>Markup: relación porcentual entre la utilidad y el precio</li>                                                                                                                                             
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

                        {/* CARD 7 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">

                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#ffb816]">
                                        Reportes predefinidos
                                    </h3>

                                    <div className="space-y-3 text-gray-600 text-sm">

                                        <p>Ventas por artículo</p>
                                        <p>Ventas por cliente</p>
                                        <p>Ventas por vendedor</p>
                                        <p>Margen de utilidad</p>
                                        <p>Mayores ventas</p>
                                        <p>Mejores artículos</p>
                                        <p>Artículos inactivos</p>

                                        <p>Pendientes de surtir por artículos</p>
                                        <p>Pendientes de surtir por cliente</p>

                                        <p>Lista de precios</p>

                                        <p className="font-medium text-gray-700">Diarios de Venta:</p>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                            <li>Incluye descuentos sobre ventas</li>
                                        </ul>

                                        <p>Reporte de cobros</p>
                                        <p>Envíos de mercancía</p>
                                        <p>Impuestos</p>
                                        <p>Simulación de cambios de precios</p>

                                        <p className="font-medium text-gray-700">Reporte de comprobantes:</p>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                            <li>Identificación fiscal de los descuentos sobre ventas</li>
                                        </ul>

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
                                <div className="border border-purple-400 rounded-2xl bg-purple-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/inventarios.png"
                                        alt="Cuentas por cobrar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700">INVENTARIOS</h4>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                        -Registra las entradas y salidas de forma automática de las ventas y devoluciones de ventas
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                        -Verifica las existencias
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        -Maneja las unidades comprometidas en los pedidos
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
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700">CONTABILIDAD</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        -Registra los cargos y créditos a los clientes
                                        -Genera las pólizas contables de las ventas y devoluciones
                                    </p>
                                </div>
                            </div>    
                        </div>

                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-green-500 rounded-2xl bg-green-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/cuentas_cobrar.png"
                                        alt="Cuentas por pagar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700">CUENTAS POR COBRAR</h4>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                        -Genera los cargos por ventas y los créditos por devoluciones
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

export default Ventas;