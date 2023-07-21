export function List() {
  return (
    <div className="flex w-full h-[88vh] flex-col bg-backgroundFields rounded-3xl border border-border overflow-x-auto">
      <div className="flex items-center justify-center w-full h-12 shadow-lg rounded-t-3xl bg-backgroundSecundary">
        <h1 className="font-medium">Produtos</h1>
      </div>

      <table
        className="flex relative flex-col border-collapse overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#636369] scrollbar-track-transparent">
        <thead className="sticky top-0 w-full drop-shadow-lg pb-4 bg-backgroundFields">
          <tr className="flex text-left">
            <th className="pt-3 px-4 w-[55%] text-base font-medium">
              Descrição
            </th>
            <th className="pt-3 px-4 w-[15%] text-base font-medium">
              Quantidade
            </th>
            <th className="pt-3 px-4 w-[15%] text-base font-medium">
              Unitário
            </th>
            <th className="pt-3 px-4 w-[15%] text-base font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex text-left items-center text-sm min-h-[4rem]">
             {/* for="let product of productList; let i = index"> */}
        {/* // [className.bg-backgroundSecundary]="i % 2 === 1" [className.bg-backgroundFields]="i % 2 === 0"> */}
            <td className="px-4 w-[60%]">Descrição</td>
            <td className="px-0 w-[15%]">Quantidade</td>
            <td className="px-4 w-[15%]">R$ Valor Unitário</td>
            <td className="px-4 w-[15%]">R$ Total</td>
          </tr>
        </tbody>
      </table>
    </div >
  )
}