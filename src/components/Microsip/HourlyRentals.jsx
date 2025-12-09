import React from "react";
import HourlyRentalItem from "./HourlyRentalItem";
import { X } from "lucide-react";

export default function HourlyRentals({
  hourRentals,
  setHourRentals,
  hourlyPricesDB,
  selectedModules,
  isAuthenticated,
}) {
  const addRental = () => {
    setHourRentals((prev) => [
      ...prev,
      { module: "", price: 0, hours: 1 },
    ]);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8 opacity-70 pointer-events-none">
        <h3 className="text-xl font-bold text-black mb-4">
          Implementación de módulos por Hora
        </h3>

        <p className="text-gray-600">
          🔒 Esta sección está disponible solo para usuarios logueados.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h3 className="text-xl font-bold text-black mb-6">
        Implementaciones por Hora
      </h3>

      <button
        onClick={addRental}
        className="mb-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
      >
        + Añadir implementación de módulo por hora
      </button>

      {hourRentals.length === 0 && (
        <p className="text-black">No hay implementaciones agregadas.</p>
      )}

      <div className="space-y-4">
        {hourRentals.map((r, i) => (
          <HourlyRentalItem
            key={i}
            index={i}
            rental={r}
            hourlyPricesDB={hourlyPricesDB}
            selectedModules={selectedModules}   
            updateRental={(...args) => {
              if (isAuthenticated) return setHourRentals(prev =>
                prev.map((r, idx) =>
                  idx === args[0] ? { ...r, [args[1]]: args[2] } : r
                )
              );
            }}
            removeRental={() => {
              if (isAuthenticated)
                setHourRentals(prev => prev.filter((_, idx) => idx !== i));
            }}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
}
