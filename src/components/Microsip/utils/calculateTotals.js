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

  // Calcular subtotal de módulos
  const subtotalModulos = Object.entries(moduleSelections).reduce(
    (sum, [moduleName, { plan }]) => {
      const costo = pricesDB[moduleName]?.[plan]?.costo || 0;
      return sum + Number(costo);
    },
    0
  );

  // Calcular subtotal de VPS (NO tiene descuento)
  const subtotalVpsMXN = (selectedVps || []).reduce(
    (sum, plan) => sum + Number(plan.precio_mensual_nube || 0),
    0
  );

  // Calcular subtotal de renta por hora (NO tiene descuento)
  const subtotalRentaHora = (hourRentals || []).reduce(
    (sum, r) => sum + Number(r.price) * Number(r.hours),
    0
  );

  // Cantidad de módulos seleccionados (para descuento por volumen)
  const moduleCount = Object.keys(moduleSelections).length;

  // DESCUENTO POR CANTIDAD DE MÓDULOS (solo aplica a módulos)
  // 2 módulos = 5%, 3-4 módulos = 10%, 5+ módulos = 15%
  let volumeDiscountPercent = 0;
  if (moduleCount >= 5) {
    volumeDiscountPercent = 0.15;
  } else if (moduleCount >= 3) {
    volumeDiscountPercent = 0.10;
  } else if (moduleCount === 2) {
    volumeDiscountPercent = 0.05;
  }

  // DESCUENTO POR FRECUENCIA DE PAGO (solo aplica a módulos)
  // Mensual = 0%, Semestral = 5%, Anual = 10%
  let freqDiscountPercent = 0;
  if (paymentFrequency === "Anual") {
    freqDiscountPercent = 0.10;
  } else if (paymentFrequency === "Semestral") {
    freqDiscountPercent = 0.05;
  }

  // Calcular montos de descuento (SOLO sobre módulos)
  const volumeDiscountAmount = subtotalModulos * volumeDiscountPercent;
  const freqDiscountAmount = subtotalModulos * freqDiscountPercent;
  const discountAmount = volumeDiscountAmount + freqDiscountAmount;

  // Calcular costo de usuarios en la nube (en USD y MXN)
  const totalUSD = Number(userCount) * Number(userPlan?.precio_mensual_nube || 0);
  const totalUSDinMXN = totalUSD * exchangeRate;

  // Calcular subtotal antes de IVA
  const subtotalAntesIVA =
    subtotalModulos +           // Módulos
    subtotalVpsMXN +            // VPS (sin descuento)
    subtotalRentaHora +         // Renta por hora (sin descuento)
    totalUSDinMXN -             // Usuarios en la nube
    discountAmount;             // Descuentos aplicados SOLO a módulos

  // Calcular IVA y total
  const iva = subtotalAntesIVA * 0.16;
  const totalConIVA = subtotalAntesIVA + iva;

  return {
    subtotalModulos,
    subtotalVpsMXN,
    subtotalRentaHora,
    
    // Desglose de descuentos
    volumeDiscountAmount,
    freqDiscountAmount,
    discountAmount,
    volumeDiscountPercent: volumeDiscountPercent * 100, // Para mostrar como porcentaje
    freqDiscountPercent: freqDiscountPercent * 100,     // Para mostrar como porcentaje

    // Usuarios en la nube
    totalUSD,
    totalUSDinMXN,

    // Totales finales
    subtotalAntesIVA,
    iva,
    totalConIVA,

    exchangeRate,

    // Formatos para mostrar
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