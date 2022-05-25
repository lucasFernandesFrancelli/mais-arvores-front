import React, { createContext, useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api, createSession, createUser } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("token");

    if (recoveredUser) {
      setToken(recoveredUser);
      api.defaults.headers.Authorization = `Bearer ${recoveredUser}`;
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await createSession(email, password);

    const token = response.data;

    localStorage.setItem("token", token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    toast.success("Login bem sucedido");
    setToken(token);
    // navigate("/");
  };

  const register = async (username, email, password) => {
    await createUser(username, email, password);

    toast.success("Usuário registrado com sucesso");

    // navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setToken(null);
    // navigate("/");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
