import { AxiosNode } from "@/services/axios";
import { AxiosResponse } from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

interface ProductProps {
  id: number;
  ean: number;
  descricao: string;
  quantity: number;
  vlrUnCom: number;
  totalValue?: number;
  total?: number;
}

interface ProductContextProps {
  product: ProductProps[];
  setProduct: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  addProduct: (product: ProductProps, quantidade: number) => void;
  getProductByEAN: (id: number, quantity: number) => void;
  calculateTotal: () => number;
  handleRemoveProduct: (ean: number, quantityToRemove: number) => void,
  selectedProductIndex: number;
  setSelectedProductIndex: React.Dispatch<React.SetStateAction<number>>;
  sendSalesData: (salesData: SalesData) => void;
}

interface Item {
  produto_id: number;
  ean: string;
  descricao: string;
  quantidade: number;
  valor_total: number;
}

interface SalesData {
  itens: Item[];
  valor_bruto: number;
  valor_liquido: number;
  vendedor_id: number;
  desconto: number;
  forma_pagamento: string;
  pagamento: number;
  troco?: number;
  order?: number;
}

const ProductContext = createContext<ProductContextProps>({
  product: [],
  setProduct: () => [],
  addProduct: () => { },
  getProductByEAN: () => { },
  calculateTotal: () => 0,
  handleRemoveProduct: () => { },
  selectedProductIndex: -1,
  setSelectedProductIndex: () => { },
  sendSalesData: () => { }
});

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(-1);
  const [productList, setProductList] = useState<ProductProps[]>([]);

  function addProduct(productToAdd: ProductProps, quantity: number) {
    setProduct(prevProducts => [...prevProducts, { ...productToAdd, quantity }]);
  }


  // GET
  const getProductByEAN = (ean: number, quantity: number): Promise<ProductProps> => {
    return AxiosNode.get<ProductProps>(`/getEANProductFilter/${ean}`)
      .then((response: AxiosResponse) => {
        const productsArray = response.data;

        const product = productsArray;
        const { id, codEAN, descricao, vlrUnCom } = product;

        if (!ean) {
          setError("Product not found");
          throw new Error("Product not found");
        }
        const data = {
          id: id,
          ean: codEAN,
          descricao,
          quantity: quantity,
          vlrUnCom,
          totalValue: vlrUnCom * quantity
        };
        console.log(data);
        setProduct((Products) => [...Products, data]);
        setError(null);
        return data;
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Product not found");
        throw error;
      });
  };

  // POST
  const sendSalesData = async (salesData: SalesData) => {
    try {
      const response = await AxiosNode.post('/dataSale', salesData);
      console.log('Response from server: ', response.data);
    } catch (error) {
      console.error('Context (Error): ', error);
      throw error;
    }
  };

  const calculateTotal = () => {
    return product.reduce((total, product) => {
      return total + product.quantity * product.vlrUnCom;
    }, 0);
  };

  // DELETE (IN LIST)
  const handleRemoveProduct = (ean: number, quantityToRemove: number) => {
    setProduct((prevProducts) =>
      prevProducts.map((product, index) =>
        index === selectedProductIndex && product.ean === ean
          ? {
            ...product,
            quantity: Math.max(product.quantity - quantityToRemove, 0),
          }
          : product
      ).filter((product) => product.quantity > 0) // Filtra os produtos com quantidade maior que 0
    );
  };

  useEffect(() => {
    setProduct((prevProducts) => prevProducts.filter((product) => product.quantity > 0));
  }, []);

  return (
    <ProductContext.Provider value={{
      product,
      setProduct,
      addProduct,
      getProductByEAN,
      calculateTotal,
      handleRemoveProduct,
      selectedProductIndex,
      setSelectedProductIndex,
      sendSalesData
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };

