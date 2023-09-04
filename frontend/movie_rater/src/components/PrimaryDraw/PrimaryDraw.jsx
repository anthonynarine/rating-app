import { Box, useMediaQuery, styled } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import MuiDrawer from "@mui/material/Drawer";
import DrawerToggle from "./DrawerToggle";
import { useCallback } from "react";

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

  //see why these handlerfunctions were created this way NOTES below
  const handleOpenDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const childrenWithProps = React.Children.map(children, (child) =>
  /* this code is iterating 
    over all the children of a component. For each child 
    that is a valid React element, it clones the element and
    injects the open prop into it. If the child is not a valid 
  React element, it just passes it through unchanged.*/
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

export default React.memo(PrimaryDraw);




          ////   useCallback notes
/* What we did here is wrap each function with useCallback,
 and provided an array of dependencies. Since these functions
 don't depend on any external variables, we've provided an empty 
 array []. This means the functions will retain their identity 
unless something in that dependency array changes (which in this 
case, won't happen because it's empty).

By doing this, the functions won't get re-created 
with every render, which can be beneficial for performance,
 especially if these functions are passed to child components or
used in effects with these functions as dependencies. */
