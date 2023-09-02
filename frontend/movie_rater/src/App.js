// App.js
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { ThemeProvider } from "@emotion/react";
import { createMuiTheme } from "./theme/theme"; // Corrected import

function App() {
  const theme = createMuiTheme();

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
