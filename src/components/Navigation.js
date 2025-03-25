import React, { useState, useEffect, useContext } from "react";
import { AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import AuthContext from "../utils/AuthContext";  // Import AuthContext
import Header from "./Header";

function Navigation() {
    const [value, setValue] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    const { user } = useContext(AuthContext);  // Get user role

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AppBar
            position={isSticky ? "fixed" : "static"}
            color="inherit"
            elevation={isSticky ? 4 : 0}
            sx={{ transition: "0.3s ease-in-out", top: 0, zIndex: 1100 }}
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
                    {user?.role === "finance_manager" && <Tab label="Finance" component={Link} to="/finance" />}
                    {user?.role === "admin" && <Tab label="Admin" component={Link} to="/admin" />}
                    {user?.role === "truck_manager" && <Tab label="Truck" component={Link} to="/truck" />}
                    {/* {user?.role === "center_manager" && <Tab label="Admin" component={Link} to="/admin" />}
                    {user?.role === "request_manager" && <Tab label="Admin" component={Link} to="/admin" />} */}

                    {/* Publicly accessible pages */}
                    <Tab label="Signup" component={Link} to="/signup" />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
}

export default Navigation;
