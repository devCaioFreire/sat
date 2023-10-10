'use client';
import { useEffect, useState } from "react";
import UseSalePrint from "../../../../hooks/useSalePrint";

interface CoupomModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onOpenCoupomModal?: () => void;
  onOpenCustomerModal: () => void;
}

export const CoupomModal = ({ onOpenCoupomModal, onClose, onOpenCustomerModal }: CoupomModalProps) => {

  const [cupomVisible, setCupomVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();

        const modalContent = document.querySelector(".modalContent");
        if (!modalContent) return;

        const focusableElements = modalContent.querySelectorAll(
          "button"
        );

        const currentIndex = Array.from(focusableElements).findIndex(
          (element) => element === document.activeElement
        );

        let nextIndex = currentIndex;
        if (event.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % focusableElements.length;
        } else if (event.key === "ArrowLeft") {
          nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
        }

        focusableElements[nextIndex]?.focus();
      } else if (event.key === "Tab") {
        handleFocusTrap(event);
      }
    };

    const handleFocusTrap = (event: KeyboardEvent) => {
      const modalContent = document.querySelector(".modalContent");
      if (!modalContent) return;

      const focusableElements = modalContent.querySelectorAll(
        "a[href], button, textarea, input[type='text'], input[type='number'], input[type='checkbox'], select"
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement =
        focusableElements[focusableElements.length - 1] as HTMLElement;

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
    };

    // Restaura o foco para o primeiro elemento do modal quando ele é aberto
    if (onOpenCoupomModal) {
      const modalContent = document.querySelector(".modalContent");
      if (modalContent) {
        const focusableElements = modalContent.querySelectorAll(
          "a[href], button, textarea, input[type='text'], input[type='number'], input[type='checkbox'], select"
        );

        const firstElement = focusableElements[0] as HTMLElement;
        firstElement.focus();
      }
    }

    // Adicionar event listener para lidar com a navegação horizontal e focus trap
    document.addEventListener("keydown", handleKeyDown);

    // Remover event listener ao desmontar o componente
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpenCoupomModal]);


  function handleClose() {
    onClose?.()
    onOpenCustomerModal?.()
  }

  function handlePrint() {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      const iframeWindow = iframe.contentWindow;
      iframeWindow?.print();
    }
    // Adicionar um ouvinte para o evento de antes da impressão
    window.addEventListener("beforeprint", () => {
      setCupomVisible(false);
    });

    // Adicionar um ouvinte para o evento de depois da impressão
    window.addEventListener("afterprint", () => {
      handleClose();
    });
  }

  return (
    <div className={`fixed z-50 inset-0 bg-opacity-50 bg-backgroundModal backdrop-blur-md`}>
      <div className="modalContent absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl flex flex-col w-[45rem] h-[30rem] gap-4 border border-border rounded-2xl bg-background">
        {/* Header */}
        <div className='absolute flex items-center justify-center top-0 h-16 w-full rounded-t-2xl bg-backgroundSecundary'>
          <h1 className='text-xl font-medium'>Imprimir Pedido de Venda</h1>
        </div>

        <div className="flex w-full h-full mt-2">
          {cupomVisible && <UseSalePrint />}
        </div>
        <div className="flex gap-4">
          <button
            tabIndex={0}
            onClick={handleClose}
            className='fixed left-0 bottom-0 flex w-1/2 justify-center items-center rounded-bl-2xl py-4 transition-all bg-backgroundFields hover:bg-zinc-700'>
            Sair
          </button>
          <button
            tabIndex={1}
            onClick={handlePrint}
            className='fixed right-0 bottom-0 flex w-1/2 justify-center items-center rounded-br-2xl py-4 transition-all bg-indigo-700 hover:bg-indigo-600'>
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
};
