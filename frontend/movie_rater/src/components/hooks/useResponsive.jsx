

import { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

export function useResponsiveDrawer() {
  const [isDrawerVisible, setDrawerVisibility] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isSmallScreen && isDrawerVisible) {
      setDrawerVisibility(false);
    }
  }, [isSmallScreen, isDrawerVisible]);

  const toggleDrawer = (visible) => () => {
    setDrawerVisibility(visible);
  };

  return { isDrawerVisible, toggleDrawer };
}
