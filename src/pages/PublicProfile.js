import { useState } from "react";
import {Box, Button, Container, Dialog, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, } from "@mui/material";
import axios from "axios";
import SavedCards from "../FinanceManagement/SavedCards";
import UserUpdateForm from "../UserManagement/UserUpdateForm";
import OTPModal from "../UserManagement/OTPModal";

function PublicProfile({ userData }) {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleEditClick = () => setShowUpdateForm(true);

    const handleResetPassword = async () => {
        try {
            await axios.post("http://localhost:8081/user/send-otp", {
                email: userData.userInfo.email,
                purpose: "reset"
            });
            setShowOtpModal(true);
        } catch (err) {
            alert("Failed to send OTP");
        }
    };

    const handleOtpVerified = () => {
        setShowOtpModal(false);
        setOtpVerified(true); // Show password fields
    };

    const handlePasswordUpdate = async () => {
        if (newPassword !== confirmPassword) {
            return alert("Passwords do not match!");
        }
        if (newPassword.length < 6) {
            return alert("Password must be at least 6 characters.");
        }

        try {
            await axios.put("http://localhost:8081/user/update-password", {
                email: userData.userInfo.email,
                newPassword,
            });
            alert("Password updated successfully.");
            setOtpVerified(false);
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            alert("Failed to update password.");
        }
    };

    if (!userData) {
        return <Typography variant="body2">No user data available</Typography>;
    }

    return (
        <Container>
            <Box display="flex" alignItems="center">
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Hello
                </Typography>
                <Typography variant="h4" sx={{ ml: 1, fontWeight: "bold" }}>
                    {userData?.userInfo?.first_name || "User"}!
                </Typography>
            </Box>

            {/* Profile Details */}
            <Box>
                <TableContainer component={Paper} elevation={0} sx={{ maxWidth: 450, mt: 4 }}>
                    <Table>
                        <TableBody>
                            {[
                                { label: "User ID", value: userData.userInfo._id },
                                { label: "First Name", value: userData.userInfo.first_name },
                                { label: "Last Name", value: userData.userInfo.last_name },
                                { label: "Email", value: userData.userInfo.email },
                                { label: "Contact Number", value: userData.userInfo.phone },
                                { label: "Address", value: userData.userInfo.address },
                            ].map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell sx={{ fontWeight: "bold", border: "none" }}>{row.label} :</TableCell>
                                    <TableCell sx={{ border: "none" }}>{row.value || "N/A"}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell sx={{ border: "none" }}>
                                    <Button variant="outlined" color="success" onClick={handleEditClick}>
                                        Edit Profile
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Update Profile Dialog */}
            <Dialog open={showUpdateForm} onClose={() => setShowUpdateForm(false)} fullWidth maxWidth="lg">
                <Box p={2}>
                    <UserUpdateForm
                        user={userData.userInfo}
                        resetUser={() => setShowUpdateForm(false)}
                        fetchUsers={() => {}}
                    />
                </Box>
            </Dialog>

            {/* OTP Modal */}
            <OTPModal
                open={showOtpModal}
                onClose={() => setShowOtpModal(false)}
                email={userData.userInfo.email}
                onVerified={handleOtpVerified}
            />

            <Divider sx={{ mt: 4 }} />

            {/* Reset Password Section */}
            <Box mt={4}>
                <Button variant="outlined" color="warning" sx={{ ml: 2 }} onClick={handleResetPassword}>
                    Reset Password
                </Button>
            </Box>

            {otpVerified && (
                <Box mt={3} sx={{ maxWidth: 400 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Set New Password
                    </Typography>
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        margin="dense"
                        value={newPassword}
                        color="success"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        label="Re-enter Password"
                        type="password"
                        fullWidth
                        margin="dense"
                        value={confirmPassword}
                        color="success"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handlePasswordUpdate}>
                        Update Password
                    </Button>
                </Box>
            )}

            <Divider sx={{ mt: 4 }} />

            {/* Saved Cards Section */}
            <SavedCards />
        </Container>
    );
}

export default PublicProfile;
