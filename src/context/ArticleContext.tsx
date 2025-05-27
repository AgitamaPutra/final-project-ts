import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthProvider";
import type { Article } from "../utils/types";

// Tipe untuk context
interface ArticleContextType {
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  fetchArticles: () => Promise<void>;
}

// Props Provider
interface ArticleProviderProps {
  children: React.ReactNode;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<ArticleProviderProps> = ({
  children,
}) => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles`,
        {
          headers: {
            Authorization: `${user?.token}`,
          },
        }
      );
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  return (
    <ArticleContext.Provider value={{ articles, setArticles, fetchArticles }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleContext = (): ArticleContextType => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticleContext must be used within an ArticleProvider");
  }
  return context;
};
