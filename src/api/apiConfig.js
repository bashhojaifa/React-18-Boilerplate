import axios from "axios";

// Internal dependencies
import { getToken, tokenDecoded } from "../utils/tokenHelper";
import { logout } from "./services/auth.service";

// Base API URL
const BASE_URL = "http://localhost:3000/api/v1";

// Axios instance for public requests
export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Axios instance for private requests
export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor to include token in headers or logout if token is invalid
privateRequest.interceptors.request.use((config) => {
  const TOKEN = getToken();

  // If token is missing or expired, log out the user
  if (!TOKEN || tokenDecoded().exp * 1000 < Date.now()) {
    logout();
  } else {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }

  return config;
});
