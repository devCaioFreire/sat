import { AxiosNode } from "@/services/axios";
import { createContext, useContext, useEffect, useState } from "react";

export interface SalesOrderProps {
  id: string;
  valor_liquido: string;
  forma_pagamento: string;
  data_realizacao: string;
}

export interface ProductProps {
  id: string;
  descricao: string;
  valor_unitario: number;
  unCom: number;
  quantidade: number;
  valor_total: string;
}

interface OrderContextType {
  sales: SalesOrderProps[];
  products: ProductProps[];
  // getSalesOrder: (SalesOrder: SalesOrderProps) => void;
  // getSalesItems: (SalesItems: SalesOrderProps) => void;
  selectedProduct: ProductProps | null;
  setSelectedProduct: (product: ProductProps | null) => void;
  selectedOrder: SalesOrderProps | null;
  setSelectedOrder: (order: SalesOrderProps | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const SalesOrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sales, setSales] = useState<SalesOrderProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [loadedProducts, setLoadedProducts] = useState<ProductProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterArray, setFilterArray] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<SalesOrderProps | null>(null);

  const getSalesItems = async (orderID: string) => {
    try {
      const response = await AxiosNode.get(
        `/getOrderItems/?page=${currentPage}&filter=${JSON.stringify([{ field: 'pedido_id', value: orderID }])}&orderBy=id`
      );
      const newProducts = response.data;
      setProducts(newProducts);
      setLoadedProducts(newProducts);
    } catch (err) {
      console.error(err);
    }
  }

  const getSalesOrders = async () => {
    try {
      const response = await AxiosNode.get(
        `/getSalesOrders/?page=${currentPage}&filter=${JSON.stringify(filterArray)}&orderBy=id`
      );
      const newProducts = response.data;
      setSales(prevProducts => [...prevProducts, ...newProducts]);

      setLoadedProducts(prevLoadedProducts => [...prevLoadedProducts, ...newProducts]);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (selectedOrder) {
      setProducts([]);
      getSalesItems(selectedOrder.id);
    }
  }, [selectedOrder]);

  useEffect(() => {
    getSalesOrders();
  }, []);

  useEffect(() => {
    const table = document.getElementById('table');
    if (table) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = table;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        if (isAtBottom && !isLoading && loadedProducts.length > 0) {
          setCurrentPage(prevPage => prevPage + 1);
        }
      };
      table.addEventListener('scroll', handleScroll);
      return () => {
        table.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isLoading]);

  return (
    <OrderContext.Provider
      value={{
        products,
        sales,
        selectedProduct,
        setSelectedProduct,
        selectedOrder,
        setSelectedOrder,
      }}>
      {children}
    </OrderContext.Provider>
  )
}

// Função personalizada para usar o contexto
export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext deve ser usado dentro de um OrderContextProvider');
  }
  return context;
};