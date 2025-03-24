import React, { useState } from "react";
import theme from '../components/theme';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Paper, Toolbar, Divider } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import Payments from "../utils/Payments";
import TruckMaintanence from "../utils/TruckMaintanence";
import TruckFuel from "../utils/Fuel";

const drawerWidth = 240;

// Drawer
export default function FinanceDrawer() {
    // State to track selected menu item
    const [selectedComponent, setSelectedComponent] = useState("Dasboard");

    const menuItems = [
        { text: "Dashboard", icon: <AutoAwesomeMosaicIcon />, component: "Dasboard" },
        { text: "Citizen Payments", icon: <PaymentsIcon />, component: "CitizenPayments" },
        { text: "Truck Expenses", icon: <LocalShippingIcon />, component: "TruckExpenses" },
        { text: "Finance Reports", icon: <AssessmentIcon />, component: "FinanceReports" }
    ];

    // Component Map
    const componentMap = {
        Dasboard: <FinanceDashboard />,
        CitizenPayments: <CitizenPayments />,
        TruckExpenses: <TruckExpenses />,
        FinanceReports: <FinanceReports />
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", mt: 5, mb: 5 }}>
            {/* Drawer & Content Wrapper */}
            <Paper elevation={3} sx={{ width: "100%", display: "flex", borderRadius: 2, overflow: "hidden", }}>
                
                {/* Drawer Section */}
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        cursor: "pointer",
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", position: "relative" }
                    }}
                >
                    <Toolbar />
                    <List>
                        {menuItems.map((item) => (
                            <ListItem 
                                button 
                                key={item.text} 
                                selected={selectedComponent === item.component}
                                onClick={() => setSelectedComponent(item.component)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

                {/* Content Section */}
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    {componentMap[selectedComponent]}
                </Box>

            </Paper>
        </Box>
    );
}

// Content for Finance Dashboard
export function FinanceDashboard() {
    return (
        <Box>
            <Typography variant="h4" sx={{ color: theme.palette.darkgreen.main }}>Dashboard</Typography>
            <Divider sx={{ mt: 2, mb: 1, }} />
            <Typography variant="body1" sx={{ mt: 2 }}>
                Dashboard content goes here.
            </Typography>
        </Box>
    );
}

// Content for Citizen Payments
export function CitizenPayments() {
    return (
        <Payments />
    );
}

// Content for Truck Expenses
export function TruckExpenses() {
    return (
        <Box>
            <Typography variant="h4" sx={{ color: theme.palette.darkgreen.main }}>Truck Expenses</Typography>
            <Divider sx={{ mt: 2, mb: 1, }} />
            
            {/* Truck Maintanence */}
            <TruckMaintanence />

            {/* Truck Fuel Expenses */}
            <TruckFuel />
        </Box>
    );
}

// Content for Finance Reports
export function FinanceReports() {
    return (
        <Box>
            <Typography variant="h4" sx={{ color: theme.palette.darkgreen.main }}>Finance Reports</Typography>
            <Divider sx={{ mt: 2, mb: 1, }} />
            <Typography variant="body1" sx={{ mt: 2 }}>
                Finance Reports content goes here.
            </Typography>
        </Box>
    );
}

