import React from "react";
import { RefreshCw } from "lucide-react";

export default function PriceSummary({
  totals,
  paymentFrequency,
  setPaymentFrequency,
  userCount,
  exchangeRate,
  lastUpdate,
}) {
  const formatMXN = (num) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(num);

  const formatUSD = (num) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);

  const formatLastUpdate = () => {
    if (!lastUpdate) return "";
    const now = new Date();
    const diff = Math.floor((now - lastUpdate) / 1000 / 60);

    if (diff < 1) return "hace menos de 1 minuto";
    if (diff < 60) return `hace ${diff} minuto${diff > 1 ? "s" : ""}`;

    const hours = Math.floor(diff / 60);
    if (hours < 24) return `hace ${hours} hora${hours > 1 ? "s" : ""}`;

    return lastUpdate.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Frecuencia de pago:
        </h3>

        <select
          value={paymentFrequency}
          onChange={(e) => setPaymentFrequency(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-900"
        >
          <option value="Mensual">Mensual</option>
          <option value="Semestral">Semestral (5% descuento)</option>
          <option value="Anual">Anual (10% descuento)</option>
        </select>
      </div>

      <div className="space-y-2 text-gray-900">
        <div className="flex justify-between">
          <span>Subtotal módulos:</span>
          <span>{formatMXN(totals.subtotalModulos || 0)}</span>
        </div>

        {totals.subtotalVpsMXN > 0 && (
          <div className="flex justify-between">
            <span>Subtotal VPS:</span>
            <span>{formatMXN(totals.subtotalVpsMXN)}</span>
          </div>
        )}

        {totals.subtotalRentaHora > 0 && (
          <div className="flex justify-between">
            <span>Renta por hora:</span>
            <span>{formatMXN(totals.subtotalRentaHora)}</span>
          </div>
        )}

        {totals.discountAmount > 0 && (
          <div className="flex justify-between text-orange-600">
            <span>Descuento total:</span>
            <span>- {formatMXN(totals.discountAmount)}</span>
          </div>
        )}

        {userCount > 0 && (
          <>
            <div className="border-t pt-3 mt-3 flex justify-between font-bold text-orange-600">
              <span>Usuarios en la nube ({userCount}):</span>
              <span>{formatUSD(totals.totalUSD)}</span>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 ml-4 border border-blue-200">
              <div className="flex justify-between text-sm">
                <span>Tipo de cambio USD → MXN:</span>
                <span className="font-bold">${exchangeRate.toFixed(2)}</span>
              </div>

              {lastUpdate && (
                <div className="text-xs text-gray-500 text-right">
                  Actualizado {formatLastUpdate()}
                </div>
              )}

              <div className="flex justify-between text-sm mt-2 border-t pt-2">
                <span>USD convertido a MXN:</span>
                <span className="font-semibold">
                  {formatMXN(totals.totalUSDinMXN)}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-between border-t pt-3 mt-3 font-bold">
          <span>Subtotal antes de IVA:</span>
          <span>{formatMXN(totals.subtotalAntesIVA)}</span>
        </div>

        <div className="flex justify-between">
          <span>IVA 16%:</span>
          <span>{formatMXN(totals.iva)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
          <span>Total con IVA:</span>
          <span>{formatMXN(totals.totalConIVA)}</span>
        </div>
      </div>
    </div>
  );
}
