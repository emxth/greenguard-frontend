import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button, Typography, Alert, Divider, Grid, Card, CardContent, Backdrop, CircularProgress } from "@mui/material";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import visa from "./visa-icon.png";
import master from "./master-icon.png";
import { useNavigate } from "react-router-dom";
import AuthContext from "../UserManagement/AuthContext";
import CustomSnackbar from "../components/CustomSnackbar";
import { CheckCircle } from "@mui/icons-material";

const stripePromise = loadStripe("pk_test_51R40PJD3pEFmB7RrWqURrx44nAKMzMcqzKJQ0NZx5yKAK3oSuB7UJZ9S8s1ccFphKDqL9FLJFEVx59uqkE4PgrYD000dSDIarf");

const PaymentForm = ({ pickupRequest }) => {
    const { user } = useContext(AuthContext);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [cardType, setCardType] = useState(null);
    const [savedCards, setSavedCards] = useState([]);
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState("");
    const [loading, setLoading] = useState(false);

    const user_id = user.id;
    const user_email = user.email;
    const amount = pickupRequest?.Capacity * 100 || 350; // dynamic pricing

    // Function to handle card type change
    const handleCardChange = (event) => {
        if (event.complete || event.brand) {
            setCardType(event.brand);
        } else {
            setCardType(null);
        }
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setErrorMessage("Stripe has not loaded yet. Please try again.");
            return;
        }

        try {
            setLoading(true);

            const { data: { customerId } } = await axios.post(`http://localhost:8081/payment/create-customer${user_id}`, {
                user_id,
            });

            const { data: { clientSecret } } = await axios.post("http://localhost:8081/payment/create-setup-intent", {
                user_id,
            });

            const { setupIntent, error: confirmError } = await stripe.confirmCardSetup(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (confirmError) {
                setErrorMessage(confirmError.message);
                return;
            }

            const savedPaymentMethodId = setupIntent.payment_method;

            const cardElement = elements.getElement(CardElement);
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });

            if (error) {
                setErrorMessage(error.message);
                return;
            }

            await axios.post("http://localhost:8081/payment/charge-saved", {
                user_id,
                payment_method_id: paymentMethod.id,
                amount,
            });

            // Send pickup request only after successful payment
            await axios.post("http://localhost:8081/requestPickup/addPickUpRequest", pickupRequest);

            setSuccess(true);
            cardElement.clear();
            setSelectedPaymentMethodId("");
            await fetchSavedCards(); // refresh saved cards after new one is saved

        } catch (err) {
            console.error("Payment error:", err.response?.data || err.message);
            setErrorMessage("Payment failed. Try again.");

        } finally {
            setLoading(false);
        }
    };

    // Function to handle saved card payment
    const handleChargeSavedCard = async () => {
        try {
            setLoading(true);

            const response = await axios.post("http://localhost:8081/payment/charge-saved", {
                user_id,
                payment_method_id: selectedPaymentMethodId,
                amount,
            });

            console.log("Charge success:", response.data);

            await axios.post("http://localhost:8081/requestPickup/addPickUpRequest", pickupRequest);

            await axios.post("http://localhost:8081/payment/send-receipt", {
                email: user_email,
                userId: user_id,
                amount,
                date: new Date(),
                method: cardType || 'Card',
            });

            setSuccess(true);
            setSelectedPaymentMethodId("");
        } catch (err) {
            console.error("Charge failed:", err.response?.data || err.message);
            setErrorMessage("Failed to charge saved card.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch saved cards
    const fetchSavedCards = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:8081/payment/saved-cards/${user_id}`);
            setSavedCards(res.data.paymentMethods.data);
        } catch (err) {
            console.error("Error fetching saved cards:", err);
            setSavedCards([]);
        }
    }, [user_id]);

    // Fetch saved cards when user_id changes
    useEffect(() => {
        if (user_id) fetchSavedCards();
    }, [user_id, fetchSavedCards]);

    // Fetch saved cards on mount
    useEffect(() => {
        async function fetchSavedCards() {
            try {
                const res = await axios.get(`http://localhost:8081/payment/saved-cards/${user_id}`);
                setSavedCards(res.data.paymentMethods.data); // Should be an array
            } catch (err) {
                console.error("Error fetching saved cards:", err);
                setSavedCards([]); // fallback to empty array
            }
        }

        if (user_id) fetchSavedCards();
    }, [user_id]);

    // Show success message and redirect after successful payment
    useEffect(() => {
        if (success) {
            setSnackbar({ open: true, message: "Payment and Pickup request created Successfully! Thank you for your order.", severity: "success" });

            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    }, [success, navigate]);

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

            <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>Payment Information</Typography>
            <Divider />

            <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>Card Number</Typography>
            <Box sx={{ p: 2, bgcolor: "white", borderRadius: 1, boxShadow: 1 }}>
                <CardElement options={{ style: { base: { fontSize: "16px", } } }} onChange={handleCardChange} />
            </Box>

            {/* Load saved cards */}
            {Array.isArray(savedCards) && savedCards.length > 0 ? (
                <>
                    <Typography variant="h6" sx={{ mb: 1, mt: 4 }}>Saved Cards</Typography>
                    <Divider />
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {savedCards.map((method) => {
                            const isSelected = selectedPaymentMethodId === method.id;
                            const brand = method.card.brand.toUpperCase();
                            const last4 = method.card.last4;

                            return (
                                <Grid item xs={12} sm={4} key={method.id}>
                                    <Card
                                        onClick={() => setSelectedPaymentMethodId(method.id)}
                                        sx={{
                                            boxShadow: 2,
                                            borderRadius: 2,
                                            textAlign: "center",
                                            position: "relative",
                                            cursor: "pointer",
                                            border: isSelected ? "2px solid green" : "1px solid #ccc",
                                            "&:hover": { boxShadow: 4 },
                                        }}
                                    >
                                        {isSelected && (
                                            <CheckCircle
                                                sx={{
                                                    color: "green",
                                                    fontSize: 30,
                                                    position: "absolute",
                                                    right: 8,
                                                    top: 8,
                                                }}
                                            />
                                        )}
                                        <CardContent>
                                            <img
                                                src={brand === "VISA" ? visa : master}
                                                alt={brand}
                                                style={{ height: "40px" }}
                                            />
                                            <Typography variant="body1" sx={{ mt: 1, fontWeight: 600 }}>
                                                **** **** **** {last4}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            ) : (
                <>
                </>
            )}

            <Typography variant="h6" sx={{ mb: 1, mt: 4 }}>Your Order</Typography>
            <Divider />

            <Typography variant="h6" sx={{ mt: 2, mb: 3, textAlign: "right", fontWeight: "bold" }}>
                Total Payment: Rs. {amount.toFixed(2)}
            </Typography>

            {/* Button Pay */}
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

            {/* Button to Pay with Saved Card */}
            <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, py: 1.5, fontSize: "16px" }}
                onClick={handleChargeSavedCard}
                disabled={!selectedPaymentMethodId}
            >
                Pay with Saved Card
            </Button>

            {/* Snackbar Notification */}
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                handleClose={() => setSnackbar({ ...snackbar, open: false })}
            />

            {/* MUI Backdrop Loader */}
            <Backdrop open={loading} sx={{ zIndex: 9999, color: "#fff" }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
};

const PaymentPage = ({ pickupRequest }) => (
    <Box sx={{ mt: 5 }}>
        <Elements stripe={stripePromise}>
            <PaymentForm pickupRequest={pickupRequest} />
        </Elements>
    </Box>
);

export default PaymentPage;
