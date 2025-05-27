import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../utils/types";

interface ProductsContextType {
  products: Product[];
  // Optionally expose loading, product, or fetch methods
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

interface ProductsProviderProps {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ data: Product[] }>(
        `${import.meta.env.VITE_API_URL}/api/products`
      );
      console.log("data", response.data.data);
      setProducts(response.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: number) => {
    setLoading(true);
    try {
      // Implement logic here
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      // Implement logic here
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProductsContext must be used with a ProductsProvider");
  }
  return context;
};
