const MicrosipFooter = ({ 
  className = "",
  logoSuperior = "/pwdbl.png",
  logoInferior = "/Mspbla.png",
  showSocialMedia = true,
  showContactLinks = true,
  showPartnerLinks = true,
  showLearnMoreLinks = true,
  showPrivacyNotice = true
}) => {

  return (
    <footer className={`w-full bg-[#1B1F23] text-gray-300 pt-12 md:pt-16 pb-8 md:pb-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div 
          className="grid grid-cols-1 
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-[1fr_1.2fr_1fr] 
          gap-8 md:gap-12 
          items-start md:items-center"
        >
          <div 
            className="flex flex-col items-center sm:items-start gap-6 opacity-0 animate-fade-up"
          >
            <img 
              src={logoSuperior}
              alt="Logo superior" 
              className="h-10 sm:h-12 w-auto object-contain transition-all duration-300 hover:scale-[1.05]"
            />
          </div>  

          <div 
            className="flex flex-col items-center opacity-0 animate-fade-up order-3 sm:order-2 col-span-1 sm:col-span-2 md:col-span-1" 
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex flex-col gap-3 items-center text-center w-full">
              {showPartnerLinks && (
                <a 
                  href="/FormMicro"
                  className="text-gray-400 text-sm md:text-[14px] leading-tight font-medium hover:text-white transition-all duration-200 hover:-translate-y-[2px]"
                >
                  Contáctanos
                </a>
              )}

              {showPartnerLinks && (
                <a 
                  href="https://club.microsip.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm md:text-[14px] leading-tight font-medium hover:text-white transition-all duration-200 hover:-translate-y-[2px]"
                >
                  Club Microsip
                </a>
              )}

              {showLearnMoreLinks && (
                <a 
                  href="/MicroPage"
                  className="text-gray-400 text-sm md:text-[14px] leading-tight font-medium hover:text-white transition-all duration-200 hover:-translate-y-[2px]"
                >
                  ¿Qué es Microsip?
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end order-2 sm:order-3 gap-3">
            <img 
              src={logoInferior}
              alt="Logo inferior" 
              className="h-10 sm:h-12 w-auto object-contain transition-all duration-300 hover:scale-[1.05]"
            />
            {showSocialMedia && (
              <div 
                className="flex flex-col items-center sm:items-end opacity-0 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                <h4 className="text-xs sm:text-[12px] font-semibold text-gray-400 uppercase tracking-wide"> 
                  Maximiza el potencial 
                </h4>
              </div>
            )}
          </div>  
        </div>
        
        <div className="relative my-8 md:my-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-orange-300/30 to-transparent blur-sm" />
        </div>

        {showPrivacyNotice && (
          <div className="text-center text-xs sm:text-sm flex-1 px-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <p className="text-gray-300 leading-relaxed">
              © 2026 black_sheep® |{" "}
              <a 
                className="hover:text-orange-500 transition-colors duration-300 inline-block mx-1" 
                href="/avisoPrivacidad"
              >
                Aviso de Privacidad
              </a>{" "}
              |{" "}
              <a 
                className="hover:text-orange-500 transition-colors duration-300 inline-block mx-1" 
                href="/terminosCondiciones"
              >
                Términos y Condiciones
              </a>
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-up {
          animation: fade-up 0.6s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default MicrosipFooter;