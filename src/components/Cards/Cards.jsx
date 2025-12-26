import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const cards = [
    {
      id: 1,
      title: "Microsip",
      features: [],
      image: "mspPartner.png",
      link: "/MicroPage",
      target: "_blank",
      imageSize: "w-52 h-52 sm:w-56 sm:h-56 md:w-60 md:h-60 lg:w-64 lg:h-64",
    },
    {
      id: 2,
      title: "KRKN",
      features: [],
      image: "krkn.png",
      link: "https://krkn.mx/",
    },
    {
      id: 3,
      title: "Stick",
      features: [],
      image: "stick.png",
      link: "https://stick.mx/",
    },
    {
      id: 4,
      title: "BMKT",
      features: [],
      image: "bmktW.png",
      link: "/Landing",
      target: "_blank",
    },
    {
      id: 5,
      title: "HUM",
      features: [],
      image: "fyttsaTalent.png",
      link: "https://fyttsatalent.com/",
    },
    {
      id: 6,
      title: "K'MARENA",
      description: "",
      features: [],
      image: "kma.png",
      link: "https://kmarena.com/",
      imageSize: "w-52 h-52 sm:w-56 sm:h-56 md:w-60 md:h-60 lg:w-64 lg:h-40",
    },
  ];

  const topRow = cards.slice(0, 3);
  const bottomRow = cards.slice(3, 6);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      const rotatedCards = [...cards.slice(1), cards[0]];
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section id="proyects" className="py-16 md:py-24 lg:py-32 relative z-10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-white/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-white/3 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm font-bold tracking-[0.3em] text-gray-400 uppercase">
              
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            NUESTROS{" "}
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              PRODUCTOS
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium">
            Desarrollamos plataformas inteligentes para la gestión de proyectos,
            personal, inventarios, almacenes, e-commerce y señalización digital.
            También somos partner oficial de Microsip ERP, integrando y
            potenciando sus capacidades con herramientas a la medida. Nuestros
            proyectos combinan innovación, eficiencia y escalabilidad para
            llevar tu organización al siguiente nivel.
          </p>
        </div>

        <div
          className="relative z-10"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Fila Superior */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            {topRow.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>

          {/* Fila Inferior */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {bottomRow.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isExternalLink = (link) => {
    return (
      link.startsWith("http://") ||
      link.startsWith("https://") ||
      card.target === "_blank"
    );
  };

  const CardContent = () => (
    <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-8 group">
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      <div className={`relative mb-6 transition-transform duration-500 ${
        isHovered ? 'scale-110' : 'scale-100'
      } ${card.imageSize || "w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52"}`}>
        <img
          src={card.image}
          alt={card.title}
          className={`object-contain ${card.height || "h-full w-full"} transition-all duration-500`}
          style={{
            filter: isHovered ? "brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.3))" : "brightness(1)",
          }}
          onError={(e) => {
            e.target.style.display = "none";
            const fallback =
              e.target.parentElement.querySelector(".image-fallback");
            if (fallback) fallback.style.display = "flex";
          }}
        />

        <div className="image-fallback hidden w-full h-full flex-col items-center justify-center text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mb-2">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-white">
            {card.title}
          </h4>
        </div>
      </div>

      {/* Title with Underline Effect */}
      <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 text-center tracking-tight">
        {card.title}
      </h3>
      
      <div className={`h-1 bg-white rounded-full transition-all duration-500 ${
        isHovered ? 'w-16' : 'w-8'
      }`} />

      {/* CTA Text */}
      {card.cta && (
        <div
          className={`mt-4 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1"
          }`}
        >
          <span className="text-white font-bold text-sm inline-flex items-center gap-2">
            {card.cta}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                isHovered ? 'translate-x-1' : 'translate-x-0'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </div>
      )}
    </div>
  );

  const cardContainerClasses = `
    relative w-full h-full rounded-2xl overflow-hidden 
    bg-gradient-to-br from-white/5 to-transparent
    backdrop-blur-sm border border-white/10
    transition-all duration-500 ease-out
    ${isHovered 
      ? "transform scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.15)] border-white/30" 
      : "shadow-[0_0_20px_rgba(0,0,0,0.3)]"
    }
    hover:bg-gradient-to-br hover:from-white/10 hover:to-transparent
  `;

  if (isExternalLink(card.link)) {
    return (
      <div
        className="h-80 sm:h-[400px] md:h-[420px] lg:h-[440px] group relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a
          href={card.link}
          target={card.target || "_blank"}
          rel={card.target ? "noopener noreferrer" : ""}
          className="block w-full h-full cursor-pointer"
        >
          <div className={cardContainerClasses}>
            <CardContent />
          </div>
        </a>
      </div>
    );
  }

  return (
    <div
      className="h-80 sm:h-[400px] md:h-[420px] lg:h-[440px] group relative z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={card.link} className="block w-full h-full cursor-pointer">
        <div className={cardContainerClasses}>
          <CardContent />
        </div>
      </Link>
    </div>
  );
};

export default Carousel;