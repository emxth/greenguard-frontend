import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Tabs, Tab, Box, Container } from "@mui/material";
import { Home, About, Services, Pickups, Contact } from './PublicPage';
import { Link as ScrollLink } from "react-scroll";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";
import Finance from "./Finance";
import Payment from "./PaymentGateway";

function Navigation() {
    const [value, setValue] = React.useState(0);

    return (
        <AppBar position="static" color="none" elevation={0}>
            <Header />

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

                <Tab label="Finance" component={Link} to="/finance" />
                <Tab label="Payment" component={Link} to="/payment" />
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

                    <Route path="/finance" element={<Finance />} />
                    <Route path="/payment" element={<Payment />} />
                </Routes>
                </Box>
            </Container>
            <Footer />
            <ScrollToTop />
        </Router>
    );
}
