import React, { useRef, useState } from "react";
import theme from '../components/theme';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Paper, Toolbar, Divider, Button } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import Payments from "../FinanceManagement/Payments";
import TruckMaintanence from "../FinanceManagement/TruckMaintanence";
import TruckFuel from "../FinanceManagement/Fuel";
import FinanceDashboard from "../FinanceManagement/FinanceDashboard";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from '../images/logo-color.png';

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
        Dasboard: <FinanceDashboardContent />,
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

// Content for Finance Reports
export function FinanceReports() {
    const exportRef = useRef();

    const handleExportPDF = async () => {
        const input = exportRef.current;
        if (!input) return;
    
        const canvas = await html2canvas(input, { scale: 2, scrollY: -window.scrollY });
    
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 190; // available height after header
    
        const imgProps = {
            width: canvas.width,
            height: canvas.height
        };
    
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    
        const pdf = new jsPDF("p", "mm", "a4");
    
        const logoImg = new Image();
        logoImg.src = logo;
    
        const headerHeight = 40;
        const pageCanvasHeightPx = (pageHeight * imgProps.height) / imgHeight;
    
        const pageCanvas = document.createElement("canvas");
        const ctx = pageCanvas.getContext("2d");
    
        let renderedHeight = 0;
        let pageCount = 0;
    
        while (renderedHeight < imgProps.height) {
            const sliceHeightPx = Math.min(pageCanvasHeightPx, imgProps.height - renderedHeight);
    
            pageCanvas.width = imgProps.width;
            pageCanvas.height = sliceHeightPx;
    
            ctx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
    
            ctx.drawImage(
                canvas,
                0,
                renderedHeight,
                pageCanvas.width,
                sliceHeightPx,
                0,
                0,
                pageCanvas.width,
                sliceHeightPx
            );
    
            const pageData = pageCanvas.toDataURL("image/png");
    
            if (pageCount > 0) pdf.addPage();
    
            if (pageCount === 0) {
                // Add header only on first page
                pdf.addImage(logoImg, "PNG", 10, 10, 30, 30); // increased logo height
                pdf.setFontSize(18);
                pdf.text("Finance Report", 50, 20);
                pdf.setFontSize(12);
                pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 28);
                pdf.addImage(pageData, "PNG", 0, headerHeight, imgWidth, (sliceHeightPx * imgWidth) / pageCanvas.width);
            } else {
                // No header on subsequent pages
                pdf.addImage(pageData, "PNG", 0, 0, imgWidth, (sliceHeightPx * imgWidth) / pageCanvas.width);
            }
    
            renderedHeight += sliceHeightPx;
            pageCount++;
        }
    
        pdf.save(`Finance_Report_${Date.now()}.pdf`);
    };
    
        
    return (
        <Box>
            <Typography variant="h4" sx={{ color: theme.palette.darkgreen.main }}>
                Finance Reports
            </Typography>
            <Divider sx={{ mt: 2, mb: 1 }} />

            <Box sx={{ display: "flex", justifyContent: "end", mt: 3, mr: 3 }}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleExportPDF}
                    sx={{ height: 40 }}
                >
                    Export as PDF
                </Button>
            </Box>

            <Box 
                ref={exportRef} 
                sx={{ 
                    p: 6, 
                    backgroundColor: "#fff", 
                    color: "#000", 
                    maxHeight: "60vh", 
                    overflowY: "auto", 
                    borderRadius: 2, 
                    mt: 2 
                }}
            >
                <FinanceDashboard />
            </Box>
        </Box>
    );
}