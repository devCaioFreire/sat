import { Card } from "./components/card";

export default function Home() {

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
            // className="w-[90%] h-[90%]"
            title="Cancelar Cupom"
            shortcut="(Ctrl + C)"
            link={'/dashboard/cancelTaxCoupom'} />

          <Card
            // className="w-[90%] h-[90%]"
            title="Consultar Preço"
            shortcut="(Ctrl + P)"
            link={''}
            isDisabled={true} />

          <Card
            // className="w-[90%] h-[90%]"
            title="Abrir Gaveta"
            shortcut="(Ctrl + P)"
            link={''}
            isDisabled={true} />

          <Card
            // className="w-[90%] h-[90%]"
            title="Capturar Pedido de Venda"
            shortcut="(Ctrl + N)"
            link={''}
            isDisabled={true} />

          <Card
            // className="w-[90%] h-[90%]"
            title="Relatório Gerencial de Vendas"
            shortcut="(Ctrl + N)"
            link={''}
            isDisabled={true} />

          <Card
            // className="w-[90%] h-[90%]"
            title="2ª Via Cupom SAT"
            shortcut="(Ctrl + N)"
            link={''} />

          <Card
            // className="w-[90%] h-[90%]"
            title="Módulos Adicionais"
            shortcut="(Ctrl + N)"
            link={''} />

          <Card
            // className="w-[90%] h-[90%]"
            title="Sair do Sistema"
            shortcut="(Ctrl + N)"
            link={'/'}

          />
        </div>
      </div>
    </main>

  )
}