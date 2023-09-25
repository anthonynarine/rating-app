import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box, useTheme } from "@mui/material";
import { useAuthServices } from "../components/Auth/AuthServices";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../components/Context/LoginContext";
import { LoginStyles } from "./LoginStyles";
import { validateUsername, validatePassword } from "./validators/LoginValidators";
import { validateEmail } from "./validators/LoginValidators";

const Signup = () => {
  //  Handles for textfields/inputfields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // Handles username and password valitaion error
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const { signup } = useAuthServices();

  const theme = useTheme();
  const classes = LoginStyles(theme);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const usernameErrorMsg = validateUsername(username);
    const emailErrorMsg = validateEmail(email);
    const passwordErrorMsg = validatePassword(password);
    const password2ErrorMsg = validatePassword(password2);

    setUsernameError(usernameErrorMsg);
    setEmailError(emailErrorMsg);
    setPasswordError(passwordErrorMsg);
    setPassword2Error(password2ErrorMsg);

    // If there's a validation error, we exit the function without proceeding
    if (usernameErrorMsg || passwordErrorMsg || password2 || emailErrorMsg) {
      return;
    }

    // Handle signup logic logic here
    try {
      const response = await signup(username, email, password, password2);

      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setApiError("Invalid username or password. Please try again");
      } else {
        setApiError("An unexpected error occured. Please try again later");
      }
    }
  };

  return (
    <Box sx={{ ...LoginStyles.bodyBackground }}>
      <Container component="main" maxWidth="xs" sx={classes.container}>
        <Box sx={classes.loginBox}>
          <Typography
            variant="h5"
            noWrap
            component="h1"
            sx={{ alignItems: "center", fontWeight: 500, pb: 2 }}
          >
            Signup
          </Typography>
          {apiError && <Typography color="error">{apiError}</Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate>
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
              error={!!usernameError}
              helperText={usernameError}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              name="email"
              label="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
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
              error={!!passwordError}
              helperText={passwordError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="password2"
              name="password2"
              type="password2"
              id="password2"
              value={password}
              onChange={(e) => setPassword2(e.target.value)}
              error={!!password2Error}
              helperText={password2Error}
            />
            <Button
              sx={classes.button}
              disableElevation
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
