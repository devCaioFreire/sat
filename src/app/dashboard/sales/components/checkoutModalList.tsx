import { ProductContext } from "@/context/salesList";
import { formatCurrency } from "@/utils/date";
import { useContext } from "react";

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const CheckoutModalList: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log('SEND');
  }

  const { calculateTotal } = useContext(ProductContext);

  return (
    <form
      onSubmit={handleSubmit}
      className='h-[calc(100%-180px)]'>
      <ul className='flex flex-col mt-[calc(2rem+4rem)] h-full justify-between text-lg px-4'>

        <li
          className='flex justify-between items-center border-b'>
          Total Bruto
          <span className='bg-backgroundFields px-9 py-2 mb-4 rounded-lg'>{formatCurrency(calculateTotal())}</span>
        </li>

        <li
          className='flex justify-between items-center border-b'>
          Desconto %
          <span className='bg-backgroundFields px-8 py-2 mb-4 rounded-lg'>
            <input type="number" id="descount" min={0} className='w-14 outline-none bg-transparent' />%
          </span>
        </li>

        <li
          className='flex justify-between items-center border-b'>
          Desconto R$
          <span className='bg-backgroundFields px-6 py-2 mb-4 rounded-lg'>
            R$ <input type="number" id="discount" min={0} className='w-14 outline-none bg-transparent' />
          </span>
        </li>

        <li
          className='flex justify-between items-center border-b'>
          Acréscimo
          <span className='bg-backgroundFields px-8 py-2 mb-4 rounded-lg'>{formatCurrency(0)}</span>
        </li>

        <li
          className='flex justify-between items-center border-b'>
          Total
          <span className='bg-backgroundFields px-8 py-2 mb-4 rounded-lg'>{formatCurrency(calculateTotal())}</span>
        </li>

        <li
          className='flex justify-between items-center border-b'>
          Forma de Pagamento
          <span className='bg-backgroundFields px-6 py-2 mb-4 rounded-lg'>
            <select
              className="bg-transparent appearance-none border-none">
              <option
                value=""
                className="text-zinc-900 bg-backgroundModal">Selecione...</option>
              <option
                value="credit"
                className="text-zinc-900 bg-backgroundModal">Cartão de Crédito</option>
              <option
                value="debit"
                className="text-zinc-900 bg-backgroundModal">Cartão de Débito</option>
              <option
                value="money"
                className="text-zinc-900 bg-backgroundModal">Dinheiro</option>
              <option
                value="meal_voucher"
                className="text-zinc-900 bg-backgroundModal">Vale-Alimentação</option>
              <option
                value="food_voucher"
                className="text-zinc-900 bg-backgroundModal">Vale-Refeição</option>
            </select>
          </span>
        </li>

        <li
          className='flex justify-between items-center border-b'>
          Pagamento
          <span className='bg-backgroundFields px-6 py-2 mb-4 rounded-lg'>
            R$ <input
              type="number"
              id="descount"
              min={0}
              className='w-14 outline-none bg-transparent' />
          </span>
        </li>

        <li
          className='flex justify-between items-center border-b'>
          Troco
          <span className='bg-backgroundFields px-8 py-2 mb-4 rounded-lg'>{formatCurrency(calculateTotal())}</span>
        </li>

      </ul>

      <button
        className='fixed bottom-0 flex w-full justify-center items-center rounded-b-2xl py-4 bg-emerald-900'
        onClick={onClose}>Finalizar Venda
      </button>
    </form>
  )
}

export default CheckoutModalList;