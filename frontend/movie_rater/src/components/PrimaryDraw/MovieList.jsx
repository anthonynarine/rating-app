import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  ListItemButton,
  useTheme,
} from "@mui/material";

import useCrud from "../hooks/useCrud";
import { useEffect } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MEDIA_URL } from "../../config";
import { Link } from "react-router-dom";
import { MessageListStyles } from "./MovieListStyles";
import React from "react";

const MovieList = ({ open }) => {
  const { dataCRUD, fetchData } = useCrud([], "/movies/");

  const theme = useTheme();
  const classes = MessageListStyles(theme);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Movies", dataCRUD);
  }, [dataCRUD]);

  return (
    <>
      <Box sx={classes.mainBox}>
        <Typography
          variant="h6"
          sx={{ display: open ? "block" : "none", color: "#637C5B" }}
        >
          Movie List
        </Typography>
      </Box>
      {dataCRUD &&
        dataCRUD.map((movie) => (
          <ListItem
            key={movie.id}
            disablePadding
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              to={`/movies/${movie.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 0 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: "50px" }}>
                    <Avatar alt="Movie Icon" src={movie.icon} />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        lineHeight: 1.2,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {movie.title}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
    </>
  );
};

export default React.memo(MovieList);
