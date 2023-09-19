

import React, { useEffect } from "react";
import { useAuthServices } from "../components/Auth/AuthServices";
import { useAuth } from "../components/Context/AuthContext";


function TestLogin() {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    console.log("isLoggedIn state in TestLogin:", isLoggedIn);
  }, [isLoggedIn]);

  return <div>{isLoggedIn ? "Logged in" : "Not logged in"}</div>;
}

export default TestLogin;
