import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  onCloseModal: () => void;
}

export function Modal({ onCloseModal }: ModalProps) {
  return (
    <Dialog.Root onOpenChange={onCloseModal}>
      <Dialog.Trigger asChild />
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black fixed inset-0" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-base m-0 text-[17px] font-medium">
            Edit profile
          </Dialog.Title>
          <Dialog.Description />
          <Dialog.Close asChild /> {/* Use Dialog.Close to handle close event */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
