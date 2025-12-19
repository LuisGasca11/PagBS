const FooterSection = ({
  className = "",
  logoSuperior = "/pwdbl.png",
  logoInferior = "/BSwhite 1.png",
  showSocialMedia = true,
  showContactLinks = true,
  showPartnerLinks = true,
  showLearnMoreLinks = true,
  showPrivacyNotice = true
}) => {

  const grad = "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500";

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
            <a
              href="https://blck-sheep.com/"
              rel="noopener noreferrer"
            >
              <img
                src={logoSuperior}
                href="/Body#inicio"
                alt="Logo superior"
                className="h-10 sm:h-12 transition-all duration-300 hover:scale-105"
              />
            </a>

            <div className="w-24 h-[3px] rounded-full bg-gray-400 shadow-[0_0_12px_rgba(156,163,175,0.4)]" />
          </div>

          <div
            className="flex flex-col items-center opacity-0 animate-fade-up order-3 sm:order-2 col-span-1 sm:col-span-2 md:col-span-1"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex flex-col gap-3 items-center text-center w-full">
              {showPartnerLinks && (
                <a
                  href="/Landing#inicio"
                  className="
                    relative
                    text-white/80 text-sm md:text-[14px] font-medium
                    hover:text-white
                    transition-colors duration-300
                    group
                    px-2 py-1
                    hover:-translate-y-[1px]
                  "
                >
                  Inicio
                  <span className="
                    absolute bottom-0 left-1/2 right-1/2
                    h-[1px] bg-gray-400/0
                    group-hover:left-1 group-hover:right-1
                    group-hover:bg-gray-400
                    transition-all duration-300
                  " />
                </a>
              )}

              {showLearnMoreLinks && (
                <a
                  href="/CExito"
                  className="
                    relative
                    text-white/80 text-sm md:text-[14px] font-medium
                    hover:text-white
                    transition-colors duration-300
                    group
                    px-2 py-1
                    hover:-translate-y-[1px]
                  "
                >
                  Productos
                  <span className="
                  absolute bottom-0 left-1/2 right-1/2
                  h-[1px] bg-gray-400/0
                  group-hover:left-1 group-hover:right-1
                  group-hover:bg-gray-400
                  transition-all duration-300
                " />
                </a>
              )}

              {showPartnerLinks && (
                <a
                  href="/FormMicro"
                  className="
                  relative
                  text-white/80 text-sm md:text-[14px] font-medium
                  hover:text-white
                  transition-colors duration-300
                  group
                  px-2 py-1
                  hover:-translate-y-[1px]
                "
                >
                  Equipo
                  <span className="
                  absolute bottom-0 left-1/2 right-1/2
                  h-[1px] bg-gray-400/0
                  group-hover:left-1 group-hover:right-1
                  group-hover:bg-gray-400
                  transition-all duration-300
                " />
                </a>
              )}

              {showPartnerLinks && (
                <a
                  href="/form"
                  className="
                relative
                text-white/80 text-sm md:text-[14px] font-medium
                hover:text-white
                transition-colors duration-300
                group
                px-2 py-1
                hover:-translate-y-[1px]
              "
                >
                  Contactanos
                  <span className="
                absolute bottom-0 left-1/2 right-1/2
                h-[1px] bg-gray-400/0
                group-hover:left-1 group-hover:right-1
                group-hover:bg-gray-400
                transition-all duration-300
              " />
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end order-2 sm:order-3 gap-3">

            <a
              href="https://blck-sheep.com/"
              rel="noopener noreferrer"
            >
              <img
                src={logoInferior}
                href="/Landing#inicio"
                alt="Logo inferior"
                className="
                  h-10 sm:h-12 transition-all duration-300 hover:scale-105
                  
                "
              />
            </a>

            {showSocialMedia && (
              <div
                className="flex flex-col items-center sm:items-end opacity-0 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="w-24 h-[3px] rounded-full bg-gray-400 shadow-[0_0_12px_rgba(156,163,175,0.4)]" />
              </div>
            )}
          </div>
        </div>

        <div
          className="relative my-8 md:my-12 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className={`h-[2px] rounded-full ${grad} opacity-60`} />
          <div className="absolute inset-0 blur-xl opacity-25 bg-gradient-to-r from-gray-50/10 via-gray-100/5 to-gray-50/10" />        
        </div>

        {showPrivacyNotice && (
          <div
            className="text-center text-xs sm:text-sm px-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-white/90 leading-relaxed">
              © 2026 Black Sheep® |{" "}

              <a
                href="/avisoPrivacidad"
                className="relative text-white/80 hover:text-white transition-colors duration-300 mx-1 group"
              >
                Aviso de Privacidad
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-400 group-hover:w-full transition-all duration-300" />
              </a>{" "}
              |{" "}

              <a
                href="/terminosCondiciones"
                className="relative text-white/80 hover:text-white transition-colors duration-300 mx-1 group"
              >
                Términos y Condiciones
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-400 group-hover:w-full transition-all duration-300" />
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

export default FooterSection;