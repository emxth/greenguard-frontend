import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { Home, About, Services, Pickups, Contact } from './pages/PublicPage';
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Finance from "./pages/Finance";
import PublicProfile from "./pages/PublicProfile";
import PickupRequests from "./pages/PickupRequests";
import Admin from "./pages/Admin";
import Signup from "./components/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./utils/AuthContext";
import Navigation from "./components/Navigation";

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

// function Navigation() {
//     const [value, setValue] = React.useState(0);
//     const [isSticky, setIsSticky] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//           const offset = window.scrollY;
//           if (offset > 200) { // Change 100 to whatever scroll position you want
//             setIsSticky(true);
//           } else {
//             setIsSticky(false);
//           }
//         };
    
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//       }, []);

//     return (
//         <AppBar 
//             position={isSticky ? "fixed" : "static"} 
//             color="inherit" 
//             elevation={isSticky ? 4 : 0} // Add shadow when sticky
//             sx={{
//                 transition: "0.3s ease-in-out",
//                 top: 0,
//                 zIndex: 1100,
//             }}
//         >
//             <Header />

//             <Toolbar sx={{ mr: 3, ml: 3, }}>
//                 <Tabs 
//                     textColor="secondary" 
//                     indicatorColor="secondary" 
//                     value={value} 
//                     onChange={(e, newValue) => setValue(newValue)}
//                 >
//                 <Tab label="Home" component={Link} to="/" />
//                 <Tab label="Our Services" component={ScrollLink} to="services" smooth={true} duration={300} />
//                 <Tab label="About Us" component={ScrollLink} to="about" smooth={true} duration={300} />
//                 <Tab label="Schedule Pickups" component={ScrollLink} to="pickups" smooth={true} duration={300} />
//                 <Tab label="Contact us" component={ScrollLink} to="contact" smooth={true} duration={300} />

//                 <Tab label="Finance" component={Link} to="/finance" />
//                 <Tab label="Admin" component={Link} to="/admin" />
//                 <Tab label="Signup" component={Link} to="/signup" />
//                 {/* <Tab label="Payment" component={Link} to="/payment" /> */}
//                 </Tabs>
//             </Toolbar>
//         </AppBar>
//     );
// }

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navigation />
                <Container>
                    <Box my={4}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/pickups" element={<Pickups />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/publicprofile" element={<PublicProfile />} />
                            <Route path="/publicpickuprequest" element={<PickupRequests />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />

                            {/* Protected Routes */}
                            <Route element={<ProtectedRoute roles={["finance_manager"]} />}>
                                <Route path="/finance" element={<Finance />} />
                            </Route>

                            <Route element={<ProtectedRoute roles={["admin"]} />}>
                                <Route path="/admin" element={<Admin />} />
                            </Route>
                        </Routes>
                    </Box>
                </Container>
                <Footer />
                <ScrollToTop />
            </AuthProvider>
        </Router>
    );
}

export default App;
