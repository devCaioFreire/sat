'use client';
import { useEffect, useState } from "react";
import CupomFiscal from '../../../../services/print';

interface CoupomModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onOpenCoupomModal?: () => void;
  onOpenCustomerModal: () => void;
}

export const CoupomModal = ({ onOpenCoupomModal, onClose, onOpenCustomerModal }: CoupomModalProps) => {

  const [cupomVisible, setCupomVisible] = useState(true);

  useEffect(() => {
    // Função para criar o focus trap no modal
    const handleFocusTrap = (event: KeyboardEvent) => {
      const modalContent = document.querySelector(".modalContent");
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
    if (onOpenCoupomModal) {
      const modalContent = document.querySelector(".modalContent");
      if (modalContent) {
        const focusableElements = modalContent.querySelectorAll("button");

        const firstElement = focusableElements[1] as HTMLElement;
        firstElement.focus();
      }
    }

    // Adicionar event listener para lidar com o focus trap
    if (onOpenCoupomModal) {
      document.addEventListener("keydown", handleFocusTrap);
    }

    // Remover event listener e foco ao desmontar o componente
    return () => {
      document.removeEventListener("keydown", handleFocusTrap);
    };
  }, [onOpenCoupomModal]);

  function handleClose() {
    onClose?.()
    onOpenCustomerModal?.()
  }

  function handleTest() {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      const iframeWindow = iframe.contentWindow;
      // Evento que escuta quando a janela do iframe for fechada (não confiável)
 

      // Inicia a impressão
      iframeWindow?.print();
    }
    window.addEventListener("afterprint", () => {
      // Fechar a janela após a impressão
      window.close();
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
          {cupomVisible && <CupomFiscal />}
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleClose}
            className='fixed left-0 bottom-0 flex w-1/2 justify-center items-center rounded-bl-2xl py-4 transition-all bg-backgroundFields hover:bg-zinc-700'>
            Sair
          </button>
          <button
            onClick={handleTest}
            className='fixed right-0 bottom-0 flex w-1/2 justify-center items-center rounded-br-2xl py-4 transition-all bg-indigo-700 hover:bg-indigo-600'>
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
};
