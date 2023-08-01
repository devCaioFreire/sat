'use client';
import { ProductContext } from "@/context/salesList";
import { useContext, useState } from "react";

export function Barcode() {

  const { getProductByEAN } = useContext(ProductContext);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  async function barcodeID(e: any) {
    e.preventDefault();

    if (code.trim() === '') {
      setError(true);
      return;
    }

    const parts = code.split('*');
    if (parts.length === 1) {
      parts.unshift('1');
    } else if (parts.length !== 2 || isNaN(Number(parts[0])) || isNaN(Number(parts[1]))) {
      setError(true);
      return;
    }

    const quantity = Number(parts[0]);
    const id = Number(parts[1]);

    try {
      await getProductByEAN(id, quantity);
      setError(false);
    } catch (error) {
      setError(true);
    }
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
        className={`flex items-start w-[80%] border-2 mt-7 rounded-lg bg-backgroundSecundary ${error ? "border-red-800" : "border-transparent"
          }`}>
        <form
          className="w-full"
          onSubmit={barcodeID}>
          <input
            className="w-full py-2 px-2 bg-transparent outline-none"
            type="text"
            id="barcode"
            placeholder={`${error ? 'Produto não encontrado...' : 'Quantidade * Produto'}`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(event) => {
              if (event.ctrlKey && event.key === 'j') {
                event.preventDefault();
                return;
              }
            }} />
        </form>
      </div>
    </div>
  )
}