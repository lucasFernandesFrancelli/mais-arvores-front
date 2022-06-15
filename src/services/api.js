import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: "https://mais-arvores-api.herokuapp.com",
});

export const createSession = async (email, password) => {
  return api.post("/users/login", { email, password });
};

export const createUser = async (username, email, password) => {
  return api.post("/users", { username, email, password });
};

export const getProducts = async () => {
  return api.get("/products");
};

export const getProductsImage = async () => {
  return api.get("/products/download/");
};
