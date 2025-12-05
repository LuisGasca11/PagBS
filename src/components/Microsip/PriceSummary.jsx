export default function PriceSummary({
  totals,
  paymentFrequency,
  setPaymentFrequency,
  userCount,
  exchangeRate
}) {
  const totalUSD = totals.totalUSD;
  const totalUSD_in_MXN = totalUSD * exchangeRate;
  const totalFinal = totals.totalMXN;

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
          <span>${totals.subtotalModulos}</span>
        </div>

        {totals.subtotalRentaHora > 0 && (
          <div className="flex justify-between">
            <span>Renta por hora:</span>
            <span>${totals.subtotalRentaHora}</span>
          </div>
        )}

        <div className="border-t pt-3 mt-3 flex justify-between text-lg font-bold">
          <span>Total en MXN ({paymentFrequency}):</span>
          <span>
            {totals.totalMXN.toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN",
            })}
          </span>
        </div>

        {userCount > 0 && (
          <div className="flex justify-between text-lg mt-2">
            <span>Usuarios en la nube ({userCount}):</span>
            <span>
              {totals.totalUSD.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>
        )}

        {userCount > 0 && (
          <>
            <div className="flex justify-between text-lg mt-2">
              <span>Usuarios en la nube USD({userCount}):</span>
              <span>
                {totalUSD.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Equivalente en MXN:</span>
              <span>
                {totalUSD_in_MXN.toLocaleString("es-MX", {
                  style: "currency",
                  currency: "MXN",
                })}
              </span>
            </div>
          </>
        )}

        <div className="border-t pt-3 mt-3 flex justify-between text-lg font-bold">
          <span>Total global:</span>
          <span>
            MXN {totals.totalGlobal.mxn.toLocaleString("es-MX")}  
            / USD {totals.totalGlobal.usd.toLocaleString("en-US")}
          </span>
        </div>

        {totals.discountAmount > 0 && (
          <div className="flex justify-between text-orange-600 mt-1">
            <span>Descuento total:</span>
            <span>- ${totals.discountAmount.toFixed(2)}</span>
          </div>
        )}

      </div>
    </div>
  );
}
