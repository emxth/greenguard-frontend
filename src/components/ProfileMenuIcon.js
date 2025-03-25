import React, { useContext, useState } from "react";
import { Avatar, Divider, Grid, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import AuthContext from "../utils/AuthContext";
import CustomSnackbar from "./CustomSnackbar";

const ProfileMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const { logout } = useContext(AuthContext);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleLogout = () => {
        // Show logout success notification
        setSnackbar({ open: true, message: "Logged out successfully!", severity: "success" });
        
        setTimeout(() => {
            logout(); // Call logout after 1 second
        }, 1000);
    };

    return (
        <Grid item>
            <Tooltip title="View Profile">
                <IconButton onClick={handleClick} size="large">
                    <Avatar>
                        <AccountCircleIcon />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    sx: { width: 200 },
                }}
            >
                <MenuItem onClick={() => navigate("/profile")}>
                    Profile Info
                </MenuItem>
                <MenuItem onClick={() => navigate("/publicpickuprequest")}>
                    My Pickup Requests
                </MenuItem>
                <Divider variant="middle" color={'#000000'} />
                <MenuItem onClick={handleLogout}>
                    Logout
                </MenuItem>
            </Menu>

            {/* Snackbar Notification */}
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                handleClose={() => setSnackbar({ ...snackbar, open: false })}
            />
        </Grid>
    );
};

export default ProfileMenu;
