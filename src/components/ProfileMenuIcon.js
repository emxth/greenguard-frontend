import React, { useState } from "react";
import { Avatar, Divider, Grid, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

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
                <MenuItem onClick={() => navigate("/publicprofile")}>
                    Profile Info
                </MenuItem>
                <MenuItem onClick={() => navigate("/publicpickuprequest")}>
                    My Pickup Requests
                </MenuItem>
                <Divider variant="middle" color={'#000000'} />
                <MenuItem onClick={() => console.log("Logout")}>
                    Logout
                </MenuItem>
            </Menu>
        </Grid>
    );
};

export default ProfileMenu;
