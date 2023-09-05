import {
  Container,
  useTheme,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  ListItem,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useEffect } from "react";
import { MEDIA_URL } from "../../config";
import { Link, useParams } from "react-router-dom";
import useCrud from "../hooks/useCrud";
import { MovieDetailsStyles } from "./MovieDetailsStyles";
import MovieList from "../PrimaryDraw/MovieList";

const MovieDetail = ({ open }) => {
  const { movieId } = useParams();
  const url = movieId ? `/movies/${movieId}/` : "/movies/";

  const theme = useTheme();
  const classes = MovieDetailsStyles(theme);

  const { dataCRUD, fetchData } = useCrud([], url);

  //   console.log("Current ID from useParams:", movieId);

  useEffect(() => {
    console.log("URL to fetch:", url); // log the URL
    fetchData();
  }, [movieId]);

  useEffect(() => {
    console.log("MOVIE by ID:", dataCRUD);
  }, [dataCRUD]);
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ pt: 4 }}>
          <Typography
            variant="h3"
            noWrap
            component="h1"
            sx={{
              display: {
                sm: "block",
                fontWeight: 700,
                fontSize: "48px",
                letterSpacing: "-2px",
              },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {movieId ? `${dataCRUD.title}` : "Popular Movies"}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            noWrap
            component="h2"
            color="textSecondary"
            sx={{
              display: {
                sm: "block",
                fontWeight: 700,
                fontSize: "48px",
                letterSpacing: "-.5px",
              },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {movieId
              ? `Edit: ${dataCRUD.title}${dataCRUD.avg_rating}`
              : "some of my favorite movies"}
          </Typography>
          <Grid container spacking={{ xs: 0, sm: 2 }}>
            {Array.isArray(dataCRUD) &&
              dataCRUD.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={3} md={3} lg={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "none",
                      backgroundImage: "none",
                    }}
                  >
                    <Link
                      to={`/movies/${movieId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <CardMedia
                        component="img"
                        image={
                          movie.banner_img
                            ? movie.banner_img
                            : "https://source.unsplash.com/random/"
                        }
                        alt="random"
                        sx={{
                          display: { xs: "none", sm: "block" },
                          height: 250,
                          width: 200,
                          objectFit: "cover",
                        }}
                      />
                      <CardContent
                        sx={{ flexGrow: 1, p: 0, "&:last-child": { paddingBottom: 0 } }}
                      >
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
                                {movie.avg_rating}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </CardContent>
                    </Link>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
export default MovieDetail;
