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
    <footer className={`w-full bg-[#1B1F23] text-gray-300 pt-16 pb-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">

        <div 
          className="grid grid-cols-1 
          md:grid-cols-[1fr_1.2fr_1fr] 
          gap-12 items-center"
        >
          {/* LOGOS */}
          <div 
            className="flex flex-col items-start gap-6 opacity-0 animate-fade-up"
          >
            <img 
              src={logoSuperior}
              alt="Logo superior" 
              className="h-12 w-auto object-contain transition-all duration-300 hover:scale-[1.05]"
            />
          </div>  

          {/* SECCIONES */}
          <div className="flex flex-col items-center opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex flex-col gap-3 items-center text-center">
              {showPartnerLinks && (
                <a 
                  href="/FormMicro"
                  className="text-gray-400 text-[14px] leading-tight font-medium hover:text-white transition-all duration-200 hover:-translate-y-[2px]"
                >
                  Contáctanos
                </a>
              )}

              {showPartnerLinks && (
                <a 
                  href="https://club.microsip.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 text-[14px] leading-tight font-medium hover:text-white transition-all duration-200 hover:-translate-y-[2px]"
                >
                  Club Microsip
                </a>
              )}

              {showLearnMoreLinks && (
                <a 
                  href="/MicroPage"
                  className="text-gray-400 text-[14px] leading-tight font-medium hover:text-white transition-all duration-200 hover:-translate-y-[2px]"
                >
                  ¿Qué es Microsip?
                </a>
              )}
            </div>
          </div>

          {/* LOGO INFERIOR */}
          <div>
            <img 
              src={logoInferior}
              alt="Logo inferior" 
              className="h-12 w-auto object-contain transition-all duration-300 ml-20 hover:scale-[1.05]"
            />
            {showSocialMedia && (
              <div 
                className="flex flex-col items-center opacity-0 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                <h4 className="text-[12px] font-semibold text-oran uppercase tracking-wide mb-4 "> Maximiza el potencial </h4>
              </div>
            )}
          </div>  
        </div>
        
        {/* SEPARATOR */}
        <div className="relative my-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-orange-300/30 to-transparent blur-sm" />
        </div>

        {/* PRIVACY NOTICE */}
        {showPrivacyNotice && (
          <div className="text-center text-xs flex-1 px-4">
            <p className="text-white">
              © 2026 black_sheep® | 
              <a className="md:hover:text-accent transition-all duration-300 md:hover:translate-y-1 inline-block" href="/avisoPrivacidad">
                Aviso de Privacidad
              </a> | 
              <a className="md:hover:text-accent transition-all duration-300 md:hover:translate-y-1 inline-block" href="/terminosCondiciones">
                Términos y Condiciones
              </a>
            </p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default MicrosipFooter;
