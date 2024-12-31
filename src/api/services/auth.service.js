import { toast } from "react-toastify";

// Internal dependencies
import { publicRequest } from "../apiConfig";
import { setToken, removeToken } from "../../utils/tokenHelper";
import { addData } from "../../features/reducers/authSlice";

// Auth actions: Handles login and logout functionalities
const actions = {
  // Logs in the user, stores the token, and updates the Redux store
  async login(setIsLoading, data, dispatch, navigate) {
    setIsLoading(true);
    try {
      const res = await publicRequest({ method: "POST", url: "login", data });
      setToken(res.data?.token); // Save token to localStorage
      dispatch(addData(res.data)); // Store user data in Redux
      navigate("dashboard"); // Redirect to dashboard
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err.response?.data?.message); // Show error message
      throw new Error(err.response);
    } finally {
      setIsLoading(false);
    }
  },

  // Logs out the user and removes the token
  logout() {
    removeToken(); // Remove token from localStorage
    window.location.replace("/"); // Redirect to login page
  },
};

export const { login, logout } = actions;
