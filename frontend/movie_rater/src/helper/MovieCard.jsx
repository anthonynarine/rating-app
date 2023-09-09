// MovieCard.js

import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  ListItem,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import StarRating from "./StarRating";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movies/${movie.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "none",
          backgroundImage: "none",
        }}
      >
        <CardMedia
          component="img"
          image={
            movie.banner_img ? movie.banner_img : "https://source.unsplash.com/random/"
          }
          alt="random"
          sx={{
            display: { xs: "none", sm: "block" },
            height: 250,
            width: 200,
            objectFit: "cover",
          }}
        />
        <CardContent sx={{ flexGrow: 1, p: 0, "&:last-child": { paddingBottom: 0 } }}>
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: "50px" }}>
              <ListItemAvatar>
                <Avatar alt="movie icon" src={movie.icon} />
              </ListItemAvatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  textAlign="start"
                  sx={{
                    fontWeight: 700,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {movie.title}
                </Typography>
              }
              secondary={
                <Typography variant="body2">
                  <StarRating rating={movie.avg_rating} />
                </Typography>
              }
            />
          </ListItem>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
