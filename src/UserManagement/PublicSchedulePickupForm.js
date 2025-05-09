import React, { useState } from 'react';
import theme from '../components/theme';
import Payment from "../FinanceManagement/PaymentGateway";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography } from '@mui/material';

export function PickupForm() {
    const [open, setOpen] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [details, setDetails] = useState({ name: "", phone: "", date: "", address: "", message: "" });

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.id]: e.target.value });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = () => {
        setOpen(false); // Close confirmation dialog
        setOpenPayment(true); // Open payment gateway
    };

    return (
        <Container sx={{ bgcolor: theme.palette.darkgreen.main, pb: 2 }}>
            <Typography 
                variant='h4' 
                align='center' 
                fontWeight={'bold'}
                sx={{ 
                    mt: 3, 
                    mb: 2, 
                    pt: 4,
                    color: theme.palette.orange.main, 
                }}
            >
                Schedule Your Pickup
            </Typography>

            <Container>
                {!openPayment ? (
                    <>
                        <Grid container spacing={2} sx={{ width: "80%", margin: "auto", pb: 4 }}>
                            <Grid item xs={12}>
                                <TextField 
                                    required 
                                    id="name" 
                                    label="Your Name Mr/Mrs" 
                                    fullWidth 
                                    onChange={handleChange}
                                    InputProps={{
                                        sx: { backgroundColor: theme.palette.white.main, borderRadius: 1 },
                                    }} 
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    required 
                                    id="phone" 
                                    label="Phone Number" 
                                    fullWidth 
                                    onChange={handleChange} 
                                    InputProps={{
                                        sx: { backgroundColor: theme.palette.white.main, borderRadius: 1 },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    required 
                                    id="date" 
                                    label="Pickup Date" 
                                    fullWidth 
                                    onChange={handleChange} 
                                    InputProps={{
                                        sx: { backgroundColor: theme.palette.white.main, borderRadius: 1 },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField 
                                    required 
                                    id="address" 
                                    label="Pickup Address" 
                                    fullWidth 
                                    onChange={handleChange} 
                                    InputProps={{
                                        sx: { backgroundColor: theme.palette.white.main, borderRadius: 1 },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField 
                                    id="message" 
                                    label="Message" 
                                    fullWidth 
                                    onChange={handleChange} 
                                    InputProps={{
                                        sx: { backgroundColor: theme.palette.white.main, borderRadius: 1 },
                                    }}
                                />
                            </Grid>

                            <Button 
                                variant="contained" 
                                onClick={handleClickOpen} 
                                sx={{ bgcolor: theme.palette.orange.main, m: "auto", mt: 4, p: 1.5, color: theme.palette.text.primary, fontWeight: "bold" }}
                            >
                                Order Pickup
                            </Button>
                        </Grid>

                        {/* Confirm Pickup Dialog */}
                        <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
                            <DialogTitle>Confirm Pickup Details</DialogTitle>

                            <DialogContent>
                                <Typography>Name: {details.name}</Typography>
                                <Typography>Phone: {details.phone}</Typography>
                                <Typography>Pickup Date: {details.date}</Typography>
                                <Typography>Pickup Address: {details.address}</Typography>
                                <Typography>Message: {details.message}</Typography>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={handleClose} sx={{ color: theme.palette.orange.main }}>Cancel</Button>
                                <Button onClick={handleAccept} variant="contained" color="primary" sx={{ bgcolor: theme.palette.darkgreen.main }}>Confirm</Button>
                            </DialogActions>
                        </Dialog>
                    </>
                ) : (
                    /* Payment Gateway Dialog */
                    <Dialog fullScreen open={openPayment} onClose={() => setOpenPayment(false)}>
                        <DialogTitle display={'flex'} justifyContent={'space-between'}>
                            Pickup Request Payment
                            <Button size='small' variant="contained" color='error' onClick={() => setOpenPayment(false)}>Close</Button>

                        </DialogTitle>
                        <Divider variant="middle" color="grey" />

                        <DialogContent>
                            <Payment /> {/* Load Payment Gateway Component */}
                        </DialogContent>
                    </Dialog>
                )}
            </Container>
        </Container>
    );
}
