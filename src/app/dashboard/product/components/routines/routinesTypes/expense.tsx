import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/authContext";
import { useProductContext } from "@/context/productContext";
import React, { ReactNode, useState } from "react";
import { Button } from "../../../../../../components/ui/button";

interface FilterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  selectedIndex?: any;
}

export const Expense: React.FC<FilterModalProps> = ({ isOpen, onClose, children, selectedIndex }) => {
  const { increaseBalance, selectedProduct, error, setError } = useProductContext();
  const [decreaseBalance, setDecreaseBalance] = useState("");

  const { user } = useAuthContext();

  const [increaseBalanceValue, setIncreaseBalanceValue] = useState("");
  const [order, setOrder] = useState("");
  const [observation, setObservation] = useState("");

  async function handleDecrease(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      pm_usuario_id: user!.id,
      pm_produto_id: selectedProduct?.id,
      pm_quantidade: parseFloat(increaseBalanceValue),
      pm_numero_nota_fiscal: parseInt(order),
      pm_observacao: observation,
    }

    if (increaseBalanceValue && order && observation === '' || null) {
      setError(true);
      return;
    }

    try {
      console.log(data)
      await increaseBalance(data)
      setIncreaseBalanceValue("");
      setOrder("");
      setObservation("");
      onClose?.();
    } catch (error) {
      console.log('Error:', error);
      setError(true);
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className={`sm:max-w-[768px] ${error ? 'border-red-700' : ''}`}>
          <DialogHeader>
            <DialogTitle>Saída</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDecrease}>
            <div className="grid gap-4 py-4">
              <div className="flex items-center mb-8 justify-between w-full">
                <span className="flex gap-2 font-bold flex-col">
                  ID
                  <span className="font-normal">{selectedIndex?.id}</span>
                </span>

                <span className="flex text-center gap-2 font-bold flex-col">
                  Descrição
                  <span className="font-normal">{selectedIndex?.descricao}</span>
                </span>

                <span className="flex text-end gap-2 font-bold flex-col">
                  Saldo
                  <span className="font-normal">{selectedIndex?.saldo}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="flex flex-col gap-4">
                  <label>Número da nota</label>
                  <Input
                    id="id"
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    placeholder="Informe o número da nota"
                    className="col-span-full"
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <label>Saldo</label>
                  <Input
                    id="id"
                    type="number"
                    value={decreaseBalance}
                    onChange={(e) => setDecreaseBalance(e.target.value)}
                    placeholder="Saldo a ser removido"
                    className="col-span-full"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="flex flex-col my-12 gap-4">
                <label>Observação</label>
                <textarea
                  id="id"
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  placeholder="Digite a observação para a retirada de saldo desse produto"
                  className="resize-none flex h-24 w-full rounded-md border border-stone-800 bg-stone-950 ring-offset-stone-200 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  autoComplete="off"
                />
              </div>

              <DialogFooter className="w-full">
                <Button className="w-full" type="submit">Retirar</Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
