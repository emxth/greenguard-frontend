import React from 'react';
import { Box, Typography, Grid, Paper, Link } from '@mui/material';
import { Recycle, Truck, Boxes, Award } from 'lucide-react';

const services = [
    {
        title: "E-Waste Collection",
        description: "Convenient pickup services for all types of electronic waste from homes and businesses.",
        icon: <Truck size={48} color="#2e7d32" />,
        action: "Schedule Pickup →"
    },
    {
        title: "Responsible Recycling",
        description: "State-of-the-art processing that ensures 100% of materials are properly recycled or disposed of.",
        icon: <Recycle size={48} color="#2e7d32" />,
        // action: "Our Process"
    },
    {
        title: "Bulk Processing",
        description: "Specialized solutions for businesses with large volumes of electronic waste.",
        icon: <Boxes size={48} color="#2e7d32" />,
        // action: "Business Solutions"
    },
    {
        title: "Certified Disposal",
        description: "Fully compliant with environmental regulations and data security standards.",
        icon: <Award size={48} color="#2e7d32" />,
        // action: "Our Certifications"
    }
];

const ServiceCards = () => {
    return (
        <Box component="section" py={8} px={2} mx={10} bgcolor="white">
            <Box maxWidth="lg" mx="auto" textAlign="center" mb={6}>
                <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
                    Our Services
                </Typography>
                <Typography variant="body1" color="text.secondary" maxWidth="600px" mx="auto">
                    At GreenGuard Solutions, we provide comprehensive e-waste management services designed to protect our environment while meeting your needs.
                </Typography>
            </Box>

            <Grid container spacing={4} justifyContent="center">
                {services.map((service, index) => (
                <Grid item xs={12} md={6} lg={3} key={index}>
                    <Paper
                        elevation={3}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            p: 3,
                            transition: 'box-shadow 0.3s ease-in-out',
                            '&:hover': {
                            boxShadow: 6,
                            },
                        }}
                    >
                        <Box display="flex" justifyContent="center" mb={2}>
                            {service.icon}
                        </Box>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="green.800"
                            align="center"
                            gutterBottom
                        >
                            {service.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center" flexGrow={1}>
                            {service.description}
                        </Typography>
                        <Box mt={2} display="flex" justifyContent="center">
                            <Link
                            href="#"
                            underline="hover"
                            sx={{
                                color: 'green.600',
                                fontWeight: 600,
                                '&:hover': {
                                color: 'green.800',
                                },
                            }}
                            >
                            {service.action}
                            </Link>
                        </Box>
                    </Paper>
                </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ServiceCards;
