import { Check } from "lucide-react";

export default function SubscriptionInfo() {
  const features = [
    "Siempre tienes acceso a la última versión Microsip",
    "No pagas actualizaciones",
    "Sin contratos de tiempos forzosos",
    "Ajusta módulos y usuarios en cualquier momento",
    "Acceso a nuevas mejoras",
    "Descuentos especiales por frecuencia de pago",
  ];

  return (
    <div className="w-full flex flex-col mb-16">

        <div className="w-full max-w-6xl mb-14">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-black">
            Conoce el precio estimado de{" "}
            <span className="text-orange-500 whitespace-nowrap">Microsip</span>{" "}
            <span className="whitespace-nowrap">para tu empresa</span>
          </h1>

          <p className="text-black mt-20 text-base md:text-2xl">
            Selecciona los módulos que necesitas
          </p>

          <p className="text-gray-500 text-[17px] mt-2 max-w-6xl font-sora">
            Para cada módulo, escoge el plan (Básico, Ligero, Pro, Premium o Corporativo).
            Si es Corporativo, especifica el número de usuarios en incrementos de 5 (10 a 50).
          </p>
        </div>

      <div className="flex justify-center w-full">
        <div className="max-w-md w-full">
          <div className="relative bg-orange-100 rounded-2xl shadow-xl p-8 border-2 border-orange-500">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                SUSCRIPCIÓN
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {features.map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1" />
                  <p className="text-sm text-gray-900">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
