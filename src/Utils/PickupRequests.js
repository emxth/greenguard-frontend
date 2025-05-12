import { Box, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../UserManagement/AuthContext";

function PickupRequests() {
    const { user } = useContext(AuthContext);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [payments, setPayments] = useState([]);
    const [pickupRequests, setPickupRequests] = useState([]);
    const [errors, setErrors] = useState({});

    const handleOpenUpdateDialog = (request) => {
        setSelectedRequest({ ...request });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedRequest(null);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!selectedRequest.Name || selectedRequest.Name.trim() === '') {
            newErrors.Name = 'Name is required';
        } else if (!/^[a-zA-Z ]+$/.test(selectedRequest.Name)) {
            newErrors.Name = 'Only letters and spaces allowed';
        }

        if (!selectedRequest.Phone || !/^\d{9}$/.test(selectedRequest.Phone)) {
            newErrors.Phone = 'Valid 10-digit phone number is required';
        }

        if (!selectedRequest.PickupLocation || selectedRequest.PickupLocation.trim() === '') {
            newErrors.PickupLocation = 'Pickup location is required';
        }

        if (!selectedRequest.wasteType) {
            newErrors.wasteType = 'Please select a waste type';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdateSubmit = async () => {
        try {
            const { _id, Name, Phone, wasteType, PickupDate, PickupLocation } = selectedRequest;

            if (!validateForm()) return;

            const response = await axios.put(`http://localhost:8081/requestPickup/update/${_id}`, {
                Name,
                Phone,
                wasteType,
                PickupDate,
                PickupLocation
            });

            if (response.data.status === "success") {
                handleCloseDialog();
                fetchPickupRequests(); // Refresh the list
            } else {
                console.error("Update failed:", response.data);
            }
        } catch (err) {
            console.error("Error updating pickup request:", err);
        }
    };

    // Fetch pickup requests
    const fetchPickupRequests = async () => {
        if (!user || !user.id) return;

        try {
            const response = await axios.get(
                `http://localhost:8081/requestPickup/userpickuprequests/${user.id}`
            );

            // Access response.data.data instead of response.data.requests
            setPickupRequests(response.data.data || []);

        } catch (error) {
            console.error("Error fetching pickup requests:", error);
            setPickupRequests([]); // Clear previous data on error
        }
    };

    // Fetch payments
    const fetchPayments = async () => {
        if (!user || !user.id) return; // Prevent bad request

        try {
            const response = await axios.get(`http://localhost:8081/payment/userpayment/${user.id}`);
            const paymentData = response.data.payment;
            setPayments(paymentData);

        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    };

    useEffect(() => {
        if (user && user.id) {
            fetchPayments();
            fetchPickupRequests();
        }
    }, [user]);

    return (
        <Container>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>My Pickup Activity</Typography>

            {/* Pickup Requests Section */}
            <Box sx={{ px: 4, pt: 4, pb: 1 }}>
                <Typography variant="h5" mb={3}>Your Pickup Requests</Typography>
                {pickupRequests.length > 0 ? (
                    <TableContainer component={Paper} sx={{ mb: 4 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="pickup requests table">
                            <TableHead sx={{ bgcolor: 'success.light' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Pickup ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Pickup Date</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Waste Type</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Capacity (kg)</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pickupRequests.map((request) => (
                                    <TableRow
                                        key={request._id}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            '&:hover': { bgcolor: 'action.hover' }
                                        }}
                                    >
                                        <TableCell>{request.PickUp_ID}</TableCell>
                                        <TableCell>{request.Name}</TableCell>
                                        <TableCell>
                                            {new Date(request.PickupDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </TableCell>
                                        <TableCell>{request.wasteType}</TableCell>
                                        <TableCell>{request.Capacity}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={request.Status}
                                                color={
                                                    request.Status === 'Completed' ? 'success' :
                                                        request.Status === 'Pending' ? 'warning' :
                                                            'default'
                                                }
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="success"
                                                size="small"
                                                disabled={request.Status === 'Completed'}
                                                onClick={() => handleOpenUpdateDialog(request)}
                                                sx={{
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        bgcolor: 'success.main',
                                                        color: 'common.white'
                                                    }
                                                }}
                                            >
                                                Update
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Box sx={{
                        p: 4,
                        textAlign: 'center',
                        bgcolor: 'background.default',
                        borderRadius: 2
                    }}>
                        <Typography variant="body1" color="text.secondary">
                            No pickup requests available.
                        </Typography>
                    </Box>
                )}
            </Box>

            <Divider sx={{ mt: 3 }} />

            {/* Payments Section */}
            <Box sx={{ p: 4 }}>
                <Typography variant="h5" mb={3}>Your Pickup Payments</Typography>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="pickup requests table">
                        <TableHead sx={{ bgcolor: 'success.light' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Payment ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Payment Method</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Created At</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'common.white' }}>Amount</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {payments.length > 0 ? payments.map(row => (
                                <TableRow key={row._id} hover>
                                    <TableCell>{row._id}</TableCell>
                                    <TableCell>{row.payment_method}</TableCell>
                                    <TableCell>{new Date(row.created_at).toLocaleString()}</TableCell>
                                    <TableCell>{(row.amount).toFixed(2)}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">No payment records found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Pickup Requests Update Dialog */}
            <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Update Pickup Request</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="Name"
                        value={selectedRequest?.Name || ''}
                        onChange={(e) => setSelectedRequest({ ...selectedRequest, Name: e.target.value })}
                        sx={{ mt: 1 }}
                        color="success"
                        error={!!errors.Name}
                        helperText={errors.Name}
                    />
                    <TextField
                        label="Phone Number"
                        type="text"
                        color="success"
                        value={selectedRequest?.Phone || ''}
                        onChange={(e) => setSelectedRequest({ ...selectedRequest, Phone: e.target.value })}
                        error={!!errors.Phone}
                        helperText={errors.Phone}
                    />
                    <TextField
                        label="Pickup Location"
                        type="text"
                        color="success"
                        value={selectedRequest?.PickupLocation || ''}
                        onChange={(e) => setSelectedRequest({ ...selectedRequest, PickupLocation: e.target.value })}
                        error={!!errors.PickupLocation}
                        helperText={errors.PickupLocation}
                    />
                    <TextField
                        select
                        label="Waste Type"
                        color="success"
                        value={selectedRequest?.wasteType || ''}
                        onChange={(e) => setSelectedRequest({ ...selectedRequest, wasteType: e.target.value })}
                        error={!!errors.wasteType}
                        helperText={errors.wasteType}
                    >
                        {['Personal Devices', 'Household Appliances', 'Computer Accessories',
                            'Communication Equipment', 'Batteries & Lighting',
                            'Industrial & Office', 'Other'].map((option) => (
                                <MenuItem
                                    key={option}
                                    value={option}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 152, 0, 0.1)'
                                        }
                                    }}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button color="warning" onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        variant="contained" onClick={handleUpdateSubmit} color="success">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default PickupRequests;