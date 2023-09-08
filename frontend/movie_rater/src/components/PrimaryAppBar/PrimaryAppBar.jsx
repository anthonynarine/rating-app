// components/PrimaryAppBar.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import MenuIcon from "@mui/icons-material/Menu";
import { useResponsiveDrawer } from "../hooks/useResponsive";
import AccountButton from "../../helper/AccountButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const PrimaryAppBar = () => {
  const theme = useTheme();

  const { isDrawerVisible, toggleDrawer } = useResponsiveDrawer();

  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
        }}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 0.75 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Drawer
          anchor="left"
          open={isDrawerVisible}
          onClose={toggleDrawer(false)}
        >
          {[...Array(100)].map((_, i) => (
            <Typography key={i} paragraph>
              {i + 1}
            </Typography>
          ))}
        </Drawer>

        <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { fontWeight: 600, letterSpacing: "0.5px" } }}
          >
            Movies
          </Typography>
        </Link>
        <TheaterComedyIcon sx={{ marginLeft: "3px" }} />
        <Box sx={{ flexGrow: 1 }}></Box>
        <IconButton>
          <AddCircleIcon Add New />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}></Box>
        <IconButton>
          <AccountButton />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
