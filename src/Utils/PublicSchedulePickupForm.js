import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Grid, TextField, Typography, MenuItem, Box, Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';
import axios from 'axios';
import theme from '../components/theme';
import AuthContext from '../UserManagement/AuthContext';
import PaymentPage from '../FinanceManagement/PaymentGateway';

export function PickupForm() {
    const [pickUpID, setPickUp_ID] = useState("");
    const [Username, setName] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [wasteType, setWasteType] = useState("");
    const [capacity, setCapacity] = useState("");
    const [phone, setPhone] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("Sri Lanka");
    const [pickUpStatus, setStatus] = useState("Pending");
    const [showPaymentGateway, setShowPaymentGateway] = useState(false);
    const [pickupRequest, setPickupRequest] = useState(null);

    const [errors, setErrors] = useState({});
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get("http://localhost:8081/requestPickup/latestPickupID")
            .then(response => {
                setPickUp_ID(response.data.newPickUpID);
            })
            .catch(error => {
                console.error("Error fetching latest Pickup ID:", error);
            });
    }, []);

    const validateField = (field, value) => {
        let newErrors = { ...errors };

        switch (field) {
            case "name":
                newErrors.name = /^[A-Za-z ]+$/.test(value) ? "" : "Name must contain only letters and spaces.";
                break;
            case "phone":
                newErrors.phone = /^\d{10}$/.test(value) ? "" : "Phone number must be exactly 10 digits.";
                break;
            case "capacity":
                newErrors.capacity = /^\d+$/.test(value) ? "" : "Capacity must be a numeric value (kg).";
                break;
            case "pickupDate":
                const today = new Date();
                const selectedDate = new Date(value);
                newErrors.pickupDate = value && selectedDate > today ? "" : "Pickup date must be in the future.";
                break;
            case "wasteType":
                newErrors.wasteType = value ? "" : "Please select a waste type.";
                break;
            case "streetAddress":
                newErrors.streetAddress = /^[A-Za-z0-9\s,.\-]{5,}$/.test(value) ? "" : "Address must be at least 5 characters and include only valid characters.";
                break;
            case "city":
                newErrors.city = /^[A-Za-z\s]+$/.test(value) ? "" : "City must contain only letters and spaces.";
                break;
            case "country":
                newErrors.country = value === "Sri Lanka" ? "" : "Country must be Sri Lanka.";
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const sendData = async (e) => {
        e.preventDefault();

        // Validate all fields
        ["name", "phone", "capacity", "pickupDate", "wasteType", "streetAddress", "city", "country"].forEach(field => {
            const value = {
                name: Username,
                phone,
                capacity,
                pickupDate,
                wasteType,
                streetAddress,
                city,
                country
            }[field];
            validateField(field, value);
        });

        const isValid = Object.values(errors).every((error) => error === "");
        if (!isValid) {
            alert("Please fix the errors before submitting.");
            return;
        }

        const fullAddress = `${streetAddress}, ${city}, ${country}`;

        const newPickUpRequest = {
            PickUp_ID: pickUpID,
            UserID: user.id,
            Name: Username,
            PickupDate: pickupDate,
            wasteType: wasteType,
            Capacity: capacity,
            PickupLocation: fullAddress,
            Phone: phone,
            Status: pickUpStatus
        };

        setPickupRequest(newPickUpRequest);
        setShowPaymentGateway(true);

        // axios.post("http://localhost:8081/requestPickup/addPickUpRequest", newPickUpRequest)
        //     .then(() => {
        //         alert("Pickup request Created");
        //         // Reset form state
        //         setName("");
        //         setPhone("");
        //         setCapacity("");
        //         setPickupDate("");
        //         setWasteType("");
        //         setStreetAddress("");
        //         setCity("");
        //         setCountry("");
        //         // Clear validation errors
        //         setErrors({});
        //         navigate("/");
        //     })
        //     .catch((err) => {
        //         alert(err);
        //     });
    };

    return (
        <>
            {!user ? (
                <Container
                    maxWidth="md"
                    sx={{
                        bgcolor: theme.palette.darkgreen.main,
                        textAlign: 'center',
                        py: 6,
                        px: 4,
                        borderRadius: 4,
                        boxShadow: 3,
                        my: 4,
                        mt: 7,
                    }}
                >
                    <Typography variant="h6" sx={{ color: "white", }}>
                        Login to add pickup request
                    </Typography>
                </Container>
            ) : (
                <Container
                    maxWidth="md"
                    sx={{
                        bgcolor: theme.palette.darkgreen.main,
                        py: 6,
                        px: 4,
                        borderRadius: 4,
                        boxShadow: 3,
                        my: 4,
                        mt: 7,
                    }}
                >
                    <Box
                        sx={{
                            textAlign: 'center',
                            mb: 4,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                display: 'block',
                                width: '80px',
                                height: '4px',
                                bgcolor: theme.palette.orange.main,
                                mx: 'auto',
                                mt: 2,
                                borderRadius: 2
                            }
                        }}
                    >
                        <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{
                                color: theme.palette.orange.main,
                                letterSpacing: 1,
                                mb: 1
                            }}
                        >
                            Schedule Your Pickup
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'rgba(255,255,255,0.8)',
                                fontWeight: 500
                            }}
                        >
                            We'll collect your e-waste responsibly
                        </Typography>
                    </Box>

                    <form onSubmit={sendData}>
                        <Grid
                            container
                            spacing={3}
                            sx={{
                                width: "100%",
                                maxWidth: 800,
                                margin: "auto",
                                px: { xs: 0, sm: 2 }
                            }}
                        >
                            {/* Name Field */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={Username}
                                    onChange={(e) => { setName(e.target.value); validateField("name", e.target.value); }}
                                    label="Your Name Mr/Mrs"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    variant="filled"
                                    color='warning'
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: '#f5fff5',
                                            borderRadius: 2
                                        },
                                        '& .MuiInputHover-root': {
                                            backgroundColor: '#f5fff5',
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: theme.palette.orange.main,
                                            fontWeight: 600,
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Phone & Capacity */}
                            {/* Phone Field */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value); validateField("phone", e.target.value); }}
                                    label="Phone Number"
                                    fullWidth
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                    placeholder="e.g., 0771234567"
                                    variant="filled"
                                    color='warning'
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: '#f5fff5',
                                            borderRadius: 2
                                        },
                                        '& .MuiInputHover-root': {
                                            backgroundColor: '#f5fff5',
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: theme.palette.orange.main,
                                            fontWeight: 600,
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Capacity Field */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={capacity}
                                    onChange={(e) => { setCapacity(e.target.value); validateField("capacity", e.target.value); }}
                                    label="Capacity (Kg)"
                                    fullWidth
                                    error={!!errors.capacity}
                                    helperText={errors.capacity}
                                    placeholder="e.g., 25"
                                    variant="filled"
                                    color='warning'
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: '#f5fff5',
                                            borderRadius: 2
                                        },
                                        '& .MuiInputHover-root': {
                                            backgroundColor: '#f5fff5',
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: theme.palette.orange.main,
                                            fontWeight: 600,
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Date & Waste Type */}
                            {/* Date Field */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={pickupDate}
                                    onChange={(e) => { setPickupDate(e.target.value); validateField("pickupDate", e.target.value); }}
                                    label="Pickup Date"
                                    type="date"
                                    fullWidth
                                    error={!!errors.pickupDate}
                                    helperText={errors.pickupDate}
                                    variant="filled"
                                    color='warning'
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: '#f5fff5',
                                            borderRadius: 2
                                        },
                                        '& .MuiInputHover-root': {
                                            backgroundColor: '#f5fff5',
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                        sx: {
                                            color: theme.palette.orange.main,
                                            fontWeight: 600,
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Waste Type */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    required
                                    value={wasteType}
                                    onChange={(e) => { setWasteType(e.target.value); validateField("wasteType", e.target.value); }}
                                    label="Waste Type"
                                    fullWidth
                                    error={!!errors.wasteType}
                                    helperText={errors.wasteType}
                                    variant="filled"
                                    color='warning'
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: '#f5fff5',
                                            borderRadius: 2
                                        },
                                        '& .MuiInputHover-root': {
                                            backgroundColor: '#f5fff5',
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: theme.palette.orange.main,
                                            fontWeight: 600,
                                        },
                                    }}
                                >
                                    {['Personal Devices', 'Household Appliances', 'Computer Accessories',
                                        'Communication Equipment', 'Batteries & Lighting',
                                        'Industrial & Office', 'Other'].map((option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 152, 0, 0.1)'
                                                    }
                                                }}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>

                            {/* Street Address Field */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    value={streetAddress}
                                    onChange={(e) => { setStreetAddress(e.target.value); validateField("streetAddress", e.target.value); }}
                                    label="Street Address"
                                    placeholder="e.g., No. 45, Galle Road"
                                    fullWidth
                                    error={!!errors.streetAddress}
                                    helperText={errors.streetAddress || "Include house number and street name"}
                                    variant="filled"
                                    color='warning'
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: '#f5fff5',
                                            borderRadius: 2
                                        },
                                        '& .MuiInputHover-root': {
                                            backgroundColor: '#f5fff5',
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: theme.palette.orange.main,
                                            fontWeight: 600,
                                        },
                                    }}
                                />
                            </Grid>

                            {/* City and Country Fields */}
                            {/* City Fields */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={city}
                                    onChange={(e) => { setCity(e.target.value); validateField("city", e.target.value); }}
                                    label="City/Town"
                                    placeholder="e.g., Colombo"
                                    fullWidth
                                    error={!!errors.city}
                                    helperText={errors.city || "Enter your city or town name"}
                                    variant="filled"
                                    color='warning'
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: '#f5fff5',
                                            borderRadius: 2
                                        },
                                        '& .MuiInputHover-root': {
                                            backgroundColor: '#f5fff5',
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: theme.palette.orange.main,
                                            fontWeight: 600,
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Country Field */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    value={country}
                                    onChange={(e) => { setCountry(e.target.value); validateField("country", e.target.value); }}
                                    label="Country"
                                    placeholder="e.g., Sri Lanka"
                                    fullWidth
                                    error={!!errors.country}
                                    helperText={errors.country || "Country must be Sri Lanka"}
                                    variant="filled"
                                    color='warning'
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: '#f5fff5',
                                            borderRadius: 2
                                        },
                                        '& .MuiInputHover-root': {
                                            backgroundColor: '#f5fff5',
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            color: theme.palette.orange.main,
                                            fontWeight: 600,
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Order Pickup Button */}
                            <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        bgcolor: theme.palette.orange.main,
                                        color: 'white',
                                        px: 6,
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        boxShadow: 2,
                                        '&:hover': {
                                            bgcolor: '#e65100',
                                            boxShadow: 4
                                        }
                                    }}
                                >
                                    Order Pickup
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                    {showPaymentGateway && (
                        <Dialog fullScreen open={showPaymentGateway} onClose={() => setShowPaymentGateway(false)}>
                            <DialogTitle display="flex" justifyContent="space-between">
                                Pickup Request Payment
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="error"
                                    onClick={() => setShowPaymentGateway(false)}
                                >
                                    Close
                                </Button>
                            </DialogTitle>
                            <Divider variant="middle" color="grey" />
                            <DialogContent>
                                <PaymentPage pickupRequest={pickupRequest} />
                            </DialogContent>
                        </Dialog>
                    )}
                </Container>
            )}
        </>
    );
}
