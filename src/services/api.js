import axios from "axios";

export const api = axios.create({
  baseURL: "https://mais-arvores-api.herokuapp.com",
});

export const createSession = async (email, password) => {
  return api.post("/users/login", { email, password });
};

export const getProducts = async () => {
  return api.get("/products");
};
