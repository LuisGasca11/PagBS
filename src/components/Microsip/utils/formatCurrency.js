export function formatCurrency(value) {
  if (typeof value === 'number') {
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }
  if (typeof value === 'string') {
    if (value.includes('$')) return value;
    const num = parseFloat(value);
    if (!isNaN(num)) {
      return `$${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    }
  }
  return '$0.00';
}