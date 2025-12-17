import { useState } from "react";
import { ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import Navbar from "./Navbmkt";
import BmktFooter from "./BmktFooter";

const projects = [
  {
    externalLink: "https://elyssia.com.mx/",
    internalLink: "/RetosElyssia",
    title: "ELYSSIA",
    tagline: "Cuidado personal elevado a experiencia digital",
    media: "/fondo8.mp4",
    mediaType: "video",
    accent: "from-emerald-500 to-green-600",
    size: "col-span-1 md:col-span-2" 
  },
  {
    externalLink: "https://goumam.com",
    internalLink: "/RetosRNME",
    title: "RNME",
    tagline: "Inventarios inteligentes en tiempo real",
    media: "/bandera.mp4",
    mediaType: "video",
    accent: "from-red-500 to-orange-500",
    size: "col-span-1"
  },
  {
    externalLink: "https://fyttsa.com",
    internalLink: "/RetosFyttsa",
    title: "K'MARENA",
    tagline: "Tecnología aplicada para el servicio de streaming en vivo",
    media: "/Fondo9.mp4",
    mediaType: "video",
    accent: "from-indigo-500 to-blue-600",
    size: "col-span-1"
  },
  {
    externalLink: "https://fyttsuite.com",
    internalLink: "/BmktPa",
    title: "FYTTSUITE",
    tagline: "",
    media: "/fyttsuite.png",
    mediaType: "image",
    accent: "from-gray-700 to-gray-900",
    size: "col-span-1 md:col-span-2"
  },
];

export default function CExito() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? projects : projects.slice(0, 4);

  return (
    <div className="bg-black text-white font-lexend selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="relative z-10 max-w-7xl px-6">
          <div className="space-y-4 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-md">
              Portafolio de Impacto
            </span>
            <h1 className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.85]">
                CASOS DE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20">ÉXITO</span>
            </h1>
            <p className="mt-8 text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Transformamos la visión de marcas líderes en <span className="text-white font-medium">experiencias digitales</span> que dominan su mercado.
            </p>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-6">
            <a href="#proyectos" className="px-10 py-5 rounded-full bg-white text-black font-black hover:bg-indigo-500 hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Explorar Proyectos
            </a>
            <a href="/BmktForm" className="px-10 py-5 rounded-full border border-white/20 hover:bg-white/5 transition-all font-bold">
              Hablemos de tu idea
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
            <ChevronDown size={32} />
        </div>
      </section>

      <section id="proyectos" className="py-20 px-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {displayed.map((project, index) => (
            <div
              key={index}
              onClick={() => (window.location.href = project.internalLink)}
              className={`group relative rounded-[2.5rem] overflow-hidden bg-[#111] cursor-pointer transition-all duration-700 border border-white/5 hover:border-white/20 ${project.size}`}
            >
              <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                {project.mediaType === "video" ? (
                  <video
                    src={project.media} autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-[1.5s]"
                  />
                ) : (
                  <img
                    src={project.media} alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-[1.5s]"
                  />
                )}
                
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80`} />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 z-20">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-2 italic uppercase">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-lg max-w-md font-light">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 mt-4">
                    <button className={`flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-black text-sm transition-all hover:bg-indigo-500 hover:text-white`}>
                      VER CASO <ArrowRight size={18} />
                    </button>
                    <a
                      href={project.externalLink}
                      target="_blank" rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                    >
                      SITIO WEB <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>

              <div className={`absolute -inset-full bg-gradient-to-r ${project.accent} opacity-0 group-hover:opacity-20 transition-all duration-1000 group-hover:animate-slow-spin pointer-events-none`} />
            </div>
          ))}
        </div>
      </section>

      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">
            ¿TU PROYECTO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">SIGUE AQUÍ?</span>
          </h2>
          <button 
            onClick={() => window.location.href = "/BmktForm"}
            className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-full bg-white text-black text-xl font-black hover:bg-indigo-500 hover:text-white transition-all duration-500"
          >
            HAGÁMOSLO REALIDAD
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      <BmktFooter />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
            animation: slow-spin 10s linear infinite;
        }
      `}} />
    </div>
  );
}