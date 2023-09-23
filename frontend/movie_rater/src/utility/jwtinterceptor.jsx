import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const useAxiosWithInterceptor = () => {
  const API_BASE_URL = BASE_URL;
  const jwtAxios = axios.create({ baseURL: API_BASE_URL });
  const navigate = useNavigate();

  jwtAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const refreshResponse = await axios.post(
              "http://127.0.0.1:8000/api/token/refresh/",
              {
                refresh: refreshToken,
              }
            );
            const newAccessToken = refreshResponse.data.access;
            localStorage.setItem("accessToken", newAccessToken);
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            
            // Retry the original request with the new token
            return jwtAxios(originalRequest);

          } catch (refreshError) {
            // Handle refresh token failure, e.g., navigate to login or show a message
            navigate("/login"); // Assuming '/login' is your login route
            throw refreshError
          }
        } else {
          // Handle no refreshToken available, e.g., navigate to login or show a message
          navigate("/login");
        }
      }
      throw error
    }
  );

  return jwtAxios;
};

export default useAxiosWithInterceptor;
