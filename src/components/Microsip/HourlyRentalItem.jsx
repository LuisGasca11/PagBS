import { X } from "lucide-react";

export default function HourlyRentalItem({
  index,
  rental,
  hourlyPricesDB,
  updateRental,
  removeRental,
  isAuthenticated,
}) {
  return (
    <div className="border rounded-lg p-4 flex flex-col md:flex-row items-center gap-4">
      <select
        className="border px-3 py-2 rounded w-full md:w-1/3 text-black"
        value={rental.module}
        disabled={!isAuthenticated}
        onChange={(e) => {
          const module = e.target.value;
          updateRental(index, "module", module);
          updateRental(index, "price", hourlyPricesDB[module] || 0);
        }}
      >
        <option value="">Selecciona un módulo</option>
        {Object.keys(hourlyPricesDB).map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <input
        type="number"
        className="border px-3 py-2 rounded w-full md:w-32 text-black"
        placeholder="$/hora"
        value={rental.price}
        onChange={(e) =>
          updateRental(index, "price", Number(e.target.value))
        }
        disabled={!isAuthenticated}
      />

      <input
        type="number"
        min={1}
        className="border px-3 py-2 rounded w-full md:w-24 text-black"
        value={rental.hours}
        onChange={(e) =>
          updateRental(index, "hours", Number(e.target.value))
        }
        disabled={!isAuthenticated}
      />

      <span className="font-semibold text-black">
        ${rental.price * rental.hours}
      </span>

      <button
        onClick={() => removeRental(index)}
        className={`${
          isAuthenticated
            ? "text-red-500 hover:text-red-700"
            : "text-gray-400 cursor-not-allowed"
        }`}
        disabled={!isAuthenticated}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
