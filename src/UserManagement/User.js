import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "./UserTable";
import { Box, Button, Container } from "@mui/material";
import UserUpdateForm from "./UserUpdateForm";
import { FileDownload } from "@mui/icons-material";
import logo from '../images/logo-color.png';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API_BASE_URL = "http://localhost:8081/user";

const User = () => {
    const [user, setUser] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/`);
            setUser(response.data.data || response.data);

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleAddUser = () => {
        setSelectedUser(null); // No user means it's an insert
        setShowForm(true);
    };

    const resetForm = () => {
        setShowForm(false);
        setSelectedUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        console.log("Updated user state:", user);
    }, [user]);

    // Function to handle export to PDF
    const handleExportPDF = async () => {
        if (!user || user.length === 0) {
            alert("No user data available to export");
            return;
        }

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        // Load logo image from public folder
        await new Promise((resolve) => {
            const logoImg = new Image();
            logoImg.onload = () => {
                doc.addImage(logoImg, 'PNG', 14, 10, 30, 30);
                resolve();
            };
            logoImg.src = logo;
        });

        const titleY = 45;

        // Title with styling
        doc.setFontSize(20);
        doc.setTextColor(33, 150, 83); // Green color
        doc.setFont("helvetica", "bold");
        doc.text("USER MANAGEMENT REPORT", 105, titleY, { align: "center" });

        // Subtitle with date
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setFont("helvetica", "normal");
        doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}`, 105, titleY + 8, { align: "center" });

        // Table data with modern styling
        const headers = [
            { title: "User ID", dataKey: "_id" },
            { title: "First Name", dataKey: "first_name" },
            { title: "Last Name", dataKey: "last_name" },
            { title: "Email", dataKey: "email" },
            { title: "Phone", dataKey: "phone" },
            { title: "Address", dataKey: "address" },
            { title: "Role", dataKey: "role" }
        ];

        const tableStartY = titleY + 15;

        autoTable(doc, {
            columns: headers,
            body: user,
            startY: tableStartY,
            styles: {
                font: "helvetica",
                fontSize: 9,
                cellPadding: 4,
                overflow: 'linebreak'
            },
            headStyles: {
                fillColor: [33, 150, 83], // Green header
                textColor: 255,
                fontStyle: 'bold',
                fontSize: 10
            },
            bodyStyles: {
                textColor: [50, 50, 50],
                lineColor: [220, 220, 220]
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245]
            },
            columnStyles: {
                _id: { cellWidth: 25 },
                email: { cellWidth: 40 },
                phone: { cellWidth: 25 },
                role: { cellWidth: 20 }
            },
            margin: { top: 35 },
            didDrawPage: (data) => {
                // Footer on each page
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                // doc.text(
                //     `Page ${data.pageCount}`,
                //     doc.internal.pageSize.width - 15,
                //     doc.internal.pageSize.height - 10
                // );
                doc.text(
                    "Confidential - GreenGuard Solutions",
                    15,
                    doc.internal.pageSize.height - 10
                );
            }
        });

        // Add summary statistics
        const rolesCount = user.reduce((acc, curr) => {
            acc[curr.role] = (acc[curr.role] || 0) + 1;
            return acc;
        }, {});

        doc.setFontSize(11);
        doc.setTextColor(33, 150, 83);
        doc.text("User Role Distribution:", 14, doc.lastAutoTable.finalY + 15);

        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        Object.entries(rolesCount).forEach(([role, count], index) => {
            doc.text(
                `${role}: ${count} users`,
                14,
                doc.lastAutoTable.finalY + 25 + (index * 5)
            );
        });

        doc.save(`User_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "right", mb: 3, gap: 2 }}>
                <Button variant="contained" color="warning" onClick={handleAddUser}>
                    Add New Staff Member
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleExportPDF}
                >
                    <FileDownload sx={{ mr: 1 }} />
                    Export as PDF
                </Button>
            </Box>

            {showForm ? (
                <UserUpdateForm user={selectedUser} resetUser={resetForm} fetchUsers={fetchUser} />
            ) : (
                <UserTable rows={user} fetchUser={fetchUser} />
            )}
        </Container>
    );
};

export default User;