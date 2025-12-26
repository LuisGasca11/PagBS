import { Details } from "../ui/Details";
import { X } from "lucide-react";
import clsx from "clsx";

const faqData = [
  {
    title: "¿Qué es Black Sheep y quiénes pueden usar nuestras soluciones?",
    content:
      "Black Sheep es una empresa de desarrollo de software especializada en sistemas empresariales: gestión de proyectos, personal, inventarios, almacenes, e-commerce y señalización digital. Nuestras plataformas están diseñadas para empresas que buscan orden, eficiencia y tecnología flexible que se adapte a sus procesos.",
  },
  {
    title: "¿Puedo integrar sus soluciones con mis herramientas actuales?",
    content:
      "Sí. Desarrollamos integraciones personalizadas con ERPs, CRMs, puntos de venta, sistemas contables y herramientas internas. Además, como partners de Microsip, conectamos módulos para lograr flujos 100% integrados.",
  },
  {
    title: "¿Cómo saber qué proyecto o plataforma necesito?",
    content:
      "Analizamos tu operación, detectamos cuellos de botella y diseñamos la solución que mejor se adapta a tu empresa. No importa si necesitas un sistema completo o una herramienta puntual: construimos justo lo necesario para hacer tu proceso más eficiente.",
  },
  {
    title: "¿Qué beneficios ofrece trabajar con Black Sheep?",
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Reducción de tiempos operativos</li>
        <li>Automatización de procesos clave</li>
        <li>Mayor control y visibilidad del negocio</li>
        <li>Integraciones profundas entre sistemas</li>
        <li>Implementaciones escalables y mantenimiento continuo</li>
      </ul>
    ),
  },
  {
    title: "¿Qué tan seguros están mis datos?",
    content:
      "Tomamos la seguridad como prioridad. Usamos buenas prácticas de cifrado, control de accesos, auditoría y manejo aislado de datos. Tus operaciones permanecen protegidas bajo estándares modernos de seguridad de software.",
  },
  {
    title: "¿Ofrecen soporte o mantenimiento después del desarrollo?",
    content:
      "Sí. Brindamos soporte técnico, mantenimiento evolutivo, mejoras continuas y acompañamiento para asegurar que tu plataforma siga creciendo contigo.",
  },
  {
    title: "¿Trabajan con empresas de cualquier tamaño?",
    content:
      "Sí. Hemos desarrollado soluciones para pymes, corporativos y startups. Ajustamos cada proyecto según necesidades, presupuesto y escala.",
  },
  {
    title: "¿Puedo solicitar una demo o una consultoría?",
    content:
      "Claro. Podemos mostrarte ejemplos reales, módulos funcionales o analizar tu caso para recomendar la mejor solución.",
  },
];

export function FAQSection() {
  return (
    <section className="w-full py-16 md:py-24 px-5 relative flex flex-col justify-center items-center bg-black">
      {/* Background Effects */}
      <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-white/10 blur-[100px] z-0" />
      
      {/* Header */}
      <div className="relative z-10 text-center mb-12 md:mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
          Preguntas Frecuentes
        </h2>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-medium">
          Todo lo que necesitas saber sobre nuestras soluciones y cómo pueden
          impulsar tu operación.
        </p>
      </div>

      {/* FAQ Items */}
      <Details className="relative z-10 w-full max-w-3xl space-y-4">
        {faqData.map((item, index) => (
          <Details.Item
            key={index}
            className="group rounded-2xl border border-white/10 bg-white/5 transition duration-500 hover:bg-white/[0.075] hover:border-white/20"
          >
            {({ isActive, toggle }) => (
              <>
                <div 
                  className="flex cursor-pointer items-center justify-between p-5 md:p-6" 
                  onClick={toggle}
                >
                  <div className="text-white text-base md:text-lg font-semibold pr-4 transition group-hover:text-white/90">
                    {item.title}
                  </div>

                  <div className="relative flex-shrink-0">
                    <X
                      className={clsx(
                        { "rotate-180": isActive, "rotate-45": !isActive },
                        "h-6 w-6 text-white/50 transition-transform duration-500 group-hover:text-white/70",
                      )}
                    />
                  </div>
                </div>

                <Details.Content className="overflow-hidden px-5 md:px-6 transition-all duration-500 will-change-[height]">
                  <div className="pb-5 md:pb-6 text-sm md:text-base font-light leading-relaxed text-white/70">
                    {item.content}
                  </div>
                </Details.Content>
              </>
            )}
          </Details.Item>
        ))}
      </Details>
    </section>
  );
}
