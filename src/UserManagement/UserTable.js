import { useState, useEffect } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from "@mui/material";
import axios from "axios";
import UserUpdateForm from "./UserUpdateForm"; // Import the form component

const API_BASE_URL = "http://localhost:8081/user";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Store user data for editing
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRows = users.filter((user) => {
        const keyword = searchTerm.toLowerCase();
        return (
            user._id.toLowerCase().includes(keyword) ||
            user.first_name.toLowerCase().includes(keyword) ||
            user.last_name.toLowerCase().includes(keyword) ||
            user.email.toLowerCase().includes(keyword) ||
            user.phone.toString().includes(keyword) ||
            user.address.toLowerCase().includes(keyword) ||
            user.role.toLowerCase().includes(keyword)
        );
    });


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

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
            <TextField
                label="Search users"
                variant="outlined"
                size="small"
                color="success"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ mb: 2, width: "30%" }}
            />

            {/* User Update Form - Only Show if Editing */}
            {selectedUser && <UserUpdateForm user={selectedUser} resetUser={() => setSelectedUser(null)} fetchUsers={fetchUsers} />}

            <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>User ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>First Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Last Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Phone</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Address</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.length > 0 ? (
                            filteredRows.map(user => (
                                <TableRow key={user._id} hover>
                                    <TableCell>{user._id}</TableCell>
                                    <TableCell>{user.first_name}</TableCell>
                                    <TableCell>{user.last_name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell sx={{ color: user.role !== "citizen" ? "red" : "black" }}>{user.role}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            size="small"
                                            onClick={() => handleEditClick(user)}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8}>No Data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserTable;