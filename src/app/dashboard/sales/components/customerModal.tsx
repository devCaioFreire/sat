'use client';
import { useEffect } from 'react';
import CustomerModalList, { CustomerModalProps } from './customerModalList';

const CustomerModal = ({ isOpenCustomerModal, onCloseCustomerModal, onFormSubmitCustomer }: CustomerModalProps) => {

  useEffect(() => {
    // Função para criar o focus trap no modal
    const handleFocusTrap = (event: KeyboardEvent) => {
      const modalContent = document.querySelector(".modal-content");
      if (!modalContent) return;

      const focusableElements = modalContent.querySelectorAll(
        "a[href], button, textarea, input[type='text'], input[type='number'], input[type='checkbox'], select"
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.key === "Tab") {
        // Verificar se o shift está pressionado para mover o foco de forma circular
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Restaura o foco para o primeiro elemento do modal quando ele é aberto
    if (isOpenCustomerModal) {
      const modalContent = document.querySelector(".modal-content");
      if (modalContent) {
        const focusableElements = modalContent.querySelectorAll(
          "a[href], button, textarea, input[type='text'], input[type='number'], input[type='checkbox'], select"
        );

        const firstElement = focusableElements[0] as HTMLElement;
        firstElement.focus();
      }
    }

    // Adicionar event listener para lidar com o focus trap
    if (isOpenCustomerModal) {
      document.addEventListener("keydown", handleFocusTrap);
    }

    // Remover event listener ao desmontar o componente
    return () => {
      document.removeEventListener("keydown", handleFocusTrap);
    };
  }, [isOpenCustomerModal]);

  if (!isOpenCustomerModal) return null;

  return (
    <div className={`fixed z-50 inset-0 bg-opacity-50 bg-backgroundModal backdrop-blur-md`}>
      <div className="modal-content absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl flex flex-col w-[45rem] h-[30rem] gap-4 border border-border rounded-2xl bg-background">
        {/* Header */}
        <div className='absolute flex items-center justify-center top-0 h-16 w-full rounded-t-2xl bg-backgroundSecundary'>
          <h1 className='text-xl font-medium'>Cliente (Opcional)</h1>
        </div>
        <CustomerModalList
          isOpenCustomerModal={isOpenCustomerModal}
          onCloseCustomerModal={onCloseCustomerModal}
          onFormSubmitCustomer={onFormSubmitCustomer} />
      </div>
    </div>
  );
};

export default CustomerModal;
