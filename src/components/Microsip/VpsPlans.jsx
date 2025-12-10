import React, { useEffect, useState } from "react";
import { Server, Cpu, HardDrive, Users, Check, Plus, Minus } from "lucide-react";

export default function VpsPlans({ 
  selectedVps, 
  setSelectedVps, 
  userCount, 
  setUserCount,
  localUserSelected,
  setLocalUserSelected
}) {
  const [plans, setPlans] = useState([]);

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
        if (userCount > 0 || selectedVps.length > 0) {
          alert("Al seleccionar Usuario Local se deshabilitarán los Usuarios en la Nube y VPS.");
        }
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
      }
    }
  };

  const handleUserCountChange = (delta) => {
    if (localUserSelected) {
      return; 
    }
    
    const newCount = Math.max(userCount + delta, 0);
    setUserCount(newCount);
  };

  return (
    <div className="mt-8 sm:mt-12 px-4 sm:px-0">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">VPS en la Nube</h2>

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

          const disableThisPlan = localUserSelected && !isLocalUserPlan;

          return (
            <div
              key={p.id}
              className={`
                flex flex-col lg:flex-row lg:items-center lg:justify-between 
                p-6 sm:p-8 lg:p-10 rounded-2xl
                transition-all duration-300 shadow-lg

                ${isSelected
                  ? "bg-gradient-to-r from-orange-600 to-orange-700 ring-4 ring-orange-300 scale-[1.02]"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                }

                ${disableThisPlan ? "opacity-40 pointer-events-none" : ""}
              `}
            >
              <div className="flex-1 mb-6 lg:mb-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    {isCloudUserPlan ? <Users /> : <Server />}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">{p.nombre}</h3>
                </div>

                {isCloudUserPlan ? (
                  <>
                    <p className="text-base sm:text-lg mt-2 opacity-90 mb-4">
                      {p.descripcion || "Usuario individual almacenado en la nube"}
                    </p>

                    <div className="flex items-center mt-4 space-x-4">
                      <span className="font-medium opacity-90">Usuarios:</span>

                      <div className="flex items-center space-x-3 bg-black/20 rounded-full px-4 py-2">
                        <button
                          disabled={localUserSelected}
                          onClick={() => handleUserCountChange(-1)}
                          className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            transition-all duration-200
                            ${localUserSelected ? "opacity-40 cursor-not-allowed" : "hover:bg-white/30 hover:scale-110"}
                          `}
                        >
                          <Minus />
                        </button>

                        <span className="text-3xl font-bold min-w-[3rem] text-center">{userCount}</span>

                        <button
                          disabled={localUserSelected}
                          onClick={() => handleUserCountChange(1)}
                          className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            transition-all duration-200
                            ${localUserSelected ? "opacity-40 cursor-not-allowed" : "hover:bg-white/30 hover:scale-110"}
                          `}
                        >
                          <Plus />
                        </button>
                      </div>
                    </div>
                  </>
                ) : isLocalUserPlan ? (
                  <p className="text-base sm:text-lg mt-2 opacity-90 mb-4">
                    Usuario local (sin costo, sin almacenamiento en la nube)
                  </p>
                ) : (
                  <>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2">
                        <Cpu /> {p.vcores} vCores
                      </div>
                      <div className="flex items-center gap-2">
                        <Server /> {p.memoria_gb} GB RAM
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive /> {p.almacenamiento_gb} GB SSD
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col items-end gap-4 border-t lg:border-t-0 lg:border-l border-white/20 pt-6 lg:pt-0 lg:pl-8">
                <p className="text-4xl font-bold">
                  {isCloudUserPlan 
                    ? formatUSD(p.precio_mensual_nube) 
                    : formatMXN(p.precio_mensual_nube)}
                </p>
                <p className="opacity-80 text-sm">/mes en la nube</p>

                {!isCloudUserPlan && (
                  <button
                    disabled={disableThisPlan}
                    onClick={() => handleSelectPlan(p)}
                    className={`
                      px-8 py-3 rounded-full shadow-lg font-semibold
                      transition-all duration-300
                      ${isSelected ? "bg-white text-orange-600" : "bg-black text-white hover:bg-gray-900"}
                      ${disableThisPlan ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}
                    `}
                  >
                    {isSelected ? "Seleccionado" : "Seleccionar"}
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