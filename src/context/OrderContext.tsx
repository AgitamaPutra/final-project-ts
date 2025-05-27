
import React, { createContext, useContext } from "react";

// Interface untuk Order (ubah sesuai struktur aslimu)
interface Order {}

// Interface untuk Form Data
interface OrderFormData {}

// Interface untuk Context
interface OrdersContextType {}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

interface OrderProviderProps {
  children: React.ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {

  // State untuk order

  // Function untuk create order

  // Function untuk get order by user id

  // Function untuk update order

  // Function untuk delete order

  
  return <OrdersContext.Provider value={{}}>{children}</OrdersContext.Provider>;
};

export const useOrderContext = (): OrdersContextType => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};
