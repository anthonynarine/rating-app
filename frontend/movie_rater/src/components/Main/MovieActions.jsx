

import { Grid, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const MovieActions = ({ onAdd, onEdit, onDelete }) => {
    return (
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <IconButton onClick={onEdit}>
            <EditIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={onDelete}>
            <DeleteForeverIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    );
};

export default MovieActions;





