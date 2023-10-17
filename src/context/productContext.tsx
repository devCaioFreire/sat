import { AxiosNode } from '@/services/axios';
import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useRef, useState } from 'react';

export interface ProductProps {
  id?: string;
  codProduto: string;
  descricao: string;
  vlrUnCom: string;
  unCom: string;
  saldo: string | number;
  status: string;
  ncm?: string;
  codEAN?: string;
}

interface BalanceProps {
  pm_usuario_id: number;
  pm_produto_id?: number | string;
  pm_quantidade: number;
  pm_pedido_venda_id?: number | null;
  pm_numero_nota_fiscal?: number | null;
  pm_observacao?: string;
  pm_tipo_movimentacao?: string,
}

interface FilterType {
  field: string;
  value: string | number | boolean;
}

interface ProductContextType {
  products: ProductProps[];
  getNextProductId: () => void;
  nextProductId: number | undefined;
  sendNewProduct: (addProduct: ProductProps) => void;
  sendUpdateProduct: (updateroduct: ProductProps) => void;
  sendDeleteProduct: (productID: number) => void;
  selectedProduct: ProductProps | null;
  setSelectedProduct: (product: ProductProps | null) => void;
  filter: string | null;
  setFilter: (filter: string | null) => void;
  filterType: FilterType[];
  setFilterType: (filterType: FilterType[]) => void;
  filterArray: any[];
  setFilterArray: Dispatch<SetStateAction<any[]>>;
  getProductByFilter: (filterType: FilterType) => void;
  filteredProducts: ProductProps[];
  loadedProducts: ProductProps[];
  setLoadedProducts: Dispatch<SetStateAction<ProductProps[]>>;
  setFilteredProducts: Dispatch<SetStateAction<ProductProps[]>>;
  clearFilter: () => void;
  fetchAllProductsForPrint: (filterArray: any[]) => Promise<ProductProps[]>;
  sortOrder: string;
  toggleSort: () => void;
  isLoading: boolean;
  loadInitialData: () => void;
  increaseBalance: (balance: BalanceProps) => void;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  adjustmentBalance: (adjustment: BalanceProps) => void;
  tableRef: HTMLDivElement | any;
}

