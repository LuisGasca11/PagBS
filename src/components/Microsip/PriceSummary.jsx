import React from "react";
import { RefreshCw, CheckCircle, DollarSign, Tag, Calculator, Percent } from "lucide-react";

export default function PriceSummary({
  totals,
  paymentFrequency,
  setPaymentFrequency,
  userCount,
  exchangeRate,
  lastUpdate,
  moduleSelections,
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
  
  const getPlanLabel = (planKey) => {
    const labels = {
      basico: "Básico",
      ligero: "Ligero",
      pro: "Pro",
      premium: "Premium",
      corporativo: "Corporativo",
      incrementos: "Incremento",
    };
    return labels[planKey] || planKey;
  };
  
  const selectedModules = Object.entries(moduleSelections)
    .sort(([nameA], [nameB]) => nameA.localeCompare(nameB));

  const getDiscountInfo = () => {
    const moduleCount = Object.keys(moduleSelections).length;
    let volumeDiscount = 0;
    let volumeText = "";
    if (moduleCount >= 5) {
      volumeDiscount = 15;
      volumeText = "5 o más módulos";
    } else if (moduleCount >= 3) {
      volumeDiscount = 10;
      volumeText = "3-4 módulos";
    } else if (moduleCount === 2) {
      volumeDiscount = 5;
      volumeText = "2 módulos";
    }

    let freqDiscount = 0;
    let freqText = "";
    if (paymentFrequency === "Anual") {
      freqDiscount = 10;
      freqText = "Pago anual";
    } else if (paymentFrequency === "Semestral") {
      freqDiscount = 5;
      freqText = "Pago semestral";
    }

    return { volumeDiscount, volumeText, freqDiscount, freqText };
  };

  const discountInfo = getDiscountInfo();
  const hasDiscounts = discountInfo.volumeDiscount > 0 || discountInfo.freqDiscount > 0;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8 border border-gray-100">
      
      <h2 className="text-xl sm:text-2xl font-extrabold text-orange-600 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
        <Calculator className="w-5 h-5 sm:w-6 sm:h-6"/> Resumen de Cotización
      </h2>

      {selectedModules.length > 0 && (
        <div className="mb-6 sm:mb-8 pb-4 border-b border-gray-200">
          <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600"/> Detalle de Módulos
          </h4>
          <div className="space-y-2 sm:space-y-3">
            {selectedModules.map(([name, data]) => (
              <div 
                key={name} 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-gray-700 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100 transition-shadow hover:shadow-md"
              >
                <span className="font-semibold text-gray-900 text-sm sm:text-base">{name}</span>
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                    {getPlanLabel(data.plan)}
                  </span>
                  <span className="font-bold text-base sm:text-lg text-gray-800 whitespace-nowrap">{formatMXN(data.price || 0)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 p-3 bg-orange-50/50 rounded-xl border border-orange-100 gap-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600"/> Frecuencia de pago:
        </h3>

        <select
          value={paymentFrequency}
          onChange={(e) => setPaymentFrequency(e.target.value)}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-orange-300 rounded-xl bg-white text-gray-800 font-medium shadow-sm focus:ring-orange-500 focus:border-orange-500 transition-all cursor-pointer text-sm sm:text-base"
        >
          <option value="Mensual">Mensual</option>
          <option value="Semestral">Semestral (5% desc.)</option>
          <option value="Anual">Anual (10% desc.)</option>
        </select>
      </div>

      <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base">
        
        <div className="flex justify-between items-center border-b border-dashed pb-2">
          <span className="font-medium">Subtotal módulos:</span>
          <span className="font-semibold text-gray-800">{formatMXN(totals.subtotalModulos || 0)}</span>
        </div>

        {totals.subtotalVpsMXN > 0 && (
          <div className="flex justify-between items-center border-b border-dashed pb-2">
            <span className="font-medium">Subtotal VPS:</span>
            <span className="font-semibold text-gray-800">{formatMXN(totals.subtotalVpsMXN)}</span>
          </div>
        )}

        {totals.subtotalRentaHora > 0 && (
          <div className="flex justify-between items-center border-b border-dashed pb-2">
            <span className="font-medium">Renta por hora:</span>
            <span className="font-semibold text-gray-800">{formatMXN(totals.subtotalRentaHora)}</span>
          </div>
        )}

        {selectedModules.length > 0 && hasDiscounts && (
          <div className="bg-green-50 rounded-xl p-3 sm:p-4 border border-green-200 space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 text-green-800 font-bold mb-2 text-sm sm:text-base">
              <Percent className="w-4 h-4 sm:w-5 sm:h-5"/>
              <span>Descuentos aplicados a módulos:</span>
            </div>

            {discountInfo.volumeDiscount > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm pl-0 sm:pl-7 gap-1">
                <span className="text-green-700">
                  • Por cantidad ({discountInfo.volumeText}):
                </span>
                <span className="font-bold text-green-800">
                  {discountInfo.volumeDiscount}% = {formatMXN(totals.volumeDiscountAmount || 0)}
                </span>
              </div>
            )}

            {discountInfo.freqDiscount > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm pl-0 sm:pl-7 gap-1">
                <span className="text-green-700">
                  • Por frecuencia ({discountInfo.freqText}):
                </span>
                <span className="font-bold text-green-800">
                  {discountInfo.freqDiscount}% = {formatMXN(totals.freqDiscountAmount || 0)}
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 border-t border-green-300 font-bold text-green-900 text-sm sm:text-base gap-1">
              <span>Total descuento en módulos:</span>
              <span className="text-base sm:text-lg">- {formatMXN(totals.discountAmount)}</span>
            </div>
          </div>
        )}

        {userCount > 0 && (
          <>
            <div className="border-y border-gray-300 py-3 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center font-bold text-orange-700 bg-orange-50 rounded-lg p-2 sm:p-3 gap-2">
              <span className="flex items-center gap-2 text-sm sm:text-base">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5"/> Costo Usuarios en la Nube ({userCount}):
              </span>
              <span className="text-lg sm:text-xl">{formatUSD(totals.totalUSD)}</span>
            </div>

            <div className="bg-blue-50 rounded-xl p-3 sm:p-4 ml-0 sm:ml-2 border border-blue-200 shadow-inner">
              <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm items-start sm:items-center gap-1 sm:gap-2">
                <span className="text-blue-700 font-medium">Tipo de cambio USD → MXN:</span>
                <span className="font-extrabold text-blue-800 text-base sm:text-lg">${exchangeRate.toFixed(2)}</span>
              </div>

              <div className="flex justify-end text-xs text-gray-500 mt-1 mb-2 border-b border-blue-100 pb-2">
                {lastUpdate && (
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-3 h-3"/> Actualizado {formatLastUpdate()}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between text-sm sm:text-base mt-2 pt-2 gap-1 sm:gap-2">
                <span className="font-medium text-gray-800">Total USD convertido a MXN:</span>
                <span className="font-extrabold text-orange-700">
                  {formatMXN(totals.totalUSDinMXN)}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col sm:flex-row justify-between border-t border-gray-300 pt-4 mt-4 font-extrabold text-gray-800 text-base sm:text-lg gap-1 sm:gap-2">
          <span>Subtotal antes de IVA:</span>
          <span>{formatMXN(totals.subtotalAntesIVA)}</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between text-gray-600 text-sm sm:text-base gap-1">
          <span>IVA 16%:</span>
          <span className="font-semibold">{formatMXN(totals.iva)}</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between text-lg sm:text-xl font-extrabold border-t-4 border-orange-500 pt-4 mt-4 bg-orange-50/70 p-3 rounded-lg shadow-inner gap-1 sm:gap-2">
          <span className="text-orange-800">TOTAL CON IVA:</span>
          <span className="text-orange-900">{formatMXN(totals.totalConIVA)}</span>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.4s ease-out backwards;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
