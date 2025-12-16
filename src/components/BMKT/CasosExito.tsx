"use client";
 
import { useState } from "react";
 
export function CasosExito() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
 
  const subcompanies = [
    {
      name: "ELYSSIA",
      logo: "/logos/yaokalli.png",
      background: "/backgrounds/t3.png",
      color: "from-blue-650 to-blue-500",
      accent: "blue",
    },
    {
      name: "CEREVRO",
      logo: "/logos/cerevro.png",
      background: "/backgrounds/T4.png",
      color: "from-blue-650 to-blue-600",
      accent: "blue",
    },
    {
      name: "MARFIL",
      logo: "/logos/marfil.png",
      background: "/backgrounds/T5_.png",
      color: "from-blue-500 to-blue-600",
      accent: "blue",
    },
    {
      name: "BLACK SHEEP",
      logo: "/logos/black-sheep.png",
      background: "/backgrounds/T6.png",
      color: "from-blue-600 to-blue-600",
      accent: "blue",
    },
    {
      name: "GUIMAR",
      logo: "/logos/guimar.png",
      background: "/backgrounds/T7.png",
      color: "from-blue-600 to-blue-600",
      accent: "blue",
    },
  ];
 
  const getGlowColor = (accent: string) => {
    return "shadow-blue-500/50";
  };
 
  return (
    <section className="relative overflow-hidden min-h-screen bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
 
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
 
      <div className="grid grid-cols-5 h-screen relative z-10">
        {subcompanies.map((company, index) => (
          <div
            key={index}
            className="relative h-full w-full group cursor-pointer overflow-hidden"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110 filter grayscale"
              style={{
                backgroundImage: `url('${company.background}')`,
              }}
            />
 
            <div
              className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-50 group-hover:opacity-30 transition-all duration-700 ease-out`}
            />
 
            <div
              className={`absolute inset-0 border-2 border-transparent group-hover:border-white/30 transition-all duration-500 group-hover:shadow-2xl ${getGlowColor(
                company.accent
              )}`}
            />
 
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div
                className="absolute top-4 right-4 w-8 h-8 border border-white/30 rotate-45 animate-spin"
                style={{ animationDuration: "8s" }}
              />
              <div className="absolute bottom-4 left-4 w-6 h-6 border border-white/20 animate-pulse" />
              <div className="absolute top-1/2 left-1/2 w-12 h-12 border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping" />
            </div>
 
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div
                className={`relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 flex items-center justify-center transition-all duration-700 ease-out transform group-hover:scale-125 group-hover:rotate-3 ${
                  hoveredIndex === index ? "z-20" : "z-10"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 scale-150`}
                />
 
                <img
                  src={company.logo || "/placeholder.svg"}
                  alt={`${company.name}`}
                  className="relative max-w-full max-h-full object-contain filter brightness-0 invert drop-shadow-2xl group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] group-hover:brightness-125 transition-all duration-700 z-10"
                />
 
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  <span className="text-white font-bold text-xs md:text-sm tracking-wider drop-shadow-lg whitespace-nowrap">
                    {company.name}
                  </span>
                </div>
              </div>
            </div>
 
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/10 via-transparent to-white/5 transition-opacity duration-700" />
 
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-full animate-pulse"
                style={{ animationDuration: "2s" }}
              />
            </div>
 
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </div>
        ))}
      </div>
 
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
}
 