export default function calculateTotals({
  moduleSelections,
  hourRentals,
  pricesDB,
  paymentFrequency,
  userPlan,
  userCount
}) {
  const subtotalModulos = Object.entries(moduleSelections).reduce(
    (sum, [moduleName, { plan }]) =>
      sum + (pricesDB[moduleName]?.[plan]?.costo || 0),
    0
  );

  const subtotalRentaHora = hourRentals.reduce(
    (sum, r) => sum + r.price * r.hours,
    0
  );

  const modulesForDiscount = Object.entries(moduleSelections).filter(
    ([name]) => name !== "PDAS"
  );

  const subtotalForDiscount = modulesForDiscount.reduce(
    (sum, [name, { plan }]) =>
      sum + (pricesDB[name]?.[plan]?.costo || 0),
    0
  );

  const freqDiscount =
    paymentFrequency === "Semestral" ? 0.05 :
    paymentFrequency === "Anual" ? 0.1 : 0;

  const volumeDiscount =
    modulesForDiscount.length >= 5 ? 0.2 :
    modulesForDiscount.length >= 3 ? 0.15 :
    modulesForDiscount.length === 2 ? 0.1 : 0;

  const discountAmount = subtotalForDiscount * (freqDiscount + volumeDiscount);

  const totalMXN = subtotalModulos - discountAmount + subtotalRentaHora;

  const totalUSD = (userPlan?.precio_mensual_nube || 0) * userCount;

  const totalGlobal = {
    mxn: totalMXN,
    usd: totalUSD
  };

  return {
    subtotalModulos,
    subtotalRentaHora,
    subtotalForDiscount,
    discountAmount,
    totalMXN,
    totalUSD,
    totalGlobal   
  };
}
