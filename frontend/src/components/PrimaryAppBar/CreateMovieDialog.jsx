import { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateMovieDialog = ({ onCreate, open, handleClose }) => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        banner_img: "",
        icon: "",
    });

    const handleChange = (event) => {
        const value = event.target.name === "banner_img" || event.target.name === "icon"
            ? event.target.files[0]
            : event.target.value;

        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const formDataObj = new FormData();

            for (let key in formData) {
                formDataObj.append(key, formData[key]);
            }

            await onCreate(formDataObj); // Notice that now we're passing a FormData object
            setFormData({
                title: "",
                description: "",
                banner_img: null,
                icon: null,
            });
            handleClose();
            navigate("/")
            window.location.reload();
        } catch (error) {
            console.error("Error while creating movie:", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Movie</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Title"
                    type="text"
                    fullWidth
                    name="title"
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    name="description"
                    onChange={handleChange}
                />
                <input 
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    name="banner_img"
                    onChange={handleChange}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span">
                        Upload Banner Image
                    </Button>
                </label>
                <input 
                    style={{ display: 'none' }}
                    id="icon-file"
                    type="file"
                    name="icon"
                    onChange={handleChange}
                />
                <label htmlFor="icon-file">
                    <Button variant="contained" component="span">
                        Upload Icon
                    </Button>
                </label>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateMovieDialog;
