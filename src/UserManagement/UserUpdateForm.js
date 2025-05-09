import { useState, useEffect } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import theme from "../components/theme";
import CustomSnackbar from "../components/CustomSnackbar";
import { Navigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8081/user";

// Helper to generate password
const generatePassword = (firstName) => {
    const namePart = firstName.toLowerCase().slice(0, 4);
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 digits
    return (namePart + randomDigits).slice(0, 8); // Ensure max 8 characters
};

const UserUpdateForm = ({ user, resetUser, fetchUsers }) => {
    const [formData, setFormData] = useState({
        userId: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        role: "",
        password: "",
    });

    const [snackbar, setSnackbar] = useState({ 
        open: false, 
        message: "", 
        severity: "success" 
    });

    // Set form data if editing
    useEffect(() => {
        if (user) {
            setFormData({
                userId: user._id || "",
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                password: user.password || "",
                role: user.role || "",
            });
        } else {
            // If adding new user, clear form
            setFormData({
                userId: "",
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                address: "",
                role: "",
                password: "",
            });
        }
    }, [user]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Generate password on first name entry (insert only)
        if (name === "first_name" && !user) {
            const generatedPassword = generatePassword(value);
            setFormData((prev) => ({
                ...prev,
                first_name: value,
                password: generatedPassword,
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle form submission (create and update)
    const handleSave = async () => {
        try {
            if (user) {
                // Update user
                await axios.put(`${API_BASE_URL}/updateuser/${user._id}`, formData);
                setSnackbar({ open: true, message: "User updated successfully!", severity: "success" });
                
            } else {
                // Create new user
                await axios.post(`${API_BASE_URL}/createuser`, formData);
    
                // Send password hint and update link (optional - can be delayed until OTP verified)
                await axios.post(`${API_BASE_URL}/send-password-notification`, {
                    email: formData.email,
                    last_name: formData.last_name,
                    password_hint: "first_name" + formData.password.slice(-4), // e.g. "first_name1234"

                    reset_link: `http://localhost:3000/profile`
                });
    
                setSnackbar({ open: true, message: "User created. Email sent.", severity: "success" });
            }
    
            fetchUsers();
            resetUser();
        } catch (error) {
            console.error("Error saving user:", error);
            setSnackbar({ open: true, message: "Error saving user!", severity: "error" });
        }
    };

    // Handle delete action
    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (isConfirmed) {
            try {
                await axios.delete(`${API_BASE_URL}/deleteuser/${user._id}`);
                alert("User deleted successfully!");
                setSnackbar({ 
                    open: true, 
                    message: "User deleted successfully!", 
                    severity: "success" 
                });
                fetchUsers();
                resetUser();
                Navigate("/");
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Error deleting user!");
                setSnackbar({ 
                    open: true, 
                    message: "Error deleting user!", 
                    severity: "error" 
                });
            }
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
      };

    return (
        <Grid container spacing={3} xs={10} sx={{ margin: "auto", p: 3, borderRadius: 4, boxShadow: 2 }}>
            {user && (
                <Grid item xs={12}>
                    <TextField
                        required
                        name="userId"
                        label="User ID"
                        fullWidth
                        value={formData.userId}
                        disabled
                    />
                </Grid>
            )}

            <Grid item xs={6}>
                <TextField
                    required
                    name="email"
                    label="Email"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth required>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={formData.role}
                        label="Role"
                        onChange={handleChange}
                    >
                        <MenuItem value="citizen">Citizen</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="driver">Driver</MenuItem>
                        <MenuItem value="request_manager">Request Manager</MenuItem>
                        <MenuItem value="finance_manager">Finance Manager</MenuItem>
                        <MenuItem value="center_manager">Center Manager</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required
                    name="first_name"
                    label="First Name"
                    fullWidth
                    value={formData.first_name}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required
                    name="last_name"
                    label="Last Name"
                    fullWidth
                    value={formData.last_name}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required
                    name="phone"
                    label="Contact Number"
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={formData.password}
                    disabled
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    name="address"
                    label="Address"
                    fullWidth
                    value={formData.address}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item>
                <Button variant="contained" sx={{ bgcolor: theme.palette.darkgreen.main }} onClick={handleSave}>
                    {user ? "Save Changes" : "Add User"}
                </Button>
            </Grid>

            {user && (
                <Grid item>
                    <Button color="error" variant="outlined" onClick={handleDelete}>
                        Delete
                    </Button>
                </Grid>
            )}

            <Grid item>
                <Button color="warning" variant="outlined" onClick={resetUser}>
                    Close
                </Button>
            </Grid>

            {/* Calling CustomSnackbar component to show messages */}
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                handleClose={handleSnackbarClose}
            />
        </Grid>
    );
};

export default UserUpdateForm;
