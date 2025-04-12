import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Typography, Alert, Divider } from "@mui/material";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import visa from "./visa-icon.png";
import master from "./master-icon.png";
import { useNavigate } from "react-router-dom";
import AuthContext from "../utils/AuthContext";
import CustomSnackbar from "../components/CustomSnackbar";

const stripePromise = loadStripe("pk_test_51R40PJD3pEFmB7RrWqURrx44nAKMzMcqzKJQ0NZx5yKAK3oSuB7UJZ9S8s1ccFphKDqL9FLJFEVx59uqkE4PgrYD000dSDIarf");

const PaymentForm = () => {
    const { user } = useContext(AuthContext);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [cardType, setCardType] = useState(null);

    // Dummy user and amount
    const user_id = `${user.id}`;
    const amount = 350;

    console.log("User ID:", user_id);

    const handleCardChange = (event) => {
        if (event.complete || event.brand) {
            setCardType(event.brand);
        } else if (!event.brand) {
            setCardType(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setErrorMessage("Stripe has not loaded yet. Please try again.");
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setErrorMessage("Payment details are missing.");
            return;
        }

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            setErrorMessage(error.message);
            console.error("Stripe Error:", error);
            return;
        }

        // Get last 4 digits and brand
        const last4Digits = paymentMethod?.card?.last4 || "XXXX";
        const cardBrand = paymentMethod?.card?.brand || "Unknown";
        const paymentMethodDescription = `${cardBrand} - **** **** **** ${last4Digits}`;

        // Send payment details to backend
        try {
            const response = await axios.post("http://localhost:8081/payment/create", {
                user_id,
                payment_method: paymentMethodDescription,
                amount,
            });

            console.log("Payment stored successfully:", response.data);
            
            if (paymentMethod) {
                setSuccess(true);
            
                // Reset the form
                elements.getElement(CardElement).clear();
            }
        } catch (err) {
            console.error("Error storing payment:", err.response?.data || err.message);
            setErrorMessage("Failed to process payment. Please try again.");
        }
    };

    useEffect(() => {
        if (success) {
            setSnackbar({ open: true, message: "Payment Successful! Thank you for your order.", severity: "success" });
    
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    }, [success]);

    return (
        <Box sx={{ maxWidth: "40%", mx: "auto", p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#ffffff" }}>
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Payment Successful! Thank you for your order.
                </Alert>
            )}
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            <Typography variant="h6" mb={1}>Card Type</Typography>
            <Divider />
            <img src={visa} alt="Visa" style={{ height: "40px", margin: "10px", opacity: cardType === "visa" ? 1 : 0.3 }} />
            <img src={master} alt="Mastercard" style={{ height: "40px", margin: "10px", opacity: cardType === "mastercard" ? 1 : 0.3 }} />

            <Typography variant="h6" sx={{mb: 1, mt: 2}}>Payment Information</Typography>
            <Divider />
            
            <Typography variant="body1" sx={{mb: 1, mt: 2}}>Card Number</Typography>
            <Box sx={{ p: 2, bgcolor: "white", borderRadius: 1, boxShadow: 1 }}>
                <CardElement options={{ style: { base: { fontSize: "16px", } } }} onChange={handleCardChange} />
            </Box>

            <Typography variant="h6" sx={{mb: 1, mt: 4}}>Your Order</Typography>
            <Divider />
            <Typography variant="h6" sx={{ mt: 2, mb: 3, textAlign: "right", fontWeight: "bold" }}>
                Total Payment: Rs. 350.00
            </Typography>

            <Button
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, py: 1.5, fontSize: "16px" }}
                onClick={handleSubmit}
                disabled={!stripe}
            >
                Pay
            </Button>

            {/* Snackbar Notification */}
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                handleClose={() => setSnackbar({ ...snackbar, open: false })}
            />
        </Box>
    );
};

const PaymentPage = () => (
    <Box sx={{ mt: 5 }}>
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    </Box>
);

export default PaymentPage;
