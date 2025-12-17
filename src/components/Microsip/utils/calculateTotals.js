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

  const moduleCount = Object.keys(moduleSelections).length;

  let volumeDiscountPercent = 0;
  if (moduleCount >= 5) {
    volumeDiscountPercent = 0.15;
  } else if (moduleCount >= 3) {
    volumeDiscountPercent = 0.10;
  } else if (moduleCount === 2) {
    volumeDiscountPercent = 0.05;
  }

  let freqDiscountPercent = 0;
  if (paymentFrequency === "Anual") {
    freqDiscountPercent = 0.10;
  } else if (paymentFrequency === "Semestral") {
    freqDiscountPercent = 0.05;
  }

  const volumeDiscountAmount = subtotalModulos * volumeDiscountPercent;
  const freqDiscountAmount = subtotalModulos * freqDiscountPercent;
  const discountAmount = volumeDiscountAmount + freqDiscountAmount;

  const totalUSD = Number(userCount) * Number(userPlan?.precio_mensual_nube || 0);
  const totalUSDinMXN = totalUSD * exchangeRate;

  const subtotalAntesIVA =
    subtotalModulos +           
    subtotalVpsMXN +            
    subtotalRentaHora +         
    totalUSDinMXN -           
    discountAmount;             

  const iva = subtotalAntesIVA * 0.16;
  const totalConIVA = subtotalAntesIVA + iva;

  return {
    subtotalModulos,
    subtotalVpsMXN,
    subtotalRentaHora,
    
    volumeDiscountAmount,
    freqDiscountAmount,
    discountAmount,
    volumeDiscountPercent: volumeDiscountPercent * 100, 
    freqDiscountPercent: freqDiscountPercent * 100,     

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
      
      volumeDiscountAmountMXN: formatMXN(volumeDiscountAmount),
      freqDiscountAmountMXN: formatMXN(freqDiscountAmount),
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