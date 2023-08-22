import { useAuthContext } from "@/context/authContext";
import { useCustomerContext } from "@/context/customerData";
import { useState } from "react";

export interface CustomerModalProps {
  id?: number;
  name?: string;
  value?: string;
  isOpenCustomerModal?: boolean;
  onOpenCustomerModal?: () => void;
  onCloseCustomerModal?: () => void;
  onFormSubmitCustomer?: () => void;
}

export const CustomerModalList: React.FC<CustomerModalProps> = ({ isOpenCustomerModal, onCloseCustomerModal, onFormSubmitCustomer, onOpenCustomerModal }) => {

  const { setCustomerData } = useCustomerContext();
  const { user } = useAuthContext();
  console.log(user);

  const [cpfOrCnpj, setCpfOrCnpj] = useState<string>('');
  const customerID = 0;
  const customerName = 'Consumidor Final';

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const customerData = {
      customerID: customerID,
      customerName: customerName,
      cpfOrCnpj: cpfOrCnpj,
    };

    setCustomerData(customerData);
    onFormSubmitCustomer?.();
    onCloseCustomerModal?.();
    onOpenCustomerModal?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='h-[calc(100%-180px)]'>

      <div className="flex flex-col justify-between mt-[calc(2rem+4rem)] h-full text-lg px-4">

        <h1>Cliente</h1>
        <div className="flex justify-between gap-4">
          <span className="bg-backgroundFields px-9 py-2 mb-4 rounded-lg">{customerID}</span>
          <span className="flex w-full bg-backgroundFields px-9 py-2 mb-4 rounded-lg">{customerName}</span>
        </div>

        <input
          placeholder="XX. XXX. XXX/0001-XX"
          type="number"
          value={cpfOrCnpj}
          onChange={(e) => setCpfOrCnpj(e.target.value)}
          className="flex w-full bg-backgroundFields px-9 py-2 mb-4 rounded-lg"
        />

        <h1>Vendedor</h1>
        <div className="flex justify-between gap-4">
          <span className="bg-backgroundFields px-9 py-2 mb-4 rounded-lg">{user?.id}</span>
          <span className="flex w-full bg-backgroundFields px-9 py-2 mb-4 rounded-lg">{user?.name} {user?.lastName}</span>
        </div>

      </div>
      <button
        type="submit"
        className='fixed bottom-0 flex w-full justify-center items-center rounded-b-2xl py-4 transition-all bg-indigo-900 hover:bg-indigo-700'
      >Prosseguir
      </button>
    </form>
  )
}

export default CustomerModalList;
