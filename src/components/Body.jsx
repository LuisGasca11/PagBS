import React, { useMemo } from 'react';

const Body = () => {
  return (
    <section 
      id="inicio" 
      className="relative flex flex-col items-center overflow-visible bg-black w-full min-h-[600px] lg:min-h-[850px] mb-[20vh] md:mb-[30vh] lg:mb-[45vh]"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px), radial-gradient(#ffffff 0.5px, transparent 0.5px)`,
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0, 18px 18px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 85%)'
          }}
        />
        
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-white/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-white/[0.02] blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-6xl px-6 pt-20 md:pt-32 lg:pt-40 text-center">

        <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tighter">
          <span className="opacity-50">CONECTA</span> <br />
          <span className="bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent italic">
            MAXIMIZA EL POTENCIAL
          </span> 

        </h1>

        <p className="mt-10 max-w-xl text-gray-400 text-base md:text-lg leading-relaxed font-medium">
          Control absoluto, decisiones basadas en datos y escalabilidad sin límites bajo el estándar Black-Sheep.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-5">
          <button className="px-10 py-4 bg-white text-black hover:bg-gray-200 rounded-full font-black text-sm uppercase tracking-widest transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            Explorar Sistema
          </button>
          <button className="px-10 py-4 bg-transparent text-white border border-white/20 hover:bg-white/5 rounded-full font-bold text-sm uppercase tracking-widest backdrop-blur-md transition-all">
            Solicitar Demo
          </button>
        </div>
      </div>

      <div className="absolute bottom-[-150px] md:bottom-[-300px] lg:bottom-[-400px] left-1/2 transform -translate-x-1/2 z-30 w-full max-w-5xl px-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-white opacity-[0.05] rounded-3xl blur-2xl group-hover:opacity-[0.1] transition duration-700"></div>
          
          <div className="relative border border-white/10 rounded-2xl p-2.5">
            <img 
              alt="Black Sheep Dashboard" 
              loading="lazy" 
              className="w-full h-auto rounded-xl hover:grayscale-0 transition-all duration-700 border border-white/5"
              src="/code.jpeg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body;