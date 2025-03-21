import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Tabs, Tab, Box, Container } from "@mui/material";
import { Home, About, Services, Pickups, Contact } from './pages/PublicPage';
import { Link as ScrollLink } from "react-scroll";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Finance from "./pages/Finance";
import PublicProfile from "./pages/PublicProfile";
import PickupRequests from "./pages/PickupRequests";
import Admin from "./pages/Admin";
// import Payment from "./utils/PaymentGateway";


// import AddTrucks from './TruckManagement/AddTrucks';
// import AddMaintenanceCost from './TruckManagement/AddMaintenanceCost';
// import NavBar from './TruckManagement/Components/SideNav';
// import ReadAllTrucks from './TruckManagement/ReadAllTrucks';
// import ViewOneTruck from './TruckManagement/ViewOneTruck';
// import ViewTruckCosts from './TruckManagement/ViewTruckCosts';
// import AddFuelCost from "./TruckManagement/AddFuelCost";
// import ViewFuelCost from "./TruckManagement/ViewFuelCost";
// import TruckDashBoard from "./TruckManagement/TruckDashBoard";


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
                <Tab label="Our Services" component={ScrollLink} to="services" smooth={true} duration={300} />
                <Tab label="About Us" component={ScrollLink} to="about" smooth={true} duration={300} />
                <Tab label="Schedule Pickups" component={ScrollLink} to="pickups" smooth={true} duration={300} />
                <Tab label="Contact us" component={ScrollLink} to="contact" smooth={true} duration={300} />

                <Tab label="Finance" component={Link} to="/finance" />
                <Tab label="Admin" component={Link} to="/admin" />
                {/* <Tab label="Payment" component={Link} to="/payment" /> */}
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
                    <Route path="/publicprofile" element={<PublicProfile />} />
                    <Route path="/publicpickuprequest" element={<PickupRequests />} />

                    <Route path="/finance" element={<Finance />} />
                    <Route path="/admin" element={<Admin />} />
                    {/* <Route path="/payment" element={<Payment />} /> */}
                </Routes>
                </Box>
            </Container>
            <Footer />
            <ScrollToTop />
        </Router>
    );
}
