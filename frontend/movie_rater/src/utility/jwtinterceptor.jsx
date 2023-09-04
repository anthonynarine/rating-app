import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const useAxiosWithInterceptor = () => {
  // Base URL for the created Axios instance
  const API_BASE_URL = BASE_URL;

  // Create an Axios instance with the base URL
  const jwtAxios = axios.create({ baseURL: API_BASE_URL });

  // Get the `navigate` function from react-router-dom
  const navigate = useNavigate();

  // Add response interceptor
  jwtAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401) {
        // Redirect to home if unauthorized
        // navigate("/");

        // Uncomment the following lines and modify them if you want to handle token refresh and retry logic in the future
        /*
        const refreshToken = getRefreshTokenFromSomewhere();
        const newToken = await refreshTheToken(refreshToken);
        if (newToken) {
            originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
            return jwtAxios(originalRequest);  // retrying the original request with new token
        }
        */
      }
      throw error;
    }
  );

  return jwtAxios;
};

export default useAxiosWithInterceptor;
