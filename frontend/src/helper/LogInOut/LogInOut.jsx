import { AccountCircle } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { IconButton, Box, Menu, MenuItem, Paper } from "@mui/material";
// import DarkModeSwitch from "./DarkMode/DarkModeSwitch";
import React, { useState } from "react";
import { useLogin } from "../../components/Context/LoginContext";
import useLogInOutStyles from "./LogInOutStyles";
import LogInOutButton from "./CustomBtn";

export default function LogInOut() {
  const [anchorElement, setAnchorElement] = useState(null);
  const isMenuOpen = Boolean(anchorElement);

  const { isLoggedIn } = useLogin();
  const classes = useLogInOutStyles();

  const handleProfileMenuOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElement(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorElement}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: 6, horizontal: "right" }}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem className={classes.customPaper} >{isLoggedIn ? "logout" : "login"}</MenuItem> */}
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: { xs: "flex" } }}>
        {/* { /* <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}> */}
          {/* {isLoggedIn ? "logout" : "login"} */}
        {/* </IconButton> */}
        <LogInOutButton />
        {/* {renderMenu} */}
      </Box>
    </>
  );
}