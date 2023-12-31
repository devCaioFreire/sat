import { useAuthContext } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from '../../assets/IconOriginal.svg';
import Sale from "../../assets/arrow-right-left.svg";
import Rel from "../../assets/folder-kanban.svg";
import Home from "../../assets/layout-dashboard.svg";
import Exit from "../../assets/log-out.svg";
import Drawer from "../../assets/panel-left-open.svg";
import AddProduct from '../../assets/register-product.svg';
import Cart from '../../assets/shopping-cart.svg';
import sat from "../../assets/ticket.svg";
import Cancel from "../../assets/x-circle.svg";

export function Navbar() {
  const { logout } = useAuthContext();
  const pathname = usePathname();
  const isSalesPage = pathname === '/dashboard/sales';

  return (
    <nav
      className={` ${isSalesPage ? 'w-[3%] bg-backgroundSecundary border-r-[1px] border-border transition-all duration-[250ms]' : 'w-[15%] bg-backgroundSecundary border-r-[1px] border-border transition-all duration-[250ms]' // Adicione a classe para largura menor aqui
        }`}>

      <div className={`${isSalesPage ? 'flex flex-col h-full items-center justify-between py-6' : 'flex flex-col h-full items-start justify-start'}`}>
        <Link
          href={'/dashboard/home'}
          className={`${isSalesPage ? 'flex items-center pr-2 justify-center  w-full' : 'flex items-center pr-2 justify-center flex-1 gap-4 w-full'}`}>
          <Image src={Logo} alt="" className={`${isSalesPage} ? 'flex items-center justify-center': 'w-11'`} />
          <p className="text-base font-bold">
            {isSalesPage ? '' : 'Soft Clever'}
          </p>
        </Link>

        <Link
          href={'/dashboard/home'}
          className={`${isSalesPage ? 'flex items-center self-center pr-2 justify-center  w-full' : 'flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields'}`}>
          {/* // className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields"> */}
          <Image alt="" src={Home} className="w-6" />
          <p className="font-medium xl:text-sm 2xl:text-base">
            {isSalesPage ? '' : 'Home'}
          </p>
        </Link>

        <Link
          href={'/dashboard/sales'}
          // className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields">
          className={`${isSalesPage ? 'flex items-center self-center pr-2 justify-center  w-full' : 'flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields'}`}>
          <Image alt="" src={Cart} className="w-6" />
          <p className="font-medium xl:text-sm 2xl:text-base">
            {isSalesPage ? '' : 'Nova Venda'}
          </p>
        </Link>

        <Link
          href={'/dashboard/cancelTaxCoupom'}
          // className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields">
          className={`${isSalesPage ? 'flex items-center self-center pr-2 justify-center  w-full' : 'flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields'}`}>
          <Image alt="" src={Cancel} className="w-6" />
          <p className="font-medium xl:text-sm 2xl:text-base">
            {isSalesPage ? '' : 'Cancelar Cupom'}
          </p>
        </Link>

        <Link
          href={'/dashboard/product'}
          // className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields">
          className={`${isSalesPage ? 'flex items-center self-center pr-2 justify-center  w-full' : 'flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields'}`}>
          <Image alt="" src={AddProduct} className="w-6" />
          <p className="font-medium xl:text-sm 2xl:text-base">
            {isSalesPage ? '' : 'Produtos'}
          </p>
        </Link>

        {/* <Link
          href={''}
          // className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields">
          className={`${isSalesPage ? 'flex items-center self-center pr-2 justify-center  w-full' : 'flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields'}`}>
          <Image alt="" src={Search} className="w-6" />
          <p className="font-medium xl:text-sm 2xl:text-base">
            {isSalesPage ? '' : 'Consultar Preços'}
          </p>
        </Link> */}

        <Link
          href={'/dashboard/order'}
          // className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields">
          className={`${isSalesPage ? 'flex items-center self-center pr-2 justify-center  w-full' : 'flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields'}`}>
          <Image alt="" src={Sale} className="w-6" />
          <p className="font-medium xl:text-sm 2xl:text-base">
            {isSalesPage ? '' : 'Vendas'}
          </p>
        </Link>

        <Link
          href={''}
          // className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields">
          className={`${isSalesPage ? 'flex items-center self-center pr-2 justify-center  w-full' : 'flex items-center pr-2 pl-4 flex-1 gap-4 w-full cursor-not-allowed transition-all hover:bg-backgroundFields'}`}>
          <Image alt="" src={Drawer} className="w-6" />
          <p className="font-medium xl:text-sm 2xl:text-base">
            {isSalesPage ? '' : 'Abrir Gaveta'}
          </p>
        </Link>

        <Link
          href={''}
          // className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields">
          className={`${isSalesPage ? 'flex items-center self-center pr-2 justify-center  w-full' : 'flex items-center pr-2 pl-4 flex-1 gap-4 w-full cursor-not-allowed transition-all hover:bg-backgroundFields'}`}>
          <Image alt="" src={Rel} className="w-6" />
          <p className="font-medium xl:text-sm 2xl:text-base">
            {isSalesPage ? '' : 'Relatório Gerencial'}
          </p>
        </Link>

        <Link
          href={''}
          // className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields">
          className={`${isSalesPage ? 'flex items-center self-center pr-2 justify-center  w-full' : 'flex items-center pr-2 pl-4 flex-1 gap-4 w-full cursor-not-allowed transition-all hover:bg-backgroundFields'}`}>
          <Image alt="" src={sat} className="w-6" />
          <p className="font-medium xl:text-sm 2xl:text-base">
            {isSalesPage ? '' : '2ª Via Cupom SAT'}
          </p>
        </Link>

        <button
          onClick={logout}
          // className="flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields">
          className={`${isSalesPage ? 'flex items-center self-center pr-2 justify-center  w-full' : 'flex items-center pr-2 pl-4 flex-1 gap-4 w-full transition-all hover:bg-backgroundFields'}`}>
          <Image alt="" src={Exit} className="w-6" />
          <p className="font-medium xl:text-sm 2xl:text-base">
            {isSalesPage ? '' : 'Sair do Sistema'}

          </p>
        </button>

      </div >
    </nav >
  )
}