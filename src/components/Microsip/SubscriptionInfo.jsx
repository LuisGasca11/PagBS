import { Check } from "lucide-react";

export default function SubscriptionInfo() {


  return (
    <div className="w-full flex flex-col">
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl md:text-4xl lg:text-7xl font-bold leading-tight text-black">
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
    </div>
  );
}
