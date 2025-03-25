import React, { useContext } from "react";
import { Toolbar, Typography, Grid, Button } from "@mui/material";
import logo from '../logo.svg';
import theme from "./theme";
import ProfileMenu from "./ProfileMenuIcon";
import { useNavigate } from "react-router-dom";
import AuthContext from "../utils/AuthContext";

function Header() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    return (
        <Toolbar>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ mr: 3, ml: 3, }}>
                <Grid item>
                    <img src={logo} alt="My Logo" style={{ height: '100px' }} />
                </Grid>
                <Grid item sx={{ textAlign: "center" }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.darkgreen.main }}>
                        Green Guard Solutions
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.darkgreen.main, }}>
                        The Sustainable E-Waste Management System
                    </Typography>
                </Grid>
                <Grid item display={"flex"} flexDirection={"row"} alignItems={"center"}>
                    {!user && (  // Show login button only if user is NOT logged in
                        <Button 
                            variant="contained" 
                            sx={{ height: '35px', mr: '5px', bgcolor: theme.palette.darkgreen.main }}
                            onClick={() => navigate("/login")}
                        >
                            LOGIN
                        </Button>
                    )}
                    <ProfileMenu />
                </Grid>
            </Grid>
        </Toolbar>
    );
}

export default Header;