import React from 'react';
import { Box } from '@mui/material';
import { PickupForm } from '../utils/PublicSchedulePickupForm';
import { Element } from 'react-scroll';
import HeroSection from '../components/HeroSection';
import ServiceCards from '../components/ServiceCards';
import WelcomeSection from '../components/WelcomeSection';

// Home component
export function Home() {
    return (
        <Box>
            <HeroSection />
            <Services />
            <About />
            <Pickups />
            <Contact />

        </Box>
    );
}

// Services component
export function Services() {
    return (
        <Element name="services">
            <ServiceCards />
        </Element>
    );
}

// About component
export function About() {
    return(
        <Element name="about">
            <WelcomeSection />
        </Element>
    );
}

// Pickups component
export function Pickups() {
    return (
        <Element name='pickups'>
            <PickupForm />
        </Element>
    );
}

// Contact component
export function Contact() {
    return (
        <Element name='contact'></Element>
    );
}

