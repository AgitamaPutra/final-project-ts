
import React, { createContext, useContext } from "react";

interface ProductsContextType {}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

interface ProductsProviderProps {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  // State untuk product

  // Function untuk create product

  // Function untuk get product by id

  // Function untuk update product

  // Function untuk delete product


  children,
}) => {
  return (
    <ProductsContext.Provider value={{}}>{children}</ProductsContext.Provider>
  );
};

export const useProductsContext = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProductsContext must be used with a ProductsProvider");
  }
  return context;
};
