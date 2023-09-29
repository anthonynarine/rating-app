import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useLogin } from "../Context/LoginContext";
import { Typography } from "@mui/material";

const LogInOutButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const { login, logout } = useLogin();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      // If the user is logged in, log them out
      logout();
    } else {
      // If the user is not logged in, log them in
      login();
    }
  };

  const sleekStyle = {
    background: "inherit", // Dark background color
    color: "inherit", // White text
    borderRadius: "15px", // Smaller border radius
    padding: "5px 10px", // Smaller padding
    fontWeight: "bold",
    textTransform: "uppercase",
    border: "none", // No border
    transition: "background-color 0.3s, color 0.3s",
    fontSize: "18px", // Smaller font size
    boxShadow: "none", // No shadow
  };

  return (
    <Button
      variant="contained"
      color={isLoggedIn ? "secondary" : "primary"}
      onClick={handleButtonClick}
      style={sleekStyle}
    >
      {isLoggedIn ? (
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ display: { fontWeight: 400, letterSpacing: "0px", color: "black" } }}
        >
          sign out
        </Typography>
      ) : (
        <Typography
        variant="h5"
        noWrap
        component="div"
        sx={{ display: { fontWeight: 400, letterSpacing: "0px", color: "black" } }}
      >
        sign in
      </Typography>
      )}{" "}
      {/* Use concise text */}
    </Button>
  );
};

export default LogInOutButton;
