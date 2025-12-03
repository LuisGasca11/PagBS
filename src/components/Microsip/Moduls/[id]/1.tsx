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
          onOpenAdmin={() => {}}
          onOpenVpsAdmin={() => {}}
          onOpenHourlyAdmin={() => {}}
        />
      </div>

      {isLoginModalOpen && (
        <LoginModal onClose={handleCloseModal} onSuccess={handleLoginSuccess} />
      )}

      <EditCardsModal isOpen={isEditCardsModalOpen} onClose={handleCloseEditCardsModal} />

      <div className="bg-white p-10 text-gray-700"> 
        <section className="bg-emerald-50 p-16 text-emerald-400 rounded-lg mt-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Bancos</h1>
            <p className="text-xl mb-4">
              Lleva el control de las diferentes cuentas bancarias y el detalle de los movimientos.
            </p>

            {isAuthenticated && (
              <button
                onClick={handleEditCardsClick}
                className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-xl mt-6"
              >
                Editar Tarjetas
              </button>
            )}
          </div>
        </section>

        {/* FUNCIONALIDADES */}
        <section className="mb-16 text-gray-700 justify-center">
            <h2 className="text-3xl font-bold text-center mb-8">Funcionalidades</h2>
            
            <div className="grid grid-cols-1 gap-8">
                {/* CARD 1 */}
                <div className="p-6 bg-zinc-100 rounded-lg w-7/12 shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Cumplimiento Fiscal</h1>
                <ul className="list-disc pl-6">
                    <li>Adjuntar CFDI correspondiente a los retiros</li>
                    <li>Verificar los depósitos</li>
                </ul>
                </div>

                {/* CARD 2 */}
                <div className="p-6 bg-zinc-100 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Herramientas</h1>
                <ul className="list-disc pl-6">
                    <li>Recalcular saldos</li>
                    <li>Eliminar historial de cuentas</li>
                </ul>
                </div>

                {/* CARD 3 */}
                <div className="p-6 bg-zinc-100 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Reportes Predefinidos</h1>
                <ul className="list-disc pl-6">
                    <li>Posición bancaria</li>
                    <li>Reportes de depósitos</li>
                </ul>
                </div>
            </div>
            </section>

        {/* Complementos */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-16">
          <h3 className="text-2xl font-semibold text-center mb-6">Complementos</h3>
          <div className="flex justify-center">
            <div className="bg-green-100 p-6 rounded-lg text-center">
              <h4 className="text-xl font-bold mb-4">Movimientos Bancarios</h4>
              <p className="mb-4">Realiza tus conciliaciones bancarias eliminando la captura de tus estados de cuenta.</p>
              <a href="#" className="text-teal-500 font-semibold">Conoce más</a>
            </div>
          </div>
        </section>

        {/* Integraciones */}
        <section className="bg-gray-50 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-center mb-6">Integraciones</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-pink-100 p-6 rounded-lg text-center">
              <h4 className="text-lg font-bold">NÓMINA</h4>
              <p className="text-sm">Los pagos de nómina realizados con cheque generan el retiro correspondiente en el módulo de Bancos.</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg text-center">
              <h4 className="text-lg font-bold">CUENTAS POR COBRAR</h4>
              <p className="text-sm">Consulta los pagos de los clientes y realiza el retiro correspondiente en el módulo de Bancos.</p>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg text-center">
              <h4 className="text-lg font-bold">CUENTAS POR PAGAR</h4>
              <p className="text-sm">Genera los retiros correspondientes realizados por medio del módulo Cuentas por Pagar.</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg text-center">
              <h4 className="text-lg font-bold">CONTABILIDAD</h4>
              <p className="text-sm">Automatiza el proceso contable y genera los movimientos correspondientes en el módulo de Bancos.</p>
            </div>
          </div>
        </section>
      </div>

      <MicrosipFooter />
    </>
  );
};

export default EditablePage;
