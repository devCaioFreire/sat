import { AxiosNode } from "@/services/axios";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useRef, useState } from "react";

export interface ProductProps {
  id: string;
  pedido_id: string;
  descricao: string;
  valor_unitario: number;
  unCom: number;
  quantidade: number;
  valor_total: string;
}

export interface SalesOrderProps {
  id: string;
  valor_liquido: string;
  forma_pagamento: string;
  data_realizacao: string;
  status?: string;
  itens?: ProductProps[];
}

interface FilterType {
  field: string;
  value: string | number | boolean;
}

interface OrderContextType {
  sales: SalesOrderProps[];
  products: ProductProps[];
  selectedProduct: ProductProps | null;
  setSelectedProduct: (product: ProductProps | null) => void;
  selectedOrder: SalesOrderProps | null;
  setSelectedOrder: (order: SalesOrderProps | null) => void;
  getOrderByFilter: (filterType: FilterType) => void;
  getSalesOrders: () => void;
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
  filterArray: any[];
  fetchAllProductsForPrint: (filterArray: any[]) => Promise<SalesOrderProps[]>;
  combineOrdersWithItems: () => Promise<SalesOrderProps[]>;
  combined: any;
  setCombined: Dispatch<SetStateAction<SalesOrderProps[]>>;
  isLoading: boolean;
  searchByPeriod: ({ dateInitial, dateFinal }: any) => void;
  loadInitialData: (filters: FilterType[]) => void;
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
  const [combined, setCombined] = useState<SalesOrderProps[]>([]);

  const nextPageRef = useRef(1);

  const getSalesItems = async (orderID: string) => {
    try {
      const response = await AxiosNode.get(
        `/getOrderItems/?page=${currentPage}&filter=${JSON.stringify([{ field: 'id', value: orderID }])}&orderBy=id`
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
        `/getSalesOrders/?take=1000000000000&filter=${JSON.stringify(filterArray)}&orderBy=id`
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
      setFilterArray(orders);
      setLoadedProducts(orders);
    } catch (error) {
      console.log(error);
    }
  }

  const searchByPeriod = async ({ dateInitial, dateFinal }: any) => {
    try {
      const periodFilter = [
        { field: 'dateInitial', value: dateInitial },
        { field: 'dateFinal', value: dateFinal }
      ];
      const apiUrl = `/getSalesOrders/?page=${currentPage}&filter=${JSON.stringify(periodFilter)}&orderBy=id&order=${sortOrder}`;
      const response = (await AxiosNode.get(apiUrl)).data;
      setLoadedProducts(response);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAllProductsForPrint = async (filterArray: FilterType[]) => {
    try {
      const response = await AxiosNode.get(
        `/getSalesOrders/?take=1000000000000&page=0&filter=${JSON.stringify(filterArray)}&orderBy=id`
      );
      console.log('teste 7', response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const combineOrdersWithItems = async () => {
    try {
      const response = await AxiosNode.get(
        `/getOrderItems/?take=1000000000000&page=${currentPage}&filter=${JSON.stringify([{ field: 'id', value: "" }])}&orderBy=id`
      );
      const allProducts = response.data;
      // console.log("Todos os itens:", allProducts);

      const combinedOrders = sales.map(order => {
        const orderItems = allProducts.filter((product: any) => product.pedido_id === order.id);
        return {
          ...order,
          itens: orderItems
        };
      });
      // console.log("Lista de pedidos:", sales);

      // console.log("Pedidos combinados:", combinedOrders);
      return combinedOrders;
    } catch (error) {
      console.error("Erro ao buscar os itens:", error);
      return [];
    }
  };

  const loadInitialData = async (filters?: FilterType[]) => {
    setIsLoading(true);

    try {
      const response = await AxiosNode.get(`/getSalesOrders/?page=${currentPage}&filter=${JSON.stringify(filterArray)}&orderBy=id`);
      const allProducts = response.data;

      setLoadedProducts(allProducts)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMoreProducts = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await AxiosNode.get(
        `/getSalesOrders/?page=${nextPageRef.current}&filter=${JSON.stringify(filterArray)}&orderBy=id`
      );
      const newProducts = response.data;
      nextPageRef.current += 1;
      setLoadedProducts(prevLoadedProducts => [...prevLoadedProducts, ...newProducts]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAndCombineOrders = async () => {
      if (filterType.length > 0) {
        await getOrderByFilter(filterType[0]); // Passe o filtro desejado aqui
      }
      const orders = await combineOrdersWithItems();
      setCombined(orders);
    };

    fetchAndCombineOrders();
  }, []);

  const toggleSort = () => {
    setSortOrder(prevSort => prevSort === 'asc' ? 'desc' : 'asc');
  };

  const clearFilter = () => {
    setFilter(null);
    setFilterType([]);
    setFilterArray([]);
    setLoadedProducts([]);
    loadInitialData()
    setCurrentPage(0);
    nextPageRef.current = 1;
    setSortOrder('asc');
  };

  // Estou passando o id da venda para conseguir ver os items do pedido de venda
  const loadSalesItems = (orderID: string) => {
    setProducts([]);
    getSalesItems(orderID);
  }

  useEffect(() => {
    const table = document.getElementById('table_order');
    if (table) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = table;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        if (isAtBottom) {
          if (!isLoading) {
            fetchMoreProducts()
          }
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
        toggleSort,
        filterArray,
        fetchAllProductsForPrint,
        combineOrdersWithItems,
        combined,
        setCombined,
        isLoading,
        searchByPeriod,
        loadInitialData,
        getSalesOrders
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