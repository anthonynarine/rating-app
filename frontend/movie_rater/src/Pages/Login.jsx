import React, { useState, useEffect } from "react";
import { Button, TextField, Container, Typography, Box, useTheme } from "@mui/material";
import { useAuthServices } from "../components/Auth/AuthServices";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../components/Context/LoginContext";
import { LoginStyles } from "./LoginStyles";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { obtainTokens, getUserIdFromToken, getUserDetials } = useAuthServices();
  const { isLoggedIn, login, logout } = useLogin();

  const theme = useTheme();
  const classes = LoginStyles(theme);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle login logic here
    try {
      const tokens = await obtainTokens(username, password);

      localStorage.setItem("accessToken", tokens.access);
      localStorage.setItem("refreshToken", tokens.refresh);
      localStorage.setItem("userId", getUserIdFromToken(tokens.access));

      login();
      console.log("YOU LOGGED IN", isLoggedIn);

      await getUserDetials();

      console.log("Access Token being stored:", tokens.access);
      console.log("Refresh Token being stored:", tokens.refresh);
      console.log("getUserIdFromToken:", getUserIdFromToken(tokens.access));

      navigate("/testlogin");
    } catch (error) {
      logout();
      console.error("Error retrieving token:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={classes.mainBox}>
        <Typography variant="h5" noWrap component="h1" sx={{ fontWeight: 500, pb: 2 }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="username"
          name="username"
          label="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="password"
          name="password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button sx={{mt: 1, mb: 2}} disableElevation type="submit" fullWidth variant="contained" color="primary">
         Login
        </Button>
      </Box> 
      </Box>
    </Container>
  );
};

export default Login;
