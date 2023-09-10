import axios from "axios";

export function useAuthServices() {

  //Request tokens
  const obtainTokens = async (username, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
      console.log("Data returned by obtainTokens():", response.data);
      return response.data
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { obtainTokens }
}
