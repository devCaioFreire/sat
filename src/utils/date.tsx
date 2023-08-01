'use client';
import { useEffect, useState } from "react";

export function CurrentDateFormatted() {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0'); 
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
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

export function formatCurrency(value: string | number) {
  if (value == null) {
    value = '';
  }
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}