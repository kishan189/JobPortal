// src/api/axiosInstance.js
import axios from "axios";

// ✅ Create Axios instance
const apiInterceptor = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5171/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional: prevent hanging requests
});

// ✅ Request Interceptor — attach token from localStorage
apiInterceptor.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const { token } = JSON.parse(userData);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor — handle errors globally
apiInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Token expired or unauthorized
      if (status === 401) {
        console.warn("Session expired or unauthorized. Logging out...");
        localStorage.removeItem("userData");
        window.location.href = "/login"; // redirect to login
      }

      // Forbidden
      if (status === 403) {
        console.warn("Access denied");
      }

      // Server error
      if (status >= 500) {
        console.error("Server error:", error.response.data);
      }
    } else if (error.request) {
      console.error("No response from server. Check your network.");
    } else {
      console.error("Axios config error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiInterceptor;
