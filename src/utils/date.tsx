import { useEffect, useState } from "react";

export function CurrentDateFormatted() {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0'); // Obtém o dia e adiciona o zero à esquerda se for menor que 10
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (0 a 11) e adiciona o zero à esquerda se for menor que 10
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`
}

export function CurrentTimeFormatted() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`
}

export function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}