import axios from "axios";

export function useAuthServices() {
  const obtainTokens = async (username, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      if (response.data && response.data.access) {
        localStorage.setItem("access_token", response.data.access);
      }

      if (response.data && response.data.refresh) {
        localStorage.setItem("refresh_token", response.data.refresh);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { obtainTokens };
}
