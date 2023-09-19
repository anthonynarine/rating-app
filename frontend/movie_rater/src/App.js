// App.js
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { ThemeProvider } from "@emotion/react";
import { createMuiTheme } from "./theme/theme"; // Corrected import
import DetailPage from "./Pages/DetailPage";
import Login from "./components/Auth/Login";
import { AuthProvider } from "./components/Context/AuthContext";
import TestLogin from "./Pages/TestLogin";

function App() {
  const theme = createMuiTheme();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/testlogin" element={<TestLogin />} />
          <Route path="/movies/:movieId" element={<DetailPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
