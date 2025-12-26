import React from "react";
import { Link } from "react-router-dom";

const Carousel = () => {
  const cards = [
    {
      id: 1,
      title: "KRKN WMS",
      tagline: "Gestión inteligente de almacenes",
      bullets: ["Inventarios en tiempo real", "Picking optimizado", "Integración ERP"],
      image: "krkn.png",
      link: "https://krkn.mx/",
      accent: "from-purple-500/30 to-indigo-500/10",
      featured: true,
    },
    {
      id: 2,
      title: "Microsip",
      tagline: "ERP administrativo para empresas",
      bullets: ["Contabilidad", "Inventarios", "Facturación"],
      image: "mspPartner.png",
      link: "/MicroPage",
      target: "_blank",
      accent: "from-orange-500/30 to-red-500/10",
    },
    {
      id: 3,
      title: "Stick",
      tagline: "Señalización digital inteligente",
      bullets: ["Pantallas dinámicas", "Contenido remoto", "Programación automática"],
      image: "stick.png",
      link: "https://stick.mx/",
      accent: "from-emerald-500/30 to-green-500/10",
    },
    {
      id: 4,
      title: "BMKT",
      tagline: "Marketing digital y automatización",
      bullets: ["Campañas", "Analítica", "Leads"],
      image: "bmktW.png",
      link: "/Landing",
      target: "_blank",
      accent: "from-pink-500/30 to-fuchsia-500/10",
    },
    {
      id: 5,
      title: "HUM",
      tagline: "Gestión de talento humano",
      bullets: ["Reclutamiento", "Evaluaciones", "Seguimiento"],
      image: "fyttsaTalent.png",
      link: "https://fyttsatalent.com/",
      accent: "from-cyan-500/30 to-blue-500/10",
    },
    {
      id: 6,
      title: "K'MARENA",
      tagline: "Gestión de eventos y recintos",
      bullets: ["Reservas", "Control de acceso", "Administración"],
      image: "kma.png",
      link: "https://kmarena.com/",
      accent: "from-yellow-500/30 to-amber-500/10",
    },
  ];

  return (
    <section className="relative py-48 sm:py-56 md:py-72 lg:py-80 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-white/5 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 px-4">
            NUESTROS{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              PRODUCTOS
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-base sm:text-lg px-4">
            Soluciones tecnológicas diseñadas para escalar operaciones reales.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-[390px]">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  const Wrapper = ({ children }) =>
    card.link.startsWith("http") || card.target ? (
      <a href={card.link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <Link to={card.link}>{children}</Link>
    );

  return (
    <Wrapper>
      <div
        className={`group relative h-full rounded-3xl overflow-hidden border border-white/10
        bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm
        transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(255,255,255,0.18)]
        ${card.featured ? "lg:col-span-2" : ""}`}
      >
        {/* Accent */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Top (logo) */}
        <div className="relative z-10 flex items-center justify-center h-2/3 p-10">
          <img
            src={card.image}
            alt={card.title}
            className="max-h-32 object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Bottom reveal */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20
          translate-y-full group-hover:translate-y-0
          transition-transform duration-500
          bg-black/80 backdrop-blur-xl p-8"
        >
          <h3 className="text-2xl font-black text-white mb-2">
            {card.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4">{card.tagline}</p>

          <ul className="text-gray-300 text-sm space-y-1 mb-6">
            {card.bullets.map((b, i) => (
              <li key={i}>• {b}</li>
            ))}
          </ul>

          <span className="text-white font-bold text-sm inline-flex items-center gap-2">
            Explorar producto →
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default Carousel;
