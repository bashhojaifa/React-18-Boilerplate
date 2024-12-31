import { toast } from "react-toastify";

// Internal dependencies
import { publicRequest, privateRequest } from "./apiConfig";

// api request scaffolding
const api = {
  /**
   * @function privateRequestHandler
   * @description Handles private API requests with a given configuration, dispatches the result to the store, and manages the loading state.
   * @param {object} options - Configuration options for the API request (method, url, data, etc.)
   * @param {function} dispatch - Redux dispatch function to update the store with the response data.
   * @param {function} setIsLoading - Function to manage the loading state.
   * @param {function} successAction - Redux action to be dispatched on successful API response.
   * @param {string} message - Success message to be displayed to the user.
   * @returns {Promise<void>} - Returns a promise that resolves once the request is complete.
   */
  async privateRequestHandler(
    options,
    dispatch,
    setIsLoading,
    successAction,
    message
  ) {
    setIsLoading(true);
    try {
      const res = await privateRequest(options);
      dispatch(successAction(res.data)); // Dispatch successful response data
      toast.success(message || res.data.message); // Show success message
    } catch (error) {
      toast.error(error.response?.data?.message); // Show error message
      throw new Error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  },

  /**
   * @function publicRequestHandler
   * @description Handles public API requests with a given configuration, dispatches the result to the store, and manages the loading state.
   * @param {object} options - Configuration options for the API request (method, url, data, etc.)
   * @param {function} dispatch - Redux dispatch function to update the store with the response data.
   * @param {function} setIsLoading - Function to manage the loading state.
   * @param {function} successAction - Redux action to be dispatched on successful API response.
   * @returns {Promise<void>} - Returns a promise that resolves once the request is complete.
   */
  async publicRequestHandler(options, dispatch, setIsLoading, successAction) {
    setIsLoading(true);
    try {
      const res = await publicRequest(options);
      dispatch(successAction(res.data)); // Dispatch successful response data
    } catch (error) {
      toast.error(error.response?.data?.message); // Show error message
      throw new Error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  },
};

export const { privateRequestHandler, publicRequestHandler } = api;
