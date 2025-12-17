import React, { useEffect, useState } from "react";
import NavBar from "./NavbarMicro";
import MicrosipFooter from "./MicrosipFooter";
import { loadSession, clearSession } from "./utils/auth";

const modules = [
  {
    category: "Administra",
    items: [
      { name: "Bancos", image: "/icons/bancos.png", link: "/Bancos" },
      { name: "Contabilidad", image: "/icons/cont_elect.png", link: "/Contabilidad" },
      { name: "Nómina", image: "/icons/nomina.png", link: "/Nomina" },
    ],
  },
  {
    category: "Consulta",
    items: [{ name: "CEO Móvil", image: "/icons/ceo_movil.png", link: "/CeoMovil" }],
  },
  {
    category: "Opera",
    items: [
      { name: "Cuentas por Pagar", image: "/icons/cuentas_pagar.png", link: "/CuentasPagar" },
      { name: "Compras", image: "/icons/compras.png", link: "/Compras" },
      { name: "Inventarios", image: "/icons/inventarios.png", link: "/Inventarios" },
      { name: "Cuentas por Cobrar", image: "/icons/cuentas_cobrar.png", link: "/CuentasCobrar" },
    ],
  },
  {
    category: "Vende",
    items: [
      { name: "Sync E", image: "/icons/synce.png", link: "SyncE" },
      { name: "Ventas", image: "/icons/ventas.png", link: "Ventas" },
      { name: "Punto de Venta", image: "/icons/punto-venta.png", link: "PuntoVenta" },
      { name: "En Ruta", image: "/icons/en-ruta.png", link: "EnRuta" },
    ],
  },
  {
    category: "Sincroniza",
    items: [{ name: "Administrador de Sucursales", image: "/icons/admin_suc.png", link: "AdminSuc" }],
  },
];

const ModuleCard = ({ name, image, link }: { name: string; image: string; link: string }) => (
  <a href={link} className="block">
    <div className="flex flex-col items-center gap-4 p-4 bg-white border rounded-lg shadow-lg hover:scale-105 transition-all duration-300 justify-center text-black">
      <img src={image} alt={name} className="w-16 h-16 object-contain" />
      <span className="text-sm font-medium">{name}</span>
    </div>
  </a>
);

const SistemaMicrosip = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

    useEffect(() => {
    const session = loadSession();

    if (session?.user) {
        setIsAuthenticated(true);
        setUsername(session.user.usuario);
    }
    }, []);

    const handleLogout = () => {
    clearSession();
    setIsAuthenticated(false);
    setUsername("");
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
          onLoginClick={() => {}}
          onLogoutClick={() => {}}
          onOpenAdmin={() => {}}
          onOpenVpsAdmin={() => {}}
          onOpenHourlyAdmin={() => {}}
        />
      </div>

      <div className="min-h-screen bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold text-orange-500">Sistema Microsip</h1>
          <p className="text-lg text-gray-600 mt-2">
            Ajústalo de acuerdo a las necesidades para la gestión administrativa de tu empresa, elige los módulos y la cantidad de usuarios en cada uno de ellos. Microsip, es un sistema confiable que se adapta a tus necesidades.
          </p>
        </div>

        <div className="flex justify-center items-center text-center">
          <div className="space-y-8 max-w-7xl">
            {modules.map((moduleCategory, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-2xl font-bold text-black">{moduleCategory.category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
                  {moduleCategory.items.map((module, idx) => (
                    <ModuleCard
                      key={idx}
                      name={module.name}
                      image={module.image}
                      link={module.link}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MicrosipFooter />
    </>
  );
};

export default SistemaMicrosip;
