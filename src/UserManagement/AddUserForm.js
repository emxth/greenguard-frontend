import { Button, Grid, TextField, Typography } from "@mui/material";
import theme from "../components/theme";
import { Link } from "react-router-dom";

function UpdateUserForm() {
    return (
        <Grid container spacing={2} sx={{ width: "80%", margin: "auto", p: 3, border: "solid green 0.5px", borderRadius: 4 }}>
            <Grid item xs={12}>
                <Typography mb={3} variant="h5">Edit Profile</Typography>
            </Grid>

            <Grid item xs={6}>
                <TextField
                    required 
                    id="firstName" 
                    label="Your First Name" 
                    fullWidth 
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required 
                    id="lastName" 
                    label="Your Last Name" 
                    fullWidth 
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required 
                    id="email" 
                    label="Your Email" 
                    fullWidth 
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required 
                    id="phone" 
                    label="Your Contact Number" 
                    fullWidth 
                />
            </Grid>
            <Grid item xs={12} mb={2}>
                <TextField
                    required 
                    id="address" 
                    label="Your Address" 
                    fullWidth 
                />
            </Grid>
            <Grid item>
                <Button variant="contained" sx={{ bgcolor: theme.palette.darkgreen.main }}>Save Changes</Button>
            </Grid>
            <Grid item>
                <Button color="success" variant="outlined">Close</Button>
            </Grid>
            <Grid item xs={12}>
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                        console.info("I'm a button.");
                    }}
                >
                    Delete My Account
                </Link>
            </Grid>
        </Grid>
    );
}

export default UpdateUserForm;