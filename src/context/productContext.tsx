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

// Defina a estrutura do contexto
interface ProductContextType {
  products: ProductProps[];
  getNextProductId: () => void;
  nextProductId: number | undefined;
  sendNewProduct: (addProduct: ProductProps) => void;
  sendUpdateProduct: (addProduct: ProductProps) => void;
  selectedProduct: ProductProps | null;
  setSelectedProduct: (product: ProductProps | null) => void;
}

const PRODUCTS_PER_PAGE = 20; // Alterado para 20 produtos por página

// Crie o contexto
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Componente do provedor de contexto
export const AllProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextProductId, setNextProductId] = useState<number | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);

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

  useEffect(() => {
    fetchMoreProducts()
  }, [])

  // Use useEffect para buscar os produtos quando o componente for montado e adicionar o ouvinte de evento de rolagem
  useEffect(() => {
    const table = document.getElementById('table');
    if (table) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = table;

        if (scrollTop + clientHeight >= scrollHeight * 1) {
          fetchMoreProducts();
        }
      };

      table.addEventListener('scroll', handleScroll);

      return () => {
        table.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    // Após cada atualização do estado de produtos, exiba o comprimento da lista
    console.log('Length:', products.length);
  }, [products]);

  const getNextProductId = async () => {
    try {
      const response = await AxiosNode.get('/getLastProduct');
      const lastProduct = response.data.nextProduct;
      setNextProductId(lastProduct + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, getNextProductId, nextProductId, sendNewProduct, sendUpdateProduct, selectedProduct, setSelectedProduct }}>
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