import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCrud from "../hooks/useCrud";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const RateMovieDialog = ({ open, handleClose, movie }) => {
  const navigate = useNavigate();

  const [rating, setRating] = useState(2); // Set the initial rating

  const { rateMovie } = useCrud([], `/movies/${movie.id}/rate_movie/`);

  const handleChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmit = async () => {
    console.log("Movie ID:", movie.id);
    try {
      await rateMovie(movie.id, rating);
      setRating(0); // Reset the rating
      handleClose();
    } catch (error) {
      console.error("Error while rating the movie:", error);
    }
  };

  return (
    <Dialog sx={{ minWidth: 150, minHeight: 600 }} open={open} onClose={handleClose}>
      <DialogTitle>
        {movie.title}
        <Typography variant="h6" align="center">
          Average Rating: {movie.avg_rating}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" alignItems="center" spacing={2}>
          {/* Rating input */}
          <Grid item>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="movie-rating"
                value={rating}
                precision={0.5} // Allow half stars
                getLabelText={getLabelText}
                onChange={handleChange}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {rating !== null && (
                <Box sx={{ ml: 2 }}>{labels[rating]}</Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RateMovieDialog;
