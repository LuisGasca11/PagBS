export async function fetchAllPrices() {
  const res = await fetch("/api/precios");
  return res.json();
}

export async function fetchHourlyPrices() {
  const res = await fetch("/api/precios_hora");
  return res.json();
}
