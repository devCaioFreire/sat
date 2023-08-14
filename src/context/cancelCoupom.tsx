import { AxiosNode } from '@/services/axios';
import { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';


interface CoupomData {
  id: number;
  cpf_cnpj: string;
  valor_liquido: number;
  data_criacao: Date;
}

interface CancelData {
  id: number;
  status: string;
}

interface CoupomContextProps {
  coupoms: CoupomData[]; // Um array para armazenar os cupons
  getLastSales: () => void; // Uma função para buscar os últimos cupons
  deleteLastSale: (cancel: CancelData) => void;
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

  // GET
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

  const deleteLastSale = async (cancel: CancelData) => {
    try {
      const response = await AxiosNode.post('/updateCoupomStatus', cancel);
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Context (Error): ', error);
      throw error;
    }
  };

  const addCoupom = (coupom: CoupomData) => {
    setCoupoms((prevCoupoms) => [coupom, ...prevCoupoms]);
  };

  useEffect(() => {
    getLastSales();
  }, []);

  return (
    <CoupomContext.Provider value={{ coupoms, getLastSales, addCoupom, deleteLastSale }}>
      {children}
    </CoupomContext.Provider>
  );
}