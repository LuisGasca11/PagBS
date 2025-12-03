import React, { useEffect, useState } from "react";

export default function VpsPlans() {
  const [plans, setPlans] = useState([]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("es-MX").format(num);
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/vps")
      .then((res) => res.json())
      .then(setPlans)
      .catch(() => setPlans([]));
  }, []);

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">VPS en la Nube</h2>

      <div className="space-y-10">
        {plans.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-10 rounded-3xl shadow-lg bg-gradient-to-r from-orange-500 to-orange-500 text-white"
          >
            <div>
              <h3 className="text-2xl font-bold">{p.nombre}</h3>
              <p className="text-lg mt-2">{p.vcores} vCores</p>
              <p className="text-lg">{p.memoria_gb} GB RAM</p>
              <p className="text-lg">{p.almacenamiento_gb} GB SSD</p>
            </div>

            <div className="text-right">
              <p className="text-4xl font-bold">${formatNumber(p.precio_mensual_nube)}</p>
              <p className="opacity-80 text-sm">/mes en la nube</p>

              <button className="mt-4 bg-black text-white font-semibold px-8 py-3 rounded-full hover:bg-cyan-300 transition">
                Seleccionar
              </button>
            </div>
          </div>
        ))}

        {plans.length === 0 && (
          <p className="text-gray-600 text-lg">No hay planes disponibles.</p>
        )}
      </div>
    </div>
  );
}
