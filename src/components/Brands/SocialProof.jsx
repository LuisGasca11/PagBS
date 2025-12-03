import LogoLoop from "../ReactBits/LogoLoop";

export function SocialProof() {
  const companyLogos = [
    { src: "/fyttg.png", alt: "FYTTSA", href: "https://stripe.com", height: "h-[120px]" },  
    { src: "/gmn.png", alt: "Gouman", href: "https://linear.app", height: "h-[150px]" }, 
    { src: "/ely.png", alt: "ELYSSIA", href: "https://linear.app", height: "h-[50px]" },  
  ];

  const formatted = companyLogos.map((logo) => ({
    node: (
      <img
        src={logo.src}
        alt={logo.alt}
        className={`${logo.height} w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100`} 
      />
    ),
    title: logo.alt,
    href: logo.href,
  }));

  return (
    <section className="h-32 w-full flex items-center">
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
