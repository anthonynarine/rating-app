import axios from "axios";
import { useState, useEffect } from "react";

export function useAuthServices() {
  // Request tokens
  const obtainTokens = async (username, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      const { access, refresh } = response.data;

      console.log("Data returned by obtainTokens():", response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Extract the user_id from the token
  const getUserIdFromToken = (access) => {
    try {
      const token = access;
      // Split the token into its components (header, payload, signature)
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) {
        throw new Error("Invalid token structure");
      }

      // Decode the payload
      const decodedPayload = atob(tokenParts[1]);

      // Parse the payload
      const payloadData = JSON.parse(decodedPayload);
      const userId = payloadData.user_id;

      return userId;
    } catch (error) {
      console.error("Error extracting user ID from token:", error.message);
      return null;
    }
  };
  // Use the userId in localstorage to get get the username
  const getUserDetials = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/users/?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const userDetials = response.data;
      localStorage.setItem("username", userDetials.username);
    } catch (error) {
      console.log("Error obtaining user details:", error.message);
      return error;
    }
  };

  return {
    obtainTokens,
    getUserIdFromToken,
    getUserDetials,
  };
}
