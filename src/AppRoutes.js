import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./contexts/auth";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Products from "./Pages/Products";
import { Product } from "./Pages/Product";
import { User } from "./Pages/User";
import { CartContextProvider } from "./contexts/cart";
import { Cart } from "./Pages/Cart";
import { Purchase } from "./Pages/Purchase";
import { Requests } from "./Pages/Requests";
import { Request } from "./Pages/Request";
import { CreateProduct } from "./Pages/Products/CreateProduct";

function PrivateRoute({ children }) {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">Carregando</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

function PrivateAdminRoute({ children }) {
  const { isAdmin, authenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">Carregando</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <CartContextProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PrivateRoute>
                  <Product />
                </PrivateRoute>
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/purchase"
              element={
                <PrivateRoute>
                  <Purchase />
                </PrivateRoute>
              }
            />
            <Route
              path="/requests"
              element={
                <PrivateRoute>
                  <Requests />
                </PrivateRoute>
              }
            />
            <Route
              path="/request/:id"
              element={
                <PrivateRoute>
                  <Request />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-product"
              element={
                <PrivateAdminRoute>
                  <CreateProduct />
                </PrivateAdminRoute>
              }
            />
          </Routes>
        </CartContextProvider>
      </AuthProvider>
    </Router>
  );
}
