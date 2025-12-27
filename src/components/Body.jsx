import React from 'react';
import { Link } from 'react-router-dom';
import { ContainerScroll } from "./ui/container-scroll-animation";
import HeroBackground from './Background/HeroBackground';

const Body = () => {
  return (
    <section 
      id="inicio"
      className="flex flex-col items-center text-center relative mx-auto my-4 sm:my-6 py-6 sm:py-0 px-4 sm:px-4
         w-full sm:w-[calc(100vw-3rem)] md:w-[1220px] 
         min-h-[550px] sm:min-h-[600px] md:h-[700px] lg:h-[810px] 
         md:px-0 pt-12 sm:pt-0"
    >
      <div className="absolute inset-0 z-0 w-full h-full">
        <HeroBackground />
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black from-30% via-black/50 via-60% to-transparent"></div>
      </div>

      <div className="relative z-10 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 mb-4 sm:mb-6 md:mb-7 lg:mb-9 
                      w-full max-w-[90%] sm:max-w-md md:max-w-[500px] lg:max-w-[588px] 
                      mt-8 sm:mt-16 md:mt-[140px] lg:mt-[180px] px-0 sm:px-4">
        <h1 className="text-white text-[2rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-7xl font-black sm:leading-tight tracking-tight  text-transparent italic">
          <span className="opacity-50">CONECTA</span><br />
          <span className="bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent italic">
            MAXIMIZA EL POTENCIAL
          </span>
        </h1>
        <p className="text-gray-400 text-[0.9rem] leading-[1.5] sm:text-base md:text-base lg:text-lg font-medium sm:leading-relaxed max-w-full sm:max-w-lg mx-auto px-2 sm:px-0">
          Control absoluto, decisiones basadas en datos y escalabilidad sin límites bajo el estándar Black-Sheep.
        </p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-[85%] sm:max-w-md px-0 sm:px-0 mb-6 sm:mb-0">
        <Link 
          to="#proyects"
          className="inline-flex items-center justify-center px-6 sm:px-6 md:px-8 py-3 sm:py-2.5 md:py-3 
                     bg-white text-black hover:bg-gray-200 rounded-full font-bold 
                     text-[0.8rem] sm:text-xs md:text-sm uppercase tracking-wide sm:tracking-wider 
                     transition-all transform hover:scale-105 shadow-lg ring-1 ring-white/10 whitespace-nowrap"
        >
          Explorar Sistema
        </Link>
        
        <Link 
          to="/form"
          className="inline-flex items-center justify-center px-6 sm:px-6 md:px-8 py-3 sm:py-2.5 md:py-3 
                     bg-transparent text-white border border-white/20 hover:bg-white/5 rounded-full font-medium 
                     text-[0.8rem] sm:text-xs md:text-sm uppercase tracking-wide sm:tracking-wider backdrop-blur-md 
                     transition-all hover:border-white/30 active:scale-95 whitespace-nowrap"
        >
          Solicitar Demo
        </Link>
      </div>

      <div className="absolute bottom-[-120px] sm:bottom-[-130px] md:bottom-[-250px] lg:bottom-[-350px] 
                      left-1/2 transform -translate-x-1/2 z-30 
                      w-[95%] sm:w-[90%] md:w-full 
                      max-w-none sm:max-w-3xl md:max-w-4xl lg:max-w-5xl 
                      px-0 sm:px-4 md:px-6 scale-100 sm:scale-100">
        <ContainerScroll titleComponent={<></>}>
          <img
            src="/code.jpeg"
            alt="Black Sheep Dashboard"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </ContainerScroll>
      </div>
    </section>
  );
};

export default Body;