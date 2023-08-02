'use client';
import CheckoutModalList, { CheckoutModalProps } from './checkoutModalList';

const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="
      absolute z-50 top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 shadow-2xl
      flex flex-col w-[45rem] h-[45.938rem] gap-4 rounded-2xl bg-background">

      {/* Header */}
      <div className='absolute flex items-center justify-center top-0 h-16 w-full rounded-t-2xl bg-backgroundSecundary'>
        <h1 className='text-xl font-medium'>Recebimento</h1>
      </div>

      <CheckoutModalList isOpen={isOpen} onClose={onClose} />

    </div >
  );
};

export default CheckoutModal;
