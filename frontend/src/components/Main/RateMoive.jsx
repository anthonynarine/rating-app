import { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useCrud from "../hooks/useCrud";

const RateMovieDialog = ({ open, handleClose, movie }) => {
    
    const navigate = useNavigate()

    const [rating, setRating] = useState(0);

    const { rateMoive } = useCrud([], "/rate_movie/");

    const handleChange = (event) => {
        setRating(event.target.value)
    };

    const handleSubmit = async (id) => {
        try {
            await rateMoive(movie.id, rating);
            setRating(0) //rest the rating
            handleClose()
            
        } catch (error) {
            console.error("Error while rating the movie:", error); 
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Rate Movie</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    next
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RateMovieDialog;
