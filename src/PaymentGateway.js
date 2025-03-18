import React, { useState } from "react";
import theme from './theme';
import { Box, TextField, Button, MenuItem, Typography, Alert } from "@mui/material";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51R40PJD3pEFmB7RrWqURrx44nAKMzMcqzKJQ0NZx5yKAK3oSuB7UJZ9S8s1ccFphKDqL9FLJFEVx59uqkE4PgrYD000dSDIarf");

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    // State for name, email, and success alert
    const [name, setName] = useState("");   // State for name
    const [nameError, setNameError] = useState("");
    const [email, setEmail] = useState(""); // State for email
    const [emailError, setEmailError] = useState("");
    const [success, setSuccess] = useState(false);  // State for success alert

    // Validate email
    const validateEmail = () => {
        if (!email) {
            setEmailError("Email is required");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Invalid email format");
        } else {
            setEmailError('');
        }
    };

    // Validate card name
    const validateName = () => {
        if (!name) {
            setNameError("Name is required");
        } else if (name.length < 3) {
            setNameError("Name must be at least 3 characters");
        } else if (!/^[A-Za-z\s]+$/.test(name)) {
            setNameError("Name can only contain letters and spaces");
        } else {
            setNameError("");
        }
    };

    // Handle Form Submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        validateName();
        validateEmail();

        if (nameError || emailError || !name || !email) return; // Prevent submission if errors exist

        if (!stripe || !elements) return;
        
        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.error(error);
        } else {
            console.log("Payment Method Created:", paymentMethod);
            setSuccess(true); // Show success alert
            setTimeout(() => setSuccess(false), 3000); // Hide after 3 sec
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#ffffff" }}>
            {/* Success Message */}
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Payment Successful! Thank you for your order.
                </Alert>
            )}

            <Typography variant="h6">Email</Typography>
            <TextField
                fullWidth
                variant="outlined"
                margin="dense"
                placeholder="test@example.com"
                type="email"
                required
                error={!!emailError}
                helperText={emailError}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
            />
            
            <Typography variant="h6" sx={{mb: 1, mt: 1}}>Card Information</Typography>
            <Box sx={{ p: 2, bgcolor: "white", borderRadius: 1, boxShadow: 1 }}>
                <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
            </Box>
            
            <Typography variant="h6" sx={{ mt: 2 }}>Name on Card</Typography>
            <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="dense"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={validateName}
                    error={!!nameError}
                    helperText={nameError}
                />
            
            <Typography variant="h6" sx={{ mt: 2 }}>Country or Region</Typography>
            <TextField select fullWidth variant="outlined" margin="dense" defaultValue="Sri Lanka">
                <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                <MenuItem value="United States">United States</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="United Kingdom">United Kingdom</MenuItem>
            </TextField>

            <Typography variant="h6" sx={{ mt: 2, textAlign: "right", fontWeight: "bold", color: theme.palette.black.main }}>Rs. 350.00</Typography>
            
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, py: 1.5, fontSize: "16px", bgcolor: theme.palette.darkgreen.main }}
                onClick={handleSubmit}
                disabled={!stripe}
            >
                Pay
            </Button>
        </Box>
    );
};

const PaymentPage = () => (
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
);

export default PaymentPage;
