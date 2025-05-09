import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import theme from './theme';

const WelcomeSection = () => {
    return (
        <Box component="section" py={8} mt={7} sx={{ backgroundColor: '#e8f5e9' }}>
            <Box maxWidth="lg" mx="auto" px={2}>
                <Grid container spacing={6} alignItems="center">
                    {/* Image Section */}
                    <Grid item xs={12} lg={6}>
                        <Box position="relative" width="100%">
                            <Box
                                position="relative"
                                zIndex={1}
                                borderRadius={2}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    alt="E-waste recycling"
                                    style={{ width: '100%', height: 'auto', objectFit: 'cover', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                                />
                                <Box sx={{ bgcolor: "green", height: 200, width: 200, borderRadius: 25, zIndex: -1, position: 'absolute', bottom: -20, right: -20, opacity: 0.3 }}></Box>
                            </Box>
                            <Box
                                position="absolute"
                                bottom={-24}
                                right={-24}
                                width={256}
                                height={256}
                                bgcolor="green.200"
                                borderRadius="50%"
                                zIndex={0}
                            />
                        </Box>
                    </Grid>

                    {/* Content Section */}
                    <Grid item xs={12} lg={6}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            gutterBottom
                            sx={{ color: theme.palette.darkgreen.main }}
                        >
                            Welcome to GreenGuard Solutions
                        </Typography>
                        <Box color="text.secondary" sx={{ '& p': { mb: 2 } }}>
                            <Typography variant="body1">
                                At GreenGuard Solutions, we are dedicated to revolutionizing e-waste management through sustainable and innovative solutions. Our mission is to reduce environmental impact by efficiently recycling electronic waste and promoting responsible disposal methods.
                            </Typography>
                            <Typography variant="body1">
                                By integrating cutting-edge technology and eco-friendly practices, we ensure that discarded electronics are repurposed, reducing landfill waste. Our team of experts works tirelessly to extract valuable materials and properly handle hazardous components.
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                Join us in creating a cleaner, greener future by making informed choices about e-waste disposal and embracing sustainability.
                            </Typography>
                        </Box>
                        <Box mt={4}>
                            {/* <Button
                                variant="contained"
                                color='success'
                                sx={{
                                    backgroundColor: 'green.700',
                                    color: 'white',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                }}
                            >
                                Learn More About Us
                            </Button> */}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default WelcomeSection;
