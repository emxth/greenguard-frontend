import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Tabs, Tab, Box, Container, Grid } from "@mui/material";
import logo from './logo.svg';
import { Home, About, Services, Pickups, Contact } from './PublicPage';
import theme from "./theme";
import { Link as ScrollLink } from "react-scroll";
import ScrollToTop from "./ScrollToTop";

function Navigation() {
    const [value, setValue] = React.useState(0);

    return (
        <AppBar position="static" color="none" elevation={0}>
            <Toolbar>
                <Grid container alignItems="center" justifyContent="space-between" sx={{ marginRight: 3, marginLeft: 3, marginTop: 2, }}>
                <Grid item>
                    <img src={logo} alt="My Logo" style={{ height: '100px' }} />
                </Grid>
                <Grid item sx={{ textAlign: "center" }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.darkgreen.main }}>
                        Green Guard Solutions
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.darkgreen.main, }}>
                        The Sustainable E-Waste Management System
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', }}>Contact: +94 456 7890</Typography>
                </Grid>
                </Grid>
            </Toolbar>

            <Toolbar sx={{ marginRight: 3, marginLeft: 3, marginBottom: 2, }}>
                <Tabs 
                    value={value} 
                    onChange={(e, newValue) => setValue(newValue)} 
                    centered
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                <Tab label="Home" component={Link} to="/" />
                <Tab label="Our Services" component={ScrollLink} to="services" smooth={true} duration={500} />
                <Tab label="About Us" component={ScrollLink} to="about" smooth={true} duration={500} />
                <Tab label="Schedule Pickups" component={ScrollLink} to="pickups" smooth={true} duration={500} />
                <Tab label="Contact us" component={ScrollLink} to="contact" smooth={true} duration={500} />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
}

export default function App() {
    return (
        <Router>
            <Navigation />
            <Container>
                <Box my={4}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/pickups" element={<Pickups />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
                </Box>
            </Container>
            <ScrollToTop />
        </Router>
    );
}
