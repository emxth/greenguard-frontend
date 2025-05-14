import React, { useState, useContext } from "react";
import { AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import AuthContext from "../UserManagement/AuthContext";  // Import AuthContext
import Header from "./Header";

function Navigation() {
    const [value, setValue] = useState(0);
    const { user } = useContext(AuthContext);  // Get user role

    return (
        <AppBar
            position="static" color="inherit" elevation={0}
            sx={{ transition: "0.3s ease-in-out", }}
        >
            <Header />
            <Toolbar sx={{ mr: 3, ml: 3 }}>
                <Tabs
                    textColor="secondary"
                    indicatorColor="secondary"
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                >
                    <Tab label="Home" component={Link} to="/" />
                    <Tab label="Our Services" component={ScrollLink} to="services" smooth duration={300} />
                    <Tab label="About Us" component={ScrollLink} to="about" smooth duration={300} />
                    <Tab label="Schedule Pickups" component={ScrollLink} to="pickups" smooth duration={300} />
                    <Tab label="Contact us" component={ScrollLink} to="contact" smooth duration={300} />
                    
                    {/* Role-based pages */}
                    {user?.role === "finance_manager" && <Tab label="Finance Management" component={Link} to="/finance" />}
                    {user?.role === "admin" && <Tab label="User Management" component={Link} to="/admin" />}
                    {user?.role === "truck_manager" && <Tab label="Truck Management" component={Link} to="/truck" />}
                    {user?.role === "center_manager" && <Tab label="Center Management" component={Link} to="/center" />}
                    {user?.role === "request_manager" && <Tab label="Requests Management" component={Link} to="/CollectManagerDashboard" />}
                </Tabs>
            </Toolbar>
        </AppBar>
    );
}

export default Navigation;
