import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "../components/PrimaryAppBar/PrimaryAppBar";
import PrimaryDraw from "../components/PrimaryDraw/PrimaryDraw";
import Main from "../components/Main/Main";
import MovieList from "../components/PrimaryDraw/MovieList";
import MovieDetail from "../components/Main/MovieDetails";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        <MovieList />
      </PrimaryDraw>
      <Main>
        <MovieDetail />
      </Main>
    </Box>
  );
};

export default Home;
