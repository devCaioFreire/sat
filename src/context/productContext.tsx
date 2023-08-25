import { AxiosNode } from '@/services/axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Defina a estrutura de dados para os produtos
interface ProductProps {
  id: string;
  codProduto: number;
  descricao: string;
  vlrUnCom: number;
  unCom: string;
  saldo: number;
  status: string;
}

// Defina a estrutura do contexto
interface ProductContextType {
  products: ProductProps[];
}

const PRODUCTS_PER_PAGE = 20; // Alterado para 20 produtos por página

// Crie o contexto
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Componente do provedor de contexto
export const AllProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Função para buscar mais produtos
  const fetchMoreProducts = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await AxiosNode.get(`/getAllProducts?offset=${products.length}&limit=${PRODUCTS_PER_PAGE}`);
      const newProducts = response.data;

      console.log('New Products:', newProducts); // Verifique os novos produtos na resposta

      setProducts(prevProducts => [...prevProducts, ...newProducts]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para lidar com o evento de rolagem
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    console.log('scrollTop:', scrollTop);
    console.log('clientHeight:', clientHeight);
    console.log('scrollHeight:', scrollHeight);

    // Verifique se o usuário está próximo do final da lista (por exemplo, nos últimos 10%)
    if (scrollTop + clientHeight >= scrollHeight * 0.9) {
      fetchMoreProducts();
    }
  };

  // Use useEffect para buscar os produtos quando o componente for montado e adicionar o ouvinte de evento de rolagem
  useEffect(() => {
    fetchMoreProducts();

    const table = document.getElementById('table');
    if (table) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = table;

        if (scrollTop + clientHeight >= scrollHeight * 0.99) {
          fetchMoreProducts();
        }
      };

      table.addEventListener('scroll', handleScroll);

      return () => {
        table.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
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