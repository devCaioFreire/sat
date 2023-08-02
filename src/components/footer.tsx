import { CurrentDateFormatted, CurrentTimeFormatted } from "@/utils/date";

interface FooterProps {

}

export function Footer() {

  const currentDate = CurrentDateFormatted();
  const currentTime = CurrentTimeFormatted();

  return (
    <footer className="flex w-full h-[0%] justify-center items-center">
      <ul className="flex gap-4">
        <li className="flex items-center gap-1">
          <span>Num. Pedido: 12</span>
        </li>

        <li className="flex items-center gap-1">
          <span>Data: {currentDate}</span>
        </li>

        <li className="flex items-center gap-1">
          <span>Hora: </span>
        </li >

        <li className="flex items-center gap-1">
          <span>Caixa: 02</span>
        </li >

        <li className="flex items-center gap-1">
          <span>Vendedor: Nome Fictício</span>
        </li >

        <li className="flex items-center gap-1">
          <span>Cliente: Nome Fictício</span>
        </li >

        <li className="flex items-center gap-1">
          <span>CPF / CNPJ: 00.000.000/0001-00</span>
        </li >
      </ul >
    </footer >

  )
}