import React from "react";
import { RefreshCw } from "lucide-react";

export default function PriceSummary({
  totals,
  paymentFrequency,
  setPaymentFrequency,
  userCount,
  exchangeRate,
  lastUpdate
}) {
  const formatMXN = (num) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(num);
  };

  const formatUSD = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  const totalUSD_in_MXN = totals.totalUSD * exchangeRate;

  const formatLastUpdate = () => {
    if (!lastUpdate) return "";
    const now = new Date();
    const diff = Math.floor((now - lastUpdate) / 1000 / 60); // minutos
    
    if (diff < 1) return "hace menos de 1 minuto";
    if (diff < 60) return `hace ${diff} minuto${diff > 1 ? 's' : ''}`;
    
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    
    return lastUpdate.toLocaleDateString('es-MX', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Frecuencia de pago:</h3>

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

      {totals.selectedVps && totals.selectedVps.length > 0 && (
        <div className="flex justify-between text-gray-900">
          <span>Plan VPS seleccionado:</span>
          <span>{totals.selectedVps[0].nombre}</span>
        </div>
      )}

      <div className="space-y-2 text-gray-900">
        <div className="flex justify-between">
          <span>Subtotal módulos:</span>
          <span>{formatMXN(totals.subtotalModulos || 0)}</span>
        </div>

        {totals.subtotalVpsMXN > 0 && (
          <div className="flex justify-between">
            <span>Subtotal VPS:</span>
            <span>{formatMXN(totals.subtotalVpsMXN || 0)}</span>
          </div>
        )}

        {totals.subtotalRentaHora > 0 && (
          <div className="flex justify-between">
            <span>Renta por hora:</span>
            <span>{formatMXN(totals.subtotalRentaHora || 0)}</span>
          </div>
        )}

        {totals.discountAmount > 0 && (
          <div className="flex justify-between text-orange-600">
            <span>Descuento total:</span>
            <span>- {formatMXN(totals.discountAmount || 0)}</span>
          </div>
        )}

        <div className="border-t pt-3 mt-3 flex justify-between text-lg font-bold">
          <span>Total en MXN ({paymentFrequency}):</span>
          <span>{formatMXN(totals.totalMXN || 0)}</span>
        </div>

        {userCount > 0 && (
          <>
            <div className="border-t pt-3 mt-3 flex justify-between text-lg font-bold text-orange-600">
              <span>Usuarios en la nube ({userCount}):</span>
              <span className="flex items-center gap-2">
                {formatUSD(totals.totalUSD || 0)}
                <span className="text-xs font-normal bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  USD
                </span>
              </span>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 ml-4 border border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Tipo de cambio USD → MXN:
                </span>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3 h-3 text-blue-600" />
                  <span className="text-sm font-bold text-blue-700">
                    ${exchangeRate.toFixed(2)} MXN
                  </span>
                </div>
              </div>
              
              {lastUpdate && (
                <div className="text-xs text-gray-500 flex items-center justify-end gap-1">
                  <span>Actualizado {formatLastUpdate()}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm text-gray-700 mt-2 pt-2 border-t border-blue-200">
                <span>≈ Equivalente en MXN:</span>
                <span className="font-semibold">{formatMXN(totalUSD_in_MXN)}</span>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-between text-gray-900">
          <span>Subtotal antes de IVA:</span>
          <span>{formatMXN(totals.totalMXN || 0)}</span>
        </div>

        <div className="flex justify-between text-gray-900">
          <span>IVA 16%:</span>
          <span>{formatMXN(totals.iva || 0)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3 mt-3">
          <span>Total con IVA:</span>
          <span>{formatMXN(totals.totalConIVA || 0)}</span>
        </div>

        <div className="border-t-2 border-orange-500 pt-4 mt-4 flex justify-between text-xl font-bold text-orange-600">
          <span>Total global:</span>
          <div className="text-right">
            <div>{formatMXN(totals.totalConIVA || 0)}</div>
            {userCount > 0 && (
              <div className="text-base text-blue-600">
                + {formatUSD(totals.totalGlobal.usd || 0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}