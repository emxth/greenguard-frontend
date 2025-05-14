import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Home, About, Services, Pickups, Contact } from './pages/PublicPage';
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Finance from "./pages/Finance";
import MyProfile from "./UserManagement/MyProfile";
import PickupRequests from "./Utils/PickupRequests";
import Admin from "./pages/Admin";
import Signup from "./components/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./UserManagement/AuthContext";
import Navigation from "./components/Navigation";

// Truck Management
import AddTrucks from './TruckManagement/AddTrucks.js';
import AddMaintenanceCost from './TruckManagement/AddMaintenanceCost';
import NavBar from './TruckManagement/Components/SideNav';
import ReadAllTrucks from './TruckManagement/ReadAllTrucks';
import ViewOneTruck from './TruckManagement/ViewOneTruck';
import ViewTruckCosts from './TruckManagement/ViewTruckCosts';
import AddFuelCost from "./TruckManagement/AddFuelCost";
import ViewFuelCost from "./TruckManagement/ViewFuelCost";
import TruckDashBoard from "./TruckManagement/TruckDashBoard";
import AllocateTruck from "./TruckManagement/AllocateTruck";
import CalculateMaintainenceCost from "./TruckManagement/CalculateMaintenanceCost";
import EditMaintenanceCost from "./TruckManagement/EditMaintenanceCost.js";
import EditFuelCost from "./TruckManagement/EditFuel.js";

// Collection Request Management
import CreateTruckRequests from "./CollectionRequestManagement/CreateTruckRequest";
import ReadAllTruckRequests from "./CollectionRequestManagement/ReadAllTruckRequets";
import RequestManagerDashboard from "./CollectionRequestManagement/RequestManagerDashboard";
import ViewPickUpRequests from "./CollectionRequestManagement/ViewPickUpRequests";
import CreateSchedule from "./CollectionRequestManagement/CreateSchedule";
import ViewSchedules from "./CollectionRequestManagement/ViewSchedules";
import EditSchedule from "./CollectionRequestManagement/EditSchedule";
import EditTruckRequest from "./CollectionRequestManagement/EditTruckRequest";

// Center Management
import Centers from './CenterManagement/pages/Home';
import CreateRecyclingEntry from './CenterManagement/pages/CreateRecyclingEntry';
import ShowRecyclingEntry from './CenterManagement/pages/ShowRecyclingEntry';
import EditRecyclingEntry from './CenterManagement/pages/EditRecyclingEntry';
import DeleteRecyclingEntry from './CenterManagement/pages/DeleteRecyclingEntry';
import Navbar from './CenterManagement/components/home/Navbar';
import CenterAdmin from './CenterManagement/pages/admin';

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

                            {/* Truck Management */}
                            <Route path="/truck" element={<TruckDashBoard />} />
                            <Route path="/addTruck" element={<AddTrucks />} />
                            <Route path="/EditMaintenanceCost/:costID" element={<EditMaintenanceCost />} />
                            <Route path="/EditFuelCost/:costID" element={<EditFuelCost />} />
                            <Route path="/getAllTruck" element={<ReadAllTrucks />} />
                            <Route path="/truck/:regNum" element={<ViewOneTruck />} />
                            <Route path="/Maintenance/:regNum" element={<AddMaintenanceCost />} />
                            <Route path="/truckCost" element={<ViewTruckCosts />} />
                            <Route path="/allocateTruck/:reqID" element={<AllocateTruck />} />
                            <Route path="/CalculateMaintainenceCost" element={<CalculateMaintainenceCost />} />
                            <Route path="/FuelCost/:regNum" element={<AddFuelCost />} />
                            <Route path="/truckFuelCost" element={<ViewFuelCost />} />

                            {/* Collection Request Manager */}
                            <Route path="/CollectManagerDashboard" element={<RequestManagerDashboard />} />
                            <Route path="/ReadPickups" element={<ViewPickUpRequests />} />
                            <Route path="/CreateTruckRequest/:pickID" element={<CreateTruckRequests />} />
                            <Route path="/ReadAllTruckRequests" element={<ReadAllTruckRequests />} />
                            <Route path="/createSchedule/:truckReqID" element={<CreateSchedule />} />
                            <Route path="/readSchedules" element={<ViewSchedules />} />
                            <Route path="/EditSchedule/:ScheduleID" element={<EditSchedule />} />
                            <Route path="/UpdateTruckRequest/:Trequest_ID" element={<EditTruckRequest />} />

                            {/* Center Management */}
                            <Route path='/center' element={<Centers />} />
                            <Route path='/recycling/create' element={<CreateRecyclingEntry />} />
                            <Route path='/recycling/admin' element={<CenterAdmin />} />
                            <Route path='/recycling/details/:id' element={<ShowRecyclingEntry />} />
                            <Route path='/recycling/edit/:id' element={<EditRecyclingEntry />} />
                            <Route path='/recycling/delete/:id' element={<DeleteRecyclingEntry />} />

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

                            <Route element={<ProtectedRoute roles={["request_manager"]} />}>
                                <Route path="/CollectManagerDashboard" element={<RequestManagerDashboard />} />
                            </Route>

                            <Route element={<ProtectedRoute roles={["center_manager"]} />}>
                                <Route path="/center" element={<Centers />} />
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
