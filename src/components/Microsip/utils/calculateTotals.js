export default function calculateTotals({
  moduleSelections,
  hourRentals,
  pricesDB,
  paymentFrequency,
  userPlan,
  userCount,
  selectedVps,  
  exchangeRate = 2.86 
}) {

  const subtotalModulos = Object.entries(moduleSelections).reduce(
    (sum, [moduleName, { plan }]) =>
      sum + (pricesDB[moduleName]?.[plan]?.costo || 0),
    0
  );

  const subtotalVpsUSD = selectedVps?.reduce(
    (sum, plan) => sum + (plan.precio_mensual_nube || 0),
    0
  );

  const subtotalVpsMXN = subtotalVpsUSD * exchangeRate;

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
    paymentFrequency === "Anual" ? 0.10 : 0;

  const volumeDiscount =
    modulesForDiscount.length >= 5 ? 0.20 :
    modulesForDiscount.length >= 3 ? 0.15 :
    modulesForDiscount.length === 2 ? 0.10 : 0;

  const discountAmount = subtotalForDiscount * (freqDiscount + volumeDiscount);

  const totalMXN =
    subtotalModulos +
    subtotalRentaHora +
    subtotalVpsMXN -
    discountAmount;

  const totalUSD_users = userCount * (userPlan?.precio_mensual_nube || 0);
  const totalUSD = totalUSD_users + subtotalVpsUSD;

  const totalGlobal = {
    mxn: totalMXN,
    usd: totalUSD
  };

  return {
    subtotalModulos,
    subtotalRentaHora,
    subtotalVpsUSD,
    subtotalVpsMXN,
    subtotalForDiscount,
    discountAmount,
    totalMXN,
    totalUSD,
    totalGlobal,
    selectedVps
  };
}
