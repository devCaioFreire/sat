import { ProductContext } from "@/context/salesList";
import { formatCurrency } from "@/utils/formatter";
import { useContext, useState } from "react";

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onFormSubmit?: () => void;
  onOpenCustomerModal?: () => void;
}

export const CheckoutModalList: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onFormSubmit, onOpenCustomerModal }) => {

  const { calculateTotal, product, sendSalesData } = useContext(ProductContext);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [payment, setPayment] = useState('');
  const [change, setChange] = useState(calculateTotal());
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [troco, setTroco] = useState(0);
  const [totalValue, setTotalValue] = useState<number>(calculateTotal() - discountAmount);

  const [errorPaymentMethod, setErrorPaymentMethod] = useState(false);
  const [errorTotal, setErrorTotal] = useState(false);

  const total = calculateTotal() - discountAmount;
  const totalGross = formatCurrency(calculateTotal());

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Remove tudo que não for número (exceto ponto para números decimais)
    const cleanedValue = inputValue.replace(/[^0-9,.]/g, '');
    setPayment(cleanedValue);
    const parsedValue = parseFloat(cleanedValue);
    const changeValue = !isNaN(parsedValue) ? parsedValue - totalValue : calculateTotal();
    setChange(changeValue);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9,.]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const paymentMethod = event.target.value;
    setSelectedPaymentMethod(paymentMethod);

    if (paymentMethod === "dinheiro") {
      if (discountAmount === 0) {
        // Se nenhum desconto estiver sendo aplicado, o pagamento deve ser igual ao total
        setPayment(total.toFixed(2));
        setChange(total);
      } else {
        setPayment((totalValue || 0).toFixed(2)); // Definir o valor para total da compra com desconto
      }
    } else {
      setChange(0);
      setTroco(0);
      setPayment('');
    }
  };

  const handleDiscountPercentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const discountPercentValue = parseFloat(event.target.value);
    setDiscountPercent(discountPercentValue);

    const discountAmountValue = (calculateTotal() * discountPercentValue) / 100;
    setDiscountAmount(discountAmountValue);

    // Ajuste na atualização do valor total somente se houver um desconto aplicado
    if (discountAmountValue > 0) {
      const totalValue = calculateTotal() - discountAmountValue;
      setTotalValue(totalValue);
      setChange(calculateChange());
    }
  };

  const handleDiscountAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const discountAmountValue = parseFloat(event.target.value);
    setDiscountAmount(discountAmountValue);

    // Ajuste na atualização do valor total somente se houver um desconto aplicado
    if (discountAmountValue > 0) {
      const discountPercentValue = (discountAmountValue * 100) / calculateTotal();
      setDiscountPercent(discountPercentValue);

      const totalValue = calculateTotal() - discountAmountValue;
      setTotalValue(totalValue);
      setChange(calculateChange());
    }
  };

  const formatValueToTwoDecimals = (value: number) => {
    return parseFloat(value.toFixed(2));
  }

  const calculateChange = () => {
    const changeValue = parseFloat(payment) - totalValue;
    return selectedPaymentMethod === 'dinheiro' ? (changeValue > 0 ? formatValueToTwoDecimals(changeValue) : formatValueToTwoDecimals(0)) : formatValueToTwoDecimals(0);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isTotalInvalid = calculateTotal() <= 0;
    const isPaymentMethodInvalid = selectedPaymentMethod === '';
    const isPaymentInvalid =
      selectedPaymentMethod === 'dinheiro' &&
      (payment.trim() === '' || parseFloat(payment) <= 0);

    setErrorTotal(isTotalInvalid);
    setErrorPaymentMethod(isPaymentMethodInvalid || isPaymentInvalid);

    if (isTotalInvalid || isPaymentMethodInvalid || isPaymentInvalid) {
      return;
    }

    const salesData = {
      itens: product.map((item) => ({
        produto_id: item.id,
        ean: item.ean.toString(),
        descricao: item.description,
        quantidade: item.quantity,
        valor_unitario: item.unityValue,
        valor_total: item.totalValue!,
      })),
      valor_bruto: calculateTotal(),
      valor_liquido: totalValue,
      vendedor_id: 0,
      desconto: discountAmount,
      forma_pagamento: selectedPaymentMethod,
      pagamento: selectedPaymentMethod === 'dinheiro' ? parseFloat(payment) : totalValue,
      troco: selectedPaymentMethod === 'dinheiro' ? change : 0,
    };

    // await sendSalesData(salesData);

    console.log(salesData);
    onFormSubmit?.();
    onClose?.();
    onOpenCustomerModal?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='h-[calc(100%-180px)]'>
      <ul className='flex flex-col mt-[calc(2rem+4rem)] h-full justify-between text-lg px-4'>

        {/* Total Bruto */}
        <li
          className='flex justify-between items-center border-b'>
          Total Bruto
          <span
            className={`bg-backgroundFields w-48 px-4 py-2 mb-4 rounded-lg border ${errorTotal ? "border-red-800" : "border-transparent"}`}>
            {formatCurrency(totalGross)}
          </span>
        </li>

        {/* Desconto Percentual */}
        <li
          className='flex justify-between items-center border-b'>
          Desconto %
          <span className='bg-backgroundFields flex gap-2 w-48 px-4 py-2 mb-4 border border-transparent rounded-lg'>
            %
            <input
              type="number"
              id="discountPercent"
              value={formatValueToTwoDecimals(discountPercent)}
              onChange={handleDiscountPercentChange}
              autoFocus
              className='flex w-full outline-none bg-transparent' />
          </span>
        </li>

        {/* Desconto */}
        <li
          className='flex justify-between items-center border-b'>
          Desconto R$
          <span className='bg-backgroundFields flex gap-1 w-48 px-4 py-2 mb-4 border border-transparent rounded-lg'>
            R$
            <input
              type="number"
              id="discountAmount"
              value={formatValueToTwoDecimals(discountAmount)}
              onChange={handleDiscountAmountChange}
              className='w-full outline-none bg-transparent' />
          </span>
        </li>

        {/* Acréscimo */}
        <li
          className='flex justify-between items-center border-b'>
          Acréscimo
          <span className='flex bg-backgroundFields w-48 px-4 py-2 mb-4 border border-transparent rounded-lg'>{formatCurrency(0)}</span>
        </li>

        {/* Total */}
        <li
          className='flex justify-between items-center border-b'>
          Total
          <span
            className='bg-backgroundFields flex w-48 px-4 py-2 mb-4 border border-transparent rounded-lg'>
            {isNaN(totalValue) ? formatCurrency(calculateTotal()) : formatCurrency(totalValue)}
          </span>
        </li>

        {/* Forma de Pagamento */}
        <li
          className='flex justify-between items-center border-b'>
          Forma de Pagamento
          <span
            className={`bg-backgroundFields flex w-48 px-4 py-2 mb-4 rounded-lg border ${errorPaymentMethod ? "border-red-800" : "border-transparent"}`}>
            <select
              className="bg-transparent appearance-none border-none"
              onChange={handlePaymentMethodChange}
              value={selectedPaymentMethod}>
              <option
                value=""
                className="bg-backgroundModal">Selecione...</option>
              <option
                value="credito"
                className="bg-backgroundModal">Cartão de Crédito</option>
              <option
                value="debito"
                className="bg-backgroundModal">Cartão de Débito</option>
              <option
                value="dinheiro"
                className="bg-backgroundModal">Dinheiro</option>
              <option
                value="vale_alimentacao"
                className="bg-backgroundModal">Vale-Alimentação</option>
              <option
                value="vale_refeicao"
                className="bg-backgroundModal">Vale-Refeição</option>
            </select>
          </span>
        </li>

        {/* Pagamento */}
        {selectedPaymentMethod === "dinheiro" ? (
          <li className='flex justify-between items-center border-b'>
            Pagamento
            <span className='bg-backgroundFields flex gap-1 w-48 px-4 py-2 mb-4 border border-transparent rounded-lg'>
              R$ <input
                type="text"
                value={(payment)}
                onChange={handlePaymentChange}
                onKeyPress={handleKeyPress}
                className='w-full outline-none bg-transparent'
              />
            </span>
          </li>
        ) : (
          <li className='flex justify-between items-center border-b'>
            Pagamento
            <span className='bg-backgroundFields flex gap-1 w-48 px-4 py-2 mb-4 border border-transparent rounded-lg'>
              R$ <input
                type="text"
                value={selectedPaymentMethod === "dinheiro" ? payment : (totalValue || 0).toFixed(2)}
                readOnly
                className='w-full outline-none bg-transparent'
              />
            </span>
          </li>
        )}

        {/* Troco */}
        {selectedPaymentMethod === 'dinheiro' ? (
          <li
            className='flex justify-between items-center border-b'>
            Troco
            <span
              className='bg-backgroundFields flex w-48 px-4 py-2 mb-4 border border-transparent rounded-lg'>
              {formatCurrency(calculateChange())}
            </span>
          </li>
        ) : (
          <li
            className='flex justify-between items-center border-b'>
            Troco
            <span
              className='bg-backgroundFields flex w-48 px-4 py-2 mb-4 border border-transparent rounded-lg'>
              {formatCurrency(0)}
            </span>
          </li>
        )}

      </ul>

      <button
        type="submit"
        className='fixed bottom-0 flex w-full justify-center items-center rounded-b-2xl py-4 transition-all bg-emerald-900 hover:bg-emerald-700'
      >Finalizar Venda
      </button>
    </form>
  )
}

export default CheckoutModalList;
