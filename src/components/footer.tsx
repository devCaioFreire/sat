'use client'
import { useAuthContext } from "@/context/authContext";
import { useCustomerContext } from "@/context/customerData";
import { ProductContext } from "@/context/salesList";
import { AxiosNode } from "@/services/axios";
import { CurrentDateFormatted, CurrentTimeFormatted, formatCpfOrCnpj } from "@/utils/formatter";
import { AxiosError, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";

export function Footer() {

  const { customerData } = useCustomerContext();
  const { user } = useAuthContext();

  const currentDate = CurrentDateFormatted();
  const currentTime = CurrentTimeFormatted();
  const [orderID, setOrderID] = useState<number | null>(null);
  const { sendSalesData } = useContext(ProductContext);

  useEffect(() => {
    const getOrderID = async () => {
      try {
        const response = await AxiosNode.get('/getOrder');
        const { nextOrderNumber } = response.data;

        if (nextOrderNumber !== orderID) {
          setOrderID(nextOrderNumber);
        }
      } catch (error) {
        console.error('Erro ao obter o número do pedido:', error);
      }
    };

    getOrderID();

    const interval = setInterval(getOrderID, 60000); // Verificar a cada 3 segundos, por exemplo

    return () => clearInterval(interval); // Limpar o intervalo quando o componente for desmontado
  }, [orderID]);

  const getOrderID = async () => {
    AxiosNode.get('/getOrder')
      .then((response: AxiosResponse) => {
        const { nextOrderNumber } = response.data;
        setOrderID(nextOrderNumber);
      })
      .catch((error: AxiosError) => {
        console.error('Erro ao obter o número do pedido:', error);
      });
  };

  return (
    <footer className="flex w-full h-[0%] justify-center items-center">
      <ul className="flex gap-4">
        <li className="flex items-center gap-1">
          <span>Num. Pedido: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">{orderID}</span></span>
        </li>

        <li className="flex items-center gap-2">
          <span>Data: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">{currentDate}</span></span>
        </li>

        <li className="flex items-center gap-1">
          <span>Hora: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">{'16:30:00'}</span></span>
        </li >

        <li className="flex items-center gap-1">
          <span>Caixa: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">02</span></span>
        </li >

        <li className="flex items-center gap-1">
          <span>Vendedor: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">{user?.name} {user?.lastName}</span></span>
        </li >

        <li className="flex items-center gap-1">
          <span>Cliente: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">{customerData.customerName}</span></span>
        </li >

        <li className="flex items-center gap-1">
          <span>CPF / CNPJ: <span className="bg-backgroundFields px-4 py-1 mb-4 rounded-lg">{formatCpfOrCnpj(customerData.cpfOrCnpj!)}</span></span>
        </li >
      </ul >
    </footer >

  )
}

