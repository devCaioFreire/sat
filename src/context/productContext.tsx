import { AxiosNode } from '@/services/axios';
import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

export interface ProductProps {
  filter(arg0: (product: any) => any): unknown;
  id?: string;
  codProduto: string;
  descricao: string;
  vlrUnCom: string;
  unCom: string;
  saldo: string;
  status: string;
  ncm?: string;
  codEAN?: string;
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
}

const PRODUCTS_PER_PAGE = 20;

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const AllProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextProductId, setNextProductId] = useState<number | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType[]>([]);
  const [rawProducts, setRawProducts] = useState<ProductProps[]>([])
  const [loadedProducts, setLoadedProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterArray, setFilterArray] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // GET
  const fetchMoreProducts = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await AxiosNode.get(
        `/getProducts/?page=${currentPage}&filter=${JSON.stringify(filterArray)}&orderBy=id`
      );
      const newProducts = response.data;
      setLoadedProducts(prevLoadedProducts => [...prevLoadedProducts, ...newProducts]);
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
    setCurrentPage(0);
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

      setFilterArray(newFilterArray); // Atualize o estado com a nova matriz de filtros
      console.log('filter', currentPage);
      const apiUrl = `/getProducts/?page=${currentPage}&filter=${JSON.stringify(newFilterArray)}&orderBy=id&order=${sortOrder}`;
      const response = await AxiosNode.get(apiUrl);
      const product = response.data;
      setLoadedProducts(product);
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    fetchMoreProducts();
  }, [currentPage, filterArray]);

  useEffect(() => {
    const table = document.getElementById('table');
    if (table) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = table;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        if (isAtBottom && !isLoading) {
          setCurrentPage(prevPage => prevPage + 1);
        }
      };
      table.addEventListener('scroll', handleScroll);
      return () => {
        table.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isLoading]);

  const loadInitialData = async (filters?: FilterType[]) => {
    setIsLoading(true);

    // setCurrentPage(prevPage => prevPage + 1);

    try {
      const response = await AxiosNode.get(`/getProducts/?page=${currentPage}&filter=${JSON.stringify(filterArray)}&orderBy=id`);
      const allProducts = response.data;

      setProducts(allProducts.slice(0, PRODUCTS_PER_PAGE));

      setRawProducts(allProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSort = () => {
    setSortOrder(prevSort => prevSort === 'asc' ? 'desc' : 'asc');
  };

  const clearFilter = () => {
    setFilter(null);
    setFilteredProducts(rawProducts);
    setLoadedProducts(rawProducts);
    setFilterArray([])
    setSortOrder('asc')
  };

  useEffect(() => {
    loadInitialData(filterType);
  }, []);

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