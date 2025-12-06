import React, { useEffect, useState } from "react";
import { Server, Cpu, HardDrive, Users, Check, Plus, Minus } from "lucide-react";

export default function VpsPlans({ selectedVps, setSelectedVps, userCount, setUserCount }) {
  const [plans, setPlans] = useState([]);

  const formatUSD = (num) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);

  const formatMXN = (num) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(num);

  useEffect(() => {
    fetch("/api/vps")
      .then((res) => res.json())
      .then(setPlans)
      .catch(() => setPlans([]));
  }, []);

  const handleSelectPlan = (plan) => {
    const exists = selectedVps.some(v => v.id === plan.id);
    if (exists) {
      setSelectedVps(selectedVps.filter(v => v.id !== plan.id));
    } else {
      setSelectedVps([...selectedVps, plan]);
    }
  };

  return (
    <div className="mt-8 sm:mt-12 px-4 sm:px-0">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">VPS en la Nube</h2>

      <div className="space-y-4 sm:space-y-6 lg:space-y-8">

        {plans.map((p) => {
          const isSelected = selectedVps.some(v => v.id === p.id);

          const isUserPlan =
            p.vcores === null &&
            p.memoria_gb === null &&
            p.almacenamiento_gb === null;

          return (
            <div
              key={p.id}
              className={`
                flex flex-col lg:flex-row lg:items-center lg:justify-between 
                p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl 
                shadow-lg hover:shadow-xl transition-all duration-300 
                ${
                  isSelected
                    ? "bg-gradient-to-r from-orange-600 to-orange-700 ring-4 ring-orange-300 scale-[1.02]"
                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                } 
                text-white
              `}
            >
              {/* Left Side - Info */}
              <div className="flex-1 mb-6 lg:mb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {isUserPlan ? (
                      <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <Server className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">{p.nombre}</h3>
                </div>

                {isUserPlan ? (
                  <>
                    <p className="text-base sm:text-lg mt-2 opacity-90 mb-4">
                      {p.descripcion || "Usuarios almacenados en la nube"}
                    </p>

                    {/* CONTADOR DE USUARIOS - Mobile/Desktop */}
                    <div className="flex items-center mt-4 space-x-4">
                      <span className="text-sm sm:text-base font-medium opacity-90">Usuarios:</span>
                      <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <button
                          className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                          onClick={() => setUserCount(Math.max(userCount - 1, 0))}
                          aria-label="Disminuir usuarios"
                        >
                          <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        <span className="text-2xl sm:text-3xl font-bold min-w-[3rem] text-center">{userCount}</span>

                        <button
                          className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                          onClick={() => setUserCount(userCount + 1)}
                          aria-label="Aumentar usuarios"
                        >
                          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-base sm:text-lg">
                        <Cpu className="w-4 h-4 sm:w-5 sm:h-5 opacity-80" />
                        <span>{p.vcores} vCores</span>
                      </div>
                      <div className="flex items-center gap-2 text-base sm:text-lg">
                        <Server className="w-4 h-4 sm:w-5 sm:h-5 opacity-80" />
                        <span>{p.memoria_gb} GB RAM</span>
                      </div>
                      <div className="flex items-center gap-2 text-base sm:text-lg">
                        <HardDrive className="w-4 h-4 sm:w-5 sm:h-5 opacity-80" />
                        <span>{p.almacenamiento_gb} GB SSD</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right Side - Price & Action */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center lg:text-right gap-4 lg:gap-0 border-t lg:border-t-0 lg:border-l border-white/20 pt-6 lg:pt-0 lg:pl-8">
                <div>
                  <p className="text-3xl sm:text-4xl font-bold">
                    {isUserPlan 
                      ? formatUSD(p.precio_mensual_nube) 
                      : formatMXN(p.precio_mensual_nube)
                    }
                  </p>
                  <p className="opacity-80 text-xs sm:text-sm mt-1">
                    /mes en la nube
                  </p>
                </div>

                {!isUserPlan && (
                  <button
                    onClick={() => handleSelectPlan(p)}
                    className={`
                      font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full 
                      transition-all duration-300 flex items-center gap-2
                      hover:scale-105 active:scale-95 shadow-lg
                      ${
                        isSelected
                          ? "bg-white text-orange-600 hover:bg-gray-100"
                          : "bg-black text-white hover:bg-gray-800"
                      }
                    `}
                  >
                    {isSelected && <Check className="w-4 h-4 sm:w-5 sm:h-5" />}
                    <span className="text-sm sm:text-base">
                      {isSelected ? "Seleccionado" : "Seleccionar"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}