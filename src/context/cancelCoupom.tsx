import { AxiosNode } from '@/services/axios';
import { AxiosResponse } from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';


export interface CoupomData {
  id: number;
  cpf_cnpj: string;
  valor_liquido: number;
  data_criacao: Date;
  token: string;
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
  selectedIndex: CoupomData | null;
  setSelectedIndex: (cancel: CoupomData | null) => void;
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
  const [selectedIndex, setSelectedIndex] = useState<CoupomData | null>(null);

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

  //Delete
  const deleteLastSale = async (cancel: CancelData) => {
    try {
      // Faz a requisição para atualizar o status no servidor
      const response = await AxiosNode.post('/updateCoupomStatus', cancel);
      console.log('Response from server:', response.data);

      // Se a requisição foi bem-sucedida, remove o cupom da lista local
      if (response.data.success) {
        setCoupoms((prevCoupoms) => prevCoupoms.filter(coupom => coupom.id !== cancel.id));
      }
      toast.success('Cupom cancelado!')
    } catch (error) {
      console.error('Context (Error): ', error);
      toast.error('Erro ao cancelar cupom!')
      throw error;
    }
  };


  const addCoupom = (coupom: CoupomData) => {
    setCoupoms((prevCoupoms) => [coupom, ...prevCoupoms]);
  };

  return (
    <CoupomContext.Provider value={{ coupoms, getLastSales, addCoupom, deleteLastSale, selectedIndex, setSelectedIndex }}>
      {children}
    </CoupomContext.Provider>
  );
}