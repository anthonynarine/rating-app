// App.js
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { ThemeProvider } from "@emotion/react";
import { createMuiTheme } from "./theme/theme"; // Corrected import
import DetailPage from "./Pages/DetailPage";

function App() {
  const theme = createMuiTheme();

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:movieId" element={< DetailPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
