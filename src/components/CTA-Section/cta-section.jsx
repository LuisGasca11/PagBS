export function CTASection() {
  return (
    <section className="w-full pt-20 md:pt-60 lg:pt-60 pb-10 md:pb-20 px-5 relative flex flex-col justify-center items-center overflow-visible">
      <div className="relative z-10 flex flex-col justify-start items-center gap-9 max-w-4xl mx-auto">
        <div className="flex flex-col justify-start items-center gap-4 text-center">
          <h2 className="text-foreground text-4xl md:text-5xl lg:text-[68px] font-semibold leading-tight md:leading-tight lg:leading-[76px] break-words max-w-[435px]">
            Automatiza. Optimiza. Crece.
          </h2>
          <p className="text-muted-foreground text-sm md:text-base font-medium leading-[18.20px] md:leading-relaxed break-words max-w-2xl">
            Transforma tus procesos con herramientas diseñadas para aumentar
            eficiencia, control y productividad.
          </p>
        </div>

        {/* <button className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          Sign up for free
        </button> */}
      </div>
    </section>
  );
}
