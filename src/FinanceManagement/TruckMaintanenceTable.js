import {
    Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Typography, Button, Snackbar, Alert, TextField, Checkbox
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const API_BASE_URL = "http://localhost:8081/Maintenance";

const TruckMaintanenceTable = ({ rows, fetchMaintanences }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);

    const parseDate = (dateString) => {
        if (!dateString) return null;
        if (typeof dateString === "string") {
            if (dateString.includes("T")) {
                return new Date(dateString);
            } else if (dateString.includes("-")) {
                const parts = dateString.split("-");
                if (parts[0].length === 4) {
                    return new Date(dateString);
                } else {
                    const [day, month, year] = parts.map(Number);
                    return new Date(year, month - 1, day);
                }
            }
        }
        return new Date(dateString);
    };

    const sortedRows = [...rows].sort(
        (a, b) => parseDate(b.Maintenance_Date) - parseDate(a.Maintenance_Date)
    );

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

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleBatchApprove = async () => {
        if (selectedIds.length === 0) {
            setSnackbarMessage("No maintenance selected.");
            setOpenSnackbar(true);
            return;
        }

        const confirm = window.confirm("Are you sure you want to approve selected maintenance costs?");
        if (!confirm) return;

        try {
            await Promise.all(
                selectedIds.map(id =>
                    axios.put(`${API_BASE_URL}/updatestatus/${id}`, {
                        Status: "Approved"
                    })
                )
            );

            setSnackbarMessage("Selected maintenance costs approved successfully!");
            setOpenSnackbar(true);
            setSelectedIds([]);
            fetchMaintanences();
        } catch (error) {
            console.error("Batch approval error:", error);
            setSnackbarMessage("Error during batch approval.");
            setOpenSnackbar(true);
        }
    };

    return (
        <Box>
            <Box sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Truck Maintenance</Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Search maintenance"
                        variant="outlined"
                        size="small"
                        color="success"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Box>
            </Box>

            {selectedIds.length > 0 && (
                <Button
                    variant="contained"
                    color="success"
                    sx={{ mb: 2 }}
                    onClick={handleBatchApprove}
                >
                    Approve Selected ({selectedIds.length})
                </Button>
            )}

            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" sx={{ backgroundColor: "#f5f5f5" }}></TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Truck No</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Cost</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Description</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredRows.length > 0 ? filteredRows.map(row => (
                            <TableRow key={row._id} hover>
                                <TableCell padding="checkbox">
                                    {row.Status === "Pending" && (
                                        <Checkbox
                                            color="success"
                                            size="small"
                                            disabled={row.Status !== "Pending"}
                                            checked={selectedIds.includes(row._id)}
                                            onChange={() => handleCheckboxChange(row._id)}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>{row.Truck_RegNum}</TableCell>
                                <TableCell>{row.Maintenance_Date}</TableCell>
                                <TableCell>{row.maintenance_type}</TableCell>
                                <TableCell>{(row.Cost).toFixed(2)}</TableCell>
                                <TableCell>{row.Description}</TableCell>
                                <TableCell>{row.Status}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={7}>No Data</TableCell>
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

export default TruckMaintanenceTable;
