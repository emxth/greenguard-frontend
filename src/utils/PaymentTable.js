import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import theme from '../components/theme';
import { useState } from "react";

const API_BASE_URL = "http://localhost:8081/payment";

const PaymentTable = ({ rows, fetchPayments }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleDelete = async (payId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this payment?");
        
        if (isConfirmed) {
            try {
                await axios.delete(`${API_BASE_URL}/deletepayment/${payId}`);
                fetchPayments(); // Refresh data
                setSnackbarMessage("Payment deleted successfully!");
                setOpenSnackbar(true); // Show success message
            } catch (error) {
                console.error("Error deleting payment:", error);
                setSnackbarMessage("Error deleting payment.");
                setOpenSnackbar(true);
            }
        }
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ color: theme.palette.darkgreen.main }}>Citizen Payments</Typography>
            <Divider sx={{ mt: 2, mb: 1 }} />

            {/* Citizen Payments */}
            <Typography variant="body1" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Pickup Request Payments</Typography>

            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="small" aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Payment ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>User ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Payment Method</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Created At</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Amount</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.length > 0 ? rows.map(row => (
                            <TableRow key={row._id} hover>
                                <TableCell>{row._id}</TableCell>
                                <TableCell>{row.user_id}</TableCell>
                                <TableCell>{row.payment_method}</TableCell>
                                <TableCell>{new Date(row.created_at).toLocaleString()}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="error"
                                        onClick={() => handleDelete(row._id)}
                                    >
                                        Delete
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

export default PaymentTable;





// import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
// import theme from '../components/theme';

// const PaymentTable = ({ rows, selectedPayment, deletePayment }) => {
//     return (
//         <Box>
//             <Typography variant="h4" sx={{ color: theme.palette.darkgreen.main }}>Citizen Payments</Typography>
//             <Divider sx={{ mt: 2, mb: 1, }} />

//             {/* Citizen Payments */}
//             <Typography variant="body1" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Pickup Request Payments</Typography>
//             {/* Sticky Header Table */}
//             <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//                 <Table stickyHeader aria-label="sticky table">
//                     {/* Table Head */}
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Payment ID</TableCell>
//                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>User ID</TableCell>
//                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Payment Method</TableCell>
//                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Created At</TableCell>
//                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Amount</TableCell>
//                         </TableRow>
//                     </TableHead>

//                     {/* Table Body */}
//                     <TableBody>
//                         {rows.length > 0 ? rows.map(row => (
//                             <TableRow key={row.id} hover>
//                                 <TableCell component={'td'} scope="row">{row.id}</TableCell>
//                                 <TableCell component={'td'} scope="row">{row.user_id}</TableCell>
//                                 <TableCell component={'td'} scope="row">{row.payment_method}</TableCell>
//                                 <TableCell component={'td'} scope="row">{row.created_at}</TableCell>
//                                 <TableCell component={'td'} scope="row">{row.amount}</TableCell>
//                             </TableRow>
//                         )) : (
//                                 <TableRow>
//                                     <TableCell component={'td'} scope="row">No Data </TableCell>
//                                 </TableRow>
//                             )
//                         }
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// }

// export default PaymentTable;

// function CitizenPayments() {
//     const [payment, setpayment] = useState([]);   // Stores fetched truck data
//     const [loading, setLoading] = useState(true);   // Loading state
//     const [error, setError] = useState(null);   // Error handling
//     const navigate = useNavigate();

//     const [allPayments, setAllPayments] = useState([]); // Store all trucks for resetting the table

//     useEffect(() => {
//         // Fetch payment data from backend
//         axios.get("http://localhost:8081/payment/")
//             .then((response) => {
//                 setpayment(response.data);
//                 setAllPayments(response.data); // Set state with fetched data
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("Error fetching payments:", err);
//                 setError("Failed to load payments. Please try again.");
//                 setLoading(false);
//             });
//     }, []);

//     return (
//         <Box>
//             <Typography variant="h4" sx={{ color: theme.palette.darkgreen.main }}>Citizen Payments</Typography>
//             <Divider sx={{ mt: 2, mb: 1, }} />

//             {/* Citizen Payments */}
//             <Typography variant="body1" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Pickup Request Payments</Typography>
//             {/* Sticky Header Table */}
//             <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//                 <Table stickyHeader aria-label="sticky table">
//                     {/* Table Head */}
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Payment ID</TableCell>
//                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>User ID</TableCell>
//                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Payment Method</TableCell>
//                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Created At</TableCell>
//                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Amount</TableCell>
//                         </TableRow>
//                     </TableHead>

//                     {/* Table Body */}
//                     <TableBody>
//                         {rows.map((row, index) => (
//                             <TableRow key={index} hover>
//                                 {columnsPayments.map((column) => (
//                                     <TableCell key={column.id} align={column.align}>
//                                         {row[column.id]}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// }

//export default CitizenPayments;