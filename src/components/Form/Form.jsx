import { useEffect } from "react";
import { Link } from "react-router-dom";

const Form = () => {
    useEffect(() => {
        document.title = "FORM";
        
        return () => {
            document.title = "Black-Sheep"; 
        };
    }, []);

    return (
        <div id="form" className="section-padding pt-20 pb-8 to-gray-800">  
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <Link 
                    to="/"
                    className="
                        inline-flex items-center gap-3 
                        text-white hover:text-gray-100 
                        transition-all duration-500 
                        font-semibold
                        group
                        bg-black/20 hover:bg-black/30 
                        backdrop-blur-2xl
                        px-6 py-3 rounded-2xl
                        border border-white/10
                        shadow-2xl
                        relative overflow-hidden
                        hover:scale-105
                        before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100
                    "
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    
                    <div className="relative z-10 flex items-center gap-2">
                        <svg 
                            className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Regresar al Inicio
                    </div>
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium mb-2 text-gray-300">
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                                        placeholder="Tu nombre completo"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="correo" className="block text-sm font-medium mb-2 text-gray-300">
                                        Correo *
                                    </label>
                                    <input
                                        type="email"
                                        id="correo"
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                                        placeholder="tu@empresa.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="telefono" className="block text-sm font-medium mb-2 text-gray-300">
                                        Teléfono *
                                    </label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                                        placeholder="+52 55 1234 5678"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="empresa" className="block text-sm font-medium mb-2 text-gray-300">
                                        Empresa *
                                    </label>
                                    <input
                                        type="text"
                                        id="empresa"
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-300 text-white placeholder-gray-400 hover:border-gray-600"
                                        placeholder="Nombre de tu empresa"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="mensaje" className="block text-sm font-medium mb-2 text-gray-300">
                                    Mensaje *
                                </label>
                                <textarea
                                    id="mensaje"
                                    rows="4"
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-300 resize-none text-white placeholder-gray-400 hover:border-gray-600"
                                    placeholder="Cuéntanos sobre tus necesidades..."
                                    required
                                ></textarea>
                            </div>

                            <div className="flex justify-center pt-4">
                                <button 
                                    type="submit"
                                    className="
                                        bg-gradient-to-r from-white to-gray-300 
                                        hover:from-gray-200 hover:to-gray-400
                                        text-gray-900 
                                        px-12 py-4 rounded-xl 
                                        font-bold text-lg transition-all duration-300 
                                        transform hover:scale-105 
                                        shadow-2xl hover:shadow-white/25
                                        border-2 border-white
                                        hover:border-gray-300
                                        relative overflow-hidden
                                        group
                                        w-full max-w-md
                                        flex items-center justify-center
                                    "
                                >
                                    <span className="relative z-10 flex items-center">
                                        Mandar Mensaje
                                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                    
                                    <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    
                                    <div className="absolute inset-0 border-2 border-white rounded-xl animate-pulse group-hover:animate-none opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Company Info */}
                    <div className="lg:pl-12">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 h-full border border-gray-700 shadow-2xl">
                            <div className="mb-8">
                                <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl p-4">
                                    <img 
                                        src="BS Hori.png" 
                                        alt="Black Sheep Logo"
                                        className="w-full h-48 object-contain rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* Información de la empresa */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">black_sheep®</h3>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-6 mb-8">
                                <h4 className="font-semibold text-white text-lg border-l-4 border-white pl-3">Información de contacto</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition duration-300">
                                        <div className="bg-gradient-to-br from-white to-gray-300 rounded-full p-3 flex-shrink-0">
                                            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Celular</p>
                                            <p className="text-gray-300">55 7966 5665</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition duration-300">
                                        <div className="bg-gradient-to-br from-white to-gray-300 rounded-full p-3 flex-shrink-0">
                                            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Oficina</p>
                                            <p className="text-gray-300">55 2958 8504</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition duration-300">
                                        <div className="bg-gradient-to-br from-white to-gray-300 rounded-full p-3 flex-shrink-0">
                                            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Email</p>
                                            <p className="text-gray-300">contacto@blck-sheep.com</p>
                                        </div>
                                    </div>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form;