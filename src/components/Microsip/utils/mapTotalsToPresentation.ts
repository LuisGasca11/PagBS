export function mapTotalsToPresentation({
  moduleSelections = {},
  modulesList = [],
  selectedVps = [],
  hourRentals = [],
  totals = {},
  paymentFrequency = "",
  userCount = 0,
}) {
  const modulos = Object.keys(moduleSelections).map((key) => {
    const mod = modulesList.find((m) => m.key === key);
    const qty = moduleSelections[key]?.quantity || userCount || 1;
    const price = totals.modules?.[key]?.unitPrice ?? 0;
    const total = totals.modules?.[key]?.total ?? 0;

    return {
      nombre: mod?.name ?? key,
      cantidad: qty,
      precio: price,
      total,
    };
  });

  const servicios = selectedVps.map((vps) => ({
    nombre: vps.nombre || vps.plan,
    usuarios: vps.usuarios || userCount || 1,
    precio: vps.precio || 0,
    total: vps.total || 0,
  }));

  const implementacion = hourRentals.map((h) => ({
    concepto: h.nombre,
    horas: h.horas,
    precio: h.precio,
    total: h.total,
  }));

  return {
    modulos,
    servicios,
    implementacion,
    subtotal: totals.subtotalFormatted ?? totals.subtotal ?? "0",
    total: totals.totalFormatted ?? totals.total ?? "0",
    frecuencia: paymentFrequency,
  };
}
