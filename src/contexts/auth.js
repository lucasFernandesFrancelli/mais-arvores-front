import React, { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
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

    setToken(token);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setToken(null);
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{ authenticated: !!token, token, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
