import CoupomList from "./components/coupomList";

export default function CancelTaxCoupom() {
  return (
    <main className="flex flex-col border border-border rounded-lg h-full">
      <header
        className="flex items-center justify-center w-full shadow-lg rounded-t-xl bg-backgroundSecundary default:h-6 lg:h-10">
        <h1 className="font-medium">Cancelar Cupom</h1>
      </header>

      <CoupomList />
    </main>
  )
}