import { Input } from "./components/inputs";

export const RegisterProduct = () => {
  return (
    <main className="flex flex-col border border-border rounded-lg h-1/2">
      <header
        className="flex items-center justify-center w-full shadow-lg rounded-t-xl bg-backgroundSecundary default:h-6 lg:h-10">
        <h1 className="font-medium">Cadastrar Produto</h1>
      </header>

      <form className="flex flex-col h-full justify-between p-4">
        <div className="grid grid-cols-3 gap-8 h-full w-full">
          <Input
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            isAllowed={false}
            placeholder="ID"
          />

          <Input
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            isAllowed={false}
            placeholder="Cód. Produto"
          />

          <Input
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            isAllowed={false}
            placeholder="Descrição"
          />

          <Input
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            isAllowed={false}
            placeholder="Valor"
          />

          <Input
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            isAllowed={false}
            placeholder="Unidade"
          />

          <Input
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            isAllowed={false}
            placeholder="Saldo"
          />

          <Input
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            isAllowed={false}
            placeholder="Cód. NCM"
          />

          <Input
            className="px-2 w-full h-12 rounded bg-transparent border border-border outline-none"
            isAllowed={false}
            placeholder="Cód. EAN"
          />

          <select id="status" className="h-12 px-2 bg-transparent outline-none rounded border border-border">
            <option value="status" className="bg-background">Status</option>
            <option value="ativo" className="bg-background">Ativo</option>
            <option value="inativo" className="bg-background">Inativo</option>
          </select>
        </div>
        <button
          type="submit"
          className="flex p-4 rounded justify-center w-full transition-all bg-indigo-700 hover:bg-indigo-600">
          Cadastrar
        </button>
      </form>
    </main>
  )
}

export default RegisterProduct;