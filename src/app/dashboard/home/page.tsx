'use client'
import { useAuthContext } from "@/context/authContext";
import Sale from "../../../../assets/arrow-right-left.svg";
import External from "../../../../assets/external.svg";
import Rel from "../../../../assets/folder-kanban.svg";
import Exit from "../../../../assets/log-out.svg";
import Drawer from "../../../../assets/panel-left-open.svg";
import AddProduct from '../../../../assets/register-product.svg';
import Cart from '../../../../assets/shopping-cart.svg';
import sat from "../../../../assets/ticket.svg";
import Cancel from "../../../../assets/x-circle.svg";
import { Card } from "./components/card";


export default function Home() {
  const { logout } = useAuthContext()
  return (
    <main
      className="flex border border-border rounded-lg items-center justify-center h-full">
      <div className="w-full h-full">

        {/*  Version */}
        <div className="flex justify-center items-center h-[10%]">
          <h1 className="text-4xl">LITE</h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 justify-items-center h-[90%]">
          <Card
            title="Nova Venda"
            // shortcut="(Ctrl + N)"
            icon={Cart}
            link={'/dashboard/sales'}
            withColor={true} />

          <Card
            title="Cancelar Cupom"
            // shortcut="(Ctrl + C)"
            icon={Cancel}
            link={'/dashboard/cancelTaxCoupom'} />

          <Card
            title="Produtos"
            // shortcut="(Ctrl + P)"
            icon={AddProduct}
            link={'/dashboard/product'} />

          <Card
            title="Vendas"
            // shortcut="(Ctrl + N)"
            icon={Sale}
            link={'/dashboard/order'} />

          <Card
            title="Abrir Gaveta"
            // shortcut="(Ctrl + P)"
            icon={Drawer}
            link={''}
            isDisabled={true} />

          <Card
            title="Relatório Gerencial"
            // shortcut="(Ctrl + N)"
            icon={Rel}
            link={''}
            isDisabled={true} />

          <Card
            title="2ª Via Cupom SAT"
            // shortcut="(Ctrl + N)"
            icon={sat}
            link={''}
            isDisabled={true} />

          <Card
            title="Módulos Adicionais"
            // shortcut="(Ctrl + N)"
            icon={External}
            targetBlank={true}
            link={'https://sistemasatfiscal.com.br'} />

          <Card
            title="Sair do Sistema"
            // shortcut="(Ctrl + N)"
            icon={Exit}
            link={''}
            onClick={logout}
          />
        </div>
      </div>
    </main>

  )
}