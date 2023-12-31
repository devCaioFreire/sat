'use client'
import { useProductContext } from "@/context/productContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { InputNumber, InputText } from "../components/inputs";

export default function RegisterProduct() {

  const { nextProductId, getNextProductId, sendNewProduct } = useProductContext()

  const [error, setError] = useState(false);
  const [productCode, setProductCode] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [unity, setUnity] = useState('');
  const [balance, setBalance] = useState('');
  const [ncmCode, setNcmCode] = useState('');
  const [eanCode, setEanCode] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    getNextProductId()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      productCode === '' ||
      description === '' ||
      value === '' ||
      unity === '' ||
      ncmCode === '' ||
      eanCode === '' ||
      status === ''
    ) {
      setError(true);
      console.log('Você não informou todos os campos');
      return;
    }

    const product = {
      codProduto: productCode,
      descricao: description,
      codEAN: eanCode || '',
      ncm: ncmCode || '',
      cfop: '',
      unCom: unity,
      vlrUnCom: value,
      saldo: 0,
      status: status
    };

    console.log(product)
    try {
      await sendNewProduct(product)

      setProductCode('')
      setDescription('')
      setValue('')
      setUnity('')
      setNcmCode('')
      setEanCode('')
      setStatus('')

      console.log(product)
    } catch (error) {
      console.error('Context (Error): ', error);
      throw error;
    }
  }

  return (
    <main className="flex flex-col border border-border rounded-lg h-fit">
      <header
        className="flex items-center justify-start w-full shadow-lg rounded-t-xl bg-backgroundSecundary default:h-6 lg:h-10">
        <Link href={"/dashboard/product"} className="px-4 flex-shrink-0">
          <BiLeftArrowAlt className="w-6 h-6" />
        </Link>
        <div className="flex-grow text-center items-center justify-center">
          <h1 className="font-medium">Cadastrar Produto</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between p-4">
        <div className="grid grid-cols-3 gap-8 h-full w-full">
          {/* ID */}
          <InputText
            className={`px-2 w-full h-12 rounded bg-backgroundFields border border-border outline-none disabled:cursor-not-allowed`}
            value={nextProductId || ''}
            placeholder={'ID'}
            isNotAllowed
          />

          {/* Product Code */}
          <InputText
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            value={productCode}
            onChange={(e: any) => setProductCode(e.target.value)}
            placeholder="Cód. Produto"
          />

          {/* Description */}
          <InputText
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            placeholder="Descrição"
          />

          {/* Value */}
          <InputNumber
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
            placeholder="Valor"
          />

          {/* Unity */}
          <InputText
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            value={unity}
            onChange={(e: any) => setUnity(e.target.value)}
            placeholder="Unidade"
          />

          {/* Balance */}
          <InputNumber
            className="px-2 w-full h-12 rounded bg-backgroundFields border border-border outline-none disabled:cursor-not-allowed"
            isNotAllowed
            value={0}
            placeholder="Saldo"
          />

          {/* NCM Code */}
          <InputNumber
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            value={ncmCode}
            onChange={(e: any) => setNcmCode(e.target.value)}
            max={8}
            placeholder="Cód. NCM"
          />

          {/* EAN Code */}
          <InputNumber
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            value={eanCode}
            onChange={(e: any) => setEanCode(e.target.value)}
            max={14}
            placeholder="Cód. EAN"
          />

          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="h-12 px-2 bg-transparent outline-none rounded border border-border">
            <option value="" className="bg-background">Status</option>
            <option value="A" className="bg-background">Ativo</option>
            <option value="I" className="bg-background">Inativo</option>
          </select>
        </div>
        <button
          type="submit"
          className={`flex p-4 rounded justify-center w-full transition-all mt-6 ${error ? 'bg-red-700 hover:bg-red-600' : 'bg-indigo-700 hover:bg-indigo-600'}`}>
          Cadastrar
        </button>
      </form>
    </main>
  )
}