import React from "react";
import { Snackbar, Alert } from "@mui/material";

const CustomSnackbar = ({ open, message, severity, handleClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000} // Auto close after 3 seconds
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;