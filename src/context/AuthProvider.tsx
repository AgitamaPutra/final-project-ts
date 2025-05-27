import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Tipe User
interface User {
  id: number;
  email: string;
  token: string;
  // Tambahkan field lain jika diperlukan
}

// Tipe Form
interface AuthForm {
  email: string;
  password: string;
}

// Tipe AuthContext
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => void;
  form: AuthForm;
  setForm: React.Dispatch<React.SetStateAction<AuthForm>>;
}

// Props untuk Provider
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<AuthForm>({
    email: "",
    password: "",
  });

  const navigation = useNavigate();
  const location = useLocation();
  const redirectPath = (location.state as { path?: string })?.path || "/";

  const login = async () => {
    setLoading(true);
    try {
      const response = await axios.post<User>(
        `${import.meta.env.VITE_API_URL}/api/auth/customer/sign-in`,
        JSON.stringify(form),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigation(redirectPath, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigation(-1);
  };

  const register = async () => {
    try {
      // Implement register logic
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, form, setForm }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
