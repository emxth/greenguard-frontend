import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Grid, Paper, Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [step, setStep] = useState(1); // 1: email, 2: otp, 3: full form
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: ""
    });

    const API_BASE_URL = "http://localhost:8081/user";
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Validate form fields
    useEffect(() => {
        const errors = {};

        // First Name - required and only letters/spaces
        if (!formData.first_name.trim()) {
            errors.first_name = 'First name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.first_name)) {
            errors.first_name = 'Only letters and spaces allowed';
        }

        // Last Name - required and only letters/spaces
        if (!formData.last_name.trim()) {
            errors.last_name = 'Last name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.last_name)) {
            errors.last_name = 'Only letters and spaces allowed';
        }

        // Phone - required and exactly 10 digits
        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Enter a valid 10-digit number';
        }

        // Address - required
        if (!formData.address.trim()) {
            errors.address = 'Address is required';
        }

        // Password - required and minimum 6 characters
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        // Confirm Password - must match
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setFormErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    }, [formData]);

    // Step 1: Send OTP
    const handleSendOtp = async () => {
        try {
            setLoading(true);
            await axios.post(`${API_BASE_URL}/send-otp`, { email, purpose: "signup" });
            setStep(2);
        } catch (err) {
            alert(err.response?.data?.message || "Error sending OTP");
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOtp = async () => {
        try {
            setLoading(true);
            await axios.post(`${API_BASE_URL}/verify-otp`, { email, otp, purpose: "signup" });
            setVerified(true);
            setStep(3);
        } catch (err) {
            alert(err.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Submit full signup form
    const handleSignup = async (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("Please correct the form errors before submitting.");
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${API_BASE_URL}/createuser`, { email, ...formData });
            alert("Signup successful. Please login.");
            navigate("/");
            // redirect to login or dashboard
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
            navigate("/");
        } finally {
            setLoading(false);
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
                        required
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        margin="normal"
                        color="success"
                    />
                    <Typography variant="body1" color="text.secondary" my={2}>This will verify your email address with OTP</Typography>
                    <Button
                        fullWidth
                        color="success"
                        variant="contained"
                        onClick={handleSendOtp}
                        disabled={!email.trim()}
                    >
                        Send OTP
                    </Button>
                </Box>
            )}

            {step === 2 && (
                <Box width="100%">
                    <TextField
                        fullWidth
                        required
                        label="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        type="text"
                        margin="normal"
                    />
                    <Button
                        fullWidth
                        color="success"
                        variant="contained"
                        onClick={handleVerifyOtp}
                        disabled={!otp.trim()}
                    >
                        Verify OTP
                    </Button>
                </Box>
            )}

            {step === 3 && (
                <form onSubmit={handleSignup} style={{ width: "100%" }}>
                    <Grid container spacing={2}>
                        {/* First name field */}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                color="success"
                                label="First Name"
                                name="first_name"
                                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                error={!!formErrors.first_name}
                                helperText={formErrors.first_name}
                                required />
                        </Grid>

                        {/* Last name field */}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                color="success"
                                label="Last Name"
                                name="last_name"
                                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                error={!!formErrors.last_name}
                                helperText={formErrors.last_name}
                                required />
                        </Grid>

                        {/* Phone number field */}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                color="success"
                                label="Phone Number"
                                name="phone"
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                error={!!formErrors.phone}
                                helperText={formErrors.phone}
                                required />
                        </Grid>

                        {/* Address field */}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                color="success"
                                label="Address"
                                name="address"
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                error={!!formErrors.address}
                                helperText={formErrors.address}
                                required />
                        </Grid>

                        {/* Password field */}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                color="success"
                                label="Password"
                                type="password"
                                name="password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                error={!!formErrors.password}
                                helperText={formErrors.password}
                                required />
                        </Grid>

                        {/* Confirm Password field */}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                color="success"
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                error={!!formErrors.confirmPassword}
                                helperText={formErrors.confirmPassword}
                                required />
                        </Grid>
                    </Grid>

                    {/* Signup Button */}
                    <Button
                        fullWidth
                        color="success"
                        type="submit"
                        variant="contained"
                        disabled={!isFormValid}
                        sx={{ mt: 3 }}
                    >
                        Complete Signup
                    </Button>
                </form>
            )}

            {/* MUI Backdrop Loader */}
            <Backdrop open={loading} sx={{ zIndex: 9999, color: "#fff" }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    );
}
