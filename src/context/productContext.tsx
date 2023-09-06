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
  // withSaldo: string;
  // withoutSaldo: string;
  status: string;
  ncm?: string;
  codEAN?: string;
}

export type FilterType = 'id' | 'codEAN' | 'descricao' | 'saldo' | 'withSaldo' | 'withoutSaldo';

interface ProductContextType {
  products: ProductProps[];
  getNextProductId: () => void;
  getProductByID: (id: string) => void;
  getProductByEAN: (codEAN: string) => void;
  nextProductId: number | undefined;
  sendNewProduct: (addProduct: ProductProps) => void;
  sendUpdateProduct: (updateroduct: ProductProps) => void;
  sendDeleteProduct: (productID: number) => void;
  selectedProduct: ProductProps | null;
  setSelectedProduct: (product: ProductProps | null) => void;
  filter: string | null;
  setFilter: (filter: string | null) => void;
  filterType: FilterType;
  setFilterType: (filterType: FilterType) => void;
  getProductByFilter: (filterValue: string, filterType: FilterType) => void;
  filteredProducts: ProductProps[];
  loadedProducts: ProductProps[];
  setLoadedProducts: Dispatch<SetStateAction<ProductProps[]>>;
  setFilteredProducts: Dispatch<SetStateAction<ProductProps[]>>;
  clearFilter: () => void;
}

const PAGE = 0;
const PRODUCTS_PER_PAGE = 20;  // Alterado para 20 produtos por página

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const AllProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextProductId, setNextProductId] = useState<number | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType>('id');
  const [rawProducts, setRawProducts] = useState<ProductProps[]>([])
  const [loadedProducts, setLoadedProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  // GET
  const fetchMoreProducts = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await AxiosNode.get(
        // `/getAllProducts?offset=${loadedProducts.length}&limit=${PRODUCTS_PER_PAGE}`
        `/getProducts/?page=${currentPage}`

      );
      const newProducts = response.data;

      setLoadedProducts(prevLoadedProducts => [...prevLoadedProducts, ...newProducts]);

      // setProducts(prevProducts => [...prevProducts, ...newProducts]);

      // setRawProducts(prevRawProducts => [...prevRawProducts, ...newProducts]);
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
  const getProductByID = async (id: string) => {
    try {
      const response = await AxiosNode.get(`/getIDProductFilter/${id}`);
      const product = response.data;
      setSelectedProduct(product);
      setFilter(id);
    } catch (err) {
      console.error('Error fetching product by ID:', err);
    }
  };

  // GET
  const getProductByEAN = async (codEAN: string) => {
    try {
      const response = await AxiosNode.get(`/getEANProductFilter/${codEAN}`);
      const product = response.data;
      setSelectedProduct(product);
      setFilter(codEAN);
    } catch (err) {
      console.error('Error fetching product by EAN:', err);
    }
  };

  // GET
  // const getProductByFilter = async (filterValue: string, filterType: FilterType) => {
  //   try {
  //     let filterArray = [];

  //     const filterMap: Record<FilterType, string | undefined> = {
  //       id: 'id',
  //       codEAN: 'codEAN',
  //       descricao: 'descricao',
  //       saldo: 'saldo',
  //       // ordemDecrescente: undefined
  //     };

  //     if (filterType in filterMap) {
  //       filterArray.push({ field: filterMap[filterType], value: filterType === 'saldo' ? "0" : filterValue });
  //     }

  //     const orderBy = filterType  && 'id';

  //     // Função para verificar e encontrar produto na lista rawProducts
  //     const findProduct = (type: FilterType, value: string) => {
  //       return rawProducts.find((product) => product[filterMap[type] as keyof typeof product] === value);
  //     };

  //     const existingProduct = findProduct(filterType, filterValue);

  //     if (existingProduct) {
  //       setSelectedProduct(existingProduct);
  //       setFilter(filterValue);
  //       } else {
  //         if (existingProduct) {
  //           setLoadedProducts(prevLoadedProducts => [...prevLoadedProducts, existingProduct]);
  //           setFilteredProducts(prevFilteredProducts => [...prevFilteredProducts, existingProduct]);
  //           setSelectedProduct(existingProduct);
  //           setFilter(filterValue);
  //         } else {

  //         }
  //     }
  //     const apiUrl = `/getProducts/?page=0&filter=${JSON.stringify(filterArray)}&orderBy=${orderBy}`;
  //     const response = await AxiosNode.get(apiUrl);
  //     const product = response.data;
  //     console.log(product);
  //     setLoadedProducts(prevLoadedProducts => [...prevLoadedProducts, product]);
  //     setFilteredProducts(prevFilteredProducts => [...prevFilteredProducts, product]);
  //     setSelectedProduct(product);
  //     setFilter(filterValue);
  //   } catch (err) {
  //     console.error(`Error fetching product by ${filterType}:`, err);
  //   }
  // };

  const getProductByFilter = async (filterValue: string, filterType: FilterType) => {
    let filterArray = [];
    const filterMap: Record<FilterType, string | undefined> = {
      id: 'id',
      codEAN: 'codEAN',
      descricao: 'descricao',
      withSaldo: 'saldo',
      withoutSaldo: 'saldo',
      saldo: 'saldo',
      // ordemDecrescente: undefined
    };

    // if (filterType in filterMap) {
    //   filterArray.push({ field: filterMap[filterType], value: filterType === 'saldo' ? 1 : 'withoutSaldo' });
    // }

    if (filterType in filterMap) {
      if (filterType === 'withSaldo') {
          filterArray.push({ field: filterMap[filterType], value: "1" });
      } else if (filterType === 'withoutSaldo') {
          filterArray.push({ field: filterMap[filterType], value: "0" });
      } else {
          filterArray.push({ field: filterMap[filterType], value: filterValue });
      }
  }

    const apiUrl = `/getProducts/?page=0&filter=${JSON.stringify(filterArray)}&orderBy=id}`;
    const response = await AxiosNode.get(apiUrl);
    const product = response.data;
    setLoadedProducts(product);
  }

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
    fetchMoreProducts()
  }, [])

  // Use useEffect para buscar os produtos quando o componente for montado e adicionar o ouvinte de evento de rolagem
  useEffect(() => {
    const table = document.getElementById('table');
    if (table) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = table;

        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

        if (isAtBottom) {
          setCurrentPage(prevPage => prevPage + 1);
          fetchMoreProducts()
        }
      };

      table.addEventListener('scroll', handleScroll);

      return () => {
        table.removeEventListener('scroll', handleScroll);
      };
    }
  }, [fetchMoreProducts]);

  const loadInitialData = async () => {
    setIsLoading(true);

    try {
      setCurrentPage(prevPage => prevPage + 1);
      const response = await AxiosNode.get(`/getProducts/?page=${currentPage}`);
      const allProducts = response.data;

      // Atualize a lista atual
      setProducts(allProducts.slice(0, PRODUCTS_PER_PAGE));

      setRawProducts(allProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilter = () => {
    setFilter(null);
    setFilteredProducts(rawProducts);
    setLoadedProducts(rawProducts);
  };


  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        getNextProductId,
        nextProductId,
        getProductByID,
        getProductByEAN,
        sendNewProduct,
        sendUpdateProduct,
        sendDeleteProduct,
        selectedProduct,
        setSelectedProduct,
        filter,
        setFilter,
        filterType,
        setFilterType,
        getProductByFilter,
        filteredProducts,
        loadedProducts,
        setLoadedProducts,
        setFilteredProducts,
        clearFilter
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