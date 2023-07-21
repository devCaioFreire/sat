interface FooterProps {

}

export function Footer() {
  return (
    <footer className="flex w-full h-[0%] justify-center items-center">
      <ul className="flex gap-4">
        <li className="flex items-center gap-1">
          <span>Num. Pedido:</span>
        </li>

        <li className="flex items-center gap-1">
          <span>Data:</span>
        </li>

        <li className="flex items-center gap-1">
          <span>Hora:</span>
        </li >

        <li className="flex items-center gap-1">
          <span>Caixa:</span>
        </li >

        <li className="flex items-center gap-1">
          <span>Vendedor:</span>
        </li >

        <li className="flex items-center gap-1">
          <span>Cliente:</span>
        </li >

        <li className="flex items-center gap-1">
          <span>CPF / CNPJ:</span>
        </li >
      </ul >
    </footer >

  )
}