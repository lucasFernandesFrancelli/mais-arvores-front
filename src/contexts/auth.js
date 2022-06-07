import jwtDecode from "jwt-decode";
import React, { createContext, useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api, createSession, createUser } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const recoveredUserToken = localStorage.getItem("@mais-arvores/token");
    const recoveredUserPermission = localStorage.getItem("@mais-arvores/admin");

    if (recoveredUserToken) {
      const decoded = jwtDecode(recoveredUserToken);
      if (decoded.exp > Date.now() / 1000) {
        setToken(recoveredUserToken);
        setIsAdmin(recoveredUserPermission);
        setUserId(decoded.sub);
        api.defaults.headers.Authorization = `Bearer ${recoveredUserToken}`;
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    createSession(email, password)
      .then(response => {
        toast.success("Login efetuado com sucesso");

        const { token, isAdmin } = response.data;

        const decoded = jwtDecode(token);

        localStorage.setItem("@mais-arvores/token", token);
        localStorage.setItem("@mais-arvores/admin", isAdmin);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setToken(token);
        setIsAdmin(isAdmin);
        setUserId(decoded.sub);
        navigate("/");
      })
      .catch(() => toast.error("E-mail ou senha incorretos"));
  };

  const register = async (username, email, password) => {
    createUser(username, email, password)
      .then(() => {
        toast.success("Usuário registrado com sucesso");

        navigate("/login");
      })
      .catch(err => {
        const errorMessage = String(
          err.response.data.message
        ).toLocaleLowerCase();
        if (errorMessage.includes("username")) {
          toast.error("Nome de usuário já cadastrado!");
        } else if (errorMessage.includes("email")) {
          toast.error("Email já cadastrado!");
        } else {
          toast.error("Erro no servidor");
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("@mais-arvores/token");
    localStorage.removeItem("@mais-arvores/admin");
    api.defaults.headers.Authorization = null;
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!token,
        token,
        loading,
        login,
        register,
        logout,
        userId,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
