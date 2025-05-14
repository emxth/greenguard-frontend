import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

const HeroSection = () => {
    return (
        <Box
            position="relative"
            height={{ xs: 500, lg: 600 }}
            width="100%"
            overflow="hidden"
        >
            {/* Background Image */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                sx={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'brightness(0.5)',
                }}
            />

            {/* Content */}
            <Box
                position="relative"
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                px={2}
                textAlign="center"
                zIndex={1}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    fontWeight="bold"
                    mb={2}
                    sx={{
                        color: 'white',
                        fontSize: {
                            xs: '2rem',
                            md: '3rem',
                            lg: '4rem',
                        },
                        maxWidth: '900px',
                    }}
                >
                    Responsible E-Waste Management for a Greener Tomorrow
                </Typography>
                <Typography
                    variant="h6"
                    color="gray.100"
                    mb={4}
                    sx={{ maxWidth: '700px', color: '#f3f4f6' }}
                >
                    Transforming electronic waste into sustainable resources through innovative recycling solutions
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    {/* <Button variant="contained" color='success' sx={{ px: 4, py: 2, fontSize: '1.125rem', }}>
                        Schedule a Pickup
                    </Button> */}
                    {/* <Button
                variant="outlined"
                color='success'
                sx={{
                    borderColor: '#fff',
                    color: '#fff',
                    backgroundColor: 'transparent',
                    px: 4,
                    py: 2,
                    fontSize: '1.125rem',
                    '&:hover': {
                        backgroundColor: '#fff',
                        color: '#2e7d32',
                    },
                }}
            >
                Learn More
            </Button> */}
                </Stack>
            </Box>
        </Box>
    );
};

export default HeroSection;
