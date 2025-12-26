export function formatCurrency(value) {
  if (typeof value === 'number') {
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }
  if (typeof value === 'string') {
    // Si ya tiene formato, dejarlo
    if (value.includes('$')) return value;
    // Si es un número en string, formatearlo
    const num = parseFloat(value);
    if (!isNaN(num)) {
      return `$${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }
  }
  return '$0.00';
}