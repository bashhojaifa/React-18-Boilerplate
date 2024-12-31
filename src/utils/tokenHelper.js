// Token utility module for managing authentication tokens
const token = {
  // Set token in localStorage
  setToken: (tokenValue) => localStorage.setItem("HRM", tokenValue),

  // Get token from localStorage
  getToken: () => localStorage.getItem("HRM"),

  // Check if token exists in localStorage
  isToken: () => Boolean(token.getToken()),

  // Check if user is logged in (token exists)
  isLogin: () => Boolean(token.getToken()),

  // Remove token from localStorage
  removeToken: () => localStorage.removeItem("HRM"),

  // Decode JWT token to extract payload data
  tokenDecoded: () => {
    const storedToken = token.getToken();
    return storedToken ? JSON.parse(atob(storedToken.split(".")[1])) : null;
  },
};

// Exporting individual methods from the token module
export const {
  setToken,
  getToken,
  isToken,
  isLogin,
  removeToken,
  tokenDecoded,
} = token;
