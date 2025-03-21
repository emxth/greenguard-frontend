import { useState, useEffect } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";
import axios from "axios";
import UserUpdateForm from "./UserUpdateForm"; // Import the form component

const API_BASE_URL = "http://localhost:8081/user";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Store user data for editing

    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to handle edit button click
    const handleEditClick = (user) => {
        setSelectedUser(user); // Set user data in state
    };

    return (
        <Box>
            {/* User Update Form - Only Show if Editing */}
            {selectedUser && <UserUpdateForm user={selectedUser} resetUser={() => setSelectedUser(null)} fetchUsers={fetchUsers} />}

            <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>User List</Typography>

            <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 ? (
                            users.map(user => (
                                <TableRow key={user._id} hover>
                                    <TableCell>{user.user_id}</TableCell>
                                    <TableCell>{user.first_name}</TableCell>
                                    <TableCell>{user.last_name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="outlined" 
                                            color="success"
                                            size="small"
                                            onClick={() => handleEditClick(user)} // Pass user data
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7}>No Data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserTable;
