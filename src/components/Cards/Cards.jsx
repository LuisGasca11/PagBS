import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const cards = [
    {
      id: 1,
      title: "Microsip",
      features: [],
      image: "Msp Partner 2 blanco.png",
      link: "/MicroPage" 
    },
    {
      id: 2,
      title: "KRKN",
      features: [],
      image: "krkn.png",
      link: "https://krkn.mx/" 
    },
    {
      id: 3,
      title: "Stick",
      features: [],
      image: "stick.png",
      link: "https://stick.mx/"
    },
    {
      id: 4,
      title: "BMKT",
      features: [],
      cta: "PROXIMAMENTE",
      image: "Sheep Icon.png",
      link: "/bmkt",
      target: "_blank" 
    },
    {
      id: 5,
      title: "HUM",
      features: [],
      image: "fyttsaTalent.png",
      link: "https://fyttsatalent.com/"
    },
    {
      id: 6,
      title: "KUK",
      description: "",
      features: [],
      cta: "PROXIMAMENTE",
      image: "krkn.png",
      link: "/kuk"
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
    <section id='proyects' className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            NUESTROS <span className="text-white">PROYECTOS</span>
          </h2>

        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Accelerate your development workflow with intelligent AI agents that write, review, and optimize your code.
        </p>
        </div>

        {/* Cards Grid Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Fila Superior */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {topRow.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>

          {/* Fila Inferior */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bottomRow.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-3">
            {[0, 1].map((index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition duration-300 ${
                  index === 0 ? 'bg-white scale-125' : 'bg-gray-600 hover:bg-gray-500'
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
    return link.startsWith('http://') || link.startsWith('https://');
  };

  const handleCardClick = (e) => {
    if (isExternalLink(card.link)) {
      return;
    }
  };

  const CardContent = () => (
    <div className="relative h-full bg-gradient-to-br from-gray-700 to-gray-800 flex flex-col items-center justify-center p-6 cursor-pointer">
      {/* Image Container */}
      <div className="relative w-40 h-40 mb-6">
        <img 
          src={card.image} 
          alt={card.title}
          className={`w-full h-full object-contain rounded-lg transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onError={(e) => {
            e.target.style.display = 'none';
            const fallback = e.target.parentElement.querySelector('.image-fallback');
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        
        <div className="image-fallback hidden w-full h-full flex-col items-center justify-center text-center p-4 bg-gray-600 rounded-lg">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h4 className="text-sm font-bold text-white">{card.title}</h4>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-4 text-center">
        {card.title}
      </h3>

      <div className={`transition-all duration-300 ${
        isHovered ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-1'
      }`}>
        <span className="text-white font-semibold text-sm inline-flex items-center">
          {card.cta}
          <svg className="w-4 h-4 ml-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </div>
      
      <div className="absolute top-4 right-4 bg-white/20 rounded-full w-4 h-4 animate-pulse"></div>
      <div className="absolute bottom-4 left-4 bg-gray-400/20 rounded-full w-6 h-6 animate-pulse"></div>

      <div className={`absolute inset-0 bg-white/5 rounded-2xl transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </div>
  );

  if (isExternalLink(card.link)) {
    return (
      <div 
        className="h-96 perspective-1000 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a 
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
          onClick={handleCardClick}
        >
          <div className={`
            relative w-full h-full bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700
            transition-all duration-300 group-hover:border-white/30 group-hover:shadow-2xl
            ${isHovered ? 'transform scale-105' : ''}
          `}>
            <CardContent />
          </div>
        </a>
      </div>
    );
  }

  return (
    <div 
      className="h-96 perspective-1000 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={card.link}
        className="block w-full h-full"
        onClick={handleCardClick}
      >
        <div className={`
          relative w-full h-full bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700
          transition-all duration-300 group-hover:border-white/30 group-hover:shadow-2xl
          ${isHovered ? 'transform scale-105' : ''}
        `}>
          <CardContent />
        </div>
      </Link>
    </div>
  );
};

export default Carousel;