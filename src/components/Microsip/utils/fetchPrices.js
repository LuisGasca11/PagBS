export async function fetchAllPrices() {
  const res = await fetch("http://localhost:3001/api/precios");
  return res.json();
}

export async function fetchHourlyPrices() {
  const res = await fetch("http://localhost:3001/api/precios_hora");
  return res.json();
}
