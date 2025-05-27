import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Interface untuk Order (ubah sesuai struktur aslimu)
interface Order {
  id: number;
  // tambahkan field lain sesuai API
}

// Interface untuk Form Data
interface OrderFormData {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  payment: string;
  userId: number | null;
}

// Interface untuk Context
interface OrdersContextType {
  orders: Order[];
  getOrderByUserId: () => Promise<void>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  formData: OrderFormData;
  setFormData: React.Dispatch<React.SetStateAction<OrderFormData>>;
  createOrder: () => Promise<void>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

interface OrderProviderProps {
  children: React.ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [formData, setFormData] = useState<OrderFormData>({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    payment: "Credit Card",
    userId: null,
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      userId: user?.id ?? null,
      [e.target.name]: e.target.value,
    }));
  };

  const getOrderByUserId = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/orders`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      console.log(response.data);
      setOrders(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/orders`,
        formData,
        {
          headers: {
            Authorization: `${user.token}`,
          },
        }
      );
      const data = response.data;
      console.log("Order berhasil dibuat", data);
      toast.success("Order Berhasil Dibuat", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Terjadi Kesalahan", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        getOrderByUserId,
        setOrders,
        formData,
        setFormData,
        createOrder,
        handleInputChange,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrderContext = (): OrdersContextType => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};
