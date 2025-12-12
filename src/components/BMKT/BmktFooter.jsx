const BmktFooter = ({ 
  className = "",
  logoSuperior = "/pwdbl.png",
  logoInferior = "/bmktW.png",
  showSocialMedia = true,
  showContactLinks = true,
  showPartnerLinks = true,
  showLearnMoreLinks = true,
  showPrivacyNotice = true
}) => {

  const grad = "bg-gradient-to-r from-[#00C8FF] via-[#38FF66] via-[#FF5AE0] to-[#D014FF]";

  return (
    <footer className={`w-full bg-[#000] text-white pt-12 md:pt-16 pb-8 md:pb-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div 
          className="grid grid-cols-1 
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-[1fr_1.2fr_1fr] 
          gap-8 md:gap-12 
          items-start md:items-center"
        >
          <div className="flex flex-col items-center sm:items-start gap-6 opacity-0 animate-fade-up">
            <img 
              src={logoSuperior}
              alt="Logo superior" 
              className="h-10 sm:h-12 transition-all duration-300 hover:scale-105"
            />

            <div className={`w-24 h-[3px] rounded-full ${grad} shadow-[0_0_12px_rgba(255,90,224,0.5)]`} />
          </div>  

          <div 
            className="flex flex-col items-center opacity-0 animate-fade-up order-3 sm:order-2 col-span-1 sm:col-span-2 md:col-span-1"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex flex-col gap-3 items-center text-center w-full">

              {showPartnerLinks && (
                <a 
                  href="/FormMicro"
                  className="
                    text-white text-sm md:text-[14px] font-medium 
                    hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r
                    hover:from-[#00C8FF] hover:via-[#38FF66] hover:to-[#FF5AE0]
                    transition-all duration-300 hover:-translate-y-[2px]
                  "
                >
                  Contáctanos
                </a>
              )}

              {showPartnerLinks && (
                <a 
                  href="https://club.microsip.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-white text-sm md:text-[14px] font-medium 
                    hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r
                    hover:from-[#38FF66] hover:via-[#FF5AE0] hover:to-[#D014FF]
                    transition-all duration-300 hover:-translate-y-[2px]
                  "
                >
                  lll
                </a>
              )}

              {showLearnMoreLinks && (
                <a 
                  href="/MicroPage"
                  className="
                    text-white text-sm md:text-[14px] font-medium
                    hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r
                    hover:from-[#FF5AE0] hover:to-[#00C8FF]
                    transition-all duration-300 hover:-translate-y-[2px]
                  "
                >
                  lll
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end order-2 sm:order-3 gap-3">
            
            <img 
              src={logoInferior}
              alt="Logo inferior" 
              className="
                h-10 sm:h-12 transition-all duration-300 hover:scale-105
                drop-shadow-[0_0_12px_rgba(255,90,224,0.6)]
              "
            />

            {showSocialMedia && (
              <div 
                className="flex flex-col items-center sm:items-end opacity-0 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                <div className={`mt-1 w-20 h-[3px] rounded-full ${grad} shadow-[0_0_10px_rgba(0,200,255,0.5)]`} />
              </div>
            )}
          </div>  
        </div>
        
        <div 
          className="relative my-8 md:my-12 opacity-0 animate-fade-up" 
          style={{ animationDelay: "0.4s" }}
        >
          <div className={`h-[2px] rounded-full ${grad} opacity-60`} />
          <div className="absolute inset-0 blur-xl opacity-40 bg-gradient-to-r from-[#00C8FF]/30 via-[#FF5AE0]/30 to-[#D014FF]/30" />
        </div>

        {showPrivacyNotice && (
          <div 
            className="text-center text-xs sm:text-sm px-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-white leading-relaxed">
              © 2026 Black Sheep® |{" "}
              
              <a 
                href="/avisoPrivacidad"
                className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#00C8FF] hover:to-[#FF5AE0] transition-all duration-300 mx-1"
              >
                Aviso de Privacidad
              </a>{" "}
              |{" "}
              
              <a 
                href="/terminosCondiciones"
                className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#38FF66] hover:to-[#D014FF] transition-all duration-300 mx-1"
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

export default BmktFooter;
