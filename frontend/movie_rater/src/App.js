// App.js
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { ThemeProvider } from "@emotion/react";
import { createMuiTheme } from "./theme/theme"; // Corrected import
import DetailPage from "./Pages/DetailPage";
import Login from "./Pages/loginPage/Login";
import { AuthProvider } from "./components/Context/AuthContext";
import { LoginProvider } from "./components/Context/LoginProvider";
import TestLogin from "./Pages/TestLogin";
import Signup from "./Pages/SignupPage";

function App() {
  const theme = createMuiTheme();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <LoginProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/testlogin" element={<TestLogin />} />
            <Route path="/movies/:movieId" element={<DetailPage />} />
          </Routes>
        </LoginProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
