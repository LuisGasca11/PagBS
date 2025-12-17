import React, { useEffect, useState } from "react";
import { Server, Cpu, HardDrive, Users, Check, Plus, Minus, DollarSign, Asterisk } from "lucide-react";

export default function VpsPlans({ 
  selectedVps, 
  setSelectedVps, 
  userCount, 
  setUserCount,
  localUserSelected,
  setLocalUserSelected
}) {
  const [plans, setPlans] = useState([]);
  const [showConditions, setShowConditions] = useState(false);

  const formatUSD = (num) =>
    new Intl.NumberFormat("en-US", { 
      style: "currency", 
      currency: "USD",
      minimumFractionDigits: 0 
    }).format(num);

  const formatMXN = (num) =>
    new Intl.NumberFormat("es-MX", { 
      style: "currency", 
      currency: "MXN",
      minimumFractionDigits: 0 
    }).format(num);

  useEffect(() => {
    fetch("/api/vps")
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
      })
      .catch(() => setPlans([]));
  }, []);

  const getPlanType = (plan) => {
    if ((plan.vcores === null || plan.vcores === undefined) &&
        (plan.memoria_gb === null || plan.memoria_gb === undefined) &&
        (plan.almacenamiento_gb === null || plan.almacenamiento_gb === undefined) &&
        plan.precio_mensual_nube > 0) {
      return "cloud_user";
    }

    const isLocalByValues = 
      (plan.precio_mensual_nube === 0 || plan.precio_mensual_nube === null) &&
      (plan.vcores === 0 || plan.vcores === null) &&
      (plan.memoria_gb === 0 || plan.memoria_gb === null) &&
      (plan.almacenamiento_gb === 0 || plan.almacenamiento_gb === null);
    
    const isLocalByName = plan.nombre && plan.nombre.toLowerCase().includes("local");

    if (isLocalByValues || isLocalByName) {
      return "local_user";
    }

    if (plan.vcores > 0 || plan.memoria_gb > 0 || plan.almacenamiento_gb > 0) {
      return "vps";
    }

    return "unknown";
  };

  const handleSelectPlan = (plan) => {
    const planType = getPlanType(plan);

    if (planType === "local_user") {
      const isCurrentlySelected = localUserSelected;
      
      if (isCurrentlySelected) {
        setLocalUserSelected(false);
      } else {
        setLocalUserSelected(true);
        setUserCount(0);
        setSelectedVps([]);
      }
      return;
    }

    if (planType === "vps") {
      const isSelected = selectedVps.some(v => v.id === plan.id);

      if (isSelected) {
        setSelectedVps([]);
      } else {
        setSelectedVps([plan]);
        setLocalUserSelected(false);
      }
    }
  };

  const handleUserCountChange = (delta) => {
    const newCount = Math.max(userCount + delta, 0);
    setUserCount(newCount);
  };

  return (
    <div className="px-4 sm:px-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
          <Server className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Servicios en la Nube</h2>
      </div>

      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {plans.map((p) => {
          const planType = getPlanType(p);

          const isCloudUserPlan = planType === "cloud_user";
          const isLocalUserPlan = planType === "local_user";
          const isVpsPlan = planType === "vps";

          const isSelected =
            isLocalUserPlan
              ? localUserSelected
              : isVpsPlan && selectedVps.some(v => v.id === p.id);
          
          const anyVpsSelected = selectedVps.length > 0;
          
          let disableThisPlan = false;
          
          if (localUserSelected) {
            disableThisPlan = !isLocalUserPlan;
          } else if (anyVpsSelected) {
            if (isCloudUserPlan) {
              disableThisPlan = false; 
            } else {
              disableThisPlan = isLocalUserPlan || (isVpsPlan && !isSelected);
            }
          }

          return (
            <div
              key={p.id}
              className={`
                flex flex-col lg:flex-row lg:items-center lg:justify-between 
                p-6 sm:p-8 lg:p-10 rounded-2xl border-2
                transition-all duration-300 shadow-xl

                ${isSelected
                  ? "bg-gradient-to-br from-orange-500 to-orange-600 border-orange-500 ring-4 ring-orange-200 scale-[1.02]"
                  : "bg-orange-500 border-orange-200 hover:border-orange-400 hover:shadow-2xl"
                }

                ${disableThisPlan ? "opacity-40 pointer-events-none grayscale-[0.5]" : ""}
              `}
            >
              <div className="flex-1 mb-6 lg:mb-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center shadow-md
                    ${isSelected 
                      ? "bg-gradient-to-br from-orange-500 to-orange-600" 
                      : "bg-gradient-to-br from-orange-400 to-orange-500"
                    }
                  `}>
                    {isCloudUserPlan ? (
                      <Users className="w-6 h-6 text-white" />
                    ) : (
                      <Server className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${
                    isSelected ? "text-white" : "text-white"
                  }`}>
                    {p.nombre}
                  </h3>
                </div>
                  
                {isCloudUserPlan ? (
                  <>
                    <p className="text-base sm:text-lg mt-2 text-white mb-6">
                      {p.descripcion || "Usuario individual almacenado en la nube"}
                    </p>

                    <div className="flex items-center mt-4 space-x-4">
                      <span className="font-semibold text-white">Usuarios:</span>

                      <div className={`
                        flex items-center space-x-3 rounded-full px-5 py-2 shadow-md
                        ${isSelected 
                          ? "bg-white" 
                          : "bg-white"
                        }
                      `}>
                        <button
                          disabled={disableThisPlan}
                          onClick={() => handleUserCountChange(-1)}
                          className={`
                            w-10 h-10 rounded-full flex items-center justify-center text-white
                            transition-all duration-200 bg-black/20
                            ${disableThisPlan ? "opacity-40 cursor-not-allowed" : "hover:bg-black/30 hover:scale-110 active:scale-95"}
                          `}
                        >
                          <Minus className="w-5 h-5 text-black" />
                        </button>

                        <span className="text-3xl font-bold min-w-[3rem] text-center text-black">
                          {userCount}
                        </span>

                        <button
                          disabled={disableThisPlan}
                          onClick={() => handleUserCountChange(1)}
                          className={`
                            w-10 h-10 rounded-full flex items-center justify-center text-white
                            transition-all duration-200 bg-black/20
                            ${disableThisPlan ? "opacity-40 cursor-not-allowed" : "hover:bg-black/30 hover:scale-110 active:scale-95"}
                          `}
                        >
                          <Plus className="w-5 h-5 text-black" />
                        </button>
                      </div>
                    </div>
                    
                    {isCloudUserPlan && (
                      <div className="mt-6 pt-4 border-t border-white/40">
                        <div className="flex items-start gap-2 max-w-3xl">
                          <Asterisk className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                          <p className="text-xs sm:text-sm text-white leading-relaxed whitespace-nowrap italic">
                            El precio se basa en el número de usuarios y se encuentra en dólares
                            americanos de acuerdo al tipo de cambio vigente.
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                ) : isLocalUserPlan ? (
                  <div>
                    <p className="text-base sm:text-lg mt-2 text-white mb-3">
                      Usuario local (sin costo, sin almacenamiento en la nube)
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      <Check className="w-4 h-4" />
                      Sin costo adicional
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Cpu className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="font-medium">{p.vcores} vCores</span>
                      </div>
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Server className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="font-medium">{p.memoria_gb} GB RAM</span>
                      </div>
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                          <HardDrive className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="font-medium">{p.almacenamiento_gb} GB SSD</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className={`
                flex flex-col items-end gap-4 border-t lg:border-t-0 lg:border-l 
                pt-6 lg:pt-0 lg:pl-8
                ${isSelected ? "border-orange-300" : "border-gray-200"}
              `}>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <p className={`text-4xl sm:text-5xl font-bold ${
                      isSelected ? "text-white" : "text-white"
                    }`}>
                      {isCloudUserPlan 
                        ? formatUSD(p.precio_mensual_nube) 
                        : formatMXN(p.precio_mensual_nube)}
                    </p>
                    {isCloudUserPlan && (
                      <span className="px-2 py-1 text-white text-lg font-bold rounded-md">
                        USD
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-end gap-1">
                    <p className={`text-base ${
                      isSelected ? "text-white" : "text-white"
                    }`}>
                      / Mes
                    </p>
                    {(isCloudUserPlan || isLocalUserPlan) && (
                      <p className={`text-base ${
                        isSelected ? "text-white" : "text-white"
                      }`}>
                        / Usuario
                      </p>
                    )}
                  </div>
                </div>

                {!isCloudUserPlan && (
                  <button
                    disabled={disableThisPlan}
                    onClick={() => handleSelectPlan(p)}
                    className={`
                      px-8 py-3 rounded-xl font-semibold text-base
                      transition-all duration-300 shadow-lg
                      ${isSelected 
                        ? "bg-white to-orange-600 text-black ring-2 ring-orange-300" 
                        : "bg-white text-black hover:bg-gray-300"
                      }
                      ${disableThisPlan ? "opacity-40 cursor-not-allowed" : "hover:scale-105 active:scale-95"}
                    `}
                  >
                    {isSelected ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        Seleccionado
                      </span>
                    ) : (
                      "Seleccionar"
                    )}
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