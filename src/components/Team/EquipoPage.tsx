import { ArrowLeft, Linkedin, Github, Mail, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function EquipoPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMember, setCurrentMember] = useState(0)
  const [dataStreams, setDataStreams] = useState([])
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
        "Experto en SQL",
      image: "/Team/.jpg",
      linkedin: "#",
      github: "#",
      email: "sofia@blacksheep.com",
    },
    {
      name: "Diego Ramos",
      role: "Programador",
      description:
        "Experto en KRKN",
      image: "/Team/.jpg",
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <div
          className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 px-4">
            <span className="text-white">Conoce al </span>
            <span className="text-white premium-text">Equipo</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
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
            {/* Main Card Container */}
            <div className="flex flex-col lg:flex-row min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Large Profile Image */}
              <div className="lg:w-4/5 relative overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
                <img
                  src={currentTeamMember.image || "/placeholder.svg"}
                  alt={currentTeamMember.name}
                  className="w-full h-[400px] sm:h-[500px] lg:h-[700px] xl:h-[800px] object-contain object-center transition-all duration-700 hover:scale-105"
                />
              </div>

              {/* Info Sidebar */}
              <div className="lg:w-1/5 p-4 sm:p-6 lg:p-8 flex flex-col justify-center relative z-30 backdrop-blur-sm bg-black/20">
                <div className="space-y-3 sm:space-y-4">
                  {/* Role Badge */}
                  <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-medium premium-text">
                    {currentTeamMember.role}
                  </span>

                  {/* Name */}
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white premium-text leading-tight">
                    {currentTeamMember.name}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {currentTeamMember.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => window.open(currentTeamMember.linkedin, "_blank")}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 rounded transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => window.open(currentTeamMember.github, "_blank")}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 rounded transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => (window.location.href = `mailto:${currentTeamMember.email}`)}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 rounded transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls - Previous */}
            <div className="absolute top-1/2 left-2 sm:left-4 md:left-8 transform -translate-y-1/2 z-40">
              <button
                onClick={prevMember}
                className="h-10 w-10 sm:h-12 sm:w-12 p-0 flex items-center justify-center backdrop-blur-sm bg-black/30 text-white hover:bg-white/20 hover:text-white transition-colors rounded-lg shadow-lg"
                aria-label="Miembro anterior"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Navigation Controls - Next */}
            <div className="absolute top-1/2 right-2 sm:right-4 lg:right-[21%] xl:right-[22%] transform -translate-y-1/2 z-40">
              <button
                onClick={nextMember}
                className="h-10 w-10 sm:h-12 sm:w-12 p-0 flex items-center justify-center backdrop-blur-sm bg-black/30 text-white hover:bg-white/20 hover:text-white transition-colors rounded-lg shadow-lg"
                aria-label="Siguiente miembro"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50">
              <div className="flex gap-2 sm:gap-3 bg-black/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                {teamMembers.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      index === currentMember
                        ? "bg-[#4845a5] scale-125 ring-2 ring-white/50"
                        : "bg-[#4845a5]/50 hover:bg-[#4845a5]/70"
                    }`}
                    onClick={() => setCurrentMember(index)}
                    aria-label={`Ver miembro ${index + 1}`}
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