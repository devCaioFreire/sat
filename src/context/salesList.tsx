import { Axios } from "@/services/axios";
import { AxiosResponse } from "axios";
import { ReactNode, createContext, useState } from "react";

interface ProductProps {
  id?: number;
  description: string;
  quantity: number;
  unityValue: number;
  total: number;
}

interface ProductContextProps {
  product: ProductProps[];
  getProductByID: (id: number) => void;
  calculateTotal: () => number | string
}

const ProductContext = createContext<ProductContextProps>({
  product: [],
  getProductByID: () => { },
  calculateTotal: () => '',
});

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [error, setError] = useState<string | null>(null); // Add error state

  const getProductByID = (id: number): Promise<ProductProps> => {
    return Axios.get<ProductProps>(`/ProdutoById/${id}`)
      .then((response: AxiosResponse) => {
        let { id, descricao, qtdCom, vlrUnCom } = response.data;
        const data = {
          id: id ?? null,
          description: descricao,
          quantity: qtdCom,
          unityValue: vlrUnCom,
          total: qtdCom * vlrUnCom,
        };
        setProduct((Products) => [...Products, data]);
        setError(null); // Reset error state if successful
        return data; // Resolve with the fetched product
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Product not found"); // Set error message
        throw error; // Reject with the error
      });
  };

  const calculateTotal = () => {
    return product.reduce((total, product) => {
      return total + product.quantity * product.unityValue;
    }, 0);
  };

  return (
    <ProductContext.Provider value={{ product, getProductByID, calculateTotal }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };

