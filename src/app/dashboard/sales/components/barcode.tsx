'use client';
import { ProductContext } from "@/context/salesList";
import { useContext, useState } from "react";

export function Barcode() {

  const { getProductByID } = useContext(ProductContext);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  async function barcodeID(e: any) {
    e.preventDefault();
    const id = Number(code);
    try {
      await getProductByID(id);
      setError(false);
    } catch (error) {
      setError(true);
    }
    setCode('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.ctrlKey && e.key === 'Control') {
      console.log('Modal OK');
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center w-full rounded-xl bg-backgroundFields relative h-[18%]">
      {/* Header */}
      <header
        className="flex items-center justify-center w-full shadow-lg rounded-t-xl bg-backgroundSecundary absolute top-0 default:h-6 lg:h-10">
        <h1 className="font-medium">Selecione o Produto</h1>
      </header>

      {/* Barcode */}
      <div
        className={`flex items-start w-[80%] border-2 mt-7 rounded-lg bg-backgroundSecundary ${error ? "border-red-800" : "border-transparent"
          }`}>
        <form
          className="w-full"
          onSubmit={barcodeID}>
          <input
            className="w-full py-2 px-2 tracking-[1rem] bg-transparent outline-none"
            type="text"
            id="barcode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown} />
        </form>
      </div>
    </div>
  )
}