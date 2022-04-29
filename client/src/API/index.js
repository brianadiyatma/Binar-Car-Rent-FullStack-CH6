import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const login = (email, password) =>
  API.post("/auth/login", { email, password });

export const signup = (email, password, firstName, lastName, privilege) =>
  API.post("/auth/signup", { email, password, firstName, lastName, privilege });
