import { AxiosNode } from '@/services/axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ProductProps {
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

export type FilterType = '' | 'id' | 'codEAN';

// Defina a estrutura do contexto
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
  getProductByFilter: (filterValue: string, filterType: FilterType) => void;
}

const PRODUCTS_PER_PAGE = 20; // Alterado para 20 produtos por página

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const AllProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextProductId, setNextProductId] = useState<number | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  // GET
  const fetchMoreProducts = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await AxiosNode.get(`/getAllProducts?offset=${products.length}&limit=${PRODUCTS_PER_PAGE}`);
      const newProducts = response.data;
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
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
      setFilter(id); // Defina o filtro como o ID solicitado
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
      console.error('Error fetching product by ID:', err);
    }
  };

  //GET
  const getProductByFilter = async (filterValue: string, filterType: FilterType) => {
    try {
      let response;
  
      if (filterType === 'id') {
        response = await AxiosNode.get(`/getIDProductFilter/${filterValue}`);
      } else if (filterType === 'codEAN') {
        response = await AxiosNode.get(`/getEANProductFilter/${filterValue}`);
      } else if (filterType === '') {
        // Lide com o caso em que nenhum filtro é aplicado
        response = await AxiosNode.get(`/getAllProducts`);
      }
  
      const product = response!.data;
      console.log(`Product by ${filterType}:`, product);
      setSelectedProduct(product);
      setFilter(filterValue);
    } catch (err) {
      console.error(`Error fetching product by ${filterType}:`, err);
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

  const applyFilter = (filterValue: string | null) => {
    setFilter(filterValue);
    fetchMoreProducts(); // Recarregue os produtos após aplicar o filtro
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
          fetchMoreProducts();
        }
      };


      table.addEventListener('scroll', handleScroll);

      return () => {
        table.removeEventListener('scroll', handleScroll);
      };
    }
  }, [fetchMoreProducts]);

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
        getProductByFilter
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