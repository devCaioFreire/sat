import { AxiosNode } from '@/services/axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Defina a estrutura de dados para os produtos
interface ProductProps {
  id: string;
  code: string;
  description: string;
  value: number;
  unity: string;
  saldo: number;
  status: string;
}

// Defina a estrutura do contexto
interface ProductContextType {
  products: ProductProps[];
}

// Crie o contexto
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Componente do provedor de contexto
export const AllProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  // Função para buscar os produtos
  const fetchProducts = async () => {
    try {
      const response = await AxiosNode.get('/getAllProducts');
      const productsArray = response.data.Produtos;
      console.log('Produtos da API:', productsArray);

      // Não defina os produtos no estado aqui
    } catch (err) {
      console.error(err);
    }
  };

  // Use useEffect para buscar os produtos quando o componente for montado
  useEffect(() => {
    fetchProducts();
  }, []); // Certifique-se de passar um array vazio como segundo argumento para garantir que a busca ocorra apenas uma vez.

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
