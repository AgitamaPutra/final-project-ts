import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Add ArticleProvider, CartProvider, ProductsProvider, FilterProvider */}
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <main className="flex-grow">
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                {/* Add Products, About, Contact, Articles, Cart, Checkout, ArticleDetail Routes */}
              </Route>
              <Route path="/login" element={<Login />} />
              {/* Add Register Route */}
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
