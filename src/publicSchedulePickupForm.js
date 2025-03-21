import React from 'react';
import theme from './theme';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

export function PickupForm() {
    return (
        <Container sx={{ bgcolor: theme.palette.darkgreen.main, pb: 4, }}>
            <Typography 
                variant='h4' 
                align='center' 
                fontWeight={'bold'}
                sx={{ 
                    mt: 3, 
                    mb: 2, 
                    pt: 4,
                    color: theme.palette.orange.main, }}
            >
                Schedule Your Pickup
            </Typography>

            <Grid container spacing={2} sx={{ width: "80%", margin: "auto", pb: 4, }}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="name"
                        label="Your Name Mr/Mrs"
                        fullWidth
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
                        InputProps={{
                            sx: { backgroundColor: theme.palette.white.main, borderRadius: 1 },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="E-wasteType"
                        label="E-waste Type"
                        fullWidth
                        InputProps={{
                            sx: { backgroundColor: theme.palette.white.main, borderRadius: 1 },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="Capacity"
                        label="Capacity"
                        fullWidth
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
                        InputProps={{
                            sx: { backgroundColor: theme.palette.white.main, borderRadius: 1, mb: 4, },
                        }}
                    />
                </Grid>

                <Button variant="contained" sx={{ bgcolor: theme.palette.orange.main, m: 'auto', }}>Order Pickup</Button>
            </Grid>
        </Container>
    );
}