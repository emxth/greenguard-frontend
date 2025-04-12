import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const API_BASE_URL = "http://localhost:8081/Maintenance";

const TruckMaintanenceTable = ({ rows, fetchMaintanences }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

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
            {/* Truck Maintanence */}
            <Typography variant="body1" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Truck Maintanence</Typography>

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
                        {rows.length > 0 ? rows.map(row => (
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
