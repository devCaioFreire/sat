import { AxiosNode } from "@/services/axios";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

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

interface FilterType {
  field: string;
  value: string | number | boolean;
}

interface SortType {
  asc: string;
  desc: string;
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
  getOrderByFilter: (filterType: FilterType) => void;
  loadedProducts: SalesOrderProps[];
  setLoadedProducts: Dispatch<SetStateAction<SalesOrderProps[]>>;
  filter: string | null;
  setFilter: (filter: string | null) => void;
  filterType: FilterType[];
  setFilterType: (filterType: FilterType[]) => void;
  loadSalesItems: (orderID: string) => void;
  clearFilter: () => void;
  sortOrder: string;
  toggleSort: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const SalesOrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sales, setSales] = useState<SalesOrderProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loadedProducts, setLoadedProducts] = useState<SalesOrderProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterArray, setFilterArray] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<SalesOrderProps | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const getSalesItems = async (orderID: string) => {
    try {
      const response = await AxiosNode.get(
        `/getOrderItems/?page=${currentPage}&filter=${JSON.stringify([{ field: 'pedido_id', value: orderID }])}&orderBy=id`
      );
      const newProducts = response.data;
      setProducts(newProducts);
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
      if (currentPage === 0) {
        setSales(newProducts); // Redefina a lista se estiver na página 0
        setLoadedProducts(newProducts);
      } else {
        setSales(prevProducts => [...prevProducts, ...newProducts]); // Anexe à lista se estiver em uma página diferente de 0
        setLoadedProducts(prevLoadedProducts => [...prevLoadedProducts, ...newProducts]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // GET
  const getOrderByFilter = async (filterType: FilterType) => {
    setCurrentPage(0);
    console.log(filterType);
    const newFilterArray = [];

    try {
      const filterMap: FilterType[] = [filterType];

      for (const filter of filterMap) {
        if (filter.field === 'withSaldo') {
          newFilterArray.push({ field: filter.field, value: "1" });
        } else if (filter.field === 'withoutSaldo') {
          newFilterArray.push({ field: filter.field, value: "0" });
        } else {
          newFilterArray.push(filter);
        }
      }

      console.log('filter', currentPage);
      const apiUrl = `/getSalesOrders/?page=${currentPage}&filter=${JSON.stringify(newFilterArray)}&orderBy=id&order=${sortOrder}`;
      const response = await AxiosNode.get(apiUrl);
      const orders = response.data;
      setLoadedProducts(orders);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleSort = () => {
    setSortOrder(prevSort => prevSort === 'asc' ? 'desc' : 'asc');
  };

  const clearFilter = () => {
    setFilter(null);
    setFilterType([]);
    setFilterArray([]);
    setLoadedProducts([]);
    setCurrentPage(0);
    console.log(filterArray)
    getSalesOrders();
  };

  // Estou passando o id da venda para conseguir ver os items do pedido de venda
  const loadSalesItems = (orderID: string) => {
    setProducts([]);
    getSalesItems(orderID);
  }

  useEffect(() => {
    getSalesOrders();
  }, []);

  useEffect(() => {
    const table = document.getElementById('table_order');
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
        getOrderByFilter,
        loadedProducts,
        setLoadedProducts,
        filter,
        setFilter,
        filterType,
        setFilterType,
        loadSalesItems,
        clearFilter,
        sortOrder,
        toggleSort
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