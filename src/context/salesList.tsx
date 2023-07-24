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
}

const ProductContext = createContext<ProductContextProps>({
  product: [],
  getProductByID: () => { },
});

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<ProductProps[]>([]);

  const getProductByID = (id: number) => {
    Axios.get<ProductProps>(`/ProdutoById/${id}`)
      .then((response: AxiosResponse) => {
        let { id, descricao, qtdCom, vlrUnCom } = response.data;
        const data = {
          id: id ?? null,
          description: descricao,
          quantity: qtdCom,
          unityValue: vlrUnCom,
          total: qtdCom * vlrUnCom,
        }
        setProduct((Products) => [...Products, data]);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setProduct((Products) => [...Products]);
      });
  };

  return (
    <ProductContext.Provider value={{ product, getProductByID }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };

