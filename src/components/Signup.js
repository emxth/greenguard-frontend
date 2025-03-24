import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Box, Paper, Divider, } from "@mui/material";
import theme from "./theme";
import image from "../image/signupImage.jpeg"
import { Link } from "react-router-dom";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signup Data:", formData);
    };

    return (
        <Grid container component={Paper} elevation={3} sx={{ height: "80vh" }}>
            <Grid item xs={12} md={5} sx={{ display: "flex", alignItems: "center", justifyContent: "left", }}>
                <Box
                    component="img"
                    src={image}
                    alt="Signup"
                    sx={{ height: "100%", borderRadius: 1 }}
                />
            </Grid>

            <Grid item xs={12} md={7} sx={{ p: 4, m: "auto", display: "flex", flexDirection: "column", justifyContent: "center", }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: theme.palette.darkgreen.main, }}>
                    Welcome to Green Guard 
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ mb: 2, }}>
                    Nature is the best friend of human. So, Everyone should be responsible for protect the nature.
                </Typography>
                <Divider sx={{ bgcolor: theme.palette.darkgreen.main, borderBottomWidth: 5, width: "20%", mb: 3 }} />

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="standard"
                                margin="dense"
                                label="First Name"
                                name="first_name"
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="standard"
                                margin="dense"
                                label="Last Name"
                                name="last_name"
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="standard"
                                margin="dense"
                                label="Email"
                                type="email"
                                name="email"
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            fullWidth
                            variant="standard"
                            margin="dense"
                            label="Contact Number"
                            type="tel"
                            name="phone"
                            onChange={handleChange}
                            required
                        />
                        </Grid>
                    </Grid>
                    <TextField
                        fullWidth
                        variant="standard"
                        margin="dense"
                        label="Address"
                        name="address"
                        onChange={handleChange}
                        required
                    />
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="standard"
                                margin="dense"
                                label="Password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant="standard"
                                margin="dense"
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        fullWidth
                        sx={{ mt: 6 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container spacing={1} sx={{ m: "auto", }}>
                        <Grid item>
                            <Typography variant="body1" gutterBottom align="center" sx={{ mb: 3, }}>
                                Already signed up? 
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Link
                                component="button"
                                variant="body1"
                                onClick={() => {
                                    console.info("I'm a button.");
                                }}
                            >
                                Log In
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}
