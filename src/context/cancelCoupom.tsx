import { AxiosNode } from '@/services/axios';
import { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';


interface CoupomData {
  id: number;
  cpf_cnpj: string;
  valor_liquido: number;
  data_criacao: Date;
}

interface CoupomContextProps {
  coupoms: CoupomData[]; // Um array para armazenar os cupons
  getLastSales: () => void; // Uma função para buscar os últimos cupons
  addCoupom: (coupom: CoupomData) => void;
}

export const CoupomContext = createContext<CoupomContextProps | undefined>(undefined);

export function useCoupomContext() {
  const context = useContext(CoupomContext);
  if (!context) {
    throw new Error('useCoupomContext must be used within a CoupomProvider');
  }
  return context;
};

export function CoupomProvider({ children }: { children: React.ReactNode }) {
  const [coupoms, setCoupoms] = useState<CoupomData[]>([]);

  const getLastSales = () => {
    AxiosNode.get('/cancelCoupom')
      .then((response: AxiosResponse) => {
        const coupomData = response.data;
        console.log(coupomData);

        setCoupoms(coupomData);
      })
      .catch((error) => {
        console.error("Error fetching coupoms:", error);
      });
  };

  const addCoupom = (coupom: CoupomData) => {
    setCoupoms((prevCoupoms) => [coupom, ...prevCoupoms]);
  };

  useEffect(() => {
    getLastSales();
  }, []);

  return (
    <CoupomContext.Provider value={{ coupoms, getLastSales, addCoupom }}>
      {children}
    </CoupomContext.Provider>
  );
}