import { createContext, useContext, useState } from 'react';

interface CustomerData {
  cpfOrCnpj?: string;
  customerName?: string;
}

interface CustomerContextValue {
  customerData: CustomerData;
  setCustomerData: (data: CustomerData) => void;
  resetCpfOrCnpj: () => void;
}

const CustomerContext = createContext<CustomerContextValue | undefined>(undefined);

export function useCustomerContext() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomerContext must be used within a CustomerProvider');
  }
  return context;
}

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customerData, setCustomerData] = useState<CustomerData>({});

  const resetCpfOrCnpj = () => {
    setCustomerData((prevData) => ({
      ...prevData,
      cpfOrCnpj: undefined,
    }));
  };

  return (
    <CustomerContext.Provider value={{ customerData, setCustomerData, resetCpfOrCnpj }}>
      {children}
    </CustomerContext.Provider>
  );
}
