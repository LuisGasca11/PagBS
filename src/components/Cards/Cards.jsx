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
      cta: "PROXIMAMENTE",
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
      title: "FyttsaTV",
      description: "",
      features: [],
      image: "tv.png",
      link: "https://fyttsatv.com/",
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
    <section id="proyects" className="py-12 md:py-16 lg:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            NUESTROS <span className="text-white">PROYECTOS</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed px-2">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
            {topRow.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>

          {/* Fila Inferior */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {bottomRow.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>

          <div className="flex justify-center mt-6 md:mt-8 space-x-3">
            {[0, 1].map((index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition duration-300 ${
                  index === 0
                    ? "bg-white scale-125"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
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
    <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-5 md:p-6">
      <div className={`relative mb-4 sm:mb-5 md:mb-6 ${
        card.imageSize || "w-40 h-40 sm:w-35 sm:h-35 md:w-36 md:h-36 lg:w-40 lg:h-40"
      }`}>
        <img
          src={card.image}
          alt={card.title}
          className={`object-contain rounded-lg ${card.height || "h-full w-full"}`}
          style={{
            transition: "transform 500ms ease-out, filter 500ms ease-out",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            filter: isHovered ? "brightness(1.1)" : "brightness(1)",
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

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">
        {card.title}
      </h3>

      {/* CTA Text */}
      {card.cta && (
        <div
          className={`transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-80 translate-y-1"
          }`}
        >
          <span className="text-white font-semibold text-xs sm:text-sm inline-flex items-center">
            {card.cta}
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transition-transform duration-300"
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

      <div
        className={`absolute inset-0 bg-gradient-to-br from-white/5 to-white/2 rounded-2xl transition-all duration-300 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </div>
  );

  const cardContainerClasses = `
    relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden 
    bg-gradient-to-br from-white/10 to-white/5 
    backdrop-blur-md border
    transition-all duration-500
    ${isHovered ? "transform scale-105 shadow-xl" : "shadow-lg"}
    border-white/20 hover:border-white/40
  `;

  if (isExternalLink(card.link)) {
    return (
      <div
        className="h-72 sm:h-80 md:h-88 lg:h-96 group relative z-10"
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
      className="h-72 sm:h-80 md:h-88 lg:h-96 group relative z-10"
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