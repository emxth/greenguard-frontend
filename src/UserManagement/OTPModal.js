import React, { useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import AuthContext from "./AuthContext";

const OTPModal = ({ open, onClose, email, onVerified }) => {
    const [otp, setOtp] = useState("");
    const { user } = useContext(AuthContext);

    // Fallback: use email from props or from context
    // const email = propEmail || (user && user.email);

    const handleVerify = async () => {
        try {
            const res = await axios.post("http://localhost:8081/user/verify-otp", {
                email: email || user?.email,
                otp,
                purpose: "reset"
            });

            if (res.data.success) {
                onVerified();
                onClose();
            } else {
                alert(res.data.message || "Invalid OTP");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Verification failed");
            console.error("Verification error:", err.response?.data);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogContent>
                <Typography variant="body2" sx={{ mb: 2 }}>OTP will sent into your registered email</Typography>
                <TextField fullWidth label="OTP Code" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <Button onClick={handleVerify} variant="contained" color="success" sx={{ mt: 2 }}>Verify</Button>
            </DialogContent>
        </Dialog>
    );
};

export default OTPModal;
