import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Snackbar, Alert, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const API_BASE_URL = "http://localhost:8081/Maintenance";

const TruckMaintanenceTable = ({ rows, fetchMaintanences }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    // Convert the different date formats into standard date
    const parseDate = (dateString) => {
        if (!dateString) return null;
        
        if (typeof dateString === "string") {
            if (dateString.includes("T")) {
                // ISO format: 2025-03-25T12:06:22.304Z
                return new Date(dateString);
            } else if (dateString.includes("-")) {
                const parts = dateString.split("-");
                if (parts[0].length === 4) {
                    // yyyy-mm-dd
                    return new Date(dateString);
                } else {
                    // dd-mm-yyyy
                    const [day, month, year] = parts.map(Number);
                    return new Date(year, month - 1, day);
                }
            }
        }
        
        // Fallback
        return new Date(dateString);
    };

    // Sort rows by latest first
    const sortedRows = [...rows].sort(
        (a, b) => parseDate(b.Maintenance_Date) - parseDate(a.Maintenance_Date)
    );

    // Filter from sorted rows
    const filteredRows = sortedRows.filter((row) => {
    const keyword = searchTerm.toLowerCase();
    return (
        row.Truck_RegNum.toLowerCase().includes(keyword) ||
        row.maintenance_type.toLowerCase().includes(keyword) ||
        row.Description.toLowerCase().includes(keyword) ||
        row.Status.toLowerCase().includes(keyword) ||
        new Date(row.Maintenance_Date).toLocaleString().toLowerCase().includes(keyword) ||
        (row.Cost).toString().includes(keyword)
    );
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Function to update status
    const handleApprove = async (maintainID) => {
        const isConfirmed = window.confirm("Are you sure you want to approve this maintenance cost?");
        
        if (isConfirmed) {
            try {
                // Send PUT request to update status
                await axios.put(`${API_BASE_URL}/updatestatus/${maintainID}`, {
                    Status: "Approved"
                });

                // Show success message
                setSnackbarMessage("Truck Maintenance Approved Successfully!");
                setOpenSnackbar(true);

                // Refresh table data
                fetchMaintanences();

            } catch (error) {
                console.error("Error updating status:", error);
                setSnackbarMessage("Error approving maintenance cost.");
                setOpenSnackbar(true);
            }
        }
    };

    return (
        <Box>
            <Box sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                {/* Citizen Payments */}
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Truck Maintanence</Typography>

                {/* Search bar */}
                <TextField 
                    id="filled-basic" 
                    label="Search maintenance" 
                    variant="outlined"
                    size="small"
                    color="success"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </Box>

            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="small" aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Truck No</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Cost</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredRows.length > 0 ? filteredRows.map(row => (
                            <TableRow key={row._id} hover>
                                <TableCell>{row.Truck_RegNum}</TableCell>
                                <TableCell>{row.Maintenance_Date}</TableCell>
                                <TableCell>{row.maintenance_type}</TableCell>
                                <TableCell>{(row.Cost).toFixed(2)}</TableCell>
                                <TableCell>{row.Description}</TableCell>
                                <TableCell>{row.Status}</TableCell>
                                <TableCell>
                                    {row.Status === "Pending" && (
                                        <Button 
                                            variant="outlined" 
                                            color="success"
                                            size="small"
                                            onClick={() => handleApprove(row._id)}
                                        >
                                            Approve
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={6}>No Data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Snackbar Notification */}
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={3000} 
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default TruckMaintanenceTable;
