import React, { useState } from "react";
import theme from '../components/theme';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Paper, Toolbar, Divider, Container } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import Payments from "../FinanceManagement/Payments";
import TruckMaintanence from "../FinanceManagement/TruckMaintanence";
import TruckFuel from "../FinanceManagement/Fuel";
import FinanceDashboard from "../FinanceManagement/FinanceDashboard";

const drawerWidth = 240;

// Drawer
export default function FinanceDrawer() {
    // State to track selected menu item
    const [selectedComponent, setSelectedComponent] = useState("Dasboard");

    const menuItems = [
        { text: "Dashboard", icon: <AutoAwesomeMosaicIcon />, component: "Dasboard" },
        { text: "Citizen Payments", icon: <PaymentsIcon />, component: "CitizenPayments" },
        { text: "Truck Expenses", icon: <LocalShippingIcon />, component: "TruckExpenses" },
    ];

    // Component Map
    const componentMap = {
        Dasboard: <FinanceDashboardContent />,
        CitizenPayments: <CitizenPayments />,
        TruckExpenses: <TruckExpenses />
    };

    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", mt: 5, mb: 5 }}>
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
        </Container>
    );
}

// Content for Finance Dashboard
export function FinanceDashboardContent() {
    return (
        <Box>
            <Typography variant="h4" sx={{ color: theme.palette.darkgreen.main }}>Dashboard</Typography>
            <Divider sx={{ mt: 2, mb: 1, }} />
            <FinanceDashboard />
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
