'use client';


interface CoupomModalProps {
  isOpen: boolean;
  onOpenCoupomModal?: () => void;
}

export const CoupomModal = ({ onOpenCoupomModal }: CoupomModalProps) => {

  return (
    <div className={`fixed z-50 inset-0 bg-opacity-50 bg-backgroundModal backdrop-blur-md`}>
      <div className="modal-content absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl flex flex-col w-[45rem] h-[30rem] gap-4 border border-border rounded-2xl bg-background">
        {/* Header */}
        <div className='absolute flex items-center justify-center top-0 h-16 w-full rounded-t-2xl bg-backgroundSecundary'>
          <h1 className='text-xl font-medium'>Imprimir Pedido de Venda (Opcional)</h1>
          <button
            type="submit"
            className='fixed bottom-0 flex w-full justify-center items-center rounded-b-2xl py-4 transition-all bg-indigo-700 hover:bg-indigo-600'>
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
};
