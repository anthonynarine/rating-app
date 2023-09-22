import React, { useEffect } from "react";
import { useLogin } from "../components/Context/LoginContext";
import { Button } from "@mui/material";

function TestLogin() {
  const { isLoggedIn, logout } = useLogin();

  useEffect(() => {
    console.log("isLoggedIn state in TestLogin:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <div>{isLoggedIn ? "Logged in" : "Not logged in"}</div>
      <Button variant="contained" onClick={()=>{logout()}}>Logout</Button>
    </>
  );
}

export default TestLogin;
