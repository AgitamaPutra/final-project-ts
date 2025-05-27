import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ArticleProvider } from "./context/ArticleContext";
import { CartProvider } from "react-use-cart";
import { ProductsProvider } from "./context/ProductContext";
import { FilterProvider } from "./context/FilterContext";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ArticleDetail from "./pages/ArticleDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ArticleProvider>
          <CartProvider>
            <ProductsProvider>
              <FilterProvider>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                  <main className="flex-grow">
                    <Routes>
                      <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                          path="/products/:id"
                          element={<ProductDetail />}
                        />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/articles" element={<Articles />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route
                          path="/articles/:id"
                          element={<ArticleDetail />}
                        />
                      </Route>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                    </Routes>
                  </main>
                </div>
              </FilterProvider>
            </ProductsProvider>
          </CartProvider>
        </ArticleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
