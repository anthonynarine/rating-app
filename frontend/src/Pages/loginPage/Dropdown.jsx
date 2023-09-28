import React, { useState } from "react";
import "./Dropdown.css";
import { Button , useTheme} from "@mui/material";
import { LoginStyles } from "../LoginStyles";


const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const theme = useTheme();
    const classes = LoginStyles(theme);

    return (
        <div className="dropdown">
            <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
            <div className={`dropdown-content ${isOpen ? 'open' : ''}`}>
            <Button
                sx={classes.button}
                disableElevation
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </div>
        </div>
    );
}

export default Dropdown;
