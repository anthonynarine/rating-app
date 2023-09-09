import { Box,  } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

const Main = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: `${theme.primaryAppBar.height}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        overflow: "auto", //enables scroll
      }}
    >
      {children}
      {/* {[...Array(100)].map((_, i) => (
            <Typography key={i} paragraph>
              {i + 1}
            </Typography>
          ))} */}
    </Box>
  );
};

export default Main;
