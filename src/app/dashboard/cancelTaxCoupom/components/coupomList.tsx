'use client';
const CoupomList = () => {
  function handleDelete() {
    alert("Delete");
  }

  return (
    <div className="flex w-full">
      <table className="flex w-full relative flex-col border-collapse overflow-auto overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#636369] scrollbar-track-transparent">
        <thead className="sticky top-0 w-full drop-shadow-lg pb-4 bg-backgroundFields">
          <tr className="flex text-left">
            <th className="pt-3 px-4 w-[15%] text-base font-medium">ID Cupom</th>
            <th className="pt-3 px-4 w-[35%] text-base font-medium">CPF / CNPJ</th>
            <th className="pt-3 px-4 w-[25%] text-base font-medium">R$ Valor</th>
            <th className="pt-3 px-4 w-[25%] text-base font-medium">Data</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className={`flex text-left items-center text-sm min-h-[5rem] border-b border-border outline-none`}
            tabIndex={0}>
            <td className="px-4 w-[15%]">01</td>
            <td className="px-4 w-[35%]">493.216.828-48</td>
            <td className="px-10 w-[25%]">R$ 159,99</td>
            <td className="px-12 w-[25%]">07/08/2023</td>
            <td className="flex items-center justify-center rounded-full mr-4 bg-backgroundFields px-4 w-[0%] cursor-pointer transition-all hover:bg-red-600" onClick={handleDelete}>X</td>
          </tr>
          <tr
            className={`flex text-left items-center text-sm min-h-[5rem] border-b border-border outline-none`}
            tabIndex={0}>
            <td className="px-4 w-[15%]">02</td>
            <td className="px-4 w-[35%]">493.216.828-48</td>
            <td className="px-10 w-[25%]">R$ 159,99</td>
            <td className="px-12 w-[25%]">07/08/2023</td>
            <td className="flex items-center justify-center rounded-full mr-4 bg-backgroundFields px-4 w-[0%] cursor-pointer transition-all hover:bg-red-600" onClick={handleDelete}>X</td>
          </tr>
          <tr
            className={`flex text-left items-center text-sm min-h-[5rem] border-b border-border outline-none`}
            tabIndex={0}>
            <td className="px-4 w-[15%]">03</td>
            <td className="px-4 w-[35%]">493.216.828-48</td>
            <td className="px-10 w-[25%]">R$ 159,99</td>
            <td className="px-12 w-[25%]">07/08/2023</td>
            <td className="flex items-center justify-center rounded-full mr-4 bg-backgroundFields px-4 w-[0%] cursor-pointer transition-all hover:bg-red-600" onClick={handleDelete}>X</td>
          </tr>
          <tr
            className={`flex text-left items-center text-sm min-h-[5rem] border-b border-border outline-none`}
            tabIndex={0}>
            <td className="px-4 w-[15%]">04</td>
            <td className="px-4 w-[35%]">493.216.828-48</td>
            <td className="px-10 w-[25%]">R$ 159,99</td>
            <td className="px-12 w-[25%]">07/08/2023</td>
            <td className="flex items-center justify-center rounded-full mr-4 bg-backgroundFields px-4 w-[0%] cursor-pointer transition-all hover:bg-red-600" onClick={handleDelete}>X</td>
          </tr>
          <tr
            className={`flex text-left items-center text-sm min-h-[5rem] border-b border-border outline-none`}
            tabIndex={0}>
            <td className="px-4 w-[15%]">05</td>
            <td className="px-4 w-[35%]">493.216.828-48</td>
            <td className="px-10 w-[25%]">R$ 159,99</td>
            <td className="px-12 w-[25%]">07/08/2023</td>
            <td className="flex items-center justify-center rounded-full mr-4 bg-backgroundFields px-4 w-[0%] cursor-pointer transition-all hover:bg-red-600" onClick={handleDelete}>X</td>
          </tr>
          <tr
            className={`flex text-left items-center text-sm min-h-[5rem] border-b border-border outline-none`}
            tabIndex={0}>
            <td className="px-4 w-[15%]">06</td>
            <td className="px-4 w-[35%]">493.216.828-48</td>
            <td className="px-10 w-[25%]">R$ 159,99</td>
            <td className="px-12 w-[25%]">07/08/2023</td>
            <td className="flex items-center justify-center rounded-full mr-4 bg-backgroundFields px-4 w-[0%] cursor-pointer transition-all hover:bg-red-600" onClick={handleDelete}>X</td>
          </tr>
          <tr
            className={`flex text-left items-center text-sm min-h-[5rem] border-b border-border outline-none`}
            tabIndex={0}>
            <td className="px-4 w-[15%]">07</td>
            <td className="px-4 w-[35%]">493.216.828-48</td>
            <td className="px-10 w-[25%]">R$ 159,99</td>
            <td className="px-12 w-[25%]">07/08/2023</td>
            <td className="flex items-center justify-center rounded-full mr-4 bg-backgroundFields px-4 w-[0%] cursor-pointer transition-all hover:bg-red-600" onClick={handleDelete}>X</td>
          </tr>
          <tr
            className={`flex text-left items-center text-sm min-h-[5rem] border-b border-border outline-none`}
            tabIndex={0}>
            <td className="px-4 w-[15%]">08</td>
            <td className="px-4 w-[35%]">493.216.828-48</td>
            <td className="px-10 w-[25%]">R$ 159,99</td>
            <td className="px-12 w-[25%]">07/08/2023</td>
            <td className="flex items-center justify-center rounded-full mr-4 bg-backgroundFields px-4 w-[0%] cursor-pointer transition-all hover:bg-red-600" onClick={handleDelete}>X</td>
          </tr>
          <tr
            className={`flex text-left items-center text-sm min-h-[5rem] border-b border-border outline-none`}
            tabIndex={0}>
            <td className="px-4 w-[15%]">09</td>
            <td className="px-4 w-[35%]">493.216.828-48</td>
            <td className="px-10 w-[25%]">R$ 159,99</td>
            <td className="px-12 w-[25%]">07/08/2023</td>
            <td className="flex items-center justify-center rounded-full mr-4 bg-backgroundFields px-4 w-[0%] cursor-pointer transition-all hover:bg-red-600" onClick={handleDelete}>X</td>
          </tr>
          <tr
            className={`flex text-left items-center text-sm min-h-[5rem] border-b border-border outline-none`}
            tabIndex={0}>
            <td className="px-4 w-[15%]">10</td>
            <td className="px-4 w-[35%]">493.216.828-48</td>
            <td className="px-10 w-[25%]">R$ 159,99</td>
            <td className="px-12 w-[25%]">07/08/2023</td>
            <td className="flex items-center justify-center rounded-full mr-4 bg-backgroundFields px-4 w-[0%] cursor-pointer transition-all hover:bg-red-600" onClick={handleDelete}>X</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CoupomList;