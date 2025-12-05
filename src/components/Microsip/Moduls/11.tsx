import React, { useState, useEffect } from "react";
import MicrosipFooter from "../MicrosipFooter";
import NavBar from "../NavbarMicro";

const PuntoVenta: React.FC = () => {
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
                    onLoginClick={() => { }}
                    onLogoutClick={() => { }}
                    onOpenAdmin={() => { }}
                    onOpenVpsAdmin={() => { }}
                    onOpenHourlyAdmin={() => { }}
                />
            </div>

            <section className="bg-orange-50 text-[#ffb816] w-full py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Punto de Venta</h1>
                            <p className="text-base sm:text-lg text-gray-600">
                                Lleva el control de un negocio con una sola caja, hasta un gran consorcio de sucursales multicajas
                            </p>

                            <div className="mt-8">
                                <a href="/FormMicro" className="inline-block bg-orange-500 text-white font-semibold px-8 py-2 rounded-full shadow hover:bg-orange-600 transition text-center">
                                    ADQUIERE MICROSIP
                                </a>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src="/icons/punto-venta.png"
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

                                        {/* Facturación */}
                                        <p>Facturación CFDI 4.0</p>

                                        <p>Complemento de recepción de pagos 2.0</p>

                                        <p className="font-medium text-gray-700">Impuestos precargados</p>
                                        <ul className="list-disc list-inside ml-7 space-y-1">
                                            <li>IVA</li>
                                            <li>IEPS</li>
                                        </ul>

                                        <p className="font-medium text-gray-700">Retenciones</p>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                            <li>ISR por RESICOs</li>
                                        </ul>

                                        <p>Registra cualquier otro tipo de impuesto</p>

                                        <p>Cumplimiento con el esquema de cancelación</p>

                                        <p>CFDI de traslado</p>

                                        <p className="font-medium text-gray-700">Retenciones</p>
                                        <ul className="list-disc list-inside ml-7 space-y-1">
                                            <li>IVA</li>
                                            <li>ISR</li>
                                            <li>ISR a RESICOs</li>
                                        </ul>

                                        <p className="font-medium text-gray-700">Genera factura global</p>
                                        <ul className="list-disc list-inside ml-7 space-y-1">
                                            <li>Detallada</li>
                                            <li>Concentrada</li>
                                            <li>Una partida</li>
                                        </ul>

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

                                    <div className="space-y-4 text-gray-600 text-sm">

                                        {/* Campos de registro */}
                                        <p className="font-medium text-gray-700">Campos de registro:</p>

                                        {/* Generales */}
                                        <p className="font-medium text-gray-700">Generales</p>
                                        <ul className="list-disc list-inside ml-7 space-y-1">
                                            <li>Nombre</li>
                                            <li>Correo electrónico</li>
                                            <li>RFC</li>
                                            <li>Direcciones de envío</li>
                                            <li>Contacto</li>
                                            <li>Estado</li>
                                            <li>Ciudad</li>
                                            <li>Condiciones de pago</li>
                                            <li>Descuentos por pronto pago</li>
                                            <li>Visualización de los datos fiscales de los clientes</li>
                                        </ul>

                                        {/* Clasificación */}
                                        <p className="font-medium text-gray-700">Clasificación</p>
                                        <ul className="list-disc list-inside ml-7 space-y-1">
                                            <li>Por zona</li>
                                            <li>Por tipo</li>
                                        </ul>

                                        {/* Historial */}
                                        <p className="font-medium text-gray-700">Historial</p>
                                        <ul className="list-disc list-inside ml-7 space-y-1">
                                            <li>Saldos de los clientes</li>
                                            <li>Cargos de los clientes</li>
                                            <li>Anticipos</li>
                                            <li>Cobros por depositar</li>
                                        </ul>

                                    </div>
                                </div>

                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/vent1.svg"
                                        alt="Gestión de clientes"
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

                                        <ul className="list-disc list-inside ml-7 space-y-1">
                                            <li>Ventas de mostrador</li>
                                            <li>Devoluciones de venta</li>
                                            <li>Retiros de caja</li>
                                            <li>Ingresos de caja</li>
                                            <li>Órdenes de venta</li>
                                            <li>Cobros de cuentas por cobrar</li>
                                            <li>Nota de crédito para descuento posterior</li>
                                        </ul>

                                        {/* Envío por correo */}
                                        <p className="font-medium text-gray-700">
                                            Envío de documentos por correo electrónico
                                        </p>

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

                                    <div className="space-y-3 text-gray-600 text-sm">

                                        <p className="font-medium text-gray-700">Campos de registro:</p>

                                        <p className="font-medium text-gray-700">Generales</p>
                                        <ul className="list-disc list-inside ml-7 space-y-1">
                                            <li>Nombre</li>
                                            <li>Imágenes</li>
                                            <li>Clave</li>
                                            <li>Unidad de medida</li>
                                            <li>Pedimentos</li>
                                            <li>Estatus del artículo</li>
                                            <li>Impuestos gravables</li>
                                            <li>Precio de venta</li>
                                            <li>Puntos de reorden</li>
                                            <li>Líneas de artículos</li>
                                            <li>Grupo de líneas</li>
                                            <li>Clasificador de artículos</li>
                                            <li>Existencias</li>
                                            <li>Etiquetas clasificadoras para organizar artículos en categorías personalizadas</li>
                                        </ul>

                                    </div>
                                </div>

                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/comp3.svg"
                                        alt="Manejo de artículos"
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
                                        <p className="text-gray-500 text-sm">Listas de precios ilimitadas</p>
                                        <p className="text-gray-500 text-sm">Actualización de precio por:</p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Porcentaje</li>
                                            <li>Monto fijo</li>
                                            <li>Precio anterior</li>
                                            <li>Lista de precios</li>
                                            <li>Costo de última compra</li>
                                            <li>Margen de utilidad</li>
                                        </ul>
                                        <p className="text-gray-500 text-sm">Diferenciación de los conceptos margen y markup en la determinación de precios de venta</p>
                                        <ul className="text-gray-500 text-sm space-y-1 list-disc list-inside ml-7">
                                            <li>Actualización de lista de precios automáticamente en base a otra</li>
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
                                        <p>Margen de utilidad</p>
                                        <p>Mayores ventas</p>
                                        <p>Mejores artículos</p>
                                        <p>Artículos inactivos</p>

                                        <p>Lista de precios</p>

                                        <p className="font-medium text-gray-700">Diarios de Venta:</p>
                                        <ul className="list-disc list-inside space-y-1 ml-7">
                                            <li>Incluye descuentos sobre ventas</li>
                                        </ul>

                                        <p>Reporte de cobros</p>
                                        <p>Envíos de mercancía</p>
                                        <p>Impuestos</p>

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

                        {/* CARD 8 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4">

                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-[#121b46]">
                                        Conexión de dispositivos
                                    </h3>

                                    <div className="space-y-2 text-gray-600 text-sm">
                                        <p>Básculas</p>
                                        <p>Cajones</p>
                                        <p>Lectores de código de barras</p>
                                        <p>Torreta</p>
                                        <p>Impresoras de tickets</p>

                                        <p className="font-medium text-gray-700">Terminal bancaria</p>
                                        <ul className="list-disc list-inside ml-7 space-y-1">
                                            <li>Banorte</li>
                                            <li>Banregio</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex-shrink-0 self-center">
                                    <img
                                        src="/Modulos/pv1.svg"
                                        alt="Conexión de dispositivos"
                                        className="h-24 sm:h-32 lg:h-40 object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CARD 9 */}
                        <div className="p-4 sm:p-6 bg-zinc-100 rounded-lg shadow-md">
                            <div className="flex flex-col sm:flex-row items-start gap-4"></div>
                                <div className="flex-1 w-full">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-orange-500">
                                        Personalización de caja de cobro
                                    </h3>

                                    <div className="space-y-4 text-gray-600 text-sm">

                                        <p>Registrar y asignar las cajas de tu negocio</p>

                                        <p>Definir un grupo de imágenes promocionales para cada caja</p>

                                        <p>Insertar el logo de tu empresa</p>

                                        <p>Personalizar de acuerdo a los colores de tu empresa</p>

                                        <p>Adaptar la resolución de la pantalla según tamaño de monitor</p>

                                        <p>Manejar vendedores por cada caja</p>

                                        <p className="font-medium text-gray-700">Registrar forma de cobro aceptada:</p>
                                        <ul className="list-disc list-inside ml-7 space-y-1">
                                            <li>Efectivo</li>
                                            <li>Tarjeta</li>
                                            <li>Cheque</li>
                                            <li>Crédito</li>
                                        </ul>

                                        <p className="font-medium text-gray-700">
                                            Compatible con dispositivos touchscreen con una resolución de pantalla de:
                                        </p>

                                        <ul className="list-disc list-inside ml-7 space-y-1">
                                            <li>1360 x 768 px</li>
                                            <li>1280 x 1024 px</li>
                                            <li>1360 x 768 px</li>
                                            <li>1400 x 900 px</li>
                                            <li>1920 x 1080 px</li>
                                        </ul>

                                        <p className="font-medium text-gray-700">Notificaciones de Punto de venta:</p>
                                        <ul className="list-disc list-inside ml-7 space-y-1">
                                            <li>Modificación de cliente en el documento</li>
                                            <li>Modificación de descuento en el documento</li>
                                            <li>Modificación de precio en la partida</li>
                                            <li>Entre otros</li>
                                        </ul>

                                        <p className="italic text-gray-500">
                                            *Nota: estas notificaciones también se pueden almacenar / consultar en la Bitácora de notificaciones de Punto de venta*
                                        </p>
                                </div>
                            </div>
                        </div>    
                    </div>
                </section>

                <section className="bg-zinc-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md mb-16 max-w-6xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-semibold text-gray-500 mb-6">
                        Complementos
                    </h3>

                    <div className="flex flex-col lg:flex-row gap-6 items-start">

                        <div className="bg-white p-4 sm:p-6 border-2 border-gray-200 rounded-lg flex-1 w-full">

                            <div className="border border-yellow-400 rounded-2xl bg-yellow-50 w-fit p-2 mb-4">
                                <img
                                    src="/icons/fact.svg"
                                    alt="Facturador en línea"
                                    className="h-8 sm:h-10 object-contain"
                                />
                            </div>

                            <h4 className="text-xs sm:text-[13px] text-gray-500 tracking-wider mb-3 sm:mb-4 font-semibold">
                                FACTURADOR EN LÍNEA
                            </h4>

                            <p className="text-sm sm:text-[15px] text-gray-500 mb-2">
                                <span className="font-medium text-gray-600">Portal de configuración</span>
                            </p>
                            <ul className="list-disc list-inside ml-4 mb-4 text-sm text-gray-500 space-y-1">
                                <li>Logotipo, URL, Colores, Mensaje de bienvenida, Preguntas frecuentes, Margen de utilidad</li>
                            </ul>
                            <p className="text-sm sm:text-[15px] text-gray-500 mb-2">
                                <span className="font-medium text-gray-600">Fácil acceso a tus clientes</span>
                            </p>
                            <ul className="list-disc list-inside ml-4 mb-4 text-sm text-gray-500 space-y-1">
                                <li>Código QR, dirección web (URL), responsivo para cualquier dispositivo, integrado con el módulo de Punto de Venta</li>
                            </ul>
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
                                        • Analiza el inventario tomando en cuenta las salidas por ventas de mostrador y las entradas por devoluciones
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                        • Permite consultar las existencias de los artículos
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
                                        • Genera las pólizas de los movimientos realizados
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
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">CUENTAS POR COBRAR</h4>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                        • Registra los cargos y créditos a los clientes frecuentes
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                        • Configura alertas para clientes con saldo pendiente
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

export default PuntoVenta;