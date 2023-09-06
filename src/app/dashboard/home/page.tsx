'use client'
import { useAuthContext } from "@/context/authContext";
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
            shortcut="(Ctrl + N)"
            link={'/dashboard/sales'}
            withColor={true} />

          <Card
            title="Cancelar Cupom"
            shortcut="(Ctrl + C)"
            link={'/dashboard/cancelTaxCoupom'} />

          <Card
            title="Produtos"
            shortcut="(Ctrl + P)"
            link={'/dashboard/product'} />

          <Card
            title="Abrir Gaveta"
            shortcut="(Ctrl + P)"
            link={''}
            isDisabled={true} />

          <Card
            title="Capturar Pedido de Venda"
            shortcut="(Ctrl + N)"
            link={''}
            isDisabled={true} />

          <Card
            title="Relatório Gerencial de Vendas"
            shortcut="(Ctrl + N)"
            link={''}
            isDisabled={true} />

          <Card
            title="2ª Via Cupom SAT"
            shortcut="(Ctrl + N)"
            link={''} />

          <Card
            title="Módulos Adicionais"
            shortcut="(Ctrl + N)"
            link={''} />

          <Card
            title="Sair do Sistema"
            shortcut="(Ctrl + N)"
            link={''}
            onClick={logout}
          />
        </div>
      </div>
    </main>

  )
}