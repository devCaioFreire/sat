export function CurrentDateFormatted() {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0'); // Obtém o dia e adiciona o zero à esquerda se for menor que 10
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (0 a 11) e adiciona o zero à esquerda se for menor que 10
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`
}

export function CurrentTimeFormatted() {
  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, '0'); // Obtém as horas e adiciona o zero à esquerda se for menor que 10
  const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Obtém os minutos e adiciona o zero à esquerda se for menor que 10
  const seconds = currentDate.getSeconds().toString().padStart(2, '0'); // Obtém os segundos e adiciona o zero à esquerda se for menor que 10

  return `${hours}:${minutes}:${seconds}`;
}