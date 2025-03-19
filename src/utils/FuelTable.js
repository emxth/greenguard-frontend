import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const API_BASE_URL = "http://localhost:8081/truckFuelCost";

const FuelTable = ({ rows, fetchTruckFuel }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Function to update status
    const handleApprove = async (maintainID) => {
        const isConfirmed = window.confirm("Are you sure you want to approve this truck fuel cost?");
        
        if (isConfirmed) {
            try {
                // Send PUT request to update status
                await axios.put(`${API_BASE_URL}/updatestatus/${maintainID}`, {
                    Status: "Approved"
                });

                // Show success message
                setSnackbarMessage("Truck Fuel Cost Approved Successfully!");
                setOpenSnackbar(true);

                // Refresh table data
                fetchTruckFuel();

            } catch (error) {
                console.error("Error updating status:", error);
                setSnackbarMessage("Error approving fuel cost.");
                setOpenSnackbar(true);
            }
        }
    };

    return (
        <Box>
            {/* Fuel Expenses */}
            <Typography variant="body1" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Fuel Expenses</Typography>

            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="small" aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Truck No</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Fuel Date</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Cost</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Liters</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.length > 0 ? rows.map(row => (
                            <TableRow key={row._id} hover>
                                <TableCell>{row.Truck_RegNum}</TableCell>
                                <TableCell>{row.Fuel_Date}</TableCell>
                                <TableCell>{row.FuelCost}</TableCell>
                                <TableCell>{row.Litres}</TableCell>
                                <TableCell>{row.Status}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="error"
                                        onClick={() => handleApprove(row.Truck_RegNum)}
                                    >
                                        Approve
                                    </Button>
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

export default FuelTable;
