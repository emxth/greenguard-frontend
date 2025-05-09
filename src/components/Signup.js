import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [step, setStep] = useState(1); // 1: email, 2: otp, 3: full form
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: ""
    });

    const API_BASE_URL = "http://localhost:8081/user";

    // Step 1: Send OTP
    const handleSendOtp = async () => {
        try {
            await axios.post(`${API_BASE_URL}/send-otp`, { email, purpose: "signup" });
            setStep(2);
        } catch (err) {
            alert(err.response?.data?.message || "Error sending OTP");
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOtp = async () => {
        try {
            await axios.post(`${API_BASE_URL}/verify-otp`, { email, otp, purpose: "signup" });
            setVerified(true);
            setStep(3);
        } catch (err) {
            alert(err.response?.data?.message || "Invalid OTP");
        }
    };

    // Step 3: Submit full signup form
    const handleSignup = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/createuser`, { email, ...formData });
            alert("Signup successful. Check your email for confirmation.");
            navigate("/");
        // redirect to login or dashboard
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
            navigate("/");
        }
    };

    return (
        <Grid 
            container 
            component={Paper} 
            elevation={3} 
            sx={{ 
                p: 4, 
                maxWidth: 600, 
                margin: "auto", 
                mt: 8,
            }}
        >
            <Typography variant="h5" mb={3}>
                {step === 1 && "Enter Email"}
                {step === 2 && "Verify OTP"}
                {step === 3 && "Complete Signup"}
            </Typography>

            {step === 1 && (
                <Box width="100%">
                <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    margin="normal"
                />
                <Typography variant="body1" color="text.secondary" my={2}>This will verify your email address with OTP</Typography>
                <Button fullWidth color="success" variant="contained" onClick={handleSendOtp}>
                    Send OTP
                </Button>
                </Box>
            )}

            {step === 2 && (
                <Box width="100%">
                <TextField
                    fullWidth
                    label="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    margin="normal"
                />
                <Button fullWidth color="success" variant="contained" onClick={handleVerifyOtp}>
                    Verify OTP
                </Button>
                </Box>
            )}

            {step === 3 && (
                <form onSubmit={handleSignup} style={{ width: "100%" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField fullWidth label="First Name" name="first_name" onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} required />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField fullWidth label="Last Name" name="last_name" onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} required />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField fullWidth label="Phone Number" name="phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField fullWidth label="Address" name="address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField fullWidth label="Password" type="password" name="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField fullWidth label="Confirm Password" type="password" name="confirmPassword" onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required />
                        </Grid>
                    </Grid>
                    <Button fullWidth color="success" type="submit" variant="contained" sx={{ mt: 3 }}>
                        Complete Signup
                    </Button>
                </form>
            )}
        </Grid>
    );
}
