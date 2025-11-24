import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VendedorPanel = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticación
    const auth = localStorage.getItem('vendedorAuth');
    if (!auth) {
      navigate('/auth');
      return;
    }
    
    const authData = JSON.parse(auth);
    if (!authData.isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    setUser(authData.user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('vendedorAuth');
    navigate('/auth');
  };

  const plantillaData = {
    titulo: "Kit de Ventas Black Sheep - Microsip ERP",
    contenido: `
      # KIT DE VENTAS - BLACK SHEEP MICROSIP ERP
      
      ## Información para Vendedores Autorizados
      
      Vendedor: ${user?.nombre || 'Usuario'}
      Email: ${user?.email || 'No especificado'}
      
      ## Características Principales:
      • Automatización completa de procesos
      • Control de inventarios en tiempo real
      • Facturación electrónica integrada
      • Reportes financieros automatizados
      • Módulo de punto de venta (POS)
      • Gestión de compras y proveedores
      
      ## Beneficios Comprobados:
      ✓ Reducción de 40% en tiempo de procesos
      ✓ Disminución de 60% en errores de inventario
      ✓ Incremento de 25% en productividad
      ✓ Mejora en la toma de decisiones
      
      ## Información de Contacto:
      Black Sheep Solutions
      Tel: +52 55 1234 5678
      Email: ventas@blacksheep.com
      Web: www.blacksheep.com
      
      ## Comisiones y Beneficios:
      • Comisión base: 15% sobre ventas
      • Bono por volumen: +5% sobre $100,000 MXN
      • Soporte técnico incluido
      • Material de marketing proporcionado
    `,
    archivo: `kit-ventas-${user?.nombre?.replace(/\s+/g, '-') || 'vendedor'}.pdf`
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Descarga automática
      const element = document.createElement('a');
      const file = new Blob([plantillaData.contenido], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = plantillaData.archivo;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([plantillaData.contenido], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = plantillaData.archivo;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-16 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">¡Plantilla Enviada!</h2>
          <p className="text-gray-300 mb-6">
            Hemos enviado el Kit de Ventas a <strong className="text-yellow-400">{email}</strong>
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Descargar Plantilla Nuevamente
            </button>
            
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 hover:bg-gray-600"
            >
              Volver al Panel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header del Panel */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Panel de Vendedores
              </h1>
              <p className="text-gray-800 font-medium">
                Bienvenido, {user.nombre}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de Envío */}
          <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Solicitar Kit de Ventas
            </h2>
            <p className="text-gray-300 mb-6">
              Envía el kit completo de Microsip ERP a tu correo o descárgalo directamente.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Correo Electrónico para Envío
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cliente@empresa.com"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Enviar y Descargar Kit de Ventas'
                )}
              </button>
            </form>
          </div>

          {/* Información del Vendedor */}
          <div className="bg-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Tu Información</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">Nombre</p>
                <p className="text-white font-medium">{user.nombre}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Estado</p>
                <p className="text-green-400 font-medium">Activo</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-3">Descarga Directa</h4>
              <button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Descargar Kit de Ventas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendedorPanel;