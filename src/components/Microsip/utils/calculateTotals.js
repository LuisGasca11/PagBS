import { formatMXN, formatUSD } from "./currency";

export default function calculateTotals({
  moduleSelections,
  hourRentals,
  pricesDB,
  paymentFrequency,
  userPlan,
  userCount,
  selectedVps,
  exchangeRate = 20.5,
}) {

  const subtotalModulos = Object.entries(moduleSelections).reduce(
    (sum, [moduleName, { plan }]) => {
      const costo = pricesDB[moduleName]?.[plan]?.costo || 0;
      return sum + Number(costo);
    },
    0
  );

  const subtotalVpsMXN = (selectedVps || []).reduce(
    (sum, plan) => sum + Number(plan.precio_mensual_nube || 0),
    0
  );

  const subtotalRentaHora = (hourRentals || []).reduce(
    (sum, r) => sum + Number(r.price) * Number(r.hours),
    0
  );

  const modulesForDiscount = Object.entries(moduleSelections).filter(
    ([name]) => name !== "PDAS"
  );

  const subtotalForDiscount = modulesForDiscount.reduce(
    (sum, [name, { plan }]) => {
      const costo = pricesDB[name]?.[plan]?.costo || 0;
      return sum + Number(costo);
    },
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

  const totalUSD = Number(userCount) * Number(userPlan?.precio_mensual_nube || 0);
  const totalUSDinMXN = totalUSD * exchangeRate;

  const subtotalAntesIVA =
    subtotalModulos +
    subtotalVpsMXN +
    subtotalRentaHora -
    discountAmount +
    totalUSDinMXN;

  const iva = subtotalAntesIVA * 0.16;
  const totalConIVA = subtotalAntesIVA + iva;

  return {
    subtotalModulos,
    subtotalVpsMXN,
    subtotalRentaHora,
    subtotalForDiscount,
    discountAmount,

    totalUSD,
    totalUSDinMXN,

    subtotalAntesIVA,
    iva,
    totalConIVA,

    exchangeRate,

    formatted: {
      subtotalModulosMXN: formatMXN(subtotalModulos),
      subtotalVpsMXN: formatMXN(subtotalVpsMXN),
      subtotalRentaHoraMXN: formatMXN(subtotalRentaHora),
      discountAmountMXN: formatMXN(discountAmount),

      totalUSD: formatUSD(totalUSD),
      totalUSDinMXN: formatMXN(totalUSDinMXN),

      subtotalAntesIVAMXN: formatMXN(subtotalAntesIVA),
      ivaMXN: formatMXN(iva),
      totalConIVAMXN: formatMXN(totalConIVA),
    },

    selectedVps,
  };
}
