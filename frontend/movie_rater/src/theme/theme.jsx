// theme/theme.js
import { createTheme, responsiveFontSizes } from "@mui/material";

export const createMuiTheme = (mode) => {
  let theme = createTheme({
    typography: {
      fontFamily: ['Teko', "sans-serif", 'Roboto', "sans-serif"].join(","),
      body2: {
        fontWeight: 600,
        letterSpacing: "0.5px",
      },
    },
    primaryAppBar: {
      height: 75,
    //   backgroundColor: "blue"
    },
    primaryDraw: {
      width: 240,
      closed: 70,
    },
    palette: {
      mode,
    },
    //overides mui theme
    components: {
      MuiAppBar: {
        defaultProps: {
          color: "default",
          elevation: 0,
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return theme;
};
