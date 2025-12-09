import { useState, useEffect } from 'react';

export function useExchangeRate() {
  const [exchangeRate, setExchangeRate] = useState(20.5); // Valor por defecto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        
        if (!response.ok) {
          throw new Error('Error al obtener el tipo de cambio');
        }

        const data = await response.json();
        const rate = data.rates.MXN;

        if (rate) {
          setExchangeRate(rate);
          setLastUpdate(new Date());
          
          localStorage.setItem('exchangeRate', JSON.stringify({
            rate,
            timestamp: Date.now()
          }));
        }
      } catch (err) {
        console.error('Error fetching exchange rate:', err);
        setError(err.message);
        
        const cached = localStorage.getItem('exchangeRate');
        if (cached) {
          const { rate, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            setExchangeRate(rate);
            setLastUpdate(new Date(timestamp));
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
    
    const interval = setInterval(fetchExchangeRate, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { exchangeRate, loading, error, lastUpdate };
}