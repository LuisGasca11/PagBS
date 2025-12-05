import React, { useState, useEffect } from "react";
import MicrosipFooter from "../MicrosipFooter";
import NavBar from "../NavbarMicro";

const AdminSuc: React.FC = () => {
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

            <section className="bg-blue-50 text-[#2653e0] w-full py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Administrador de sucursales</h1>
                            <p className="text-base sm:text-lg text-gray-600">
                                Sincroniza tus pedidos y existencias con Shopify o MercadoLibre
                            </p>

                            <div className="mt-8">
                                <a href="/FormMicro" className="inline-block bg-orange-500 text-white font-semibold px-8 py-2 rounded-full shadow hover:bg-orange-600 transition text-center">
                                    ADQUIERE MICROSIP
                                </a>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src="/icons/admin_suc.png"
                                alt="Bancos"
                                className="h-16 sm:h-20 lg:h-24 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-white px-4 sm:px-6 lg:px-10 py-10 text-gray-700">
                
                <section className="max-w-6xl mx-auto px-4 py-10">
                    <div className="bg-zinc-100 p-6 sm:p-10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">

                        {/* Texto */}
                        <div className="flex-1">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-3">
                                Funcionalidades principales
                            </h2>

                            <p className="text-gray-600 text-sm sm:text-base max-w-xl">
                                Concentra las operaciones de las sucursales con la matriz. 
                                Potencializa los módulos Microsip para una gestión más efectiva 
                                y eficaz entre la matriz y las sucursales.
                            </p>
                        </div>

                        {/* Ícono */}
                        <div className="flex-shrink-0">
                            <img
                                src="/Modulos/admin5.svg"
                                alt="Funcionalidades"
                                className="h-24 sm:h-32 object-contain"
                            />
                        </div>
                    </div>
                </section>


                <section className="max-w-6xl mx-auto px-4 py-10">

                    <div className="grid grid-cols-1 gap-10">

                        <div className="bg-[#1f4fe9] text-white p-8 rounded-2xl shadow-lg">
                            <div className="flex items-start gap-4 mb-3">
                                <img src="/Modulos/admin1.svg" alt="Agrupa" className="h-10" />
                                <h3 className="text-2xl font-semibold">Agrupa</h3>
                            </div>

                            <p className="text-sm">Crea jerarquías entre sucursales</p>
                        </div>

                        <div className="bg-[#1f4fe9] text-white p-8 rounded-2xl shadow-lg">
                            <div className="flex items-start gap-4 mb-3">
                                <img src="/Modulos/admin2.svg" alt="Traspasa" className="h-10" />
                                <h3 className="text-2xl font-semibold">Traspasa</h3>
                            </div>

                            <p className="font-medium mb-2">Por sucursal</p>

                            <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                                <li>Existencias</li>
                                <li>Precios</li>
                                <li>Dirección y teléfono</li>
                            </ul>
                        </div>

                        <div className="bg-[#1f4fe9] text-white p-8 rounded-2xl shadow-lg">
                            <div className="flex items-start gap-4 mb-3">
                                <img src="/Modulos/admin3.svg" alt="Consulta" className="h-10" />
                                <h3 className="text-2xl font-semibold">Consulta</h3>
                            </div>

                            <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                                <li>Realiza traspasos entre sucursales</li>
                                <li>Salida y entrada de mercancía</li>
                                <li>Captura cobros desde cualquier sucursal</li>
                            </ul>
                        </div>

                        <div className="bg-[#1f4fe9] text-white p-8 rounded-2xl shadow-lg">
                            <div className="flex items-start gap-4 mb-3">
                                <img src="/Modulos/admin4.svg" alt="Asigna" className="h-10" />
                                <h3 className="text-2xl font-semibold">Asigna</h3>
                            </div>

                            <p className="font-medium mb-2">Por sucursal:</p>

                            <ul className="list-disc list-inside ml-7 text-sm space-y-1">
                                <li>Permisos y restricciones por usuario</li>
                                <li>Vendedores</li>
                                <li>Cobradores</li>
                                <li>Cajas</li>
                                <li>Formas de cobro</li>
                                <li>Listas de precios</li>
                                <li>Políticas de descuentos</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="bg-zinc-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl sm:text-3xl text-gray-500 font-bold mb-6">Integraciones</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-red-600 rounded-2xl bg-red-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/cuentas_pagar.png"
                                        alt="Cuentas por cobrar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">CUENTAS POR PAGAR</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        • Controla la información de los pagos en cada sucursal
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        • Visualiza reportes por sucursal
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-green-500 rounded-2xl bg-green-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/cuentas_cobrar.png"
                                        alt="Cuentas por cobrar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">CUENTAS POR COBRAR</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        • Se reflejan los pagos de los clientes que reciben los vendedores en ruta
                                    </p>
                                </div>
                            </div>
                        </div>

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
                                        • Concentra la información, los movimientos y las existencias de tus sucursales
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                        • Visualiza reportes por sucursal
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                        • Realiza traspasos entre sucursales
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
                                        • Genera los pedidos de los clientes realizados durante la visita del vendedor
                                    </p>
                                </div>
                            </div>
                        </div> 

                        <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="border border-yellow-400 rounded-2xl bg-yellow-50 p-2 flex-shrink-0">
                                    <img
                                        src="/icons/ventas.png"
                                        alt="Cuentas por pagar"
                                        className="h-8 sm:h-10 object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">COMPRAS</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        • Gestiona la información de las compras realizadas para cada sucursal
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        • Visualiza reportes por sucursal
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
                                    <h4 className="text-xs sm:text-sm lg:text-sm mb-2 text-gray-700 tracking-widest">PUNTO DE VENTA</h4>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        • Gestiona reportes
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        • Consulta existencias entre sucursales
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

export default AdminSuc;