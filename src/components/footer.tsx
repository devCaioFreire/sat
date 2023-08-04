import { useCustomerContext } from "@/context/customerData";
import { CurrentDateFormatted, CurrentTimeFormatted, formatCpfOrCnpj } from "@/utils/formatter";

export function Footer() {

  const { customerData } = useCustomerContext();

  const currentDate = CurrentDateFormatted();
  const currentTime = CurrentTimeFormatted();

  return (
    <footer className="flex w-full h-[0%] justify-center items-center">
      <ul className="flex gap-4">
        <li className="flex items-center gap-1">
          <span>Num. Pedido: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">12</span></span>
        </li>

        <li className="flex items-center gap-2">
          <span>Data: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">{currentDate}</span></span>
        </li>

        <li className="flex items-center gap-1">
          <span>Hora: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">{'16:30:00'}</span></span>
        </li >

        <li className="flex items-center gap-1">
          <span>Caixa: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">02</span></span>
        </li >

        <li className="flex items-center gap-1">
          <span>Vendedor: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">Nome Fictício</span></span>
        </li >

        <li className="flex items-center gap-1">
          <span>Cliente: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">{customerData.customerName}</span></span>
        </li >

        <li className="flex items-center gap-1">
          <span>CPF / CNPJ: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">{formatCpfOrCnpj(customerData.cpfOrCnpj!)}</span></span>
        </li >
      </ul >
    </footer >

  )
}