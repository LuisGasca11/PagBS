import { ArrowLeft, Linkedin, Github, Mail, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function EquipoPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMember, setCurrentMember] = useState(0)
  const [dataStreams, setDataStreams] = useState<Array<{ left: string; delay: string }>>([])
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
    const streams = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
    }))
    setDataStreams(streams)
  }, [])

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
      name: "Alfredo Jones",
      role: "Finall Boss",
      description:
        "Crack de cracks en black_sheep®",
      image: "/Team/jones.png",
      linkedin: "#",
      github: "#",
      email: "carlos@blacksheep.com",
    },
    {
      name: "Jon Gallardo",
      role: "Programador",
      description:
        "Experto en procesos almacenados",
      image: "/Team/jon.jpg",
      linkedin: "#",
      github: "#",
      email: "sofia@blacksheep.com",
    },
    {
      name: "Diego Ramos",
      role: "Programador",
      description:
        "Experto en valorar las cosas ajenas",
      image: "/Team/diego.jpg",
      linkedin: "#",
      github: "#",
      email: "sofia@blacksheep.com",
    },
  ]

  const nextMember = () => {
    setCurrentMember((prev) => (prev + 1) % teamMembers.length)
  }

  const prevMember = () => {
    setCurrentMember((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
  }

  const currentTeamMember = teamMembers[currentMember]

  return (
    <div id="equipo" className="min-h-screen plasma-background">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {dataStreams.map((stream, i) => (
            <div
              key={i}
              className="absolute w-px h-24 bg-gradient-to-b from-white via-white/60 to-transparent animate-pulse"
              style={{
                left: stream.left,
                animationDelay: stream.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-balance">
            <span className="text-white">Conoce al </span>
            <span className="text-white premium-text">Equipo</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
            Los visionarios detrás de KRKN. Un equipo multidisciplinario que combina experiencia en logística,
            tecnología avanzada y diseño centrado en el usuario.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div
            className={`relative overflow-hidden transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col lg:flex-row min-h-[800px] backdrop-blur-xl rounded-3xl overflow-hidden ">
              {/* Large Profile Image - Takes up most of the space */}
              <div className="lg:w-4/5 relative overflow-hidden">
                <img
                  src={currentTeamMember.image || "/placeholder.svg"}
                  alt={currentTeamMember.name}
                  className="w-full h-[600px] lg:h-[800px] object-contain object-center transition-all duration-700 hover:scale-105"
                />
              </div>

              {/* Compact Info Sidebar */}
              <div className="lg:w-1/5 p-6 lg:p-8 flex flex-col justify-center relative z-30 backdrop-blur-sm">
                <div className="space-y-4">
                  {/* Badge personalizado para el rol */}
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-medium premium-text">
                    {currentTeamMember.role}
                  </span>

                  {/* Name */}
                  <h2 className="text-2xl lg:text-3xl font-black text-foreground premium-text leading-tight">
                    {currentTeamMember.name}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed">{currentTeamMember.description}</p>

                  {/* Social Links - Compact horizontal layout */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => window.open(currentTeamMember.linkedin, "_blank")}
                      className="h-8 w-8 p-0 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 rounded transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => window.open(currentTeamMember.github, "_blank")}
                      className="h-8 w-8 p-0 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 rounded transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => (window.location.href = `mailto:${currentTeamMember.email}`)}
                      className="h-8 w-8 p-0 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 rounded transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-40">
              <button
                onClick={prevMember}
                className="h-12 w-12 p-0 flex items-center justify-center backdrop-blur-sm text-white hover:bg-white/20 hover:text-white transition-colors rounded"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute top-1/2 right-8 lg:right-[22%] transform -translate-y-1/2 z-40">
              <button
                onClick={nextMember}
                className="h-12 w-12 p-0 flex items-center justify-center backdrop-blur-sm text-white hover:bg-white/20 hover:text-white transition-colors rounded"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="flex gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                {teamMembers.map((_, index) => (
                <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentMember
                        ? "bg-[#4845a5] scale-125 ring-2 ring-white/50" 
                        : "bg-[#4845a5]/50 hover:bg-[#4845a5]/70"          
                    }`}
                    onClick={() => setCurrentMember(index)}
                />
                ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}