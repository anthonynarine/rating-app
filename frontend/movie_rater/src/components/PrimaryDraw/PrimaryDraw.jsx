import { Box, useMediaQuery, styled } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import MuiDrawer from "@mui/material/Drawer";
import DrawerToggle from "./DrawerToggle";

const PrimaryDraw = function ({ children }) {
  const theme = useTheme();
  const below600sm = Boolean(useMediaQuery("(max-width:599px)"));
  const [open, setOpen] = useState(false);

  const openedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: "hidden",
  });

  const closedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: "hidden",
    width: theme.primaryDraw.closed,
  });

  const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
    width: theme.primaryDraw.width,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(),
      "& .MuiDrawer-paper": openedMixin(),
    }),
    ...(!open && {
      ...closedMixin(),
      "& .MuiDrawer-paper": closedMixin(),
    }),
  }));

  console.log(below600sm); //testing

  useEffect(() => {
    setOpen(!below600sm);
  }, [below600sm]);

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child, { open }) : child
  );

  return (
    <Drawer
      open={open}
      variant={below600sm ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          width: theme.primaryDraw.width,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 0,
            width: open ? "auto" : "100%",
          }}
        >
          <DrawerToggle
            open={open}
            handleOpenDrawer={handleOpenDrawer}
            handleCloseDrawer={handleCloseDrawer}
          />
        </Box>
        {childrenWithProps}
      </Box>
    </Drawer>
  );
};

export default PrimaryDraw;
