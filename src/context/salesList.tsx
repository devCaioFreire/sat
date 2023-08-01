import { AxiosProduct } from "@/services/axios";
import { AxiosResponse } from "axios";
import dotenv from 'dotenv';
import { ReactNode, createContext, useState } from "react";

dotenv.config();
const PARAMS_API = process.env.PARAMS_TEST_API;
const TOKEN_API = process.env.TOKEN_TEST_API;
const USER_TOKEN_API = process.env.USERTOKEN_TEST_API;

interface ProductProps {
  id: number;
  ean: number;
  description: string;
  quantity: number;
  unityValue: number;
  total: number;
}

interface ProductContextProps {
  product: ProductProps[];
  getProductByEAN: (id: number, quantity: number) => void;
  calculateTotal: () => number | string
}

const ProductContext = createContext<ProductContextProps>({
  product: [],
  getProductByEAN: () => { },
  calculateTotal: () => '',
});

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getProductByEAN = (ean: number, quantity: number): Promise<ProductProps> => {
    // const url = `${process.env.PARAMS_TEST_API}${id}${process.env.USER_TOKEN_TEST_API}${process.env.TOKEN_TEST_API}`;
    return AxiosProduct.get<ProductProps>(`/?codEAN=${ean}&userToken=a77a9fcc-09fd-11ee-a4ed-08626698f6fc&token=8309eaec-d311-11ed-a238-8c89a5fa70e8`)
      .then((response: AxiosResponse) => {
        const productsArray = response.data.Produtos;

        const product = productsArray[0];
        const { id, eAN, descricao, qtdCom, vlrUnCom } = product;

        if (!ean) {
          setError("Product not found");
          throw new Error("Product not found");
        }
        const data = {
          id: id,
          ean: eAN,
          description: descricao,
          quantity: quantity,
          unityValue: vlrUnCom,
          total: qtdCom * vlrUnCom,
        };
        setProduct((Products) => [...Products, data]);
        console.log(data);
        setError(null);
        return data;
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Product not found");
        throw error;
      });
  };

  const calculateTotal = () => {
    return product.reduce((total, product) => {
      return total + product.quantity * product.unityValue;
    }, 0);
  };

  return (
    <ProductContext.Provider value={{ product, getProductByEAN, calculateTotal }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };

