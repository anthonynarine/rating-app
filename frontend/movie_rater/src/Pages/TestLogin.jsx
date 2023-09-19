

import React, { useEffect } from "react";
import { useLogin } from "../components/Context/LoginContext"; 

function TestLogin() {
  const { isLoggedIn,  } = useLogin();

  useEffect(() => {
    console.log("isLoggedIn state in TestLogin:", isLoggedIn);
  }, [isLoggedIn]);

  return <div>{isLoggedIn ? "Logged in" : "Not logged in"}</div>;
}

export default TestLogin;
