import React, { useState } from "react";
import theme from '../components/theme';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Paper, Toolbar, Divider, TableContainer, TableHead, TableRow, TableCell, Table, TableBody } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Payments from "../utils/Payments";

const drawerWidth = 240;

export default function FinanceDrawer() {
    // State to track selected menu item
    const [selectedComponent, setSelectedComponent] = useState("CitizenPayments");

    const menuItems = [
        { text: "Citizen Payments", icon: <PaymentsIcon />, component: "CitizenPayments" },
        { text: "Truck Expenses", icon: <LocalShippingIcon />, component: "TruckExpenses" },
        { text: "Finance Reports", icon: <AssessmentIcon />, component: "FinanceReports" }
    ];

    // Component Map
    const componentMap = {
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


// Column Definitions
const columns = [
    { id: "column1", label: "Column 1", minWidth: 170, align: "left" },
    { id: "column2", label: "Column 2", minWidth: 170, align: "left" },
    { id: "column3", label: "Column 3", minWidth: 170, align: "left" },
    { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

const columnsSummary = [
    { id: "column1", label: "Column 1", minWidth: 170, align: "left" },
    { id: "column2", label: "Column 2", minWidth: 170, align: "left" },
    { id: "column3", label: "Column 3", minWidth: 170, align: "left" },
];

const rows = [
    createData('India', 'IN', 1324171354),
    createData('China', 'CN', 1403500365),
    createData('Italy', 'IT', 60483973),
    createData('United States', 'US', 327167434),
    createData('Canada', 'CA', 37602103),
];

// Function to Create Row Data
function createData(column1, column2, column3) {
    return { column1, column2, column3 };
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

            {/* Truck Expenses */}
            <Typography variant="body1" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>Truck Expenses Summary</Typography>
            {/* Sticky Header Table */}
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader aria-label="sticky table">
                    {/* Table Head */}
                    <TableHead>
                        <TableRow>
                            {columnsSummary.map((column) => (
                                <TableCell key={column.id} align={column.align} sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    {/* Table Body */}
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} hover>
                                {columnsSummary.map((column) => (
                                    <TableCell key={column.id} align={column.align}>
                                        {row[column.id]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {/* Truck Maintanence */}
            <Typography variant="body1" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Truck Maintaines</Typography>
            {/* Sticky Header Table */}
            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                <Table stickyHeader size="small" aria-label="sticky table">
                    {/* Table Head */}
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    {/* Table Body */}
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} hover>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.id === "actions" ? (
                                            <button style={{ 
                                                padding: "6px 12px", 
                                                backgroundColor: "#2E7D32", 
                                                color: "white", 
                                                border: "none", 
                                                borderRadius: "4px", 
                                                cursor: "pointer" 
                                            }}>
                                                Approve
                                            </button>
                                        ) : (
                                            row[column.id]
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Truck Fuel Expenses */}
            <Typography variant="body1" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Fuel Expenses</Typography>
            {/* Sticky Header Table */}
            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                <Table stickyHeader size="small" aria-label="sticky table">
                    {/* Table Head */}
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* Table Body */}
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} hover>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.id === "actions" ? (
                                            <button style={{ 
                                                padding: "6px 12px", 
                                                backgroundColor: "#2E7D32", 
                                                color: "white", 
                                                border: "none", 
                                                borderRadius: "4px", 
                                                cursor: "pointer" 
                                            }}>
                                                Approve
                                            </button>
                                        ) : (
                                            row[column.id]
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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

