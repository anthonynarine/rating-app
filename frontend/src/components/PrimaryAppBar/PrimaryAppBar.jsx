// components/PrimaryAppBar.js
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import MenuIcon from "@mui/icons-material/Menu";
import { useResponsiveDrawer } from "../hooks/useResponsive";
import AccountButton from "../../helper/AccountButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import CreateMovieDialog from "../../helper/CreateMovie";

// needed for Creating new entries.
import useCrud from "../hooks/useCrud";
import LogInOut from "../../helper/LogInOut/LogInOut";

const PrimaryAppBar = () => {
  const theme = useTheme();

  const { isDrawerVisible, toggleDrawer } = useResponsiveDrawer();
  // State for controlling the visibility of the create movie dialog.
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to handle opening the create movie dialog.
  const handleDialogOpen = () => setIsDialogOpen(true);

  // Function to handle closing the create movie dialog.
  const handleDialogClose = () => setIsDialogOpen(false);

  // Importing CRUD methods using the useCrud hook.
  const crudMethods = useCrud([], "/movies/"); // Assuming useCrud hook is imported

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

        <Drawer anchor="left" open={isDrawerVisible} onClose={toggleDrawer(false)}>
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
          <AddCircleIcon onClick={handleDialogOpen} />
          <CreateMovieDialog
            open={isDialogOpen}
            handleClose={handleDialogClose}
            onCreate={crudMethods.createData}
          />
        </IconButton>
        <Box sx={{ flexGrow: 1, marginRight: "1px" }}></Box>
        <IconButton>
          <Box sx={{mr: "16px"}} >
            <AccountButton />
          </Box>
          <LogInOut />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
