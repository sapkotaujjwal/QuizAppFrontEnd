import axios from "axios";
import { showError } from "../redux/basicSlice";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  withCredentials: true, // This ensures cookies are sent with requests
});

// Add request interceptor to set Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    console.log(token)
    if (token) {
      config.headers.Authorization = token; // Token already includes "Bearer "
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Reusable API function
export const callApi = async ({
  url,
  method = "GET",
  data = null,
  params = null,
  headers = {},
}) => {
  try {
    const response = await apiClient({
      url,
      method,
      data,
      params,
      headers,
      withCredentials: true, // Optional here too, ensures per-request
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      showError(error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
      throw { message: "No response from server" };
    } else {
      console.error("API Error:", error.message);
      throw { message: error.message };
    }
  }
};
