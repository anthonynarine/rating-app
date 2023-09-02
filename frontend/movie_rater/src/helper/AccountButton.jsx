import { AccountCircle } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { IconButton, Box, Menu, MenuItem } from "@mui/material";
// import DarkModeSwitch from "./DarkMode/DarkModeSwitch";
import React, { useState } from "react";

export default function AccountButton() {
  const [anchorElement, setAnchorElement] = useState(null);
  const isMenuOpen = Boolean(anchorElement);

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
      <MenuItem>
        <Brightness4Icon sx={{ marginRight: "6px", fontSize: "20px" }} />
        {/* <DarkModeSwitch /> */}
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: { xs: "flex" } }}>
        <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
          <AccountCircle />
        </IconButton>
        {renderMenu}
      </Box>
    </>
  );
}
