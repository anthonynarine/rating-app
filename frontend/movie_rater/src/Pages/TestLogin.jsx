import React, { useEffect } from "react";
import { useLogin } from "../components/Context/LoginContext";
import { Button } from "@mui/material";
import { useState } from "react";
import useAxiosWithInterceptor from "../utility/jwtinterceptor";

function TestLogin() {
  const { isLoggedIn, logout } = useLogin();
  const [username, setUsername] = useState("");

  const jwtAxios = useAxiosWithInterceptor();

  useEffect(() => {
    console.log("isLoggedIn state in TestLogin:", isLoggedIn);
  }, [isLoggedIn]);

  const getUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");

      const response = await jwtAxios.get(
        `http://127.0.0.1:8000/api/users/${userId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("TEST LOGIN REQUEST DATA:", response.data);
      const userDetails = response.data;
      setUsername(userDetails.username);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


  return (
    <>
      <div>{isLoggedIn ? `Logged in as ${username}` : "Not logged in"}</div>
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
      <Button variant="contained" onClick={getUserDetails}>
        Get User Details
      </Button>
      <div>{`username: ${username}`}</div>
    </>
  );
}

export default TestLogin;
