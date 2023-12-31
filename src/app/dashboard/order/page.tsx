'use client'
import { BsPrinterFill } from 'react-icons/bs';


import { useState } from 'react';
import { IconButton } from '../../../components/iconButton';
import { DatePickerWithRange } from './components/filters/datePicker';
import { OrderFilter } from './components/filters/orderFilter';
import { OrderList } from './components/orderList';
import { PrintOrderModal } from './components/printOrderModal';

export default function Order() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrint = async () => {
    setIsModalOpen(true);
  }

  return (
    <main className="flex flex-col border border-border rounded-lg h-full">
      <header
        className="flex items-center justify-between w-full shadow-lg px-4 rounded-t-xl bg-backgroundSecundary default:h-10 lg:h-10">
        <h1 className="font-medium">Pedidos de Venda</h1>

        <div className='flex gap-4'>
          <DatePickerWithRange />

          <IconButton title="Adicionar Produto">
            <OrderFilter />
          </IconButton>

          <IconButton onClick={handlePrint} title="Imprimir Produtos">
            <BsPrinterFill className="w-6 h-6 text-zinc-100" />
          </IconButton>

        </div>
      </header>
      <PrintOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <OrderList />
    </main>
  )
}