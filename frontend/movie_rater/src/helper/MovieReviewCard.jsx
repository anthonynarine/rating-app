import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useCrud from "../components/hooks/useCrud";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useNavigate } from "react-router-dom";



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MovieReviewCard({ dataCRUD }) {
  const { title, avg_rating, num_of_ratings, icon, banner_img, description } = dataCRUD;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const navigate = useNavigate()
  const { deleteData } = useCrud([], '/movies');

  const handleDelete = async (id) => {
      try {
          await deleteData(dataCRUD.id);
          console.log(dataCRUD.id, dataCRUD.title, "DELETED")
          navigate("/")
          // Maybe show a success message after deletion
      } catch (error) {
          console.error("Failed to delete:", error);
          // Handle error (maybe show an error message to the user)
      }
  };

  return (
    <Card sx={{ maxWidth: 500, minWidth: 500, borderColor: "black"}} elevation={1}>
      <CardHeader
        avatar={<Avatar src={icon} aria-label="movie-icon" />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={`Average Rating: ${avg_rating} (${num_of_ratings} ratings)`}
      />
      <CardMedia
        component="img"
        height="300"
        image={banner_img ? banner_img : "https://source.unsplash.com/random/"}
        alt="banner image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <DeleteSweepIcon onClick={handleDelete} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* Additional details can go here */}
          <Typography paragraph>Additional details can be added here.</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
