import { IconButton, Box } from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";

const DrawerToggle = (props) => {
  const { open, handleOpenDrawer, handleCloseDrawer } = props;

  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton onClick={open ? handleCloseDrawer : handleOpenDrawer}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Box>
  );
};

export default DrawerToggle;
