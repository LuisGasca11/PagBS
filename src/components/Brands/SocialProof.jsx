import LogoLoop from "../ReactBits/LogoLoop";

export function SocialProof() {
  const companyLogos = [
    { src: "/mcsp.png", alt: "Microsip", href: "https://openai.com" },
    { src: "/krkn.png", alt: "KRKN", href: "https://stripe.com" },
    { src: "/fyttsaTalent.png", alt: "FYTTSA", href: "https://wise.com" },
    { src: "/stick.png", alt: "STICK", href: "https://loom.com" },
    { src: "/Sheep Icon.png", alt: "Linear", href: "https://linear.app" },
  ];

  const formatted = companyLogos.map((logo) => ({
    node: (
      <img
        src={logo.src}
        alt={logo.alt}
        className="h-16 w-auto object-contain black hover:opacity-100 transition"
      />
    ),
    title: logo.alt,
    href: logo.href,
  }));

  return (
    <section className="h-32 w-full bg-gradient-to-r from-black via-gray-800/40 to-black flex items-center">
      <div className="w-full">
        <LogoLoop
          logos={formatted}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={60}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="#00000000"
          scaleOnHover
        />
      </div>
    </section>

  );
}
