export default function PriceSummary({
  totals,
  paymentFrequency,
  setPaymentFrequency,
  userCount,
  exchangeRate
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
            
            <div className="flex justify-between text-sm text-gray-600 ml-4">
              <span>≈ Equivalente en MXN (TC: ${exchangeRate}):</span>
              <span>{formatMXN(totalUSD_in_MXN)}</span>
            </div>
          </>
        )}

        <div className="border-t-2 border-orange-500 pt-4 mt-4 flex justify-between text-xl font-bold text-orange-600">
          <span>Total global:</span>
          <div className="text-right">
            <div>{formatMXN(totals.totalGlobal.mxn || 0)}</div>
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