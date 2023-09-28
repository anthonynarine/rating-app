import { Container, Box, Typography, Grid } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useCrud from "../hooks/useCrud";
import MovieReviewCard from "../../helper/MovieReviewCard";
import MovieCard from "../../helper/MovieCard";

const MovieDetail = ({ open }) => {
  const { movieId } = useParams();
  const url = movieId ? `/movies/${movieId}/` : "/movies/";

  const { dataCRUD, fetchData } = useCrud([], url);

  useEffect(() => {
    fetchData();
  }, [movieId]);

  //for testing
  useEffect(() => {
    console.log("MOVIE by ID:", dataCRUD);
  }, [dataCRUD]);

  const renderHeader = () => {
    if (movieId) {
      return null;
    } else {
      return (
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
          Popular Movies
        </Typography>
      );
    }
  };

  const renderSubheader = () => {
    if (movieId) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center">
          <MovieReviewCard dataCRUD={dataCRUD} />
        </Box>
      );
    } else {
      return (
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
            paddingBottom: 1,
          }}
        >
          Some of my favorite movies
        </Typography>
      );
    }
  };

  const renderMovieList = () => {
    if (movieId) {
      return null;
    } else {
      return (
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
          style={{ width: "100%" }}
        >
          {Array.isArray(dataCRUD) &&
            dataCRUD.map((movie) => (
              <Grid
                item
                key={movie.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                style={{ width: "100%" }}
              >
                <MovieCard movie={movie} />
              </Grid>
            ))}
        </Grid>
      );
    }
  };

  return (
    <>
      <Container maxWidth="xxl" sx={{ px: { md: 5, lg: 7 }, width: "100%" }}>
        <Box sx={{ pt: 4 }}>{renderHeader()}</Box>
        <Box>
          {renderSubheader()}
          {renderMovieList()}
        </Box>
      </Container>
    </>
  );
};

export default MovieDetail;
