export default function calculateTotals({
  moduleSelections,
  hourRentals,
  modulesList,
  pricesDB,
  paymentFrequency,
}) {
  const subtotalModulos = Object.entries(moduleSelections).reduce(
    (sum, [moduleName, { plan }]) => sum + (pricesDB[moduleName]?.[plan] || 0),
    0
  );

  const subtotalRentaHora = hourRentals.reduce(
    (sum, r) => sum + r.price * r.hours,
    0
  );

  const modulesForDiscount = Object.entries(moduleSelections).filter(
    ([name]) => name !== "PDAS"
  );

  const subtotalForDiscount = modulesForDiscount.reduce((sum, [name, { plan }]) => {
    return sum + (pricesDB[name]?.[plan] || 0);
  }, 0);

  const freqDiscount =
    paymentFrequency === "Semestral"
      ? 0.05
      : paymentFrequency === "Anual"
      ? 0.1
      : 0;

  const moduleCount = modulesForDiscount.length;
  const volumeDiscount =
    moduleCount >= 5 ? 0.2 : moduleCount >= 3 ? 0.15 : moduleCount === 2 ? 0.1 : 0;

  const totalDiscountPercent = freqDiscount + volumeDiscount;
  const discountAmount = subtotalForDiscount * totalDiscountPercent;

  const total = subtotalModulos - discountAmount + subtotalRentaHora;

  return {
    subtotalModulos,
    subtotalRentaHora,
    subtotalForDiscount,
    discountAmount,
    total,
  };
}
