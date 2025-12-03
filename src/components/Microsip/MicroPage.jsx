import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { ArrowDown, Award, CheckCircle, Sparkles } from "lucide-react";
import DownloadPresentation from './DownloadPresentation';
import NavBar from './NavbarMicro';
import MicrosipFooter from './MicrosipFooter';

const MicroPage = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [scrollY, setScrollY] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    document.title = "MICROSIP ERP - Blog | black_sheep";
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.title = "Black-Sheep";
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLogout = () => {
      setShowLogoutAnimation(true);
  
      setTimeout(() => setLogoutClosing(true), 900);
  
      setTimeout(() => {
        clearSession();
        setIsAuthenticated(false);
        setUsername("");
        setShowLogoutAnimation(false);
        setLogoutClosing(false);
      }, 1300);
  }   

  const ImageWithFallback = ({ module }) => {
    const [imageError, setImageError] = useState(false);

    if (imageError || !module.image) {
      return (
        <div className="w-12 h-12 flex items-center justify-center text-2xl">
          {module.icon}
        </div>
      );
    }

    return (
      <img 
        src={module.image} 
        alt={module.name}
        className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  };

  return (
    <div className="min-h-screen transition-colors duration-300 overflow-x-hidden">
      
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
          onLoginClick={() => setShowLoginModal(true)}
          onLogoutClick={handleLogout}
          onOpenAdmin={() => setShowAdminPanel(true)}
          onOpenVpsAdmin={() => setShowAdminVpsPanel(true)}
          onOpenHourlyAdmin={() => setShowAdminHourlyPanel(true)}
        />
      </div>

      <main>
        <section className="w-full bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <h1 className="text-7xl text-black md:text-7xl font-extrabold leading-tight">
                <span className="text-orange-500">Maximiza</span><br />
                el potencial
              </h1>

              <p className="ms-text-base-gray text-[40px]">
                Toma el control, realiza decisiones informadas y alcanza todas tus metas 
                con un <span className="font-bold">ERP</span> hecho para tu empresa. 
                <span className="font-bold"> Microsip</span>: el secreto de los empresarios exitosos.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#" className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition">
                  ADQUIERE MICROSIP
                </a>
                <a href="#" className="border border-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:border-black transition">
                  ¿POR QUÉ ELEGIR EL ERP MICROSIP?
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <img 
                src="/cart.png" 
                alt="Microsip demo"
                className="w-full max-w-xl object-contain drop-shadow-xl"
              />
            </div>
          </div>

          <div className="w-full bg-gray-100 border-t mt-16 pt-10 pb-10">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-row items-center justify-between gap-10">

                <div className="text-block-19 text-gray-500">
                    Encuéntranos en:
                </div>

                <div className="flex items-center justify-end gap-10 opacity-80 flex-1">

                  <a 
                    href="https://www.forbes.com.mx/ad-sistema-integral-soluciones-erp-para-negocio-microsip/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="link-block-20 w-inline-block"
                  >
                    <div class="forbes-block">
                      <img 
                        src="https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b5916c1a4fb250eb1b_logo-forbes-mexico.png" 
                        loading="lazy"
                        sizes="(max-width: 767px) 100vw, (max-width: 991px) 727.96875px, 778px"
                        srcset="
                          https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b5916c1a4fb250eb1b_logo-forbes-mexico-p-500.png 500w,
                          https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b5916c1a4fb250eb1b_logo-forbes-mexico.png 778w
                        "
                        alt="forbes" 
                        class="image-48"
                      />
                    </div>
                  </a>

                  <a 
                    href="https://www.eleconomista.com.mx/el-empresario/Microsip-el-ERP-Mexicano-que-ayuda-a-las-empresas-a-crecer-20230327-0033.html" 
                    target="_blank" 
                    class="link-block-21 w-inline-block"
                  >
                    <div class="economista-block">
                      <img src="https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b581250c0ac23ccf90_logo-el-economista.png" 
                      loading="lazy" 
                      sizes="(max-width: 767px) 100vw, (max-width: 991px) 727.890625px, 939.90625px" alt="economista" class="image-49"
                      srcset="https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b581250c0ac23ccf90_logo-el-economista-p-500.png 500w, 
                      https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b581250c0ac23ccf90_logo-el-economista-p-800.png 800w, 
                      https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b581250c0ac23ccf90_logo-el-economista-p-1080.png 1080w, 
                      https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b581250c0ac23ccf90_logo-el-economista-p-1600.png 1600w, 
                      https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b581250c0ac23ccf90_logo-el-economista-p-2000.png 2000w, 
                      https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b581250c0ac23ccf90_logo-el-economista.png 2560w" />
                    </div>
                  </a>

                  <a 
                    href="https://expansion.mx/empresas/2023/09/25/descubre-como-liberar-el-potencial-de-tu-empresa-con-el-erp-microsip" 
                    target="_blank" 
                    class="link-block-21 w-inline-block">
                    <div class="expansion-block">
                      <img src="https://cdn.prod.website-files.com/627983ccef617d453b9485ad/6512fdf5ca29f22e6b9e3748_Logo_expansion_para_www.png" 
                        sizes="(max-width: 767px) 100vw, (max-width: 991px) 727.96875px, 939.9375px" alt="expansion" class="image-49"
                      loading="lazy" srcset="https://cdn.prod.website-files.com/627983ccef617d453b9485ad/6512fdf5ca29f22e6b9e3748_Logo_expansion_para_www-p-500.png 500w, 
                      https://cdn.prod.website-files.com/627983ccef617d453b9485ad/6512fdf5ca29f22e6b9e3748_Logo_expansion_para_www-p-800.png 800w, 
                      https://cdn.prod.website-files.com/627983ccef617d453b9485ad/6512fdf5ca29f22e6b9e3748_Logo_expansion_para_www-p-1080.png 1080w, 
                      https://cdn.prod.website-files.com/627983ccef617d453b9485ad/6512fdf5ca29f22e6b9e3748_Logo_expansion_para_www-p-1600.png 1600w, 
                      https://cdn.prod.website-files.com/627983ccef617d453b9485ad/6512fdf5ca29f22e6b9e3748_Logo_expansion_para_www.png 2000w" />
                    </div>
                  </a>

                  <a 
                    href="https://playersoflife.com/torreon/carta-porte-por-que-la-necesito-en-mi-empresa/" 
                    target="_blank" 
                    class="link-block-22 w-inline-block">
                      <div class="players-block">
                        <img src="https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b4716fa942e19a1d77_logo-players-of-life.png" 
                        loading="lazy" 
                        sizes="(max-width: 767px) 100vw, (max-width: 991px) 727.953125px, 939.953125px" 
                        srcset="https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b4716fa942e19a1d77_logo-players-of-life-p-500.png 500w, 
                        https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b4716fa942e19a1d77_logo-players-of-life-p-800.png 800w, 
                        https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b4716fa942e19a1d77_logo-players-of-life-p-1080.png 1080w, 
                        https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b4716fa942e19a1d77_logo-players-of-life-p-1600.png 1600w, 
                        https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b4716fa942e19a1d77_logo-players-of-life-p-2000.png 2000w, 
                        https://cdn.prod.website-files.com/627983ccef617d453b9485ad/642308b4716fa942e19a1d77_logo-players-of-life.png 2851w" 
                        alt="players" class="image-50"/>
                      </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#1B1F23] text-white py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-center text-3xl md:text-4xl font-bold mb-20">
              ¿Por qué elegir el ERP Microsip?
            </h1>

            {/* BLOQUE 1 */}
            <div className="grid md:grid-cols-2 items-center gap-y-32">
              
              <div>
                <h2 className="text-3xl font-bold mb-4 md:ml-20">
                  Cumple al 100% con el SAT
                </h2>

                <p className="text-lg text-gray-500 mb-8 md:ml-20">
                  Facilita el cumplimiento con el CFDI 4.0, Carta Porte, RESICO y demás requisitos.
                </p>

                <a 
                  href="/sat"
                  className="flex items-center gap-3 text-white hover:text-orange-400 transition-all group md:ml-20"
                >
                  <div className="relative w-10 h-10 md:ml-30">
                    <img 
                      src="/fle.webp" 
                      alt="Cumplimiento SAT"
                      className="w-10 h-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden text-white w-10 h-10 bg-orange-500 rounded-full items-center justify-center text-xl">
                      →
                    </div>
                  </div>
                  <p className="font-bold">Descubre como cumplimos con el SAT</p>
                </a>
              </div>

              <div className="flex justify-center md:mr-20">
                <img
                  src="/sat.png"
                  alt="Cumplimiento SAT"
                  className="w-[220px] md:w-[280px]"
                />
              </div>
            </div>

            {/* BLOQUE 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center gap-y-32 pt-40">
              
              <div className="flex justify-center md:justify-start md:ml-40">
                <img
                  src="/linne.png"
                  alt="Control de inventarios"
                  className="w-[220px] md:w-[300px]"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4 md:mr-30">
                  Sistema ERP Modular
                </h2>

                <p className="text-lg text-gray-500 mb-8">
                  Un sistema flexible que se adapta al tamaño y modelo de operación de tu empresa.
                </p>

                <a 
                  href="/SistemaMicrosip"
                  className="flex items-center gap-3 text-white hover:text-orange-400 transition-all group"
                >
                  <div className="relative w-10 h-10 md:ml-30">
                    <img 
                      src="/fle.webp" 
                      alt="Cumplimiento SAT"
                      className="w-10 h-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden text-white w-10 h-10 bg-orange-500 rounded-full items-center justify-center text-xl">
                      →
                    </div>
                  </div>
                  <p className="font-bold">Conoce el sistema ERP</p>
                </a>
              </div>
            </div>

            {/* BLOQUE 3 */}
            <div className="grid md:grid-cols-2 items-center gap-y-32 pt-40">
              
              <div>
                <h2 className="text-3xl font-bold mb-4 md:ml-20">
                  39 años de experiencia
                </h2>

                <p className="text-lg text-gray-500 mb-8 md:ml-20">
                  Aprovecha la experiencia de más de 100,000 clientes satisfechos y más de tres décadas de excelencia.
                </p>

                <a 
                  href="https://www.microsip.com/que-es-erp-microsip"
                  className="flex items-center gap-3 text-white hover:text-orange-400 transition-all group md:ml-20"
                >
                  <div className="relative w-10 h-10 md:ml-30">
                    <img 
                      src="/fle.webp" 
                      alt="Cumplimiento SAT"
                      className="w-10 h-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden text-white w-10 h-10 bg-orange-500 rounded-full items-center justify-center text-xl">
                      →
                    </div>
                  </div>
                  <p className="font-bold">Aprende más sobre nosotros</p>
                </a>
              </div>

              <div className="flex justify-center md:mr-20">
                <img
                  src="/35a.png"
                  alt="Cumplimiento SAT"
                  className="w-[350px] md:w-[350px]"
                />
              </div>
            </div>

            {/* BLOQUE 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-center gap-y-32 pt-40">
              
              <div className="flex justify-center md:justify-start md:ml-40">
                <img
                  src="/com.png"
                  alt="Comunidad"
                  className="w-[220px] md:w-[300px]"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4 md:mr-30">
                  Partners expertos en todo el país
                </h2>

                <p className="text-lg text-gray-500 mb-8">
                  Contamos con más de 350 partners certificados, siempre dispuestos a digitalizar los procesos de tu empresa.
                </p>

                <a 
                  href="/FormMicro"
                  className="flex items-center gap-3 text-white hover:text-orange-400 transition-all group"
                >
                  <div className="relative w-10 h-10 md:ml-30">
                    <img 
                      src="/fle.webp" 
                      alt="Cumplimiento SAT"
                      className="w-10 h-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden text-white w-10 h-10 bg-orange-500 rounded-full items-center justify-center text-xl">
                      →
                    </div>
                  </div>
                  <p className="font-bold">Contacta a un partner</p>
                </a>
              </div>
            </div>

            {/* BLOQUE 5 */}
            <div className="grid md:grid-cols-2 items-center gap-y-32 pt-40">
              
              <div>
                <h2 className="text-3xl font-bold mb-4 md:ml-20">
                  Comunidad de usuarios
                </h2>

                <p className="text-lg text-gray-500 mb-8 md:ml-20">
                  Conecta con una comunidad digital de miles de usuarios dispuestos a ayudarte.
                </p>

                <a 
                  href="https://club.microsip.com/"
                  className="flex items-center gap-3 text-white hover:text-orange-400 transition-all group md:ml-20"
                >
                  <div className="relative w-10 h-10 md:ml-30 ">
                    <img 
                      src="/fle.webp" 
                      alt="Cumplimiento SAT"
                      className="w-10 h-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden font-semi text-white w-10 h-10 bg-orange-500 rounded-full items-center justify-center text-xl">
                      →
                    </div>
                  </div>
                  <p className="font-extrabold">Explora CLUB MICROSIP</p>
                </a>
              </div>

              <div className="flex justify-center md:mr-20">
                <img
                  src="/35a.png"
                  alt="Cumplimiento SAT"
                  className="w-[350px] md:w-[350px]"
                />
              </div>
            </div>
          </div>
        </section>

        <MicrosipFooter />
      </main>
    </div>
  );
};


export default MicroPage;