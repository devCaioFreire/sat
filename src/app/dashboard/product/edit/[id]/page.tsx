'use client'
import { ProductProps, useProductContext } from "@/context/productContext";
import { useEffect, useState } from "react";
import { InputNumber, InputText } from "../../components/inputs";

export const EditProduct = ({ params }: { params: { id: string } }) => {

  const { id } = params;
  const { products, setSelectedProduct, sendUpdateProduct } = useProductContext();
  const [product, setProduct] = useState<ProductProps | null>(null);

  const [error, setError] = useState(false);
  const [ID, setID] = useState("");
  const [productCode, setProductCode] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [unity, setUnity] = useState("");
  const [balance, setBalance] = useState("");
  const [ncmCode, setNcmCode] = useState("");
  const [eanCode, setEanCode] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const selected = products.find((product) => product.id === id);

    if (selected) {
      setProduct(selected);
      setSelectedProduct(selected);

      setID(selected.id || '');
      setProductCode(selected.codProduto || '');
      setDescription(selected.descricao || '');
      setValue(selected.vlrUnCom || '');
      setUnity(selected.unCom || '');
      setBalance(selected.saldo || '');
      setNcmCode(selected.ncm || '');
      setEanCode(selected.codEAN || '');
      setStatus(selected.status || '');
    }
  }, [products, id, setSelectedProduct]);

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
      console.log('ERROR')
      setError(true);
      return;
    }

    const updateProduct = {
      id: ID,
      codProduto: productCode,
      descricao: description,
      codEAN: eanCode,
      ncm: ncmCode,
      cfop: '',
      unCom: unity,
      vlrUnCom: value,
      saldo: balance,
      status: status
    };

    try {
      await sendUpdateProduct(updateProduct)
      console.log(updateProduct)
    } catch (error) {
      console.error('Context (Error): ', error);
      throw error;
    }
  }

  return (
    <main className="flex flex-col border border-border rounded-lg h-1/2">
      <header
        className="flex items-center justify-center w-full shadow-lg rounded-t-xl bg-backgroundSecundary default:h-6 lg:h-10">
        <h1 className="font-medium">Editar Produto</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between p-4">
        <div className="grid grid-cols-3 gap-8 h-full w-full">
          <InputText
            className={`px-2 w-full h-12 rounded bg-backgroundFields border border-border outline-none disabled:cursor-not-allowed`}
            placeholder={'ID'}
            isNotAllowed
            value={ID}
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
            value={balance}
            onChange={(e: any) => setBalance(e.target.value)}
            placeholder="Saldo"
          />

          {/* NCM Code */}
          <InputNumber
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            value={ncmCode}
            onChange={(e: any) => setNcmCode(e.target.value)}
            placeholder="Cód. NCM"
            max={8}
          />

          {/* EAN Code */}
          <InputNumber
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            value={eanCode}
            onChange={(e: any) => setEanCode(e.target.value)}
            placeholder="Cód. EAN"
            max={14}
          />

          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="h-12 px-2 bg-transparent outline-none rounded border border-border">
            <option value="" className="bg-background">Status</option>
            <option value="A" className="bg-background">Ativo</option>
            <option value="I" className="bg-background">Inativo</option>
          </select>
        </div>
        <button
          type="submit"
          className="flex p-4 rounded justify-center w-full transition-all bg-indigo-700 hover:bg-indigo-600">
          Salvar
        </button>
      </form>
    </main>
  )
}

export default EditProduct;