'use client';
import { useState } from "react";

export function Barcode() {

  const [code, setCode] = useState('');

  function barcodeID(e: any) {
    e.preventDefault();
    setCode('');
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
        className="flex items-start w-[80%] mt-7 rounded-lg bg-backgroundSecundary">
        <form 
        className="w-full"
        onSubmit={barcodeID}>
          <input
            className="w-full py-2 px-2 tracking-[1rem] bg-transparent outline-none"
            type="number"
            id="barcode"
            value={code}
            onChange={(e) => setCode(e.target.value)}/>
        </form>
      </div>
    </div>
  )
}