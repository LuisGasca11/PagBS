import React, { useEffect, useState } from "react";

export default function VpsPlans({ selectedVps, setSelectedVps, userCount, setUserCount }) {
  const [plans, setPlans] = useState([]);

  const formatUSD = (num) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);

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
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">VPS en la Nube</h2>

      <div className="space-y-10">

        {plans.map((p) => {
          const isSelected = selectedVps.some(v => v.id === p.id);

          const isUserPlan =
            p.vcores === null &&
            p.memoria_gb === null &&
            p.almacenamiento_gb === null;

          return (
            <div
              key={p.id}
              className={`flex items-center justify-between p-10 rounded-3xl shadow-lg transition-all duration-300 ${
                isSelected
                  ? "bg-gradient-to-r from-orange-600 to-orange-700 ring-4 ring-orange-300"
                  : "bg-gradient-to-r from-orange-500 to-orange-500"
              } text-white`}
            >
              <div>
                <h3 className="text-2xl font-bold">{p.nombre}</h3>

                {isUserPlan ? (
                  <>
                    <p className="text-lg mt-2 opacity-90">
                      {p.descripcion || "Usuarios almacenados en la nube"}
                    </p>

                    {/* CONTADOR DE USUARIOS */}
                    <div className="flex items-center mt-4 space-x-3">
                      <button
                        className="bg-black text-white px-3 py-1 rounded-full"
                        onClick={() => setUserCount(Math.max(userCount - 1, 0))}
                      >
                        -
                      </button>

                      <span className="text-2xl font-bold">{userCount}</span>

                      <button
                        className="bg-black text-white px-3 py-1 rounded-full"
                        onClick={() => setUserCount(userCount + 1)}
                      >
                        +
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-lg mt-2">{p.vcores} vCores</p>
                    <p className="text-lg">{p.memoria_gb} GB RAM</p>
                    <p className="text-lg">{p.almacenamiento_gb} GB SSD</p>
                  </>
                )}
              </div>

              <div className="text-right">
                <p className="text-4xl font-bold">{formatUSD(p.precio_mensual_nube)}</p>
                <p className="opacity-80 text-sm">/mes en la nube</p>

                {!isUserPlan && (
                  <button
                    onClick={() => handleSelectPlan(p)}
                    className={`mt-4 font-semibold px-8 py-3 rounded-full transition-all duration-300 ${
                      isSelected
                        ? "bg-white text-orange-600 hover:bg-gray-100"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    {isSelected ? "✓ Seleccionado" : "Seleccionar"}
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
