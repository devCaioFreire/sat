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

  const { calculateTotal } = useContext(ProductContext);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [payment, setPayment] = useState(0);
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
    const paymentValue = parseFloat(event.target.value);
    const changeValue = calculateTotal() - paymentValue;
    setPayment(paymentValue);
    setChange(changeValue);

    if (isNaN(paymentValue) || paymentValue < 0) {
      setPayment(0);
      setChange(calculateTotal());
    } else {
      setPayment(paymentValue);
      setChange(Math.max(changeValue, 0));
    }
  }

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const paymentMethod = event.target.value;
    setSelectedPaymentMethod(paymentMethod);

    if (paymentMethod === "money") {
      setChange(calculateChange());
    } else {
      setChange(0);
      setTroco(0);
    }
  };

  const handleDiscountAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const discountAmountValue = parseFloat(event.target.value);
    const discountPercentValue = (discountAmountValue * 100) / calculateTotal();
    setDiscountAmount(discountAmountValue);
    setDiscountPercent(discountPercentValue);
    setChange(calculateTotal() - discountAmountValue);
  }

  const handleDiscountPercentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const discountPercentValue = parseFloat(event.target.value);
    setDiscountPercent(discountPercentValue);
    const discountAmountValue = (calculateTotal() * discountPercentValue) / 100;
    setDiscountAmount(discountAmountValue);
    setChange(calculateTotal() - discountAmountValue);
    setTotalValue(calculateTotal() - discountAmountValue);
  }

  const formatValueToTwoDecimals = (value: number) => {
    return parseFloat(value.toFixed(2));
  }

  const calculateChange = () => {
    const changeValue = payment - total;
    return selectedPaymentMethod === 'money' ? (changeValue > 0 ? formatValueToTwoDecimals(changeValue) : formatValueToTwoDecimals(0)) : formatValueToTwoDecimals(0);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isTotalInvalid = calculateTotal() <= 0;
    const isPaymentMethodInvalid = selectedPaymentMethod === '';
    const isPaymentInvalid = selectedPaymentMethod === 'money' && (isNaN(payment) || payment <= 0);

    setErrorTotal(isTotalInvalid);
    setErrorPaymentMethod(isPaymentMethodInvalid || isPaymentInvalid);

    if (isTotalInvalid || isPaymentMethodInvalid || isPaymentInvalid) {
      return;
    }

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
            className={`bg-backgroundFields px-9 py-2 mb-4 rounded-lg border ${errorTotal ? "border-red-800" : "border-transparent"}`}>
            {formatCurrency(totalGross)}
          </span>
        </li>

        {/* Desconto Percentual */}
        <li
          className='flex justify-between items-center border-b'>
          Desconto %
          <span className='bg-backgroundFields w- px-8 py-2 mb-4 border border-transparent rounded-lg'>
            <input
              type="number"
              id="descount"
              value={formatValueToTwoDecimals(discountPercent)}
              onChange={handleDiscountPercentChange}
              autoFocus
              className='w-14 outline-none bg-transparent' />%
          </span>
        </li>

        {/* Desconto */}
        <li
          className='flex justify-between items-center border-b'>
          Desconto R$
          <span className='bg-backgroundFields px-6 py-2 mb-4 border border-transparent rounded-lg'>
            R$ <input
              type="number"
              id="discount"
              value={formatValueToTwoDecimals(discountAmount)}
              onChange={handleDiscountAmountChange}
              className='w-14 outline-none bg-transparent' />
          </span>
        </li>

        {/* Acréscimo */}
        <li
          className='flex justify-between items-center border-b'>
          Acréscimo
          <span className='bg-backgroundFields px-8 py-2 mb-4 border border-transparent rounded-lg'>{formatCurrency(0)}</span>
        </li>

        {/* Total */}
        <li
          className='flex justify-between items-center border-b'>
          Total
          <span className='bg-backgroundFields px-8 py-2 mb-4 border border-transparent rounded-lg'>{isNaN(totalValue) ? formatCurrency(calculateTotal()) : formatCurrency(totalValue)}</span>
        </li>

        {/* Forma de Pagamento */}
        <li
          className='flex justify-between items-center border-b'>
          Forma de Pagamento
          <span
            className={`bg-backgroundFields px-6 py-2 mb-4 rounded-lg border ${errorPaymentMethod ? "border-red-800" : "border-transparent"}`}>
            <select
              className="bg-transparent appearance-none border-none"
              onChange={handlePaymentMethodChange}
              value={selectedPaymentMethod}>
              <option
                value=""
                className="bg-backgroundModal">Selecione...</option>
              <option
                value="credit"
                className="bg-backgroundModal">Cartão de Crédito</option>
              <option
                value="debit"
                className="bg-backgroundModal">Cartão de Débito</option>
              <option
                value="money"
                className="bg-backgroundModal">Dinheiro</option>
              <option
                value="meal_voucher"
                className="bg-backgroundModal">Vale-Alimentação</option>
              <option
                value="food_voucher"
                className="bg-backgroundModal">Vale-Refeição</option>
            </select>
          </span>
        </li>

        {/* Pagamento */}
        {selectedPaymentMethod === "money" ? (
          <li className='flex justify-between items-center border-b'>
            Pagamento
            <span className='bg-backgroundFields px-6 py-2 mb-4 border border-transparent rounded-lg'>
              R$ <input
                type="number"
                id="descount"
                onChange={handlePaymentChange}
                className='w-14 outline-none bg-transparent'
              />
            </span>
          </li>
        ) : (
          <li className='flex justify-between items-center border-b'>
            Pagamento
            <span className='bg-backgroundFields px-6 py-2 mb-4 border border-transparent rounded-lg'>
              R$ <input
                type="number"
                id="descount"
                value={total.toFixed(2)}
                readOnly
                className='w-14 outline-none bg-transparent'
              />
            </span>
          </li>
        )}

        {/* Troco */}
        {selectedPaymentMethod === 'money' ? (
          <li
            className='flex justify-between items-center border-b'>
            Troco
            <span
              className='bg-backgroundFields px-8 py-2 mb-4 border border-transparent rounded-lg'>
              {formatCurrency(calculateChange())}
            </span>
          </li>
        ) : (
          <li
            className='flex justify-between items-center border-b'>
            Troco
            <span
              className='bg-backgroundFields px-8 py-2 mb-4 border border-transparent rounded-lg'>
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
