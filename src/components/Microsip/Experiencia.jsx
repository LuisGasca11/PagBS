import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./NavbarMicro";
import MicrosipFooter from "./MicrosipFooter";

export default function Experiencia() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.title = "Experiencia";
        
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
        document.title = "Black-Sheep";
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername("");
    }   

  return (
    <>
        <div className="relative w-full mb-3">
            <a
              href="/MicroPage"
              className={`fixed top-4 left-4 z-[60] transition-all duration-300 
                ${scrollY > 80 ? "scale-75 translate-y-[-10px]" : "scale-100"}
              `}
            >
              <img
                src="/msppart.webp"
                alt="logo"
                className="h-10 sm:h-12 object-contain"
              />
            </a>
        
            <NavBar
              isAuthenticated={isAuthenticated}
              username={username}
              onLoginClick={() => {}}
              onLogoutClick={handleLogout}
              onOpenAdmin={() => {}}
              onOpenVpsAdmin={() => {}}
              onOpenHourlyAdmin={() => {}}
            />
        </div>

        <section className="w-full bg-white px-6 sm:px-10 lg:px-20 py-16">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10">
                
                <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                    ¿Qué es el ERP<br />Microsip?
                </h1>

                <p className="mt-6 text-gray-400 text-[17px] leading-relaxed">
                    Somos un sistema desarrollado para controlar los procesos administrativos y operativos 
                    de las PyMEs. Durante más de 35 años hemos <strong> maximizado el potencial </strong>  
                    de más de 100 mil empresas. Contamos con presencia en toda la República Mexicana con 
                    <strong> 8 oficinas regionales </strong>y más de <strong>350 partners certificados</strong>.
                </p>
                </div>

                <div className="flex-shrink-0">
                <img
                    src="/micro.png"
                    alt="Microsip Logo"
                    className="w-72 sm:w-96 h-auto object-contain"
                />
                </div>
            </div>
        </section>  

       <section className="w-full bg-white px-6 sm:px-10 lg:px-20 py-16">
            <div className="flex flex-col justify-center text-center">

                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                    ¿En qué creemos?
                </h2>

                <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mb-10">
                    En el éxito de nuestros clientes y partners y tenemos valores que nos comprometen 
                    y guían diariamente:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl mx-auto">

                    <div className="text-left">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Gratitud</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Agradecemos todas las oportunidades, las circunstancias y los factores que 
                            nos han hecho crecer, desarrollarnos y mejorar el ERP Microsip.
                        </p>
                    </div>

                    <div className="text-left">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Pasión</h3>
                        <p className="text-gray-600 leading-relaxed">
                            El ingrediente perfecto para convertir lo ordinario en extraordinario.
                        </p>
                    </div>

                    <div className="text-left">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Servicio</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Nos ponemos al servicio de los demás, colaboramos para facilitar el trabajo 
                            de nuestros compañeros, partners, clientes y el entorno.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        <section className="w-full bg-white px-6 sm:px-10 lg:px-20">
            <div className="max-w-6xl mx-auto">
                
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-left mb-3">
                ¿Qué buscamos?
                </h2>

                <p className="text-gray-600 text-lg mb-16">
                Ser auténticos practicando los comportamientos que consideramos indispensables:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
                <img
                    src="/client.png"
                    alt="Cliente"
                    className="w-60 sm:w-72 mx-auto md:mx-0"
                />

                <div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-3">
                    Centricidad en el cliente
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                    Nuestros clientes son el epicentro de todas las decisiones.
                    </p>
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
                <img
                    src="/feedback.png"
                    alt="Feedback"
                    className="w-60 sm:w-72 mx-auto md:mx-0"
                />

                <div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-3">
                    Apertura al feedback
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                    Sabemos que el primer paso para el progreso es la capacidad de recibir retroalimentación
                    y brindarla con asertividad.
                    </p>
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <img
                        src="/data.png"
                        alt="Datos"
                        className="w-60 sm:w-72 mx-auto md:mx-0"
                    />

                    <div>
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-3">
                        Obsesión por los datos
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                        Medimos y orientamos nuestros proyectos con antecedentes e información documentada y respaldada.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <img
                        src="/confidence.png"
                        alt="Datos"
                        className="w-60 sm:w-72 mx-auto md:mx-0"
                    />

                    <div>
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-3">
                        Confianza y colaboración
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                        Valoramos, impulsamos y desarrollamos el talento individual y grupal.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className="w-full bg-white px-6 sm:px-10 lg:px-20 py-20">
            <div className="max-w-4xl mx-auto text-center">
                    <div>
                        <p className="text-gray-400 leading-relaxed text-center">
                        Toma el control, realiza decisiones informadas y alcanza todas tus metas con un ERP hecho para tu empresa. ¡Conoce la solución!
                        </p>
                    </div>
                </div>
        </section>

        <MicrosipFooter />
    </>
  );
}
