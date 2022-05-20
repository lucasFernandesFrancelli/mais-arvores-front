import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Cadastro from "./Pages/Cadastro";
import Produto from "./Pages/Produtos";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { AuthProvider, AuthContext } from "./contexts/auth";
import { useContext } from "react";
import { toast } from "react-toastify";
import Navbar from "./Components/Navbar";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <Navbar />
      <AuthProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/produtos"
            element={
              <Private>
                <Produto />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
