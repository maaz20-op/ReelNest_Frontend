import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific HTTP status codes
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        // Optional: clear tokens, redirect to login page
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
