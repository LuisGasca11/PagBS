export function mapTotalsToPresentation({
  moduleSelections = {},
  modulesList = [],
  selectedVps = [],
  hourRentals = [],
  totals = {},
  paymentFrequency = "",
  userCount = 0,
  isCloudUsers = true,
  exchangeRate = 17.0 
}) {
  console.log("🔍 mapTotalsToPresentation - INICIANDO");

  const extractNumber = (value) => {
    if (value === undefined || value === null || value === "") return 0;
    if (typeof value === 'number') return value;
    
    const clean = String(value).replace(/[^0-9.-]+/g, '');
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value).replace('USD', '').trim();
  };

  const modulos = [];
  let subtotal_modulos_valor = 0;

  Object.keys(moduleSelections).forEach((key) => {
    const selection = moduleSelections[key];
    const mod = modulesList.find((m) => m.key === key);
    
    let cantidad = 1;
    if (selection?.quantity !== undefined) {
      cantidad = extractNumber(selection.quantity);
    } else if (userCount > 0) {
      cantidad = extractNumber(userCount);
    }
    
    let precioUnitario = 0;
    let totalModulo = 0;
    
    if (totals.modules && totals.modules[key]) {
      precioUnitario = extractNumber(totals.modules[key].unitPrice);
      totalModulo = extractNumber(totals.modules[key].total);
    } else if (selection?.price !== undefined) {
      precioUnitario = extractNumber(selection.price);
      totalModulo = precioUnitario * cantidad;
    }
    
    subtotal_modulos_valor += totalModulo; 
    
    modulos.push({
      nombre: mod?.name || key,
      cantidad: String(cantidad),
      precio: formatCurrency(precioUnitario),
      total: formatCurrency(totalModulo),
    });
  });

  const servicios = [];
  let subtotal_vps_valor = 0;

  const numUsers = extractNumber(userCount);
  
  if (numUsers > 0) {
    if (isCloudUsers) {
      const precioPorUsuarioUSD = 7;
      
      const tipoDeCambio = extractNumber(exchangeRate) || 17.0;
      const precioPorUsuarioMXN = precioPorUsuarioUSD * tipoDeCambio;
      const totalUsuariosMXN = precioPorUsuarioMXN * numUsers;
      
      subtotal_vps_valor += totalUsuariosMXN;
      
      servicios.push({
        nombre: `Usuarios en la Nube (${formatCurrency(precioPorUsuarioUSD)} USD * ${tipoDeCambio})`,
        usuarios: String(numUsers),
        precio: formatCurrency(precioPorUsuarioMXN), 
        total: formatCurrency(totalUsuariosMXN)     
      });
    } else {
      servicios.push({
        nombre: "Usuarios Locales",
        usuarios: String(numUsers),
        precio: "$0.00",
        total: "$0.00"
      });
    }
  }
  
  if (selectedVps.length > 0) {
    selectedVps.forEach(vps => {
      const precio = extractNumber(vps.precio_mensual_nube);
      subtotal_vps_valor += precio; 
      
      servicios.push({
        nombre: vps.nombre || "Servidor VPS",
        usuarios: "1",
        precio: formatCurrency(precio),
        total: formatCurrency(precio)
      });
    });
  }

  const implementacion = [];
  let subtotal_implementacion_valor = 0;
  
  if (hourRentals.length > 0) {
    hourRentals.forEach((h) => {
      const horas = extractNumber(h.horas);
      const precio = extractNumber(h.precio);
      const total = h.total ? extractNumber(h.total) : (precio * horas);
      
      subtotal_implementacion_valor += total;
      
      implementacion.push({
        concepto: h.nombre || "Servicio de implementación",
        horas: String(horas),
        precio: formatCurrency(precio),
        total: formatCurrency(total),
      });
    });
  }

  subtotal_modulos_valor = parseFloat(subtotal_modulos_valor.toFixed(2));
  subtotal_vps_valor = parseFloat(subtotal_vps_valor.toFixed(2));
  subtotal_implementacion_valor = parseFloat(subtotal_implementacion_valor.toFixed(2));

  const subtotal_sin_iva_valor = subtotal_modulos_valor + subtotal_vps_valor + subtotal_implementacion_valor;
  const iva_monto_valor = subtotal_sin_iva_valor * 0.16;
  const total_con_iva_valor = subtotal_sin_iva_valor + iva_monto_valor;

  const result = {
    modulos,
    servicios,
    implementacion,
    subtotal_modulos: formatCurrency(subtotal_modulos_valor),
    subtotal_vps: formatCurrency(subtotal_vps_valor),
    subtotal: formatCurrency(subtotal_sin_iva_valor),
    total: formatCurrency(total_con_iva_valor),
    subtotal_sin_iva: formatCurrency(subtotal_sin_iva_valor),
    iva_monto: formatCurrency(iva_monto_valor),
    total_con_iva: formatCurrency(total_con_iva_valor),
    frecuencia: paymentFrequency === "Anual" ? "ANUAL" : "MENSUAL",
    
    nota_iva: "* Precios mostrados en moneda nacional. Se agrega el 16% de IVA al total final."
  };

  return result;
}