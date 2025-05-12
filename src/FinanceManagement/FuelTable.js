import {
    Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography, Button, Snackbar, Alert, TextField, Checkbox
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const API_BASE_URL = "http://localhost:8081/FuelCost";

const FuelTable = ({ rows, fetchTruckFuel }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);

    const parseDate = (dateString) => {
        if (!dateString) return null;
        if (typeof dateString === "string") {
            if (dateString.includes("T")) {
                return new Date(dateString);
            } else if (dateString.includes("-")) {
                const parts = dateString.split("-");
                if (parts[0].length === 4) return new Date(dateString);
                const [day, month, year] = parts.map(Number);
                return new Date(year, month - 1, day);
            }
        }
        return new Date(dateString);
    };

    const sortedRows = [...rows].sort(
        (a, b) => parseDate(b.Fuel_Date) - parseDate(a.Fuel_Date)
    );

    const filteredRows = sortedRows.filter((row) => {
        const keyword = searchTerm.toLowerCase();
        return (
            row.Truck_RegNum.toLowerCase().includes(keyword) ||
            row.Status.toLowerCase().includes(keyword) ||
            row.Litres.toString().includes(keyword) ||
            new Date(row.Fuel_Date).toLocaleString().toLowerCase().includes(keyword) ||
            row.FuelCost.toString().includes(keyword)
        );
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleRowSelection = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const handleBatchApprove = async () => {
        if (selectedRows.length === 0) {
            alert("No rows selected.");
            return;
        }

        const confirmed = window.confirm("Approve selected fuel costs?");
        if (!confirmed) return;

        try {
            await Promise.all(selectedRows.map(id =>
                axios.put(`${API_BASE_URL}/updatestatus/${id}`, {
                    Status: "Approved"
                })
            ));

            setSnackbarMessage("Selected fuel costs approved!");
            setOpenSnackbar(true);
            setSelectedRows([]);
            fetchTruckFuel();
        } catch (error) {
            console.error("Error during batch approval:", error);
            setSnackbarMessage("Failed to approve selected.");
            setOpenSnackbar(true);
        }
    };

    return (
        <Box>
            <Box sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <Typography variant="body1" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Fuel Expenses</Typography>
                <TextField
                    label="Search expenses"
                    variant="outlined"
                    size="small"
                    color="success"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </Box>

            {selectedRows.length > 0 && (
                <Button
                    variant="contained"
                    color="success"
                    sx={{ mb: 2 }}
                    onClick={handleBatchApprove}
                >
                    Approve Selected ({selectedRows.length})
                </Button>
            )}

            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" sx={{ backgroundColor: "#f5f5f5" }} />
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Truck No</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Fuel Date</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Cost</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Liters</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.length > 0 ? filteredRows.map(row => (
                            <TableRow key={row._id} hover>
                                <TableCell padding="checkbox">
                                    {row.Status === "Pending" && (
                                        <Checkbox
                                            checked={selectedRows.includes(row._id)}
                                            onChange={() => toggleRowSelection(row._id)}
                                            color="success"
                                            size="small"
                                        />
                                    )}
                                </TableCell>
                                <TableCell>{row.Truck_RegNum}</TableCell>
                                <TableCell>{new Date(row.Fuel_Date).toLocaleDateString()}</TableCell>
                                <TableCell>{row.FuelCost.toFixed(2)}</TableCell>
                                <TableCell>{row.Litres.toFixed(1)}</TableCell>
                                <TableCell>{row.Status}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={6}>No Data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

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
};

export default FuelTable;
