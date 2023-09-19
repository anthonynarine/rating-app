import React, { useState, useEffect } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { useAuthServices } from "./AuthServices";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Context/LoginContext"; 


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const navigate = useNavigate();

  const { obtainTokens, getUserIdFromToken, getUserDetials} = useAuthServices();
  const { isLoggedIn, setIsLoggedIn, login, logout } = useLogin();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle login logic here
    try {
      const tokens = await obtainTokens(username, password);
        
      localStorage.setItem("accessToken", tokens.access)
      localStorage.setItem("refreshToken", tokens.refresh)
      localStorage.setItem("userId", getUserIdFromToken(tokens.access))
      localStorage.setItem("isLoggedIn", "true")
      // setIsLoggedIn(true)
      login()
      console.log("isLoggedIn =", isLoggedIn)
      await getUserDetials();

      console.log("Access Token being stored:", tokens.access);
      console.log("Refresh Token being stored:", tokens.refresh);
      console.log("getUserIdFromToken:", getUserIdFromToken(tokens.access));

      navigate("/testlogin");
    } catch (error) {
      // setIsLoggedIn(false)
      logout()
      console.error("Error retrieving token:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;
