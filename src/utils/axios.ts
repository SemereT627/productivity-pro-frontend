import axios from "axios";
import { BACKEND_URL } from "../constants";

const BASE_URL = BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
