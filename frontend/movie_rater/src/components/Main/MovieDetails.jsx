import { Container, useTheme, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { MEDIA_URL } from "../../config";
import { Link, useParams } from "react-router-dom";
import useCrud from "../hooks/useCrud";
import { MovieDetailsStyles } from "./MovieDetailsStyles";
import MovieList from "../PrimaryDraw/MovieList";

const MovieDetail = () => {
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
              textAlign: { xs: "center", sm: "left" }
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
              textAlign: { xs: "center", sm: "left" }
            }}
          >
            {movieId ? `Edit: ${dataCRUD.title}` : "some of my favorite movies"}
          </Typography>
        </Box>
      </Container>
    </>
  );
};
export default MovieDetail;
