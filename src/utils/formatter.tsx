'use client';
import { useEffect, useState } from "react";

export function CurrentDateFormatted() {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`
}

export function formatDate(inputDate: string) {
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  const date = new Date(inputDate);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function capitalizeFirstLetter(str: string) {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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

export const formatCpfOrCnpj = (value: string | undefined | null): string => {
  if (!value) {
    return '';
  }

  const digits = value.replace(/\D/g, '');

  if (digits.length === 11) {
    return `${digits.substr(0, 3)}.${digits.substr(3, 3)}.${digits.substr(6, 3)}-${digits.substr(9, 2)}`;
  } else if (digits.length === 14) {
    return `${digits.substr(0, 2)}.${digits.substr(2, 3)}.${digits.substr(5, 3)}/${digits.substr(8, 4)}-${digits.substr(12, 2)}`;
  } else {
    return value;
  }
};