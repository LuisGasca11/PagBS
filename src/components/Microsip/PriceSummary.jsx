export default function PriceSummary({
  totals,
  paymentFrequency,
  setPaymentFrequency,
}) {
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
          <span>${totals.subtotalModulos}</span>
        </div>

        {totals.subtotalRentaHora > 0 && (
          <div className="flex justify-between">
            <span>Renta por hora:</span>
            <span>${totals.subtotalRentaHora}</span>
          </div>
        )}

        {totals.discountAmount > 0 && (
          <div className="flex justify-between text-orange-600">
            <span>Descuento total:</span>
            <span>- ${totals.discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t pt-3 mt-3 flex justify-between text-lg font-bold">
          <span>Total {paymentFrequency}:</span>
          <span>${totals.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
