import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Home, About, Services, Pickups, Contact } from './pages/PublicPage';
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Finance from "./pages/Finance";
import MyProfile from "./UserManagement/MyProfile";
import PickupRequests from "./pages/PickupRequests";
import Admin from "./pages/Admin";
import Signup from "./components/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./UserManagement/AuthContext";
import Navigation from "./components/Navigation";

import AddTrucks from './TruckManagement/AddTrucks';
import AddMaintenanceCost from './TruckManagement/AddMaintenanceCost';
import ReadAllTrucks from './TruckManagement/ReadAllTrucks';
import ViewOneTruck from './TruckManagement/ViewOneTruck';
import ViewTruckCosts from './TruckManagement/ViewTruckCosts';
import AddFuelCost from "./TruckManagement/AddFuelCost";
import ViewFuelCost from "./TruckManagement/ViewFuelCost";
import TruckDashBoard from "./TruckManagement/TruckDashBoard";
import AllocateTruck from "./TruckManagement/AllocateTruck";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navigation />
                <Box>
                    <Box my={4}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/pickups" element={<Pickups />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/profile" element={<MyProfile />} />
                            <Route path="/publicpickuprequest" element={<PickupRequests />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                              
                            <Route path="/truck" element={<TruckDashBoard />} />
                            <Route path="/addTruck" element={<AddTrucks />} />
                            <Route path="/getAllTruck" element={<ReadAllTrucks />} />
                            <Route path="/truck/:regNum" element={<ViewOneTruck />} />
                            <Route path="/Maintenance/:regNum" element={<AddMaintenanceCost />} />
                            <Route path="/truckCost" element={<ViewTruckCosts />} />
                            <Route path="/allocateTruck/:reqID" element={<AllocateTruck />} />
                            <Route path="/FuelCost/:regNum" element={<AddFuelCost />} />
                            <Route path="/truckFuelCost" element={<ViewFuelCost />} />

                            {/* Protected Routes */}
                            <Route element={<ProtectedRoute roles={["finance_manager"]} />}>
                                <Route path="/finance" element={<Finance />} />
                            </Route>

                            <Route element={<ProtectedRoute roles={["admin"]} />}>
                                <Route path="/admin" element={<Admin />} />
                            </Route>

                            <Route element={<ProtectedRoute roles={["truck_manager"]} />}>
                                <Route path="/truck" element={<TruckDashBoard />} />
                            </Route>

                            {/* <Route element={<ProtectedRoute roles={["truck_manager"]} />}>
                                <Route path="/truck" element={<Admin />} />
                            </Route>

                            <Route element={<ProtectedRoute roles={["truck_manager"]} />}>
                                <Route path="/truck" element={<Admin />} />
                            </Route> */}
                        </Routes>
                    </Box>
                </Box>
                <Footer />
                <ScrollToTop />
            </AuthProvider>
        </Router>
    );
}

export default App;
