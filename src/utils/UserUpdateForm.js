import { useState, useEffect } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import theme from "../components/theme";

const API_BASE_URL = "http://localhost:8081/user";

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

    // Populate form when user is selected
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
        }
    }, [user]);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Update user
    const handleUpdate = async () => {
        try {
            await axios.put(`${API_BASE_URL}/updateuser/${user._id}`, formData);
            alert("User updated successfully!");
            fetchUsers(); // Refresh the user list
            resetUser(); // Close the form
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Error updating user!");
        }
    };

    // Delete user
    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (isConfirmed) {
            try {
                await axios.delete(`${API_BASE_URL}/deleteuser/${user._id}`);
                alert("User deleted successfully!");
                fetchUsers(); // Refresh the list
                resetUser(); // Close the form
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Error deleting user!");
            }
        }
    };

    return (
        <Grid container spacing={3} xs={10} sx={{ margin: "auto", p: 3, borderRadius: 4, boxShadow: 2 }}>
            <Grid item xs={12}>
                <TextField
                    required
                    name="userId"
                    label="User ID"
                    fullWidth
                    value={formData.userId}
                    onChange={handleChange}
                    disabled
                />
            </Grid>
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
                        value={formData.role} // Assuming 'role' is a field in your formData
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
                    onChange={handleChange}
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
                <Button variant="contained" sx={{ bgcolor: theme.palette.darkgreen.main }} onClick={handleUpdate}>
                    Save Changes
                </Button>
            </Grid>
            <Grid item>
                <Button color="error" variant="outlined" onClick={handleDelete}>
                    Delete
                </Button>
            </Grid>
            <Grid item>
                <Button color="warning" variant="outlined" onClick={resetUser}>
                    Close
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserUpdateForm;
