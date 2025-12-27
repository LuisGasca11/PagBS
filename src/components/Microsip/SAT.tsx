import { Link } from "react-router-dom";
import MicrosipFooter from "./MicrosipFooter";
import { useState, useEffect } from "react";
import NavBar from "./NavbarMicro";

export default function SatCompliance() {

  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    document.title = "Microsip | SAT";
    return () => { document.title = "Black-Sheep"; };
  }, []);

  return (
    <>
    <div className="min-h-screen bg-white pt-24 pb-24 px-6">

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
          userRole={null}
          userId={null}
          onLoginClick={() => {}}
          onLogoutClick={() => {}}
          onOpenAdmin={() => {}}
          onOpenVpsAdmin={() => {}}
          onOpenHourlyAdmin={() => {}}
          onOpenUsersAdmin={() => {}}
          onOpenDocuments={() => {}}
          onOpenProfile={() => {}}
        />
      </div>
      
      <div className="max-w-4xl mx-auto">

        <div className="w-full mb-10">
          <img
            src="/Sat1.png"
            alt="SAT Microsip"
            className="w-full max-w-lg object-contain rounded-xl"
          />
        </div>

        <h1 className="mt-10 text-3xl md:text-4xl font-bold text-gray-900">
          Microsip, tu aliado en el cumplimiento con el SAT
        </h1>

        <p className="text-black mt-2 mb-10">
          La Solución Microsip&nbsp; / &nbsp;
          <span className="text-gray-800 font-medium">Microsip</span>
        </p>

        <h2 className="text-3xl font-bold mb-4 text-black">Tabla de contenido</h2>

        <div className="space-y-3 text-[16px] text-gray-500 mb-12">
          <a href="#cfdi" className="block hover:text-orange-500 font-semibold">CFDI 4.0</a>

          <div className="pl-4 space-y-1 text-sm text-gray-600">
            <a href="#emision" className="block hover:text-orange-500">Emisión de CFDI 4.0</a>
            <a href="#recepcion" className="block hover:text-orange-500">Recepción de CFDI 4.0</a>
          </div>

          <a href="#cancelacion" className="block  font-semibold">Cancelación de CFDI</a>
          <a href="#pagos" className="block font-semibold">Complemento de Recepción de Pagos 2.0</a>
          <a href="#retenciones" className="block font-semibold">Constancia de Retenciones 2.0</a>
          <a href="#validacion" className="block font-semibold">Validación de datos fiscales</a>
          <a href="#resico" className="block font-semibold">Régimen RESICO</a>
          <a href="#ptu" className="block font-semibold">Participación de los Trabajadores en las Utilidades (PTU)</a>
          <a href="#carta-porte" className="block font-semibold">Complemento Carta Porte 3.1</a>
          <a href="#conclusion" className="block font-semibold">Conclusión</a>
          <a href="#conclusion" className="block font-semibold">¿Deseas saber más?</a>
        </div>

        <div className="my-12">
            <div className="h-px bg-black" />
        </div>

        <div className="space-y-16 text-gray-800 leading-relaxed">

          <p className="text-[17px] text-gray-600">
            Para cualquier negocio en México, cumplir con las disposiciones fiscales y los
            requisitos del Servicio de Administración Tributaria (SAT) es fundamental.
            Estas reglas aseguran que las empresas operen legalmente y de manera eficiente.
          </p>

          <p className="text-[17px] text-gray-600">
            Microsip, un sistema ERP (Enterprise Resource Planning), es una herramienta poderosa que, además de ayudar a las empresas con la gestión operativa, facilita el cumplimiento de responsabilidades fiscales. 
            A continuación, explicamos en términos simples qué significan estas obligaciones fiscales y cómo puede ayudarte a cumplirlas.
          </p>

          <div id="cfdi">
            <h2 className="text-4xl font-bold mb-4">CFDI 4.0</h2>
            <p className="text-[17px] text-gray-600">
              Los Comprobantes Fiscales Digitales por Internet (CFDI) son documentos digitales que registran todas las transacciones comerciales, como facturas, notas de crédito, pagos y traslados. 
              La versión 4.0 es la actualmente requerida por el SAT.
            </p>
          </div>

          <div id="emision">
            <h3 className="text-2xl font-bold mt-8 mb-4">Emisión de CFDI 4.0</h3>
            <p className="text-[17px] text-gray-600">
                Microsip permite crear estos comprobantes en varios módulos:
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Ventas</li>
              <li>Punto de venta</li>
              <li>Cuentas por cobrar</li>
              <li>Inventarios</li>
              <li>Cuentas por pagar</li>
              <li>Nómina</li>
            </ul>

            <p className="text-[17px] text-gray-600 mt-3">
              Esto asegura que todas las transacciones se registren correctamente y cumplan con las disposiciones fiscales del SAT.
            </p>
          </div>

          <div id="recepcion">
            <h3 className="text-2xl font-bold mt-8 mb-4">Recepción de CFDI 4.0</h3>
            <p className="text-[17px] text-gray-600">
              Cuando recibes facturas y otros documentos fiscales de tus proveedores, necesitas registrarlos correctamente para mantener un buen control de tus finanzas y cumplir con las disposiciones fiscales de la autoridad fiscal.
            </p>
            <p className="text-[16px] text-gray-600 mt-3">
                Microsip te ayuda a registrar estos documentos en:
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Compras</li>
              <li>Cuentas por pagar</li>
              <li>Contabilidad electrónica</li>
              <li>Bancos</li>
            </ul>

            <p className="text-[16px] text-gray-600 mt-3">
                Así, puedes asegurarte de que toda la documentación recibida esté en orden y conforme a las normas.
            </p>
          </div>

          <div id="cancelacion">
            <h2 className="text-3xl font-bold mb-4">Cancelación de CFDI</h2>
            <p className="text-[16px] text-gray-600 mt-3">
                A veces, necesitas anular una factura o un documento fiscal ya emitido. Esto debe hacerse siguiendo ciertos procedimientos para que la autoridad fiscal lo acepte.
            </p>
            <p className="text-[16px] text-gray-600 mt-3">
                Microsip facilita la cancelación de estos documentos en los módulos de:
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Ventas</li>
              <li>Punto de venta</li>
              <li>Cuentas por cobrar</li>
              <li>Inventarios</li>
              <li>Nómina</li>
            </ul>

            <p className="text-[16px] text-gray-600 mt-3">
                Esto garantiza que cualquier operación se anule correctamente de acuerdo a las disposiciones fiscales del SAT.
            </p>
          </div>

          <div id="pagos">
            <h2 className="text-4xl font-bold mb-4">Complemento de Recepción de Pagos 2.0</h2>
            <p className="text-[16px] text-gray-600 mt-3">
                Este complemento es información adicional que se incorpora en el CFDI cuando recibes un pago por una factura ya emitida, registrando que el pago ha sido recibido. <br />
                Microsip emite este complemento en el módulo de Cuentas por cobrar y Punto de venta.
            </p>
          </div>

          <div id="retenciones">
            <h2 className="text-4xl font-bold mb-4">Constancia de Retenciones 2.0</h2>
            <p className="text-[16px] text-gray-600 mt-3">
                Este documento registra las retenciones de impuestos que hacen los proveedores a la empresa, como retenciones de IVA o ISR. En Microsip se maneja en el módulo de Cuentas por pagar. <br />
            </p>
            <p className="text-[16px] text-gray-600 mt-3">
                Esto asegura que todas las retenciones se registren y reporten adecuadamente.
            </p>
          </div>

          <div id="validacion">
            <h2 className="text-4xl font-bold mb-4">Validación de datos fiscales</h2>
            <p className="text-[16px] text-gray-600 mt-3">
                Es importante asegurarse de que todos los datos fiscales (como nombres, direcciones y números de identificación) sean correctos en tus documentos.
            </p>
            
            <p className="text-[16px] text-gray-600 mt-3">
                Microsip valida estos datos en los módulos de:
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Ventas</li>
              <li>Punto de venta</li>
              <li>Cuentas por cobrar</li>
              <li>Compras</li>
              <li>Cuentas por pagar</li>
              <li>Contabilidad electrónica</li>
              <li>Nómina</li>
            </ul>

            <p className="text-[16px] text-gray-600 mt-3">
                Esto ayuda a prevenir errores y asegurar que todo esté en regla con el SAT.
            </p>
          </div>

          <div id="resico">
            <h2 className="text-4xl font-bold mb-4">Régimen RESICO</h2>
            <p className="text-[17px] text-gray-600 mt-3">
                El Régimen Simplificado de Confianza (RESICO) es un tipo de régimen fiscal con ciertos beneficios para las pequeñas y medianas empresas.
            </p>
            <p className="text-[17px] text-gray-600 mt-3">
                Microsip soporta este régimen en los módulos de Ventas, Punto de venta y Cuentas por cobrar.
            </p>
            <p className="text-[17px] text-gray-600 mt-3">
                Esto ayuda a prevenir errores y asegurar que todo esté en regla con el SAT.
            </p>
          </div>

          <div id="ptu">
            <h2 className="text-3xl font-bold mb-4">
              Participación de los Trabajadores en las Utilidades (PTU)
            </h2>
            <p className="text-[17px] text-gray-600 mt-3">
                La PTU es una parte de las ganancias de la empresa que se distribuye entre los empleados cada año. 
                Microsip genera la nómina de PTU en su módulo de Nómina, tomando en cuenta los topes máximos que la autoridad fijó en los últimos años.
            </p>
            <p className="text-[17px] text-gray-600 mt-3">
                Esto asegura que tus empleados reciban su parte justa de las utilidades según la ley.
            </p>
          </div>

          <div id="carta-porte">
            <h2 className="text-3xl font-bold mb-4">Complemento Carta Porte 3.1</h2>
            <p className="text-[17px] text-gray-600 mt-3">
                El Complemento Carta Porte es información adicional que se incorpora en el CFDI y es necesaria para amparar el transporte de las mercancías.
            </p>
            <p className="text-[17px] text-gray-600 mt-3">
                Microsip facilita la emisión de este complemento en la versión 3.1 en los módulos de Ventas e Inventarios.
            </p>
          </div>

          <div id="conclusion">
            <h2 className="text-3xl font-bold mb-4">Conclusión</h2>
            <p className="text-[17px] text-gray-600 mt-3">
              Microsip es una solución integral que simplifica el cumplimiento de las disposiciones fiscales del SAT, ayudando a las empresas a manejar sus finanzas y documentación de manera correcta y eficiente. 
              Cada módulo de Microsip está diseñado para cumplir con los requerimientos fiscales de la autoridad fiscal, asegurando que tu negocio opere legalmente y sin contratiempos.
            </p>
          </div>

          <div id="conclusion">
            <h2 className="text-3xl font-bold mb-4">¿Deseas saber más</h2>
            <p className="text-[17px] text-gray-600 mt-3 ">
              Si estás interesado en conocer más sobre cómo Microsip puede ayudar a tu empresa a cumplir con sus obligaciones fiscales, no dudes en contactar a nuestros Partners o visitar nuestra página web para obtener más información.
            </p>
          </div>
        </div>
      </div>
    </div>
      <section className="bg-black">
          <MicrosipFooter className="mt-20"/>
      </section>
    </>
  );
}
