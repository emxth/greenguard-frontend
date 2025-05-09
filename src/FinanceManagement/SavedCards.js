import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { Box, Typography, Grid, Card, CardContent, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import visa from "./visa-icon.png";
import master from "./master-icon.png";
import AuthContext from "../UserManagement/AuthContext";
import CustomSnackbar from "../components/CustomSnackbar";

const SavedCards = () => {
    const { user } = useContext(AuthContext);
    const [savedCards, setSavedCards] = useState([]);
    const [snackbar, setSnackbar] = useState({ 
        open: false, 
        message: "", 
        severity: "success" 
    });

    const user_id = user?.id;

    // Memoized fetch function
    const fetchSavedCards = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:8081/payment/saved-cards/${user_id}`);
            setSavedCards(res.data.paymentMethods?.data || []);
        } catch (err) {
            console.error("Failed to fetch saved cards:", err);
            setSavedCards([]);
            setSnackbar({
                open: true,
                message: "Failed to load saved cards",
                severity: "error"
            });
        }
    }, [user_id]);

    // Memoized delete handler
    const handleDeleteCard = useCallback(async (paymentMethodId) => {
        try {
            await axios.delete(`http://localhost:8081/payment/remove-card`, {
                data: { user_id, payment_method_id: paymentMethodId }
            });
            
            setSnackbar({ 
                open: true, 
                message: "Card removed successfully", 
                severity: "success" 
            });
            
            fetchSavedCards(); // Refresh the list
        } catch (err) {
            console.error("Failed to delete card:", err);
            setSnackbar({
                open: true,
                message: err.response?.data?.error || "Failed to remove card",
                severity: "error"
            });
        }
    }, [user_id, fetchSavedCards]);

    useEffect(() => {
        if (user_id) fetchSavedCards();
    }, [user_id, fetchSavedCards]);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" mb={3}>Saved Cards</Typography>

            {savedCards.length === 0 ? (
                <Typography>No saved cards found</Typography>
            ) : (
                <Grid container spacing={2}>
                    {savedCards.map((method) => (
                        <Grid item xs={12} sm={6} md={3} key={method.id}>
                            <Card sx={{ 
                                position: "relative", 
                                p: 1, 
                                ':hover': { boxShadow: 4 } 
                            }}>
                                <IconButton
                                    sx={{ position: "absolute", top: 4, right: 4 }}
                                    onClick={() => handleDeleteCard(method.id)}
                                    aria-label="delete card"
                                >
                                    <Delete color="error" sx={{ 
                                        opacity: 0.3, 
                                        ':hover': { opacity: 1 } 
                                    }} />
                                </IconButton>
                                <CardContent sx={{ textAlign: "center" }}>
                                    <img
                                        src={method.card.brand?.toUpperCase() === "VISA" ? visa : master}
                                        alt={method.card.brand}
                                        style={{ height: 40 }}
                                    />
                                    <Typography variant="body1" sx={{ mt: 1, fontWeight: 600 }}>
                                        **** **** **** {method.card.last4}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                handleClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            />
        </Box>
    );
};

export default SavedCards;