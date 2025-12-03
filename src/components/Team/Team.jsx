import { ArrowLeft, Linkedin, Github, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import GradientText from "../Text/GradientText";

const Btn = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl font-semibold transition-all border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-[1.02] active:scale-95 ${className}`}
  >
    {children}
  </button>
);

const Badge = ({ children }) => (
  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-700/20 text-purple-400 border border-purple-500/20">
    {children}
  </span>
);

export default function Team() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMember, setCurrentMember] = useState(0);
  const [dataStreams, setDataStreams] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    const streams = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
    }));
    setDataStreams(streams);
  }, []);

  const teamMembers = [
    {
      name: "Jeroboam Sanchez",
      role: "CEO & Founder",
      description:
        "Visionario tecnológico con 15+ años en logística y automatización. Experto en transformación digital de almacenes.",
      image: "/Team/jero.png",
      linkedin: "#",
      github: "#",
      email: "alex@blacksheep.com",
    },
    {
      name: "Ivonne Espejel",
      role: "CTO & Co-founder",
      description:
        "Arquitecta de software especializada en sistemas distribuidos y AI. Líder en desarrollo de soluciones WMS de próxima generación.",
      image: "/Team/ivonne.png",
      linkedin: "#",
      github: "#",
      email: "maria@blacksheep.com",
    },
    {
      name: "Edmundo Cortes",
      role: "Head of Innovation",
      description:
        "Especialista en IoT y robótica aplicada a almacenes. Pionero en integración de tentáculos mecánicos para picking automatizado.",
      image: "/Team/jones.png",
      linkedin: "#",
      github: "#",
      email: "carlos@blacksheep.com",
    },
    {
      name: "Daniel Garcia",
      role: "Lead UX Designer",
      description:
        "Diseñadora de experiencias que humaniza la tecnología compleja. Creadora de interfaces intuitivas para operadores de almacén.",
      image: "/Team/Diego.jpg",
      linkedin: "#",
      github: "#",
      email: "sofia@blacksheep.com",
    },
  ];

  const nextMember = () => setCurrentMember((prev) => (prev + 1) % teamMembers.length);
  const prevMember = () => setCurrentMember((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  const currentTeamMember = teamMembers[currentMember];

  return (
    <div id="equipopage" className="min-h-screen text-white relative plasma-background">

      <div className="relative z-10 container mx-auto px-4 py-16">

        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 flex justify-center gap-3">

            <GradientText>
             Conoce al Equipo
            </GradientText>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Los visionarios detrás de KRKN. Un equipo multidisciplinario que combina experiencia en logística,
            tecnología avanzada y diseño centrado en el usuario.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative overflow-hidden transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col lg:flex-row min-h-[800px] backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 bg-transparent">
              {/* IMAGE */}
              <div className="lg:w-4/5 relative">
                <img
                  src={currentTeamMember.image}
                  alt={currentTeamMember.name}
                  className="w-full h-[600px] lg:h-[800px] object-contain object-center transition-all duration-700 hover:scale-105"
                />
              </div>

              <div className="lg:w-1/5 p-8 bg-transparent backdrop-blur-sm flex flex-col justify-center border-l border-white/10">
                <div className="space-y-4">
                  <Badge>{currentTeamMember.role}</Badge>

                  <h2 className="text-3xl font-black text-white">{currentTeamMember.name}</h2>

                  <p className="text-gray-400 text-sm">{currentTeamMember.description}</p>

                  <div className="flex gap-2 pt-2">
                    <Btn onClick={() => window.open(currentTeamMember.linkedin)} className="p-2 h-9 w-9 flex items-center justify-center">
                      <Linkedin className="h-4 w-4" />
                    </Btn>
                    <Btn onClick={() => window.open(currentTeamMember.github)} className="p-2 h-9 w-9 flex items-center justify-center">
                      <Github className="h-4 w-4" />
                    </Btn>
                    <Btn onClick={() => (window.location.href = `mailto:${currentTeamMember.email}`)} className="p-2 h-9 w-9 flex items-center justify-center">
                      <Mail className="h-4 w-4" />
                    </Btn>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="absolute top-1/2 left-8 -translate-y-1/2 bg-white/5 hover:bg-white/10 p-3 rounded-full backdrop-blur border border-white/10"
              onClick={prevMember}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              className="absolute top-1/2 right-[20%] lg:right-[22%] -translate-y-1/2 bg-white/5 hover:bg-white/10 p-3 rounded-full backdrop-blur border border-white/10"
              onClick={nextMember}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentMember ? "bg-purple-400 scale-125" : "bg-gray-500/40 hover:bg-gray-400/60"
                  }`}
                  onClick={() => setCurrentMember(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}