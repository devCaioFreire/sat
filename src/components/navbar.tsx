import Image from "next/image";
import Link from "next/link";
import Logo from '../../assets/IconOriginal.svg';
import Sale from "../../assets/arrow-right-left.svg";
import Rel from "../../assets/folder-kanban.svg";
import Home from "../../assets/layout-dashboard.svg";
import Exit from "../../assets/log-out.svg";
import Drawer from "../../assets/panel-left-open.svg";
import Search from '../../assets/search.svg';
import Cart from '../../assets/shopping-cart.svg';
import sat from "../../assets/ticket.svg";
import Cancel from "../../assets/x-circle.svg";

export function Navbar() {
  return (
    <nav
      className="w-[15%] bg-backgroundSecundary border-r-[1px] border-border transition-all duration-[250ms]">

      <div className="flex flex-col h-full items-start justify-start">
        <Link
          href={'/dashboard/home'}
          className="flex items-center pr-2 justify-center flex-1 gap-4 w-full">
          <Image src={Logo} alt="" className="w-11" />
          <p className="text-base font-bold">
            Soft Clever
          </p>
        </Link>

        <Link
          href={'/dashboard/home'}
          className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full">
          <Image alt="" src={Home} className="w-6" />
          <p className="text-base font-medium">
            Home
          </p>
        </Link>

        <Link
          href={'/dashboard/sales'}
          className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full">
          <Image alt="" src={Cart} className="w-6" />
          <p className="text-base font-medium">
            Nova Venda
          </p>
        </Link>

        <Link
          href={''}
          className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full">
          <Image alt="" src={Cancel} className="w-6" />
          <p className="text-base font-medium">
            Cancelar Cupom
          </p>
        </Link>

        <Link
          href={''}
          className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full">
          <Image alt="" src={Search} className="w-6" />
          <p className="text-base font-medium">
            Consultar Preços
          </p>
        </Link>

        <Link
          href={''}
          className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full">
          <Image alt="" src={Drawer} className="w-6" />
          <p className="text-base font-medium">
            Abrir Gaveta
          </p>
        </Link>

        <Link
          href={''}
          className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full">
          <Image alt="" src={Sale} className="w-6" />
          <p className="text-base font-medium">
            Capturar Pedido de Venda
          </p>
        </Link>

        <Link
          href={''}
          className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full">
          <Image alt="" src={Rel} className="w-6" />
          <p className="text-base font-medium">
            Relatório Gerencial de Vendas
          </p>
        </Link>

        <Link
          href={''}
          className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full">
          <Image alt="" src={sat} className="w-6" />
          <p className="text-base font-medium">
            2ª Via Cupom SAT
          </p>
        </Link>

        <Link
          href={'/'}
          className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full">
          <Image alt="" src={Exit} className="w-6" />
          <p className="text-base font-medium">
            Sair do Sistema
          </p>
        </Link>

      </div >
    </nav >
  )
}