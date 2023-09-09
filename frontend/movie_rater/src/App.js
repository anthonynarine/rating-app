// App.js
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { ThemeProvider } from "@emotion/react";
import { createMuiTheme } from "./theme/theme"; // Corrected import
import DetailPage from "./Pages/DetailPage";
import Login from "./components/Auth/Login";
import { AuthProvider } from "./components/Context/AuthContext";

function App() {
  const theme = createMuiTheme();

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies/:movieId" element={<DetailPage />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
