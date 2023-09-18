import axios from "axios";

export function useAuthServices() {

  //Extract the user_id from the token
  const getUserIdFromToken = (access) => {
    try {
      const token = access
      // Split the token into its components (header, payload, signature)
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        throw new Error("Invalid token structure");
      }
  
      // Decode the payload
      const decodedPayload = atob(tokenParts[1]);
  
      // Parse the payload
      const payloadData = JSON.parse(decodedPayload);
      const userId = payloadData.user_id
  
      return userId
    } catch (error) {
      console.error("Error extracting user ID from token:", error.message);
      return null; 
    }
  };
  
  
  //Request tokens
  const obtainTokens = async (username, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      const {access, refresh} = response.data;

      console.log("Data returned by obtainTokens():", response.data);
      return response.data
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { obtainTokens, getUserIdFromToken }
}