type TableRefType = HTMLDivElement | null;

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const AllProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextProductId, setNextProductId] = useState<number | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType[]>([]);
  const [loadedProducts, setLoadedProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [filterArray, setFilterArray] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [error, setError] = useState(false);

  const nextPageRef = useRef(1);
  const tableRef = useRef<HTMLDivElement | any>(null);

  const loadInitialData = async () => {
    setIsLoading(true);

    try {
      nextPageRef.current = 0;
      const response = await AxiosNode.get(`/getProducts/?page=${nextPageRef.current}&filter=${JSON.stringify(filterArray)}&orderBy=id`);
      const allProducts = response.data;

      setLoadedProducts(allProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // GET
  const fetchMoreProducts = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await AxiosNode.get(
        `/getProducts/?page=${nextPageRef.current += 1}&filter=${JSON.stringify(filterArray)}&orderBy=id`
      );
      const newProducts = response.data;

      setLoadedProducts(prevLoadedProducts => [...prevLoadedProducts, ...newProducts]);
      // nextPageRef.current = nextPage;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // GET
  const getNextProductId = async () => {
    try {
      const response = await AxiosNode.get('/getLastProduct');
      const lastProduct = response.data.nextProduct;
      setNextProductId(lastProduct + 1);
    } catch (error) {
      console.error(error);
    }
  };

  // GET
  const getProductByFilter = async (filterType: FilterType) => {
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

      setFilterArray(newFilterArray);
      nextPageRef.current = 0;
      setIsLoading(true);

      const apiUrl = `/getProducts/?page=${nextPageRef.current}&filter=${JSON.stringify(newFilterArray)}&orderBy=id&order=${sortOrder}`;
      console.log(newFilterArray);

      const response = await AxiosNode.get(apiUrl);
      const product = response.data;
      setLoadedProducts([...product]);
      setIsLoading(false);
      if (tableRef.current) {
        tableRef.current.scrollTo(0, 0);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);

  }

  // GET
  const fetchAllProductsForPrint = async (filterArray: any[]) => {
    try {
      const response = await AxiosNode.get(
        `/getProducts/?take=1000000000000&page=0&filter=${JSON.stringify(filterArray)}&orderBy=id`
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  // POST
  const sendNewProduct = async (addProduct: ProductProps) => {
    try {
      const response = await AxiosNode.post('/addProduct', addProduct);
      console.log('Response from server: ', response.data);
    } catch (error) {
      console.error('Context (Error): ', error);
      throw error;
    }
  };

  const increaseBalance = async (balance: BalanceProps) => {
    try {
      const response = await AxiosNode.post('/StockAdd', balance);
      console.log('Response from server:', balance)
    } catch (error) {
      setError(true);
      throw new Error();
    }
  }

  const adjustmentBalance = async (adjustment: BalanceProps) => {
    try {
      const response = await AxiosNode.post('/StockAdjustment', adjustment);
      console.log('Response from server:', adjustment)
    } catch (error) {
      setError(true);
      throw new Error();
    }
  }

  // UPDATE
  const sendUpdateProduct = async (updateProduct: ProductProps) => {
    try {
      const response = await AxiosNode.post('/updateProduct', updateProduct);
      console.log('Response from server: ', response.data);
    } catch (error) {
      console.error('Context (Error): ', error);
      throw error;
    }
  };

  // DELETE
  const sendDeleteProduct = async (productId: number) => {
    try {
      const response = await AxiosNode.delete(`/deleteProduct/${productId}`);
      console.log('Response from server: ', response.data);
    } catch (error) {
      console.error('Context (Error): ', error);
      throw error;
    }
  };

  const toggleSort = () => {
    setSortOrder(prevSort => prevSort === 'asc' ? 'desc' : 'asc');
  };


  const clearFilter = async () => {
    setFilter(null);
    setFilterArray([]); // Certifique-se de limpar o filterArray
    nextPageRef.current = 0;
    setSortOrder('asc');
    setIsLoading(true); // Define isLoading para true para mostrar o carregamento

    try {
      const response = await AxiosNode.get(`/getProducts/?page=${nextPageRef.current}&filter=${JSON.stringify([])}&orderBy=id&order=${sortOrder}`);
      const product = response.data;
      setLoadedProducts([...product]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Define isLoading para false quando a busca for concluída
    }
  };

  // useEffect(() => {
  //   const table = document.getElementById('table');
  //   if (table) {
  //     const handleScroll = () => {
  //       const { scrollTop, clientHeight, scrollHeight } = table;
  //       const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
  //       if (isAtBottom && !isLoading) {
  //         fetchMoreProducts()
  //       }
  //     };
  //     table.addEventListener('scroll', handleScroll);
  //     return () => {
  //       table.removeEventListener('scroll', handleScroll);
  //     };
  //   }
  // }, [isLoading]);

  useEffect(() => {
    if (tableRef) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = tableRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        if (isAtBottom && !isLoading) {
          fetchMoreProducts();
          console.log('chamou aqui')
        }
      };

      tableRef.current?.addEventListener('scroll', handleScroll);
      return () => {
        tableRef.current?.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isLoading]);

  return (
    <ProductContext.Provider
      value={{
        products,
        getNextProductId,
        nextProductId,
        sendNewProduct,
        sendUpdateProduct,
        sendDeleteProduct,
        selectedProduct,
        setSelectedProduct,
        filter,
        setFilter,
        filterType,
        setFilterType,
        filterArray,
        setFilterArray,
        getProductByFilter,
        filteredProducts,
        loadedProducts,
        setLoadedProducts,
        setFilteredProducts,
        clearFilter,
        fetchAllProductsForPrint,
        toggleSort,
        sortOrder,
        isLoading,
        loadInitialData,
        increaseBalance,
        error,
        setError,
        adjustmentBalance,
        tableRef
      }}>
      {children}
    </ProductContext.Provider>
  );
};

// Função personalizada para usar o contexto
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext deve ser usado dentro de um ProductProvider');
  }
  return context;
};